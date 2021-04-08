/** @module Component/Application */
import PrimaryHeading from './components/primary-heading/index';

/** Top-level application component that makes use of all existing components. It's installed in index.html as an entry point to JavaScript application. All components within the application are functions that define custom elements. A component function must execute before using a component. It's to ensure that a component is defined as a custom element. */
const App = (): void => {
    if (!customElements.get('the-app')) {
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
                    const shadowRoot = this.attachShadow({ mode: 'open' });
                    shadowRoot.appendChild(template.content.cloneNode(true));
                }
            }
        );
    }
};

PrimaryHeading();
App();

export default App;
