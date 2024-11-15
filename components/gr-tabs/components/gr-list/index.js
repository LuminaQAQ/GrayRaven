class GrList extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: "open" });

        shadowRoot.innerHTML = `
            <style>
                @import "/components/gr-tabs/components/gr-list/style/index.css";
            </style>
            <a class="list-item-container" part="container">
                <span class="content-wrap">
                    <span class="prefix-desc-wrap" part="prefix-desc">
                        <slot name="prefix"></slot>
                    </span>
                    <span class="msg-wrap" part="msg-wrap">
                        <slot></slot>
                    </span>
                </span>
                <span class="suffix-desc-wrap" part="suffix-desc">
                    <slot name="suffix"></slot>
                </span>
            </a>
        `;

        this._container = shadowRoot.querySelector(".list-item-container");
    }

    // ------- href -------
    // #region
    get href() {
        return this.getAttribute("href");
    }

    set href(val) {
        if (!val) return;

        this._container.setAttribute("href", val);
    }
    // #endregion
    // ------- end -------

    connectedCallback() {
        this.href = this.href;
    }
}

window.customElements.define("gr-list", GrList);