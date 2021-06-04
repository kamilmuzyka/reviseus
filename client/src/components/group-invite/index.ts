/** @module Component/GroupInvite */
import html from '../../utils/html-tag';
import Elements from '../../interfaces/elements-interface';
import BrowserRouter from '../browser-router/index';
import '../secondary-heading/index';

const template = document.createElement('template');
template.innerHTML = html`
    <style>
        .group-invite {
            padding: 2.5rem;
            box-sizing: border-box;
            background-color: var(--secondary-bg);
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
            border-radius: 10px;
        }

        .group-details {
            display: flex;
            flex-wrap: wrap;
            font-size: 1.4rem;
            color: var(--secondary-text);
        }

        .group-detail {
            position: relative;
        }

        .group-detail:not(:last-child) {
            margin-right: 2.4rem;
        }

        .group-detail:not(:last-child)::after {
            content: '';
            position: absolute;
            top: 50%;
            left: calc(100% + 10px);
            transform: translateY(-50%);
            width: 4px;
            height: 4px;
            background-color: var(--secondary-text);
            border-radius: 50%;
        }

        .invite-container {
            margin-top: 1rem;
            display: flex;
            flex-direction: column;
        }

        .invite-group {
            position: relative;
            margin-top: 1rem;
        }

        .invite-input {
            box-sizing: border-box;
            width: 100%;
            padding: 1rem 4.5rem 1rem 1rem;
            outline: 0;
            border: none;
            border-radius: 5px;
            background-color: var(--tertiary-bg);
            font-family: inherit;
            font-size: 1.6rem;
            color: var(--accent);
        }

        .invite-button {
            background: transparent;
            margin: 0;
            padding: 0;
            border: none;
            outline: 0;
            position: absolute;
            top: 50%;
            right: 0;
            padding: 1rem;
            transform: translateY(-50%);
            cursor: pointer;
        }
    </style>
    <div class="group-invite">
        <secondary-heading class="group-name"></secondary-heading>
        <div class="group-details">
            <span class="group-detail group-members"></span>
            <span class="group-detail group-type"></span>
        </div>
        <div class="invite-container">
            <div class="invite-group">
                <input class="invite-input" name="link" readonly />
                <button class="invite-button">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17.231"
                        height="17.215"
                        viewBox="0 0 17.231 17.215"
                    >
                        <g transform="translate(-2.493 -2.508)">
                            <path
                                d="M15,11.926a4.056,4.056,0,0,0,6.116.438L23.55,9.931A4.055,4.055,0,1,0,17.814,4.2L16.42,5.583"
                                transform="translate(-5.514 0)"
                                fill="none"
                                stroke="var(--primary-text)"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="1"
                            />
                            <path
                                d="M12.73,15.119a4.056,4.056,0,0,0-6.116-.438L4.181,17.114a4.055,4.055,0,1,0,5.735,5.735L11.3,21.462"
                                transform="translate(0 -4.815)"
                                fill="none"
                                stroke="var(--primary-text)"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="1"
                            />
                        </g>
                    </svg>
                </button>
            </div>
        </div>
    </div>
`;

class GroupInvite extends HTMLElement {
    private el: Elements = {};
    private details;

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
        this.loadElements();
        this.addEventListeners();
    }

    loadElements(): void {
        const requestedElements = {
            input: this.shadowRoot?.querySelector('.invite-input'),
            button: this.shadowRoot?.querySelector('.invite-button'),
            name: this.shadowRoot?.querySelector('.group-name'),
            members: this.shadowRoot?.querySelector('.group-members'),
            type: this.shadowRoot?.querySelector('.group-type'),
        };
        for (const element in requestedElements) {
            if (element) {
                this.el[element] = requestedElements[element];
            }
        }
    }

    async loadDetails(): Promise<void> {
        const groupId = this.dataset.id;
        const response = await fetch(`/api/group/${groupId}`);
        if (!response.ok) {
            BrowserRouter.redirect('/404');
            return;
        }
        const details = await response.json();
        this.details = details;
    }

    displayDetails(): void {
        if (this.el.input instanceof HTMLInputElement) {
            this.el.input.value = `${location.origin}/join/group/${this.details.id}`;
        }
        this.el.name.textContent = this.details.name;
        this.el.members.textContent =
            this.details.users.length === 1
                ? `${this.details.users.length} Member`
                : `${this.details.users.length} Members`;
        this.el.type.textContent = `${
            this.details.type.charAt(0).toUpperCase() +
            this.details.type.slice(1)
        } Group`;
    }

    copyToClipboard(): void {
        const input = this.el.input;
        if (input instanceof HTMLInputElement) {
            input.select();
            input.setSelectionRange(0, 99999);
            document.execCommand('copy');
        }
    }

    addEventListeners(): void {
        this.el.button.addEventListener('click', () => this.copyToClipboard());
    }

    connectedCallback(): void {
        (async () => {
            await this.loadDetails();
            this.displayDetails();
        })();
    }
}

if (!customElements.get('group-invite')) {
    customElements.define('group-invite', GroupInvite);
}

export default GroupInvite;
