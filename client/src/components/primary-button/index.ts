/** @module Component/PrimaryButton */
import html from '../../utils/html-tag';

const template = document.createElement('template');
template.innerHTML = html`
    <style>
        :host {
            display: inline-block;
        }

        .button {
            display: inline-block;
            padding: 0.8rem 1rem;
            border: none;
            border-radius: 5px;
            text-decoration: none;
            font-family: inherit;
            font-size: 1.6rem;
            background-color: var(--accent);
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
    <button class="button">
        <div class="content">
            <slot name="icon"></slot>
            <slot class="text"></slot>
        </div>
    </button>
`;

class PrimaryButton extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
    }

    addCustomStyles(): void {
        const button = this.shadowRoot?.querySelector('.button');
        const backgroundColor = this.dataset.background;
        const borderColor = this.dataset.border;
        if (button instanceof HTMLElement) {
            if (backgroundColor) {
                button.style.backgroundColor = backgroundColor;
            }
            if (borderColor) {
                button.style.border = `1px solid ${borderColor}`;
            }
        }
    }

    connectedCallback(): void {
        this.addCustomStyles();
    }
}

if (!customElements.get('primary-button')) {
    customElements.define('primary-button', PrimaryButton);
}

export default PrimaryButton;
