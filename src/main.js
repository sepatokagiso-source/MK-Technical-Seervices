// ===== MK Technical Services - Main JavaScript =====

// Import styles
import './style.css';

// ===== Navigation =====
class Navigation {
    constructor() {
        this.header = document.querySelector('.site-header');
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.navToggle = document.querySelector('.nav-link-toggle');
        this.navParent = document.querySelector('.nav-item-has-children');
        this.lastScrollY = 0;
        this.ticking = false;
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.onScroll(), { passive: true });

        if (this.hamburger) {
            this.hamburger.addEventListener('click', () => this.toggleMenu());
        }

        if (this.navToggle && this.navParent) {
            this.navToggle.addEventListener('click', (e) => {
                e.preventDefault();
                this.navParent.classList.toggle('open');
            });
        }

        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });

        this.setActiveLink();
    }

    onScroll() {
        if (!this.ticking) {
            requestAnimationFrame(() => {
                this.handleScroll();
                this.ticking = false;
            });
            this.ticking = true;
        }
    }

    handleScroll() {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 50) {
            this.header?.classList.add('scrolled');
        } else {
            this.header?.classList.remove('scrolled');
        }

        this.lastScrollY = currentScrollY;
    }

    toggleMenu() {
        this.navMenu?.classList.toggle('active');
        this.hamburger?.classList.toggle('active');
    }

    closeMenu() {
        this.navMenu?.classList.remove('active');
        this.hamburger?.classList.remove('active');
        this.navParent?.classList.remove('open');
    }

    setActiveLink() {
        const currentPage = window.location.pathname;
        document.querySelectorAll('.nav-menu a').forEach(link => {
            const href = link.getAttribute('href');
            if (!href || href === '#') return;
            if (currentPage === href || currentPage.includes(href)) {
                link.classList.add('active');
            }
        });
    }
}

// ===== Scroll Reveal Animation =====
class ScrollReveal {
    constructor() {
        this.elements = document.querySelectorAll('.reveal');
        this.init();
    }

    init() {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                    }
                });
            },
            { threshold: 0.1 }
        );

        this.elements.forEach(el => observer.observe(el));
    }
}

// ===== Form Validation =====
class FormValidator {
    constructor(formSelector) {
        this.form = document.querySelector(formSelector);
        if (this.form) this.init();
    }

    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        const modal = document.getElementById('thankYouModal');
        const okBtn = document.getElementById('thankYouOkBtn');
        const closeBtn = document.getElementById('thankYouCloseBtn');
        if (modal && okBtn) {
            this.showThankYouModal = () => {
                modal.style.display = 'flex';
                const hide = () => { modal.style.display = 'none'; okBtn.removeEventListener('click', hide); closeBtn.removeEventListener('click', hide); };
                okBtn.addEventListener('click', hide);
                closeBtn.addEventListener('click', hide);
                modal.addEventListener('click', (e) => { if (e.target === modal) hide(); });
            };
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);

        // Validate
        if (this.validate(data)) {
            this.submitForm(data);
        }
    }

    validate(data) {
        let isValid = true;

        // Email validation
        if (data.email && !this.isValidEmail(data.email)) {
            this.showError('email', 'Please enter a valid email');
            isValid = false;
        }

        // Phone validation
        if (data.phone && !this.isValidPhone(data.phone)) {
            this.showError('phone', 'Please enter a valid phone number');
            isValid = false;
        }

        return isValid;
    }

    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    isValidPhone(phone) {
        return /^[\d\s\-\+\(\)]+$/.test(phone);
    }

    showError(fieldName, message) {
        const field = this.form.querySelector(`[name="${fieldName}"]`);
        if (field) {
            const error = document.createElement('div');
            error.className = 'error-message';
            error.textContent = message;
            field.parentElement.appendChild(error);

            setTimeout(() => error.remove(), 3000);
        }
    }

    submitForm(data) {
        console.log('Form submitted:', data);
        if (this.form.id === 'contact-form' || this.form.id === 'quote-form') {
            const quoteSystem = window.MKTech?.quotes;
            if (quoteSystem) {
                quoteSystem.createQuote({
                    name: data.name || '',
                    email: data.email || '',
                    phone: data.phone || '',
                    service: data.service || 'General',
                    message: data.message || '',
                    source: this.form.id
                });
            }
        }
        this.showSuccess();
        this.showThankYouModal?.();
    }

    showSuccess() {
        const success = document.createElement('div');
        success.className = 'success-message';
        success.textContent = 'Thank you! We will contact you soon.';
        this.form.appendChild(success);
        this.form.reset();

        setTimeout(() => success.remove(), 5000);
    }
}

