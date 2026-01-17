document.addEventListener('DOMContentLoaded', function() {

    /* ==========================================
       1. ANIMAÇÃO DE APARECIMENTO (SCROLL REVEAL)
       ========================================== */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));


    /* ==========================================
       2. NAVBAR MOBILE (FECHAR AO CLICAR)
       ========================================== */
    const navbarCollapse = document.getElementById('navbarNav');
    if (navbarCollapse) { // Verificação de segurança
        const navItems = navbarCollapse.querySelectorAll('.nav-link, .btn-cv');
        const bsCollapse = new bootstrap.Collapse(navbarCollapse, {toggle: false});

        navItems.forEach(item => {
            item.addEventListener('click', () => {
                if (navbarCollapse.classList.contains('show')) {
                    bsCollapse.hide();
                }
            });
        });
    }


    /* ==========================================
       3. HIGHLIGHT DO MENU ATIVO (SCROLL SPY)
       ========================================== */
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const headerOffset = 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // const sectionHeight = section.clientHeight; // (Não utilizado, mas ok manter)

            if (window.scrollY >= (sectionTop - headerOffset)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(currentSectionId)) {
                link.classList.add('active');
            }
        });
    });


    /* ==========================================
       4. DARK MODE TOGGLE (MIDNIGHT BLUE)
       ========================================== */
    const themeBtn = document.getElementById('themeToggle');
    // Só roda o script se o botão existir no HTML
    if (themeBtn) {
        const themeIcon = themeBtn.querySelector('i');
        const mainLogo = document.getElementById('mainLogo');
        
        const logoLightPath = './assets/img/ui/logodarkmode.png'; // Logo escura para fundo claro
        const logoDarkPath  = './assets/img/ui/logolightmode.png'; // Logo clara para fundo escuro

        function setTheme(theme) {
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);

            if (theme === 'dark') {
                themeIcon.classList.remove('bi-moon-fill');
                themeIcon.classList.add('bi-sun-fill');
                if(mainLogo) mainLogo.src = logoDarkPath;
            } else {
                themeIcon.classList.remove('bi-sun-fill');
                themeIcon.classList.add('bi-moon-fill');
                if(mainLogo) mainLogo.src = logoLightPath;
            }
        }

        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme) {
            setTheme(savedTheme);
        } else if (systemPrefersDark) {
            setTheme('dark');
        }

        themeBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }

});

/* ==========================================
   5. GOOGLE TRANSLATE CUSTOM TRIGGER
   (Fora do DOMContentLoaded para acesso global)
   ========================================== */
function triggerGoogleTranslate(lang) {
    const googleSelect = document.querySelector(".goog-te-combo");
    
    if (!googleSelect) {
        console.warn("Google Translate carregando... tentando novamente em 0.5s");
        setTimeout(() => triggerGoogleTranslate(lang), 500);
        return;
    }

    googleSelect.value = lang;
    googleSelect.dispatchEvent(new Event("change"));

    const headerBtn = document.getElementById('headerLangBtn');
    if (headerBtn) {
        headerBtn.innerHTML = `<i class="bi bi-translate"></i> ${lang.toUpperCase()}`;
    }
}
/* ==========================================
   6. CARROSSEL RESPONSIVO (1 card no mobile)
   ========================================== */
const carousel = document.querySelector('#projectCarousel');

if (carousel) {
    const carouselInner = carousel.querySelector('.carousel-inner');
    const originalItems = Array.from(carouselInner.children);

    function rebuildCarousel() {
        const isMobile = window.innerWidth < 768;

        carouselInner.innerHTML = '';

        if (isMobile) {
            // MOBILE → 1 card por slide
            originalItems.forEach(item => {
                const cards = item.querySelectorAll('.col-md-4');

                cards.forEach((card, index) => {
                    const slide = document.createElement('div');
                    slide.className = 'carousel-item';
                    if (carouselInner.children.length === 0) {
                        slide.classList.add('active');
                    }

                    const row = document.createElement('div');
                    row.className = 'row justify-content-center';

                    const col = card.cloneNode(true);
                    col.classList.remove('col-md-4');
                    col.classList.add('col-12');

                    row.appendChild(col);
                    slide.appendChild(row);
                    carouselInner.appendChild(slide);
                });
            });
        } else {
            // DESKTOP → estrutura original (3 por slide)
            originalItems.forEach((item, index) => {
                item.classList.remove('active');
                if (index === 0) item.classList.add('active');
                carouselInner.appendChild(item);
            });
        }
    }

    rebuildCarousel();
    window.addEventListener('resize', rebuildCarousel);
}
/* ==========================================
   7. SKILLS — NÍVEL ALEATÓRIO (>= 83%)
   Azul = +1 | Amarelo = -1
   ========================================== */
const progressBars = document.querySelectorAll('.progress-bar');

progressBars.forEach(bar => {
    const min = 89;
    const max = 97;

    const randomValue = Math.floor(Math.random() * (max - min + 1)) + min;

    bar.style.width = `${randomValue}%`;
});
