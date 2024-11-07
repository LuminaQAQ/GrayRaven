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
  position: relative;
}
.main-container .gr-aside {
  user-select: none;
  display: block;
  position: fixed;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  z-index: 999;
}
.main-container .gr-aside .navigation-switch {
  position: absolute;
  top: 0;
  left: 0.5rem;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateY(-100%);
  transition: transform 0.3s;
  z-index: 1;
}
.main-container .gr-aside .cursor {
  display: block;
  position: absolute;
  left: 1.25rem;
  top: 0;
  transform: translate(-50%, -50%);
  width: 3px;
  height: 1.25rem;
  background-color: red;
  z-index: 1000;
  transition: top 0.3s, left 0.3s;
}
.main-container .gr-aside .aside-list {
  position: absolute;
  background-image: linear-gradient(to right, rgba(0, 0, 0, 0.4), transparent);
  transition: transform 0.3s;
}
.main-container .gr-aside ::slotted(*) {
  position: relative;
  padding-left: 1.25rem;
}
.main-container .gr-aside.is-hidden .cursor {
  left: -100%;
  transform: translate(-150%, -50%);
}
.main-container .gr-aside.is-hidden .navigation-switch {
  transform: translateY(-100%) rotate(90deg);
}
.main-container .gr-aside.is-hidden .aside-list {
  transform: translateX(-150%);
}
.main-container .gr-pages-container ::slotted(*) {
  transform-origin: center top;
  transition: transform 0.5s;
}
</style>
`;