// ===== Authentication =====
class Auth {
    constructor() {
        this.currentUser = this.getCurrentUser();
    }

    getCurrentUser() {
        const user = localStorage.getItem('mktech_user');
        return user ? JSON.parse(user) : null;
    }

    login(email, password) {
        // In production, this would call your backend API
        const users = JSON.parse(localStorage.getItem('mktech_users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            localStorage.setItem('mktech_user', JSON.stringify(user));
            return { success: true, user };
        }

        return { success: false, error: 'Invalid credentials' };
    }

    register(userData) {
        const users = JSON.parse(localStorage.getItem('mktech_users') || '[]');

        // Check if user exists
        if (users.find(u => u.email === userData.email)) {
            return { success: false, error: 'Email already registered' };
        }

        // Add new user
        const newUser = {
            id: Date.now(),
            ...userData,
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        localStorage.setItem('mktech_users', JSON.stringify(users));

        return { success: true, user: newUser };
    }

    async createDefaultAdmin() {
        const users = JSON.parse(localStorage.getItem('mktech_users') || '[]');
        const adminExists = users.find(u => u.email === 'admin@mktechnicalservices.co.za');
        if (!adminExists) {
            const encoder = new TextEncoder();
            const data = encoder.encode('Cucaracha123');
            const hashBuffer = await crypto.subtle.digest('SHA-256', data);
            const hashedPassword = Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
            const defaultAdmin = {
                id: 1,
                name: 'Admin',
                email: 'admin@mktechnicalservices.co.za',
                password: hashedPassword,
                role: 'admin',
                createdAt: new Date().toISOString()
            };
            users.push(defaultAdmin);
            localStorage.setItem('mktech_users', JSON.stringify(users));
            console.log('Default admin account created: admin@mktechnicalservices.co.za / Cucaracha123');
        } else if (adminExists.password && adminExists.password.length !== 64) {
            const encoder = new TextEncoder();
            const data = encoder.encode('Cucaracha123');
            const hashBuffer = await crypto.subtle.digest('SHA-256', data);
            const hashedPassword = Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
            const idx = users.findIndex(u => u.email === 'admin@mktechnicalservices.co.za');
            users[idx].password = hashedPassword;
            localStorage.setItem('mktech_users', JSON.stringify(users));
            console.log('Admin password rehashed for compatibility');
        }
    }

    logout() {
        localStorage.removeItem('mktech_user');
        window.location.href = '/';
    }

    isAuthenticated() {
        return !!this.currentUser;
    }

    requireAuth() {
        if (!this.isAuthenticated()) {
            window.location.href = '/pages/login.html';
        }
    }
}

// ===== Quote System =====
class QuoteSystem {
    constructor() {
        this.quotes = this.getQuotes();
    }

    getQuotes() {
        return JSON.parse(localStorage.getItem('mktech_quotes') || '[]');
    }

    createQuote(quoteData) {
        const quote = {
            id: Date.now(),
            ...quoteData,
            status: 'pending',
            createdAt: new Date().toISOString()
        };

        this.quotes.push(quote);
        localStorage.setItem('mktech_quotes', JSON.stringify(this.quotes));

        return quote;
    }

    updateQuoteStatus(quoteId, status) {
        const quote = this.quotes.find(q => q.id === quoteId);
        if (quote) {
            quote.status = status;
            quote.updatedAt = new Date().toISOString();
            localStorage.setItem('mktech_quotes', JSON.stringify(this.quotes));
        }
    }

    getUserQuotes(userId) {
        return this.quotes.filter(q => q.userId === userId);
    }
}

// ===== Services Slider =====
class ServiceSlider {
    constructor(elementOrId) {
        this.slider = typeof elementOrId === 'string'
            ? document.getElementById(elementOrId)
            : elementOrId;

        if (!this.slider) return;

        this.slides = this.slider.querySelectorAll('.service-slide');
        this.dots = this.slider.querySelectorAll('.slider-dot');
        this.prevBtn = this.slider.querySelector('.slider-prev');
        this.nextBtn = this.slider.querySelector('.slider-next');
        this.progressBar = this.slider.querySelector('.slider-progress-bar');
        this.currentIndex = 0;
        this.slideInterval = 5000;
        this.timer = null;
        this.isHovering = false;

        this.init();
    }

    init() {
        if (!this.slides.length) return;

        this.showSlide(0);
        this.startAutoSlide();

        this.prevBtn?.addEventListener('click', () => this.prevSlide());
        this.nextBtn?.addEventListener('click', () => this.nextSlide());

        this.dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index, 10);
                this.goToSlide(index);
            });
        });

        this.slider.addEventListener('mouseenter', () => this.pauseAutoSlide());
        this.slider.addEventListener('mouseleave', () => this.resumeAutoSlide());

        this.slides.forEach(slide => {
            slide.addEventListener('mouseenter', () => {
                this.isHovering = true;
                this.pauseAutoSlide();
            });
            slide.addEventListener('mouseleave', () => {
                this.isHovering = false;
                this.resumeAutoSlide();
            });
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });
    }

    showSlide(index) {
        this.slides.forEach(slide => {
            slide.classList.remove('active');
            slide.style.animation = 'none';
        });
        this.dots.forEach(dot => dot.classList.remove('active'));

        const targetSlide = this.slides[index];
        if (targetSlide) {
            targetSlide.classList.add('active');
            void targetSlide.offsetWidth;
            targetSlide.style.animation = '';
        }
        this.dots[index]?.classList.add('active');
        this.currentIndex = index;
    }

    nextSlide() {
        const next = (this.currentIndex + 1) % this.slides.length;
        this.goToSlide(next);
    }

    prevSlide() {
        const prev = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prev);
    }

    goToSlide(index) {
        this.showSlide(index);
        this.resetProgress();
        this.restartAutoSlide();
    }

    startAutoSlide() {
        this.timer = setInterval(() => {
            if (!this.isHovering) {
                this.nextSlide();
            }
        }, this.slideInterval);
        this.resetProgress();
    }

    stopAutoSlide() {
        clearInterval(this.timer);
        this.timer = null;
    }

    pauseAutoSlide() {
        this.stopAutoSlide();
        if (this.progressBar) {
            this.progressBar.classList.remove('animating');
            this.progressBar.style.width = this.progressBar.style.width || '0%';
        }
    }

    resumeAutoSlide() {
        this.resetProgress();
        this.startAutoSlide();
    }

    restartAutoSlide() {
        this.stopAutoSlide();
        this.startAutoSlide();
    }

    resetProgress() {
        if (!this.progressBar) return;
        this.progressBar.classList.remove('animating');
        void this.progressBar.offsetWidth;
        this.progressBar.style.width = '0%';
        this.progressBar.classList.add('animating');
    }
}

