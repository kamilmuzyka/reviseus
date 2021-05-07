/** @module Component/GoogleButton */
import html from '../../utils/html-tag';

const template = document.createElement('template');
template.innerHTML = html`
    <style>
        .link {
            display: inline-block;
            padding: 0.8rem 1rem;
            background-color: var(--google);
            border-radius: 5px;
            text-decoration: none;
            color: var(--primary-text);
            cursor: pointer;
        }

        .content {
            display: flex;
            align-items: center;
        }

        .text {
            display: inline-block;
            margin-left: 7px;
        }
    </style>
    <a href="/auth/google" class="link">
        <div class="content">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14.44"
                height="16"
                viewBox="0 0 14.44 16"
            >
                <path
                    d="M18.011,10.149l-.074-.342H11.089v3.151H15.18A4.162,4.162,0,0,1,11.174,16.3a4.593,4.593,0,0,1-3.224-1.4,5.225,5.225,0,0,1-1.373-3.532A5.4,5.4,0,0,1,7.925,7.848a4.394,4.394,0,0,1,3.2-1.362,4.015,4.015,0,0,1,2.725,1.154l2.06-2.227A7,7,0,0,0,11.06,3.382h0A7.2,7.2,0,0,0,5.751,5.729a8.509,8.509,0,0,0-2.1,5.651A8.434,8.434,0,0,0,5.67,16.939a7.377,7.377,0,0,0,5.539,2.443,6.576,6.576,0,0,0,4.976-2.274A8.4,8.4,0,0,0,18.1,11.576,10,10,0,0,0,18.011,10.149Z"
                    transform="translate(-3.656 -3.382)"
                    fill="#ffffff"
                />
            </svg>
            <span class="text">Continue with Google</span>
        </div>
    </a>
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

if (!customElements.get('google-button')) {
    customElements.define('google-button', GoogleButton);
}

export default GoogleButton;
