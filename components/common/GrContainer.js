import "./GrPage.js";

class GrContainer extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.innerHTML = `
            <style>
                .main-container {
                    position: relative;
                    height: 100vh;

                    transition: transform .5s;
                }
            </style>
            <div class="main-container">
                <slot></slot>
            </div>
        `;

        this._container = shadowRoot.querySelector(".main-container");
    }

    #handlePageChange() {
        const hash = window.location.hash.substring(1);
        const page = this.querySelector(`[page="${hash ? hash : "Home"}"]`);

        if (page) this._container.style.transform = `translateY(${-page.offsetTop}px)`;
    }

    connectedCallback() {
        Array.from(this.childNodes).forEach((child, index) => {
            if (child.tagName !== "GR-PAGE") child.remove();
            else child.index = index;
        });

        this.#handlePageChange();

        window.addEventListener("hashchange", () => {
            this.#handlePageChange();
        })

        window.addEventListener("resize", () => {
            this.#handlePageChange();
        })

        setTimeout(() => {
            this.dispatchEvent(new CustomEvent("gr-container-load"));
        }, 0);
    }
}

window.customElements.define("gr-container", GrContainer);