import { stylesheet } from "./styles/index.js";

class GrAsideItem extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.innerHTML = `
      ${stylesheet}
      <li class="ls-item">
          <div class="title"></div>
          <span class="desc"></span>
      </li>
    `;

    this._container = shadowRoot.querySelector(".ls-item");
    this._titleEl = shadowRoot.querySelector(".title");
    this._descEl = shadowRoot.querySelector(".desc");
  }

  // ------- active -------
  // #region
  get active() {
    return this.hasAttribute("active");
  }

  set active(val) {
    if (val) this.setAttribute("active", '');
    else this.removeAttribute("active");

    this._container.classList.toggle("active", val);
  }
  // #endregion
  // ------- end -------

  // ------- path -------
  // #region
  get path() {
    return this.getAttribute("path");
  }

  set path(val) {
    this.setAttribute("path", val);
  }
  // #endregion
  // ------- end -------

  // ------- title -------
  // #region
  get title() {
    return this.getAttribute("title");
  }

  set title(val) {
    this._titleEl.innerHTML = val;
  }
  // #endregion
  // ------- end -------

  // ------- desc -------
  // #region
  get desc() {
    return this.getAttribute("desc");
  }

  set desc(val) {
    this._descEl.innerHTML = val;
  }
  // #endregion
  // ------- end -------

  connectedCallback() {
    this.active = this.active;
    this.title = this.title;
    this.desc = this.desc;

    this.addEventListener('click', (e) => {
      this.dispatchEvent(new CustomEvent("gr-aside-item-click", {
        bubbles: true,
        detail: {
          path: this.path,
        }
      }));
    })


    setTimeout(() => {
      this.dispatchEvent(new CustomEvent("gr-aside-item-loaded", {
        bubbles: true,
        composed: true,
        detail: {
          path: this.path,
        }
      }));
    }, 20);
  }
}

window.customElements.define("gr-aside-item", GrAsideItem);