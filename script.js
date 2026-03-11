function toggleMenu() {
  const nav = document.getElementById('navLinks');
  if (!nav) return;
  nav.classList.toggle('show');
}

document.addEventListener('click', function (event) {
  const nav = document.getElementById('navLinks');
  const menuButton = document.querySelector('.menu-toggle');

  if (!nav || !menuButton) return;

  const clickedInsideNav = nav.contains(event.target);
  const clickedMenuButton = menuButton.contains(event.target);

  if (!clickedInsideNav && !clickedMenuButton) {
    nav.classList.remove('show');
  }
});

window.addEventListener('resize', function () {
  const nav = document.getElementById('navLinks');
  if (!nav) return;

  if (window.innerWidth > 768) {
    nav.classList.remove('show');
  }
});
