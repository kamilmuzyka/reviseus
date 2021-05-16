/** @module Component/ProtectedBoundary */
import html from '../../utils/html-tag';
import '../primary-heading/index';
import '../router-link/index';
import '../primary-button/index';

const template = document.createElement('template');
template.innerHTML = html`
    <style>
        .boundary-buttons {
            margin-top: 3.5rem;
            display: flex;
            flex-wrap: wrap;
        }

        .boundary-buttons > *:first-child {
            margin-right: 1.5rem;
        }
    </style>
    <section>
        <primary-heading>Login Required</primary-heading>
        <p>You must be logged in to access this page.</p>
        <div class="boundary-buttons">
            <a href="/login" is="router-link">
                <primary-button data-color="#f0f0f0">
                    <svg
                        slot="icon"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16.001"
                        height="16.001"
                        viewBox="0 0 16.001 16.001"
                    >
                        <g transform="translate(0)">
                            <path
                                d="M13.5,15.766h7.3L19.12,17.485l1.15,1.15,3.693-3.693L20.27,11.25,19.077,12.4,20.8,14.119H13.5Z"
                                transform="translate(-7.961 -6.942)"
                                fill="#f0f0f0"
                            />
                            <g transform="translate(0 0)">
                                <path
                                    d="M11.364,17.734A6.358,6.358,0,1,1,15.845,6.871l1.165-1.165a8.5,8.5,0,0,0-1.065-.892,8.007,8.007,0,1,0,1.062,12.228L15.845,15.88A6.3,6.3,0,0,1,11.364,17.734Z"
                                    transform="translate(-3.375 -3.375)"
                                    fill="#f0f0f0"
                                />
                                <path
                                    d="M31.458,17.958H31.5V18h-.046Z"
                                    transform="translate(-16.095 -9.98)"
                                    fill="#f0f0f0"
                                />
                            </g>
                        </g>
                    </svg>
                    <span>Log In</span>
                </primary-button>
            </a>
            <a href="/" is="router-link">
                <primary-button
                    data-background="transparent"
                    data-border="var(--subtle)"
                >
                    <svg
                        slot="icon"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16.001"
                        height="14.77"
                        viewBox="0 0 16.001 14.77"
                    >
                        <path
                            d="M9.529,19.27V14.347h3.693V19.27h3.754V11.885h2.4l-8-7.385-8,7.385h2.4V19.27Z"
                            transform="translate(-3.375 -4.5)"
                            fill="var(--primary-text)"
                        />
                    </svg>
                    <span>Home</span>
                </primary-button>
            </a>
        </div>
    </section>
`;

class ProtectedBoundary extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

if (!customElements.get('protected-boundary')) {
    customElements.define('protected-boundary', ProtectedBoundary);
}

export default ProtectedBoundary;
