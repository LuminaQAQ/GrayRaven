class GrTabItem extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: "open" });

        shadowRoot.innerHTML = `
            <section class="tab-item-container" part="container">
                <slot></slot>
            </section>
        `;
    }
}

window.customElements.define("gr-tab-item", GrTabItem);