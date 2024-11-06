import "./GrAsideItem.js";

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
    };

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: "open" });

        shadowRoot.innerHTML = `
            <style>
                aside {
                    position: fixed;
                    left: 0;
                    top: 50vh;

                    transform: translateY(-50%);

                    background-image: linear-gradient(to right, black, transparent);
                }

                ul {
                    display: block;
                    list-style-type: none;
                    margin-block-start: 0em;
                    margin-block-end: 0em;
                    margin-inline-start: 0px;
                    margin-inline-end: 0px;
                    padding-inline-start: 0px;
                    unicode-bidi: isolate;
                }
            </style>
            <div class="main-container">
                <aside>
                    <slot name="aside"></slot>
                </aside>
                <main>

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
        Array.from(asideContainer).forEach(child => child.active = child.path === val);
    }
    // #endregion
    // ------- end -------

    /**
     * 初始化侧边栏点击事件
     */
    #initAsideItemClickEvent() {
        const asideContainer = this.querySelector("[slot='aside']") || [];
        let itemIndexCur = 0;
        Array.from(asideContainer.childNodes).forEach(child => {
            if (child.tagName !== "GR-ASIDE-ITEM") child.remove();
            else child.index = itemIndexCur++;
        })

        this.active = this.active;

        this.addEventListener("gr-aside-item-click", (e) => {
            e.stopPropagation();
            const { index } = e.detail;

            Array.from(asideContainer.childNodes).forEach(child => {
                child.active = child.index === index;
            })
        })
    }

    connectedCallback() {
        this.#initAsideItemClickEvent();
    }
}

window.customElements.define("gr-component", GrComponent);