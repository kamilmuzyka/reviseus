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

        .form-upload-button {
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
            <upload-button class="form-upload-button">Select Files</-button>
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
    }

    openFileInput(): void {
        if (this.el.fileInput instanceof HTMLInputElement) {
            this.el.fileInput.click();
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
