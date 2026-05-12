// ================================================
// traducao.js — Sistema de Tradução
// Deve ser carregado DEPOIS do script.js
// ================================================

const traducoes = {
  pt: {
    nav: ['SOBRE', 'PROJETOS', 'CONTATO'],
    hero_cargo:     'Desenvolvedor Front-end',
    hero_tech:      'HTML, CSS e JavaScript',
    hero_local:     'SÃO PAULO, BRASIL',
    manifesto:      'VOCÊ NÃO PRECISA SER GRANDE PARA COMEÇAR, MAS PRECISA COMEÇAR PARA SER GRANDE.',
    s1_label:       'Habilidades - Sobre mim',
    s1_subtitle:    'Criando interfaces modernas',
    s1_desc:        'Estou desenvolvendo habilidades em HTML, CSS e JavaScript para criar interfaces responsivas, interativas e bem estruturadas, unindo design e funcionalidade.',
    s2_label:       'Habilidades - Sobre mim',
    s2_subtitle:    'Construindo lógica com Java',
    s2_desc:        'Estou desenvolvendo minha base em Java, focando em lógica de programação, orientação a objetos e criação de aplicações robustas e escaláveis.',
    s3_label:       'Habilidades - Sobre mim',
    s3_subtitle:    'Dominando dados com SQL',
    s3_desc:        'Estou aprendendo a trabalhar com bancos de dados, criando consultas eficientes, organizando informações e extraindo insights através do SQL.',
    projects_title: 'Projetos Em Breve',
    typing_phrases: [
      'Algo incrível está sendo construído',
      'Novos projetos em desenvolvimento',
      'Quase pronto para mostrar ao mundo',
      'Aguarde novidades...'
    ],
    contact_btn:    'Entrar em contato',
    carousel_text:  'Vamos trabalhar juntos',
  },
  en: {
    nav: ['ABOUT', 'PROJECTS', 'CONTACT'],
    hero_cargo:     'Front-end Developer',
    hero_tech:      'HTML, CSS & JavaScript',
    hero_local:     'SÃO PAULO, BRAZIL',
    manifesto:      'YOU DON\'T HAVE TO BE GREAT TO START, BUT YOU HAVE TO START TO BE GREAT.',
    s1_label:       'Skills - About me',
    s1_subtitle:    'Building modern interfaces',
    s1_desc:        'I\'m developing skills in HTML, CSS and JavaScript to build responsive, interactive and well-structured interfaces, combining design and functionality.',
    s2_label:       'Skills - About me',
    s2_subtitle:    'Building logic with Java',
    s2_desc:        'I\'m building my foundation in Java, focusing on programming logic, object-oriented design and creating robust, scalable applications.',
    s3_label:       'Skills - About me',
    s3_subtitle:    'Mastering data with SQL',
    s3_desc:        'I\'m learning to work with databases, creating efficient queries, organizing information and extracting insights through SQL.',
    projects_title: 'Projects Coming Soon',
    typing_phrases: [
      'Something amazing is being built',
      'New projects under development',
      'Almost ready to show the world',
      'Stay tuned...'
    ],
    contact_btn:    'Get in touch',
    carousel_text:  'Let\'s work together',
  },
  es: {
    nav: ['SOBRE MÍ', 'PROYECTOS', 'CONTACTO'],
    hero_cargo:     'Desarrollador Front-end',
    hero_tech:      'HTML, CSS y JavaScript',
    hero_local:     'SÃO PAULO, BRASIL',
    manifesto:      'NO NECESITAS SER GRANDE PARA EMPEZAR, PERO NECESITAS EMPEZAR PARA SER GRANDE.',
    s1_label:       'Habilidades - Sobre mí',
    s1_subtitle:    'Creando interfaces modernas',
    s1_desc:        'Estoy desarrollando habilidades en HTML, CSS y JavaScript para crear interfaces responsivas, interactivas y bien estructuradas, uniendo diseño y funcionalidad.',
    s2_label:       'Habilidades - Sobre mí',
    s2_subtitle:    'Construyendo lógica con Java',
    s2_desc:        'Estoy desarrollando mi base en Java, enfocándome en lógica de programación, orientación a objetos y creación de aplicaciones robustas y escalables.',
    s3_label:       'Habilidades - Sobre mí',
    s3_subtitle:    'Dominando datos con SQL',
    s3_desc:        'Estoy aprendiendo a trabajar con bases de datos, creando consultas eficientes, organizando información y extrayendo insights a través de SQL.',
    projects_title: 'Proyectos Próximamente',
    typing_phrases: [
      'Algo increíble está siendo construido',
      'Nuevos proyectos en desarrollo',
      'Casi listo para mostrar al mundo',
      'Espera novedades...'
    ],
    contact_btn:    'Ponerse en contacto',
    carousel_text:  'Trabajemos juntos',
  }
};

