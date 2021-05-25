/** @module Component/App */
import html from './utils/html-tag';
import auth from './contexts/auth';
import './components/browser-router/index';
import './components/single-route/index';
import './components/router-link/index';
import './components/primary-container/index';
import './components/secondary-container/index';
import './components/home-view/index';
import './components/new-post-view/index';
import './components/post-view/index';
import './components/login-view/index';
import './components/primary-heading/index';
import './components/search-panel/index';

const template = document.createElement('template');
template.innerHTML = html`
    <primary-container>
        <nav style="order: -2;">
            <a href="/" is="router-link">Home</a>
            <a href="/posts/new" is="router-link">New Post</a>
            <a href="/login" is="router-link">Login</a>
        </nav>
        <main>
            <secondary-container>
                <!-- Router -->
                <browser-router>
                    <!-- Home -->
                    <single-route data-path="/" data-exact="true">
                        <home-view></home-view>
                    </single-route>
                    <!-- New Post -->
                    <single-route
                        data-path="/posts/new"
                        data-exact="true"
                        data-protect="true"
                    >
                        <new-post-view></new-post-view>
                    </single-route>
                    <!-- Single Post -->
                    <single-route data-path="/posts/:id">
                        <post-view></post-view>
                    </single-route>
                    <!-- Login -->
                    <single-route data-path="/login" data-exact="true">
                        <login-view></login-view>
                    </single-route>
                    <!-- 404 -->
                    <single-route>
                        <primary-heading>404</primary-heading>
                    </single-route>
                </browser-router>
            </secondary-container>
        </main>
        <search-panel></search-panel>
    </primary-container>
`;

/** A top-level component installed in index.html as an entry point to the
 * JavaScript application. */
class App extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback(): void {
        auth.check();
    }
}

if (!customElements.get('the-app')) {
    customElements.define('the-app', App);
}

export default App;
