/** @module Component/ProtectedBoundary */
import html from '../../utils/html-tag';

const template = document.createElement('template');
template.innerHTML = html`
    <div>You need to be logged in to access this page.</div>
`;

class ProtectedBoundary extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

if (!customElements.get('protected-boundary')) {
    customElements.define('protected-boundary', ProtectedBoundary);
}

export default ProtectedBoundary;
