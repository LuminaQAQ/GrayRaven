import { stylesheet } from "./style/index.js";

class GrCarouselItem extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: "open" });

        shadowRoot.innerHTML = `
            <style>${stylesheet}</style>
            <section class="carousel-item" part="container">
                <slot></slot>
            </section>
        `;
    }
}

window.customElements.define("gr-carousel-item", GrCarouselItem);