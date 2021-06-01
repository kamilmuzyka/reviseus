/** @module Component/GroupPreview */
import html from '../../utils/html-tag';
import auth from '../../contexts/auth';
import Elements from '../../interfaces/elements-interface';
import '../secondary-heading/index';
import BrowserRouter from '../browser-router';

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

        .group-controls-accent {
            color: var(--accent);
        }

        .group-controls-danger {
            color: var(--danger);
        }
    </style>
    <div class="group-preview">
        <div>
            <secondary-heading class="group-name">
                <slot name="name"></slot>
            </secondary-heading>
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
        <div class="group-controls"></div>
    </div>
`;

class GroupPreview extends HTMLElement {
    private el: Elements = {};

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
        this.loadElements();
    }

    loadElements(): void {
        const requestedElements = {
            controls: this.shadowRoot?.querySelector('.group-controls'),
        };
        for (const element in requestedElements) {
            if (element) {
                this.el[element] = requestedElements[element];
            }
        }
    }

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
            this.remove();
        }
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
            auth.check();
            BrowserRouter.redirect('/groups');
        }
    }

    createLeaveButton(): HTMLElement {
        const leaveButton = document.createElement('button');
        leaveButton.classList.add('group-control');
        leaveButton.classList.add('group-controls-danger');
        leaveButton.textContent = 'Leave Group';
        leaveButton.addEventListener('click', () => this.leaveGroup());
        return leaveButton;
    }

    createJoinButton(): HTMLElement {
        const joinButton = document.createElement('button');
        joinButton.classList.add('group-control');
        joinButton.classList.add('group-controls-accent');
        joinButton.textContent = 'Join Group';
        joinButton.addEventListener('click', () => this.joinGroup());
        return joinButton;
    }

    displayControls(): void {
        const isMember = Boolean(
            auth.user.groups?.find((group) => {
                return group.id === this.dataset.id;
            })
        );
        if (isMember) {
            const leaveButton = this.createLeaveButton();
            this.el.controls.appendChild(leaveButton);
            return;
        }
        const joinButton = this.createJoinButton();
        this.el.controls.appendChild(joinButton);
    }

    connectedCallback(): void {
        this.displayControls();
    }
}

if (!customElements.get('group-preview')) {
    customElements.define('group-preview', GroupPreview);
}

export default GroupPreview;
