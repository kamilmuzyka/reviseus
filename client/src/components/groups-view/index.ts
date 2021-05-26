/** @module Component/GroupsView */
import html from '../../utils/html-tag';
import '../primary-heading/index';

const template = document.createElement('template');
template.innerHTML = html`
    <style></style>
    <primary-heading>Groups</primary-heading>
`;

class GroupsView extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

if (!customElements.get('groups-view')) {
    customElements.define('groups-view', GroupsView);
}

export default GroupsView;
