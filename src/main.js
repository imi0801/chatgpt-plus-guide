// TOC highlight
const headings = [...document.querySelectorAll('.article-section[id]')];
const tocLinks = [...document.querySelectorAll('.toc a, .mobile-toc a')];
if (headings.length && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    const visible = entries.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    tocLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${visible.target.id}`));
  }, { rootMargin: '-15% 0px -60% 0px', threshold: [0, 0.1] });
  headings.forEach(h => observer.observe(h));
}

// Outbound product click tracking (GA4). Only allowlisted identifiers are sent.
function trackProductClick(event) {
  if (event.type === 'auxclick' && event.button !== 1) return;
  const link = event.target.closest?.('a[data-cta][data-product]');
  if (!link || typeof window.gtag !== 'function') return;
  const url = new URL(link.href, location.href);
  const isProductPage = url.origin === 'https://www.goplus.pro';
  const isRechargeShop = url.origin === 'https://fe.dtyuedan.cn' && url.pathname === '/shop/panghu';
  if (!isProductPage && !isRechargeShop) return;
  window.gtag('event', 'outbound_click', {
    article_id: document.body.dataset.article,
    cta_position: link.dataset.cta,
    product: link.dataset.product,
    link_url: url.origin + url.pathname,
    transport_type: 'beacon'
  });
}
document.addEventListener('click', trackProductClick);
document.addEventListener('auxclick', trackProductClick);

// Scroll-depth (25/50/75/100) — one event per threshold per page.
const seen = new Set();
addEventListener('scroll', () => {
  if (typeof window.gtag !== 'function') return;
  const h = document.documentElement;
  const pct = Math.round((h.scrollTop + innerHeight) / h.scrollHeight * 100);
  for (const t of [25, 50, 75, 100]) if (pct >= t && !seen.has(t)) { seen.add(t); window.gtag('event', 'scroll_depth', { percent: t, article_id: document.body.dataset.article }); }
}, { passive: true });
