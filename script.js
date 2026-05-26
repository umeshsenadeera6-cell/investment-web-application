(function () {
    // ========== FOUR SECTIONS BASE DATA & STYLING ==========
    const PLANS_DATA = [
        {
            name: 'High Profit Plan',
            icon: 'fas fa-chart-line',
            iconBg: 'rgba(245, 158, 11, 0.12)',
            iconColor: '#f59e0b',
            badge: 'High Yield 📈',
            meta: 'Flexible high-profit projections',
            metricLabel: 'Projected Year 8 Interest',
            growthDesc: 'Interest compounded annually'
        },
        {
            name: 'Green Saving Plan',
            icon: 'fas fa-leaf',
            iconBg: 'rgba(16, 185, 129, 0.12)',
            iconColor: '#10b981',
            badge: 'Eco Friendly 🍃',
            meta: 'Green sustainable development',
            metricLabel: 'Illustrated Maturity',
            growthDesc: 'Estimated Illustrated Payout'
        },
        {
            name: 'Silver Plan',
            icon: 'fas fa-coins',
            iconBg: 'rgba(161, 161, 170, 0.12)',
            iconColor: '#a1a1aa',
            badge: 'Conservative 🥈',
            meta: 'Secure silver reserves tier',
            metricLabel: 'Illustrated Maturity',
            growthDesc: 'Estimated Illustrated Payout'
        },
        {
            name: 'Gold Plan',
            icon: 'fas fa-crown',
            iconBg: 'rgba(251, 191, 36, 0.12)',
            iconColor: '#fbbf24',
            badge: 'Premium Gold 👑',
            meta: 'Premium gold tier reserves',
            metricLabel: 'Illustrated Maturity',
            growthDesc: '5.0x Illustrated Multiplier'
        }
    ];

    // ========== DYNAMIC CALCULATION SYSTEM DATA ==========
    
    // High Profit Dataset [principal, y1, y2, y3, y4, y5, y6, y7, y8]
    const HIGH_PROFIT_DATA = [
        [100000, 2500, 3000, 3250, 3500, 4000, 4250, 4500, 4750],
        [200000, 5000, 6000, 6500, 7000, 8000, 8500, 9000, 9500],
        [300000, 7500, 9000, 9750, 10500, 12000, 12750, 13500, 14250],
        [400000, 10000, 12000, 13000, 14000, 16000, 17000, 18000, 19000],
        [500000, 12500, 15000, 16250, 17500, 20000, 21250, 22500, 23750],
        [600000, 15000, 18000, 19500, 21000, 24000, 25500, 27000, 28500],
        [700000, 17500, 21000, 22750, 24500, 28000, 29750, 31500, 33250],
        [800000, 20000, 24000, 26000, 28000, 32000, 34000, 36000, 38000],
        [900000, 22500, 27000, 29250, 31500, 36000, 38250, 40500, 42750],
        [1000000, 25000, 30000, 32500, 35000, 40000, 42500, 45000, 47500],
        [1500000, 37500, 45000, 48750, 52500, 60000, 63750, 67500, 71250],
        [2000000, 50000, 60000, 65000, 70000, 80000, 85000, 90000, 95000],
        [2500000, 62500, 75000, 81250, 87500, 100000, 106250, 112500, 118750],
        [3000000, 75000, 90000, 97500, 105000, 120000, 127500, 135000, 142500],
        [4000000, 100000, 120000, 130000, 140000, 160000, 170000, 180000, 190000],
        [5000000, 125000, 150000, 162500, 175000, 200000, 212500, 225000, 237500],
        [7500000, 187500, 225000, 243750, 262500, 300000, 318750, 337500, 356250],
        [10000000, 250000, 300000, 325000, 350000, 400000, 425000, 450000, 475000],
        [20000000, 500000, 600000, 650000, 700000, 800000, 850000, 900000, 950000],
        [30000000, 750000, 900000, 975000, 1050000, 1200000, 1275000, 1350000, 1425000],
        [40000000, 1000000, 1200000, 1300000, 1400000, 1600000, 1700000, 1800000, 1900000],
        [50000000, 1250000, 1500000, 1625000, 1750000, 2000000, 2125000, 2250000, 2500000],
        [60000000, 1500000, 1800000, 1950000, 2100000, 2400000, 2550000, 2700000, 3000000],
        [70000000, 1750000, 2100000, 2275000, 2450000, 2800000, 2975000, 3150000, 3500000],
        [80000000, 2000000, 2400000, 2600000, 2800000, 3200000, 3400000, 3600000, 4000000],
        [90000000, 2250000, 2700000, 2925000, 3150000, 3600000, 3825000, 4050000, 4500000],
        [100000000, 2500000, 3000000, 3250000, 3500000, 4000000, 4250000, 4500000, 5000000]
    ];

    // Green Saving Plan Reference Data (Premiums -> Illustrated Maturity)
    // P1: Premium 200,000 -> Illustrated 1,000,000
    // P2: Premium 350,000 -> Illustrated 1,750,000
    // P3: Premium 525,000 -> Illustrated 2,625,000
    const GREEN_SAVING_PREMIUMS = [
        [200000, 1000000],
        [350000, 1750000],
        [525000, 2625000]
    ];

    // Silver Plan Reference Data (Premiums -> Illustrated Maturity)
    // P1: Premium 700,000 -> Illustrated 3,500,000
    // P2: Premium 800,000 -> Illustrated 4,000,000
    // P3: Premium 900,000 -> Illustrated 4,500,000
    const SILVER_PREMIUMS = [
        [700000, 3500000],
        [800000, 4000000],
        [900000, 4500000]
    ];

    // Gold Plan Reference Data (Premiums -> Illustrated Maturity)
    // P1: Premium 1,000,000 -> Illustrated 5,000,000
    const GOLD_PREMIUMS = [
        [1000000, 5000000]
    ];

    // Helper functions for dynamic estimates
    function formatNumber(value) {
        return Math.round(value).toLocaleString('en-US');
    }

    // High Profit: Dynamic calculation using actual interpolation
    function calculateHighProfitYear8(amount) {
        if (amount <= 0) return 0;
        
        const sorted = [...HIGH_PROFIT_DATA].sort((a, b) => a[0] - b[0]);
        let lower = null;
        let upper = null;

        for (let i = 0; i < sorted.length; i++) {
            if (sorted[i][0] <= amount) {
                lower = sorted[i];
            }
            if (sorted[i][0] >= amount) {
                upper = sorted[i];
                break;
            }
        }

        if (lower && upper) {
            if (lower[0] === upper[0]) {
                return lower[8]; // Exact match (y8 interest is index 8)
            }
            const ratio = (amount - lower[0]) / (upper[0] - lower[0]);
            return lower[8] + (upper[8] - lower[8]) * ratio;
        } else if (lower) {
            // Scale past max investment linearly
            const scale = amount / lower[0];
            return lower[8] * scale;
        } else if (upper) {
            // Scale below min investment linearly
            const scale = amount / upper[0];
            return upper[8] * scale;
        }
        return 0;
    }

    // Generic interpolation scaling for Premium-Maturity plans (Green, Silver, Gold)
    function calculateMaturityEstimate(amount, dataPoints) {
        if (amount <= 0) return 0;
        
        const sorted = [...dataPoints].sort((a, b) => a[0] - b[0]);
        let lower = null;
        let upper = null;

        for (let i = 0; i < sorted.length; i++) {
            if (sorted[i][0] <= amount) {
                lower = sorted[i];
            }
            if (sorted[i][0] >= amount) {
                upper = sorted[i];
                break;
            }
        }

        if (lower && upper) {
            if (lower[0] === upper[0]) {
                return lower[1]; // Exact match
            }
            // Linear interpolation
            const ratio = (amount - lower[0]) / (upper[0] - lower[0]);
            return lower[1] + (upper[1] - lower[1]) * ratio;
        } else if (lower) {
            // Scale linearly above max premium
            const scale = amount / lower[0];
            return lower[1] * scale;
        } else if (upper) {
            // Scale linearly below min premium
            const scale = amount / upper[0];
            return upper[1] * scale;
        }
        return 0;
    }

    // Main controller: calculate values based on entered portfolio amount
    function calculateAllPlans(amount) {
        const hpVal = calculateHighProfitYear8(amount);
        const gsVal = calculateMaturityEstimate(amount, GREEN_SAVING_PREMIUMS);
        const slVal = calculateMaturityEstimate(amount, SILVER_PREMIUMS);
        const gdVal = calculateMaturityEstimate(amount, GOLD_PREMIUMS);

        return {
            'High Profit Plan': hpVal,
            'Green Saving Plan': gsVal,
            'Silver Plan': slVal,
            'Gold Plan': gdVal
        };
    }

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
                    
                    <div class="live-metric-section">
                        <div class="live-metric-label">${plan.metricLabel}</div>
                        <div class="live-metric-value" id="val-${plan.name.replace(/\s+/g, '-').toLowerCase()}">
                            <span class="metric-currency">LKR</span> <span class="metric-num">0</span>
                        </div>
                        <div class="plan-growth-metric">
                            <i class="fas fa-arrow-trend-up"></i> ${plan.growthDesc}
                        </div>
                    </div>
                    
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
                        <h1>Serendib Wealth Hub</h1>
                    </div>
                    <div class="client-session-card">
                        <i class="fas fa-user-shield"></i>
                        <span>🔑 Verified SGS Partner Session</span>
                    </div>
                </div>

                <!-- PORTFOLIO PLANNER CARD -->
                <div class="portfolio-planner-card">
                    <div class="planner-header">
                        <div class="planner-title"><i class="fas fa-calculator"></i> Global Investment Planner</div>
                        <div class="planner-subtitle">Simulate your portfolio and instantly compare maturity returns across all four investment paths.</div>
                    </div>
                    <div class="calculator-input-row">
                        <div class="input-container-block">
                            <div class="input-label-row">
                                <label for="portfolioAmount">Target Investment Amount</label>
                                <div class="active-amount-pill" id="activeAmountLabel">LKR 1,000,000</div>
                            </div>
                            <div class="terminal-input-wrapper">
                                <span class="currency-tag">LKR</span>
                                <input type="number" id="portfolioAmount" class="terminal-input" value="1000000" min="100000" max="100000000" step="50000" autocomplete="off">
                            </div>
                        </div>
                        <div class="slider-control-block">
                            <div class="input-label-row">
                                <label>Investment Range Selector</label>
                            </div>
                            <div class="slider-container">
                                <input type="range" id="portfolioSlider" class="custom-range-slider" min="100000" max="100000000" step="50000" value="1000000">
                            </div>
                            <div class="presets-grid">
                                <button class="preset-pill" data-amount="100000">100K</button>
                                <button class="preset-pill" data-amount="1000000">1M</button>
                                <button class="preset-pill" data-amount="5000000">5M</button>
                                <button class="preset-pill" data-amount="10000000">10M</button>
                                <button class="preset-pill" data-amount="50000000">50M</button>
                                <button class="preset-pill" data-amount="100000000">100M</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="plans-grid">
                    ${cardsHTML}
                </div>
                <div class="minimal-footer">
                    <i class="fas fa-shield-halved"></i> Serendib Wealth Management Portal. Smart. Secure. Scaled.
                </div>
            </div>
        `;

        const root = document.getElementById('app-root');
        root.innerHTML = mainHTML;

        // Initialize calculator elements & listeners
        const inputAmount = document.getElementById('portfolioAmount');
        const sliderAmount = document.getElementById('portfolioSlider');
        const activeLabel = document.getElementById('activeAmountLabel');

        function updateMetrics(amount) {
            if (isNaN(amount) || amount < 0) amount = 0;
            
            // Format labels
            activeLabel.textContent = 'LKR ' + Math.round(amount).toLocaleString('en-US');
            
            // Compute dynamic results
            const results = calculateAllPlans(amount);

            // Update DOM values
            Object.keys(results).forEach(planName => {
                const id = 'val-' + planName.replace(/\s+/g, '-').toLowerCase();
                const metricContainer = document.getElementById(id);
                if (metricContainer) {
                    const numSpan = metricContainer.querySelector('.metric-num');
                    if (numSpan) {
                        numSpan.textContent = formatNumber(results[planName]);
                        
                        // Subtle numeric update micro-animation
                        numSpan.style.transform = 'scale(1.03)';
                        setTimeout(() => {
                            numSpan.style.transform = 'scale(1)';
                        }, 100);
                    }
                }
            });
        }

        function triggerCalculationUpdate(value, source) {
            let amount = parseFloat(value);
            if (isNaN(amount)) amount = 0;

            if (source === 'input') {
                sliderAmount.value = Math.max(100000, Math.min(amount, 100000000));
            } else if (source === 'slider') {
                inputAmount.value = amount;
            }
            updateMetrics(amount);
        }

        inputAmount.addEventListener('input', (e) => {
            triggerCalculationUpdate(e.target.value, 'input');
        });

        sliderAmount.addEventListener('input', (e) => {
            triggerCalculationUpdate(e.target.value, 'slider');
        });

        // Set preset pills handlers
        const presets = document.querySelectorAll('.preset-pill');
        presets.forEach(preset => {
            preset.addEventListener('click', function () {
                const amount = this.getAttribute('data-amount');
                inputAmount.value = amount;
                sliderAmount.value = amount;
                updateMetrics(amount);

                // Quick tactile haptic preset highlight
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 100);
            });
        });

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

        // Run initial default calculation LKR 1,000,000
        updateMetrics(1000000);
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
