import { stylesheet } from "./styles/index.js";

class GrPage extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.innerHTML = `
            ${stylesheet}
            <div class="sg-page" part="container">
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

        setTimeout(() => {
            this.dispatchEvent(new CustomEvent("gr-page-loaded", {
                bubbles: true,
                composed: true,
                detail: {
                    path: this.path
                }
            }));
        }, 20);
    }
}

window.customElements.define("gr-page", GrPage);