/** @module Component/NewPostForm */
import html from '../../utils/html-tag';
import BrowserRouter from '../browser-router';
import '../primary-button/index';

const template = document.createElement('template');
template.innerHTML = html`
    <style>
        .form {
            display: flex;
            flex-direction: column;
            padding: 2.5rem;
            width: 650px;
            max-width: 100%;
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
            margin-top: 1rem;
        }

        .form-group {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            margin-top: 2.5rem;
        }

        .form-error {
            display: none;
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
            <primary-button data-color="var(--accent)">
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
                        fill="#fff"
                    />
                </svg>
                <span>Create Post</span>
            </primary-button>
        </div>
        <div class="form-group">
            <div class="form-error"></div>
        </div>
    </form>
`;

class NewPostForm extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
    }

    displayError(message: string): void {
        const errorEl = this.shadowRoot?.querySelector('.form-error');
        if (errorEl) {
            errorEl.textContent = message;
            errorEl.classList.add('active');
        }
    }

    removeError(): void {
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
                this.removeError();
                BrowserRouter.redirect(`/posts/${result.id}`);
                return;
            }
            this.displayError(result);
        }
    }

    addEventListeners(): void {
        const button = this.shadowRoot?.querySelector('primary-button');
        button?.addEventListener('click', () => this.submitNewPost());
    }

    connectedCallback(): void {
        this.addEventListeners();
    }
}

if (!customElements.get('new-post-form')) {
    customElements.define('new-post-form', NewPostForm);
}

export default NewPostForm;
