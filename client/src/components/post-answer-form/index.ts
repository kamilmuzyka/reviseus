/** @module Component/PostAnswerForm */
import html from '../../utils/html-tag';
import Elements from '../../interfaces/elements-interface';
import '../secondary-heading/index';
import '../primary-button/index';

const template = document.createElement('template');
template.innerHTML = html`
    <style>
        .form {
            padding: 2.5rem;
            border-radius: 10px;
            background-color: var(--secondary-bg);
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        }

        .form-textarea {
            padding: 1rem;
            width: 100%;
            min-height: 100px;
            box-sizing: border-box;
            border: none;
            border-radius: 5px;
            background-color: var(--tertiary-bg);
            font-size: 1.6rem;
            outline: 0;
            font-family: inherit;
            color: var(--primary-text);
            resize: none;
        }

        .form-submit-button {
            margin-top: 1.5rem;
        }

        .form-error {
            display: none;
            margin-top: 2.5rem;
            padding: 1rem;
            background-color: var(--error);
            border-radius: 5px;
            color: #dedede;
        }

        .form-error.active {
            display: block;
        }
    </style>
    <div>
        <secondary-heading>Your Answer</secondary-heading>
        <form class="form">
            <textarea
                class="form-textarea"
                name="content"
                placeholder="Aa"
            ></textarea>
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
                <span>Add Answer</span>
            </primary-button>
            <div class="form-error"></div>
        </form>
    </div>
`;

class PostAnswerForm extends HTMLElement {
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
            this.submitPostAnswer()
        );
    }

    displayErrors(message: string): void {
        this.el.error.textContent = message;
        this.el.error.classList.add('active');
    }

    removeErrors(): void {
        this.el.error.textContent = '';
        this.el.error.classList.remove('active');
    }

    async submitPostAnswer(): Promise<void> {
        if (this.el.form instanceof HTMLFormElement) {
            const payload = {
                postId: this.dataset.post,
                content: this.el.form.content.value,
            };
            const response = await fetch('/api/post/answer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            const result = await response.json();
            if (response.ok) {
                this.el.form.reset();
                this.removeErrors();
                return;
            }
            this.displayErrors(result);
        }
    }

    disconnectedCallback(): void {
        this.removeErrors();
    }
}

if (!customElements.get('post-answer-form')) {
    customElements.define('post-answer-form', PostAnswerForm);
}

export default PostAnswerForm;
