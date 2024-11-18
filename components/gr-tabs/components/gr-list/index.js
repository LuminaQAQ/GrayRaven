import { stylesheet } from "./style/index.js";

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
                ${stylesheet}
            </style>
            <a class="list-item-container" part="container">
                <span class="content-wrap" part="content-wrap">
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
        this._prefixWrap = shadowRoot.querySelector(".prefix-desc-wrap");
        this._surfixWrap = shadowRoot.querySelector(".suffix-desc-wrap");
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

    // ------- surfix -------
    // #region
    get surfix() {
        return this.#state.surfix;
    }

    set surfix(val) {
        if (!val) return;

        this.#state.surfix = val;
        this._surfixWrap.innerHTML = val
    }
    // #endregion
    // ------- end -------

    // ------- content -------
    // #region
    get content() {
        return this.#state.content;
    }

    set content(val) {
        if (!val) return;

        this.#state.surfix = val;
        this._contentWrap.innerHTML = val
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
 * @param {HTMLElement} root 
 * @param {Array} arr 
 */
window.$renderGrList = (root, arr) => {
    arr.forEach(item => {
        const el = document.createElement("gr-list");
        for (const k in item) {
            el[k] = item[k];
        }
        root.appendChild(el);
    })
}

window.customElements.define("gr-list", GrList);