/** @module Component/App */
import html from './utils/html-tag';
import './components/router-link/index';
import './components/browser-router/index';
import './components/single-route/index';
import './components/primary-heading/index';
import './components/new-post-form/index';
import './components/google-button/index';

const template = document.createElement('template');
template.innerHTML = html`
    <div>
        <nav>
            <a href="/" is="router-link">Home</a>
            <a href="/posts/new" is="router-link">New Post</a>
            <a href="/login" is="router-link">Login</a>
        </nav>
        <browser-router>
            <single-route data-path="/" data-exact="true">
                <primary-heading>Home</primary-heading>
            </single-route>
            <single-route data-path="/posts/new" data-exact="true">
                <new-post-form></new-post-form>
            </single-route>
            <single-route data-path="/posts/:id">
                <primary-heading>Post</primary-heading>
            </single-route>
            <single-route data-path="/login" data-exact="true">
                <google-button></google-button>
            </single-route>
            <single-route>
                <primary-heading>404</primary-heading>
            </single-route>
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

export default App;
