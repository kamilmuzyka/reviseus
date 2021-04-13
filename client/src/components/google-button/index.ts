/** @module Component/GoogleButton */
import html from '../../utils/html-tag';

/** */
const GoogleButton = (): void => {
    if (!customElements.get('google-button')) {
        const template = document.createElement('template');
        template.innerHTML = html`
            <style>
                button {
                    cursor: pointer;
                }
            </style>
            <button>Continue with Google</button>
        `;
        customElements.define(
            'google-button',
            class extends HTMLElement {
                constructor() {
                    super();
                    const shadowRoot = this.attachShadow({ mode: 'open' });
                    shadowRoot.appendChild(template.content.cloneNode(true));
                }
                connectedCallback() {
                    const button = this.shadowRoot?.querySelector('button');
                    button?.addEventListener('click', () => {
                        fetch('/auth/google');
                    });
                }
            }
        );
    }
};

export default GoogleButton;
