/** @module Component/PreferencesView */
import html from '../../utils/html-tag';
import '../primary-heading/index';

const template = document.createElement('template');
template.innerHTML = html`
    <style></style>
    <primary-heading>Preferences</primary-heading>
`;

class PreferencesView extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

if (!customElements.get('preferences-view')) {
    customElements.define('preferences-view', PreferencesView);
}

export default PreferencesView;
