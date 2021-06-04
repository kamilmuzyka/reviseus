/** @module Component/GroupInviteView */
import html from '../../utils/html-tag';
import Elements from '../../interfaces/elements-interface';
import '../primary-heading/index';
import '../group-invite/index';

const template = document.createElement('template');
template.innerHTML = html`
    <style>
        .container {
            margin-top: 2.5rem;
        }
    </style>
    <primary-heading>Invite New Members</primary-heading>
    <div class="container"></div>
`;

class GroupInviteView extends HTMLElement {
    private el: Elements = {};

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
        this.loadElements();
    }

    loadElements(): void {
        const requestedElements = {
            container: this.shadowRoot?.querySelector('.container'),
        };
        for (const element in requestedElements) {
            if (element) {
                this.el[element] = requestedElements[element];
            }
        }
    }

    addGroupInvite(): void {
        const groupInvite = document.createElement('group-invite');
        groupInvite.dataset.id = this.dataset.id;
        this.el.container.appendChild(groupInvite);
    }

    clearContainer(): void {
        [...this.el.container.children].forEach((child) => child.remove());
    }

    connectedCallback(): void {
        this.addGroupInvite();
    }

    disconnectedCallback(): void {
        this.clearContainer();
    }
}

if (!customElements.get('group-invite-view')) {
    customElements.define('group-invite-view', GroupInviteView);
}

export default GroupInviteView;
