import "./GrAsideItem.js"

class GrAside extends HTMLElement {
    #dataObj = {
        routes: [],
    }

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.innerHTML = `
            <style>
                @import "../../css/index.css";
            </style>
            <aside class="gr-aside">
                <span class="cursor"></span>
                <ul></ul>
            </aside>
        `;
    }

    // ------- routes 路由导航列表 -------
    // #region
    get routes() {
        return this.#dataObj.routes;
    }

    set routes(routes) {
        this.#dataObj.routes = routes;
        this.#renderNavList();
    }
    // #endregion
    // ------- end -------

    /**
     * 渲染导航列表
     */
    #renderNavList() {
        const hash = window.location.hash.substring(1);
        const container = this.shadowRoot.querySelector(".gr-aside ul");
        const cursor = this.shadowRoot.querySelector(".cursor");

        this.#dataObj.routes.forEach((item, index) => {
            const li = document.createElement("gr-aside-item");
            li.index = index;

            li.addEventListener("item-load", () => {
                li.title = item.title;
                li.desc = item.desc;
                li.hash = item.hash;

                this.#handleIsActive(li, hash, cursor);
            });

            container.appendChild(li);
        })

        const items = container.querySelectorAll("gr-aside-item");
        window.addEventListener("hashchange", () => {
            this.#handleItemActive(items);
        })

    }
    /**
     * 处理导航的激活状态
     * @param {Array <HTMLElement>} items 
     */
    #handleItemActive(items) {
        const hash = window.location.hash.substring(1);
        const cursor = this.shadowRoot.querySelector(".cursor");

        items.forEach(item => {
            this.#handleIsActive(item, hash, cursor);
        });
    }

    /**
     * 处理当前激活状态
     * @param {HTMLElement} item 导航元素
     * @param {String} hash 浏览器的 `hash` 值
     * @param {HTMLElement} cursor 跟随选中元素的滚动条
     */
    #handleIsActive(item, hash, cursor) {
        if (hash === item.hash) {
            item.active = true;
            cursor.style.top = `${item.offsetTop + item.getBoundingClientRect().height / 2}px`;
        } else {
            item.active = false;
        }
    }

    connectedCallback() {
        setTimeout(() => {
            this.dispatchEvent(new CustomEvent('gr-aside-load'));
        }, 0)
    }
}

window.customElements.define("gr-aside", GrAside);