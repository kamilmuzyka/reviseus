class App extends HTMLElement {
    constructor() {
        super();
        this.render();
    }

    render() {
        const template = document.createElement('template');
        template.innerHTML = `
          <div>
            <h1>Revise.us</h1>
          </div>
        `;
        const shadowRoot = this.attachShadow({ mode: 'closed' });
        shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('ts-app', App);
