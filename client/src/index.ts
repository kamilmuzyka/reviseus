/** @module Component/App */
import html from './utils/html-tag';
import './components/google-button/index';

const template = document.createElement('template');
template.innerHTML = html`
    <div>
        <google-button></google-button>
    </div>
`;

/** A top-level component installed in index.html as an entry point to the
 * JavaScript application. */
class App extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('the-app', App);
