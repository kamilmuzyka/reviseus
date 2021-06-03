/** @module Component/SearchView */
import html from '../../utils/html-tag';
import convertDate from '../../utils/convert-date';
import activateLinks from '../../utils/activate-links';
import Elements from '../../interfaces/elements-interface';
import Post from '../../interfaces/post-interface';
import Group from '../../interfaces/group-interface';
import '../primary-heading/index';
import '../secondary-heading/index';

const template = document.createElement('template');
template.innerHTML = html`
    <style>
        .query {
            color: var(--accent);
        }

        .results-heading {
            margin-top: 2.5rem;
        }

        .results-container {
            display: none;
        }

        .group-results {
            display: grid;
            gap: 2.5rem;
            grid-template-columns: 1fr;
            grid-template-rows: auto;
            margin-top: 2.5rem;
        }

        @media (min-width: 700px) {
            .group-results {
                grid-template-columns: 1fr 1fr;
            }
        }

        .group-members {
            display: flex;
            margin-top: 1.5rem;
        }

        .group-member {
            width: 35px;
            height: 35px;
            border: 1px solid var(--border);
            border-radius: 50%;
            overflow: hidden;
        }

        .group-member:nth-child(2) {
            transform: translateX(-10px);
        }

        .group-member:nth-child(3) {
            transform: translateX(-20px);
        }

        .group-member-picture {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .active {
            display: block;
        }

        .error {
            margin-top: 2.5rem;
        }
    </style>
    <section>
        <primary-heading>
            Search results for <span class="query"></span>
        </primary-heading>
        <div class="results-container post-results-container">
            <secondary-heading class="results-heading">Posts</secondary-heading>
            <div class="post-results"></div>
        </div>
        <div class="results-container group-results-container">
            <secondary-heading class="results-heading"
                >Groups</secondary-heading
            >
            <div class="group-results"></div>
        </div>
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
            postResults: this.shadowRoot?.querySelector('.post-results'),
            postResultsContainer: this.shadowRoot?.querySelector(
                '.post-results-container'
            ),
            groupResults: this.shadowRoot?.querySelector('.group-results'),
            groupResultsContainer: this.shadowRoot?.querySelector(
                '.group-results-container'
            ),
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

    createGroupPreviewElement(group: Group): HTMLElement {
        /** Group Preview Element */
        const groupPreview = document.createElement('group-preview');
        groupPreview.dataset.id = group.id;
        /** Group Name Slot */
        const groupName = document.createElement('span');
        groupName.setAttribute('slot', 'name');
        groupName.textContent = group.name;
        /** Group Count */
        const groupCount = document.createElement('span');
        groupCount.setAttribute('slot', 'count');
        groupCount.textContent =
            group.users.length === 1
                ? `${group.users.length} Member`
                : `${group.users.length} Members`;
        /** Group Type */
        const groupType = document.createElement('span');
        groupType.setAttribute('slot', 'type');
        groupType.textContent = `${
            group.type.charAt(0).toUpperCase() + group.type.slice(1)
        } Group`;
        /** Group Members */
        const groupMembers = document.createElement('span');
        groupMembers.setAttribute('slot', 'members');
        groupMembers.classList.add('group-members');
        group.users.slice(0, 3).forEach((user) => {
            /** Group Member */
            const groupMember = document.createElement('div');
            groupMember.classList.add('group-member');
            /** Group Member Picture */
            const groupMemberPicture = document.createElement('img');
            groupMemberPicture.classList.add('group-member-picture');
            groupMemberPicture.alt = `${user.firstName}'s profile picture`;
            groupMemberPicture.src = user.profilePhoto;
            groupMember.appendChild(groupMemberPicture);
            groupMembers.appendChild(groupMember);
        });
        groupPreview.appendChild(groupName);
        groupPreview.appendChild(groupCount);
        groupPreview.appendChild(groupType);
        groupPreview.appendChild(groupMembers);
        return groupPreview;
    }

    /** Populates the search-view component with results received from the server. */
    displaySearchResults(): void {
        if (!this.results.posts.length && !this.results.groups.length) {
            this.el.error.textContent = 'We could not find any results 😥';
            return;
        }
        if (this.results.posts.length) {
            const postsFragment = document.createDocumentFragment();
            this.results.posts.forEach((post) => {
                const postPreview = this.createPostPreviewElement(post.item);
                postsFragment.appendChild(postPreview);
            });
            this.el.postResultsContainer.classList.add('active');
            this.el.postResults.appendChild(postsFragment);
        }
        if (this.results.groups.length) {
            const groupsFragment = document.createDocumentFragment();
            this.results.groups.forEach((group) => {
                const groupPreview = this.createGroupPreviewElement(group.item);
                groupsFragment.appendChild(groupPreview);
            });
            this.el.groupResultsContainer.classList.add('active');
            this.el.groupResults.appendChild(groupsFragment);
        }
    }

    /** Removes data from all populated HTML elements. */
    clearSearchResults(): void {
        [...this.el.postResults.children].forEach((child) => child.remove());
        this.el.postResultsContainer.classList.remove('active');
        [...this.el.groupResults.children].forEach((child) => child.remove());
        this.el.groupResultsContainer.classList.remove('active');
        this.el.error.textContent = '';
    }

    connectedCallback(): void {
        (async () => {
            this.saveSearchQuery();
            await this.loadSearchResults();
            this.clearSearchResults();
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
