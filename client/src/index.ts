/** @module Component/App */
import html from './utils/html-tag';
import auth from './contexts/auth';
import theme from './contexts/theme';
import './components/browser-router/index';
import './components/single-route/index';
import './components/router-link/index';
import './components/primary-container/index';
import './components/main-menu/index';
import './components/menu-button/index';
import './components/secondary-container/index';
import './components/group-view/index';
import './components/groups-view/index';
import './components/new-group-view/index';
import './components/group-join/index';
import './components/group-invite-view/index';
import './components/preferences-view/index';
import './components/search-view/index';
import './components/new-post-view/index';
import './components/post-view/index';
import './components/login-view/index';
import './components/primary-heading/index';
import './components/search-panel/index';
import './components/logout-modal/index';

const template = document.createElement('template');
template.innerHTML = html`
    <primary-container>
        <!-- Navigation -->
        <main-menu></main-menu>
        <!-- Main Content -->
        <main>
            <secondary-container>
                <browser-router>
                    <!-- Home View -->
                    <single-route data-path="/" data-exact="true">
                        <group-view></group-view>
                    </single-route>
                    <!-- User Groups View -->
                    <single-route
                        data-path="/groups"
                        data-exact="true"
                        data-protect="true"
                    >
                        <groups-view></groups-view>
                    </single-route>
                    <!-- New Group View -->
                    <single-route
                        data-path="/group/new"
                        data-exact="true"
                        data-protect="true"
                    >
                        <new-group-view></new-group-view>
                    </single-route>
                    <!-- Single Group View -->
                    <single-route data-path="/groups/:id">
                        <group-view></group-view>
                    </single-route>
                    <!-- Group Invitation View -->
                    <single-route
                        data-path="/join/group/:id"
                        data-protect="true"
                    >
                        <group-join></group-join>
                    </single-route>
                    <!-- Group Invitation Link View -->
                    <single-route
                        data-path="/invite/group/:id"
                        data-protect="true"
                    >
                        <group-invite-view></group-invite-view>
                    </single-route>
                    <!-- Preferences View -->
                    <single-route
                        data-path="/preferences"
                        data-exact="true"
                        data-protect="true"
                    >
                        <preferences-view></preferences-view>
                    </single-route>
                    <!-- Search Results View -->
                    <single-route data-path="/search">
                        <search-view></search-view>
                    </single-route>
                    <!-- New Post View -->
                    <single-route
                        data-path="/posts/new"
                        data-exact="true"
                        data-protect="true"
                    >
                        <new-post-view></new-post-view>
                    </single-route>
                    <!-- Single Post View -->
                    <single-route data-path="/posts/:id">
                        <post-view></post-view>
                    </single-route>
                    <!-- Login View -->
                    <single-route data-path="/login" data-exact="true">
                        <login-view></login-view>
                    </single-route>
                    <!-- 404 View -->
                    <single-route>
                        <primary-heading>404</primary-heading>
                    </single-route>
                </browser-router>
            </secondary-container>
        </main>
        <!-- Search Panel -->
        <search-panel></search-panel>
    </primary-container>
    <logout-modal></logout-modal>
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
        theme.load();
    }
}

if (!customElements.get('the-app')) {
    customElements.define('the-app', App);
}

export default App;
