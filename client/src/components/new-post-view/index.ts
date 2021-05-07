/** @module Component/NewPostView */
import html from '../../utils/html-tag';
import '../primary-heading/index';
import '../new-post-form/index';

const template = document.createElement('template');
template.innerHTML = html`
    <primary-heading>Create a new post</primary-heading>
    <new-post-form></new-post-form>
`;

class NewPostView extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

if (!customElements.get('new-post-view')) {
    customElements.define('new-post-view', NewPostView);
}

export default NewPostView;