// ===== Hero 3D Interactive =====
class Hero3D {
    constructor() {
        this.canvas = document.getElementById('hero-canvas');
        this.section = document.querySelector('.hero-3d-section');
        this.tags = document.querySelectorAll('.service-tag');
        this.dot = document.getElementById('heroOrbitDot');
        this.path = document.getElementById('heroOrbitPath');
        this.activeIndex = 0;

        if (!this.canvas || !this.section) return;

        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.mesh = null;
        this.isHovering = false;

        this.init();
    }

    init() {
        this.setupThree();
        this.setupLights();
        this.createHeroObject();
        this.bindEvents();
        this.animate();
    }

    setupThree() {
        const rect = this.canvas.parentElement.getBoundingClientRect();
        const width = rect.width || 600;
        const height = rect.height || 500;

        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        this.camera.position.z = 5;

        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, alpha: true, antialias: true });
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }

    setupLights() {
        const ambient = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambient);

        const spotLight = new THREE.SpotLight(0x00E5FF, 1.2);
        spotLight.position.set(5, 8, 5);
        spotLight.angle = Math.PI / 4;
        spotLight.penumbra = 0.3;
        this.scene.add(spotLight);

        const blueLight = new THREE.PointLight(0x0052FF, 0.8, 20);
        blueLight.position.set(-5, 2, 3);
        this.scene.add(blueLight);
    }

    createHeroObject() {
        const geometry = new THREE.TorusKnotGeometry(1.2, 0.35, 180, 32);
        const material = new THREE.MeshPhysicalMaterial({
            color: 0x1A1A1A,
            metalness: 0.95,
            roughness: 0.15,
            clearcoat: 1,
            clearcoatRoughness: 0.1,
            reflectivity: 1,
        });
        this.mesh = new THREE.Mesh(geometry, material);
        this.scene.add(this.mesh);
    }

    bindEvents() {
        this.tags.forEach(tag => {
            tag.addEventListener('mouseenter', () => {
                const index = parseInt(tag.dataset.index, 10);
                this.activateService(index);
            });

            tag.addEventListener('mouseleave', () => {
                this.isHovering = false;
            });
        });

        this.canvas.parentElement.addEventListener('mouseenter', () => {
            this.isHovering = true;
        });

        this.canvas.parentElement.addEventListener('mouseleave', () => {
            this.isHovering = false;
        });

        window.addEventListener('resize', () => this.handleResize());
    }

    activateService(index) {
        this.activeIndex = index;
        this.isHovering = true;

        this.tags.forEach((tag, i) => {
            if (i === index) {
                tag.classList.add('active');
            } else {
                tag.classList.remove('active');
            }
        });

        if (typeof gsap !== 'undefined' && this.mesh) {
            const targetRotation = index * (Math.PI / 2);
            gsap.to(this.mesh.rotation, {
                y: targetRotation,
                duration: 1.2,
                ease: 'power2.out'
            });
        }

        this.animateOrbitalDot(index);
    }

    animateOrbitalDot(index) {
        if (!this.path || !this.dot) return;

        const pathLength = this.path.getTotalLength ? this.path.getTotalLength() : 1257;
        const segmentLength = pathLength / this.tags.length;
        const startOffset = index * segmentLength;
        const endOffset = startOffset + segmentLength;

        if (typeof gsap !== 'undefined') {
            gsap.fromTo(this.dot, 
                { motionPath: { path: this.path, start: startOffset / pathLength, end: startOffset / pathLength } },
                { motionPath: { path: this.path, start: startOffset / pathLength, end: endOffset / pathLength }, duration: 1.2, ease: 'power2.out' }
            );
        }
    }

    handleResize() {
        const rect = this.canvas.parentElement.getBoundingClientRect();
        const width = rect.width || 600;
        const height = rect.height || 500;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        if (this.mesh && !this.isHovering) {
            this.mesh.rotation.y += 0.004;
        }

        this.renderer.render(this.scene, this.camera);
    }
}

