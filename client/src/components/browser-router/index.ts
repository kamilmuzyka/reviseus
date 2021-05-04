/** @module Component/BrowserRouter */
import html from '../../utils/html-tag';

const template = document.createElement('template');
template.innerHTML = html`<slot></slot>`;

class BrowserRouter extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
    }

    route() {
        const routes = [...this.children];
        routes.forEach((route) => {
            const component = route.children[0];
            if (
                route instanceof HTMLElement &&
                component instanceof HTMLElement
            ) {
                component.style.display = 'none';
                if (route.getAttribute('path') === location.pathname) {
                    component.style.display = 'block';
                }
            }
        });
    }

    connectedCallback() {
        this.route();
        window.addEventListener('popstate', () => this.route());
    }
}

if (!customElements.get('browser-router')) {
    customElements.define('browser-router', BrowserRouter);
}
