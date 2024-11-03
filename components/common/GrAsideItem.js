class GrAsideItem extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: "open" });

        shadowRoot.innerHTML = `
            <style>
                .ls-item {
                    padding: 1.25rem;
                    width: 100%;
                    color: #fff;
                    text-decoration: none;
                    cursor: pointer;
                }
                .ls-item.active {
                    background-color: #f0f0f0;
                    color: #333;
                }
            </style>
            <li class="ls-item">
                <div class="title"></div>
                <span class="desc"></span>
            </li>
        `;
    }

    // ------- active 选中状态-------
    // #region
    get active() {
        return this.hasAttribute('active');
    }

    set active(val) {
        val = val === true ? true : false;

        if (val) {
            this.setAttribute('active', '');
        } else {
            this.removeAttribute('active');
        }

        this.shadowRoot.querySelector(".ls-item").classList.toggle("active", val);
    }
    // #endregion
    // ------- end -------

    // ------- title 标题 -------
    // #region
    get title() {
        return this.getAttribute("title") || "";
    }

    set title(val) {
        this.shadowRoot.querySelector(".title").innerHTML = val;
    }
    // #endregion
    // ------- end -------

    // ------- desc 标题带的描述 -------
    // #region
    get desc() {
        return this.getAttribute("desc") || "";
    }

    set desc(val) {
        this.shadowRoot.querySelector(".desc").innerHTML = val;
    }
    // #endregion
    // ------- end -------

    // ------- hash 路由 -------
    // #region
    get hash() {
        return this.getAttribute("hash") || "";
    }

    set hash(val) {
        this.setAttribute("hash", val);
    }
    // #endregion
    // ------- end -------

    #initItemClick() {
        this.addEventListener("click", e => {
            window.location.hash = this.hash;

            this.dispatchEvent(new CustomEvent("sg-aside-item-click", {
                detail: {
                    hash: this.hash
                }
            }));
        });
    }

    connectedCallback() {
        this.active = this.active;
        this.title = this.title;
        this.desc = this.desc;

        this.#initItemClick();

        setTimeout(() => {
            this.dispatchEvent(new CustomEvent('item-load'))
        }, 0)
    }
}

window.customElements.define('gr-aside-item', GrAsideItem);