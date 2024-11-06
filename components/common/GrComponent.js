import "./GrAside.js"
import "./GrContainer.js"

class GrComponent extends HTMLElement {
    #options = {
        routes: [],
    }
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });

        shadowRoot.innerHTML = `
            <style>
                .main-container {
                    position: relative;
                    height: 100vh;

                    transition: transform .5s;
                }
            </style>
            <div class="main-container">
                <gr-aside></gr-aside>
                <main>
                </main>
            </div>
        `;

        this._asideContainer = shadowRoot.querySelector("gr-aside");
    }

    // ------- routes -------
    // #region
    get routes() {
        return this.#options.routes;
    }

    set routes(val) {
        this.#options.routes = val;
        this._asideContainer.routes = val;
    }
    // #endregion
    // ------- end -------

    // -------  -------
    // #region
    
    // #endregion
    // ------- end -------

    connectedCallback() {
        setTimeout(() => {
            this.dispatchEvent(new CustomEvent("gr-component-load"));
        }, 0);
    }
}

window.customElements.define('gr-component', GrComponent);