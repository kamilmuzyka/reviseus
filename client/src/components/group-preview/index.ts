/** @module Component/GroupPreview */
import html from '../../utils/html-tag';
import '../secondary-heading/index';
import Elements from '../../interfaces/elements-interface';

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
            margin-top: 1.5rem;
            font-size: 1.4rem;
            color: var(--secondary-text);
        }

        .group-detail {
            position: relative;
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

        .group-controls {
            margin-top: 1.5rem;
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
            <secondary-heading class="group-name"
                >Lorem ipsum dolor sit amet</secondary-heading
            >
            <div class="group-details">
                <div class="group-detail">24 Members</div>
                <div class="group-detail">Public Group</div>
            </div>
            <div class="group-members">
                <div class="group-member">
                    <img
                        class="group-member-picture"
                        src="https://picsum.photos/100/100"
                    />
                </div>
                <div class="group-member">
                    <img
                        class="group-member-picture"
                        src="https://picsum.photos/101/101"
                    />
                </div>
                <div class="group-member">
                    <img
                        class="group-member-picture"
                        src="https://picsum.photos/102/102"
                    />
                </div>
            </div>
        </div>
        <div class="group-controls group-controls-danger">Leave Group</div>
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
        const requestedElements = {};
        for (const element in requestedElements) {
            if (element) {
                this.el[element] = requestedElements[element];
            }
        }
    }
}

if (!customElements.get('group-preview')) {
    customElements.define('group-preview', GroupPreview);
}

export default GroupPreview;
