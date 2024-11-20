import { stylesheet } from "./styles/index.js";

class GrHoverCard extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: "open" });

        shadowRoot.innerHTML = `
            <style>${stylesheet}</style>
            <a class="gr-hover-card" part="container">
                <div class="info-wrap" part="info-wrap">
                    <p class="title" part="title"></p>
                    <p class="desc" part="desc"></p>
                </div>
            </a>
        `;

        this._titleWrap = shadowRoot.querySelector(".title");
        this._descWrap = shadowRoot.querySelector(".desc");
    }

    // ------- title -------
    // #region
    get title() {
        return this.getAttribute("title") || '';
    }

    set title(val) {
        if (!val) return;

        this._titleWrap.innerHTML = val;
    }
    // #endregion
    // ------- end -------

    // ------- desc -------
    // #region
    get desc() {
        return this.getAttribute("desc") || '';
    }

    set desc(val) {
        if (!val) return;

        this._descWrap.innerHTML = val.toUpperCase();
    }
    // #endregion
    // ------- end -------

    connectedCallback() {
        this.title = this.title;
        this.desc = this.desc;
    }
}

if (!window.customElements.get("gr-hover-card")) {
    window.customElements.define("gr-hover-card", GrHoverCard);
}