// @import "/GrComponent/style/index.css";

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
  position: relative;
  user-select: none;
  display: block;
  position: fixed;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  z-index: 999;
}
.main-container .gr-aside .navigation-switch {
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0.5rem;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateY(-200%);
  transition: transform 0.3s;
  z-index: 1;
  background-image: linear-gradient(to bottom, rgb(193, 193, 193) 50%, transparent 50%);
  background-size: 8px 8px;
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
  transform: translateY(-50%);
  background-image: linear-gradient(to right, rgba(0, 0, 0, 0.4), transparent);
  transition: transform 0.3s;
}
.main-container .gr-aside ::slotted(*) {
  display: block;
  position: relative;
  padding: 1rem 0;
  padding-left: 1.25rem;
}
.main-container .gr-aside.is-hidden .cursor {
  left: -100%;
  transform: translate(-150%, -50%);
}
.main-container .gr-aside.is-hidden .navigation-switch {
  transform: translateY(-200%) rotate(90deg);
}
.main-container .gr-aside.is-hidden .aside-list {
  transform: translate(-150%, -50%);
}
.main-container .gr-pages-container {
  position: relative;
}
.main-container .gr-pages-container slot {
  position: relative;
}
.main-container .gr-pages-container ::slotted(*) {
  display: block;
  transform: translateY(0);
  transform-origin: center top;
  transition: transform 0.5s;
}
</style>
`;