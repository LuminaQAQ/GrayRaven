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
                .gr-aside {
                    display: block;
                    position: fixed;
                    top: 50%;
                    left: 0;
                    transform: translateY(-50%);
                    padding: 1.25rem 0;
                    padding-left: 1.25rem;
                    z-index: 999;
                    background-image: linear-gradient(to right, rgba(0, 0, 0, 0.4), transparent);
                }
                .gr-aside ul {
                    display: block;
                    list-style-type: none;
                    margin-block-start: 0em;
                    margin-block-end: 0em;
                    margin-inline-start: 0px;
                    margin-inline-end: 0px;
                    padding-inline-start: 0px;
                    unicode-bidi: isolate;
                }
                .gr-aside .cursor {
                    display: block;
                    position: absolute;
                    left: 1.25rem;
                    top: 0;
                    transform: translate(-50%, -50%);
                    width: 3px;
                    height: 1.25rem;
                    background-color: red;
                    transition: top 0.3s ease-in-out;
                }
                .gr-aside ul {
                    border-left: 1px solid rgba(212, 212, 212, 0.7);
                }
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

        this.#initDeafaultHash();
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

    #initTouchEvent() {
        window.addEventListener("touchstart", (startE) => {
            if (!this.#dataObj.routes) return;

            const hash = window.location.hash.substring(1);
            const controller = new AbortController();
            const startPoint = startE.touches[0].pageY;
            let endPoint = startPoint;

            window.addEventListener("touchmove", (moveE) => {
                endPoint = moveE.touches[0].pageY;
            }, { signal: controller.signal })

            window.addEventListener("touchend", (endE) => {
                const index = this.#dataObj.routes.findIndex(item => item.hash === hash);

                if (startPoint - endPoint > 10) {
                    if (index < this.#dataObj.routes.length - 1) window.location.hash = this.#dataObj.routes[index + 1].hash;
                } else if (startPoint - endPoint < -10) {
                    if (index > 0) window.location.hash = this.#dataObj.routes[index - 1].hash;
                }

                controller.abort();
            }, { signal: controller.signal })
        });
    }

    #initDeafaultHash() {
        const hash = window.location.hash.substring(1);
        if (this.#dataObj.routes.length < 1) return;

        console.log(this.#dataObj.routes);


        if (!hash || !this.#dataObj.routes.findIndex(item => item.hash === hash) === -1) window.location.hash = this.#dataObj.routes[0]?.hash;
    }

    connectedCallback() {
        this.#initTouchEvent();

        setTimeout(() => {
            this.dispatchEvent(new CustomEvent('gr-aside-load'));
        }, 0)
    }
}

window.customElements.define("gr-aside", GrAside);