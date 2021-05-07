/** @module Component/RouterLink */
import BrowserRouter from '../browser-router';

/** A component that extends <i>"a"</i> tag. It prevents <i>"a"</i> from
 * reloading the page but still updates the history. To implement, use
 * <i>"a"</i> tag with <i>"is"</i> attribute:
 * ```html
 * <a href="#" is="router-link">Link</a>
 * ``` */
class RouterLink extends HTMLAnchorElement {
    constructor() {
        super();
    }

    connectedCallback(): void {
        this.addEventListener('click', (e) => {
            e.preventDefault();
            const href = this.href;
            BrowserRouter.redirect(href);
        });
    }
}

if (!customElements.get('router-link')) {
    customElements.define('router-link', RouterLink, { extends: 'a' });
}

export default RouterLink;
