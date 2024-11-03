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
                ul {
                    display: block;
                    list-style-type: none;
                    margin-block-start: 0em;
                    margin-block-end: 0em;
                    margin-inline-start: 0px;
                    margin-inline-end: 0px;
                    padding-inline-start: 0px;
                    unicode-bidi: isolate;
                    border-left: 1px solid #cccccc95;
                }

                .cursor {
                    display: block;

                    position: absolute;
                    left: 1.25rem;
                    top: 0;
                    transform: translateY(-50%);

                    width: 3px;
                    height: 1.25rem;

                    background-color: red;

                    transition: top 0.3s ease-in-out;
                }

                .gr-aside {
                    padding: 1.25rem 0;
                    padding-left: 1.25rem;
                }
            </style>
            <aside class="gr-aside">
                <span class="cursor"></span>
                <ul></ul>
            </aside>
        `;
    }

    // -------  -------
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

    #handleItemActive(items) {
        const hash = window.location.hash.substring(1);
        const cursor = this.shadowRoot.querySelector(".cursor");

        items.forEach(item => {
            this.#handleIsActive(item, hash, cursor);
        });
    }

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