/** @module Component/GroupsView */
import html from '../../utils/html-tag';
import Elements from '../../interfaces/elements-interface';
import '../primary-heading/index';
import '../group-preview/index';
import auth from '../../contexts/auth';

const template = document.createElement('template');
template.innerHTML = html`
    <style>
        .groups-heading {
            margin-top: 2.5rem;
        }

        .groups {
            display: grid;
            gap: 2.5rem;
            grid-template-columns: 1fr;
            grid-template-rows: auto;
            margin-top: 2.5rem;
        }

        @media (min-width: 700px) {
            .groups {
                grid-template-columns: 1fr 1fr;
            }
        }

        .group-members {
            display: flex;
            margin-top: 1.5rem;
        }

        .group-member {
            width: 35px;
            height: 35px;
            border: 1px solid var(--border);
            border-radius: 50%;
            overflow: hidden;
        }

        .group-member:nth-child(2) {
            transform: translateX(-10px);
        }

        .group-member:nth-child(3) {
            transform: translateX(-20px);
        }

        .group-member-picture {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .groups-message {
            margin: 0;
            grid-column-start: 1;
            grid-column-end: 3;
        }
    </style>
    <section>
        <a href="/group/new" is="router-link">
            <primary-button
                data-background="transparent"
                data-border="var(--subtle)"
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
                        fill="var(--primary-text)"
                    />
                </svg>
                <span>Create Group</span>
            </primary-button>
        </a>
        <primary-heading class="groups-heading">Your Groups</primary-heading>
        <div class="groups"></div>
    </section>
`;

class GroupsView extends HTMLElement {
    /** Buffers required HTML elements. */
    private el: Elements = {};

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
        this.loadElements();
    }

    /** Buffers required HTML elements. */
    loadElements(): void {
        const requestedElements = {
            groups: this.shadowRoot?.querySelector('.groups'),
        };
        for (const element in requestedElements) {
            if (element) {
                this.el[element] = requestedElements[element];
            }
        }
    }

    /** Displays groups the current user is member of. */
    displayGroups(): void {
        const groups = auth.user.groups;
        const groupsFragment = document.createDocumentFragment();
        if (groups && groups.length) {
            groups.forEach((group) => {
                /** Group Preview Element */
                const groupPreview = document.createElement('group-preview');
                groupPreview.dataset.id = group.id;
                /** Group Name Slot */
                const groupName = document.createElement('span');
                groupName.setAttribute('slot', 'name');
                groupName.textContent = group.name;
                /** Group Count */
                const groupCount = document.createElement('span');
                groupCount.setAttribute('slot', 'count');
                groupCount.textContent =
                    group.users.length === 1
                        ? `${group.users.length} Member`
                        : `${group.users.length} Members`;
                /** Group Type */
                const groupType = document.createElement('span');
                groupType.setAttribute('slot', 'type');
                groupType.textContent = `${
                    group.type.charAt(0).toUpperCase() + group.type.slice(1)
                } Group`;
                /** Group Members */
                const groupMembers = document.createElement('span');
                groupMembers.setAttribute('slot', 'members');
                groupMembers.classList.add('group-members');
                group.users.slice(0, 3).forEach((user) => {
                    /** Group Member */
                    const groupMember = document.createElement('div');
                    groupMember.classList.add('group-member');
                    /** Group Member Picture */
                    const groupMemberPicture = document.createElement('img');
                    groupMemberPicture.classList.add('group-member-picture');
                    groupMemberPicture.alt = `${user.firstName}'s profile picture`;
                    groupMemberPicture.src = user.profilePhoto;
                    groupMember.appendChild(groupMemberPicture);
                    groupMembers.appendChild(groupMember);
                });
                groupPreview.appendChild(groupName);
                groupPreview.appendChild(groupCount);
                groupPreview.appendChild(groupType);
                groupPreview.appendChild(groupMembers);
                groupsFragment.appendChild(groupPreview);
            });
            this.el.groups.appendChild(groupsFragment);
            return;
        }
        const message = document.createElement('p');
        message.classList.add('groups-message');
        message.textContent = 'You don not belong to any groups yet 😔';
        this.el.groups.appendChild(message);
    }

    /** Removes rendered groups from the DOM. */
    clearGroups(): void {
        [...this.el.groups.children].forEach((child) => child.remove());
    }

    connectedCallback(): void {
        this.displayGroups();
    }

    disconnectedCallback(): void {
        this.clearGroups();
    }
}

if (!customElements.get('groups-view')) {
    customElements.define('groups-view', GroupsView);
}

export default GroupsView;
