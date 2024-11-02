const pageElements = {
    mainContainer: document.querySelector('#mainContainer'),
    routes: ["Home", "News", "CloudDatabase", "ThemeVideo", "GameWallpaper", "Comics", "GameFeature"]
}

const asideObj = {
    listItems: document.querySelectorAll('.gr-aside .ls-item'),
    curIndex: 0,
    isDone: true,

    changeActiveStatus() {
        this.listItems.forEach(item => {
            item.classList.toggle('active', item.dataset.index == this.curIndex);
        })
    },

    handlePageChange(mainContainer) {
        const pageId = this.listItems[this.curIndex].dataset.page;
        const page = document.getElementById(pageId);
        const offsetTop = -page.offsetTop;
        mainContainer.style.transform = `translateY(${offsetTop}px)`;
        this.changeActiveStatus();

        mainContainer.addEventListener('transitionend', () => {
            window.location.hash = `#${pageId}`;
        })
    },

    initItemsClick() {
        this.listItems.forEach((item, index) => {
            item.dataset.index = index;

            item.addEventListener('click', () => {
                if (this.curIndex == item.dataset.index || !this.isDone) return;

                this.curIndex = item.dataset.index;
                this.handlePageChange(pageElements.mainContainer);
            })
        })
    },

    initPageWheel() {
        pageElements.mainContainer.addEventListener('wheel', (e) => {
            e.deltaY > 0 ? this.curIndex++ : this.curIndex--;
            this.handlePageChange(pageElements.mainContainer);
        })
    },

    initHashPage() {
        const hash = window.location.hash.substring(1);
        const el = document.querySelector(`[data-page='${hash && pageElements.routes.includes(hash) ? hash : "Home"}']`);
        this.curIndex = this.listItems[el.dataset.index];

        el.click();
    },

    init() {
        this.initItemsClick();
        this.initPageWheel();
        this.initHashPage();
    },
}
asideObj.init();

// window.addEventListener('hashchange', () => {
//     const hash = window.location.hash.substring(1);
//     const el = document.getElementById(hash + 'Link');

//     el.classList.add('active');
// })