function aplicarTraducao(lang) {
  const t = traducoes[lang];
  if (!t) return;

  // ── NAV ────────────────────────────────────────
  document.querySelectorAll('.menu a').forEach((link, i) => {
    if (t.nav[i] !== undefined) link.textContent = t.nav[i];
  });

  // ── HERO ───────────────────────────────────────
  const cargo = document.getElementById('hero-cargo');
  const tech  = document.getElementById('hero-tech');
  const local = document.getElementById('hero-local');
  if (cargo) cargo.textContent = t.hero_cargo;
  if (tech)  tech.textContent  = t.hero_tech;
  if (local) local.textContent = t.hero_local;

  // ── MANIFESTO ──────────────────────────────────
  // Chama a função do script.js que reconstrói os spans
  // e mantém o listener de scroll funcionando corretamente
  if (typeof rebuildManifesto === 'function') {
    rebuildManifesto(t.manifesto);
  }

  // ── SEÇÕES HORIZONTAIS ─────────────────────────
  const panels = document.querySelectorAll('.panel');
  const panelData = [
    { label: t.s1_label, subtitle: t.s1_subtitle, desc: t.s1_desc },
    { label: t.s2_label, subtitle: t.s2_subtitle, desc: t.s2_desc },
    { label: t.s3_label, subtitle: t.s3_subtitle, desc: t.s3_desc },
  ];
  panels.forEach((panel, i) => {
    if (!panelData[i]) return;
    const labelEl    = panel.querySelector('.page-number');
    const subtitleEl = panel.querySelector('.sub-title');
    const descEl     = panel.querySelector('.description');
    if (labelEl)     labelEl.textContent    = panelData[i].label;
    if (subtitleEl)  subtitleEl.textContent = panelData[i].subtitle;
    if (descEl)      descEl.textContent     = panelData[i].desc;
  });

  // ── TÍTULO PROJETOS ────────────────────────────
  const projTitle = document.getElementById('tituloembreve');
  if (projTitle) projTitle.textContent = t.projects_title;

  // ── TYPING PHRASES ─────────────────────────────
  // Atualiza o array global 'phrases' do script.js
  if (typeof phrases !== 'undefined' && Array.isArray(phrases)) {
    phrases.length = 0;
    t.typing_phrases.forEach(p => phrases.push(p));
  }

  // ── BOTÃO CONTATO ──────────────────────────────
  const contactBtn = document.getElementById('contact-button-text');
  if (contactBtn) contactBtn.textContent = t.contact_btn;

  // ── CARROSSEL CONTATO ──────────────────────────
  // Reutiliza a função do script.js
  if (typeof initializeCarousel === 'function') {
    initializeCarousel(t.carousel_text);
  }

  // ── BOTÕES ATIVOS ──────────────────────────────
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });

  localStorage.setItem('idioma', lang);
}

// ── INICIALIZAÇÃO ──────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => aplicarTraducao(btn.getAttribute('data-lang')));
  });

  // Restaura idioma salvo
  const salvo = localStorage.getItem('idioma');
  if (salvo && salvo !== 'pt') aplicarTraducao(salvo);
});