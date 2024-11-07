export const stylesheet = `
<style>
.ls-item {
    padding: 1.25rem;
    width: 100%;
    color: #fff;
    text-decoration: none;
    cursor: pointer;
    border-left: 1px solid rgba(212, 212, 212, 0.7);
}
.ls-item .title {
    font-size: var(--fs-title);
    transition: font-size 0.3s;
}
.ls-item .desc {
    display: block;
    font-size: var(--fs-desc);
    filter: opacity(0);
    transition: filter 0.3s;
}
.ls-item .desc,
.ls-item .title {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
.ls-item .desc::before, .ls-item .desc::after {
    content: "";
    display: inline-block;
    width: 0.95rem;
    height: 1px;
    transform: translateY(-2px);
    scale: 0;
    background-color: red;
    transition: scale 0.8s;
}
.ls-item .desc::before {
    transform-origin: left center;
    margin-right: 5px;
}
.ls-item .desc::after {
    transform-origin: right center;
    margin-left: 5px;
}
.ls-item.active .title {
    font-size: var(--fs-title-active);
}
.ls-item.active .desc {
    filter: opacity(1);
}
.ls-item.active .desc::after, .ls-item.active .desc::before {
    scale: 1;
}
</style>
`;