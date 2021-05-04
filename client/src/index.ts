/** @module Component/App */
import html from './utils/html-tag';
import './components/google-button/index';
import './components/primary-heading/index';
import './components/browser-router/index';

const template = document.createElement('template');
template.innerHTML = html`
    <div>
        <nav>
            <a href="/home">Home</a>
            <a href="/settings">Settings</a>
        </nav>
        <browser-router>
            <!-- browser-route -->
            <div path="/home" id="single-route">
                <!-- component -->
                <div style="display: none">Home</div>
            </div>
            <div path="/settings" id="single-route">
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

    connectedCallback() {
        const routerLink = this.shadowRoot?.querySelector('a');

        routerLink?.addEventListener('click', (e) => {
            e.preventDefault();
            const target = e.target;
            if (target instanceof HTMLAnchorElement) {
                const href = target.href;
                if (location.pathname === href) {
                    return;
                }
                history.pushState({}, '', href);
                window.dispatchEvent(new Event('popstate'));
            }
        });
    }
}

if (!customElements.get('the-app')) {
    customElements.define('the-app', App);
}
