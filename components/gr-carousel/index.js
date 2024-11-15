import "./components/gr-carousel-item/index.js"
import { stylesheet } from "./style/index.js";

class GrCarousel extends HTMLElement {
    #state = {
        ITEM_LEN: 0,
        index: 0,
        timer: null,
        isDrag: false
    };
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: "open" });

        shadowRoot.innerHTML = `
            <style>${stylesheet}</style>
            <section class="main-container" part="container">
                <header class="statistics-wrap" part="statistics-wrap">
                    <span class="current-index" part="current-index"></span>
                    <span>/</span>
                    <span class="total-index" part="total-index"></span>
                    <span>//</span>
                </header>
                <ul class="carousel-wrap" part="carousel-wrap">
                    <slot></slot>
                </ul>
                <footer class="footer-wrap" part="footer-wrap">
                    <div class="indicator-wrap" part="indicator-wrap"></div>
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
        return Number.isNaN(Number(val)) ? 4000 : Number(val) || 4000;
    }

    set duration(val) {
        val = Number.isNaN(Number(val)) ? 4000 : Number(val) || 4000;

        this.setAttribute("duration", val);
    }
    // #endregion
    // ------- end -------

    /**
     * 初始化 `轮播图元素` 结构
     */
    #initCarouselItem() {
        Array.from(this.childNodes).forEach(item => {
            if (item.tagName !== "GR-CAROUSEL-ITEM") item.remove();
        })

        const children = this.children;
        const firstChild = children[0].cloneNode(true);
        const lastChild = children[children.length - 1].cloneNode(true);

        this.insertBefore(lastChild, this.firstChild);
        this.appendChild(firstChild);

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
            indicator.part = "indicator-item";
            indicator.classList.toggle("active", this.#state.index === i + 1);

            indicator.addEventListener("click", () => {
                this.#state.index = indicator.index;
                this._carouselWrap.style.transform = `translateX(${-this.#state.index * 100}%)`;
                this.#handleIndicatorActive();
                this.#handleTimerClear();
                this.#handleAutoPlay();
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

    /**
     * 处理总共的 `指示器` 个数统计
     */
    #handleStatistics() {
        this._currentIndex.innerHTML = `0${this.#state.index}`;
    }

    /**
     * 处理过渡结束时的操作
     */
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
            this.#state.isDrag = false;
        }, 0);
    }

    /**
     * 清除轮播图自动播放
     */
    #handleTimerClear() {
        if (this.#state.timer) clearInterval(this.#state.timer);
    }

    /**
     * 处理轮播图自动播放
     */
    #handleAutoPlay() {
        this.#state.timer = setInterval(() => {
            this.#next();
        }, this.duration);
    }

    /**
     * 手指拖动时，移动轮播图
     * @param {TouchEvent} startEvent 触摸事件的Event
     */
    #touchEvent(startEvent) {
        if (this.#state.isDrag) return;
        this.#state.isDrag = true;

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
    }

    /**
     * 鼠标拖动时，移动轮播图
     * @param {MouseEvent} startEvent 拖动事件的Event
     */
    #mouseDragEvent(startEvent) {
        if (this.#state.isDrag) return;
        this.#state.isDrag = true;

        const controller = new AbortController();
        const startPoint = startEvent.clientX;
        let endPoint = null;
        this.#handleTimerClear();

        this._carouselWrap.addEventListener("mousemove", moveEvent => {
            endPoint = moveEvent.clientX;
        }, { signal: controller.signal })

        this._carouselWrap.addEventListener("mouseup", () => {
            if (startPoint < endPoint) this.#prev();
            else if (startPoint > endPoint) this.#next();
            else this._carouselWrap.style.transform = `translateX(${-this.#state.index * 100}%)`;

            this.#handleAutoPlay();

            controller.abort();
        }, { signal: controller.signal })
    }

    /**
     * 初始化 `点击`､ `鼠标拖动` 和 `触摸拖动`
     */
    #initEvents() {
        const transitionendCallback = () => {
            this.#onTransitionEndCallback();
        }
        this._carouselWrap.addEventListener("transitionend", transitionendCallback);

        const touchCallback = (startEvent) => {
            this.#touchEvent(startEvent);
        }
        this._carouselWrap.addEventListener("touchstart", touchCallback);

        const mouseCallback = (startEvent) => {
            this.#mouseDragEvent(startEvent);
        }
        this._carouselWrap.addEventListener("mousedown", mouseCallback);
    }

    connectedCallback() {
        this.duration = this.duration;

        this.#initCarouselItem();
        this.#initIndicator();
        this.#handleStatistics();
        this._totalIndex.innerHTML = `0${this.#state.ITEM_LEN - 2}`;

        this.#initEvents();

        this.#handleAutoPlay();
    }
}

window.customElements.define("gr-carousel", GrCarousel);