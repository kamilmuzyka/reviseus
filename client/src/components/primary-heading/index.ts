/** @module Component/PrimaryHeading */
import html from '../../utils/html-tag';
import Elements from '../../interfaces/elements-interface';

const template = document.createElement('template');
template.innerHTML = html`
    <style>
        :host {
            display: block;
        }

        .heading {
            margin: 0;
            max-width: 100%;
            word-break: break-word;
            font-family: 'Open Sans', sans-serif;
            font-size: 3.2rem;
            font-weight: 700;
        }
    </style>
    <h2 class="heading">
        <slot></slot>
    </h2>
`;

class PrimaryHeading extends HTMLElement {
    private el: Elements = {};

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
        this.loadElements();
    }

    loadElements(): void {
        const requestedElements = {
            heading: this.shadowRoot?.querySelector('.heading'),
        };
        for (const element in requestedElements) {
            if (element) {
                this.el[element] = requestedElements[element];
            }
        }
    }

    addCustomStyles(): void {
        const color = this.dataset.color;
        if (color) {
            this.el.heading.style.color = color;
        }
    }

    connectedCallback(): void {
        this.addCustomStyles();
    }
}

if (!customElements.get('primary-heading')) {
    customElements.define('primary-heading', PrimaryHeading);
}

export default PrimaryHeading;
