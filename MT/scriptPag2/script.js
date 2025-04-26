const cursor = document.querySelector('.custom-cursor');
let mouseX = 0, mouseY = 0, posX = 0, posY = 0;
document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});
function animateCursor() {
  posX += (mouseX - posX) * 0.1;
  posY += (mouseY - posY) * 0.1;
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


function showLoadingScreen(targetUrl) {
  const loadingScreen = document.getElementById('loadingScreen');
  const directions = ['top', 'right', 'bottom', 'left'];
  const randomDirection = directions[Math.floor(Math.random() * directions.length)];
  
  loadingScreen.style.display = 'block';
  loadingScreen.style.transition = 'all 0.5s ease';
  
  switch(randomDirection) {
    case 'top':
      loadingScreen.style.top = '-100%';
      setTimeout(() => loadingScreen.style.top = '0', 0);
      break;
    case 'right':
      loadingScreen.style.right = '-100%';
      setTimeout(() => loadingScreen.style.right = '0', 0);
      break;
    case 'bottom':
      loadingScreen.style.bottom = '-100%';
      setTimeout(() => loadingScreen.style.bottom = '0', 0);
      break;
    case 'left':
      loadingScreen.style.left = '-100%';
      setTimeout(() => loadingScreen.style.left = '0', 0);
      break;
  }

  setTimeout(() => {
    window.location.href = targetUrl;
  }, 1500);
}

const homeLink = document.getElementById('homeLink');
homeLink.addEventListener('click', function(e) {
  e.preventDefault();
  const targetUrl = homeLink.getAttribute('href');
  showLoadingScreen(targetUrl);
});


document.getElementById('discordLoginBtn').addEventListener('click', function() {
  const discordOAuthUrl = "https://discord.com/api/oauth2/authorize?client_id=1347269914091585556&redirect_uri=1bx_foENmhQtV9of65WonVYeHaW5Xlt6&response_type=code&scope=identify";
  window.location.href = discordOAuthUrl;
});