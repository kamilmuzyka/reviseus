/** @module Component/NewGroupForm */
import html from '../../utils/html-tag';
import Elements from '../../interfaces/elements-interface';

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
            padding: 1rem;
            background-color: var(--error);
            border-radius: 5px;
            color: #dedede;
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
                        checked
                    />
                    <div class="radio-pointer"></div>
                </label>
                <label class="radio-label">
                    <span>Private</span>
                    <input class="radio-input" type="radio" name="type" />
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

if (!customElements.get('new-group-form')) {
    customElements.define('new-group-form', NewGroupForm);
}

export default NewGroupForm;
