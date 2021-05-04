/** @module Component/RouterLink */

class RouterLink extends HTMLAnchorElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.addEventListener('click', (e) => {
            e.preventDefault();
            const href = this.href;
            if (location.pathname === href) {
                return;
            }
            history.pushState({}, '', href);
            window.dispatchEvent(new Event('popstate'));
        });
    }
}

if (!customElements.get('router-link')) {
    customElements.define('router-link', RouterLink, { extends: 'a' });
}
