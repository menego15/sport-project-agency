document.addEventListener('DOMContentLoaded', () => {
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
