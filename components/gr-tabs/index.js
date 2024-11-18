import "./components/gr-tab/index.js"
import "./components/gr-list/index.js"

import { stylesheet } from "./style/index.js";

class GrTabs extends HTMLElement {
    #state = {
        LEN: 0,
        curIndex: 0,
    }
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: "open" });

        shadowRoot.innerHTML = `
            <style>
                ${stylesheet}
            </style>
            <section class="tabs-container" part="container">
                <header class="tab-wrap" part="tab-wrap">
                    <div class="tab-list-wrap" part="tab-list-wrap"></div>
                    <span class="tab-line" part="tab-line"></span>
                    <span class="tab-cursor" part="tab-cursor">
                        <span class="cursor-tail" part="cursor-tail"></span>
                        <span class="cursor-arrow" part="cursor-arrow"></span>
                    </span>
                </header>
                <main class="content-wrap" part="content-wrap">
                    <div class="list-wrap" part="list-wrap"></div>
                </main>
                <footer class="footer-wrap" part="footer-wrap">
                    <slot name="footer"></slot>
                </footer>
            </section>
            <div class="temp">
                <slot></slot>
            </div>
        `;

        this._tabWrap = shadowRoot.querySelector(".tab-list-wrap");
        this._tabLine = shadowRoot.querySelector(".tab-line");
        this._tabCursor = shadowRoot.querySelector(".tab-cursor");

        this._contentWrap = shadowRoot.querySelector(".list-wrap");
        this._temp = shadowRoot.querySelector(".temp");
    }

    // ------- curIndex -------
    // #region
    get curIndex() {
        return this.#state.curIndex;
    }

    set curIndex(val) {
        this.#state.curIndex = val;
    }
    // #endregion
    // ------- end -------

    /**
     * 创建标签元素
     * @param {String} title 标签名
     * @returns {HTMLDivElement} 
     */
    #createTabElement(title, index) {
        const tab = document.createElement("div");
        tab.classList.add("tab-item");
        tab.part = "tab-item";
        tab.innerHTML = `
            <span class="index">0${index}</span>
            <span class="title">${title}</span>
        `;

        return tab;
    }

    /**
     * 创建列表元素
     * @param {InnerHTML} innerHTML 列表元素的模板字符串
     * @returns {HTMLDivElement}
     */
    #createContentElement(title, innerHTML) {
        const content = document.createElement("div");
        content.classList.add("content-item");
        content.part = "content-item";
        content.setAttribute("data-tab-title", title);

        content.innerHTML = innerHTML;

        return content;
    }

    #initTabHTMLStruct() {
        Array.from(this.children).forEach((item, index) => {
            if (item.tagName === "GR-TAB") {
                const tab = this.#createTabElement(item.title, index);
                const content = this.#createContentElement(item.title, item.innerHTML);

                tab.index = index;
                content.index = index;

                tab.style.setProperty("--sign-text", `"0${index + 1}"`);

                tab.addEventListener("click", () => {
                    this._contentWrap.style.transform = `translateX(${-index * 100}%)`;
                    this.curIndex = index;
                    this._tabLine.style.left = `${tab.offsetWidth * (index + 1) - 28}px`;
                    this._tabCursor.style.left = `${tab.offsetWidth * index}px`;

                    const tabs = this._tabWrap.querySelectorAll(".tab-item");
                    tabs.forEach((item, clearIndex) => {
                        item.classList.toggle("active", clearIndex === index);
                    })
                });

                this._tabWrap.appendChild(tab);
                this._contentWrap.appendChild(content);

                item.remove();
                this.#state.LEN++;
            }
        });

        this._temp.remove();
    }

    /**
     * 用于在 `鼠标拖动` 和 `手指移动` 时，切换到对应 `tab`
     * @param {Number} startPoint 
     * @param {Number} endPoint 
     */
    #handleContentMove(startPoint, endPoint) {
        const width = this._contentWrap.offsetWidth;
        const tabs = this._tabWrap.querySelectorAll(".tab-item");

        if (startPoint > endPoint && startPoint - endPoint > width / 2) {
            tabs[this.curIndex + 1 > this.#state.LEN - 1 ? this.#state.LEN - 1 : this.curIndex + 1].click();
        } else if (startPoint < endPoint && endPoint - startPoint > width / 2) {
            tabs[this.curIndex - 1 < 0 ? 0 : this.curIndex - 1].click();
        } else {
            tabs[this.curIndex].click();
        }
    }

    #initTouchEvent() {
        this._contentWrap.addEventListener("touchstart", (startE) => {
            const controller = new AbortController();
            const startPoint = startE.touches[0].clientX;
            let endPoint = null;

            this._contentWrap.addEventListener("touchmove", (moveE) => {
                endPoint = moveE.touches[0].clientX;

                this._contentWrap.style.transform = `translateX(calc(${this.curIndex * -100}% - ${startPoint - endPoint}px))`;
            }, { signal: controller.signal })

            this._contentWrap.addEventListener("touchend", () => {
                this.#handleContentMove(startPoint, endPoint);
                controller.abort();
            }, { signal: controller.signal })
        })
    }

    connectedCallback() {
        this.#initTabHTMLStruct();
        this.#initTouchEvent();

        setTimeout(() => {
            const tabs = this._tabWrap.querySelectorAll(".tab-item");
            const width = tabs[0].offsetWidth;
            tabs.forEach((item, clearIndex) => {
                item.classList.toggle("active", clearIndex === this.curIndex);
            })

            this._tabLine.style.left = `${width * (this.curIndex + 1) - 28}px`;

            this.dispatchEvent(new CustomEvent("gr-tabs-load"));
        }, 50);
    }
}

window.customElements.define("gr-tabs", GrTabs);