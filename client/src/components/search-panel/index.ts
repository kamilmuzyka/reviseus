/** @module Component/SearchPanel */
import html from '../../utils/html-tag';
import Elements from '../../interfaces/elements-interface';
import Tag from '../../interfaces/tag-interface';
import '../search-bar/index';

const template = document.createElement('template');
template.innerHTML = html`<style>
        :host {
            order: -1;
        }

        @media (min-width: 1320px) {
            :host {
                order: 1;
            }
        }

        .search-panel {
            margin: 3.5rem auto;
            padding: 2.5rem;
            width: 100%;
            max-width: 650px;
            background-color: var(--secondary-bg);
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
            border-radius: 10px;
            box-sizing: border-box;
        }

        @media (min-width: 1320px) {
            .search-panel {
                margin: 0;
                position: sticky;
                top: 7.5rem;
                transform: translateX(0);
                z-index: 1;
                width: 250px;
            }
        }

        .search-panel-tags {
            display: none;
            margin: 0;
            padding: 1rem 0 0 0;
            list-style-type: none;
        }

        @media (min-width: 1320px) {
            .search-panel-tags {
                display: block;
            }
        }

        .tag {
            margin-top: 1.5rem;
        }

        .tag-name {
            text-decoration: none;
            color: inherit;
        }

        .tag-name:hover {
            text-decoration: underline;
            color: var(--accent);
        }

        .tag-name {
            color: var(--accent);
        }

        .tag-count {
            font-size: 1.4rem;
            color: var(--secondary-text);
        }
    </style>
    <section class="search-panel">
        <search-bar></search-bar>
        <ul class="search-panel-tags"></ul>
    </section>`;

class SearchPanel extends HTMLElement {
    /** Popular tags fetched from the server. */
    private tags;

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
            tags: this.shadowRoot?.querySelector('.search-panel-tags'),
        };
        for (const element in requestedElements) {
            if (element) {
                this.el[element] = requestedElements[element];
            }
        }
    }

    /** Requests popular tags from the server. */
    async loadPopularTags(): Promise<void> {
        const response = await fetch('/api/search/tags');
        if (response.ok) {
            const tags = await response.json();
            this.tags = tags;
        }
    }

    /** Populates DOM with fetched popular tags. */
    displayPopularTags(): void {
        const tagsFragment = document.createDocumentFragment();
        this.tags.forEach((tag: Tag) => {
            const tagElement = document.createElement('li');
            tagElement.classList.add('tag');
            const name = document.createElement('a');
            name.classList.add('tag-name');
            name.href = `/search?query=${tag.name}`;
            name.textContent = `#${tag.name}`;
            name.setAttribute('is', 'router-link');
            const count = document.createElement('div');
            count.classList.add('tag-count');
            count.textContent =
                tag.posts.length === 1
                    ? `${tag.posts.length} Posts`
                    : `${tag.posts.length} Posts`;
            tagElement.appendChild(name);
            tagElement.appendChild(count);
            tagsFragment.appendChild(tagElement);
        });
        this.el.tags.appendChild(tagsFragment);
    }

    connectedCallback(): void {
        (async () => {
            await this.loadPopularTags();
            this.displayPopularTags();
        })();
    }
}

if (!customElements.get('search-panel')) {
    customElements.define('search-panel', SearchPanel);
}

export default SearchPanel;
