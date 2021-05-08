/** @module Component/BrowserRouter */
import html from '../../utils/html-tag';

interface IBrowserRouter {
    routes: Route[];
}

interface Route {
    path: string;
    exact: boolean;
    component: HTMLElement;
}

interface Params {
    [param: string]: string | undefined;
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
 *  <!-- Any parameters will be attached to a component's dataset, -->
 *  <!-- retaining their names e.g. dataset.id. -->
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
                if (component instanceof HTMLElement) {
                    this.routes.push({
                        path,
                        exact,
                        component,
                    });
                }
            }
        });
    }

    /** Extracts parameters from a path based on a provided pattern. For
     * example, for pattern <i>/user/:id</i> and a path <i>/user/1</i>, the
     * returned object will be <i>{id: 1}</i>. Parameters are considered all
     * words starting with ":". A pattern can have multiple parameters, but they
     * must be split with "/" e.g. <i>/group/:groupId/users/:userId.</i>. */
    extractPathParams(pattern: string, path: string): Params {
        const currentPath = path.split('/').splice(1);
        const params = {};
        pattern
            .split('/')
            .slice(1)
            .map((item, index) => {
                if (item[0] === ':') {
                    return [item.substring(1), index];
                }
            })
            .filter((item) => item)
            .forEach((item) => {
                if (item) {
                    params[item[0]] = currentPath[item[1]];
                }
            });
        return params;
    }

    /** Attaches any found path parameters to a component's dataset. */
    applyPathParams(path: string, component: HTMLElement): void {
        const params = this.extractPathParams(path, location.pathname);
        for (const [param, value] of Object.entries(params)) {
            if (value) {
                component.dataset[param] = value;
            }
        }
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
                    this.applyPathParams(path, component);
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
