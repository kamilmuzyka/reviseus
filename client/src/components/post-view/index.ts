/** @module Component/PostView */
import html from '../../utils/html-tag';
import Elements from '../../interfaces/elements-interface';
import BrowserRouter from '../browser-router/index';
import '../primary-heading/index';
import '../upload-button/index';

const template = document.createElement('template');
template.innerHTML = html`
    <style>
        .post {
            padding: 2.5rem;
            background-color: var(--secondary-bg);
            border-radius: 10px;
        }

        .post-content {
            margin: 1.5rem 0 0 0;
        }

        .post-files {
            display: flex;
            flex-wrap: wrap;
        }

        .post-files > * {
            margin: 1.5rem 1.5rem 0 0;
        }

        .post-tags {
            display: flex;
            flex-wrap: wrap;
            padding: 0;
            margin: 1.5rem 0 0 0;
            list-style-type: none;
        }

        .post-tags > * {
            color: var(--accent);
        }

        .post-tags > *:not(:last-child) {
            margin-right: 1.5rem;
        }

        .user-profile {
            width: 40px;
            height: 40px;
            border: 1px solid #b0b3b8;
            border-radius: 50%;
            overflow: hidden;
        }

        .user-photo {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .user-details {
            display: grid;
            grid-template-columns: 40px 1fr;
            gap: 1.5rem;
            font-size: 1.4rem;
        }

        .post-time {
            color: var(--secondary-text);
            margin-top: -5px;
        }
    </style>
    <section>
        <primary-heading class="post-title" data-color="var(--accent)">
        </primary-heading>
        <div class="post">
            <div class="user-details">
                <div class="user-profile">
                    <img class="user-photo" />
                </div>
                <div>
                    <div>
                        Posted by
                        <span class="user-name"></span>
                    </div>
                    <div class="post-time">15 hours ago</div>
                </div>
            </div>
            <p class="post-content"></p>
            <div class="post-files"></div>
            <ul class="post-tags"></ul>
        </div>
    </section>
`;

class PostView extends HTMLElement {
    /** Post's data fetched from the server. */
    private details;

    /** Buffered HTML elements. */
    private el: Elements = {};

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
        this.loadElements();
    }

    /** Buffers required HTML elements. */
    loadElements(): void {
        const requestedElements = {
            photo: this.shadowRoot?.querySelector('.user-photo'),
            user: this.shadowRoot?.querySelector('.user-name'),
            title: this.shadowRoot?.querySelector('.post-title'),
            content: this.shadowRoot?.querySelector('.post-content'),
            files: this.shadowRoot?.querySelector('.post-files'),
            tags: this.shadowRoot?.querySelector('.post-tags'),
        };
        for (const element in requestedElements) {
            if (element) {
                this.el[element] = requestedElements[element];
            }
        }
    }

    /** Requests post's data from the server. */
    async loadDetails(): Promise<void> {
        const currentPostId = this.dataset.id;
        const response = await fetch(`/api/post/${currentPostId}`);
        if (response.ok) {
            const data = await response.json();
            this.details = data;
            return;
        }
        BrowserRouter.redirect('/404');
    }

    /** Populates HTML elements with data downloaded from the server. */
    displayDetails(): void {
        if (this.el.photo instanceof HTMLImageElement) {
            this.el.photo.src = this.details.user.profilePhoto;
        }
        this.el.user.textContent = `${this.details.user.firstName} ${this.details.user.lastName}`;
        this.el.title.textContent = this.details.title;
        this.el.content.textContent = this.details.content;
        this.details.files.forEach((file) => {
            const link = document.createElement('a');
            link.href = file.uri;
            link.setAttribute('download', '');
            const button = document.createElement('upload-button');
            button.textContent = file.name;
            link.appendChild(button);
            this.el.files.appendChild(link);
        });
        this.details.tags.forEach((tag) => {
            const item = document.createElement('li');
            item.textContent = `#${tag.name}`;
            this.el.tags.appendChild(item);
        });
    }

    /** Removes data from all populated HTML elements. */
    clearDetails(): void {
        if (this.el.photo instanceof HTMLImageElement) {
            this.el.photo.src = '';
        }
        this.el.user.textContent = '';
        this.el.title.textContent = '';
        this.el.content.textContent = '';
        [...this.el.files.children].forEach((file) => file.remove());
        [...this.el.tags.children].forEach((tag) => tag.remove());
    }

    connectedCallback(): void {
        (async () => {
            await this.loadDetails();
            this.displayDetails();
        })();
    }

    disconnectedCallback(): void {
        this.clearDetails();
    }
}

if (!customElements.get('post-view')) {
    customElements.define('post-view', PostView);
}

export default PostView;
