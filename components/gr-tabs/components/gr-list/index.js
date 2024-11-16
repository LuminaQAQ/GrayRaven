class GrList extends HTMLElement {
    #state = {
        prefix: "",
        content: "",
        surfix: "",
        href: ""
    }
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: "open" });

        shadowRoot.innerHTML = `
            <style>
                @import "/components/gr-tabs/components/gr-list/style/index.css";
            </style>
            <a class="list-item-container" part="container">
                <div class="content-wrap">
                    <div class="prefix-desc-wrap" part="prefix-desc">
                        <slot name="prefix"></slot>
                    </div>
                    <div class="msg-wrap" part="msg-wrap">
                        <slot></slot>
                    </div>
                </div>
                <div class="suffix-desc-wrap" part="suffix-desc">
                    <slot name="suffix"></slot>
                </div>
            </a>
        `;

        this._container = shadowRoot.querySelector(".list-item-container");
        this._prefixWrap = shadowRoot.querySelector(".prefix-desc-wrap");
        this._contentWrap = shadowRoot.querySelector(".msg-wrap");
    }

    // ------- prefix -------
    // #region
    get prefix() {
        return this.#state.prefix;
    }

    set prefix(val) {
        if (!val) return;

        this.#state.prefix = val;
        this._prefixWrap.innerHTML = val
    }
    // #endregion
    // ------- end -------

    // ------- href -------
    // #region
    get href() {
        return this.#state.href || this.getAttribute("href");
    }

    set href(val) {
        if (!val) return;

        this.#state.href = val;
        this._container.setAttribute("href", val);
    }
    // #endregion
    // ------- end -------

    connectedCallback() {
        this.href = this.href;
    }
}

/**
 * 
 * @param {Array} arr 
 * @returns {String}
 */
window.$renderList = (arr) => {
    const html = "";

    arr.forEach(item => {
        // const
    })

    return html;
}

window.customElements.define("gr-list", GrList);