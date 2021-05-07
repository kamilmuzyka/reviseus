/** @module Component/BrowserRouter */
import html from '../../utils/html-tag';

interface Route {
    path: string;
    exact: boolean;
    component: Element;
}

interface IBrowserRouter {
    routes: Route[];
}

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
class BrowserRouter extends HTMLElement implements IBrowserRouter {
    /** Cached routes. */
    routes: Route[] = [];

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
        this.cache();
        this.route();
        this.addEventListeners();
    }

    /** A static utility method. Use to redirect users without reloading the
     * page. */
    static redirect(href: string): void {
        if (location.pathname === href) {
            return;
        }
        history.pushState({}, '', href);
        window.dispatchEvent(new Event('popstate'));
    }

    /** Saves all the routes, so components can easily be added and removed from
     * the DOM. */
    cache(): void {
        const routes = [...this.children];
        routes.forEach((route) => {
            if (route instanceof HTMLElement) {
                const path = route.dataset.path ?? '';
                const exact = Boolean(route.dataset.exact);
                const component = route.children[0];
                if (component) {
                    this.routes.push({
                        path,
                        exact,
                        component,
                    });
                }
            }
        });
    }

    /** Renders components based on the current location. */
    route(): void {
        const exactLocation = location.pathname;
        const inexactLocation = `/${location.pathname.split('/')[1]}`;
        let isMatched = false;
        /** Iterate through all the routes and their components. */
        this.routes.forEach((route, index) => {
            const { path, exact, component } = route;
            component.remove();
            if (!isMatched) {
                /** Display a component if it's matching the exact route. */
                if (exact && path === exactLocation) {
                    this.appendChild(component);
                    isMatched = true;
                    return;
                }
                /** Display a component if it's matching the inexact (catch-all)
                 * route. */
                if (
                    !exact &&
                    path?.includes(inexactLocation) &&
                    inexactLocation !== '/'
                ) {
                    this.appendChild(component);
                    isMatched = true;
                    return;
                }
                /** Use the last route as a fallback if no other route was
                 * matched by the end of the iteration. */
                if (index === this.routes.length - 1) {
                    this.appendChild(component);
                    return;
                }
            }
        });
    }

    addEventListeners(): void {
        window.addEventListener('popstate', () => this.route());
    }
}

if (!customElements.get('browser-router')) {
    customElements.define('browser-router', BrowserRouter);
}

export default BrowserRouter;
