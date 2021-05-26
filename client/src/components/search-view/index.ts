/** @module Component/SearchView */
import Elements from '../../interfaces/elements-interface';
import html from '../../utils/html-tag';
import '../primary-heading/index';

const template = document.createElement('template');
template.innerHTML = html`
    <style>
        .query {
            color: var(--accent);
        }
    </style>
    <primary-heading
        >Search results for <span class="query"></span
    ></primary-heading>
`;

class SearchView extends HTMLElement {
    private el: Elements = {};
    private query;

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
        this.loadElements();
    }

    loadElements(): void {
        const requestedElements = {
            query: this.shadowRoot?.querySelector('.query'),
        };
        for (const element in requestedElements) {
            if (element) {
                this.el[element] = requestedElements[element];
            }
        }
    }

    saveSearchQuery(): void {
        const searchParams = new URLSearchParams(location.search);
        this.query = searchParams.get('query');
    }

    connectedCallback(): void {
        this.saveSearchQuery();
        /** Temporary */
        this.el.query.textContent = this.query;
    }
}

if (!customElements.get('search-view')) {
    customElements.define('search-view', SearchView);
}

export default SearchView;
