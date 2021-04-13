/** @module Component/App */
import html from './utils/html-tag';
import GoogleButton from './components/google-button/index';

/** A top-level application component installed in index.html as an entry point
 * to JavaScript application. */
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
