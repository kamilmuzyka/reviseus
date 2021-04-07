const PrimaryHeading = (): void => {
    if (!customElements.get('primary-heading')) {
        customElements.define(
            'primary-heading',
            class extends HTMLElement {
                constructor() {
                    super();
                    const template = document.createElement('template');
                    template.innerHTML = `
                      <h2>
                        <slot></slot>
                      </h2>
                    `;
                    const shadowRoot = this.attachShadow({ mode: 'open' });
                    shadowRoot.appendChild(template.content.cloneNode(true));
                }
            }
        );
    }
};

export default PrimaryHeading;
