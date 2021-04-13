/** @module Component/App */
import html from './utils/html-tag';
import GoogleButton from './components/google-button/index';

/** Top-level application component that makes use of all existing components.
 * It's installed in index.html as an entry point to JavaScript application. All
 * components within the application are functions that define custom elements.
 * A function must be executed before using a component. It's to ensure that a
 * component is defined as a custom element. */
const App = (): void => {
    if (!customElements.get('the-app')) {
        const template = document.createElement('template');
        template.innerHTML = html`
            <div>
                <google-button></google-button>
            </div>
        `;
        customElements.define(
            'the-app',
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

GoogleButton();
App();

export default App;
