export const stylesheet = `
:host {
  --title-color: white;
  --theme-color: white;
  --transition-duration: 0.5s;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center center;
  cursor: pointer;
}

.gr-hover-card {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.gr-hover-card .info-wrap {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 1;
  transition: top var(--transition-duration);
}
.gr-hover-card .info-wrap .title {
  color: var(--title-color);
  font-weight: 800;
  font-size: 1.25rem;
  white-space: nowrap;
}
.gr-hover-card .info-wrap .desc {
  color: var(--theme-color);
  position: relative;
}
.gr-hover-card .info-wrap .desc::before, .gr-hover-card .info-wrap .desc::after {
  content: "";
  display: block;
  position: absolute;
  top: 50%;
  width: 50%;
  height: 1px;
  background-color: var(--theme-color);
}
.gr-hover-card .info-wrap .desc::before {
  left: -0.5rem;
  transform: translate(-100%, -50%);
}
.gr-hover-card .info-wrap .desc::after {
  right: -0.5rem;
  transform: translate(100%, -50%);
}
.gr-hover-card::after {
  content: "";
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  transition: filter var(--transition-duration);
}
.gr-hover-card:hover .info-wrap {
  top: 70%;
}
.gr-hover-card:hover::after {
  filter: opacity(0);
}
`;