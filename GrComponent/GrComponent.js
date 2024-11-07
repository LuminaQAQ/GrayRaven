import "./components/GrAsideItem/index.js";
import "./components/GrPage/index.js"
import { stylesheet } from "./style/index.js";

class GrComponent extends HTMLElement {
    #options = {
        routes: [],
        curPage: "",
        isDone: true,
    };

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: "open" });

        shadowRoot.innerHTML = `
            ${stylesheet}
            <div class="main-container">
                <div class="nav-bar-item">三</div>
                <aside class="gr-aside">
                    <div class="cursor"></div>
                    <slot name="aside"></slot>
                </aside>
                <main class="gr-pages-container">
                    <slot name="pages"></slot>
                </main>
            </div>
        `;
    }

    // ------- active -------
    // #region
    get active() {
        return this.getAttribute("active") || '';
    }

    set active(val) {
        this.setAttribute("active", val);

        const asideContainer = this.querySelector("[slot='aside']") || [];
        const pagesContainer = this.querySelector("[slot='pages']") || [];
        const cursor = this.shadowRoot.querySelector(".cursor");
        this.#handleItemActive(asideContainer.children, pagesContainer, cursor);
    }
    // #endregion
    // ------- end -------

    /**
     * 处理容器组件中的非指定组件
     * @param {HTMLElement} container 容器元素
     * @param {String} tagName 标签名
     * @param {Boolean} isRoute 是否整理路由表
     */
    #handleComponentChild(container, tagName, isRoute = false) {
        let itemIndexCur = 0;
        Array.from(container.childNodes).forEach(child => {
            if (child.tagName !== tagName) child.remove();
            else {
                child.index = itemIndexCur++;
                if (isRoute) this.#options.routes.push(child.path);
            }
        })
    }

    /**
     * 处理导航的激活状态
     * @param {Array <HTMLElement>} items Aside-items
     * @param {HTMLElement} pagesContainer 页面容器
     * @param {HTMLElement} cursor  游标元素
     */
    #handleItemActive(items, pagesContainer, cursor) {
        const hash = window.location.hash.substring(1);

        const itemIndex = Array.from(pagesContainer.children).findIndex(item => item.path === hash);
        pagesContainer.style.transform = `translateY(${-pagesContainer.children[itemIndex > -1 ? itemIndex : 0].offsetTop}px)`;

        Array.from(items).forEach(item => {
            this.#handleIsActive(item, hash, cursor);
        });
    }

    /**
     * 处理每个 `Aside-item` 的激活状态
     * @param {HTMLElement} item 导航元素
     * @param {String} hash 浏览器的 `hash` 值
     * @param {HTMLElement} cursor 跟随选中元素的滚动条
     */
    #handleIsActive(item, hash, cursor) {
        item.active = hash === item.path;
        if (hash === item.path) cursor.style.top = `${item.index * item.offsetHeight + item.offsetHeight * .75}px`;
    }

    /**
     * 初始化侧边栏点击事件
     */
    #initAsideItemClickEvent() {
        const asideContainer = this.querySelector("[slot='aside']") || [];
        const pagesContainer = this.querySelector("[slot='pages']") || [];
        const cursor = this.shadowRoot.querySelector(".cursor");

        this.#handleComponentChild(asideContainer, "GR-ASIDE-ITEM", true);
        this.#handleComponentChild(pagesContainer, "GR-PAGE");

        this.addEventListener("gr-aside-item-click", (e) => {
            e.stopPropagation();
            if (!this.#options.isDone) return;

            const hash = window.location.hash.substring(1);
            const { path } = e.detail;

            if (hash === path) return;

            window.location.hash = path;
            this.#options.isDone = false;

            const itemIndex = Array.from(pagesContainer.children).findIndex(item => item.path === path);
            pagesContainer.style.transform = `translateY(${-pagesContainer.children[itemIndex].offsetTop}px)`;


            Array.from(asideContainer.children).forEach((child, i) => {
                this.active = path;
            })
        })

        cursor.addEventListener("transitionend", () => {
            this.#options.isDone = true;
        })

        window.addEventListener("hashchange", () => {
            this.active = window.location.hash.substring(1);
        })
    }

    /**
     * 初始化页面触摸事件
     */
    #initTouchEvent() {
        window.addEventListener("touchstart", (startE) => {
            if (this.#options.routes.length < 1) return;
            if (!this.#options.isDone) return;

            const hash = window.location.hash.substring(1);
            const controller = new AbortController();
            const startPoint = startE.touches[0].pageY;
            let endPoint = startPoint;

            window.addEventListener("touchmove", (moveE) => {
                endPoint = moveE.touches[0].pageY;
            }, { signal: controller.signal })

            window.addEventListener("touchend", (endE) => {
                const index = this.#options.routes.findIndex(item => item === hash);

                if (startPoint - endPoint > 10) {
                    if (index < this.#options.routes.length - 1) window.location.hash = this.#options.routes[index + 1], this.#options.isDone = false;
                } else if (startPoint - endPoint < -10) {
                    if (index > 0) window.location.hash = this.#options.routes[index - 1], this.#options.isDone = false;;
                }

                controller.abort();
            }, { signal: controller.signal })
        });
    }

    /**
     * 初始化页面滚轮事件
     */
    #initWheelEvent() {
        window.addEventListener("wheel", (e) => {
            if (this.#options.routes.length < 1) return;
            if (!this.#options.isDone) return;

            const hash = window.location.hash.substring(1);
            const index = this.#options.routes.findIndex(item => item === hash);

            if (e.deltaY > 0) {
                if (index < this.#options.routes.length - 1) window.location.hash = this.#options.routes[index + 1], this.#options.isDone = false;
            } else if (e.deltaY < 0) {
                if (index > 0) window.location.hash = this.#options.routes[index - 1], this.#options.isDone = false;
            }
        })
    }

    #initDeafaultHash() {
        const hash = window.location.hash.substring(1);
        if (this.#options.routes.length < 1) return;

        if (!hash || !this.#options.routes.includes(hash)) window.location.hash = this.#options.routes[0];
    }

    connectedCallback() {
        this.#initAsideItemClickEvent();
        this.#initTouchEvent();
        this.#initDeafaultHash();
        this.#initWheelEvent();

        this.active = this.active;
    }
}

window.customElements.define("gr-component", GrComponent);