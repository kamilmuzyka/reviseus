/** @module Component/NewPostForm */
import html from '../../utils/html-tag';
import Elements from '../../interfaces/elements-interface';
import BrowserRouter from '../browser-router';
import '../primary-button/index';
import '../upload-button/index';

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

        .form-file-group {
            margin-top: 2.5rem;
        }

        .form-upload-button {
            margin-top: 1rem;
        }

        .form-file-count {
            margin-left: 1.5rem;
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
            <div class="form-file-group">
                <upload-button class="form-upload-button">
                    Select Files
                </upload-button>
                <span class="form-file-count"></span>
            </div>
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
                        fill="var(--primary-text)"
                    />
                </svg>
                <span>Create Post</span>
            </primary-button>
        </div>
        <div class="form-error"></div>
    </form>
`;

class NewPostForm extends HTMLElement {
    private el: Elements = {};

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
        this.loadElements();
        this.addEventListeners();
    }

    loadElements(): void {
        const requestedElements = {
            form: this.shadowRoot?.querySelector('form'),
            fileInput: this.shadowRoot?.querySelector('.form-file-input'),
            fileCount: this.shadowRoot?.querySelector('.form-file-count'),
            uploadButton: this.shadowRoot?.querySelector('.form-upload-button'),
            submitButton: this.shadowRoot?.querySelector('.form-submit-button'),
            error: this.shadowRoot?.querySelector('.form-error'),
        };
        for (const element in requestedElements) {
            if (element) {
                this.el[element] = requestedElements[element];
            }
        }
    }

    addEventListeners(): void {
        this.el.submitButton.addEventListener('click', () =>
            this.submitNewPost()
        );
        this.el.uploadButton.addEventListener('click', () =>
            this.openFileInput()
        );
        this.el.fileInput.addEventListener('change', () =>
            this.updateFileInput()
        );
    }

    openFileInput(): void {
        if (this.el.fileInput instanceof HTMLInputElement) {
            this.el.fileInput.click();
        }
    }

    updateFileInput(): void {
        if (this.el.fileInput instanceof HTMLInputElement) {
            this.el.fileCount.textContent = `${this.el.fileInput.files?.length} Files Selected`;
        }
    }

    displayErrors(message: string): void {
        this.el.error.textContent = message;
        this.el.error.classList.add('active');
    }

    removeErrors(): void {
        this.el.error.textContent = '';
        this.el.error.classList.remove('active');
    }

    async submitNewPost(): Promise<void> {
        if (this.el.form instanceof HTMLFormElement) {
            const payload = new FormData(this.el.form);
            const response = await fetch('/api/post', {
                method: 'POST',
                body: payload,
            });
            const result = await response.json();
            if (response.ok) {
                this.el.form.reset();
                this.removeErrors();
                BrowserRouter.redirect(`/posts/${result.id}`);
                return;
            }
            this.displayErrors(result);
        }
    }

    disconnectedCallback(): void {
        this.removeErrors();
    }
}

if (!customElements.get('new-post-form')) {
    customElements.define('new-post-form', NewPostForm);
}

export default NewPostForm;
