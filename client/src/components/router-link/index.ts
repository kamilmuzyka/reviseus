/** @module Component/RouterLink */
import BrowserRouter from '../browser-router';

/** A component that extends <i>"a"</i> tag. It prevents <i>"a"</i> from
 * reloading the page but still updates the history. To implement, use
 * <i>"a"</i> tag with <i>"is"</i> attribute:
 * ```html
 * <a href="#" is="router-link">Link</a>
 * ```
 * If you would like the link to receive "active" class whenever it's matching
 * the current location, use <i>data-check="true"</i> attribute:
 * ```html
 * <a href="#" is="router-link" data-check="true">Link</a>
 * ```
 * You can use this technique to style the link based on the current location.
 * */
class RouterLink extends HTMLAnchorElement {
    constructor() {
        super();
        this.addEventListeners();
    }

    addEventListeners(): void {
        this.addEventListener('click', (e) => {
            e.preventDefault();
            BrowserRouter.redirect(this.href);
        });
        if (this.dataset.check) {
            window.addEventListener('popstate', () => this.checkIfActive());
        }
    }

    removeEventListeners(): void {
        window.removeEventListener('popstate', () => this.checkIfActive());
    }

    addActive(): void {
        this.classList.add('active');
    }

    removeActive(): void {
        this.classList.remove('active');
    }

    checkIfActive(): void {
        this.removeActive();
        if (this.href === location.href) {
            this.addActive();
        }
    }

    connectedCallback(): void {
        if (this.dataset.check) {
            this.checkIfActive();
        }
    }

    disconnectedCallback(): void {
        if (this.dataset.check) {
            this.removeEventListeners();
        }
    }
}

if (!customElements.get('router-link')) {
    customElements.define('router-link', RouterLink, { extends: 'a' });
}

export default RouterLink;
