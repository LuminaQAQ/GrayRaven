/**
 * @typedef {Object} options 函数 `$GrPictureInfinateScrollRenderer` 的形参
 * @property {HTMLElement} root 根容器
 * @property {Array.<String>} urls 图片链接
 */
const options = {
    root: HTMLElement,
    urls: Array
}

/**
 * 处理一组图片的url
 * @returns {Array} 链接
 */
const handleUrls = () => {
    const myUrls = [];
    const end = state.index + 5;
    for (let i = state.index; i < end; i++, state.index++) {
        if (!state.urls[i]) break;

        myUrls.push(state.urls[i]);
    }

    if (!myUrls.length) throw new Error();

    return myUrls;
}

/**
 * 创建 `gr-picure` 元素，并推荐
 * @param {HTMLElement} root 根容器 
 */
const createItem = (root) => {
    const urls = handleUrls();

    const item = document.createElement("gr-picture");
    item.addEventListener("gr-picture-load", () => {
        item.pictures = urls;
    });
    root.appendChild(item);

    state.prevNode = root.children[root.children.length - 1];
}

/**
 * 当达到容器底部时，加载下一组元素
 * @param {IntersectionObserver} observer 
 * @param {HTMLElement} root 根容器 
 */
const loadItem = (observer, root) => {
    observer.unobserve(state.prevNode);

    try {
        createItem(root);
        observer.observe(state.prevNode);
    } catch (error) {
        observer.disconnect();
        document.dispatchEvent(new CustomEvent("gr-picture-render-finished"));
    }
}

/**
 * @typedef {Object} state
 * @property {Number} index
 * @property {HTMLElement} prevNode
 * @property {Array} urls
 */
const state = {
    index: 0,
    prevNode: document.body,
    urls: [],
};

/**
 * 无限加载
 * @param {options} options 
 */
window.$GrPictureInfinateScrollRenderer = (
    options = {
        root: document.body,
        urls: []
    }
) => {
    const { root, urls } = options;

    state.urls = urls;
    createItem(root);

    state.prevNode = root.children[root.children.length - 1] || document.body;

    const observer = new IntersectionObserver((entries) => {
        if (entries[0].intersectionRatio <= 0) return;

        loadItem(observer, root);
    }, { root: document.body, threshold: .9 });

    observer.observe(state.prevNode);
}