/** @module Component/GroupJoin */
import html from '../../utils/html-tag';
import Elements from '../../interfaces/elements-interface';
import BrowserRouter from '../browser-router/index';
import '../primary-heading/index';
import auth from '../../contexts/auth';

const template = document.createElement('template');
template.innerHTML = html`
    <style>
        .group-join {
            margin-top: 2.5rem;
            padding: 2.5rem;
            box-sizing: border-box;
            background-color: var(--secondary-bg);
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
            border-radius: 10px;
        }

        .group-details {
            display: flex;
            flex-wrap: wrap;
            margin-top: 0.5rem;
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

        .group-enquiry {
            margin: 2.5rem 0;
        }

        @media (min-width: 400px) {
            .group-controls {
                display: flex;
            }
        }

        .group-controls > *:first-child {
            margin-bottom: 1.5rem;
        }

        @media (min-width: 400px) {
            .group-controls > *:first-child {
                margin-bottom: 0;
                margin-right: 1.5rem;
            }
        }
    </style>
    <section>
        <primary-heading>You've been invited to a group</primary-heading>
        <div class="group-join">
            <secondary-heading class="group-name"></secondary-heading>
            <div class="group-details">
                <span class="group-detail group-members"></span>
                <span class="group-detail group-type"></span>
            </div>
            <p class="group-enquiry">Do you want to join this community?</p>
            <div class="group-controls">
                <primary-button
                    class="join-button"
                    data-background="var(--accent)"
                    data-color="#f0f0f0"
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
                    <span>Join Group</span>
                </primary-button>
                <a href="/" is="router-link">
                    <primary-button
                        data-background="transparent"
                        data-border="var(--subtle)"
                    >
                        <svg
                            slot="icon"
                            xmlns="http://www.w3.org/2000/svg"
                            width="8.214"
                            height="8.214"
                            viewBox="0 0 8.214 8.214"
                        >
                            <g transform="translate(-662.005 -500.005)">
                                <line
                                    y1="7.224"
                                    x2="7.224"
                                    transform="translate(662.5 500.5)"
                                    fill="none"
                                    stroke="var(--primary-text)"
                                    stroke-width="1.4"
                                />
                                <line
                                    y1="7.224"
                                    x2="7.224"
                                    transform="translate(669.724 500.5) rotate(90)"
                                    fill="none"
                                    stroke="var(--primary-text)"
                                    stroke-width="1.4"
                                />
                            </g>
                        </svg>

                        <span>Cancel</span>
                    </primary-button>
                </a>
            </div>
        </div>
    </section>
`;

class GroupJoin extends HTMLElement {
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
            name: this.shadowRoot?.querySelector('.group-name'),
            members: this.shadowRoot?.querySelector('.group-members'),
            type: this.shadowRoot?.querySelector('.group-type'),
            join: this.shadowRoot?.querySelector('.join-button'),
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
            BrowserRouter.redirect('/');
            return;
        }
        const details = await response.json();
        this.details = details;
    }

    displayDetails(): void {
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

    loadOrRedirect(): void {
        const isMember = Boolean(
            auth.user.groups?.find((group) => {
                return group.id === this.dataset.id;
            })
        );
        if (isMember) {
            /** To do: Redirect to the group page. */
            BrowserRouter.redirect('/');
            return;
        }
        (async () => {
            await this.loadDetails();
            this.displayDetails();
        })();
    }

    async joinGroup(): Promise<void> {
        const groupId = this.dataset.id;
        const response = await fetch('/api/group/join', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                groupId,
            }),
        });
        if (response.ok) {
            /** To do: Redirect to the group page. */
            BrowserRouter.redirect('/');
            return;
        }
    }

    addEventListeners(): void {
        this.el.join.addEventListener('click', () => this.joinGroup());
    }

    connectedCallback(): void {
        this.loadOrRedirect();
    }
}

if (!customElements.get('group-join')) {
    customElements.define('group-join', GroupJoin);
}

export default GroupJoin;
