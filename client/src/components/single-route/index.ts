/** @module Component/SingleRoute */
import html from '../../utils/html-tag';

const template = document.createElement('template');
template.innerHTML = html`
    <style>
        ::slotted(*) {
            display: none;
        }

        ::slotted(.active) {
            display: block;
        }
    </style>
    <slot></slot>
`;

class SingleRoute extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

if (!customElements.get('single-route')) {
    customElements.define('single-route', SingleRoute);
}
