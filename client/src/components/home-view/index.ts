/** @module Component/HomeView */
import html from '../../utils/html-tag';
import '../primary-heading/index';
import '../router-link/index';
import '../primary-button/index';
import '../post-preview/index';

const template = document.createElement('template');
template.innerHTML = html`
    <style>
        .home-heading {
            display: block;
            margin-top: 5rem;
        }
    </style>
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
                    fill="var(--primary-text)"
                />
            </svg>
            <span>New Post</span>
        </primary-button>
    </a>
    <section>
        <primary-heading class="home-heading">Public Posts</primary-heading>
        <div>
            <post-preview data-id="87aa4957-12ca-45fd-8930-c798e391afb9">
                <span slot="author">John Doe</span>
                <span slot="picture">
                    <img
                        src="https://i.picsum.photos/id/441/50/50.jpg?hmac=-GvWZdGDIITvZxSIX4lHcdHyZliGPkA4MuLNf4eiJMA"
                    />
                </span>
                <span slot="time">10 minutes ago</span>
                <span slot="count">3 Answers</span>
            </post-preview>
            <post-preview data-id="9116a734-540b-4dd7-850f-69cba4142543">
                <span slot="author">Adam Smith</span>
                <span slot="picture">
                    <img
                        src="https://i.picsum.photos/id/441/50/50.jpg?hmac=-GvWZdGDIITvZxSIX4lHcdHyZliGPkA4MuLNf4eiJMA"
                    />
                </span>
                <span slot="time">22 minutes ago</span>
                <span slot="count">5 Answers</span>
            </post-preview>
        </div>
    </section>
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
