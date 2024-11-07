export const stylesheet = `
<style>
    ::slotted(ul) {
        display: block;
        list-style-type: none;
        margin-block-start: 0em;
        margin-block-end: 0em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        padding-inline-start: 0px;
        unicode-bidi: isolate;
    }
    .main-container {
        overflow: hidden;
    }
    .gr-aside {
        user-select: none;
        display: block;
        position: fixed;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        padding: 1.25rem 0;
        padding-left: 1.25rem;
        z-index: 999;
        background-image: linear-gradient(to right, rgba(0, 0, 0, 0.4), transparent);
    }
    .gr-aside .cursor {
        display: block;
        position: absolute;
        left: 1.25rem;
        top: 0;
        transform: translate(-50%, -50%);
        width: 3px;
        height: 1.25rem;
        background-color: red;
        transition: top 0.3s ease-in-out;
    }
    .gr-aside ::slotted(*) {
        position: relative;
        border-left: 1px solid rgba(212, 212, 212, 0.7);

        height: 100%;
    }
    .gr-pages-container ::slotted(*){
        transform-origin: center top;
        transition: transform .5s;
    }
</style>
`;