// 删除"back to top"按钮

(function () {
  // 判断一个元素是不是“回到顶部”按钮（多语言、多实现兜底）
  function isBackToTop(el) {
    const tag = (el.tagName || '').toLowerCase();
    if (!(tag === 'a' || tag === 'button')) return false;

    const aria = (el.getAttribute('aria-label') || '').toLowerCase();
    const title = (el.getAttribute('title') || '').toLowerCase();
    const href = (el.getAttribute('href') || '').toLowerCase();
    const text = (el.textContent || '').toLowerCase();

    return (
      aria.includes('back to top') ||
      aria.includes('返回顶部') ||
      title.includes('back to top') ||
      title.includes('返回顶部') ||
      href === '#top' || href === '#document-top' ||
      text.includes('back to top') || text.includes('返回顶部')
    );
  }

  // 删除候选元素（优先删掉它的 <a>/<button> 容器）
  function removeBackToTop(root) {
    root.querySelectorAll('a,button').forEach(el => {
      if (isBackToTop(el)) {
        const target = el.closest('a,button') || el;
        target.remove();
      }
    });

    // 你提供的 JSPath：body > div > div > div > div > a > span
    // 若那条链存在，也强制删掉其父链接
    const jspathSpan = document.querySelector('body > div > div > div > div > a > span');
    if (jspathSpan) {
      const parentLink = jspathSpan.closest('a');
      if (parentLink) parentLink.remove();
    }
  }

  // 初次执行
  function run() { removeBackToTop(document); }

  // DOM 就绪后运行一次
  if (document.readyState !== 'loading') run();
  else document.addEventListener('DOMContentLoaded', run);

  // 监听后续动态插入，再次移除（主题可能异步插入）
  const mo = new MutationObserver(muts => {
    for (const m of muts) {
      m.addedNodes.forEach(node => {
        if (node.nodeType === 1) removeBackToTop(node);
      });
    }
  });
  mo.observe(document.documentElement, { childList: true, subtree: true });
})();
