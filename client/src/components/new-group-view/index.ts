/** @module Component/NewGroupView */
import html from '../../utils/html-tag';
import '../new-group-form/index';

const template = document.createElement('template');
template.innerHTML = html`
    <style>
        .new-group-heading {
            margin-bottom: 3.5rem;
        }
    </style>
    <div>
        <primary-heading class="new-group-heading"
            >Create a new group</primary-heading
        >
        <new-group-form></new-group-form>
    </div>
`;

class NewGroupView extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

if (!customElements.get('new-group-view')) {
    customElements.define('new-group-view', NewGroupView);
}

export default NewGroupView;
