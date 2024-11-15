import "./components/gr-tab/index.js"
import "./components/gr-list/index.js"

class GrTabs extends HTMLElement {
    #state = {
        curIndex: 0,
    }
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: "open" });

        shadowRoot.innerHTML = `
            <style>
                @import "/components/gr-tabs/style/index.css";
            </style>
            <section class="tabs-container" part="container">
                <header class="tab-wrap" part="tab-wrap">
                    <div class="tab-list-wrap" part="tab-list-wrap"></div>
                    <span class="tab-cursor"></span>
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
        this._tabCursor = shadowRoot.querySelector(".tab-cursor");

        this._contentWrap = shadowRoot.querySelector(".list-wrap");
        this._temp = shadowRoot.querySelector(".temp");
    }

    /**
     * 创建标签元素
     * @param {String} title 标签名
     * @returns {HTMLDivElement} 
     */
    #createTabElement(title) {
        const tab = document.createElement("div");
        tab.classList.add("tab-item");
        tab.part = "tab-item";

        tab.innerText = title;

        return tab;
    }

    /**
     * 创建列表元素
     * @param {InnerHTML} innerHTML 列表元素的模板字符串
     * @returns {HTMLDivElement}
     */
    #createContentElement(innerHTML) {
        const content = document.createElement("div");
        content.classList.add("content-item");
        content.part = "content-item";

        content.innerHTML = innerHTML;

        return content;
    }

    #initTabHTMLStruct() {
        Array.from(this.children).forEach((item, index) => {
            if (item.tagName === "GR-TAB") {
                const tab = this.#createTabElement(item.title);
                const content = this.#createContentElement(item.innerHTML);

                tab.index = index;
                content.index = index;

                tab.addEventListener("click", () => {
                    this._contentWrap.style.transform = `translateX(${-index * 100}%)`;
                    this.#state.curIndex = index;
                    this._tabCursor.style.left = `${tab.offsetWidth * (index + 1) - 28}px`;
                });

                this._tabWrap.appendChild(tab);
                this._contentWrap.appendChild(content);

                item.remove();
            }
        });

        this._temp.remove();



        setTimeout(() => {
            const width = this._tabWrap.children[0].offsetWidth;

            this._tabCursor.style.left = `${width * (this.#state.curIndex + 1) - 28}px`;
        }, 20);
    }

    connectedCallback() {
        this.#initTabHTMLStruct();
    }
}

window.customElements.define("gr-tabs", GrTabs);