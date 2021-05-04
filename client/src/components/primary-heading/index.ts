/** @module Component/PrimaryHeading */
import html from '../../utils/html-tag';

const template = document.createElement('template');
template.innerHTML = html`
    <style>
        h2 {
            font-family: 'Open Sans', sans-serif;
            font-size: 3.2rem;
            font-weight: 700;
        }
    </style>
    <h2>
        <slot></slot>
    </h2>
`;

class PrimaryHeading extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

if (!customElements.get('primary-heading')) {
    customElements.define('primary-heading', PrimaryHeading);
}
