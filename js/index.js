// const routes = ["Home", "News", "CloudDatabase", "ThemeVideo", "GameWallpaper", "Comics", "GameFeature"];

// const elevatorNavigation = {
//     container: document.querySelector(".main-container"),
//     listItems: document.querySelectorAll(".ls-item"),
//     currentIndex: 0,
//     isDone: true,

//     updateActiveStatus() {
//         elevatorNavigation.listItems.forEach((item, index) => {
//             item.classList.toggle("active", index === elevatorNavigation.currentIndex);
//         });
//     },
//     updateStatus() {
//         elevatorNavigation.isDone = true;
//         elevatorNavigation.container.removeEventListener("transitionend", elevatorNavigation.updateStatus);
//     },

//     initNavigationClickEvent() {
//         this.listItems.forEach((item, index) => {
//             item.dataset.index = index;

//             item.addEventListener("click", e => {
//                 const hash = item.dataset.page;
//                 this.currentIndex = index;
//                 window.location.hash = hash;
//             })
//         })
//     },
//     initContainerWheelEvent() {
//         this.container.addEventListener("wheel", e => {
//             if (!this.isDone) return;

//             let index = this.currentIndex;
//             const maxLen = this.listItems.length - 1;

//             if (e.deltaY > 0) {
//                 if (++index > maxLen) {
//                     this.currentIndex = maxLen
//                 } else {
//                     this.currentIndex++;
//                     this.isDone = false;
//                 }
//             } else {
//                 if (--index < 0) {
//                     this.currentIndex = 0;
//                 } else {
//                     this.currentIndex--;
//                     this.isDone = false;
//                 }
//             }

//             window.location.hash = routes[this.currentIndex];

//             this.container.addEventListener("transitionend", this.updateStatus);
//         })
//     },
//     initHashChange() {
//         window.addEventListener("hashchange", () => {
//             const hash = window.location.hash.substring(1);
//             const page = document.querySelector(`[data-hash="${hash}"`);

//             this.container.style.transform = `translateY(${-page.offsetTop}px)`;

//             // this.updateActiveStatus();
//         })
//     },
//     initHashPage() {
//         let hash = window.location.hash.substring(1);

//         if (hash && hash !== "Home") {
//             const page = document.querySelector(`[data-hash="${hash}"`);
//             this.container.style.transform = `translateY(${-page.offsetTop}px)`;
//             this.currentIndex = routes.findIndex(item => item === hash);
//         } else {
//             hash = "Home";
//         }

//         this.updateActiveStatus();
//         window.location.hash = hash;
//     },

//     init() {
//         this.initNavigationClickEvent();
//         this.initContainerWheelEvent();
//         this.initHashChange();
//         this.initHashPage();
//     }
// }

// window.addEventListener("load", () => {
//     elevatorNavigation.init();
// });

// const container = document.querySelector(".main-container");
// const hash = window.location.hash.substring(1);
// const page = document.querySelector(`[data-hash="${hash ? hash : "Home"}"]`);

// if (page) {
//     container.style.transform = `translateY(${-page.offsetTop}px)`;
// }
// window.addEventListener("hashchange", () => {
//     const hash = window.location.hash.substring(1);
//     const page = document.querySelector(`[data-hash="${hash ? hash : "Home"}"]`);

//     if (page) {
//         container.style.transform = `translateY(${-page.offsetTop}px)`;
//     }
// })