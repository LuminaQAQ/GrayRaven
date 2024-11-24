import "./components/gr-sg-img/index.js"
import { stylesheet } from "./style/index.js";
import "./utils/renderer.js"

class GrPicture extends HTMLElement {
    #state = {
        pictures: []
    }

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: "open" });

        shadowRoot.innerHTML = `
            <style>
                ${stylesheet}
            </style>
            <div class="gr-picture-group-container pc" part="container">
                <div class="col-6" part="left-wrap">
                    <gr-sg-img part="left-top-img"></gr-sg-img>
                    <gr-sg-img part="left-bottom-img"></gr-sg-img>
                </div>
                <div class="col-12" part="center-wrap">
                    <gr-sg-img part="center-img"></gr-sg-img>
                </div>
                <div class="col-6" part="right-wrap">
                    <gr-sg-img part="right-top-img"></gr-sg-img>
                    <gr-sg-img part="right-bottom-img"></gr-sg-img>
                </div>
            </div>
        `;
    }

    // ------- pictures -------
    // #region
    get pictures() {
        return this.#state.pictures || [];
    }
    set pictures(val) {
        if (!Array.isArray(val)) return;

        const imgs = this.shadowRoot.querySelectorAll("gr-sg-img");
        this.#state.pictures = val;

        this.#state.pictures.forEach((item, index) => {
            imgs[index].src = item;
            imgs[index].addEventListener("click", () => {
                window.open(item);
            })
        })
    }
    // #endregion
    // ------- end -------

    connectedCallback() {
        setTimeout(() => {
            this.dispatchEvent(new CustomEvent("gr-picture-load"))
        }, 20)
    }
}

if (!window.customElements.get("gr-picture")) {
    window.customElements.define("gr-picture", GrPicture);
}