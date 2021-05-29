/** @module Component/LogoutModal */
import html from '../../utils/html-tag';
import auth from '../../contexts/auth';
import Elements from '../../interfaces/elements-interface';
import '../modal-window/index';
import '../secondary-heading/index';

const template = document.createElement('template');
template.innerHTML = html`
    <style>
        .modal-message {
            margin: 1.5rem 0 2.5rem 0;
        }

        .modal-buttons {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .modal-buttons > *:first-child {
            margin-right: 1.5rem;
        }
    </style>
    <modal-window data-name="logout">
        <secondary-heading>Are you sure you want to log out?</secondary-heading>
        <p class="modal-message">We hope to see you again soon 👋</p>
        <div class="modal-buttons">
            <primary-button
                class="modal-exit"
                data-background="transparent"
                data-border="var(--subtle)"
            >
                <svg
                    slot="icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="6.9"
                    height="12.385"
                    viewBox="0 0 6.9 12.385"
                >
                    <path
                        d="M21.471,15l-5.485,5.485L10.5,15"
                        transform="translate(21.193 -9.793) rotate(90)"
                        fill="none"
                        stroke="var(--primary-text)"
                        stroke-linecap="square"
                        stroke-width="1"
                    />
                </svg>
                <span>Go Back</span>
            </primary-button>
            <primary-button class="modal-proceed" data-color="#f0f0f0">
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
                <span>Log Out</span>
            </primary-button>
        </div>
    </modal-window>
`;

class LogoutModal extends HTMLElement {
    private el: Elements = {};

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
        this.loadElements();
        this.addEventListeners();
    }

    loadElements(): void {
        const requestedElements = {
            exit: this.shadowRoot?.querySelector('.modal-exit'),
            proceed: this.shadowRoot?.querySelector('.modal-proceed'),
        };
        for (const element in requestedElements) {
            if (element) {
                this.el[element] = requestedElements[element];
            }
        }
    }

    closeLogoutModal(): void {
        window.dispatchEvent(
            new CustomEvent('closelogout', {
                bubbles: true,
                composed: true,
            })
        );
    }

    addEventListeners(): void {
        this.el.exit.addEventListener('click', () => this.closeLogoutModal());
        this.el.proceed.addEventListener('click', () => {
            auth.logOut();
            this.closeLogoutModal();
        });
    }
}

if (!customElements.get('logout-modal')) {
    customElements.define('logout-modal', LogoutModal);
}

export default LogoutModal;
