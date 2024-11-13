class GrCarousel extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: "open" });

        shadowRoot.innerHTML = `
            <section class="main-container" part="container">
                <header class="statistics-wrap" part="statistics-wrap">
                    <span class="current-index" part="current-index">02</span>/
                    <span class="total-index" part="total-index">03</span>//
                </header>
                <ul class="carousel-wrap" part="carousel-wrap">
                    <li class="carousel-item">1</li>
                    <li class="carousel-item">2</li>
                    <li class="carousel-item">3</li>
                </ul>
                <footer class="footer-wrap" part="footer-wrap">
                    <div class="cursors-wrap" part="cursors-wrap">
                        <span class="carousel-cursor-item" part=""></span>
                    </div>
                </footer>
            </section>
        `;
    }
}

window.customElements.define("gr-carousel", GrCarousel);