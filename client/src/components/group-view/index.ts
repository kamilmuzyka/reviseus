/** @module Component/GroupView */
import socket from '../../contexts/socketio';
import auth from '../../contexts/auth';
import html from '../../utils/html-tag';
import convertDate from '../../utils/convert-date';
import activateLinks from '../../utils/activate-links';
import Elements from '../../interfaces/elements-interface';
import Post from '../../interfaces/post-interface';
import BrowserRouter from '../browser-router';
import '../primary-heading/index';
import '../router-link/index';
import '../primary-button/index';
import '../post-preview/index';
import '../theme-toggle/index';

const template = document.createElement('template');
template.innerHTML = html`
    <style>
        .group-section {
            position: relative;
        }

        .group-heading {
            display: block;
            margin-top: 2.5rem;
        }

        .group-controls {
            display: flex;
            justify-content: space-between;
        }

        @media (min-width: 500px) {
            .group-controls {
                align-items: center;
            }
        }

        .group-toggle {
            margin-left: auto;
        }

        .protected {
            display: flex;
            flex-direction: column;
        }

        .protected > *:not(:last-child) {
            margin-bottom: 1.5rem;
        }

        @media (min-width: 500px) {
            .protected {
                flex-direction: row;
                align-items: center;
            }

            .protected > *:not(:last-child) {
                margin-bottom: 0;
                margin-right: 1.5rem;
            }
        }

        .group-new,
        .group-join,
        .group-invite {
            display: none;
        }

        .group-lazy {
            position: absolute;
            left: 0;
            bottom: 0;
            z-index: -1;
            width: 100%;
            height: 175px;
            background: transparent;
        }

        .group-error {
            margin-top: 2.5rem;
            text-align: center;
            color: var(--secondary-text);
        }
    </style>
    <div class="group-controls">
        <div class="protected">
            <a is="router-link" class="group-new">
                <primary-button
                    data-background="transparent"
                    data-border="var(--subtle)"
                >
                    <svg
                        slot="icon"
                        xmlns="http://www.w3.org/2000/svg"
                        width="10.264"
                        height="10.264"
                        viewBox="0 0 10.264 10.264"
                    >
                        <path
                            d="M6.75,12.566H11.2v4.448h1.368V12.566h4.448V11.2H12.566V6.75H11.2V11.2H6.75Z"
                            transform="translate(-6.75 -6.75)"
                            fill="var(--primary-text)"
                        />
                    </svg>
                    <span>New Post</span>
                </primary-button>
            </a>
            <primary-button
                class="group-join"
                data-background="var(--accent)"
                data-color="#f0f0f0"
            >
                <svg
                    slot="icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="10.264"
                    height="10.264"
                    viewBox="0 0 10.264 10.264"
                >
                    <path
                        d="M6.75,12.566H11.2v4.448h1.368V12.566h4.448V11.2H12.566V6.75H11.2V11.2H6.75Z"
                        transform="translate(-6.75 -6.75)"
                        fill="#f0f0f0"
                    />
                </svg>
                <span>Join Group</span>
            </primary-button>
            <a is="router-link" class="group-invite">
                <primary-button
                    data-background="transparent"
                    data-border="var(--subtle)"
                >
                    <svg
                        slot="icon"
                        xmlns="http://www.w3.org/2000/svg"
                        width="10.264"
                        height="10.264"
                        viewBox="0 0 10.264 10.264"
                    >
                        <path
                            d="M6.75,12.566H11.2v4.448h1.368V12.566h4.448V11.2H12.566V6.75H11.2V11.2H6.75Z"
                            transform="translate(-6.75 -6.75)"
                            fill="var(--primary-text)"
                        />
                    </svg>
                    <span>Invite</span>
                </primary-button>
            </a>
        </div>
        <theme-toggle class="group-toggle"></theme-toggle>
    </div>
    <section class="group-section">
        <primary-heading class="group-heading"> </primary-heading>
        <div class="group-posts"></div>
        <div class="group-lazy"></div>
        <div class="group-error"></div>
    </section>
`;

class GroupView extends HTMLElement {
    /** Specifies if the user should be redirected due to authorization issues. */
    private redirect;

    /** Group ID extracted from the URL. */
    private groupId;

    /** Group's details fetched from the server. */
    private details;

    /** Group's posts fetched from the server. */
    private posts;

    /** Intersection observer instance. */
    private observer;

