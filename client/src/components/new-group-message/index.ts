/** @module Component/NewGroupMessage */
import html from '../../utils/html-tag';
import Elements from '../../interfaces/elements-interface';
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
        <div class="invite-container"></div>
    </div>
`;

class NewGroupMessage extends HTMLElement {
    private el: Elements = {};

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
        this.loadElements();
    }

    loadElements(): void {
        const requestedElements = {
            container: this.shadowRoot?.querySelector('.invite-container'),
        };
        for (const element in requestedElements) {
            if (element) {
                this.el[element] = requestedElements[element];
            }
        }
    }

    renderGroupInvite(): void {
        const groupInvite = document.createElement('group-invite');
        groupInvite.classList.add('invite');
        groupInvite.dataset.id = this.dataset.id;
        this.el.container.appendChild(groupInvite);
    }

    removeGroupInvite(): void {
        [...this.el.container.children].forEach((child) => child.remove());
    }

    connectedCallback(): void {
        this.renderGroupInvite();
    }

    disconnectedCallback(): void {
        this.removeGroupInvite();
    }
}

if (!customElements.get('new-group-message')) {
    customElements.define('new-group-message', NewGroupMessage);
}

export default NewGroupMessage;
