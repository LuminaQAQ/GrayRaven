class GrTab extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: "open" });

        shadowRoot.innerHTML = `
            <section class="tab-container" part="container">
                <slot></slot>
            </section>
        `;
    }
}

window.customElements.define("gr-tab", GrTab);