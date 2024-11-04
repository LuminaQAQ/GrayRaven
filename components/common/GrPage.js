class GrPage extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.innerHTML = `
            <style>
                .sg-page {
                    position: relative;
                    height: 100vh;

                    overflow: hidden;
                }
            </style>
            <div class="sg-page">
                <slot></slot>
            </div >
        `;
    }

    connectedCallback() {
        this.style.display = "block";
    }
}

window.customElements.define("gr-page", GrPage);