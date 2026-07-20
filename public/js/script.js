document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if(hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Toggle Icon
            const icon = hamburger.querySelector('i');
            if(navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Make Cursos button navigate to /#formacion on desktop, toggle on mobile
    const cursosBtn = document.getElementById('cursos-btn');
    if (cursosBtn) {
        cursosBtn.addEventListener('click', (e) => {
            if (window.innerWidth <= 991) {
                e.preventDefault();
                e.stopPropagation();
                const dropdown = cursosBtn.closest('.nav-dropdown');
                const isOpen = dropdown.classList.toggle('open');
                cursosBtn.setAttribute('aria-expanded', isOpen);
            } else {
                window.location.href = '/#formacion';
            }
        });
    }

    // Close mobile menu when clicking a link
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = hamburger.querySelector('i');
            if(icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Observe elements with fade-in and fade-in-up classes
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-up');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // =========================================
    // Lógica del Carrusel (Hero Section)
    // =========================================
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-indicator');
    const prevBtn = document.querySelector('.btn-prev');
    const nextBtn = document.querySelector('.btn-next');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        if (index >= slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = index;
        }

        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        if (slides[currentSlide]) slides[currentSlide].classList.add('active');
        if (dots[currentSlide]) dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    function startSlideShow() {
        stopSlideShow();
        slideInterval = setInterval(nextSlide, 5000);
    }

    function stopSlideShow() {
        if (slideInterval) {
            clearInterval(slideInterval);
        }
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            startSlideShow();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            startSlideShow();
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            startSlideShow();
        });
    });

    // Iniciar auto-carrusel si hay diapositivas
    if (slides.length > 0) {
        startSlideShow();
    }

    // =========================================
    // Lógica de Filtros de Proyectos (Sub-pestañas)
    // =========================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.grid .card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');

                // Efecto de desvanecimiento premium
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95)';

                setTimeout(() => {
                    if (filterValue === 'all' || category === filterValue) {
                        card.classList.remove('hidden');
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        card.classList.add('hidden');
                    }
                }, 300); // Coincide con la transición CSS
            });
        });
    });

    // =========================================
    // Datos Extendidos de Proyectos
    // =========================================
    const projectsData = {
        p1: {
            title: "Dashboard Básico Power BI",
            category: "Power BI",
            img: "/img/projects/proyecto_powerbi_dashboard.png",
            desc: "Un tablero introductorio interactivo diseñado en Power BI para el control operativo e institucional. Permite monitorizar métricas comerciales y de ventas en tiempo real, facilitando la toma de decisiones basada en datos para perfiles técnicos y gerenciales.",
            tools: ["Power BI", "Power Query", "Modelado de datos", "Excel"],
            courseUrl: "/cursos/powerbi",
            courseName: "Curso: Power BI Avanzado & Storytelling"
        },
        p2: {
            title: "Optimización & Modelado SQL",
            category: "SQL",
            img: "/img/projects/sql_project.png",
            desc: "Solución de base de datos relacional para una corporación de venta al por menor. Incluye la creación del diagrama entidad-relación (DER), normalización en tercera forma normal (3FN) y optimización de consultas complejas. Se diseñaron consultas que emplean funciones de ventana y agregaciones avanzadas para proveer a los analistas de negocio de reportes de rentabilidad y segmentación RFM rápidos.",
            tools: ["PostgreSQL", "DBeaver", "SQL Server", "ETL"],
            courseUrl: "/cursos/sql",
            courseName: "Curso: SQL para Análisis de Datos"
        },
        p3: {
            title: "Automatización CRM & WhatsApp",
            category: "n8n",
            img: "/img/projects/proyecto_n8n_flow.webp",
            desc: "Flujo de integración y automatización empresarial diseñado en n8n. El proceso intercepta registros de formularios web, valida y enriquece la información con APIs externas, la indexa en el CRM de HubSpot y dispara automáticamente mensajes personalizados a través de WhatsApp Webhook y correos transaccionales, reduciendo el tiempo de respuesta comercial a cero.",
            tools: ["n8n", "APIs", "HubSpot", "WhatsApp API", "Webhooks"],
            courseUrl: "/ruta-analista",
            courseName: "Especialización: Analista de Datos"
        },
        p4: {
            title: "Arquitectura de Medallón Lakehouse",
            category: "Integral",
            img: "/img/projects/proyecto_medallon.png",
            desc: "Implementación moderna de arquitectura Medallón (Bronze, Silver y Gold) en un entorno de lago de datos. Garantiza la calidad de los datos a través de pipelines de limpieza y estructuración secuencial, preparando la información para analítica avanzada y reportería ejecutiva confiable.",
            tools: ["n8n", "PostgreSQL", "SQL Server", "ETL", "Data Lake"],
            courseUrl: "/ruta-analista",
            courseName: "Especialización: Ingeniería & Analítica de Datos"
        },
        p5: {
            title: "Proyecto Business Intelligence",
            category: "Power BI",
            img: "/img/projects/proyecto_powerbi_bi.png",
            desc: "Tablero analítico comercial integral que analiza las ventas de una cadena de retail nacional. Proporciona visualización detallada por sucursal, rendimiento de gerentes, análisis de canasta de compra e incorpora modelos en DAX para proyectar y controlar los indicadores estratégicos del negocio.",
            tools: ["Power BI", "DAX", "Modelado en Estrella", "Data Wrangling"],
            courseUrl: "/cursos/powerbi",
            courseName: "Curso: Power BI Avanzado & Storytelling"
        },
        p6: {
            title: "Dashboard Gerencial Power BI",
            category: "Integral",
            img: "/img/projects/proyecto_powerbi_hero.png",
            desc: "El proyecto insignia de visualización. Un desarrollo de dashboard gerencial interactivo de alto nivel que consume datos transaccionales previamente procesados y cargados. Diseñado bajo las mejores prácticas de Storytelling y UI/UX, permite a directivos evaluar la salud comercial e ingresos a golpe de vista.",
            tools: ["Power BI", "DAX", "SQL Server", "ETL", "Storytelling"],
            courseUrl: "/ruta-analista",
            courseName: "Especialización: Ingeniería & Analítica de Datos"
        }
    };

    // =========================================
    // Lógica de Ventanas Modales (Proyectos)
    // =========================================
    const modal = document.getElementById('project-modal');
    const modalClose = document.querySelector('.modal-close');
    const viewDetailButtons = document.querySelectorAll('.view-detail-btn');

    // Elementos del Modal a rellenar
    const modalImg = document.getElementById('modal-project-img');
    const modalBadge = document.getElementById('modal-project-badge');
    const modalTitle = document.getElementById('modal-project-title');
    const modalDesc = document.getElementById('modal-project-desc');
    const modalToolsContainer = document.getElementById('modal-project-tools');
    const modalCourseBtn = document.getElementById('modal-course-link-btn');

    let currentRelCourseUrl = ''; // Almacena la URL del curso relacionado

    function openProjectModal(projectId) {
        const project = projectsData[projectId];
        if (!project) return;

        // Rellenar contenido con WebP si disponible
        const modalImgWebp = document.getElementById('modal-project-img-webp');
        if (modalImgWebp) {
            if (project.img.endsWith('.webp')) {
                modalImgWebp.srcset = project.img;
            } else if (project.img.includes('sql_project')) {
                modalImgWebp.srcset = project.img.replace('.png', '.webp');
            } else {
                modalImgWebp.removeAttribute('srcset');
            }
        }
        modalImg.src = project.img;
        modalImg.alt = project.title;
        modalBadge.textContent = project.category;
        modalTitle.textContent = project.title;
        modalDesc.textContent = project.desc;

        // Herramientas
        modalToolsContainer.innerHTML = '';
        project.tools.forEach(tool => {
            const span = document.createElement('span');
            span.textContent = tool;
            modalToolsContainer.appendChild(span);
        });

        // Configurar botón CTA de curso
        currentRelCourseUrl = project.courseUrl;
        modalCourseBtn.innerHTML = `Ver ${project.courseName} <i class="fas fa-graduation-cap"></i>`;

        // Activar modal
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Evitar scroll de fondo
        }
    }

    function closeProjectModal() {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = ''; // Restaurar scroll
        }
    }

    // Eventos
    viewDetailButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = btn.getAttribute('data-project-id');
            openProjectModal(projectId);
        });
    });

    if (modalClose) {
        modalClose.addEventListener('click', closeProjectModal);
    }

    // Cerrar al hacer clic fuera del contenido
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeProjectModal();
            }
        });
    }

    // Cerrar con tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeProjectModal();
        }
    });

    // =========================================
    // Redirección a Cursos Relacionados
    // =========================================
    if (modalCourseBtn) {
        modalCourseBtn.addEventListener('click', () => {
            if (!currentRelCourseUrl) return;
            closeProjectModal();
            window.location.href = currentRelCourseUrl;
        });
    }

    // =========================================
    // Lógica de Modo Oscuro (Dark Mode)
    // =========================================
    const themeToggleBtns = document.querySelectorAll('#theme-toggle');
    const htmlElement = document.documentElement;

    function updateToggleIcons(isDark) {
        themeToggleBtns.forEach(btn => {
            const icon = btn.querySelector('i');
            if (icon) {
                if (isDark) {
                    icon.className = 'fas fa-sun';
                } else {
                    icon.className = 'fas fa-moon';
                }
            }
        });
    }

    // Comprobar estado inicial del tema al cargar
    const isDarkTheme = htmlElement.classList.contains('dark-theme');
    updateToggleIcons(isDarkTheme);

    // Evento para alternar modo oscuro
    themeToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const isCurrentlyDark = htmlElement.classList.toggle('dark-theme');
            
            if (isCurrentlyDark) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
            
            updateToggleIcons(isCurrentlyDark);
        });
    });

    // =========================================
    // Lógica del Catálogo de Cursos (Pestañas)
    // =========================================
    const catalogTabBtns = document.querySelectorAll('.catalog-tab-btn');
    const catalogTabPanels = document.querySelectorAll('.catalog-tab-panel');

    catalogTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            catalogTabBtns.forEach(b => b.classList.remove('active'));
            catalogTabPanels.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab');
            const targetPanel = document.getElementById(tabId);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
});
