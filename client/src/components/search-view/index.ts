/** @module Component/SearchView */
import html from '../../utils/html-tag';
import convertDate from '../../utils/convert-date';
import activateLinks from '../../utils/activate-links';
import Elements from '../../interfaces/elements-interface';
import Post from '../../interfaces/post-interface';
import '../primary-heading/index';

const template = document.createElement('template');
template.innerHTML = html`
    <style>
        .query {
            color: var(--accent);
        }

        .error {
            margin-top: 2.5rem;
        }
    </style>
    <section>
        <primary-heading>
            Search results for <span class="query"></span>
        </primary-heading>
        <div class="results"></div>
        <div class="error"></div>
    </section>
`;

class SearchView extends HTMLElement {
    /** Buffered HTML elements. */
    private el: Elements = {};

    /** Searched term. */
    private query;

    /** Search results. */
    private results;

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
        this.loadElements();
    }

    /** Buffers required HTML elements. */
    loadElements(): void {
        const requestedElements = {
            query: this.shadowRoot?.querySelector('.query'),
            results: this.shadowRoot?.querySelector('.results'),
            error: this.shadowRoot?.querySelector('.error'),
        };
        for (const element in requestedElements) {
            if (element) {
                this.el[element] = requestedElements[element];
            }
        }
    }

    /** Shows the searched term on the screen. */
    displaySearchQuery(): void {
        this.el.query.textContent = this.query;
    }

    /** Retrieves the search query from the URL and stores it. */
    saveSearchQuery(): void {
        const searchParams = new URLSearchParams(location.search);
        this.query = searchParams.get('query');
        this.displaySearchQuery();
    }

    /** Requests search results from the server. */
    async loadSearchResults(): Promise<void> {
        const response = await fetch(`/api/search?query=${this.query}`);
        if (response.ok) {
            const results = await response.json();
            this.results = results;
        }
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

    /** Populates the search-view component with results received from the server. */
    displaySearchResults(): void {
        if (!this.results?.length) {
            this.el.error.textContent = 'We could not find any results 😥';
            return;
        }
        const postsFragment = document.createDocumentFragment();
        this.results.forEach((result) => {
            const postPreview = this.createPostPreviewElement(result.item);
            postsFragment.appendChild(postPreview);
        });
        this.el.results.appendChild(postsFragment);
    }

    /** Removes data from all populated HTML elements. */
    clearSearchResults(): void {
        [...this.el.results.children].forEach((child) => child.remove());
        this.el.error.textContent = '';
    }

    connectedCallback(): void {
        (async () => {
            this.saveSearchQuery();
            await this.loadSearchResults();
            this.displaySearchResults();
        })();
    }

    disconnectedCallback(): void {
        this.clearSearchResults();
    }
}

if (!customElements.get('search-view')) {
    customElements.define('search-view', SearchView);
}

export default SearchView;
