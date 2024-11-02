// const pageElements = {
//     mainContainer: document.querySelector('#mainContainer'),
//     routes: ["Home", "News", "CloudDatabase", "ThemeVideo", "GameWallpaper", "Comics", "GameFeature"]
// }

// const asideObj = {
//     listItems: document.querySelectorAll('.gr-aside .ls-item'),
//     curIndex: 0,
//     isDone: true,
//     isInit: false,

//     changeActiveStatus() {
//         this.listItems.forEach(item => {
//             item.classList.toggle('active', item.dataset.index == this.curIndex);
//         })
//     },

//     handlePageChange(mainContainer) {
//         if (this.isInit && !this.isDone) return;

//         const pageId = this.listItems[this.curIndex].dataset.page;
//         const page = document.getElementById(pageId);
//         const offsetTop = -page.offsetTop || 0;
//         mainContainer.style.transform = `translateY(${offsetTop}px)`;
//         this.changeActiveStatus();

//         if (this.isInit) this.isDone = false;

//         const controller = new AbortController();
//         mainContainer.addEventListener('transitionend', () => {
//             window.location.hash = `#${pageId}`;
//             this.isDone = true;
//             this.curIndex = this.listItems[this.curIndex].dataset.index;
//             controller.abort();
//         }, { signal: controller.signal });
//     },

//     initItemsClick() {
//         this.listItems.forEach((item, index) => {
//             item.dataset.index = index;

//             item.addEventListener('click', () => {
//                 if (this.curIndex === item.dataset.index) return;

//                 this.handlePageChange(pageElements.mainContainer);
//             })
//         })
//     },

//     initPageWheel() {
//         pageElements.mainContainer.addEventListener('wheel', (e) => {
//             if (this.isInit && !this.isDone) return;
//             let index = this.curIndex;
//             const maxLen = this.listItems.length - 1;
//             if (e.deltaY > 0) ++index > maxLen ? this.curIndex = maxLen : this.curIndex++;
//             else --index < 0 ? this.curIndex = 0 : this.curIndex--;

//             this.handlePageChange(pageElements.mainContainer);
//         })
//     },

//     handleHashChange(routes) {
//         const hash = window.location.hash.substring(1) || "Home";

//         const el = document.querySelector(`[data-page='${hash && routes.includes(hash) ? hash : "Home"}']`);
//         this.curIndex = this.listItems[el.dataset.index];

//         el.click();
//     },

//     initHashPage() {
//         const { routes } = pageElements;
//         this.handleHashChange(routes);

//         // window.addEventListener("hashchange", () => {
//         //     this.handlePageChange(pageElements.mainContainer);
//         // })
//     },

//     init() {
//         this.initItemsClick();
//         this.initHashPage();
//         this.initPageWheel();

//         this.isInit = true;
//     },
// }
// asideObj.init();



window.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector("#mainContainer");
    const listItems = document.querySelectorAll(".ls-item");
    const routes = ["Home", "News", "CloudDatabase", "ThemeVideo", "GameWallpaper", "Comics", "GameFeature"];
    let currentIndex = 0;
    let isDone = true;

    listItems.forEach((item, index) => {
        item.dataset.index = index;

        item.addEventListener("click", e => {
            const hash = item.dataset.page;
            currentIndex = index;
            window.location.hash = hash;
        })
    })

    container?.addEventListener("wheel", e => {
        if (!isDone) return;

        let index = currentIndex;
        const maxLen = listItems.length - 1;
        
        if (e.deltaY > 0) {
            if (++index > maxLen) {
                currentIndex = maxLen
            } else {
                currentIndex++;
                isDone = false;
            }
        } else {
            if (--index < 0) {
                currentIndex = 0;
            } else {
                currentIndex--;
                isDone = false;
            }
        }

        window.location.hash = routes[currentIndex];

        container.addEventListener("transitionend", updateStatus);
    })

    const updateStatus = () => {
        isDone = true;
        container.removeEventListener("transitionend", updateStatus);
    }

    window.addEventListener("hashchange", () => {
        const hash = window.location.hash.substring(1);
        const page = document.querySelector(`[data-hash="${hash}"`);

        container.style.transform = `translateY(${-page.offsetTop}px)`;
    })

    const hash = window.location.hash.substring(1);

    if (hash !== "Home") {
        const page = document.querySelector(`[data-hash="${hash}"`);
        container.style.transform = `translateY(${-page.offsetTop}px)`;
        currentIndex = routes.findIndex(item => item === hash);
    }

    window.location.hash = hash;
});