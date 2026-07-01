function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function smoothScrollTo(targetY, duration = 700) {
  const startY = window.scrollY;
  const distance = targetY - startY;
  if (Math.abs(distance) < 1) return;
  const startTime = performance.now();

  function step(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    window.scrollTo({ top: startY + distance * easeInOutCubic(progress), left: 0, behavior: 'instant' });
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function getSectionY(hash) {
  if (!hash || hash === '#') return 0;
  const target = document.querySelector(hash);
  if (!target) return null;
  const header = document.querySelector('.site-header');
  const headerHeight = header ? header.offsetHeight : 0;
  const rect = target.getBoundingClientRect();
  return rect.top + window.scrollY - headerHeight - 16;
}

document.addEventListener('DOMContentLoaded', () => {
  // Ancore verso una sezione della stessa pagina: scroll con easing al posto del salto istantaneo.
  document.querySelectorAll('a[href]').forEach((link) => {
    const href = link.getAttribute('href');
    if (!href || href === '#') return;

    let url;
    try {
      url = new URL(href, window.location.href);
    } catch (err) {
      return;
    }
    if (url.origin !== window.location.origin || !url.hash) return;
    if (url.pathname !== window.location.pathname) return;

    link.addEventListener('click', (e) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      const targetY = getSectionY(url.hash);
      if (targetY === null) return;
      e.preventDefault();
      smoothScrollTo(targetY);
      history.pushState(null, '', url.hash);
    });
  });

  // Arrivo da un'altra pagina con un'ancora (es. staff.html -> index.html#contatti):
  // sostituisce il salto istantaneo del browser con lo stesso scroll animato.
  if (window.location.hash) {
    const targetY = getSectionY(window.location.hash);
    if (targetY !== null) {
      requestAnimationFrame(() => smoothScrollTo(targetY));
    }
  }

  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      nav.classList.toggle('is-open');
      navToggle.classList.toggle('is-open');
    });
  }

  document.querySelectorAll('.has-dropdown > .dropdown-toggle').forEach((toggle) => {
    toggle.addEventListener('click', (e) => {
      if (window.innerWidth <= 720) {
        e.preventDefault();
        toggle.parentElement.classList.toggle('is-open');
      }
    });
  });

  const filterBtns = document.querySelectorAll('.filter-btn');
  const athleteCards = document.querySelectorAll('.athlete-card');
  if (filterBtns.length) {
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterBtns.forEach((b) => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        const role = btn.dataset.filter;
        athleteCards.forEach((card) => {
          if (role === 'all' || card.dataset.role === role) {
            card.hidden = false;
          } else {
            card.hidden = true;
          }
        });
      });
    });
  }

  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }
});
