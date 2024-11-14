class GrCarouselItem extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: "open" });

        shadowRoot.innerHTML = `
            <link rel="stylesheet" href="/GrCarousel/components/GrCarouselItem/style/index.css">
            <section class="carousel-item" part="container">
                <slot></slot>
            </section>
        `;
    }
}

window.customElements.define("gr-carousel-item", GrCarouselItem);