import { stylesheet } from "./styles/index.js";

class GrPage extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.innerHTML = `
            ${stylesheet}
            <div class="sg-page">
                <slot></slot>
            </div >
        `;
    }

    // ------- path -------
    // #region
    get path() {
        return this.getAttribute("path");
    }

    set path(val) {
        this.setAttribute("path", val);
    }
    // #endregion
    // ------- end -------

    connectedCallback() {
        this.style.display = "block";
    }
}

window.customElements.define("gr-page", GrPage);