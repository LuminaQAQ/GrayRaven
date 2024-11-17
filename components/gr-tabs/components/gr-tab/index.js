class GrTab extends HTMLElement {
    #state = {
        list: []
    }
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: "open" });
    }

    // ------- title -------
    // #region
    get title() {
        return this.getAttribute("title");
    }

    set title(val) {
        this.setAttribute("title", val);
    }
    // #endregion
    // ------- end -------

    connectedCallback() {

    }
}

window.customElements.define("gr-tab", GrTab);