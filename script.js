function toggleMenu() {
  const nav = document.getElementById('navLinks');
  if (nav) {
    nav.classList.toggle('show');
  }
}

function toggleFaq(el) {
  const answer = el.nextElementSibling;
  if (answer) {
    answer.classList.toggle('show');
  }
}

