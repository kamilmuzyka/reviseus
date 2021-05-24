/** @module Component/HomeView */
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
        <div class="home-posts"></div>
    </section>
`;

class HomeView extends HTMLElement {
    private details;

    private el: Elements = {};

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
        this.loadElements();
    }

    loadElements(): void {
        const requestedElements = {
            posts: this.shadowRoot?.querySelector('.home-posts'),
        };
        for (const element in requestedElements) {
            if (element) {
                this.el[element] = requestedElements[element];
            }
        }
    }

    async loadDetails(): Promise<void> {
        const currentGroupId = this.dataset.id ?? null;
        const groupPosts = await fetch(`/api/group/${currentGroupId}/posts`);
        if (!groupPosts.ok) {
            BrowserRouter.redirect('/404');
            return;
        }
        const details = await groupPosts.json();
        this.details = details;
        console.log(this.details);
    }

    displayDetails(): void {
        if (!this.details) {
            return;
        }
        const postsFragment = document.createDocumentFragment();
        this.details.forEach((post) => {
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
            postsFragment.appendChild(postPreview);
        });
        this.el.posts.appendChild(postsFragment);
    }

    connectedCallback(): void {
        (async () => {
            await this.loadDetails();
            this.displayDetails();
        })();
    }
}

if (!customElements.get('home-view')) {
    customElements.define('home-view', HomeView);
}

export default HomeView;
