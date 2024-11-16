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

    // ------- list -------
    // #region
    get list() {
        return this.#state.list || [];
    }

    set list(val) {
        if (!Array.isArray(val)) throw new Error("[gr-tab] list属性的值必须为数组！");

        this.#state.list = val;
        console.log(val);

        val.forEach(item => {

        })
    }
    // #endregion
    // ------- end -------

    connectedCallback() {

    }
}

window.customElements.define("gr-tab", GrTab);