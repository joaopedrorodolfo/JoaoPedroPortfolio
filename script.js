// ================================================
// script.js — COMPLETO
// ================================================

// ── MANIFESTO: revela palavras no scroll ─────────
// A função é exposta globalmente para que o traducao.js
// possa chamar rebuildManifesto() ao trocar idioma.

let manifestoScrollContainer = null;
let manifestoWordEls = [];

function rebuildManifesto(texto) {
  const revealText = document.getElementById('reveal-text');
  if (!revealText) return;

  // Guarda quantas palavras já estavam acesas antes de reconstruir
  const activeCount = revealText.querySelectorAll('.word.active').length;

  revealText.innerHTML = '';
  const palavras = texto.trim().split(/\s+/);
  palavras.forEach((p, i) => {
    const span = document.createElement('span');
    span.textContent = p;
    span.classList.add('word');
    if (i < activeCount) span.classList.add('active');
    revealText.appendChild(span);
  });

  // Atualiza a referência global de elementos
  manifestoWordEls = Array.from(revealText.querySelectorAll('.word'));
}

function iniciarManifesto() {
  manifestoScrollContainer = document.querySelector('.scroll-container');
  const revealText = document.getElementById('reveal-text');
  if (!revealText || !manifestoScrollContainer) return;

  // Constrói os spans pela primeira vez
  rebuildManifesto(revealText.textContent);

  // Listener de scroll — usa sempre manifestoWordEls (referência atualizada)
  function handleScroll() {
    if (!manifestoScrollContainer) return;
    const rect = manifestoScrollContainer.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const scrollDistance = -rect.top;
    const maxScroll = rect.height - windowHeight;

    let progress = scrollDistance / maxScroll;
    progress = Math.max(0, Math.min(1, progress));

    const toReveal = Math.floor(progress * (manifestoWordEls.length + 1));
    manifestoWordEls.forEach((word, index) => {
      word.classList.toggle('active', index < toReveal);
    });
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll();
}

document.addEventListener('DOMContentLoaded', iniciarManifesto);


// ── GSAP SCROLL HORIZONTAL ───────────────────────
gsap.registerPlugin(ScrollTrigger);

const sections = gsap.utils.toArray('.panel');

let scrollTween = gsap.to(sections, {
  xPercent: -100 * (sections.length - 1),
  ease: 'none',
  scrollTrigger: {
    trigger: '.rolagem',
    pin: true,
    scrub: 1,
    start: 'top top',
    end: () => '+=' + document.querySelector('.horizontal-wrapper').scrollWidth,
    invalidateOnRefresh: true,
  }
});

sections.forEach((section) => {
  const title       = section.querySelector('.main-title');
  const subTitle    = section.querySelector('.sub-title');
  const description = section.querySelector('.description');
  const circle      = section.querySelector('.circle-overlay');

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      containerAnimation: scrollTween,
      start: 'left 20%',
      toggleActions: 'play none none reverse',
    }
  });

  tl.to(title, { opacity: 1, y: 0, duration: 1, ease: 'power4.out' })
    .to(subTitle,    { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
    .to(description, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
    .fromTo(circle,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 0.5, duration: 1.2, ease: 'elastic.out(1, 0.5)' },
      '-=0.8'
    );
});

gsap.to('body', {
  backgroundColor: '#1a1a1e',
  scrollTrigger: {
    trigger: '.section-1',
    containerAnimation: scrollTween,
    start: 'left center',
    end: 'right center',
    scrub: true
  }
});

window.addEventListener('load', () => ScrollTrigger.refresh());


// ── TYPING EFFECT (Projetos) ─────────────────────
const subtitle = document.getElementById('subtiembreve');

// 'phrases' é global para que traducao.js possa atualizar
var phrases = [
  'Algo incrível está sendo construído',
  'Novos projetos em desenvolvimento',
  'Quase pronto para mostrar ao mundo',
  'Aguarde novidades...'
];

let phraseIndex = 0;
let charIndex   = 0;
let isDeleting  = false;
let typeSpeed   = 100;

function type() {
  const currentPhrase = phrases[phraseIndex];
  if (!currentPhrase) return;

  if (isDeleting) {
    subtitle.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
    typeSpeed = 50;
  } else {
    subtitle.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
    typeSpeed = 100;
  }

  if (!isDeleting && charIndex === currentPhrase.length) {
    isDeleting = true;
    typeSpeed  = 2000;
  } else if (isDeleting && charIndex === 0) {
    isDeleting   = false;
    phraseIndex  = (phraseIndex + 1) % phrases.length;
    typeSpeed    = 500;
  }

  setTimeout(type, typeSpeed);
}

window.addEventListener('load', () => setTimeout(type, 1000));


