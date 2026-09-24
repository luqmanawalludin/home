const navLinks = document.querySelectorAll('.nav-links a');
const sectionEls = document.querySelectorAll('main section[id]');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-links');
const filterButtons = document.querySelectorAll('.filter-btn');
const workCards = document.querySelectorAll('.work-card');
const yearEl = document.getElementById('year');
const header = document.querySelector('.site-header');
const portraitCard = document.querySelector('.portrait-card');
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = document.querySelector('.theme-toggle__icon');

const applyTheme = (theme) => {
  const resolvedTheme = theme === 'light' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', resolvedTheme);
  localStorage.setItem('luqman-theme', resolvedTheme);

  if (themeIcon) {
    themeIcon.textContent = resolvedTheme === 'light' ? '☾' : '☀';
  }

  if (themeToggle) {
    themeToggle.setAttribute('aria-label', `Switch to ${resolvedTheme === 'light' ? 'dark' : 'light'} theme`);
  }
};

const savedTheme = localStorage.getItem('luqman-theme') || 'dark';
applyTheme(savedTheme);

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

const setActiveLink = (id) => {
  navLinks.forEach((link) => {
    const isActive = link.getAttribute('href') === `#${id}`;
    link.classList.toggle('active', isActive);
  });
};

const sectionObserver = new IntersectionObserver(
  (entries) => {
    const visibleEntry = entries.find((entry) => entry.isIntersecting);
    if (visibleEntry) {
      setActiveLink(visibleEntry.target.id);
    }
  },
  { threshold: 0.45 }
);

sectionEls.forEach((section) => sectionObserver.observe(section));

if (header) {
  const updateHeaderState = () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  };

  updateHeaderState();
  window.addEventListener('scroll', updateHeaderState, { passive: true });
}

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
    });
  });
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    applyTheme(currentTheme === 'light' ? 'dark' : 'light');
  });
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((btn) => btn.classList.toggle('active', btn === button));

    workCards.forEach((card) => {
      const cardMatches = filter === 'all' || card.dataset.category === filter;
      card.style.display = cardMatches ? 'block' : 'none';
    });
  });
});

if (portraitCard) {
  const resetCard = () => {
    portraitCard.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  };

  window.addEventListener('pointermove', (event) => {
    const x = (event.clientX / window.innerWidth - 0.5) * 14;
    const y = (event.clientY / window.innerHeight - 0.5) * 14;

    portraitCard.style.transform = `perspective(1200px) rotateX(${(-y).toFixed(2)}deg) rotateY(${x.toFixed(2)}deg) translateY(-6px)`;
  });

  window.addEventListener('pointerleave', resetCard);
  resetCard();
}
