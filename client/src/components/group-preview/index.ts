/** @module Component/GroupPreview */
import html from '../../utils/html-tag';
import auth from '../../contexts/auth';
import Elements from '../../interfaces/elements-interface';
import '../secondary-heading/index';

const template = document.createElement('template');
template.innerHTML = html`
    <style>
        .group-preview {
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 100%;
            padding: 2.5rem;
            background-color: var(--secondary-bg);
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
            border-radius: 10px;
        }

        .group-link {
            color: inherit;
            text-decoration: none;
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

        .group-controls {
            margin-top: 1.5rem;
        }

        .group-control {
            border: none;
            background: transparent;
            font-family: inherit;
            font-size: inherit;
            cursor: pointer;
        }

        .group-control-leave {
            display: none;
            color: var(--danger);
        }

        .group-control-join {
            display: none;
            color: var(--accent);
        }

        .group-confirm {
            display: none;
        }

        .group-confirm-control {
            color: inherit;
            cursor: pointer;
        }

        .group-confirm-control:hover {
            text-decoration: underline;
        }

        .danger {
            color: var(--danger);
        }

        .accent {
            color: var(--accent);
        }

        .active {
            display: block;
        }
    </style>
    <div class="group-preview">
        <div>
            <a class="group-link" is="router-link">
                <secondary-heading class="group-name">
                    <slot name="name"></slot>
                </secondary-heading>
            </a>
            <div class="group-details">
                <div class="group-detail">
                    <slot name="count"></slot>
                </div>
                <div class="group-detail">
                    <slot name="type"></slot>
                </div>
            </div>
            <div>
                <slot name="members"></slot>
            </div>
        </div>
        <div class="group-controls">
            <button class="group-control group-control-join">Join Group</button>
            <button class="group-control group-control-leave">
                Leave Group
            </button>
            <span class="group-confirm">
                <span>Are you sure?</span>
                <button
                    class="group-control group-confirm-control group-confirm-yes"
                >
                    Yes
                </button>
                <span>/</span>
                <button
                    class="group-control group-confirm-control group-confirm-no"
                >
                    No
                </button>
            </span>
        </div>
    </div>
`;

class GroupPreview extends HTMLElement {
    /** Buffers required HTML elements. */
    private el: Elements = {};

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
        this.loadElements();
        this.addEventListeners();
    }

    /** Buffers required HTML elements. */
    loadElements(): void {
        const requestedElements = {
            link: this.shadowRoot?.querySelector('.group-link'),
            leave: this.shadowRoot?.querySelector('.group-control-leave'),
            join: this.shadowRoot?.querySelector('.group-control-join'),
            confirm: this.shadowRoot?.querySelector('.group-confirm'),
            confirmYes: this.shadowRoot?.querySelector('.group-confirm-yes'),
            confirmNo: this.shadowRoot?.querySelector('.group-confirm-no'),
        };
        for (const element in requestedElements) {
            if (element) {
                this.el[element] = requestedElements[element];
            }
        }
    }

    /** Requests the server to break the association of the current user and a
     * given group. */
    async leaveGroup(): Promise<void> {
        const groupId = this.dataset.id;
        const response = await fetch('/api/group/leave', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                groupId,
            }),
        });
        if (response.ok) {
            auth.check();
        }
    }

    /** Requests the server to associate the current user with a given group. */
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
            auth.check();
        }
    }

    /** Displays action controls (join, leave) based on the user's association
     * with a group. */
    displayControls(): void {
        if (auth.ok && auth.user) {
            const isMember = Boolean(
                auth.user.groups?.find((group) => {
                    return group.id === this.dataset.id;
                })
            );
            if (isMember) {
                this.el.leave.classList.add('active');
                return;
            }
            this.el.join.classList.add('active');
        }
    }

    /** Activates links that depend on properties from the outside. */
    activateLinks(): void {
        if (this.el.link instanceof HTMLAnchorElement) {
            this.el.link.href = `/groups/${this.dataset.id}`;
        }
    }

    /** Hides action controls (join, leave). */
    hideControls(): void {
        this.el.leave.classList.remove('active');
        this.el.join.classList.remove('active');
    }

    /** Displays confirmation controls (yes, no) and associates them with
     * relevant events. */
    displayConfirm(action: string): void {
        if (auth.ok && auth.user) {
            if (action === 'join') {
                this.el.confirmYes.addEventListener('click', () =>
                    this.joinGroup()
                );
                this.el.confirm.classList.add('accent');
            } else {
                this.el.confirmYes.addEventListener('click', () =>
                    this.leaveGroup()
                );
                this.el.confirm.classList.add('danger');
            }
            this.el.confirm.classList.add('active');
            this.hideControls();
        }
    }

    /** Hides confirmation controls. */
    hideConfirm(): void {
        this.el.confirm.classList.remove('active');
        this.displayControls();
    }

    addEventListeners(): void {
        this.el.leave.addEventListener('click', () =>
            this.displayConfirm('leave')
        );
        this.el.join.addEventListener('click', () =>
            this.displayConfirm('join')
        );
        this.el.confirmNo.addEventListener('click', () => this.hideConfirm());
        window.addEventListener('click', () => this.hideConfirm());
        this.addEventListener('click', (e) => e.stopPropagation());
    }

    connectedCallback(): void {
        this.displayControls();
        this.activateLinks();
    }
}

if (!customElements.get('group-preview')) {
    customElements.define('group-preview', GroupPreview);
}

export default GroupPreview;
