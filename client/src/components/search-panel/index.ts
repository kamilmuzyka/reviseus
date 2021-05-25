/** @module Component/SearchPanel */
import html from '../../utils/html-tag';
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
            margin: 0 auto;
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
        <ul class="search-panel-tags">
            <li class="tag">
                <a class="tag-name" href="#"> #lorem </a>
                <div class="tag-count">93 Posts</div>
            </li>
            <li class="tag">
                <a class="tag-name" href="#"> #lorem </a>
                <div class="tag-count">93 Posts</div>
            </li>
            <li class="tag">
                <a class="tag-name" href="#"> #lorem </a>
                <div class="tag-count">93 Posts</div>
            </li>
        </ul>
    </section>`;

class SearchPanel extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

if (!customElements.get('search-panel')) {
    customElements.define('search-panel', SearchPanel);
}

export default SearchPanel;
