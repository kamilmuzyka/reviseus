/** @module Component/PostAnswerForm */
import html from '../../utils/html-tag';
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
            margin-top: 2.5rem;
        }
    </style>
    <div>
        <secondary-heading>Your Answer</secondary-heading>
        <form class="form">
            <textarea class="form-textarea" placeholder="Aa"></textarea>
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
                <span>Add Answer</span>
            </primary-button>
        </form>
    </div>
`;

class PostAnswerForm extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

if (!customElements.get('post-answer-form')) {
    customElements.define('post-answer-form', PostAnswerForm);
}

export default PostAnswerForm;