// ===== Orbit Services =====
class OrbitServices {
    constructor() {
        this.section = document.getElementById('orbitServices');
        if (!this.section) return;

        this.spacer = this.section.querySelector('.orbit-spacer');
        this.sticky = this.section.querySelector('.orbit-sticky');
        this.dot = document.getElementById('orbitDot');
        this.arc = document.getElementById('orbitActiveArc');
        this.logo = document.getElementById('logo3d');
        this.nodes = this.section.querySelectorAll('.orbit-node');

        this.centerX = 400;
        this.centerY = 400;
        this.radius = 280;
        this.circumference = 2 * Math.PI * this.radius;
        this.isHovering = false;
        this.currentProgress = 0;

        this.init();
    }

    init() {
        if (!this.spacer || !this.sticky) return;

        this.nodes.forEach(node => {
            node.addEventListener('click', () => {
                const index = parseInt(node.dataset.index, 10);
                this.scrollToNode(index);
            });

            node.addEventListener('mouseenter', () => {
                this.isHovering = true;
            });

            node.addEventListener('mouseleave', () => {
                this.isHovering = false;
            });
        });

        this.sticky.addEventListener('mouseenter', () => {
            this.isHovering = true;
        });

        this.sticky.addEventListener('mouseleave', () => {
            this.isHovering = false;
        });

        window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
        this.handleScroll();
    }

