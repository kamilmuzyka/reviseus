/** @module Component/ThemeToggle */
import Elements from '../../interfaces/elements-interface';
import html from '../../utils/html-tag';
import '../primary-button/index';
import theme from '../../contexts/theme';

const template = document.createElement('template');
template.innerHTML = html`
    <style>
        .container {
            display: inline-block;
            user-select: none;
        }

        .label {
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: relative;
            width: 55px;
            height: 25px;
            padding: 0 1px;
            background-color: var(--accent);
            border-radius: 50px;
            font-size: 24px;
            cursor: pointer;
        }

        .pointer {
            position: absolute;
            top: -1px;
            left: -1px;
            width: 25px;
            height: 25px;
            background-color: #ffffff;
            border-radius: 50%;
            border: 1px solid #aaaaaa;
            transition: transform 0.1s ease-in-out;
        }

        .checkbox {
            visibility: hidden;
            opacity: 0;
        }

        .checkbox:checked + .label .pointer {
            transform: translateX(31px);
        }
    </style>
    <div class="container">
        <input class="checkbox" type="checkbox" id="checkbox" />
        <label for="checkbox" class="label">
            🌞 🌚
            <div class="pointer"></div>
        </label>
    </div>
`;

class ThemeToggle extends HTMLElement {
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
            checkbox: this.shadowRoot?.querySelector('.checkbox'),
        };
        for (const element in requestedElements) {
            if (element) {
                this.el[element] = requestedElements[element];
            }
        }
    }

    updateCheckbox(): void {
        if (theme.current === 'dark') {
            this.el.checkbox.setAttribute('checked', '');
            return;
        }
        this.el.checkbox.removeAttribute('checked');
    }

    addEventListeners(): void {
        this.el.checkbox.addEventListener('click', () => theme.toggle());
        window.addEventListener('themechange', () => this.updateCheckbox());
    }
}

if (!customElements.get('theme-toggle')) {
    customElements.define('theme-toggle', ThemeToggle);
}

export default ThemeToggle;
