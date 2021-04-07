import PrimaryHeading from './components/primary-heading/index';

const App = (): void => {
    customElements.define(
        'the-app',
        class extends HTMLElement {
            constructor() {
                super();
                const template = document.createElement('template');
                template.innerHTML = `
                  <div>
                    <primary-heading>Revise.us</primary-heading>
                  </div>
                `;
                const shadowRoot = this.attachShadow({ mode: 'closed' });
                shadowRoot.appendChild(template.content.cloneNode(true));
            }
        }
    );
};

PrimaryHeading();
App();
