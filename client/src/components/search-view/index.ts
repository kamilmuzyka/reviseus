/** @module Component/SearchView */
import html from '../../utils/html-tag';
import '../primary-heading/index';

const template = document.createElement('template');
template.innerHTML = html`
    <style></style>
    <primary-heading>Search results</primary-heading>
`;

class SearchView extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

if (!customElements.get('search-view')) {
    customElements.define('search-view', SearchView);
}

export default SearchView;
