const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
const navLinks = document.querySelectorAll('.site-nav a');
const themeToggle = document.querySelector('.theme-toggle');
const root = document.documentElement;
const year = document.getElementById('year');
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

if (year) {
  year.textContent = new Date().getFullYear();
}

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'light' && themeToggle) {
  root.classList.add('light');
  themeToggle.textContent = '☀️';
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    root.classList.toggle('light');
    const isLight = root.classList.contains('light');
    themeToggle.textContent = isLight ? '☀️' : '🌙';
    localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');
  });
}

const sections = document.querySelectorAll('main section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.pageYOffset;

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 120;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.site-nav a[href="#${sectionId}"]`);

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLink?.classList.add('active');
    } else {
      navLink?.classList.remove('active');
    }
  });
});

if (form && status) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name');

    status.textContent = `Thanks ${name || 'there'}! Your message is ready. Connect this form to Formspree or your backend to receive emails.`;
    form.reset();
  });
}
