const headings = [...document.querySelectorAll('.article-section[id]')];
const tocLinks = [...document.querySelectorAll('.toc a, .mobile-toc a')];
if (headings.length && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    const visible = entries.filter(entry => entry.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
    if (!visible) return;
    tocLinks.forEach(link=>link.classList.toggle('active',link.getAttribute('href')===`#${visible.target.id}`));
  }, {rootMargin:'-15% 0px -60% 0px',threshold:[0,0.1]});
  headings.forEach(heading=>observer.observe(heading));
}
function trackProductClick(event) {
  if (event.type === 'auxclick' && event.button !== 1) return;
  const link = event.target.closest?.('a[data-cta][data-product]');
  if (!link || typeof window.gtag !== 'function') return;
  const url = new URL(link.href, location.href);
  const isProductPage = url.origin === 'https://www.goplus.pro';
  const isRechargeShop = url.origin === 'https://fe.dtyuedan.cn' && url.pathname === '/shop/panghu';
  if (!isProductPage && !isRechargeShop) return;
  // Preserve the existing custom event name; GA4's automatic "click" is separate.
  // Only allowlisted identifiers are sent, never arbitrary query strings/session data.
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
