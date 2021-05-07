/** @module Component/PrimaryContainer */
import html from '../../utils/html-tag';

const template = document.createElement('template');
template.innerHTML = html`
    <style>
        .container {
            margin: 0 auto;
            padding: 2.5rem;
            width: 1320px;
            max-width: 100%;
        }
    </style>
    <div class="container">
        <slot></slot>
    </div>
`;

class PrimaryContainer extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

if (!customElements.get('primary-container')) {
    customElements.define('primary-container', PrimaryContainer);
}

export default PrimaryContainer;
