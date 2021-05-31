/** @module Component/GroupJoin */
import html from '../../utils/html-tag';
import '../primary-heading/index';

const template = document.createElement('template');
template.innerHTML = html`
    <style></style>
    <primary-heading>You've been invited to a group</primary-heading>
`;

class GroupJoin extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

if (!customElements.get('group-join')) {
    customElements.define('group-join', GroupJoin);
}

export default GroupJoin;
