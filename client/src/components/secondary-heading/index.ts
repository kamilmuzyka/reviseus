/** @module Component/SecondaryHeading */
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
            font-size: 2.4rem;
            font-weight: 700;
        }
    </style>
    <h3 class="heading">
        <slot></slot>
    </h3>
`;

class SecondaryHeading extends HTMLElement {
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

if (!customElements.get('secondary-heading')) {
    customElements.define('secondary-heading', SecondaryHeading);
}

export default SecondaryHeading;
