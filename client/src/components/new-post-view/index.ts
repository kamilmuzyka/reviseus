/** @module Component/NewPostView */
import Elements from '../../interfaces/elements-interface';
import html from '../../utils/html-tag';
import '../primary-heading/index';
import '../new-post-form/index';

const template = document.createElement('template');
template.innerHTML = html`
    <style>
        .heading {
            margin-bottom: 3.5rem;
        }

        .accent {
            color: var(--accent);
        }
    </style>
    <primary-heading class="heading"></primary-heading>
    <new-post-form></new-post-form>
`;

class NewPostView extends HTMLElement {
    private el: Elements = {};
    private groupId;
    private groupDetails;

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
        this.loadElements();
    }

    loadElements(): void {
        const requestedElements = {
            heading: this.shadowRoot?.querySelector('.heading'),
            accent: this.shadowRoot?.querySelector('.accent'),
        };
        for (const element in requestedElements) {
            if (element) {
                this.el[element] = requestedElements[element];
            }
        }
    }

    saveGroupId(): void {
        const searchParams = new URLSearchParams(location.search);
        this.groupId = searchParams.get('group');
    }

    async loadGroupDetails(): Promise<void> {
        const response = await fetch(`/api/group/${this.groupId}`);
        if (response.ok) {
            this.groupDetails = await response.json();
            return;
        }
        this.groupDetails = null;
    }

    displayGroupDetails(): void {
        if (this.groupDetails) {
            const text = document.createElement('span');
            text.textContent = 'Create a new post at';
            const name = document.createElement('span');
            name.classList.add('accent');
            name.textContent = ` ${this.groupDetails.name}`;
            text.appendChild(name);
            this.el.heading.appendChild(text);
            return;
        }
        const text = document.createElement('span');
        text.textContent = 'Create a new public post';
        this.el.heading.appendChild(text);
    }

    clearGroupDetails(): void {
        this.el.heading.textContent = '';
    }

    connectedCallback(): void {
        (async () => {
            this.saveGroupId();
            await this.loadGroupDetails();
            this.displayGroupDetails();
        })();
    }

    disconnectedCallback(): void {
        this.clearGroupDetails();
    }
}

if (!customElements.get('new-post-view')) {
    customElements.define('new-post-view', NewPostView);
}

export default NewPostView;
