/** @module Component/GoogleButton */
import html from '../../utils/html-tag';

const template = document.createElement('template');
template.innerHTML = html`
    <style>
        a {
            display: inline-block;
            cursor: pointer;
        }
    </style>
    <a href="/auth/google">Continue with Google</a>
`;

/**  A link element that redirects users to the Google consent screen so they
 * can authenticate themselves. */
class GoogleButton extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('google-button', GoogleButton);