// ── CARROSSEL DE CONTATO ─────────────────────────
function initializeCarousel(texto) {
  const carouselTrack = document.getElementById('carouselTrack');
  if (!carouselTrack) return;

  const textContent = texto || 'Vamos trabalhar juntos';
  const separator   = '✱';
  carouselTrack.innerHTML = '';

  for (let i = 0; i < 8; i++) {
    const item = document.createElement('div');
    item.className = 'carousel-item';
    const text = document.createElement('span');
    text.textContent = textContent;
    const sep = document.createElement('span');
    sep.className   = 'carousel-separator';
    sep.textContent = separator;
    item.appendChild(text);
    item.appendChild(sep);
    carouselTrack.appendChild(item);
  }

  carouselTrack.addEventListener('mouseenter',  () => { carouselTrack.style.animationPlayState = 'paused'; });
  carouselTrack.addEventListener('mouseleave',  () => { carouselTrack.style.animationPlayState = 'running'; });
  carouselTrack.addEventListener('touchstart',  () => { carouselTrack.style.animationPlayState = 'paused'; });
  carouselTrack.addEventListener('touchend',    () => { carouselTrack.style.animationPlayState = 'running'; });
}

document.addEventListener('DOMContentLoaded', () => initializeCarousel());


// ── BOTÕES SOCIAIS & CONTATO ─────────────────────
function setupSocialButtons() {
  const instagramBtn = document.querySelector('.social-btn[title="Instagram"]');
  const linkedinBtn  = document.querySelector('.social-btn[title="LinkedIn"]');

  if (instagramBtn) {
    instagramBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.open('https://www.instagram.com/joaopedro_rodolfo/?utm_source=ig_web_button_share_sheet', '_blank');
    });
  }
  if (linkedinBtn) {
    linkedinBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.open('https://www.linkedin.com/in/joão-pedro-vilas-boas-18b425379', '_blank');
    });
  }
}

function setupContactButton() {
  const contactBtn = document.getElementById('contact-button-text');
  if (contactBtn) {
    contactBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.open('https://w.app/1xepmu', '_blank');
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  setupSocialButtons();
  setupContactButton();
});


// ── EFEITO DE ESTRELAS (Pixel Section) ───────────
document.addEventListener('DOMContentLoaded', function () {
  const section = document.querySelector('.pixel-section');
  const canvas  = document.getElementById('pixel-canvas');
  if (!canvas || !section) return;

  const ctx = canvas.getContext('2d');
  let stars = [];
  let mouseX = 0;
  let mouseY = 0;
  const mouseRadius = 100;

  function resize() {
    const rect = section.getBoundingClientRect();
    canvas.width  = rect.width;
    canvas.height = rect.height;
    mouseX = canvas.width  / 2;
    mouseY = canvas.height / 2;
    initStars();
  }

  function initStars() {
    stars = [];
    for (let i = 0; i < 150; i++) {
      stars.push({
        x:      Math.random() * canvas.width,
        y:      Math.random() * canvas.height,
        baseX:  Math.random() * canvas.width,
        baseY:  Math.random() * canvas.height,
        size:   Math.random() * 2,
        speed:  0.1 + Math.random() * 0.4,
        opacity: Math.random(),
        fading: Math.random() > 0.5,
        vx: 0,
        vy: 0,
      });
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(s => {
      s.baseX += s.speed;
      if (s.baseX > canvas.width) s.baseX = 0;

      const dx = mouseX - s.baseX;
      const dy = mouseY - s.baseY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < mouseRadius) {
        const force = (mouseRadius - distance) / mouseRadius;
        const angle = Math.atan2(dy, dx);
        s.vx = Math.cos(angle) * force * 3;
        s.vy = Math.sin(angle) * force * 3;
      } else {
        s.vx *= 0.95;
        s.vy *= 0.95;
      }

      s.x = s.baseX + s.vx;
      s.y = s.baseY + s.vy;

      if (s.fading) {
        s.opacity -= 0.005;
        if (s.opacity <= 0.2) s.fading = false;
      } else {
        s.opacity += 0.005;
        if (s.opacity >= 1) s.fading = true;
      }

      ctx.fillStyle = `rgba(255,255,255,${s.opacity})`;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(animate);
  }

  section.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  });
  section.addEventListener('mouseleave', () => {
    mouseX = canvas.width  / 2;
    mouseY = canvas.height / 2;
  });

  window.addEventListener('resize', resize);
  resize();
  animate();
});


// ── LOADER (intro animado) ───────────────────────
const loaderWords = ['Hello', 'Bonjour', '你好', 'Hallo', 'Ciao', 'Olá', 'Hi', 'Hello', 'Bonjour', '你好', 'Hallo', 'Ciao', 'Olá', 'Hi'];
let loaderIndex = 0;
const textElement = document.getElementById('text-target');
const loaderEl   = document.getElementById('loader');

function startFastLoop() {
  textElement.classList.remove('animate__animated', 'animate__fadeInUp');
  const interval = setInterval(() => {
    loaderIndex++;
    if (loaderIndex < loaderWords.length) {
      textElement.textContent = loaderWords[loaderIndex];
    } else {
      clearInterval(interval);
      loaderEl.classList.add('loader-finish');
    }
  }, 200);
}

setTimeout(startFastLoop, 1000);

