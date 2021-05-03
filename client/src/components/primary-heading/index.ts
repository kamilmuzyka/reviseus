/** @module Component/PrimaryHeading */
import html from '../../utils/html-tag';

const template = document.createElement('template');
template.innerHTML = html`
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

customElements.define('primary-heading', PrimaryHeading);
