/** @module Component/PostView */
import html from '../../utils/html-tag';
import '../primary-heading/index';
import '../file-button/index';
import BrowserRouter from '../browser-router/index';

const template = document.createElement('template');
template.innerHTML = html`
    <style>
        .post {
            padding: 2.5rem;
            background-color: var(--secondary-bg);
            border-radius: 10px;
        }

        .post-content {
            margin: 1.5rem 0 0 0;
        }

        .post-files {
            display: flex;
            flex-wrap: wrap;
        }

        .post-files > * {
            margin: 1.5rem 1.5rem 0 0;
        }

        .post-tags {
            display: flex;
            flex-wrap: wrap;
            padding: 0;
            margin: 1.5rem 0 0 0;
            list-style-type: none;
        }

        .post-tags > * {
            color: var(--accent);
        }

        .post-tags > *:not(:last-child) {
            margin-right: 1.5rem;
        }

        .user-profile {
            width: 40px;
            height: 40px;
            border: 1px solid #b0b3b8;
            border-radius: 50%;
            overflow: hidden;
        }

        .user-photo {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .user-details {
            display: grid;
            grid-template-columns: 40px 1fr;
            gap: 1.5rem;
            font-size: 1.4rem;
        }

        .post-time {
            color: var(--secondary-text);
            margin-top: -5px;
        }
    </style>
    <section>
        <primary-heading data-color="var(--accent)">
            Lorem ipsum dolor sit amet.
        </primary-heading>
        <div class="post">
            <div class="user-details">
                <div class="user-profile">
                    <img class="user-photo" />
                </div>
                <div>
                    <div class="user-name">Posted by John Doe</div>
                    <div class="post-time">15 hours ago</div>
                </div>
            </div>
            <p class="post-content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                erat nisl, tristique finibus consectetur in, placerat vel metus.
                Proin faucibus neque nibh, quis imperdiet nibh commodo în.
                Aenean fermentum ipsum justo, at sodales nibh pellentesque
                posuere. Cras nisl enim, luctus eu leo nec, tempus faucibus
                nunc. Vivamus lobortis laoreet sodales. Duis suscipit turpis a
                nisi ullamcorper cursus. Nulla aliquam sit amet nibh ut aliquet.
                Quisque sodales faucibus bibendum. Integer a sollicitudin purus.
            </p>
            <div class="post-files">
                <a href="#" download>
                    <file-button>lorem.pdf</file-button>
                </a>
            </div>
            <ul class="post-tags">
                <li>#lorem</li>
                <li>#ipsum</li>
            </ul>
        </div>
    </section>
`;

class PostView extends HTMLElement {
    private details;

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
    }

    async loadDetails(): Promise<void> {
        const currentPostId = this.dataset.id;
        const response = await fetch(`/api/post/${currentPostId}`);
        if (response.ok) {
            const data = await response.json();
            this.details = data;
            console.log(this.details);

            return;
        }
        BrowserRouter.redirect('/404');
    }

    displayDetails(): void {
        const img = this.shadowRoot?.querySelector('.user-photo');
        if (img instanceof HTMLImageElement) {
            img.src = this.details.user.profilePhoto;
        }
    }

    connectedCallback(): void {
        (async () => {
            await this.loadDetails();
            this.displayDetails();
        })();
    }
}

if (!customElements.get('post-view')) {
    customElements.define('post-view', PostView);
}

export default PostView;
