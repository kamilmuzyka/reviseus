/** @module Component/HomeView */
import html from '../../utils/html-tag';
import '../primary-heading/index';
import '../router-link/index';
import '../primary-button/index';

const template = document.createElement('template');
template.innerHTML = html`
    <a href="/posts/new" is="router-link">
        <primary-button
            data-background="transparent"
            data-border="var(--subtle)"
        >
            <svg
                slot="icon"
                xmlns="http://www.w3.org/2000/svg"
                width="10.264"
                height="10.264"
                viewBox="0 0 10.264 10.264"
            >
                <path
                    d="M6.75,12.566H11.2v4.448h1.368V12.566h4.448V11.2H12.566V6.75H11.2V11.2H6.75Z"
                    transform="translate(-6.75 -6.75)"
                    fill="#f0f0f0"
                />
            </svg>
            <span>New Post</span>
        </primary-button>
    </a>
    <primary-heading>Home</primary-heading>
`;

class HomeView extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

if (!customElements.get('home-view')) {
    customElements.define('home-view', HomeView);
}

export default HomeView;
