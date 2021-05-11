/** @module Component/PostAnswer */
import html from '../../utils/html-tag';
import '../user-entry/index';

const template = document.createElement('template');
template.innerHTML = html`
    <style>
        .post-answer {
            margin-top: 2.5rem;
            padding: 2.5rem;
            background-color: var(--secondary-bg);
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
            border-radius: 10px;
        }
    </style>
    <div class="post-answer">
        <user-entry class="post-user">
            <img
                slot="image"
                src="https://i.picsum.photos/id/538/100/100.jpg?hmac=1OOwsGQ5HpbT6Qjae_NY2WKbMiq-klJ8Dos-5QxbTj0"
            />
            <span slot="name">John Doe</span>
            <time slot="time">2 hours ago</time>
        </user-entry>
        <p class="post-content">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero est
            amet quisquam ullam provident placeat eaque omnis alias atque,
            asperiores officiis repellat rerum? Numquam natus tenetur et quos!
            Optio, soluta?
        </p>
    </div>
`;

class PostAnswer extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

if (!customElements.get('post-answer')) {
    customElements.define('post-answer', PostAnswer);
}

export default PostAnswer;
