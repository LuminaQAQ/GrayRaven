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
        .ls-item .title {
          font-size: var(--fs-title);
          transition: font-size 0.3s;
        }
        .ls-item .desc {
          display: block;
          font-size: var(--fs-desc);
          filter: opacity(0);
          transition: filter 0.3s;
        }
        .ls-item .desc::before, .ls-item .desc::after {
          content: "";
          display: inline-block;
          width: 0.95rem;
          height: 1px;
          transform: translateY(-2px);
          scale: 0;
          background-color: red;
          transition: scale 0.8s;
        }
        .ls-item .desc::before {
          transform-origin: left center;
          margin-right: 5px;
        }
        .ls-item .desc::after {
          transform-origin: right center;
          margin-left: 5px;
        }
        .ls-item.active .title {
          font-size: var(--fs-title-active);
        }
        .ls-item.active .desc {
          filter: opacity(1);
        }
        .ls-item.active .desc::after, .ls-item.active .desc::before {
          scale: 1;
        }
      </style>
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
          index: this.index,
        }
      }));
    })
  }
}

window.customElements.define("gr-aside-item", GrAsideItem);