    /** Offset used in lazy loading or pagination. */
    private offset = 0;

    /** Buffered HTML elements. */
    private el: Elements = {};

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
        this.loadElements();
        this.addEventListeners();
        socket.io.on('groupPost', (post) => this.handleNewPost(post));
    }

    /** Buffers required HTML elements. */
    loadElements(): void {
        const requestedElements = {
            protected: this.shadowRoot?.querySelector(
                '.group-controls .protected'
            ),
            join: this.shadowRoot?.querySelector('.group-join'),
            invite: this.shadowRoot?.querySelector('.group-invite'),
            new: this.shadowRoot?.querySelector('.group-new'),
            details: this.shadowRoot?.querySelector('.group-details'),
            heading: this.shadowRoot?.querySelector('.group-heading'),
            posts: this.shadowRoot?.querySelector('.group-posts'),
            lazy: this.shadowRoot?.querySelector('.group-lazy'),
            error: this.shadowRoot?.querySelector('.group-error'),
        };
        for (const element in requestedElements) {
            if (element) {
                this.el[element] = requestedElements[element];
            }
        }
    }

    /** Saves group ID extracted from the URL. */
    saveGroupId(): void {
        this.groupId = this.dataset.id ?? 'public';
    }

    /** Requests the server to associate the current user with a given group. */
    async joinGroup(): Promise<void> {
        const groupId = this.groupId;
        const response = await fetch('/api/group/join', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                groupId,
            }),
        });
        if (response.ok) {
            auth.check();
        }
    }

    /** Loads group details from the server. */
    async loadDetails(): Promise<void> {
        if (this.groupId === 'public') {
            return;
        }
        const groupDetails = await fetch(`/api/group/${this.groupId}`);
        const details = await groupDetails.json();
        this.details = details;
    }

    /** Requests group's posts from the server, controlling the offset. */
    async loadPosts(): Promise<void> {
        let response;
        if (this.groupId === 'public') {
            response = await fetch(`/api/post/public?offset=${this.offset}`);
        } else {
            const isPublic = this.details.type === 'public';
            if (isPublic) {
                response = await fetch(
                    `/api/group/public/${this.groupId}/posts?offset=${this.offset}`
                );
            } else {
                response = await fetch(
                    `/api/group/private/${this.groupId}/posts?offset=${this.offset}`
                );
            }
        }
        if (!response.ok) {
            this.redirect = true;
            return;
        }
        const posts = await response.json();
        this.redirect = false;
        this.posts = posts;
        this.offset += 10;
    }

    /** Creates post-preview component based on provided properties. */
    createPostPreviewElement(post: Post): HTMLElement {
        /** Post Preview */
        const postPreview = document.createElement('post-preview');
        postPreview.dataset.id = post.id;
        /** Post Title */
        const postTitle = document.createElement('span');
        postTitle.setAttribute('slot', 'title');
        postTitle.textContent = post.title;
        /** Post Content */
        const postContent = document.createElement('span');
        postContent.setAttribute('slot', 'content');
        postContent.innerHTML = activateLinks(post.content);
        /** User Name */
        const userName = document.createElement('span');
        userName.setAttribute('slot', 'name');
        userName.textContent = `${post.user.firstName} ${post.user.lastName}`;
        /** User Image */
        const userImage = document.createElement('img');
        userImage.setAttribute('slot', 'picture');
        userImage.setAttribute(
            'alt',
            `${post.user.firstName}'s profile picture`
        );
        userImage.setAttribute('src', post.user.profilePhoto);
        /** Post Time */
        const postTime = document.createElement('time');
        postTime.setAttribute('slot', 'time');
        postTime.setAttribute('datetime', post.createdAt);
        postTime.textContent = convertDate(new Date(post.createdAt));
        setInterval(() => {
            postTime.textContent = convertDate(new Date(post.createdAt));
        }, 36000);
        /** Answers Count */
        const answersCount = document.createElement('span');
        answersCount.setAttribute('slot', 'count');
        answersCount.textContent =
            post.answers.length === 1
                ? `${post.answers.length} Answer`
                : `${post.answers.length} Answers`;
        postPreview.appendChild(postTitle);
        postPreview.appendChild(postContent);
        postPreview.appendChild(userName);
        postPreview.appendChild(userImage);
        postPreview.appendChild(postTime);
        postPreview.appendChild(answersCount);
        return postPreview;
    }

    /** Shows or hides protected based on the user's auth status. */
    protectControls(): void {
        const isLoggedIn = auth.ok;
        if (isLoggedIn) {
            this.el.protected.style.display = 'flex';
            return;
        }
        this.el.protected.style.display = 'none';
    }

    /** Displays action controls (join, invite, new post) based on the user's
     * association with a group. */
    displayActionControls(): void {
        if (
            this.el.new instanceof HTMLAnchorElement &&
            this.el.invite instanceof HTMLAnchorElement
        ) {
            this.el.new.href = `/posts/new?group=${this.groupId}`;
            this.el.invite.href = `/invite/group/${this.groupId}`;
        }
        this.el.new.style.display = 'none';
        this.el.invite.style.display = 'none';
        this.el.join.style.display = 'none';
        const isMember =
            Boolean(
                auth.user?.groups.find((group) => {
                    return group.id === this.groupId;
                })
            ) || this.groupId === 'public';
        const isPublic = this.groupId === 'public';
        if (isMember) {
            this.el.new.style.display = 'block';
        }
        if (isMember && !isPublic) {
            this.el.invite.style.display = 'block';
            return;
        }
        if (!isPublic) {
            this.el.join.style.display = 'block';
        }
    }

    /** Displays group details such as group name. */
    displayDetails(): void {
        if (this.groupId === 'public') {
            this.el.heading.textContent = 'Public Posts';
            return;
        }
        if (!this.details) {
            return;
        }
        this.el.heading.textContent = `${this.details.name} Posts`;
    }

    /** Appends data stored in <i>this.posts</i> to the DOM. */
    displayPosts(): void {
        if (!this.posts) {
            return;
        }
        const postsFragment = document.createDocumentFragment();
        this.posts.forEach((post) => {
            const postPreview = this.createPostPreviewElement(post);
            postsFragment.appendChild(postPreview);
        });
        const scrollRef = window.scrollY;
        this.el.posts.appendChild(postsFragment);
        window.scrollTo(0, scrollRef);
    }

    /** Removes rendered posts and resets the component's state. */
    clearPosts(): void {
        this.posts = null;
        this.offset = 0;
        [...this.el.posts.children].forEach((child) => child.remove());
    }

    /** Fetches group's posts from the server and displays them. */
    handleIntersection(entries: IntersectionObserverEntry[]): void {
        if (entries[0].isIntersecting) {
            (async () => {
                await this.loadPosts();
                this.el.error.textContent = '';
                if (!this.posts.length && this.offset === 10) {
                    this.el.error.textContent = 'No posts yet.';
                    return;
                }
                if (!this.posts.length && this.offset > 10) {
                    this.el.error.textContent = 'You are all caught up 😎';
                    return;
                }
                if (this.posts.length) {
                    this.displayPosts();
                }
            })();
        }
    }

    /** Creates an intersection observer instance if not exists. */
    createObserver(): void {
        if (!this.observer) {
            this.observer = new IntersectionObserver(
                (entries) => this.handleIntersection(entries),
                {
                    root: null,
                    rootMargin: '0px',
                    threshold: 0.5,
                }
            );
        }
    }

    /** Renders a new post at the beginning of the list. */
    handleNewPost(post: Post): void {
        const postPreview = this.createPostPreviewElement(post);
        this.el.posts.insertBefore(postPreview, this.el.posts.firstChild);
    }

    addEventListeners(): void {
        window.addEventListener('authchange', () => this.protectControls());
        this.el.join.addEventListener('click', () => this.joinGroup());
    }

    connectedCallback(): void {
        (async () => {
            this.saveGroupId();
            await this.loadDetails();
            await this.loadPosts();
            if (!this.redirect) {
                this.displayDetails();
                this.clearPosts();
                this.displayPosts();
                this.displayActionControls();
                this.createObserver();
                this.observer.observe(this.el.lazy);
                socket.io.emit('subscribeGroup', this.groupId);
                return;
            }
            BrowserRouter.redirect('/');
        })();
    }

    disconnectedCallback(): void {
        this.clearPosts();
        if (this.observer) {
            this.observer.unobserve(this.el.lazy);
        }
        socket.io.emit('unsubscribeGroup', this.groupId);
    }
}

if (!customElements.get('group-view')) {
    customElements.define('group-view', GroupView);
}

export default GroupView;
