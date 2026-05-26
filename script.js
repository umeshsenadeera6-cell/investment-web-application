(function () {
    // ========== FOUR SECTIONS BASE DATA & STYLING ==========
    const PLANS_DATA = [
        {
            name: 'High Profit Plan',
            icon: 'fas fa-chart-line',
            iconBg: 'rgba(245, 158, 11, 0.12)',
            iconColor: '#f59e0b',
            badge: 'High Yield 📈',
            meta: 'Flexible high-profit projections'
        },
        {
            name: 'Green Saving Plan',
            icon: 'fas fa-leaf',
            iconBg: 'rgba(16, 185, 129, 0.12)',
            iconColor: '#10b981',
            badge: 'Eco Friendly 🍃',
            meta: 'Green sustainable development'
        },
        {
            name: 'Silver Plan',
            icon: 'fas fa-coins',
            iconBg: 'rgba(161, 161, 170, 0.12)',
            iconColor: '#a1a1aa',
            badge: 'Conservative 🥈',
            meta: 'Secure silver reserves tier'
        },
        {
            name: 'Gold Plan',
            icon: 'fas fa-crown',
            iconBg: 'rgba(251, 191, 36, 0.12)',
            iconColor: '#fbbf24',
            badge: 'Premium Gold 👑',
            meta: 'Premium gold tier reserves'
        }
    ];

    // ========== RENDER MAIN APP DASHBOARD ==========
    function renderFourSections() {
        const cardsHTML = PLANS_DATA.map(plan => {
            return `
                <div class="plan-card" data-plan="${plan.name}">
                    <div class="plan-card-header">
                        <div class="plan-icon-bg" style="background: ${plan.iconBg}; color: ${plan.iconColor};">
                            <i class="${plan.icon}"></i>
                        </div>
                        <span class="status-badge">${plan.badge}</span>
                    </div>
                    <div class="plan-title">${plan.name}</div>
                    <div class="plan-card-meta">${plan.meta}</div>
                    
                    <div class="card-action-bar">
                        <div class="click-text">Configure Plan & View Breakdown <i class="fas fa-arrow-right"></i></div>
                    </div>
                </div>
            `;
        }).join('');

        const mainHTML = `
            <div class="app-container" id="appContainer">
                <div class="brand-header">
                    <div class="brand-title-group">
                        <img src="images/logo.png" alt="Logo" class="main-logo">
                        <h1>Serendib Green Plantation</h1>
                    </div>
                    <div class="client-session-card">
                        <i class="fas fa-user-shield"></i>
                        <span>🔑 Verified SGS Partner Session</span>
                    </div>
                </div>

                <div class="plans-grid">
                    ${cardsHTML}
                </div>
                <div class="minimal-footer">
                    <i class="fas fa-shield-halved"></i> Serendib Green Plantation. Smart. Secure. Scaled.
                </div>
            </div>
        `;

        const root = document.getElementById('app-root');
        root.innerHTML = mainHTML;

        // Staggered layout entrance animation
        setTimeout(() => {
            const container = document.getElementById('appContainer');
            if (container) {
                container.classList.add('visible');
                container.classList.add('fade-transition');
            }
        }, 100);

        // Click routing for plan details
        const cards = document.querySelectorAll('.plan-card');
        cards.forEach(card => {
            card.addEventListener('click', function () {
                const planName = this.getAttribute('data-plan');

                // Route to details
                if (planName === 'High Profit Plan') {
                    window.location.href = 'high-profit.html';
                } else if (planName === 'Green Saving Plan') {
                    window.location.href = 'green-saving.html';
                } else if (planName === 'Silver Plan') {
                    window.location.href = 'silver-plan.html';
                } else if (planName === 'Gold Plan') {
                    window.location.href = 'gold-plan.html';
                }

                // Smooth scale compression haptic
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    if (this) this.style.transform = '';
                }, 150);
            });
        });
    }

    // ========== DIRECT RENDER SPA VISIBILITY TRANSITIONS ==========
    function addPageTransitionOnVisibility() {
        let wasHidden = false;
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible' && wasHidden) {
                const container = document.getElementById('appContainer');
                if (container) {
                    container.style.animation = 'none';
                    container.offsetHeight; // force Reflow
                    container.style.animation = 'pageReveal 0.5s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards';
                    setTimeout(() => {
                        if (container) container.style.animation = '';
                    }, 500);
                }
            }
            wasHidden = document.visibilityState === 'hidden';
        });
    }

    // ========== ACCESS AUTHENTICATION SYSTEM ==========
    function initLogin() {
        const loginOverlay = document.getElementById('loginOverlay');
        const loginBtn = document.getElementById('loginBtn');
        const loginInput = document.getElementById('verificationCode');
        const errorMsg = document.getElementById('loginError');

        if (!loginOverlay || !loginBtn || !loginInput) return;

        loginOverlay.style.display = 'flex';

        function validateAndLogin() {
            const code = loginInput.value.trim().toUpperCase();

            // SGS verification code logic check (SGS001 - SGS700)
            const isValidFormat = /^SGS\d{3,4}$/.test(code);
            let isValidRange = false;

            if (isValidFormat) {
                const numPart = parseInt(code.substring(3), 10);
                if (numPart >= 1 && numPart <= 700) {
                    isValidRange = true;
                }
            }

            if (isValidRange) {
                // Success entry
                errorMsg.classList.remove('visible');
                loginInput.classList.remove('shake');
                sessionStorage.setItem('serendib_auth', 'true');

                // Modern visual transition exit
                const loginCard = document.querySelector('.login-card');
                if (loginCard) loginCard.classList.add('success-anim');

                setTimeout(() => {
                    loginOverlay.style.opacity = '0';
                    setTimeout(() => {
                        loginOverlay.style.display = 'none';
                        renderFourSections();
                        const container = document.getElementById('appContainer');
                        if (container) container.classList.add('zoom-in-reveal');
                        addPageTransitionOnVisibility();
                    }, 400);
                }, 300);
            } else {
                // Verification fail
                errorMsg.classList.add('visible');
                loginInput.classList.add('shake');
                setTimeout(() => {
                    loginInput.classList.remove('shake');
                }, 500);
            }
        }

        loginBtn.addEventListener('click', validateAndLogin);
        loginInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') validateAndLogin();
        });

        // Restricted characters (alphanumeric constraint + uppercase auto correction)
        loginInput.addEventListener('input', (e) => {
            const start = e.target.selectionStart;
            const end = e.target.selectionEnd;
            let val = e.target.value;
            const cleanVal = val.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();

            if (val !== cleanVal) {
                e.target.value = cleanVal;
                e.target.setSelectionRange(start, end);
            } else {
                e.target.value = cleanVal;
            }
        });

        setTimeout(() => loginInput.focus(), 100);
    }

    // ========== PROGRESS BAR ANIMATION ==========
    function startLoadingProgress() {
        const progressBar = document.getElementById('loadingProgressBar');
        if (!progressBar) return;

        let progress = 0;
        const duration = 1500;
        const interval = 30;
        const increment = (100 / (duration / interval));

        const loader = setInterval(() => {
            progress += increment + (Math.random() * 2.5);
            if (progress >= 100) {
                progress = 100;
                clearInterval(loader);
            }
            progressBar.style.width = progress + '%';
        }, interval);
    }

    // Launch initial page sequence
    startLoadingProgress();
    setTimeout(() => {
        const loadingOverlay = document.getElementById('loadingOverlay');
        if (loadingOverlay) {
            loadingOverlay.classList.add('hidden');
        }

        if (sessionStorage.getItem('serendib_auth') === 'true') {
            renderFourSections();
            const container = document.getElementById('appContainer');
            if (container) container.classList.add('zoom-in-reveal');
            addPageTransitionOnVisibility();
        } else {
            initLogin();
        }
    }, 1500);

    // Apply fluid staggered animation on plan loading
    const style = document.createElement('style');
    style.textContent = `
        .plan-card {
            animation: cardGlowIn 0.5s ease-out backwards;
            animation-delay: calc(var(--order, 0) * 0.1s);
        }
    `;
    document.head.appendChild(style);

    const observeRender = new MutationObserver((mutations) => {
        mutations.forEach(() => {
            const cards = document.querySelectorAll('.plan-card');
            cards.forEach((card, idx) => {
                card.style.setProperty('--order', idx);
                card.style.animation = 'cardGlowIn 0.5s ease-out backwards';
                card.style.animationDelay = `${idx * 0.08}s`;
            });
        });
        observeRender.disconnect();
    });

    observeRender.observe(document.body, { childList: true, subtree: true });

    // Stagger entry animations ruleset injection
    const keyframeStyle = document.createElement('style');
    keyframeStyle.textContent = `
        @keyframes cardGlowIn {
            0% {
                opacity: 0;
                transform: translateY(30px) scale(0.96);
            }
            100% {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
    `;
    document.head.appendChild(keyframeStyle);
})();