    handleScroll() {
        const rect = this.spacer.getBoundingClientRect();
        const spacerHeight = this.spacer.offsetHeight;
        const windowHeight = window.innerHeight;

        const start = rect.top;
        const total = spacerHeight - windowHeight;

        if (total <= 0) return;

        let progress = (0 - start) / total;
        progress = Math.max(0, Math.min(1, progress));

        this.currentProgress = progress;
        this.updateOrbit(progress);
    }

    updateOrbit(progress) {
        const angleDeg = -90 + progress * 360;
        const angleRad = (angleDeg * Math.PI) / 180;

        const x = this.centerX + this.radius * Math.cos(angleRad);
        const y = this.centerY + this.radius * Math.sin(angleRad);

        if (this.dot) {
            this.dot.setAttribute('cx', x);
            this.dot.setAttribute('cy', y);
        }

        if (this.arc) {
            const offset = this.circumference * (1 - progress);
            this.arc.style.strokeDashoffset = offset;
        }

        if (this.logo) {
            const rotation = progress * 360;
            this.logo.style.transform = `rotateY(${rotation}deg)`;
        }

        const activeIndex = Math.floor(progress * this.nodes.length) % this.nodes.length;
        this.nodes.forEach((node, i) => {
            if (i === activeIndex) {
                node.classList.add('active');
            } else {
                node.classList.remove('active');
            }
        });
    }

    scrollToNode(index) {
        const targetNode = this.nodes[index];
        if (!targetNode) return;

        const rect = this.spacer.getBoundingClientRect();
        const spacerHeight = this.spacer.offsetHeight;
        const windowHeight = window.innerHeight;
        const total = spacerHeight - windowHeight;

        const targetProgress = (index + 0.5) / this.nodes.length;
        const targetScroll = window.scrollY + rect.top - (total * (1 - targetProgress));

        window.scrollTo({
            top: targetScroll,
            behavior: 'smooth'
        });
    }
}

// ===== Service Marquee Slider =====
function horizontalLoop(items, config) {
    const ctx = {
        items: gsap.utils.toArray(items),
        speed: (config && config.speed) || 1,
        paddingRight: (config && config.paddingRight) || 0,
        repeat: (config && config.repeat) !== undefined ? config.repeat : -1,
        paused: false
    };

    const tl = gsap.to(ctx.items, {
        xPercent: -100,
        ease: 'none',
        duration: ctx.items.length * ctx.speed,
        repeat: ctx.repeat
    });

    ctx.pause = () => { tl.pause(); ctx.paused = true; };
    ctx.play = () => { tl.play(); ctx.paused = false; };

    return ctx;
}

class MarqueeSlider {
    constructor() {
        this.track = document.querySelector('.marquee-slider-track');
        this.wrapper = document.querySelector('.marquee-slider-wrapper');
        if (!this.track || !this.wrapper) return;

        this.cards = this.track.querySelectorAll('.accordion-card');
        this.loop = null;
        this.init();
    }

    init() {
        if (typeof gsap === 'undefined') return;

        this.loop = horizontalLoop(this.cards, {
            speed: 0.8,
            paddingRight: 16,
            repeat: -1
        });

        this.cards.forEach(card => {
            const content = card.querySelector('.card-content');

            card.addEventListener('mouseenter', () => {
                if (this.loop) {
                    this.loop.pause();
                }

                gsap.to(card, {
                    width: 440,
                    flexGrow: 2,
                    duration: 0.5,
                    ease: 'power2.out'
                });

                if (content) {
                    gsap.to(content, {
                        opacity: 1,
                        y: 0,
                        duration: 0.4,
                        delay: 0.2
                    });
                }
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    width: 320,
                    flexGrow: 1,
                    duration: 0.5,
                    ease: 'power2.out'
                });

                if (content) {
                    gsap.to(content, {
                        opacity: 0,
                        y: 20,
                        duration: 0.3
                    });
                }

                if (this.loop) {
                    this.loop.play();
                }
            });
        });
    }
}

