import "./GrAsideItem.js";
import "./GrPage.js"

class GrComponent extends HTMLElement {
    #options = {
        routes: [
            {
                path: "Home",
                title: "首页",
                desc: "HOME",
            },
            {
                path: "News",
                title: "新闻",
                desc: "NEWS",
            },
        ],
        curPage: "",
        isDone: true,
    };

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: "open" });

        shadowRoot.innerHTML = `
            <style>
                ::slotted(ul) {
                    display: block;
                    list-style-type: none;
                    margin-block-start: 0em;
                    margin-block-end: 0em;
                    margin-inline-start: 0px;
                    margin-inline-end: 0px;
                    padding-inline-start: 0px;
                    unicode-bidi: isolate;
                }
                .main-container {
                    overflow: hidden;
                }
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
                .gr-aside .cursor {
                    display: block;
                    position: absolute;
                    left: 1.25rem;
                    top: 0;
                    transform: translate(-50%, -50%);
                    width: 3px;
                    height: 1.25rem;
                    background-color: red;
                    transition: top 0.5s ease-in-out;
                }
                .gr-aside ::slotted(*) {
                    position: relative;
                    border-left: 1px solid rgba(212, 212, 212, 0.7);

                    height: 100%;
                }
                .gr-pages-container ::slotted(*){
                    transform-origin: center top;
                    transition: transform .5s;
                }
            </style>
            <div class="main-container">
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

        Array.from(asideContainer.children).forEach(child => child.path === val ? (child.click(), this.#options.curPage = child.path) : null);
    }
    // #endregion
    // ------- end -------

    /**
     * 处理容器组件中的非指定组件
     * @param {HTMLElement} container 容器元素
     * @param {String} tagName 标签名
     */
    #handleComponentChild(container, tagName) {
        let itemIndexCur = 0;
        Array.from(container.childNodes).forEach(child => {
            if (child.tagName !== tagName) child.remove();
            else child.index = itemIndexCur++;
        })
    }

    /**
     * 初始化侧边栏点击事件
     */
    #initAsideItemClickEvent() {
        const asideContainer = this.querySelector("[slot='aside']") || [];
        const pagesContainer = this.querySelector("[slot='pages']") || [];
        const cursor = this.shadowRoot.querySelector(".cursor");

        this.#handleComponentChild(asideContainer, "GR-ASIDE-ITEM");
        this.#handleComponentChild(pagesContainer, "GR-PAGE");

        this.addEventListener("gr-aside-item-click", (e) => {
            e.stopPropagation();
            if (!this.#options.isDone) return;

            this.#options.isDone = false;

            const { index } = e.detail;

            Array.from(asideContainer.children).forEach((child, i) => {
                child.active = child.index === index;

                if (child.index === index) {
                    const { offsetHeight } = child;
                    cursor.style.top = index * offsetHeight + offsetHeight * .75 + "px";
                    this.#options.curPage = child.path;
                }

                if (child.index === index && pagesContainer.children[i].path === child.path) {
                    pagesContainer.style.transform = `translateY(${-pagesContainer.children[i].offsetTop}px)`;
                }
            })
        })

        cursor.addEventListener("transitionend", () => {
            window.location.hash = this.#options.curPage;
            this.#options.isDone = true;
            console.log(this.#options.isDone);

        })
    }

    connectedCallback() {
        this.#initAsideItemClickEvent();
        this.active = this.active;
    }
}

window.customElements.define("gr-component", GrComponent);