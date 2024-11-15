import "./components/gr-tab/index.js"
import "./components/gr-tab-item/index.js"

class GrTabs extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: "open" });

        shadowRoot.innerHTML = `
            <section class="tabs-container" part="container">
                <header class="tab-wrap" part="tab-wrap"></header>
                <main class="data-wrap" part="data-wrap">
                    <slot></slot>
                </main>
            </section>
        `;
    }
}

window.customElements.define("gr-tabs", GrTabs);