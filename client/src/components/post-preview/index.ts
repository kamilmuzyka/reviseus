/** @module Component/PostPreview */
import html from '../../utils/html-tag';
import '../secondary-heading/index';
import '../router-link/index';
import Elements from '../../interfaces/elements-interface';

const template = document.createElement('template');
template.innerHTML = html`
    <style>
        .post-preview {
            margin-top: 2.5rem;
            padding: 2.5rem;
            background-color: var(--secondary-bg);
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
            border-radius: 10px;
        }

        .post-reference {
            margin-bottom: 1.5rem;
            text-decoration: none;
            display: inline-block;
        }

        .post-reference:hover {
            text-decoration: underline;
            color: var(--accent);
            cursor: pointer;
        }

        .post-title {
            display: -webkit-box;
            margin: 0;
            overflow: hidden;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            text-overflow: ellipsis;
        }

        .post-content {
            display: -webkit-box;
            margin: 0;
            overflow: hidden;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            text-overflow: ellipsis;
        }

        .post-details {
            display: flex;
            flex-wrap: wrap;
            margin-top: 1.5rem;
            font-size: 1.4rem;
            color: var(--secondary-text);
        }

        .post-details p {
            margin: 0;
        }

        .post-detail {
            position: relative;
            margin-right: 2.4rem;
        }

        .post-detail:not(:last-child)::after {
            content: '';
            position: absolute;
            top: 50%;
            left: calc(100% + 10px);
            transform: translateY(-50%);
            width: 4px;
            height: 4px;
            background-color: var(--secondary-text);
            border-radius: 50%;
        }

        .post-author {
            display: flex;
            align-items: center;
        }

        .post-author-picture {
            position: relative;
            margin-left: 1rem;
            width: 15px;
            height: 15px;
            border-radius: 50%;
            overflow: hidden;
            border: 1px solid var(--border);
        }

        ::slotted(img) {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    </style>
    <div class="post-preview">
        <a class="post-reference" is="router-link">
            <secondary-heading class="post-title" data-color="var(--accent)">
                <slot name="title"></slot>
            </secondary-heading>
        </a>
        <p class="post-content">
            <slot name="content"></slot>
        </p>
        <div class="post-details">
            <div class="post-detail">
                <div class="post-author">
                    <p>Posted by <slot name="name"></slot></p>
                    <div class="post-author-picture">
                        <slot name="picture"></slot>
                    </div>
                </div>
            </div>
            <div class="post-detail">
                <slot name="time"></slot>
            </div>
            <div class="post-detail">
                <p>
                    <slot name="count"></slot>
                </p>
            </div>
        </div>
    </div>
`;

class PostPreview extends HTMLElement {
    private el: Elements = {};

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
        this.loadElements();
    }

    loadElements(): void {
        const requestedElements = {
            reference: this.shadowRoot?.querySelector('.post-reference'),
        };
        for (const element in requestedElements) {
            if (element) {
                this.el[element] = requestedElements[element];
            }
        }
    }

    activatePostReference(): void {
        if (this.el.reference instanceof HTMLAnchorElement) {
            this.el.reference.href = `/posts/${this.dataset.id}`;
        }
    }

    connectedCallback(): void {
        this.activatePostReference();
    }
}

if (!customElements.get('post-preview')) {
    customElements.define('post-preview', PostPreview);
}

export default PostPreview;
