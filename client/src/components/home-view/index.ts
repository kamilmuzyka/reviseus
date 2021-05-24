/** @module Component/HomeView */
import socket from '../../contexts/socketio';
import html from '../../utils/html-tag';
import convertDate from '../../utils/convert-date';
import activateLinks from '../../utils/activate-links';
import Elements from '../../interfaces/elements-interface';
import BrowserRouter from '../browser-router/index';
import '../primary-heading/index';
import '../router-link/index';
import '../primary-button/index';
import '../post-preview/index';

const template = document.createElement('template');
template.innerHTML = html`
    <style>
        .home-heading {
            display: block;
            margin-top: 5rem;
        }

        .home-posts {
            position: relative;
        }

        .home-lazy {
            position: absolute;
            left: 0;
            bottom: 0;
            z-index: -1;
            width: 100%;
            height: 175px;
            background: transparent;
        }

        .home-end {
            margin: 7.5rem 0 0 0;
            text-align: center;
            color: var(--secondary-text);
        }
    </style>
    <a href="/posts/new" is="router-link">
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
    <section>
        <primary-heading class="home-heading">Public Posts</primary-heading>
        <div class="home-posts">
            <div class="home-lazy"></div>
        </div>
    </section>
`;

class HomeView extends HTMLElement {
    private details;
    private offset = 0;
    private isExhausted = false;
    private el: Elements = {};

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
        this.loadElements();
        socket.io.on('groupPost', (details) => this.handleNewPost(details));
    }

    loadElements(): void {
        const requestedElements = {
            posts: this.shadowRoot?.querySelector('.home-posts'),
            lazy: this.shadowRoot?.querySelector('.home-lazy'),
        };
        for (const element in requestedElements) {
            if (element) {
                this.el[element] = requestedElements[element];
            }
        }
    }

    async loadDetails(): Promise<void> {
        const currentGroupId = this.dataset.id ?? null;
        const groupPosts = await fetch(
            `/api/group/${currentGroupId}/posts?offset=${this.offset}`
        );
        if (!groupPosts.ok) {
            BrowserRouter.redirect('/404');
            return;
        }
        const details = await groupPosts.json();
        this.details = details;
        this.offset += 10;
    }

    createPostPreviewElement(post): HTMLElement {
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

    displayDetails(): void {
        if (!this.details) {
            return;
        }
        const postsFragment = document.createDocumentFragment();
        this.details.forEach((post) => {
            const postPreview = this.createPostPreviewElement(post);
            postsFragment.appendChild(postPreview);
        });
        const scrollRef = window.scrollY;
        this.el.posts.appendChild(postsFragment);
        window.scrollTo(0, scrollRef);
    }

    displayDetailsEnd(): void {
        const p = document.createElement('p');
        p.classList.add('home-end');
        p.textContent = 'You are all caught up.';
        this.el.posts.appendChild(p);
    }

    clearDetails(): void {
        [...this.el.posts.children].forEach((child) => child.remove());
        this.details = null;
        this.offset = 0;
        this.isExhausted = false;
    }

    handleIntersection(entries): void {
        if (entries[0].isIntersecting) {
            (async () => {
                await this.loadDetails();
                if (!this.details.length && !this.isExhausted) {
                    this.isExhausted = true;
                    this.displayDetailsEnd();
                    return;
                }
                if (this.details.length) {
                    this.displayDetails();
                }
            })();
        }
    }

    createObserver(): void {
        const observer = new IntersectionObserver(
            (entries) => this.handleIntersection(entries),
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.5,
            }
        );
        observer.observe(this.el.lazy);
    }

    handleNewPost(details): void {
        const postPreview = this.createPostPreviewElement(details);
        this.el.posts.insertBefore(postPreview, this.el.posts.firstChild);
    }

    connectedCallback(): void {
        (async () => {
            await this.loadDetails();
            this.displayDetails();
            this.createObserver();
            /** Use null for now */
            socket.io.emit('subscribeGroup', null);
        })();
    }

    disconnectedCallback(): void {
        this.clearDetails();
        /** Use null for now */
        socket.io.emit('unsubscribeGroup', null);
    }
}

if (!customElements.get('home-view')) {
    customElements.define('home-view', HomeView);
}

export default HomeView;
