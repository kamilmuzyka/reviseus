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
 *  <!-- Mind the order. Exact routes should always go before the catch-all routes. -->
 *  <single-route data-path="/posts" data-exact="true">
 *     <posts-view></posts-view>
 *  </single-route>
 *  <single-route data-path="/posts/:id">
 *     <single-post></single-post>
 *  </single-route>
 *  <!-- The last route is always a fallback route. -->
 *  <!-- It renders if no other route is matching the current location. -->
 *  <single-route>
 *     <page-404></page-404>
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
        const exactLocation = location.pathname;
        const inexactLocation = `/${location.pathname.split('/')[1]}`;
        let isMatched = false;
        /** Iterate through all the routes and their components. */
        routes.forEach((route, index) => {
            const component = route.children[0];
            component.classList.remove('active');
            /** Render only single component out of all. */
            if (
                !isMatched &&
                route instanceof HTMLElement &&
                component instanceof HTMLElement
            ) {
                /** Display a component if it's matching the exact route. */
                if (
                    route.dataset.exact &&
                    route.dataset.path === exactLocation
                ) {
                    component.classList.add('active');
                    isMatched = true;
                    return;
                }
                /** Display a component if it's matching the inexact route. */
                if (
                    !route.dataset.exact &&
                    route.dataset.path?.includes(inexactLocation) &&
                    inexactLocation !== '/'
                ) {
                    component.classList.add('active');
                    isMatched = true;
                    return;
                }
                /** Display the last component as a fallback if no route was
                 * matching at the end of iteration. */
                if (index === routes.length - 1) {
                    component.classList.add('active');
                    return;
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
