/** @module Component/PostView */
import html from '../../utils/html-tag';
import BrowserRouter from '../browser-router/index';

const template = document.createElement('template');
template.innerHTML = html`
    <style></style>
    <div></div>
`;

class PostView extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
    }

    async loadData(): Promise<void> {
        const currentPostId = this.dataset.id;
        const response = await fetch(`/api/post/${currentPostId}`);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            return;
        }
        BrowserRouter.redirect('/404');
    }

    connectedCallback(): void {
        this.loadData();
    }
}

if (!customElements.get('post-view')) {
    customElements.define('post-view', PostView);
}

export default PostView;
