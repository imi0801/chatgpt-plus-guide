const headings = [...document.querySelectorAll(".article-section[id]")];
const tocLinks = [...document.querySelectorAll(".toc a")];

if (headings.length && tocLinks.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      tocLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${visible.target.id}`);
      });
    },
    { rootMargin: "-20% 0px -65% 0px", threshold: [0.1, 0.3, 0.6] }
  );

  headings.forEach((heading) => observer.observe(heading));
}

document.addEventListener("click", (event) => {
  const link = event.target.closest('a[href*="www.goplus.pro"]');
  if (!link || typeof window.gtag !== "function") return;

  window.gtag("event", "outbound_click", {
    event_category: "engagement",
    event_label: link.href,
    link_url: link.href
  });
});
