export const stylesheet = `
.carousel-item {
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
}
.carousel-item ::slotted(*) {
  width: 100%;
  height: 100%;
  object-fit: cover;
  -webkit-user-drag: none;
}
`;