class GrCarousel extends HTMLElement {
    #state = {
        ITEM_LEN: 0,
        index: 0,
        timer: null
    };
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: "open" });

        shadowRoot.innerHTML = `
            <link rel="stylesheet" href="./style/index.css">
            <section class="main-container" part="container">
                <header class="statistics-wrap">
                    <span class="current-index" part="current-index">02</span>/
                    <span class="total-index" part="total-index">03</span>//
                </header>
                <ul class="carousel-wrap" part="carousel-wrap">
                    <li class="carousel-item">1</li>
                    <li class="carousel-item">2</li>
                    <li class="carousel-item">3</li>
                </ul>
                <footer class="footer-wrap" part="footer-wrap">
                    <div class="indicator-wrap" part="indicator-wrap">
                        <span class="carousel-indicator-item active"></span>
                        <span class="carousel-indicator-item"></span>
                        <span class="carousel-indicator-item"></span>
                    </div>
                </footer>
            </section>
        `;

        this._carouselWrap = shadowRoot.querySelector(".carousel-wrap");
        this._indicatorWrap = shadowRoot.querySelector(".indicator-wrap");
    }

    // ------- duration -------
    // #region
    get duration() {
        const val = this.getAttribute("duration");
        return Number.isNaN(Number(val)) ? 1000 : Number(val) || 1000;
    }

    set duration(val) {
        val = Number.isNaN(Number(val)) ? 1000 : Number(val) || 1000;

        this.setAttribute("duration", val);
    }
    // #endregion
    // ------- end -------

    /**
     * 初始化 `轮播图元素` 结构
     */
    #initCarouselItem() {
        const children = this._carouselWrap.children;
        const firstChild = children[0].cloneNode(true);
        const lastChild = children[children.length - 1].cloneNode(true);

        this._carouselWrap.insertBefore(lastChild, this._carouselWrap.firstChild);
        this._carouselWrap.appendChild(firstChild);

        this.#state.ITEM_LEN = children.length;
        this.#state.index = (this.#state.index + 1) % (children.length + 2);
        this._carouselWrap.style.transform = `translateX(${-this.#state.index * 100}%)`;
    }

    /**
     * 下一张轮播图
     */
    #next() {
        this.#state.index = (this.#state.index + 1) % (this.#state.ITEM_LEN);
        this._carouselWrap.style.transform = `translateX(${-this.#state.index * 100}%)`;
    }

    /**
     * 上一张轮播图
     */
    #prev() {
        this.#state.index = (this.#state.index - 1) % (this.#state.ITEM_LEN);
        this._carouselWrap.style.transform = `translateX(${-this.#state.index * 100}%)`;
    }
    /**
     * 初始化 `轮播图指示器` 元素
     */
    #initIndicator() {
        const indicators = this._indicatorWrap.children;

        Array.from(indicators).forEach((indicator, index) => {
            indicator.index = index + 1;

            indicator.addEventListener("click", () => {
                this.#state.index = indicator.index;
                this._carouselWrap.style.transform = `translateX(${-this.#state.index * 100}%)`;
                this.#handleIndicatorActive();
            })
        })
    }

    /**
     * 处理 `轮播图指示器` 的激活状态 
     */
    #handleIndicatorActive() {
        const indicators = this._indicatorWrap.children;

        Array.from(indicators).forEach(indicator => {
            indicator.classList.toggle("active", indicator.index === this.#state.index);
        })
    }

    connectedCallback() {
        this.duration = this.duration;
        this.#initCarouselItem();
        this.#initIndicator();

        this._carouselWrap.addEventListener("transitionend", () => {
            this._carouselWrap.style.transitionDuration = "0s";

            if (this.#state.index === this.#state.ITEM_LEN - 1) {
                this.#state.index = 1;
                this._carouselWrap.style.transform = `translateX(${-this.#state.index * 100}%)`;
            }

            if (this.#state.index === 0) {
                this.#state.index = this.#state.ITEM_LEN - 2;
                this._carouselWrap.style.transform = `translateX(${-this.#state.index * 100}%)`;
            }

            this.#handleIndicatorActive();

            setTimeout(() => {
                this._carouselWrap.style.transitionDuration = ".3s";
            }, 0);
        })

        setInterval(() => {
            this.#next();
            // this.#prev();
        }, this.duration);
    }
}

window.customElements.define("gr-carousel", GrCarousel);