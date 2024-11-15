export const stylesheet = `
.main-container {
  overflow: hidden;
  width: 100%;
}
.main-container .statistics-wrap {
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  color: #eeeeee;
  font-size: 1rem;
}
.main-container .statistics-wrap .current-index {
  display: inline-block;
  line-height: 1;
  width: 1.25rem;
  color: red;
}
.main-container .statistics-wrap .total-index {
  line-height: 1;
}
.main-container .carousel-wrap {
  list-style-type: none;
  margin-block-start: 0em;
  margin-block-end: 0em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 0px;
  unicode-bidi: isolate;
  display: flex;
  margin: 0.25rem 0;
  transition: transform 0.3s;
}
.main-container .carousel-wrap ::slotted(gr-carousel-item) {
  flex: 1 0 100%;
  width: 100%;
  height: 10rem;
  overflow: hidden;
  background-color: #99a9bf;
}
.main-container .footer-wrap .indicator-wrap {
  position: relative;
  display: flex;
  justify-content: flex-end;
}
.main-container .footer-wrap .indicator-wrap::before {
  content: "";
  display: block;
  position: relative;
  width: 100%;
  height: 1px;
  margin: auto 1rem;
  margin-left: 0.2rem;
  background-color: #ccc;
}
.main-container .footer-wrap .indicator-wrap .carousel-indicator-item {
  position: relative;
  display: block;
  width: 0.25rem;
  height: 0.25rem;
  margin: 0.35rem;
  background-color: white;
  border: 1px solid transparent;
  transition: background-color 0.3s;
}
.main-container .footer-wrap .indicator-wrap .carousel-indicator-item::before {
  content: "";
  display: block;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 0.6rem;
  height: 0.6rem;
  background-color: transparent;
  border: 1px solid transparent;
  transition: border-color 0.3s;
}
.main-container .footer-wrap .indicator-wrap .carousel-indicator-item.active {
  background-color: red;
}
.main-container .footer-wrap .indicator-wrap .carousel-indicator-item.active::before {
  border-color: red;
}
`;