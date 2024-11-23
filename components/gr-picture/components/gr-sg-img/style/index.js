export const stylesheet = `
:host {
  transition: transform var(--transition-duration);
  position: relative;
  margin: 0.15rem;
  height: calc(100% - 0.3rem);
  overflow: hidden;
}

.sg-img {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.sg-img .search-icon {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  filter: opacity(0);
  z-index: 1;
}
.sg-img .search-icon .search-glass {
  position: absolute;
  left: -1rem;
  top: -1rem;
  width: 1rem;
  height: 1rem;
  border: 2px solid white;
  border-radius: 50%;
}
.sg-img .search-icon .search-handgrip {
  position: absolute;
  top: calc(50% + 0.35rem);
  left: 50%;
  width: 1rem;
  height: 0.25rem;
  background-color: white;
  transform-origin: center center;
  transform: rotate(45deg);
}
.sg-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.sg-img::after {
  content: "";
  bottom: 0;
  left: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  background: var(--mask-color);
  transform-origin: center bottom;
  transform: translateY(100%);
}
.sg-img:hover .search-icon {
  filter: opacity(1);
}
.sg-img:hover::after {
  transform: translateY(50%);
}
.sg-img:hover img {
  transform: scale(1.2);
}
.sg-img.has-picture {
  visibility: hidden;
  pointer-events: none;
}
.sg-img.with-transition .search-icon {
  transition: filter var(--transition-duration);
}
.sg-img.with-transition img {
  transition: transform var(--transition-duration);
}
.sg-img.with-transition::after {
  transition: transform var(--transition-duration);
}
`;