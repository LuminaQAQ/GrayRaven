class GrSgImg extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.innerHTML = `
            <style>
            @import "/components/gr-picture/components/gr-sg-img/style/index.css";

            </style>
            <div class="sg-img">
                <div class="search-icon">
                    <div class="search-glass"></div>
                    <div class="search-handgrip"></div>
                </div>
                <img class="img">
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
}

if (!window.customElements.get("gr-sg-img")) {
    window.customElements.define("gr-sg-img", GrSgImg);
}