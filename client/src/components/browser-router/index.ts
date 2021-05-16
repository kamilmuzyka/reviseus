/** @module Component/BrowserRouter */
import auth from '../../contexts/auth';
import html from '../../utils/html-tag';
import '../protected-boundary/index';

interface IBrowserRouter {
    routes: Route[];
}

interface Route {
    path: string;
    exact: boolean;
    protect: boolean;
    component: HTMLElement;
}

interface RouteParams {
    [name: string]: string | undefined;
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
        this.cacheRoutes();
        this.changeRoute();
        this.addEventListeners();
    }

    /** A static utility method. Use to redirect users without reloading the
     * page. */
    static redirect(href: string): void {
        if (location.href === href) {
            return;
        }
        history.pushState({}, '', href);
        window.dispatchEvent(new Event('popstate'));
    }

    /** Saves all the routes, so components can easily be added and removed from
     * the DOM. */
    cacheRoutes(): void {
        const routes = [...this.children];
        routes.forEach((route) => {
            if (route instanceof HTMLElement) {
                const path = route.dataset.path ?? '';
                const exact = Boolean(route.dataset.exact);
                const protect = Boolean(route.dataset.protect);
                const component = route.children[0];
                if (component instanceof HTMLElement) {
                    this.routes.push({
                        path,
                        exact,
                        protect,
                        component,
                    });
                }
            }
        });
    }

    /** Extracts parameters from a route based on its pattern. For example, for
     * pattern <i>/user/:id</i> and a path <i>/user/1</i>, the returned object
     * will be <i>{id: 1}</i>. Parameters are considered all words starting with
     * ":". A pattern can have multiple parameters, but they must be separated
     * with "/" e.g. <i>/group/:groupId/users/:userId.</i>. */
    extractRouteParams(pattern: string, path: string): RouteParams {
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
    applyRouteParams(route: Route): void {
        const { path, component } = route;
        const params = this.extractRouteParams(path, location.pathname);
        for (const [param, value] of Object.entries(params)) {
            if (value) {
                component.dataset[param] = value;
            }
        }
    }

    /** Renders components based on the current location. */
    changeRoute(): void {
        const exactLocation = location.pathname;
        const inexactLocation = `/${location.pathname.split('/')[1]}`;
        let isMatched = false;
        /** Clear browser-router's children on each routing cycle. */
        [...this.children].forEach((child) => child.remove());
        /** Iterate through all the routes and their components. */
        this.routes.forEach((route, index) => {
            const { path, exact, protect, component } = route;
            if (!isMatched) {
                const isProtected = protect && !auth.ok;
                const isExactLocation = exact && path === exactLocation;
                const isInExactLocation =
                    !exact &&
                    path?.includes(inexactLocation) &&
                    inexactLocation !== '/';
                /** Prevent the component from being rendered if the matched
                 * route is protected and the user is not authenticated. */
                if (isProtected && (isExactLocation || isInExactLocation)) {
                    const boundary = document.createElement(
                        'protected-boundary'
                    );
                    this.appendChild(boundary);
                    isMatched = true;
                    return;
                }
                /** Display a component if it's matching the exact route. */
                if (isExactLocation) {
                    this.appendChild(component);
                    isMatched = true;
                    return;
                }
                /** Display a component if it's matching the inexact (catch-all)
                 * route. */
                if (isInExactLocation) {
                    this.applyRouteParams(route);
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
        window.addEventListener('popstate', () => this.changeRoute());
    }
}

if (!customElements.get('browser-router')) {
    customElements.define('browser-router', BrowserRouter);
}

export default BrowserRouter;
