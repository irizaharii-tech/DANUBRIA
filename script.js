const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
});
document.querySelectorAll('.fade-in').forEach(sec => observer.observe(sec));
document.querySelector('.contact-form')?.addEventListener('submit', e => {
  e.preventDefault();
  alert("Thank you for contacting Danubria. We'll get back to you soon!");
});
