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
            word-break: break-word;
        }
    </style>
    <div class="post-answer">
        <slot name="user"></slot>
        <slot name="content"></slot>
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
