/** @module Component/PrimaryHeading */
import html from '../../utils/html-tag';

const template = document.createElement('template');
template.innerHTML = html`
    <style>
        .heading {
            margin: 0 0 3.5rem 0;
            font-family: 'Open Sans', sans-serif;
            font-size: 3.2rem;
            font-weight: 700;
        }
    </style>
    <h2 class="heading">
        <slot></slot>
    </h2>
`;

/** A generic UI component. */
class PrimaryHeading extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
    }

    addCustomStyles(): void {
        const heading = this.shadowRoot?.querySelector('.heading');
        const color = this.dataset.color;
        if (heading instanceof HTMLElement) {
            if (color) {
                heading.style.color = color;
            }
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