// ===== Upload Zone =====
class UploadZone {
    constructor(selector) {
        this.zone = document.querySelector(selector);
        if (!this.zone) return;
        this.input = this.zone.querySelector('.upload-zone-input');
        this.filesList = document.getElementById('uploadedFilesList');
        this.filesUl = document.getElementById('uploadedFilesUl');
        this.submitBtn = document.getElementById('submitTenderBtn');
        this.uploadedFiles = [];
        this.allowedTypes = ['application/dwg', 'application/pdf', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv', 'application/vnd.ms-excel'];
        this.allowedExtensions = ['.dwg', '.pdf', '.xlsx', '.xls', '.csv'];
        this.init();
    }

    init() {
        if (!this.zone) return;

        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            this.zone.addEventListener(eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
            });
        });

        ['dragenter', 'dragover'].forEach(eventName => {
            this.zone.addEventListener(eventName, () => this.zone.classList.add('drag-over'));
        });

        ['dragleave', 'drop'].forEach(eventName => {
            this.zone.addEventListener(eventName, () => this.zone.classList.remove('drag-over'));
        });

        this.zone.addEventListener('drop', (e) => {
            const files = e.dataTransfer.files;
            this.handleFiles(files);
        });

        this.zone.addEventListener('click', () => this.input.click());

        this.zone.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.input.click();
            }
        });

        this.input.addEventListener('change', () => {
            this.handleFiles(this.input.files);
            this.input.value = '';
        });

        if (this.submitBtn) {
            this.submitBtn.addEventListener('click', () => this.handleSubmit());
        }
    }

    handleFiles(files) {
        if (!files || files.length === 0) return;

        Array.from(files).forEach(file => {
            const ext = '.' + file.name.split('.').pop().toLowerCase();
            if (!this.allowedExtensions.includes(ext)) {
                alert(`Invalid file type: ${file.name}. Allowed types: .dwg, .pdf, .xlsx, .xls, .csv`);
                return;
            }

            if (file.size > 50 * 1024 * 1024) {
                alert(`File too large: ${file.name}. Maximum size: 50MB.`);
                return;
            }

            this.uploadedFiles.push(file);
        });

        this.renderFilesList();
    }

    renderFilesList() {
        if (this.uploadedFiles.length === 0) {
            this.filesList.style.display = 'none';
            return;
        }

        this.filesList.style.display = 'block';
        this.filesUl.innerHTML = '';

        this.uploadedFiles.forEach((file, index) => {
            const ext = file.name.split('.').pop().toLowerCase();
            const iconMap = {
                'dwg': 'fa-drafting-compass',
                'pdf': 'fa-file-pdf',
                'xlsx': 'fa-file-excel',
                'xls': 'fa-file-excel',
                'csv': 'fa-file-csv'
            };
            const icon = iconMap[ext] || 'fa-file';
            const size = this.formatFileSize(file.size);

            const li = document.createElement('li');
            li.className = 'uploaded-file-item';
            li.innerHTML = `
                <i class="fas ${icon}"></i>
                <span class="file-name" title="${file.name}">${file.name}</span>
                <span class="file-size">${size}</span>
                <button type="button" class="remove-file" data-index="${index}" aria-label="Remove file">
                    <i class="fas fa-times"></i>
                </button>
            `;
            this.filesUl.appendChild(li);
        });

        this.filesUl.querySelectorAll('.remove-file').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.currentTarget.dataset.index);
                this.uploadedFiles.splice(index, 1);
                this.renderFilesList();
            });
        });
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    handleSubmit() {
        if (this.uploadedFiles.length === 0) {
            alert('Please upload at least one BOQ file before submitting.');
            return;
        }

        const formData = new FormData();
        this.uploadedFiles.forEach(file => formData.append('boq_files', file));

        alert('Thank you! Your tender documents have been received. Our team will review and respond within 24 hours.');
        this.uploadedFiles = [];
        this.renderFilesList();
    }
}

