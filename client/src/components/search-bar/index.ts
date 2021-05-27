/** @module Component/SearchBar */
import Elements from '../../interfaces/elements-interface';
import BrowserRouter from '../browser-router';
import html from '../../utils/html-tag';

const template = document.createElement('template');
template.innerHTML = html`
    <style>
        .search-bar {
            position: relative;
        }

        .search-bar-icon {
            position: absolute;
            top: 50%;
            left: 1rem;
            transform: translateY(-50%);
        }

        .search-bar-input {
            box-sizing: border-box;
            padding: 0.8rem 1rem 0.8rem 3.2rem;
            width: 100%;
            outline: 0;
            border: none;
            border-radius: 5px;
            background-color: var(--tertiary-bg);
            font-family: inherit;
            font-size: 1.6rem;
            color: var(--primary-text);
        }
    </style>
    <div class="search-bar">
        <svg
            class="search-bar-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14.003"
            viewBox="0 0 14 14.003"
        >
            <path
                d="M18.336,17.483l-2.224-2.245-1.67-1.685a5.549,5.549,0,1,0-.842.853l3.868,3.9a.6.6,0,0,0,.846.022A.6.6,0,0,0,18.336,17.483Zm-8.254-3.03a4.382,4.382,0,1,1,3.1-1.283A4.354,4.354,0,0,1,10.082,14.453Z"
                transform="translate(-4.5 -4.493)"
                fill="var(--primary-text)"
            />
        </svg>
        <input class="search-bar-input" type="text" placeholder="Search" />
    </div>
`;

class SearchBar extends HTMLElement {
    /** Buffered HTML elements. */
    private el: Elements = {};

    /** The ID of the timer used in search debouncing. */
    private timer;

    /** Time after which the search starts, counted from the moment user stops
     * typing. */
    private delay = 400;

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
        this.loadElements();
        this.addEventListeners();
    }

    /** Buffers required HTML elements. */
    loadElements(): void {
        const requestedElements = {
            input: this.shadowRoot?.querySelector('.search-bar-input'),
        };
        for (const element in requestedElements) {
            if (element) {
                this.el[element] = requestedElements[element];
            }
        }
    }

    /** Redirects the user to the search results page. */
    goToSearchResults(): void {
        if (this.el.input instanceof HTMLInputElement) {
            const query = this.el.input.value.trim();
            if (query) {
                BrowserRouter.redirect(`/search?query=${query}`);
            }
        }
    }

    /** Clears the search bar. */
    clearInput(): void {
        if (!location.href.includes('search')) {
            if (this.el.input instanceof HTMLInputElement) {
                this.el.input.value = '';
            }
        }
    }

    /** Slows down the searching process to prevent excessive requests sent to
     * the server and to preserve meaningful window history. */
    debouncedSearch(): void {
        if (this.el.input instanceof HTMLInputElement) {
            clearTimeout(this.timer);
            if (this.el.input.value) {
                this.timer = setTimeout(
                    () => this.goToSearchResults(),
                    this.delay
                );
            }
        }
    }

    /** Adds global and local event listeners. */
    addEventListeners(): void {
        this.el.input.addEventListener('keyup', () => this.debouncedSearch());
        window.addEventListener('popstate', () => this.clearInput());
    }
}

if (!customElements.get('search-bar')) {
    customElements.define('search-bar', SearchBar);
}

export default SearchBar;
