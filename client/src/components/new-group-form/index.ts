/** @module Component/NewGroupForm */
import html from '../../utils/html-tag';
import auth from '../../contexts/auth';
import Elements from '../../interfaces/elements-interface';
import BrowserRouter from '../browser-router/index';

const template = document.createElement('template');
template.innerHTML = html`
    <style>
        .form {
            display: flex;
            flex-direction: column;
            padding: 2.5rem;
            width: 100%;
            box-sizing: border-box;
            border-radius: 10px;
            background-color: var(--secondary-bg);
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        }

        .form-input {
            margin-top: 1rem;
            font-size: 1.6rem;
            outline: 0;
            font-family: inherit;
            color: var(--primary-text);
            padding: 1rem;
            border: none;
            border-radius: 5px;
            background-color: var(--tertiary-bg);
        }

        .form-group {
            display: flex;
            flex-direction: column;
        }

        .form-group:not(:first-child) {
            margin-top: 2.5rem;
        }

        .radio {
            display: flex;
            margin-top: 1.5rem;
        }

        .radio-label {
            display: flex;
            flex-direction: row-reverse;
            align-items: center;
            cursor: pointer;
        }

        .radio-label:not(:last-child) {
            margin-right: 2.5rem;
        }

        .radio-input {
            position: absolute;
            visibility: hidden;
            opacity: 0;
        }

        .radio-pointer {
            position: relative;
            margin-right: 1rem;
            box-sizing: border-box;
            width: 1.6rem;
            height: 1.6rem;
            border: 1px solid var(--primary-text);
            border-radius: 50%;
        }

        .radio-pointer::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 0.6rem;
            height: 0.6rem;
            border-radius: 50%;
            background-color: var(--primary-text);
            display: none;
        }

        .radio-input:checked + .radio-pointer::after {
            display: block;
        }

        .form-error {
            display: none;
            margin-top: 2.5rem;
            color: var(--danger);
        }

        .form-error.active {
            display: block;
        }
    </style>
    <form class="form">
        <div class="form-group">
            <label for="name">Name</label>
            <input
                class="form-input"
                type="text"
                id="name"
                name="name"
                placeholder="Aa"
            />
        </div>
        <div class="form-group">
            <span>Type</span>
            <div class="radio">
                <label class="radio-label">
                    <span>Public</span>
                    <input
                        class="radio-input"
                        type="radio"
                        name="type"
                        value="public"
                        checked
                    />
                    <div class="radio-pointer"></div>
                </label>
                <label class="radio-label">
                    <span>Private</span>
                    <input
                        class="radio-input"
                        type="radio"
                        name="type"
                        value="private"
                    />
                    <div class="radio-pointer"></div>
                </label>
            </div>
        </div>
        <div class="form-group">
            <primary-button
                class="form-submit-button"
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
                <span>Create Group</span>
            </primary-button>
        </div>
        <div class="form-error"></div>
    </form>
`;

class NewGroupForm extends HTMLElement {
    /** Buffered required HTML elements. */
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
            form: this.shadowRoot?.querySelector('form'),
            submitButton: this.shadowRoot?.querySelector('.form-submit-button'),
            error: this.shadowRoot?.querySelector('.form-error'),
        };
        for (const element in requestedElements) {
            if (element) {
                this.el[element] = requestedElements[element];
            }
        }
    }

    /** Displays errors returned from the server. */
    displayErrors(message: string): void {
        this.el.error.textContent = message;
        this.el.error.classList.add('active');
    }

    /** Removes displayed errors. */
    removeErrors(): void {
        this.el.error.textContent = '';
        this.el.error.classList.remove('active');
    }

    /** Requests the server to create a new group based on the form data. */
    async submitNewGroup(): Promise<void> {
        if (this.el.form instanceof HTMLFormElement) {
            const formData = new FormData(this.el.form);
            const payload = {};
            formData.forEach((value, key) => (payload[key] = value));
            const response = await fetch('/api/group', {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify(payload),
            });
            const result = await response.json();
            if (response.ok) {
                auth.check();
                this.el.form.reset();
                this.removeErrors();
                BrowserRouter.redirect(`/groups/${result.id}`);
                return;
            }
            this.displayErrors(result);
        }
    }

    addEventListeners(): void {
        this.el.submitButton.addEventListener('click', () =>
            this.submitNewGroup()
        );
    }
    disconnectedCallback(): void {
        this.removeErrors();
    }
}

if (!customElements.get('new-group-form')) {
    customElements.define('new-group-form', NewGroupForm);
}

export default NewGroupForm;
