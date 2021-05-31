/** @module Component/NewGroupMessage */
import html from '../../utils/html-tag';
import '../primary-heading/index';
import '../group-invite/index';

const template = document.createElement('template');
template.innerHTML = html`
    <style>
        .invite {
            display: block;
            margin-top: 2.5rem;
        }
    </style>
    <div>
        <primary-heading>Group created ✨</primary-heading>
        <group-invite class="invite"></group-invite>
    </div>
`;

class NewGroupMessage extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

if (!customElements.get('new-group-message')) {
    customElements.define('new-group-message', NewGroupMessage);
}

export default NewGroupMessage;
