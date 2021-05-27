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
    /** Buffered HTML elements. */
    private el: Elements = {};

    /** Searched term. */
    private query;

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

    connectedCallback(): void {
        this.saveSearchQuery();
    }
}

if (!customElements.get('search-view')) {
    customElements.define('search-view', SearchView);
}

export default SearchView;
