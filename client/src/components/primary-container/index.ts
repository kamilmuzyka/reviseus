/** @module Component/PrimaryContainer */
import html from '../../utils/html-tag';

const template = document.createElement('template');
template.innerHTML = html`
    <style>
        .container {
            display: flex;
            flex-direction: column;
            position: relative;
            margin: 0 auto;
            padding: 7.5rem 2.5rem;
            width: 1320px;
            max-width: 100%;
            box-sizing: border-box;
        }

        @media (min-width: 1320px) {
            .container {
                display: grid;
                grid-template-columns: 150px 1fr 250px;
            }
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
