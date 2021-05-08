/** @module Component/NewPostForm */
import html from '../../utils/html-tag';
import BrowserRouter from '../browser-router';
import '../primary-button/index';
import '../file-button/index';

const template = document.createElement('template');
template.innerHTML = html`
    <style>
        .form {
            display: flex;
            flex-direction: column;
            padding: 2.5rem;
            width: 100%;
            box-sizing: border-box;
            border-radius: 25px;
            background-color: var(--secondary-bg);
        }

        .form-input,
        .form-file-input,
        .form-textarea {
            margin-top: 1rem;
            font-size: 1.6rem;
            outline: 0;
            font-family: inherit;
            color: var(--primary-text);
        }

        .form-input,
        .form-textarea {
            align-self: stretch;
            padding: 1rem;
            border: none;
            border-radius: 5px;
            color: var(--primary-text);
            background-color: var(--tertiary-bg);
        }

        .form-textarea {
            min-height: 100px;
            resize: none;
        }

        .form-file-input {
            display: none;
        }

        .form-file-button {
            margin-top: 1rem;
        }

        .form-group {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
        }

        .form-group:not(:first-child) {
            margin-top: 2.5rem;
        }

        .form-error {
            display: none;
            margin-top: 2.5rem;
            padding: 1rem;
            background-color: var(--error);
            border-radius: 5px;
            color: var(--primary-text);
        }

        .form-error.active {
            display: block;
        }
    </style>
    <form
        method="POST"
        action="/api/post"
        enctype="multipart/form-data"
        class="form"
    >
        <div class="form-group">
            <label for="title">Title</label>
            <input
                class="form-input"
                type="text"
                name="title"
                id="title"
                placeholder="Aa"
            />
        </div>
        <div class="form-group">
            <label for="content">Content</label>
            <textarea
                class="form-textarea"
                type="text"
                name="content"
                id="content"
                placeholder="Aa"
            ></textarea>
        </div>
        <div class="form-group">
            <label for="attachments">Files</label>
            <input
                class="form-file-input"
                type="file"
                name="attachments"
                id="attachments"
                multiple
            />
            <file-button class="form-file-button">Select Files</file-button>
        </div>
        <div class="form-group">
            <label for="tags">Tags</label>
            <input
                class="form-input"
                type="text"
                name="tags"
                id="tags"
                placeholder="#"
            />
        </div>
        <div class="form-group">
            <primary-button
                class="form-submit-button"
                data-background="var(--accent)"
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
                <span>Create Post</span>
            </primary-button>
        </div>
        <div class="form-error"></div>
    </form>
`;

class NewPostForm extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
        this.addEventListeners();
    }

    openFileInput(): void {
        const fileInput = this.shadowRoot?.querySelector('.form-file-input');
        if (fileInput instanceof HTMLInputElement) {
            fileInput.click();
        }
    }

    displayErrors(message: string): void {
        const errorEl = this.shadowRoot?.querySelector('.form-error');
        if (errorEl) {
            errorEl.textContent = message;
            errorEl.classList.add('active');
        }
    }

    removeErrors(): void {
        const errorEl = this.shadowRoot?.querySelector('.form-error');
        if (errorEl) {
            errorEl.textContent = '';
            errorEl.classList.remove('active');
        }
    }

    async submitNewPost(): Promise<void> {
        const form = this.shadowRoot?.querySelector('form');
        if (form) {
            const payload = new FormData(form);
            const response = await fetch('/api/post', {
                method: 'POST',
                body: payload,
            });
            const result = await response.json();
            if (response.ok) {
                form.reset();
                this.removeErrors();
                BrowserRouter.redirect(`/posts/${result.id}`);
                return;
            }
            this.displayErrors(result);
        }
    }

    addEventListeners(): void {
        const submitButton = this.shadowRoot?.querySelector(
            '.form-submit-button'
        );
        const fileButton = this.shadowRoot?.querySelector('.form-file-button');
        submitButton?.addEventListener('click', () => this.submitNewPost());
        fileButton?.addEventListener('click', () => this.openFileInput());
    }

    disconnectedCallback(): void {
        this.removeErrors();
    }
}

if (!customElements.get('new-post-form')) {
    customElements.define('new-post-form', NewPostForm);
}

export default NewPostForm;
