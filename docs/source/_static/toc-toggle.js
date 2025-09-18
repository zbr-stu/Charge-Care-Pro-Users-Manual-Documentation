// 目录格式设置

(function () {
  // 可根据手感微调：单击与双击的判定窗口
  const CLICK_DELAY = 250; // 毫秒

  // 在这些容器里代理事件：左侧导航、右侧 TOC、抽屉式 TOC
  const SELECTORS = ".sidebar-tree, .toc-tree, .toc-drawer";

  function hasExpandable(li) {
    return !!li && !!li.querySelector('input.toctree-checkbox');
  }

  function findLi(el) {
    return el ? el.closest('li[class*="toctree-l"]') : null;
  }

  function toggleLi(li) {
    const cb = li.querySelector('input.toctree-checkbox');
    if (!cb) return;
    cb.checked = !cb.checked;
    // 触发 change 以便主题的样式/动画响应
    cb.dispatchEvent(new Event('change', { bubbles: true }));
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(SELECTORS).forEach(function (tree) {
      let clickTimer = null;

      // 1) 单击（可展开项）：延迟一点点再导航；如果期间出现双击，就不导航而是折叠/展开
      tree.addEventListener(
        "click",
        function (e) {
          const link = e.target.closest("a");
          if (!link) return;

          const li = findLi(link);
          // 只有“可展开项”（有子目录）才应用单/双击判定；叶子节点直接放行
          if (!hasExpandable(li)) return;

          // 拦截默认导航，等待是否会出现双击
          e.preventDefault();
          if (clickTimer) clearTimeout(clickTimer);

          clickTimer = setTimeout(function () {
            // 没有双击发生 -> 正常导航
            window.location.href = link.href;
          }, CLICK_DELAY);
        },
        true // 捕获阶段：尽可能早地拦截
      );

      // 2) 双击：对“可展开项”改为折叠/展开，并取消任何待执行的单击导航
      tree.addEventListener(
        "dblclick",
        function (e) {
          const link = e.target.closest("a");
          const label = e.target.closest("label");
          const li = findLi(link || label);
          if (!hasExpandable(li)) return;

          // 阻止导航与选中，改为切换折叠/展开
          e.preventDefault();
          e.stopPropagation();
          if (clickTimer) {
            clearTimeout(clickTimer);
            clickTimer = null;
          }
          toggleLi(li);
        },
        true
      );

      // 3) 双击 label（通常是小箭头所在的可点区域）也生效
      tree.addEventListener(
        "dblclick",
        function (e) {
          const label = e.target.closest("label");
          if (!label) return;
          const li = findLi(label);
          if (!hasExpandable(li)) return;

          e.preventDefault();
          e.stopPropagation();
          toggleLi(li);
        },
        true
      );
    });
  });
})();
