/** @module Component/MenuButton */
import html from '../../utils/html-tag';
import '../secondary-container/index';

const template = document.createElement('template');
template.innerHTML = html`
    <style>
        :host {
            order: -2;
        }

        .menu-button-position {
            display: flex;
            justify-content: flex-end;
        }

        .menu-button {
            padding: 0.9rem 0.8rem;
            border: 1px solid var(--subtle);
            border-radius: 5px;
            background: transparent;
            cursor: pointer;
        }
    </style>
    <secondary-container>
        <div class="menu-button-position">
            <button class="menu-button">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="27"
                    height="17.75"
                    viewBox="0 0 27 17.75"
                >
                    <g transform="translate(-4.5 -10.125)">
                        <path
                            d="M30.375,12.375H5.625A1.128,1.128,0,0,1,4.5,11.25h0a1.128,1.128,0,0,1,1.125-1.125h24.75A1.128,1.128,0,0,1,31.5,11.25h0A1.128,1.128,0,0,1,30.375,12.375Z"
                            fill="var(--primary-text)"
                        />
                        <path
                            d="M30.375,19.125H5.625A1.128,1.128,0,0,1,4.5,18h0a1.128,1.128,0,0,1,1.125-1.125h24.75A1.128,1.128,0,0,1,31.5,18h0A1.128,1.128,0,0,1,30.375,19.125Z"
                            transform="translate(0 1)"
                            fill="var(--primary-text)"
                        />
                        <path
                            d="M30.375,25.875H5.625A1.128,1.128,0,0,1,4.5,24.75h0a1.128,1.128,0,0,1,1.125-1.125h24.75A1.128,1.128,0,0,1,31.5,24.75h0A1.128,1.128,0,0,1,30.375,25.875Z"
                            transform="translate(0 2)"
                            fill="var(--primary-text)"
                        />
                    </g>
                </svg>
            </button>
        </div>
    </secondary-container>
`;

class MenuButton extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

if (!customElements.get('menu-button')) {
    customElements.define('menu-button', MenuButton);
}

export default MenuButton;
