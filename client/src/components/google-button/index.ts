/** @module Component/GoogleButton */
import html from '../../utils/html-tag';

/**  A link element that redirects users to the Google consent screen so they
 * can authenticate themselves. */
const GoogleButton = (): void => {
    if (!customElements.get('google-button')) {
        const template = document.createElement('template');
        template.innerHTML = html`
            <style>
                button {
                    cursor: pointer;
                }
            </style>
            <a href="/auth/google">Continue with Google</a>
        `;
        customElements.define(
            'google-button',
            class extends HTMLElement {
                constructor() {
                    super();
                    const shadowRoot = this.attachShadow({ mode: 'open' });
                    shadowRoot.appendChild(template.content.cloneNode(true));
                }
            }
        );
    }
};

export default GoogleButton;
