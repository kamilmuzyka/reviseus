/** @module Component/SingleRoute */
import html from '../../utils/html-tag';

const template = document.createElement('template');
template.innerHTML = html`<slot></slot>`;

/**  A component meant to be used as a direct child of the "browser-router"
 * element. Pass it a single child element (component) that you would like
 * to render in matching locations:
 * ```html
 *  <single-route data-path="/" data-exact="true">
 *      <home-view></home-view>
 *  </single-route>
 * ```
 * @param - <code>data-path="/example"</code> Use it to specify the location in
 * which the component should render.
 * @param - <code>data-exact="true"</code> Use it to render the component only
 * in locations that are exactly the same as the <i>data-path</i> value. If set
 * to false (or not added), the component will render in inexact locations. For
 * example, <i>data-path="/example"</i> will match <i>"/example/user"</i>
 * location if <i>data-exact="false"</i>. */
class SingleRoute extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

if (!customElements.get('single-route')) {
    customElements.define('single-route', SingleRoute);
}

export default SingleRoute;
