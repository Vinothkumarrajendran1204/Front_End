/**
 * UNAKKU AVLOTHA LIMIT - Main Application Controller & Router
 * Handles UI event bindings, dynamic views rendering, modal management,
 * persona switching, self-awareness quiz, and admin functionality.
 */

document.addEventListener('DOMContentLoaded', () => {
  const store = window.ualState;

  // --- Router & Navigation ---
  function navigateTo(hash) {
    const targetHash = hash || window.location.hash || '#home';
    const cleanRoute = targetHash.replace('#', '').split('?')[0];

    // Hide all view sections
    document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));

    // Update main nav active link
    document.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${cleanRoute}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Match route
    let targetSection = document.getElementById(`view-${cleanRoute}`);
    if (!targetSection) {
      targetSection = document.getElementById('view-home');
    }
    targetSection.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Trigger view-specific re-renders
    if (cleanRoute === 'dashboard' || cleanRoute === 'limits' || cleanRoute === 'tobacco-limits') {
      renderDashboard();
    } else if (cleanRoute === 'booking') {
      renderBookingPage();
    } else if (cleanRoute === 'history') {
      renderHistoryPage();
    } else if (cleanRoute === 'admin') {
      renderAdminPortal();
    }

    // Close mobile nav drawer if open
    const navMenu = document.getElementById('nav-menu');
    if (navMenu) navMenu.classList.remove('mobile-open');
  }

  window.addEventListener('hashchange', () => navigateTo(window.location.hash));

  // --- UI Toast Helper ---
  function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type === 'error' ? 'toast-error' : type === 'warning' ? 'toast-warning' : ''}`;
    toast.innerHTML = `
      <span>${type === 'error' ? '🚫' : type === 'warning' ? '⚠️' : '✅'}</span>
      <div>${message}</div>
    `;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }
  window.showToast = showToast;

  // --- Persona Switcher ---
  function applyPersona(userId) {
    const user = store.setCurrentUser(userId);
    if (!user) return;

    // Update active persona chip
    document.querySelectorAll('.persona-chip').forEach(chip => {
      chip.classList.toggle('active', chip.dataset.userId === userId);
    });

    // Check age restriction: if user is under 18, trigger full-screen block
    const blockModal = document.getElementById('modal-age-blocked');
    if (user.age < 18) {
      store.recordAgeBlockedAttempt(`Attempted user: ${user.name} (${user.age} yrs)`);
      if (blockModal) blockModal.classList.add('active');
      return;
    } else {
      if (blockModal) blockModal.classList.remove('active');
    }

    // Role redirection
    if (user.role === 'admin') {
      showToast(`Switched to Administrative Console: ${user.name}`);
      window.location.hash = '#admin';
    } else {
      showToast(`Active Resident: ${user.name} (${user.user_id})`);
      renderDashboard();
    }
  }

  document.querySelectorAll('.persona-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      applyPersona(chip.dataset.userId);
    });
  });

  // Switch persona from age-blocked modal
  const btnSwitchFromBlock = document.getElementById('btn-switch-from-block');
  if (btnSwitchFromBlock) {
    btnSwitchFromBlock.addEventListener('click', () => {
      applyPersona('TN-RES-1001'); // Switch to adult
    });
  }

  // --- Mobile Hamburger Menu ---
  const mobileToggle = document.getElementById('mobile-nav-toggle');
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      const navMenu = document.getElementById('nav-menu');
      if (navMenu) navMenu.classList.toggle('mobile-open');
    });
  }

  // --- Render Dashboard ---
  function renderDashboard() {
    const user = store.getCurrentUser();
    if (!user) return;

    // Greeting & Identity Meta
    const welcomeName = document.getElementById('dash-user-name');
    const welcomeId = document.getElementById('dash-user-id');
    const welcomeWeek = document.getElementById('dash-current-week');
    const welcomeStatus = document.getElementById('dash-account-status');
    const restrictionBanner = document.getElementById('dash-restriction-banner');

    if (welcomeName) welcomeName.textContent = user.name;
    if (welcomeId) welcomeId.textContent = `ID: ${user.user_id} (${user.masked_aadhaar || 'Verified'})`;
    if (welcomeWeek) welcomeWeek.textContent = `Current Cycle: ${store.data.currentWeek}`;

    // Account Status & Legal Restriction Check
    const hasRestriction = store.hasActiveLegalRestriction(user.user_id) || user.account_status !== 'Active';
    if (welcomeStatus) {
      if (hasRestriction) {
        welcomeStatus.textContent = 'Purchase Restricted';
        welcomeStatus.className = 'badge badge-danger';
      } else {
        welcomeStatus.textContent = 'Active & Eligible';
        welcomeStatus.className = 'badge badge-success';
      }
    }

    if (restrictionBanner) {
      if (hasRestriction) {
        restrictionBanner.style.display = 'flex';
      } else {
        restrictionBanner.style.display = 'none';
      }
    }

    // Alcohol Limit Meters
    const al = store.getAlcoholLimits(user.user_id);

    // Hard Liquor
    const hlUsed = document.getElementById('meter-hl-used');
    const hlMax = document.getElementById('meter-hl-max');
    const hlBar = document.getElementById('meter-hl-bar');
    const hlNotice = document.getElementById('meter-hl-notice');
    if (hlUsed) hlUsed.textContent = al.hardUsed;
    if (hlMax) hlMax.textContent = al.hardMax;
    if (hlBar) {
      const pct = (al.hardUsed / al.hardMax) * 100;
      hlBar.style.width = `${pct}%`;
      hlBar.className = `progress-fill ${pct >= 100 ? 'red' : 'green'}`;
    }
    if (hlNotice) {
      hlNotice.style.display = al.hardRemaining === 0 ? 'flex' : 'none';
    }

    // Beer
    const beerUsed = document.getElementById('meter-beer-used');
    const beerMax = document.getElementById('meter-beer-max');
    const beerBar = document.getElementById('meter-beer-bar');
    const beerNotice = document.getElementById('meter-beer-notice');
    if (beerUsed) beerUsed.textContent = al.beerUsed;
    if (beerMax) beerMax.textContent = al.beerMax;
    if (beerBar) {
      const pct = (al.beerUsed / al.beerMax) * 100;
      beerBar.style.width = `${pct}%`;
      beerBar.className = `progress-fill ${pct >= 100 ? 'red' : pct > 50 ? 'orange' : 'green'}`;
    }
    if (beerNotice) {
      beerNotice.style.display = al.beerRemaining === 0 ? 'flex' : 'none';
    }

    // Wine
    const wineUsed = document.getElementById('meter-wine-used');
    const wineMax = document.getElementById('meter-wine-max');
    const wineBar = document.getElementById('meter-wine-bar');
    const wineNotice = document.getElementById('meter-wine-notice');
    if (wineUsed) wineUsed.textContent = al.wineUsed;
    if (wineMax) wineMax.textContent = al.wineMax;
    if (wineBar) {
      const pct = (al.wineUsed / al.wineMax) * 100;
      wineBar.style.width = `${pct}%`;
      wineBar.className = `progress-fill ${pct >= 100 ? 'red' : pct > 50 ? 'orange' : 'green'}`;
    }
    if (wineNotice) {
      wineNotice.style.display = al.wineRemaining === 0 ? 'flex' : 'none';
    }

    // Tobacco Dynamic Meters
    const tl = store.getTobaccoLimits(user.user_id);
    const dynamicBadge = document.getElementById('tobacco-dynamic-badge');
    const dynamicRuleText = document.getElementById('tobacco-dynamic-text');

    if (dynamicBadge && dynamicRuleText) {
      if (tl.isAlcoholPurchased) {
        dynamicBadge.textContent = 'Alcohol Purchased This Week: YES';
        dynamicBadge.className = 'badge badge-warning';
        dynamicRuleText.innerHTML = '<strong>Reduced Cross-Category Limit Active:</strong> Because alcohol has been acquired in the current weekly cycle, tobacco limits are reduced to Normal: <strong>3 units</strong>, Alternative: <strong>6 units</strong>.';
      } else {
        dynamicBadge.textContent = 'Alcohol Purchased This Week: NO';
        dynamicBadge.className = 'badge badge-success';
        dynamicRuleText.innerHTML = '<strong>Standard Quota Active:</strong> Alcohol has not been purchased in the current weekly cycle. Baseline limit applies: Normal: <strong>5 units</strong>, Alternative: <strong>10 units</strong>.';
      }
    }

    // Normal Cigarette
    const normUsed = document.getElementById('meter-norm-used');
    const normMax = document.getElementById('meter-norm-max');
    const normBar = document.getElementById('meter-norm-bar');
    const normNotice = document.getElementById('meter-norm-notice');
    if (normUsed) normUsed.textContent = tl.normalUsed;
    if (normMax) normMax.textContent = tl.normalMax;
    if (normBar) {
      const pct = (tl.normalUsed / tl.normalMax) * 100;
      normBar.style.width = `${pct}%`;
      normBar.className = `progress-fill ${pct >= 100 ? 'red' : pct > 60 ? 'orange' : 'green'}`;
    }
    if (normNotice) {
      normNotice.style.display = tl.normalRemaining === 0 ? 'flex' : 'none';
    }

    // Alternative Tobacco
    const altUsed = document.getElementById('meter-alt-used');
    const altMax = document.getElementById('meter-alt-max');
    const altBar = document.getElementById('meter-alt-bar');
    const altNotice = document.getElementById('meter-alt-notice');
    if (altUsed) altUsed.textContent = tl.altUsed;
    if (altMax) altMax.textContent = tl.altMax;
    if (altBar) {
      const pct = (tl.altUsed / tl.altMax) * 100;
      altBar.style.width = `${pct}%`;
      altBar.className = `progress-fill ${pct >= 100 ? 'red' : pct > 60 ? 'orange' : 'green'}`;
    }
    if (altNotice) {
      altNotice.style.display = tl.altRemaining === 0 ? 'flex' : 'none';
    }

    // Active Reservation Token Card in Dashboard
    const activePassBox = document.getElementById('dash-active-reservation-card');
    const activeBooking = store.data.purchases.find(p => p.user_id === user.user_id && p.status === 'Confirmed');
    if (activePassBox) {
      if (activeBooking) {
        activePassBox.style.display = 'block';
        activePassBox.innerHTML = `
          <div class="card" style="border-left: 4px solid var(--primary-green); background: #f0fdf4;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:12px;">
              <div>
                <span class="badge badge-success" style="margin-bottom:8px;">Active Confirmed Token</span>
                <h3 style="margin-bottom:4px;">Booking Reference: ${activeBooking.purchase_id}</h3>
                <p style="font-size:0.9rem;">
                  <strong>${activeBooking.category}</strong> (${activeBooking.quantity} unit) &bull; Date: <strong>${activeBooking.date}</strong> &bull; Slot: <strong>${activeBooking.time}</strong>
                </p>
              </div>
              <button class="btn btn-primary btn-sm" onclick="window.viewPassModal('${activeBooking.purchase_id}')">
                🎫 View QR Pass
              </button>
            </div>
          </div>
        `;
      } else {
        activePassBox.style.display = 'none';
      }
    }
  }

  // --- Render Booking Wizard ---
  let selectedCategory = 'Hard Liquor';
  let selectedSlotId = 'SLOT-101';
  let bookingDate = new Date().toISOString().split('T')[0];

  function renderBookingPage() {
    const user = store.getCurrentUser();
    if (!user) return;

    const al = store.getAlcoholLimits(user.user_id);
    const tl = store.getTobaccoLimits(user.user_id);
    const hasRestriction = store.hasActiveLegalRestriction(user.user_id) || user.account_status !== 'Active';

    // Category options setup
    const categories = [
      { id: 'Hard Liquor', name: 'Hard Liquor (IMFL)', max: al.hardMax, remaining: al.hardRemaining, icon: '🥃' },
      { id: 'Beer', name: 'Mild Beer (Lager)', max: al.beerMax, remaining: al.beerRemaining, icon: '🍺' },
      { id: 'Wine', name: 'Fortified / Table Wine', max: al.wineMax, remaining: al.wineRemaining, icon: '🍷' },
      { id: 'Normal Cigarette', name: 'Normal Cigarette', max: tl.normalMax, remaining: tl.normalRemaining, icon: '🚬' },
      { id: 'Alternative Category', name: 'Lower-Harm / Alternative', max: tl.altMax, remaining: tl.altRemaining, icon: '🌿' }
    ];

    const catGrid = document.getElementById('booking-category-grid');
    if (catGrid) {
      catGrid.innerHTML = categories.map(cat => {
        const isExhausted = cat.remaining <= 0;
        const isSelected = selectedCategory === cat.id;
        return `
          <div class="product-radio-card ${isSelected ? 'selected' : ''} ${isExhausted ? 'disabled' : ''}"
               onclick="window.selectBookingCategory('${cat.id}')">
            <div style="font-size:1.6rem;margin-bottom:6px;">${cat.icon}</div>
            <h4 style="font-size:0.95rem;margin-bottom:4px;color:var(--dark-green);">${cat.name}</h4>
            <div style="font-size:0.8rem;color:${isExhausted ? 'var(--status-danger)' : 'var(--text-muted)'};font-weight:600;">
              ${isExhausted ? 'Weekly Limit Reached' : `${cat.remaining} / ${cat.max} Units Remaining`}
            </div>
          </div>
        `;
      }).join('');
    }

    // Time slots setup
    const slotsGrid = document.getElementById('booking-slots-grid');
    if (slotsGrid) {
      const slots = store.getTimeSlots();
      slotsGrid.innerHTML = slots.map(slot => {
        const isFull = slot.booked >= slot.capacity;
        const isSelected = selectedSlotId === slot.slot_id;
        return `
          <button type="button" class="slot-button ${isSelected ? 'selected' : ''}" 
                  ${isFull ? 'disabled' : ''}
                  onclick="window.selectBookingSlot('${slot.slot_id}')">
            <div class="slot-time">${slot.start_time} – ${slot.end_time}</div>
            <div class="slot-availability">${isFull ? 'Capacity Full' : `${slot.capacity - slot.booked} slots open`}</div>
          </button>
        `;
      }).join('');
    }

    // Update 6-Point Live Validation Checklist
    updateValidationChecklistPreview();

    // Date picker initial setup
    const dateInput = document.getElementById('booking-date-input');
    if (dateInput) {
      dateInput.value = bookingDate;
      dateInput.min = new Date().toISOString().split('T')[0];
      dateInput.addEventListener('change', (e) => {
        bookingDate = e.target.value;
        updateValidationChecklistPreview();
      });
    }
  }

  window.selectBookingCategory = function(catId) {
    selectedCategory = catId;
    renderBookingPage();
  };

  window.selectBookingSlot = function(slotId) {
    selectedSlotId = slotId;
    renderBookingPage();
  };

  function updateValidationChecklistPreview() {
    const user = store.getCurrentUser();
    const result = PurchaseValidator.validatePurchase({
      userId: user.user_id,
      category: selectedCategory,
      quantity: 1,
      slotId: selectedSlotId,
      date: bookingDate
    });

    const listEl = document.getElementById('validation-checklist-items');
    const submitBtn = document.getElementById('btn-confirm-booking');
    const errorNotice = document.getElementById('booking-blocking-reason');

    if (listEl) {
      listEl.innerHTML = result.ruleResults.map(r => `
        <div class="checklist-item">
          <div class="check-label">
            <span>${r.passed ? '✅' : '❌'}</span>
            <strong>Rule ${r.id}: ${r.label}</strong>
          </div>
          <span style="font-size:0.8rem;color:${r.passed ? 'var(--status-success)' : 'var(--status-danger)'};font-weight:600;">
            ${r.message}
          </span>
        </div>
      `).join('');
    }

    if (submitBtn) {
      submitBtn.disabled = !result.passed;
    }

    if (errorNotice) {
      if (!result.passed) {
        errorNotice.style.display = 'block';
        errorNotice.textContent = result.blockingError;
      } else {
        errorNotice.style.display = 'none';
      }
    }
  }

  // Handle Booking Confirmation
  const bookingForm = document.getElementById('booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const user = store.getCurrentUser();
      const result = PurchaseValidator.validatePurchase({
        userId: user.user_id,
        category: selectedCategory,
        quantity: 1,
        slotId: selectedSlotId,
        date: bookingDate
      });

      if (!result.passed) {
        showToast(result.blockingError, 'error');
        return;
      }

      try {
        const booking = store.bookPurchase(user.user_id, selectedCategory, 1, selectedSlotId, bookingDate);
        showToast(`Token Reserved: ${booking.purchase_id}`);
        window.viewPassModal(booking.purchase_id);
        renderDashboard();
      } catch (err) {
        showToast(err.message, 'error');
      }
    });
  }

  // View Token QR Pass Modal
  window.viewPassModal = function(purchaseId) {
    const booking = store.data.purchases.find(p => p.purchase_id === purchaseId);
    if (!booking) return;

    const modal = document.getElementById('modal-booking-pass');
    const user = store.getUserById(booking.user_id);
    const al = store.getAlcoholLimits(booking.user_id);
    const tl = store.getTobaccoLimits(booking.user_id);

    let remainingText = '';
    if (booking.category === 'Hard Liquor') remainingText = `${al.hardRemaining} unit(s) remaining this week`;
    else if (booking.category === 'Beer') remainingText = `${al.beerRemaining} unit(s) remaining this week`;
    else if (booking.category === 'Wine') remainingText = `${al.wineRemaining} unit(s) remaining this week`;
    else if (booking.category === 'Normal Cigarette') remainingText = `${tl.normalRemaining} unit(s) remaining this week`;
    else remainingText = `${tl.altRemaining} unit(s) remaining this week`;

    document.getElementById('pass-token-id').textContent = booking.purchase_id;
    document.getElementById('pass-user-name').textContent = user.name;
    document.getElementById('pass-user-id').textContent = user.user_id;
    document.getElementById('pass-category').textContent = `${booking.category} (${booking.quantity} Unit)`;
    document.getElementById('pass-date-time').textContent = `${booking.date} | ${booking.time}`;
    document.getElementById('pass-remaining').textContent = remainingText;

    if (modal) modal.classList.add('active');
  };

  // Close Modals
  document.querySelectorAll('.modal-close-btn, .modal-cancel-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.modal-overlay').forEach(m => {
        // Do NOT allow closing the age block modal if user is under 18!
        if (m.id === 'modal-age-blocked' && store.getCurrentUser().age < 18) {
          return;
        }
        m.classList.remove('active');
      });
    });
  });

  // --- Render Purchase History Page ---
  function renderHistoryPage() {
    const user = store.getCurrentUser();
    if (!user) return;

    const filterCategory = document.getElementById('history-filter-category')?.value || 'ALL';
    const filterTime = document.getElementById('history-filter-time')?.value || 'ALL';

    // Users should only view THEIR OWN detailed records!
    let list = store.data.purchases.filter(p => p.user_id === user.user_id);

    if (filterCategory !== 'ALL') {
      list = list.filter(p => p.category === filterCategory);
    }

    if (filterTime === 'THIS_WEEK') {
      list = list.filter(p => p.week_code === store.data.currentWeek);
    }

    const tbody = document.getElementById('history-table-body');
    if (tbody) {
      if (list.length === 0) {
        tbody.innerHTML = `
          <tr>
            <td colspan="7" style="text-align:center;padding:32px;color:var(--text-muted);">
              No purchase tokens recorded for this timeframe.
            </td>
          </tr>
        `;
      } else {
        tbody.innerHTML = list.map(item => `
          <tr>
            <td><strong>${item.purchase_id}</strong></td>
            <td>${item.date}</td>
            <td>${item.time}</td>
            <td><span class="badge badge-blue">${item.category}</span></td>
            <td><strong>${item.quantity}</strong></td>
            <td>
              <span class="badge ${item.status === 'Confirmed' ? 'badge-success' : item.status === 'Completed' ? 'badge-blue' : 'badge-danger'}">
                ${item.status}
              </span>
            </td>
            <td>
              <div style="display:flex;gap:6px;">
                <button class="btn btn-outline btn-sm" onclick="window.viewPassModal('${item.purchase_id}')">Pass</button>
                ${item.status === 'Confirmed' ? `
                  <button class="btn btn-danger btn-sm" onclick="window.cancelUserBooking('${item.purchase_id}')">Cancel</button>
                ` : ''}
              </div>
            </td>
          </tr>
        `).join('');
      }
    }

    // Public Anonymized Statistics
    renderPublicStats();
  }

  window.cancelUserBooking = function(purchaseId) {
    if (confirm('Cancel this booking token? The allocated unit will be immediately restored to your weekly quota.')) {
      try {
        store.cancelPurchase(purchaseId);
        showToast('Booking cancelled. Quota restored.');
        renderHistoryPage();
        renderDashboard();
      } catch (e) {
        showToast(e.message, 'error');
      }
    }
  };

  // Filter change listeners
  document.getElementById('history-filter-category')?.addEventListener('change', renderHistoryPage);
  document.getElementById('history-filter-time')?.addEventListener('change', renderHistoryPage);

  // Render Public Anonymized Statistics
  function renderPublicStats() {
    const allPurchases = store.data.purchases;
    const currentWeekPurchases = allPurchases.filter(p => p.week_code === store.data.currentWeek && p.status !== 'Cancelled');
    
    const countTotal = document.getElementById('stat-public-total');
    const countReached = document.getElementById('stat-public-reached');
    const countAlcohol = document.getElementById('stat-public-alcohol');
    const countTobacco = document.getElementById('stat-public-tobacco');

    if (countTotal) countTotal.textContent = currentWeekPurchases.length;
    if (countReached) countReached.textContent = '38%'; // Network average
    if (countAlcohol) {
      const alcCount = currentWeekPurchases.filter(p => ['Hard Liquor', 'Beer', 'Wine'].includes(p.category)).length;
      countAlcohol.textContent = alcCount;
    }
    if (countTobacco) {
      const tobCount = currentWeekPurchases.filter(p => ['Normal Cigarette', 'Alternative Category'].includes(p.category)).length;
      countTobacco.textContent = tobCount;
    }
  }

  // --- "Check Your Week" Interactive Self-Awareness Quiz ---
  const quizForm = document.getElementById('awareness-quiz-form');
  if (quizForm) {
    quizForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let score = 100;
      const q1 = document.querySelector('input[name="q1"]:checked')?.value; // Alcohol purchased
      const q2 = document.querySelector('input[name="q2"]:checked')?.value; // Tobacco purchased
      const q3 = document.querySelector('input[name="q3"]:checked')?.value; // Reached weekly limit
      const q4 = document.querySelector('input[name="q4"]:checked')?.value; // Work affected
      const q5 = document.querySelector('input[name="q5"]:checked')?.value; // Family affected
      const q6 = document.querySelector('input[name="q6"]:checked')?.value; // Considered driving after drinking

      if (q1 === 'yes') score -= 10;
      if (q2 === 'yes') score -= 10;
      if (q3 === 'yes') score -= 15;
      if (q4 === 'yes') score -= 25;
      if (q5 === 'yes') score -= 25;
      if (q6 === 'yes') score -= 30;

      score = Math.max(0, score);

      const resultBox = document.getElementById('quiz-result-box');
      const scoreNum = document.getElementById('quiz-score-number');
      const scoreFeedback = document.getElementById('quiz-score-feedback');

      if (scoreNum) scoreNum.textContent = `${score}/100`;

      if (scoreFeedback) {
        if (score >= 80) {
          scoreFeedback.innerHTML = `
            <strong style="color:var(--primary-green);font-size:1.1rem;">Excellent Self-Regulation & Responsibility!</strong>
            <p style="margin-top:6px;">Your responses indicate strong adherence to statutory moderation, responsible personal choices, and zero reported harm to your work or loved ones. Continue keeping your awareness sharp.</p>
          `;
        } else if (score >= 50) {
          scoreFeedback.innerHTML = `
            <strong style="color:var(--status-warning);font-size:1.1rem;">Moderate Risk Identified — Caution Recommended</strong>
            <p style="margin-top:6px;">You have approached or reached consumption limits and noted subtle impacts. Consider planning alcohol-free days, never mix driving with any alcohol intake, and evaluate our educational resources.</p>
          `;
        } else {
          scoreFeedback.innerHTML = `
            <strong style="color:var(--status-danger);font-size:1.1rem;">High Risk Indicator — Action Needed</strong>
            <p style="margin-top:6px;">Consuming past limits and experiencing negative work, family, or driving impacts can cause significant irreversible physical and legal harm. Please reach out to confidential state de-addiction counselors via Tele-MANAS (14416).</p>
          `;
        }
      }

      if (resultBox) {
        resultBox.style.display = 'block';
        resultBox.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // --- Admin Portal Functionality ---
  let currentAdminTab = 'admin-tab-overview';

  function renderAdminPortal() {
    const user = store.getCurrentUser();
    // Admin gate check
    if (user.role !== 'admin') {
      const adminModal = document.getElementById('modal-admin-login');
      if (adminModal) adminModal.classList.add('active');
      return;
    }

    // Refresh KPI metrics
    const totalUsers = store.data.users.length;
    const activeUsers = store.data.users.filter(u => u.account_status === 'Active').length;
    const blockedAttempts = store.data.blocked_age_attempts || 0;
    const activeRest = store.data.restrictions.filter(r => r.status === 'Active').length;
    const allPurchases = store.data.purchases;
    const alcPurchases = allPurchases.filter(p => ['Hard Liquor', 'Beer', 'Wine'].includes(p.category)).length;
    const tobPurchases = allPurchases.filter(p => ['Normal Cigarette', 'Alternative Category'].includes(p.category)).length;

    const setVal = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
    };

    setVal('kpi-total-users', totalUsers);
    setVal('kpi-active-users', activeUsers);
    setVal('kpi-age-blocked', blockedAttempts);
    setVal('kpi-active-restrictions', activeRest);
    setVal('kpi-alcohol-purchases', alcPurchases);
    setVal('kpi-tobacco-purchases', tobPurchases);
    setVal('kpi-current-cycle', store.data.currentWeek);

    // Render Sub-Views
    renderAdminUsersList();
    renderAdminProductRules();
    renderAdminSlots();
    renderAdminPurchases();
    renderAdminRestrictions();
    renderAdminDatabaseViewer();

    // Render Charts
    if (window.AnalyticsEngine) {
      window.AnalyticsEngine.renderAllCharts();
    }
  }

  // Admin Subtabs Switching
  document.querySelectorAll('.admin-menu-item').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.admin-menu-item').forEach(i => i.classList.remove('active'));
      document.querySelectorAll('.admin-content-pane').forEach(p => p.classList.remove('active'));

      item.classList.add('active');
      const targetPane = document.getElementById(item.dataset.target);
      if (targetPane) targetPane.classList.add('active');

      // If analytics tab opened, trigger chart resize/redraw
      if (item.dataset.target === 'admin-pane-analytics' && window.AnalyticsEngine) {
        setTimeout(() => window.AnalyticsEngine.renderAllCharts(), 50);
      }
    });
  });

  // Admin User Management Table
  function renderAdminUsersList() {
    const tbody = document.getElementById('admin-users-tbody');
    if (!tbody) return;

    const searchTerm = document.getElementById('admin-user-search')?.value.toLowerCase() || '';
    let users = store.data.users;

    if (searchTerm) {
      users = users.filter(u => u.user_id.toLowerCase().includes(searchTerm) || u.name.toLowerCase().includes(searchTerm));
    }

    tbody.innerHTML = users.map(u => `
      <tr>
        <td><strong>${u.user_id}</strong></td>
        <td>${u.name}</td>
        <td>${u.age} yrs (${u.date_of_birth})</td>
        <td><span class="badge badge-success">${u.verification_status}</span></td>
        <td>
          <span class="badge ${u.account_status === 'Active' ? 'badge-success' : 'badge-danger'}">
            ${u.account_status}
          </span>
        </td>
        <td>
          ${u.role !== 'admin' ? `
            <button class="btn btn-outline btn-sm" onclick="window.adminToggleUser('${u.user_id}')">
              ${u.account_status === 'Active' ? 'Restrict' : 'Activate'}
            </button>
          ` : '<span style="font-size:0.8rem;color:var(--text-muted);">Admin Protected</span>'}
        </td>
      </tr>
    `).join('');
  }

  window.adminToggleUser = function(userId) {
    store.toggleUserStatus(userId);
    showToast(`Updated account status for ${userId}`);
    renderAdminPortal();
  };

  document.getElementById('admin-user-search')?.addEventListener('input', renderAdminUsersList);

  // Admin Product Limits Form
  function renderAdminProductRules() {
    const rules = store.data.product_rules;
    const inputHL = document.getElementById('rule-hl-max');
    const inputBeer = document.getElementById('rule-beer-max');
    const inputWine = document.getElementById('rule-wine-max');
    const inputNormBase = document.getElementById('rule-norm-base');
    const inputNormRed = document.getElementById('rule-norm-red');
    const inputAltBase = document.getElementById('rule-alt-base');
    const inputAltRed = document.getElementById('rule-alt-red');

    if (inputHL) inputHL.value = rules.hard_liquor_max;
    if (inputBeer) inputBeer.value = rules.beer_max;
    if (inputWine) inputWine.value = rules.wine_max;
    if (inputNormBase) inputNormBase.value = rules.normal_tobacco_base;
    if (inputNormRed) inputNormRed.value = rules.normal_tobacco_alcohol_reduced;
    if (inputAltBase) inputAltBase.value = rules.alt_tobacco_base;
    if (inputAltRed) inputAltRed.value = rules.alt_tobacco_alcohol_reduced;
  }

  const formProductRules = document.getElementById('form-product-rules');
  if (formProductRules) {
    formProductRules.addEventListener('submit', (e) => {
      e.preventDefault();
      store.updateProductRules({
        hard_liquor_max: parseInt(document.getElementById('rule-hl-max').value, 10),
        beer_max: parseInt(document.getElementById('rule-beer-max').value, 10),
        wine_max: parseInt(document.getElementById('rule-wine-max').value, 10),
        normal_tobacco_base: parseInt(document.getElementById('rule-norm-base').value, 10),
        normal_tobacco_alcohol_reduced: parseInt(document.getElementById('rule-norm-red').value, 10),
        alt_tobacco_base: parseInt(document.getElementById('rule-alt-base').value, 10),
        alt_tobacco_alcohol_reduced: parseInt(document.getElementById('rule-alt-red').value, 10)
      });
      showToast('Global product limit rules updated successfully.');
      renderAdminPortal();
    });
  }

  // Admin Slot Management
  function renderAdminSlots() {
    const tbody = document.getElementById('admin-slots-tbody');
    if (!tbody) return;

    tbody.innerHTML = store.getTimeSlots().map(s => `
      <tr>
        <td><strong>${s.slot_id}</strong></td>
        <td>${s.start_time} – ${s.end_time}</td>
        <td>${s.capacity}</td>
        <td>${s.booked}</td>
        <td><span class="badge ${s.active ? 'badge-success' : 'badge-danger'}">${s.active ? 'Active' : 'Disabled'}</span></td>
        <td>
          <button class="btn btn-outline btn-sm" onclick="window.adminToggleSlot('${s.slot_id}')">
            ${s.active ? 'Disable' : 'Enable'}
          </button>
        </td>
      </tr>
    `).join('');
  }

  window.adminToggleSlot = function(slotId) {
    const slot = store.data.time_slots.find(s => s.slot_id === slotId);
    if (slot) {
      slot.active = !slot.active;
      store.addAuditLog('TN-ADM-9001', `Toggled slot ${slotId} active status to ${slot.active}`);
      store.saveState();
      renderAdminSlots();
    }
  };

  // Admin Purchases Ledger & CSV Export
  function renderAdminPurchases() {
    const tbody = document.getElementById('admin-purchases-tbody');
    if (!tbody) return;

    tbody.innerHTML = store.data.purchases.map(p => `
      <tr>
        <td><strong>${p.purchase_id}</strong></td>
        <td>${p.user_id}</td>
        <td>${p.category}</td>
        <td>${p.quantity}</td>
        <td>${p.date} ${p.time}</td>
        <td><span class="badge ${p.status === 'Confirmed' ? 'badge-success' : p.status === 'Completed' ? 'badge-blue' : 'badge-danger'}">${p.status}</span></td>
      </tr>
    `).join('');
  }

  const btnExportCsv = document.getElementById('btn-export-purchases-csv');
  if (btnExportCsv) {
    btnExportCsv.addEventListener('click', () => {
      const purchases = store.data.purchases;
      let csv = 'PurchaseID,InternalUserID,Category,Quantity,Date,TimeSlot,Status,WeekCode\n';
      purchases.forEach(p => {
        csv += `"${p.purchase_id}","${p.user_id}","${p.category}",${p.quantity},"${p.date}","${p.time}","${p.status}","${p.week_code}"\n`;
      });

      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `UAL_Purchase_Ledger_${store.data.currentWeek}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast('Anonymized transaction report exported as CSV.');
    });
  }

  // Admin Legal Restriction Management
  function renderAdminRestrictions() {
    const tbody = document.getElementById('admin-restrictions-tbody');
    if (!tbody) return;

    tbody.innerHTML = store.data.restrictions.map(r => `
      <tr>
        <td><strong>${r.restriction_id}</strong></td>
        <td>${r.user_id}</td>
        <td>${r.case_reference}</td>
        <td>${r.restriction_type}</td>
        <td>${r.start_date} to ${r.end_date}</td>
        <td><span class="badge ${r.status === 'Active' ? 'badge-danger' : 'badge-success'}">${r.status}</span></td>
        <td>${r.authorized_officer}</td>
        <td>
          ${r.status === 'Active' ? `
            <button class="btn btn-outline btn-sm" onclick="window.adminRevokeRestriction('${r.restriction_id}')">Revoke</button>
          ` : '<span style="font-size:0.8rem;color:var(--text-muted);">Revoked</span>'}
        </td>
      </tr>
    `).join('');
  }

  window.adminRevokeRestriction = function(restId) {
    if (confirm(`Revoke legal restriction ${restId}?`)) {
      try {
        store.revokeRestriction(restId);
        showToast('Legal restriction revoked.');
        renderAdminRestrictions();
        renderAdminUsersList();
      } catch (e) {
        showToast(e.message, 'error');
      }
    }
  };

  // Add restriction modal logic
  const btnOpenAddRest = document.getElementById('btn-open-add-restriction');
  if (btnOpenAddRest) {
    btnOpenAddRest.addEventListener('click', () => {
      const modal = document.getElementById('modal-add-restriction');
      if (modal) modal.classList.add('active');
    });
  }

  const formAddRest = document.getElementById('form-add-restriction');
  if (formAddRest) {
    formAddRest.addEventListener('submit', (e) => {
      e.preventDefault();
      const userId = document.getElementById('add-rest-user-id').value;
      const type = document.getElementById('add-rest-type').value;
      const caseRef = document.getElementById('add-rest-caseref').value;
      const officer = document.getElementById('add-rest-officer').value;
      const remarks = document.getElementById('add-rest-remarks').value;

      try {
        store.addRestriction({
          user_id: userId,
          restriction_type: type,
          case_reference: caseRef,
          authorized_officer: officer,
          remarks: remarks
        });
        showToast('Legal restriction recorded.');
        document.getElementById('modal-add-restriction').classList.remove('active');
        renderAdminRestrictions();
        renderAdminUsersList();
      } catch (e) {
        showToast(e.message, 'error');
      }
    });
  }

  // Admin Weekly Reset Simulation Trigger
  const btnSimulateReset = document.getElementById('btn-simulate-weekly-reset');
  if (btnSimulateReset) {
    btnSimulateReset.addEventListener('click', () => {
      if (confirm('Simulate transition to next weekly cycle? Quotas will reset for all residents, while historical transaction ledger remains intact.')) {
        const newCycle = store.simulateWeeklyReset();
        showToast(`Cycle Reset Complete: New Active Cycle is ${newCycle}`);
        renderAdminPortal();
        renderDashboard();
      }
    });
  }

  // Admin Conceptual Database Viewer
  function renderAdminDatabaseViewer() {
    const viewer = document.getElementById('admin-db-json-viewer');
    if (!viewer) return;

    const previewData = {
      Current_Week: store.data.currentWeek,
      Table_Users: store.data.users,
      Table_Alcohol_Limits: store.data.alcohol_limits,
      Table_Tobacco_Limits: store.data.tobacco_limits,
      Table_Purchases_Count: store.data.purchases.length,
      Table_Time_Slots: store.data.time_slots,
      Table_Restrictions: store.data.restrictions,
      Table_Audit_Logs_Recent: store.data.audit_logs.slice(0, 5)
    };

    viewer.textContent = JSON.stringify(previewData, null, 2);
  }

  // Admin Login Authentication Modal
  const formAdminLogin = document.getElementById('form-admin-login');
  if (formAdminLogin) {
    formAdminLogin.addEventListener('submit', (e) => {
      e.preventDefault();
      const pin = document.getElementById('admin-pin-input').value;
      if (pin === '8899') {
        applyPersona('TN-ADM-9001');
        document.getElementById('modal-admin-login').classList.remove('active');
        showToast('Administrative authorization granted.');
      } else {
        showToast('Invalid Security PIN. Enter demo PIN: 8899', 'error');
      }
    });
  }

  // User Login Modal Simulation
  const formUserLogin = document.getElementById('form-user-login');
  if (formUserLogin) {
    formUserLogin.addEventListener('submit', (e) => {
      e.preventDefault();
      const mobile = document.getElementById('login-mobile-input').value;
      const otp = document.getElementById('login-otp-input').value;

      if (!mobile || mobile.length < 10) {
        showToast('Please enter a valid 10-digit mobile number', 'error');
        return;
      }
      if (!otp || otp.length < 4) {
        showToast('Please enter the 4-digit demo verification code (1234)', 'error');
        return;
      }

      // Check if mobile matches minor
      if (mobile === '9840998877') {
        document.getElementById('modal-user-login').classList.remove('active');
        applyPersona('TN-RES-1002'); // Minor persona
        return;
      }

      // Check if mobile matches restricted
      if (mobile === '9840554433') {
        document.getElementById('modal-user-login').classList.remove('active');
        applyPersona('TN-RES-1003'); // Restricted persona
        window.location.hash = '#dashboard';
        return;
      }

      // Default to Adult Resident
      document.getElementById('modal-user-login').classList.remove('active');
      applyPersona('TN-RES-1001');
      window.location.hash = '#dashboard';
      showToast('Identity verified successfully (Simulated).');
    });
  }

  // Button triggers for login modals
  const btnOpenUserLogin = document.getElementById('btn-open-user-login');
  if (btnOpenUserLogin) {
    btnOpenUserLogin.addEventListener('click', () => {
      document.getElementById('modal-user-login').classList.add('active');
    });
  }

  const btnOpenAdminLogin = document.getElementById('btn-open-admin-login');
  if (btnOpenAdminLogin) {
    btnOpenAdminLogin.addEventListener('click', () => {
      document.getElementById('modal-admin-login').classList.add('active');
    });
  }

  // Initialize view
  navigateTo(window.location.hash);
});