// ===== Initialize on DOM Load =====
document.addEventListener('DOMContentLoaded', async () => {
    // Initialize navigation
    new Navigation();

    // Initialize scroll reveal
    new ScrollReveal();

    // Initialize upload zone (contact page)
    new UploadZone('#uploadZone');

    // Initialize form validation for contact forms
    new FormValidator('#contact-form');
    new FormValidator('#quote-form');

    // Initialize services sliders
    new ServiceSlider('servicesSlider');
    new ServiceSlider('homeServicesSlider');

    // Initialize hero 3D
    new Hero3D();

    // Initialize marquee services
    new MarqueeSlider();

    // Initialize orbit services
    new OrbitServices();

    // Make Auth and QuoteSystem available globally
    window.MKTech = {
        auth: new Auth(),
        quotes: new QuoteSystem()
    };

    // Create default admin if not exists
    await window.MKTech.auth.createDefaultAdmin();

    // Click-to-call functionality
    document.querySelectorAll('[data-call]').forEach(btn => {
        btn.addEventListener('click', () => {
            window.location.href = 'tel:+27126552343';
        });
    });

    // WhatsApp integration
    document.querySelectorAll('[data-whatsapp]').forEach(btn => {
        btn.addEventListener('click', () => {
            window.open('https://wa.me/27126552343', '_blank');
        });
    });

    // Stats Counter
    new StatsCounter();

    // Hero Metrics Counter
    new MetricsCounter();

    // Parallax
    new Parallax();

    // Hover Glow
    new HoverGlow();
});

// ===== Stats Counter =====
class StatsCounter {
    constructor() {
        this.items = document.querySelectorAll('.stat-number');
        this.observed = new Set();
        this.init();
    }

    init() {
        if (!this.items.length) return;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.observed.has(entry.target)) {
                    this.observed.add(entry.target);
                    this.animateCount(entry.target);
                }
            });
        }, { threshold: 0.5 });

        this.items.forEach(item => observer.observe(item));
    }

    animateCount(el) {
        const target = parseInt(el.getAttribute('data-target'), 10);
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 2000;
        const start = performance.now();

        const tick = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * target);
            el.textContent = current + suffix;
            if (progress < 1) {
                requestAnimationFrame(tick);
            } else {
                el.textContent = target + suffix;
            }
        };

        requestAnimationFrame(tick);
    }
}

// ===== Hero Metrics Counter =====
class MetricsCounter {
    constructor() {
        this.bar = document.querySelector('.hero-metrics-bar');
        if (!this.bar) return;

        this.values = this.bar.querySelectorAll('.hero-metric-value[data-target]');
        this.observed = new Set();
        this.init();
    }

    init() {
        if (!this.values.length) return;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateAll();
                    observer.disconnect();
                }
            });
        }, { threshold: 0.3 });

        observer.observe(this.bar);
    }

    animateAll() {
        this.values.forEach((el, i) => {
            const target = parseInt(el.getAttribute('data-target'), 10);
            const suffix = el.getAttribute('data-suffix') || '';
            const prefix = el.getAttribute('data-prefix') || '';
            const duration = 1800;
            const delay = i * 150;
            const start = performance.now() + delay;

            const tick = (now) => {
                const elapsed = now - start;
                if (elapsed < 0) {
                    requestAnimationFrame(tick);
                    return;
                }

                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(eased * target);
                el.textContent = prefix + current + suffix;
                if (progress < 1) {
                    requestAnimationFrame(tick);
                } else {
                    el.textContent = prefix + target + suffix;
                }
            };

            requestAnimationFrame(tick);
        });
    }
}

// ===== Parallax =====
class Parallax {
    constructor() {
        this.items = document.querySelectorAll('.parallax');
        if (!this.items.length) return;
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
        this.handleScroll();
    }

    handleScroll() {
        const scrollY = window.scrollY;
        this.items.forEach(el => {
            const speed = parseFloat(el.getAttribute('data-speed')) || 0.3;
            const offset = scrollY * speed;
            el.style.transform = `translateY(${offset}px)`;
        });
    }
}

// ===== Hover Glow =====
class HoverGlow {
    constructor() {
        this.items = document.querySelectorAll('.glow-card');
        this.init();
    }

    init() {
        this.items.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                card.style.setProperty('--mouse-x', x + '%');
                card.style.setProperty('--mouse-y', y + '%');
            });
        });
    }
}

// Export for use in other modules
export { Navigation, ScrollReveal, FormValidator, Auth, QuoteSystem, StatsCounter, Parallax, HoverGlow, ServiceSlider, OrbitServices, Hero3D, MarqueeSlider, MetricsCounter, UploadZone };
