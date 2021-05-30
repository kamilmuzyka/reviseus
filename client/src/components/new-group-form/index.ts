/** @module Component/NewGroupForm */
import html from '../../utils/html-tag';
import Elements from '../../interfaces/elements-interface';

const template = document.createElement('template');
template.innerHTML = html`
    <style></style>
    <form>
        <div class="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" name="name" placeholder="Aa" />
        </div>
        <div class="form-group">
            <label for="public">Public</label>
            <input type="radio" id="public" name="type" value="public" />

            <label for="private">Private</label>
            <input type="radio" id="private" name="type" value="private" />
        </div>
    </form>
`;

class NewGroupForm extends HTMLElement {
    private el: Elements = {};

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
        this.loadElements();
    }

    loadElements(): void {
        const requestedElements = {};
        for (const element in requestedElements) {
            if (element) {
                this.el[element] = requestedElements[element];
            }
        }
    }
}

if (!customElements.get('new-group-form')) {
    customElements.define('new-group-form', NewGroupForm);
}

export default NewGroupForm;
