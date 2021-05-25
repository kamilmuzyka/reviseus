/** @module Component/SecondaryContainer */
import html from '../../utils/html-tag';

const template = document.createElement('template');
template.innerHTML = html`
    <style>
        .container {
            position: relative;
            margin: 0 auto;
            width: 650px;
            max-width: 100%;
            box-sizing: border-box;
        }
    </style>
    <div class="container">
        <slot></slot>
    </div>
`;

class SecondaryContainer extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

if (!customElements.get('secondary-container')) {
    customElements.define('secondary-container', SecondaryContainer);
}

export default SecondaryContainer;
