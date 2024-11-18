export const stylesheet = `
:host {
  --odd-background-color: inherit;
}

.list-item-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1.25rem;
  color: white;
  text-decoration: none;
  cursor: pointer;
  background-color: var(--odd-background-color);
}
.list-item-container .content-wrap {
  position: relative;
  display: flex;
  align-items: center;
  transition: transform 0.5s;
}
.list-item-container .content-wrap::before {
  content: "";
  position: absolute;
  display: block;
  height: 100%;
  width: 0;
  background-color: red;
  transition: width 0.3s;
}
.list-item-container .msg-wrap,
.list-item-container .content-wrap {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.list-item-container .suffix-desc-wrap,
.list-item-container .prefix-desc-wrap {
  white-space: nowrap;
}
.list-item-container ::slotted(*) {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.list-item-container ::slotted(*[slot=prefix]),
.list-item-container ::slotted(*[slot=suffix]) {
  white-space: nowrap;
}
.list-item-container:hover .content-wrap {
  transform: translateX(0.5rem);
}
.list-item-container:hover .content-wrap::before {
  width: 2px;
}
`;