class GrPage extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.innerHTML = `
            <style>
                .sg-page {
                    position: relative;
                    height: 100vh;

                    overflow: hidden;
                }
            </style>
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