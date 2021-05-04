/** @module Component/App */
import html from './utils/html-tag';
import './components/google-button/index';
import './components/primary-heading/index';
import './components/browser-router/index';
import './components/router-link/index';

const template = document.createElement('template');
template.innerHTML = html`
    <div>
        <nav>
            <a href="/home" is="router-link">Home</a>
            <a href="/settings" is="router-link">Settings</a>
        </nav>
        <browser-router>
            <!-- browser-route -->
            <div data-path="/home">
                <!-- component -->
                <div style="display: none">Home</div>
            </div>
            <div data-path="/settings">
                <!-- component -->
                <div style="display: none">Settings</div>
            </div>
        </browser-router>
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

if (!customElements.get('the-app')) {
    customElements.define('the-app', App);
}
