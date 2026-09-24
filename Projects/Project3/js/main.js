/**
 * IT IN 2030 — INDIA WITHOUT IT?
 * Futuristic Cyber-Tech Interactions & Dynamic Canvas Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initCyberCanvas();
  initMobileMenu();
  initScrollReveal();
  initPage2Simulator();
  initPage3CategoryFilter();
  initResilienceCalculator();
});

/* ==========================================================================
   1. CYBER CONSTELLATION CANVAS ENGINE
   ========================================================================== */
function initCyberCanvas() {
  const canvas = document.getElementById('cyber-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const particleCount = window.innerWidth < 768 ? 45 : 90;
  const maxDistance = 140;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.radius = Math.random() * 1.8 + 1;
      this.color = Math.random() > 0.4 ? 'rgba(0, 240, 255,' : 'rgba(99, 102, 241,';
      this.alpha = Math.random() * 0.6 + 0.2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `${this.color}${this.alpha})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#00f0ff';
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  let mouse = { x: null, y: null };
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Draw lines between close particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          const alpha = (1 - dist / maxDistance) * 0.22;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      // Connect with mouse
      if (mouse.x !== null && mouse.y !== null) {
        const dx = particles[i].x - mouse.x;
        const dy = particles[i].y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 160) {
          const alpha = (1 - dist / 160) * 0.35;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }

      particles[i].update();
      particles[i].draw();
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   2. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileMenu() {
  const toggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !toggle.contains(e.target) && navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ==========================================================================
   3. SCROLL REVEAL OBSERVER
   ========================================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   4. PAGE 2 CRISIS SIMULATOR TOGGLE
   ========================================================================== */
const crisisData = {
  blackout: {
    badgeClass: 'crisis-badge',
    badgeText: 'CRITICAL DISRUPTION',
    cardClass: 'glass-card-crisis',
    items: {
      banking: [
        'Digital payments (UPI, IMPS, Cards) completely freeze',
        'Online banking portals and mobile banking apps unavailable',
        'Financial transactions slow down to physical cash and manual ledgers',
        'Businesses face massive liquidity and settlement crises'
      ],
      healthcare: [
        'Electronic Health Records (EHR) and digital diagnostics inaccessible',
        'Online doctor consultations and telemedicine halt overnight',
        'Hospital management systems face severe coordination disruption',
        'Emergency response dispatch and medicine inventory tracking impaired'
      ],
      education: [
        'Online classes and digital lecture streaming disappear',
        'Digital learning management systems (LMS) become unavailable',
        'Students lose access to digital textbooks, open journals & repositories',
        'Remote and rural learners cut off from higher education content'
      ],
      transportation: [
        'Online rail, flight, and bus booking completely stops',
        'GPS and modern satellite navigation systems face major disruption',
        'Automated logistics dispatch and hyper-local delivery crumble',
        'Massive traffic delays without smart traffic synchronization'
      ],
      business: [
        'E-commerce platforms and quick-commerce collapse',
        'Cloud-based enterprise ERP and accounting operations freeze',
        'Global communications, email and remote collaboration severed',
        'Export-import clearance and supply chain visibility paralyzed'
      ]
    }
  },
  normal: {
    badgeClass: 'glass-pill',
    badgeText: 'HYPER-CONNECTED 2030',
    cardClass: '',
    items: {
      banking: [
        'Instantaneous micro-transactions powered by AI & blockchain',
        '24/7 automated wealth management & biometric authentication',
        'Seamless cross-border real-time settlements in seconds',
        'Zero-friction commerce with deep financial inclusion'
      ],
      healthcare: [
        'Predictive AI diagnosis and interconnected cloud patient profiles',
        'Remote robotic surgeries & high-definition telemedicine accessible everywhere',
        'Smart IoT hospital automation tracking every vial and bed in real time',
        'Instant emergency dispatch via synchronized automated grids'
      ],
      education: [
        'Adaptive AI tutors tailored to every student’s learning velocity',
        'Immersive holographic and virtual reality laboratories',
        'Universal open access to global scholarly knowledge bases',
        'Democratized education breaking geographical and wealth barriers'
      ],
      transportation: [
        'Intelligent multi-modal ticketing booked in one click',
        'Autonomous navigation and dynamic congestion-free routing',
        'Drone and electric-fleet smart supply chains with minute-by-minute tracking',
        'Zero-delay public transit synchronized with commuter traffic'
      ],
      business: [
        'Borderless e-commerce serving billions instantaneously',
        'Autonomous inventory re-ordering and predictive supply chains',
        'Hyper-efficient remote collaboration across timezones',
        'Dynamic digital startups scaling into global enterprises in months'
      ]
    }
  }
};

function initPage2Simulator() {
  const toggleBtns = document.querySelectorAll('.sim-toggle-btn');
  if (!toggleBtns.length) return;

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.dataset.mode;
      toggleBtns.forEach(b => b.classList.remove('active-blackout', 'active-normal'));

      if (mode === 'blackout') {
        btn.classList.add('active-blackout');
        renderSimulatorState('blackout');
      } else {
        btn.classList.add('active-normal');
        renderSimulatorState('normal');
      }
    });
  });
}

function renderSimulatorState(mode) {
  const data = crisisData[mode];
  if (!data) return;

  const categories = ['banking', 'healthcare', 'education', 'transportation', 'business'];

  categories.forEach(cat => {
    const listEl = document.getElementById(`crisis-list-${cat}`);
    const badgeEl = document.getElementById(`crisis-badge-${cat}`);
    const cardEl = document.getElementById(`crisis-card-${cat}`);

    if (listEl && data.items[cat]) {
      listEl.innerHTML = data.items[cat].map(text => `
        <li>
          <span class="crisis-bullet-icon">
            ${mode === 'blackout' 
              ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>'
              : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>'
            }
          </span>
          <span>${text}</span>
        </li>
      `).join('');
    }

    if (badgeEl) {
      badgeEl.className = data.badgeClass;
      badgeEl.textContent = data.badgeText;
    }

    if (cardEl) {
      if (mode === 'blackout') {
        cardEl.classList.add('glass-card-crisis');
      } else {
        cardEl.classList.remove('glass-card-crisis');
      }
    }
  });
}

/* ==========================================================================
   5. PAGE 3 CATEGORY FILTER (NON-AI CAREERS)
   ========================================================================== */
function initPage3CategoryFilter() {
  const filterBtns = document.querySelectorAll('.category-btn');
  const cards = document.querySelectorAll('.non-ai-card');

  if (!filterBtns.length || !cards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      cards.forEach(card => {
        const category = card.dataset.category;
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   6. CAREER RESILIENCE & ADAPTABILITY CALCULATOR
   ========================================================================== */
function initResilienceCalculator() {
  const checkboxes = document.querySelectorAll('.resilience-check');
  const scoreFill = document.getElementById('calc-score-fill');
  const scorePercent = document.getElementById('calc-score-percent');
  const scoreBadge = document.getElementById('calc-score-badge');
  const scoreFeedback = document.getElementById('calc-feedback-text');

  if (!checkboxes.length || !scoreFill) return;

  function updateScore() {
    let checkedCount = 0;
    checkboxes.forEach(cb => {
      if (cb.checked) checkedCount++;
    });

    const percent = Math.round((checkedCount / checkboxes.length) * 100);
    scoreFill.style.width = `${percent}%`;
    if (scorePercent) scorePercent.textContent = `${percent}%`;

    if (percent <= 20) {
      scoreBadge.textContent = 'High Vulnerability (Single Track)';
      scoreBadge.style.color = '#ef4444';
      scoreFeedback.textContent = 'You are heavily dependent on one avenue. Start learning a strong secondary technical or real-world skill immediately.';
    } else if (percent <= 50) {
      scoreBadge.textContent = 'Moderate Resilience (Developing)';
      scoreBadge.style.color = '#f59e0b';
      scoreFeedback.textContent = 'Good foundation! Continue building real projects and incorporate AI workflow tools into your daily craft.';
    } else if (percent <= 80) {
      scoreBadge.textContent = 'Strong Resilience (Multi-Disciplinary)';
      scoreBadge.style.color = '#38bdf8';
      scoreFeedback.textContent = 'Great adaptability. You have multiple safety nets and practical capabilities that withstand market turbulence.';
    } else {
      scoreBadge.textContent = 'Future-Proof Master (2030 Ready)';
      scoreBadge.style.color = '#10b981';
      scoreFeedback.textContent = 'Exemplary career architecture. You embody the Balanced Career Model: technical depth, AI synergy, physical/business independence, and continuous learning.';
    }
  }

  checkboxes.forEach(cb => {
    cb.addEventListener('change', updateScore);
  });

  // Initial calculation
  updateScore();
}
