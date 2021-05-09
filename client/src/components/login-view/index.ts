/** @module Component/LoginView */
import html from '../../utils/html-tag';
import '../primary-heading/index';
import '../google-button/index';

const template = document.createElement('template');
template.innerHTML = html`
    <primary-heading>Sign Up / Log In</primary-heading>
    <google-button></google-button>
`;

class LoginView extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

if (!customElements.get('login-view')) {
    customElements.define('login-view', LoginView);
}

export default LoginView;
