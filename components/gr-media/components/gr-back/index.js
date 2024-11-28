
const leftBackSVG = `
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M100 65, L10 65, L10 35, L45 35, L43.5 33.5, L43.5 35" stroke="white" stroke-width="2px"
        fill="transparent" />
    <text font-weight="600" x="15" y="55" fill="white"> 返回 </text>
    <text font-weight="600" font-size=".8rem" x="47.5" y="55" fill="white"> BACK </text>
</svg>
`;

const rightBackSVG = `
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 65, L90 65, L90 35, L55 35, L56.5 33.5, L56.5 35" stroke="white" stroke-width="2px"
        fill="transparent" />
    <text font-weight="600" font-size=".8rem" x="20" y="55" fill="white"> BACK </text>
    <text font-weight="600" x="52.5" y="55" fill="white"> 返回 </text>
</svg>
`;

class GrBack extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: "open" });

        const direction = this.getAttribute("direction") || 'left';
        shadowRoot.innerHTML = `
            <style>
                :host {
                    user-select: none;
                    cursor: pointer;
                }
            </style>
            ${direction === "left" ? leftBackSVG : rightBackSVG}
        `;
    }
}

window.customElements.define("gr-back", GrBack);