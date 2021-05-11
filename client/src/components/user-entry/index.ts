/** @module Component/UserEntry */
import html from '../../utils/html-tag';

const template = document.createElement('template');
template.innerHTML = html`
    <style>
        .user-entry {
            display: grid;
            grid-template-columns: 40px 1fr;
            gap: 1.5rem;
            font-size: 1.4rem;
        }

        .user-entry-image {
            width: 40px;
            height: 40px;
            border: 1px solid #b0b3b8;
            border-radius: 50%;
            overflow: hidden;
        }

        .user-entry-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .user-entry-time {
            color: var(--secondary-text);
            margin-top: -5px;
        }
    </style>
    <div class="user-entry">
        <div class="user-entry-image">
            <slot name="image"></slot>
        </div>
        <div>
            <div>
                Posted by
                <slot name="name"></slot>
            </div>
            <div class="user-entry-time">
                <slot name="time"></slot>
            </div>
        </div>
    </div>
`;

class UserEntry extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

if (!customElements.get('user-entry')) {
    customElements.define('user-entry', UserEntry);
}

export default UserEntry;
