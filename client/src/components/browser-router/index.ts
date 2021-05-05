/** @module Component/BrowserRouter */
import html from '../../utils/html-tag';

const template = document.createElement('template');
template.innerHTML = html`<slot></slot>`;

/** A component used to implement browser routing functionality. Use with
 * <i>"single-route"</i> element to switch between components based on the
 * current location:
 * ```html
 * <browser-router>
 *  <single-route data-path="/" data-exact="true">
 *     <home-view></home-view>
 *  </single-route>
 *  <single-route data-path="/preferences" data-exact="true">
 *     <preferences-view></preferennces-view>
 *  </single-route>
 * </browser-router>
 * ``` */
class BrowserRouter extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
    }

    route(): void {
        const routes = [...this.children];
        routes.forEach((route) => {
            const component = route.children[0];
            if (
                route instanceof HTMLElement &&
                component instanceof HTMLElement
            ) {
                component.classList.remove('active');
                if (
                    route.dataset.path === location.pathname &&
                    route.dataset.exact
                ) {
                    component.classList.add('active');
                }
                const inexactLocation = `/${location.pathname.split('/')[1]}`;
                if (
                    route.dataset.path === inexactLocation &&
                    !route.dataset.exact
                ) {
                    component.classList.add('active');
                }
            }
        });
    }

    connectedCallback(): void {
        this.route();
        window.addEventListener('popstate', () => this.route());
    }
}

if (!customElements.get('browser-router')) {
    customElements.define('browser-router', BrowserRouter);
}

export default BrowserRouter;
