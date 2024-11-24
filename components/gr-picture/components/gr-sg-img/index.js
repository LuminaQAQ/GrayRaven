import { stylesheet } from "./style/index.js";

class GrSgImg extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.innerHTML = `
            <style>
                ${stylesheet}
            </style>
            <div class="sg-img has-picture" part="container">
                <div class="search-icon" part="search-icon">
                    <div class="search-glass" part="search-glass"></div>
                    <div class="search-handgrip" part="search-handgrip"></div>
                </div>
                <img class="img" part="img">
            </div>
        `;

        this._container = shadowRoot.querySelector(".sg-img");
        this._img = shadowRoot.querySelector(".img");
    }

    // ------- src -------
    // #region
    get src() {
        return this.getAttribute("src") || '';
    }

    set src(val) {
        if (!val) return;

        const img = new Image();
        img.src = val;
        this._container.classList.remove("has-picture");

        img.onerror = () => {
            console.error(`[gr-picture] 图片加载失败！`);
            this._img.src = new URL("../../assets/error.png", import.meta.url).href;
        }

        img.onload = () => {
            this._img.src = val;
        }
    }
    // #endregion
    // ------- end -------

    connectedCallback() {
        setTimeout(() => {
            this._container.classList.add("with-transition");
        }, 100);
    }
}

if (!window.customElements.get("gr-sg-img")) {
    window.customElements.define("gr-sg-img", GrSgImg);
}