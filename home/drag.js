(() => {
  const icons = document.querySelectorAll(".icon.draggable");

  // 给每个 icon 一个初始 left/top（避免没定位时拖不动）
  icons.forEach(icon => {
    if (!icon.style.left) icon.style.left = icon.offsetLeft + "px";
    if (!icon.style.top)  icon.style.top  = icon.offsetTop + "px";
  });

  let dragging = null;
  let offsetX = 0, offsetY = 0;

  function down(e) {
    dragging = e.currentTarget;
    e.preventDefault(); // 防止选中文本/图片拖拽默认行为

    const r = dragging.getBoundingClientRect();
    offsetX = e.clientX - r.left;
    offsetY = e.clientY - r.top;

    dragging.style.zIndex = String(Date.now());
    dragging.setPointerCapture(e.pointerId);
  }

  function move(e) {
    if (!dragging) return;

    let x = e.clientX - offsetX;
    let y = e.clientY - offsetY;

    // 可选：限制不拖出屏幕
    const w = dragging.offsetWidth;
    const h = dragging.offsetHeight;
    x = Math.max(0, Math.min(x, window.innerWidth - w));
    y = Math.max(0, Math.min(y, window.innerHeight - h));

    dragging.style.left = x + "px";
    dragging.style.top  = y + "px";
  }

  function up(e) {
    if (!dragging) return;
    dragging.releasePointerCapture(e.pointerId);
    dragging = null;
  }

  icons.forEach(icon => icon.addEventListener("pointerdown", down));
  window.addEventListener("pointermove", move);
  window.addEventListener("pointerup", up);
})();
