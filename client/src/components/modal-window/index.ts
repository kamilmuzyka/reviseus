/** @module Component/ModalWindow */
import html from '../../utils/html-tag';
import Elements from '../../interfaces/elements-interface';

const template = document.createElement('template');
template.innerHTML = html`
    <style>
        .modal-outer {
            display: flex;
            justify-content: center;
            align-items: center;
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            z-index: 3;
            padding: 2.5rem;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.1s ease-in-out, visibility 0.3s ease-in-out;
            background-color: rgba(0, 0, 0, 0.75);
        }

        .active {
            opacity: 1;
            visibility: visible;
        }

        .modal-inner {
            padding: 3.5rem;
            background-color: var(--primary-bg);
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
            border-radius: 10px;
            text-align: center;
            color: var(--primary-text);
        }
    </style>
    <div class="modal-outer">
        <div class="modal-inner">
            <slot></slot>
        </div>
    </div>
`;

class ModalWindow extends HTMLElement {
    private el: Elements = {};
    private name;

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
        this.loadElements();
    }

    loadElements(): void {
        const requestedElements = {
            outer: this.shadowRoot?.querySelector('.modal-outer'),
            inner: this.shadowRoot?.querySelector('.modal-inner'),
        };
        for (const element in requestedElements) {
            if (element) {
                this.el[element] = requestedElements[element];
            }
        }
    }

    open(): void {
        this.el.outer.classList.add('active');
    }

    close(): void {
        this.el.outer.classList.remove('active');
    }

    load(): void {
        this.name = this.dataset.name ?? '';
    }

    addEventListeners(): void {
        window.addEventListener(`open${this.name}`, () => this.open());
        window.addEventListener(`close${this.name}`, () => this.close());
        this.el.outer.addEventListener('click', () => this.close());
        this.el.inner.addEventListener('click', (e) => e.stopPropagation());
    }

    connectedCallback(): void {
        this.load();
        this.addEventListeners();
    }
}

if (!customElements.get('modal-window')) {
    customElements.define('modal-window', ModalWindow);
}

export default ModalWindow;
