import html from '../../utils/html-tag';
import '../primary-button/index';

const template = document.createElement('template');
template.innerHTML = html`
    <primary-button
        class="form-file-button"
        data-background="transparent"
        data-border="var(--subtle)"
    >
        <svg
            slot="icon"
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12.207"
            viewBox="0 0 12 12.207"
        >
            <g transform="translate(0.5 0.707)">
                <path
                    d="M15.5,22.5v2.444a1.222,1.222,0,0,1-1.222,1.222H5.722A1.222,1.222,0,0,1,4.5,24.944V22.5"
                    transform="translate(-4.5 -15.167)"
                    fill="none"
                    stroke="#f0f0f0"
                    stroke-linecap="square"
                    stroke-linejoin="round"
                    stroke-width="1"
                />
                <path
                    d="M10.5,18.056,13.556,15l3.056,3.056"
                    transform="translate(-8.056 -15)"
                    fill="none"
                    stroke="#f0f0f0"
                    stroke-linecap="square"
                    stroke-width="1"
                />
                <path
                    d="M18,4.5v7"
                    transform="translate(-12.5 -4.167)"
                    fill="none"
                    stroke="#f0f0f0"
                    stroke-linecap="square"
                    stroke-linejoin="round"
                    stroke-width="1"
                />
            </g>
        </svg>
        <slot></slot>
    </primary-button>
`;

class FileButton extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

if (!customElements.get('file-button')) {
    customElements.define('file-button', FileButton);
}

export default FileButton;
