const cursor = document.querySelector('.custom-cursor');
let mouseX = 0, mouseY = 0, posX = 0, posY = 0;
document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});
function animateCursor() {
  posX += (mouseX - posX) * 0.10;
  posY += (mouseY - posY) * 0.10;
  cursor.style.transform = `translate3d(${posX}px, ${posY}px, 0)`;
  requestAnimationFrame(animateCursor);
}
animateCursor();

let lastScroll = 0;
const header = document.getElementById('mainHeader');
window.addEventListener('scroll', () => {
  let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
  if (currentScroll > lastScroll && currentScroll > 100) {
    header.classList.add('hidden');
  } else {
    header.classList.remove('hidden');
  }
  lastScroll = currentScroll;
});

const statsSection = document.querySelector('.stats');
const statNumbers = document.querySelectorAll('.stat-number');
function animateStats() {
  statNumbers.forEach(stat => {
    const target = +stat.getAttribute('data-target');
    const suffix = stat.getAttribute('data-suffix') || "";
    const increment = target / 200;
    let current = 0;
    const updateCount = () => {
      current += increment;
      if (current < target) {
        stat.textContent = Math.floor(current) + suffix;
        requestAnimationFrame(updateCount);
      } else {
        stat.textContent = target + suffix;
      }
    };
    updateCount();
  });
}
const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      animateStats();
    } else {
      statNumbers.forEach(stat => stat.textContent = "0" + (stat.getAttribute('data-suffix') || ""));
    }
  });
}, { threshold: 0.5 });
statsObserver.observe(statsSection);

const founderCards = document.querySelectorAll('.founder-card');
const cardObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible');
    }
  });
}, { threshold: 0.2 });
founderCards.forEach(card => cardObserver.observe(card));

function showLoadingScreen(targetUrl) {
  const loadingScreen = document.getElementById('loadingScreen');
  const directions = ['loading-slide-in-top', 'loading-slide-in-bottom', 'loading-slide-in-left', 'loading-slide-in-right'];
  const randomDir = directions[Math.floor(Math.random() * directions.length)];
  loadingScreen.className = '';
  loadingScreen.style.display = 'block';
  loadingScreen.classList.add(randomDir);
  setTimeout(() => {
    window.location.href = targetUrl;
  }, 1500);
}


const triggerElements = document.querySelectorAll('a[href="Login.html"], a[href="dindex.html"], .main-login-btn');
triggerElements.forEach(el => {
  el.addEventListener('click', function(e) {
    e.preventDefault();
    const targetUrl = el.getAttribute('href') || el.dataset.target;
    showLoadingScreen(targetUrl);
  });
});