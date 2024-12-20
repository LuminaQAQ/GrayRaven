export const stylesheet = `
:host {
  --transition-duration: 0.5s;
  --mask-color: linear-gradient(to top, rgba(255, 0, 0, 0.3), transparent);
  display: block;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

[class*=col-] {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.col-6 {
  flex: 6 0 25%;
  min-width: 25%;
}

.col-12 {
  flex: 6 0 50%;
  min-width: 50%;
}

.gr-picture-group-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  overflow-y: hidden;
}
.gr-picture-group-container .col-6 > gr-sg-img {
  height: calc(50% - 0.3rem);
}
`;