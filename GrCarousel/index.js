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
                    
                    </div>
                </footer>
            </section>
        `;

        this._carouselWrap = shadowRoot.querySelector(".carousel-wrap");
        this._indicatorWrap = shadowRoot.querySelector(".indicator-wrap");
        this._currentIndex = shadowRoot.querySelector(".current-index");
        this._totalIndex = shadowRoot.querySelector(".total-index");
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
        for (let i = 0; i < this.#state.ITEM_LEN - 2; i++) {
            const indicator = document.createElement("span");
            indicator.index = i + 1;
            indicator.className = "carousel-indicator-item";
            indicator.classList.toggle("active", this.#state.index === i + 1);

            indicator.addEventListener("click", () => {
                this.#state.index = indicator.index;
                this._carouselWrap.style.transform = `translateX(${-this.#state.index * 100}%)`;
                this.#handleIndicatorActive();
            })

            this._indicatorWrap.appendChild(indicator);
        }
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

    #handleStatistics() {
        this._currentIndex.innerHTML = `0${this.#state.index}`;
    }

    #onTransitionEndCallback() {
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
        this.#handleStatistics();

        setTimeout(() => {
            this._carouselWrap.style.transitionDuration = ".3s";
        }, 0);
    }

    #handleTimerClear() {
        if (this.#state.timer) clearInterval(this.#state.timer);
    }

    #handleAutoPlay() {
        this.#state.timer = setInterval(() => {
            this.#next();
        }, this.duration);
    }

    connectedCallback() {
        this.duration = this.duration;

        this.#initCarouselItem();
        this.#initIndicator();
        this.#handleStatistics();
        this._totalIndex.innerHTML = `0${this.#state.ITEM_LEN - 2}`;

        const callback = () => {
            this.#onTransitionEndCallback();
        }
        this._carouselWrap.addEventListener("transitionend", callback)

        this._carouselWrap.addEventListener("touchstart", startEvent => {
            const controller = new AbortController();
            const startPoint = startEvent.touches[0].clientX;
            let endPoint = null;
            this.#handleTimerClear();

            this._carouselWrap.addEventListener("touchmove", moveEvent => {
                endPoint = moveEvent.touches[0].clientX;
            }, { signal: controller.signal })

            this._carouselWrap.addEventListener("touchend", () => {
                if (startPoint < endPoint) this.#prev();
                else if (startPoint > endPoint) this.#next();
                else this._carouselWrap.style.transform = `translateX(${-this.#state.index * 100}%)`;

                this.#handleAutoPlay();

                controller.abort();
            }, { signal: controller.signal })
        })

        this.#handleAutoPlay();
    }
}

window.customElements.define("gr-carousel", GrCarousel);