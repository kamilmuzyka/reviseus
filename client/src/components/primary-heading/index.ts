/** @module Component/PrimaryHeading */
import html from '../../utils/html-tag';

/** Primary heading component used as a generic UI element. */
const PrimaryHeading = (): void => {
    if (!customElements.get('primary-heading')) {
        const template = document.createElement('template');
        template.innerHTML = html`
            <h2>
                <slot></slot>
            </h2>
        `;
        customElements.define(
            'primary-heading',
            class extends HTMLElement {
                constructor() {
                    super();
                    const shadowRoot = this.attachShadow({ mode: 'open' });
                    shadowRoot.appendChild(template.content.cloneNode(true));
                }
            }
        );
    }
};

export default PrimaryHeading;
