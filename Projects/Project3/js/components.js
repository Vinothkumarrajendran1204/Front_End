/**
 * Tamil Nadu TASMAC Smart Booking & Limit Management System
 * UI Component Renderers
 */

const TasmacComponents = {
  // SVG Icon Helpers
  icons: {
    shield: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    mapPin: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
    clock: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    phone: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
    calendar: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
    qrCode: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`,
    alertTriangle: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
    checkCircle: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
    user: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
    search: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
    lock: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
    externalLink: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`,
    printer: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>`
  },

  // 1. Govt Top Strip
  renderGovStrip() {
    return `
      <div class="govt-top-strip">
        <div class="container">
          <div class="govt-tagline">
            <span style="font-size:1.1rem;">🏛️</span>
            <span>Government of Tamil Nadu • Prohibition & Excise Department • TASMAC</span>
          </div>
          <div class="govt-helpline">
            <span class="helpline-pill">Responsible Consumption Initiative</span>
            <span>Citizen Toll-Free: <strong>1800-425-0010</strong></span>
            <span>Emergency Police: <strong>112</strong></span>
          </div>
        </div>
      </div>
    `;
  },

  // 2. Main Navigation Bar
  renderNavbar(state) {
    const user = state.currentUser;
    const isAdmin = state.isAdmin;
    const activeView = state.activeView;

    let userPillHtml = '';
    if (isAdmin) {
      userPillHtml = `
        <div class="user-profile-pill" style="background:#0f172a; color:#fff; border-color:#334155;" onclick="tasmacApp.openAdminModal()">
          <div class="user-avatar" style="background:#38bdf8; color:#0f172a;">🛡️</div>
          <div class="user-info-text">
            <span class="user-name-text" style="color:#f8fafc;">T. Selvamani, IAS</span>
            <span class="user-aadhaar-masked" style="color:#94a3b8;">TASMAC Enforcement</span>
          </div>
          <button class="btn-filter-action" style="padding:0.2rem 0.5rem; font-size:0.75rem; margin-left:0.3rem;" onclick="event.stopPropagation(); tasmacStore.logout();">Logout</button>
        </div>
      `;
    } else if (user) {
      const maskedAadhaar = "XXXX-XXXX-" + user.aadhaarNumber.slice(-4);
      userPillHtml = `
        <div class="user-profile-pill" onclick="tasmacStore.setView('limits')">
          <div class="user-avatar">${user.name.charAt(0)}</div>
          <div class="user-info-text">
            <span class="user-name-text">${user.name}</span>
            <span class="user-aadhaar-masked">${maskedAadhaar}</span>
          </div>
          <button class="btn-filter-action" style="padding:0.2rem 0.5rem; font-size:0.75rem; margin-left:0.3rem;" title="Logout" onclick="event.stopPropagation(); tasmacStore.logout();">Logout</button>
        </div>
      `;
    } else {
      userPillHtml = `
        <button class="btn-login" onclick="tasmacApp.openLoginModal()">
          ${this.icons.user}
          <span>Citizen Login (Aadhaar OTP)</span>
        </button>
      `;
    }

    return `
      <header class="main-header">
        <div class="container nav-container">
          <div class="brand-logo-area" onclick="tasmacStore.setView('home')">
            <div class="emblem-icon">TN</div>
            <div class="brand-text">
              <span class="brand-title">TASMAC Smart Booking</span>
              <span class="brand-sub">Quota & Limit Management Portal</span>
              <span class="brand-tamil">தமிழ்நாடு அரசு - டாஸ்மாக் இணைய முன்பதிவு</span>
            </div>
          </div>

          <ul class="nav-links">
            <li class="nav-item">
              <a href="javascript:void(0)" class="nav-link ${activeView === 'home' ? 'active' : ''}" onclick="tasmacStore.setView('home')">Home</a>
            </li>
            <li class="nav-item">
              <a href="javascript:void(0)" class="nav-link ${activeView === 'shops' ? 'active' : ''}" onclick="tasmacStore.setView('shops')">Nearby Shops</a>
            </li>
            <li class="nav-item">
              <a href="javascript:void(0)" class="nav-link ${activeView === 'shop-detail' ? 'active' : ''}" onclick="tasmacStore.setView('shop-detail')">Shop Products</a>
            </li>
            <li class="nav-item">
              <a href="javascript:void(0)" class="nav-link ${activeView === 'limits' ? 'active' : ''}" onclick="tasmacStore.setView('limits')">My Limits</a>
            </li>
            <li class="nav-item">
              <a href="javascript:void(0)" class="nav-link ${activeView === 'my-bookings' ? 'active' : ''}" onclick="tasmacStore.setView('my-bookings')">My Bookings</a>
            </li>
            <li class="nav-item">
              <a href="javascript:void(0)" class="nav-link ${activeView === 'history' ? 'active' : ''}" onclick="tasmacStore.setView('history')">Purchase History</a>
            </li>
          </ul>

          <div class="nav-right-actions">
            <!-- District/City Quick Switcher -->
            <button class="location-quick-badge" onclick="tasmacApp.openLocationModal()" title="Change District or City">
              ${this.icons.mapPin}
              <span>${state.selectedDistrict} (${state.selectedCity})</span>
            </button>

            <!-- 1-Click Demo Persona Switcher -->
            <div class="persona-dropdown-wrapper">
              <button class="persona-selector-btn" onclick="tasmacApp.openPersonaModal()" title="Switch test persona">
                <span>🎭 Demo Persona</span>
              </button>
            </div>

            <!-- User Auth Pill -->
            ${userPillHtml}

            <!-- Admin Toggle Button -->
            ${!isAdmin ? `
              <button class="btn-admin-switch" onclick="tasmacApp.openAdminLoginModal()" title="Authorized Officer Access">
                ${this.icons.shield}
                <span>Admin</span>
              </button>
            ` : `
              <button class="btn-admin-switch" style="background:#0284c7;" onclick="tasmacStore.setView('admin')">
                <span>Portal View</span>
              </button>
            `}
          </div>
        </div>
      </header>
    `;
  },

  // 3. Restriction Banner (Displayed when logged-in account has active legal restriction)
  renderRestrictionBanner(user) {
    if (!user || !user.isRestricted) return '';

    const details = user.restrictionDetails || {};
    return `
      <div class="restriction-banner">
        <div class="container">
          <div class="restriction-left">
            <span style="font-size:1.2rem;">⚠️</span>
            <span>
              <strong>ACCOUNT RESTRICTED:</strong> Legal restriction recorded (${details.offenceType || 'DUI / Public Order'}). Alcohol token booking is strictly blocked by Government Mandate.
            </span>
          </div>
          <div>
            <button class="btn-view-case" onclick="tasmacApp.openLegalCaseModal()">View Legal Case & Review Info</button>
          </div>
        </div>
      </div>
    `;
  },

  // 4. Hero Section
  renderHero(state) {
    const limits = tasmacStore.getUserLimits(state.currentUser);
    const user = state.currentUser;

    return `
      <section class="hero-section">
        <div class="container hero-grid">
          <div>
            <div class="hero-badge-row">
              <span class="gov-badge">
                ${this.icons.shield}
                Official Tamil Nadu Portal
              </span>
              <span class="sub-badge">Responsible Smart Distribution</span>
              <span class="sub-badge" style="background:#e0f2fe; color:#0369a1; border-color:#bae6fd;">Anti-Hoarding AI Limit Enforcement</span>
            </div>

            <h1 class="hero-title">
              Tamil Nadu TASMAC <span>Smart Booking</span> & Limit Portal
            </h1>

            <p class="hero-description">
              Secure Aadhaar-verified advance token booking system across Tamil Nadu state outlets. Transparent weekly quota tracking, queue-free collection time slots, and legal compliance assurance.
            </p>

            <div class="hero-actions-row">
              <button class="btn-primary" onclick="tasmacStore.setView('shops')">
                ${this.icons.mapPin}
                <span>Find Nearby Shop</span>
              </button>
              <button class="btn-outline" onclick="tasmacStore.setView('shop-detail')">
                <span>Book Products</span>
              </button>
              <button class="btn-filter-action" onclick="tasmacStore.setView('limits')">
                ${this.icons.shield}
                <span>Check My Limits</span>
              </button>
              <button class="btn-filter-action" onclick="tasmacStore.setView('my-bookings')">
                ${this.icons.qrCode}
                <span>My Bookings</span>
              </button>
              <button class="btn-filter-action" onclick="tasmacStore.setView('history')">
                ${this.icons.lock}
                <span>Purchase History</span>
              </button>
            </div>

            <div class="hero-stats-row">
              <div class="stat-item">
                <span class="stat-number">4,800+</span>
                <span class="stat-label">TASMAC Outlets in TN</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">100%</span>
                <span class="stat-label">Aadhaar Verified</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">1 Full / 2 Beers</span>
                <span class="stat-label">Weekly Citizen Limit</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">0 Queue</span>
                <span class="stat-label">Express Slot Collection</span>
              </div>
            </div>
          </div>

          <!-- Live Limit Card Preview (Right side) -->
          <div>
            <div class="hero-card-preview">
              <div class="preview-card-header">
                <div>
                  <div class="preview-card-title">
                    ${this.icons.shield}
                    <span>Live Quota Status</span>
                  </div>
                  <span style="font-size:0.75rem; color:var(--text-muted);">
                    ${user ? `Verified: ${user.name} (${user.aadhaarNumber.slice(-4)})` : 'Guest Mode (Click Demo Persona to test)'}
                  </span>
                </div>
                <div>
                  ${limits.isRestricted ? `
                    <span class="status-indicator-pill status-restricted">Restricted</span>
                  ` : limits.alcohol.isReached ? `
                    <span class="status-indicator-pill status-warning">Limit Reached</span>
                  ` : `
                    <span class="status-indicator-pill status-active">Active & Available</span>
                  `}
                </div>
              </div>

              ${this.renderLimitGauges(limits)}

              <div style="margin-top:1.25rem; display:flex; gap:0.5rem;">
                <button class="btn-primary" style="width:100%; justify-content:center; padding:0.6rem;" onclick="tasmacStore.setView('shop-detail')">
                  Book from Nearest Shop
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  },

  // 5. Limit Progress Gauges Component
  renderLimitGauges(limits) {
    const alc = limits.alcohol;
    const cig = limits.cigarettes;

    // Reset date string
    const resetDateObj = new Date(alc.resetDate);
    const resetStr = resetDateObj.toLocaleDateString("en-IN", { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });

    let alcoholWarningHtml = '';
    if (limits.isRestricted) {
      alcoholWarningHtml = `
        <div class="limit-warning-box">
          ${this.icons.alertTriangle}
          <span>Account Restricted: Alcohol booking barred by government mandate.</span>
        </div>
      `;
    } else if (alc.isReached) {
      alcoholWarningHtml = `
        <div class="limit-warning-box">
          ${this.icons.alertTriangle}
          <span>Weekly alcohol limit reached. You can purchase again after the limit resets.</span>
        </div>
      `;
    }

    return `
      <div class="limit-meter-grid">
        <!-- Alcohol Meter -->
        <div class="meter-card">
          <div class="meter-header">
            <div class="meter-title">
              <span>🍾 Alcohol Weekly Quota</span>
            </div>
            <div class="meter-values">
              <span class="highlight">${alc.used}</span> / ${alc.max} unit used
            </div>
          </div>

          <div class="progress-bar-bg">
            <div class="progress-bar-fill ${alc.isReached ? 'danger' : alc.percent > 50 ? 'warning' : ''}" style="width: ${alc.percent}%;"></div>
          </div>

          <div class="meter-subtext">
            <span>Remaining: <strong>${alc.remaining} unit</strong> (Max: 1 Full Bottle OR 2 Beers OR 2 Wines)</span>
            <span>Resets: <strong>${resetStr}</strong></span>
          </div>

          ${alcoholWarningHtml}
        </div>

        <!-- Cigarettes Meter (Dynamic) -->
        <div class="meter-card">
          <div class="meter-header">
            <div class="meter-title">
              <span>🚬 Cigarette Weekly Quota</span>
            </div>
            <div class="meter-values" style="font-size:0.75rem;">
              ${cig.hasAlcoholUsed ? `<span style="color:#b45309; font-weight:700;">Reduced Tier (Alcohol Consumed)</span>` : `<span style="color:#15803d; font-weight:700;">Standard Tier (No Alcohol)</span>`}
            </div>
          </div>

          <!-- High Nicotine -->
          <div style="margin-bottom:0.75rem;">
            <div style="display:flex; justify-content:space-between; font-size:0.78rem; font-weight:600; margin-bottom:0.25rem;">
              <span>High Nicotine Packs</span>
              <span>${cig.high.used} / ${cig.high.max} used (${cig.high.remaining} left)</span>
            </div>
            <div class="progress-bar-bg" style="height:6px;">
              <div class="progress-bar-fill ${cig.high.isReached ? 'danger' : ''}" style="width: ${cig.high.percent}%;"></div>
            </div>
          </div>

          <!-- Low Nicotine -->
          <div>
            <div style="display:flex; justify-content:space-between; font-size:0.78rem; font-weight:600; margin-bottom:0.25rem;">
              <span>Low Nicotine Packs</span>
              <span>${cig.low.used} / ${cig.low.max} used (${cig.low.remaining} left)</span>
            </div>
            <div class="progress-bar-bg" style="height:6px;">
              <div class="progress-bar-fill ${cig.low.isReached ? 'danger' : ''}" style="width: ${cig.low.percent}%;"></div>
            </div>
          </div>

          <div class="meter-subtext" style="margin-top:0.5rem;">
            <span>Rule: High max ${cig.high.max} / Low max ${cig.low.max} packs based on alcohol status</span>
          </div>
        </div>
      </div>
    `;
  },

  // 6. User Dashboard View (Home or User center)
  renderUserDashboard(state) {
    const user = state.currentUser;
    const limits = tasmacStore.getUserLimits(user);
    const bookings = tasmacStore.getUserBookings();
    const activeBooking = bookings.find(b => b.status === "Confirmed" || b.status === "Ready for Collection");
    const filteredShops = tasmacStore.getFilteredShops().slice(0, 3);

    return `
      <div class="section" style="padding-top:1.5rem;">
        <div class="container">
          <!-- Welcome Bar -->
          <div style="background:white; border:1px solid var(--border-light); border-radius:var(--radius-lg); padding:1.5rem; box-shadow:var(--shadow-sm); margin-bottom:2rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem;">
            <div style="display:flex; align-items:center; gap:1rem;">
              <div class="user-avatar" style="width:52px; height:52px; font-size:1.3rem;">
                ${user ? user.name.charAt(0) : 'G'}
              </div>
              <div>
                <h2 style="font-size:1.35rem; font-weight:800; color:var(--text-primary); margin-bottom:0.2rem;">
                  Vanakkam, ${user ? user.name : 'Citizen'}!
                </h2>
                <div style="display:flex; align-items:center; gap:0.75rem; font-size:0.82rem; color:var(--text-secondary); flex-wrap:wrap;">
                  <span>Aadhaar: <strong style="font-family:monospace;">${user ? 'XXXX-XXXX-' + user.aadhaarNumber.slice(-4) : 'Not Logged In'}</strong></span>
                  <span>•</span>
                  <span>Registered Location: <strong>${state.selectedDistrict}, ${state.selectedCity}</strong></span>
                  <span>•</span>
                  <span>Status: <strong style="color:${limits.isRestricted ? 'var(--danger)' : 'var(--primary)'};">${limits.isRestricted ? 'Restricted' : 'Verified Citizen'}</strong></span>
                </div>
              </div>
            </div>

            <div style="display:flex; gap:0.6rem; align-items:center;">
              <button class="btn-filter-action" onclick="tasmacApp.openLocationModal()">
                ${this.icons.mapPin}
                <span>Change City / District</span>
              </button>
              <button class="btn-outline" onclick="tasmacStore.setView('limits')">
                View Full Limits
              </button>
            </div>
          </div>

          <!-- Active Booking Pass (If any) -->
          ${activeBooking ? this.renderBookingPassCard(activeBooking) : ''}

          <!-- Grid: Quota Gauges & Nearby TASMAC Outlets -->
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:2rem; margin-bottom:2.5rem;" class="dashboard-split-grid">
            <div>
              <div class="section-header" style="margin-bottom:1rem;">
                <div class="section-header-left">
                  <span class="section-eyebrow">Smart Quota Ledger</span>
                  <h3 style="font-size:1.25rem; font-weight:800;">Weekly Alcohol & Cigarette Limits</h3>
                </div>
              </div>
              ${this.renderLimitGauges(limits)}
            </div>

            <div>
              <div class="section-header" style="margin-bottom:1rem;">
                <div class="section-header-left">
                  <span class="section-eyebrow">Location-Based Recommendations</span>
                  <h3 style="font-size:1.25rem; font-weight:800;">Nearby TASMAC Shops in ${state.selectedCity}</h3>
                </div>
                <button class="btn-filter-action" onclick="tasmacStore.setView('shops')">View All (${tasmacStore.getFilteredShops().length})</button>
              </div>

              <div style="display:flex; flex-direction:column; gap:1rem;">
                ${filteredShops.map(shop => this.renderShopMiniCard(shop)).join('')}
              </div>
            </div>
          </div>

          <!-- Recent Purchase Log -->
          <div style="margin-top:2rem;">
            <div class="section-header">
              <div class="section-header-left">
                <span class="section-eyebrow">Private Audit Record</span>
                <h3 class="section-title">Recent Purchase History</h3>
                <p class="section-subtitle">Aadhaar encrypted collection ledger. Accessible only to authenticated citizen.</p>
              </div>
              <button class="btn-outline" onclick="tasmacStore.setView('history')">View Full History</button>
            </div>

            ${this.renderPurchaseHistoryTable(tasmacStore.getUserPurchases().slice(0, 4))}
          </div>
        </div>
      </div>
    `;
  },

  // 7. Active Booking Pass Card
  renderBookingPassCard(booking) {
    return `
      <div class="booking-pass-card">
        <div class="pass-header">
          <div class="pass-header-left">
            <span style="font-size:1.4rem;">🎟️</span>
            <div>
              <div style="font-size:0.75rem; text-transform:uppercase; letter-spacing:0.05em; opacity:0.85;">Official TASMAC Collection Pass</div>
              <div class="pass-id">${booking.id}</div>
            </div>
          </div>
          <div>
            <span class="status-badge ${booking.status.toLowerCase()}">${booking.status}</span>
          </div>
        </div>

        <div class="pass-body">
          <div class="qr-code-box">
            <div id="qr-target-${booking.id}" class="qr-render-area" data-qr="${booking.qrData}"></div>
            <div class="qr-caption">Scan at TASMAC Counter</div>
          </div>

          <div>
            <div class="pass-details-grid">
              <div class="pass-field">
                <span class="pass-field-label">Selected Shop</span>
                <span class="pass-field-value">${booking.shopName}</span>
                <span style="font-size:0.78rem; color:var(--text-muted);">${booking.shopAddress}</span>
              </div>

              <div class="pass-field">
                <span class="pass-field-label">Collection Window</span>
                <span class="pass-field-value" style="color:var(--primary); font-size:1.05rem;">${booking.date} • ${booking.timeSlot}</span>
                <span style="font-size:0.78rem; color:var(--text-muted);">Please arrive strictly during this time slot</span>
              </div>

              <div class="pass-field">
                <span class="pass-field-label">Booked Product</span>
                <span class="pass-field-value">${booking.productName} (${booking.size})</span>
                <span style="font-size:0.78rem; color:var(--text-muted);">Quantity: <strong>${booking.quantity}</strong> | Amount: <strong>₹${booking.totalAmount}</strong></span>
              </div>

              <div class="pass-field">
                <span class="pass-field-label">Citizen Verification</span>
                <span class="pass-field-value">${booking.userName}</span>
                <span style="font-size:0.78rem; color:var(--text-muted); font-family:monospace;">Aadhaar: ${booking.userAadhaarMasked}</span>
              </div>

              <div class="pass-instructions-box">
                <span>⚠️</span>
                <span>Customer must visit the selected shop during the declared time slot with this digital pass and original government photo ID. Counter staff will verify QR code.</span>
              </div>
            </div>

            <div style="display:flex; justify-content:flex-end; gap:0.75rem; margin-top:1.25rem;">
              <button class="btn-filter-action" onclick="tasmacApp.printPass('${booking.id}')">
                ${this.icons.printer}
                <span>Print / Download Pass</span>
              </button>
              <button class="btn-filter-action" style="color:var(--danger); border-color:var(--danger-border);" onclick="tasmacApp.cancelBooking('${booking.id}')">
                Cancel Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // 8. Mini Shop Card for Dashboard
  renderShopMiniCard(shop) {
    return `
      <div style="background:white; border:1px solid var(--border-light); border-radius:var(--radius-md); padding:1rem; display:flex; justify-content:space-between; align-items:center; gap:1rem;">
        <div style="flex-grow:1;">
          <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.25rem;">
            <span class="shop-id-badge">${shop.id}</span>
            <span class="shop-distance-badge">${this.icons.mapPin} ${shop.distanceKm} km</span>
            <span class="shop-status-badge ${shop.isOpen ? 'open' : 'closed'}">● ${shop.isOpen ? 'Open Now' : 'Closed'}</span>
          </div>
          <div style="font-weight:700; font-size:0.95rem; color:var(--text-primary);">${shop.name}</div>
          <div style="font-size:0.78rem; color:var(--text-muted);">${shop.address}</div>
        </div>
        <div style="display:flex; flex-direction:column; gap:0.4rem; min-width:110px;">
          <button class="btn-shop-view" style="padding:0.45rem; font-size:0.78rem;" onclick="tasmacStore.setView('shop-detail', '${shop.id}')">
            View Products
          </button>
          <button class="btn-shop-book" style="padding:0.45rem; font-size:0.78rem;" onclick="tasmacApp.openQuickBooking('${shop.id}')">
            Book Now
          </button>
        </div>
      </div>
    `;
  },

  // 9. Shop List View (Section 3)
  renderShopListView(state) {
    const shops = tasmacStore.getFilteredShops();
    const districts = state.districts;
    const currentDist = districts.find(d => d.name === state.selectedDistrict) || districts[0];

    return `
      <div class="section">
        <div class="container">
          <div class="section-header">
            <div class="section-header-left">
              <span class="section-eyebrow">Tamil Nadu State Outlets</span>
              <h2 class="section-title">TASMAC Retail & Elite Outlets</h2>
              <p class="section-subtitle">Showing verified government liquor outlets in <strong>${state.selectedDistrict} (${state.selectedCity})</strong>.</p>
            </div>
            <div style="display:flex; gap:0.5rem;">
              <button class="btn-primary" onclick="tasmacApp.detectCurrentLocation()">
                ${this.icons.mapPin}
                <span>Use My GPS Location</span>
              </button>
            </div>
          </div>

          <!-- Filter & Search Bar -->
          <div class="filter-bar">
            <div class="filter-group">
              <!-- District Selector -->
              <div>
                <label style="font-size:0.72rem; font-weight:700; color:var(--text-muted); display:block; margin-bottom:0.2rem;">DISTRICT</label>
                <select class="select-control" onchange="tasmacStore.setLocation(this.value, 'All')">
                  ${districts.map(d => `
                    <option value="${d.name}" ${d.name === state.selectedDistrict ? 'selected' : ''}>${d.name} (${d.nameTamil})</option>
                  `).join('')}
                </select>
              </div>

              <!-- City / Area Selector -->
              <div>
                <label style="font-size:0.72rem; font-weight:700; color:var(--text-muted); display:block; margin-bottom:0.2rem;">CITY / LOCALITY</label>
                <select class="select-control" onchange="tasmacStore.setLocation('${state.selectedDistrict}', this.value)">
                  <option value="All" ${state.selectedCity === 'All' ? 'selected' : ''}>All Areas in ${state.selectedDistrict}</option>
                  ${currentDist.cities.map(c => `
                    <option value="${c}" ${c === state.selectedCity ? 'selected' : ''}>${c}</option>
                  `).join('')}
                </select>
              </div>
            </div>

            <!-- Search Shop -->
            <div class="search-input-box">
              <span class="search-icon">${this.icons.search}</span>
              <input type="text" placeholder="Search by Shop ID, Name, or Street..." value="${state.searchQuery || ''}" oninput="tasmacApp.handleSearch(this.value)">
            </div>
          </div>

          <!-- Shops Grid -->
          ${shops.length === 0 ? `
            <div style="background:white; padding:3rem; text-align:center; border-radius:var(--radius-lg); border:1px solid var(--border-light);">
              <span style="font-size:2.5rem;">🏬</span>
              <h3 style="font-size:1.25rem; font-weight:800; margin:0.75rem 0 0.25rem;">No TASMAC Shops Found</h3>
              <p style="color:var(--text-muted); font-size:0.9rem;">Try selecting another district or city area from the filters above.</p>
              <button class="btn-primary" style="margin-top:1rem;" onclick="tasmacStore.setLocation('Chennai', 'All')">Reset to Chennai</button>
            </div>
          ` : `
            <div class="shops-grid">
              ${shops.map(shop => this.renderShopCard(shop)).join('')}
            </div>
          `}
        </div>
      </div>
    `;
  },

  // 10. Single Shop Card
  renderShopCard(shop) {
    const slotSummary = shop.timeSlots.map(s => s.capacity - s.booked).reduce((a, b) => a + b, 0);

    return `
      <div class="shop-card">
        <div class="shop-card-top">
          <span class="shop-id-badge">${shop.id}</span>
          <span class="shop-distance-badge">
            ${this.icons.mapPin}
            <span>${shop.distanceKm} km away</span>
          </span>
        </div>

        <h3 class="shop-name">${shop.name}</h3>
        <p class="shop-address">${shop.address} <br><span style="color:var(--accent-gold); font-weight:600;">Landmark:</span> ${shop.landmark}</p>

        <div class="shop-meta-list">
          <div class="shop-meta-row">
            <span class="label">${this.icons.clock} Operating Hours</span>
            <span style="font-weight:700;">${shop.openingTime} - ${shop.closingTime}</span>
          </div>

          <div class="shop-meta-row">
            <span class="label">${this.icons.shield} Status</span>
            <span class="shop-status-badge ${shop.isOpen ? 'open' : 'closed'}">
              ● ${shop.isOpen ? 'Open Now' : 'Closed'} (${shop.stockStatus})
            </span>
          </div>

          <div class="shop-meta-row">
            <span class="label">${this.icons.calendar} Available Slots</span>
            <span style="color:var(--primary); font-weight:700;">${slotSummary} token capacity left today</span>
          </div>

          <div class="shop-meta-row">
            <span class="label">${this.icons.phone} Contact</span>
            <span>${shop.phone}</span>
          </div>
        </div>

        <div class="shop-card-actions">
          <button class="btn-shop-view" onclick="tasmacStore.setView('shop-detail', '${shop.id}')">
            View Products
          </button>
          <button class="btn-shop-book" onclick="tasmacApp.openQuickBooking('${shop.id}')">
            Book Now
          </button>
        </div>
      </div>
    `;
  },

  // 11. Shop Products Page (Section 4)
  renderShopProductPage(state) {
    const shopId = state.selectedShopId || state.shops[0].id;
    const shop = state.shops.find(s => s.id === shopId) || state.shops[0];
    const products = tasmacStore.getFilteredProducts(shop.id);
    const userLimits = tasmacStore.getUserLimits(state.currentUser);
    const user = state.currentUser;

    const categories = ["All", "Hard Liquor", "Beer", "Wine", "Cigarettes"];

    return `
      <div class="section">
        <div class="container">
          <!-- Active Shop Banner -->
          <div style="background:white; border:1px solid var(--border-light); border-radius:var(--radius-lg); padding:1.5rem; box-shadow:var(--shadow-sm); margin-bottom:1.5rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem;">
            <div>
              <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.25rem;">
                <span class="shop-id-badge">${shop.id}</span>
                <span class="shop-distance-badge">${this.icons.mapPin} ${shop.distanceKm} km</span>
                <span class="shop-status-badge ${shop.isOpen ? 'open' : 'closed'}">● ${shop.isOpen ? 'Open Now' : 'Closed'}</span>
              </div>
              <h2 style="font-size:1.4rem; font-weight:800; color:var(--text-primary); margin-bottom:0.2rem;">
                ${shop.name}
              </h2>
              <p style="font-size:0.85rem; color:var(--text-secondary);">${shop.address} • Phone: ${shop.phone}</p>
            </div>

            <div style="display:flex; gap:0.6rem;">
              <button class="btn-filter-action" onclick="tasmacStore.setView('shops')">
                Change Shop
              </button>
            </div>
          </div>

          <!-- Category Tabs (Section 4) -->
          <div class="category-pills-row">
            ${categories.map(cat => `
              <button class="category-pill ${state.selectedCategory === cat ? 'active' : ''}" onclick="tasmacApp.handleCategorySelect('${cat}')">
                ${cat === 'Hard Liquor' ? '🥃 ' : cat === 'Beer' ? '🍺 ' : cat === 'Wine' ? '🍷 ' : cat === 'Cigarettes' ? '🚬 ' : '🌟 '}
                ${cat}
              </button>
            `).join('')}
          </div>

          <!-- Search & Filter Controls -->
          <div class="filter-bar" style="margin-bottom:1.75rem;">
            <div class="filter-group">
              <!-- In stock only toggle -->
              <button class="btn-filter-action ${state.availabilityFilter === 'in-stock' ? 'active' : ''}" onclick="tasmacApp.toggleAvailabilityFilter()">
                ${this.icons.checkCircle}
                <span>In-Stock Only</span>
              </button>

              <!-- Price Filter Slider -->
              <div style="display:flex; align-items:center; gap:0.5rem;">
                <label style="font-size:0.82rem; font-weight:700; color:var(--text-muted);">Max Price: ₹${state.maxPrice}</label>
                <input type="range" min="200" max="2000" step="50" value="${state.maxPrice}" oninput="tasmacApp.handlePriceSlider(this.value)" style="cursor:pointer; accent-color:var(--primary);">
              </div>
            </div>

            <!-- Product Search -->
            <div class="search-input-box">
              <span class="search-icon">${this.icons.search}</span>
              <input type="text" placeholder="Search brands, products..." value="${state.searchQuery || ''}" oninput="tasmacApp.handleSearch(this.value)">
            </div>
          </div>

          <!-- Product Grid -->
          ${products.length === 0 ? `
            <div style="background:white; padding:3rem; text-align:center; border-radius:var(--radius-lg); border:1px solid var(--border-light);">
              <span style="font-size:2.5rem;">🔍</span>
              <h3 style="font-size:1.25rem; font-weight:800; margin:0.75rem 0 0.25rem;">No Products Match Your Criteria</h3>
              <p style="color:var(--text-muted); font-size:0.9rem;">Try relaxing your filters or search term.</p>
              <button class="btn-primary" style="margin-top:1rem;" onclick="tasmacApp.resetProductFilters()">Clear Filters</button>
            </div>
          ` : `
            <div class="products-grid">
              ${products.map(prod => this.renderProductCard(prod, shop, userLimits, user)).join('')}
            </div>
          `}
        </div>
      </div>
    `;
  },

  // 12. Product Card
  renderProductCard(product, shop, userLimits, user) {
    const stock = shop.inventory?.[product.id] ?? 0;
    const canBook = tasmacStore.canBookProduct(product.id, 1, user);

    let stockTagClass = 'product-stock-tag';
    let stockLabel = `${stock} in stock`;
    if (stock <= 0) {
      stockTagClass += ' out';
      stockLabel = 'Out of Stock';
    } else if (stock <= 5) {
      stockTagClass += ' low';
      stockLabel = `Low Stock: ${stock} left`;
    }

    // Limit indicator chip
    let limitChipHtml = '';
    if (userLimits.isRestricted) {
      limitChipHtml = `
        <div class="user-limit-chip blocked">
          <span>Account Restricted</span>
          <span>Alcohol Barred</span>
        </div>
      `;
    } else if (product.category === "Hard Liquor" || product.category === "Beer" || product.category === "Wine") {
      if (userLimits.alcohol.isReached) {
        limitChipHtml = `
          <div class="user-limit-chip blocked">
            <span>Weekly Alcohol Quota Reached</span>
            <span>0 Left</span>
          </div>
        `;
      } else {
        limitChipHtml = `
          <div class="user-limit-chip">
            <span>Remaining Alcohol Quota</span>
            <span>${userLimits.alcohol.remaining} unit left</span>
          </div>
        `;
      }
    } else if (product.category === "Cigarettes") {
      const isHigh = product.nicotineType === "high";
      const cigLimits = isHigh ? userLimits.cigarettes.high : userLimits.cigarettes.low;
      limitChipHtml = `
        <div class="user-limit-chip ${cigLimits.isReached ? 'blocked' : ''}">
          <span>${isHigh ? 'High' : 'Low'} Nicotine Quota</span>
          <span>${cigLimits.remaining} of ${cigLimits.max} packs left</span>
        </div>
      `;
    }

    return `
      <div class="product-card">
        <div class="product-image-container">
          <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=600&auto=format&fit=crop&q=80'">
          <span class="product-badge-cat">${product.category}</span>
          <span class="${stockTagClass}">${stockLabel}</span>
        </div>

        <div class="product-body">
          <div class="product-brand-line">
            <span>${product.brand}</span>
            <span style="color:var(--text-muted); font-size:0.7rem;">${product.subCategory}</span>
          </div>

          <h4 class="product-name">${product.name}</h4>

          <div class="product-specs-row">
            <span class="spec-pill">${product.size}</span>
            <span class="spec-pill">${product.abv}</span>
          </div>

          ${limitChipHtml}

          <div class="product-price-row">
            <div>
              <span class="mrp-label">TN Govt MRP</span>
              <div class="product-price">₹${product.price}</div>
            </div>
            <span style="font-size:0.72rem; color:var(--text-muted);">Inclusive of all taxes</span>
          </div>

          <button class="btn-product-book" 
            ${!canBook.allowed || stock <= 0 || !shop.isOpen ? 'disabled' : ''} 
            onclick="tasmacApp.openBookingModal('${shop.id}', '${product.id}')"
            title="${!canBook.allowed ? canBook.reason : stock <= 0 ? 'Out of Stock' : !shop.isOpen ? 'Shop is currently closed' : 'Book Now'}">
            ${this.icons.calendar}
            <span>${stock <= 0 ? 'Out of Stock' : !canBook.allowed ? 'Limit Reached' : 'Book Now'}</span>
          </button>
        </div>
      </div>
    `;
  },

  // 13. My Limits View (Section 5 & 6)
  renderMyLimitsView(state) {
    const user = state.currentUser;
    const limits = tasmacStore.getUserLimits(user);

    return `
      <div class="section">
        <div class="container" style="max-width:960px;">
          <div class="section-header">
            <div class="section-header-left">
              <span class="section-eyebrow">Tamil Nadu Liquor Regulation Act</span>
              <h2 class="section-title">Alcohol & Cigarette Limit Ledger</h2>
              <p class="section-subtitle">Official state quota tracking linked to verified citizen identity.</p>
            </div>
            <button class="btn-outline" onclick="tasmacApp.openPersonaModal()">Switch Test Citizen</button>
          </div>

          <!-- Main Quota Gauge Component -->
          ${this.renderLimitGauges(limits)}

          <!-- Rule Explanation Card -->
          <div style="background:white; border-radius:var(--radius-lg); border:1px solid var(--border-light); padding:1.75rem; margin-top:2rem; box-shadow:var(--shadow-sm);">
            <h3 style="font-size:1.15rem; font-weight:800; margin-bottom:1rem; color:var(--primary);">
              📜 Government Quota Allocation Rules
            </h3>

            <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.5rem;" class="rules-split-grid">
              <div style="background:var(--bg-muted); padding:1.25rem; border-radius:var(--radius-md);">
                <h4 style="font-size:0.95rem; font-weight:800; color:var(--primary); margin-bottom:0.5rem;">
                  1. Alcohol Weekly Quota (Section 5)
                </h4>
                <ul style="font-size:0.85rem; color:var(--text-secondary); line-height:1.6; padding-left:1.2rem;">
                  <li><strong>Hard Liquor:</strong> Maximum 1 Full Bottle (750ml) per week</li>
                  <li><strong>OR Beer:</strong> Maximum 2 Bottles / Cans per week</li>
                  <li><strong>OR Wine:</strong> Maximum 2 Bottles per week</li>
                  <li>Units are interchangeable (e.g. 1 Beer = 0.5 unit, leaving 0.5 unit for another beer or wine).</li>
                  <li>Quota resets every <strong>Monday at 12:00 AM</strong> automatically.</li>
                </ul>
              </div>

              <div style="background:var(--bg-muted); padding:1.25rem; border-radius:var(--radius-md);">
                <h4 style="font-size:0.95rem; font-weight:800; color:var(--accent-gold); margin-bottom:0.5rem;">
                  2. Cigarette Quota Dynamic Tiering (Section 6)
                </h4>
                <ul style="font-size:0.85rem; color:var(--text-secondary); line-height:1.6; padding-left:1.2rem;">
                  <li><strong>If Alcohol NOT Used:</strong> High Nicotine max 5 packs/wk • Low Nicotine max 10 packs/wk.</li>
                  <li><strong>If Alcohol HAS Been Used:</strong> High Nicotine dynamically restricted to max 3 packs/wk • Low Nicotine to 6 packs/wk.</li>
                  <li>Promotes public health and prevents co-addiction escalation.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // 14. My Bookings View (Section 7)
  renderMyBookingsView(state) {
    const bookings = tasmacStore.getUserBookings();

    return `
      <div class="section">
        <div class="container">
          <div class="section-header">
            <div class="section-header-left">
              <span class="section-eyebrow">Express Counter Pickup</span>
              <h2 class="section-title">My Smart Bookings & QR Passes</h2>
              <p class="section-subtitle">Present generated QR pass at selected shop during designated time slot.</p>
            </div>
            <button class="btn-primary" onclick="tasmacStore.setView('shop-detail')">Book Another Product</button>
          </div>

          ${bookings.length === 0 ? `
            <div style="background:white; padding:3.5rem; text-align:center; border-radius:var(--radius-lg); border:1px solid var(--border-light);">
              <span style="font-size:3rem;">🎟️</span>
              <h3 style="font-size:1.3rem; font-weight:800; margin:1rem 0 0.4rem;">No Active Bookings</h3>
              <p style="color:var(--text-muted); font-size:0.95rem; max-width:450px; margin:0 auto 1.5rem;">You do not have any pending liquor or cigarette pickup tokens reserved at TASMAC shops.</p>
              <button class="btn-primary" onclick="tasmacStore.setView('shop-detail')">Explore Shop & Book</button>
            </div>
          ` : `
            <div>
              ${bookings.map(b => this.renderBookingPassCard(b)).join('')}
            </div>
          `}
        </div>
      </div>
    `;
  },

  // 15. Purchase History View (Section 8)
  renderPurchaseHistoryView(state) {
    const purchases = tasmacStore.getUserPurchases();
    const user = state.currentUser;

    return `
      <div class="section">
        <div class="container">
          <div class="section-header">
            <div class="section-header-left">
              <span class="section-eyebrow">Secure Citizen Ledger</span>
              <h2 class="section-title">Personal Purchase History</h2>
              <p class="section-subtitle">
                Encrypted purchase log for account <strong>${user ? 'XXXX-XXXX-' + user.aadhaarNumber.slice(-4) : 'User'}</strong>.
              </p>
            </div>
            <div style="display:flex; align-items:center; gap:0.5rem;">
              <span class="status-indicator-pill status-active" style="display:flex; align-items:center; gap:0.3rem;">
                ${this.icons.lock} Privacy Protected
              </span>
            </div>
          </div>

          <div style="background:var(--info-light); border:1px solid var(--info-border); border-radius:var(--radius-md); padding:0.85rem 1.25rem; color:#0369a1; font-size:0.82rem; margin-bottom:1.5rem; display:flex; align-items:center; gap:0.6rem;">
            ${this.icons.shield}
            <span><strong>Privacy Notice:</strong> Personal purchase histories are strictly private under the Tamil Nadu Data Privacy Framework. Records are accessible only to the verified account holder and authorized prohibition enforcement officers.</span>
          </div>

          ${this.renderPurchaseHistoryTable(purchases)}
        </div>
      </div>
    `;
  },

  // Purchase History Table Component
  renderPurchaseHistoryTable(purchases) {
    if (!purchases || purchases.length === 0) {
      return `
        <div style="background:white; padding:2.5rem; text-align:center; border-radius:var(--radius-lg); border:1px solid var(--border-light);">
          <p style="color:var(--text-muted); font-size:0.9rem;">No completed purchases recorded on this account yet.</p>
        </div>
      `;
    }

    return `
      <div class="data-table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Invoice / Receipt</th>
              <th>Date & Time</th>
              <th>TASMAC Shop</th>
              <th>Product Purchased</th>
              <th>Qty</th>
              <th>Total (₹)</th>
              <th>Booking ID</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${purchases.map(p => `
              <tr>
                <td style="font-weight:700; font-family:monospace; color:var(--primary);">${p.id}</td>
                <td>${p.date}</td>
                <td style="font-weight:600;">${p.shopName}</td>
                <td>${p.productName} <br><span style="font-size:0.75rem; color:var(--text-muted);">${p.category}</span></td>
                <td style="font-weight:700;">${p.quantity}</td>
                <td style="font-weight:800; color:var(--text-primary);">₹${p.amount}</td>
                <td style="font-family:monospace; font-size:0.8rem;">${p.bookingId}</td>
                <td><span class="status-badge collected">${p.status}</span></td>
                <td>
                  <button class="btn-filter-action" style="padding:0.25rem 0.6rem; font-size:0.75rem;" onclick="tasmacApp.viewReceipt('${p.id}')">
                    Receipt
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  },

  // 16. Admin Portal (Section 10)
  renderAdminPortal(state) {
    const shops = state.shops;
    const products = state.products;
    const bookings = state.bookings;
    const restrictions = state.legalRestrictions;
    const users = state.users;

    // Stats
    const totalBookings = bookings.length;
    const collectedCount = bookings.filter(b => b.status === "Collected").length;
    const totalRevenue = bookings.filter(b => b.status === "Collected").reduce((acc, b) => acc + b.totalAmount, 0);
    const activeRestrictionsCount = restrictions.filter(r => r.status === "Active").length;

    return `
      <div class="section" style="background:#f8fafc; min-height:85vh;">
        <div class="container">
          <div class="section-header">
            <div class="section-header-left">
              <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.25rem;">
                <span class="admin-badge">Officer Enforcement Console</span>
                <span style="font-size:0.78rem; color:var(--text-muted);">Officer: T. Selvamani, IAS (Prohibition Wing)</span>
              </div>
              <h2 class="section-title">TASMAC Administrative Dashboard</h2>
            </div>
            <div style="display:flex; gap:0.5rem;">
              <button class="btn-filter-action" onclick="tasmacStore.setView('home')">Exit Admin</button>
            </div>
          </div>

          <!-- KPI Cards -->
          <div class="admin-stats-grid">
            <div class="admin-stat-card">
              <div class="admin-stat-title">Total Bookings</div>
              <div class="admin-stat-val">${totalBookings}</div>
              <div style="font-size:0.75rem; color:var(--text-muted); margin-top:0.2rem;">${collectedCount} completed collections</div>
            </div>

            <div class="admin-stat-card">
              <div class="admin-stat-title">Realized Revenue</div>
              <div class="admin-stat-val" style="color:var(--primary);">₹${totalRevenue.toLocaleString("en-IN")}</div>
              <div style="font-size:0.75rem; color:var(--text-muted); margin-top:0.2rem;">Processed via Smart Token POS</div>
            </div>

            <div class="admin-stat-card">
              <div class="admin-stat-title">Active Legal Bans</div>
              <div class="admin-stat-val" style="color:var(--danger);">${activeRestrictionsCount}</div>
              <div style="font-size:0.75rem; color:var(--text-muted); margin-top:0.2rem;">DUI / Violent offence restrictions</div>
            </div>

            <div class="admin-stat-card">
              <div class="admin-stat-title">Registered Outlets</div>
              <div class="admin-stat-val">${shops.length}</div>
              <div style="font-size:0.75rem; color:var(--text-muted); margin-top:0.2rem;">Across 7 demo TN districts</div>
            </div>
          </div>

          <!-- Admin Tabs -->
          <div class="admin-nav-tabs" id="adminTabs">
            <button class="admin-tab-btn active" onclick="tasmacApp.switchAdminTab('bookings')">Bookings & QR Verification (${bookings.length})</button>
            <button class="admin-tab-btn" onclick="tasmacApp.switchAdminTab('restrictions')">Account Restrictions (${restrictions.length})</button>
            <button class="admin-tab-btn" onclick="tasmacApp.switchAdminTab('inventory')">Shop Stock & Inventory</button>
            <button class="admin-tab-btn" onclick="tasmacApp.switchAdminTab('users')">Citizen Limit Ledger</button>
            <button class="admin-tab-btn" onclick="tasmacApp.switchAdminTab('shops')">Shop Outlets</button>
          </div>

          <!-- Tab Content Containers -->
          <div id="adminTabContent">
            ${this.renderAdminBookingsTab(bookings)}
          </div>
        </div>
      </div>
    `;
  },

  // Admin Bookings Tab
  renderAdminBookingsTab(bookings) {
    return `
      <div>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; flex-wrap:wrap; gap:0.5rem;">
          <h3 style="font-size:1.15rem; font-weight:800;">Real-Time Counter Booking Queue</h3>
          <div style="display:flex; gap:0.5rem;">
            <input type="text" id="adminBookingSearch" placeholder="Search Booking ID or Aadhaar..." class="select-control" style="width:260px;" oninput="tasmacApp.filterAdminBookings(this.value)">
          </div>
        </div>

        <div class="data-table-container">
          <table class="data-table" id="adminBookingsTable">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Citizen</th>
                <th>Shop Outlet</th>
                <th>Product & Qty</th>
                <th>Collection Slot</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${bookings.map(b => `
                <tr>
                  <td style="font-family:monospace; font-weight:700; color:var(--primary);">${b.id}</td>
                  <td>${b.userName} <br><span style="font-size:0.75rem; color:var(--text-muted); font-family:monospace;">${b.userAadhaarMasked}</span></td>
                  <td style="font-weight:600; font-size:0.82rem;">${b.shopName}</td>
                  <td>${b.productName} <br><span style="font-size:0.75rem; color:var(--text-muted);">Qty: ${b.quantity} (${b.size})</span></td>
                  <td>${b.date} <br><span style="font-weight:700; color:var(--primary); font-size:0.8rem;">${b.timeSlot}</span></td>
                  <td style="font-weight:800;">₹${b.totalAmount}</td>
                  <td><span class="status-badge ${b.status.toLowerCase()}">${b.status}</span></td>
                  <td>
                    ${b.status === "Confirmed" ? `
                      <button class="btn-primary" style="padding:0.35rem 0.65rem; font-size:0.75rem;" onclick="tasmacApp.advanceBookingStatus('${b.id}', 'Ready for Collection')">Ready</button>
                    ` : b.status === "Ready for Collection" ? `
                      <button class="btn-primary" style="padding:0.35rem 0.65rem; font-size:0.75rem; background:#15803d;" onclick="tasmacApp.advanceBookingStatus('${b.id}', 'Collected')">Verify & Hand Over</button>
                    ` : `
                      <span style="font-size:0.75rem; color:var(--text-muted);">Completed</span>
                    `}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // Admin Restrictions Tab (Section 9)
  renderAdminRestrictionsTab(restrictions, users) {
    return `
      <div>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.25rem; flex-wrap:wrap; gap:0.5rem;">
          <div>
            <h3 style="font-size:1.15rem; font-weight:800;">Account Restriction Management (Legal / Police Database)</h3>
            <p style="font-size:0.82rem; color:var(--text-muted);">Enforcing prohibitions under Motor Vehicles Act Sec 185 (Drunk Driving) and IPC 323/324.</p>
          </div>
          <button class="btn-primary" style="background:var(--danger);" onclick="tasmacApp.openFlagUserModal()">
            + Restrict Citizen Account
          </button>
        </div>

        <div class="data-table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Case Ref</th>
                <th>Citizen Name</th>
                <th>Masked Aadhaar</th>
                <th>Legal Offence</th>
                <th>Sanctioning Authority</th>
                <th>Imposed Date</th>
                <th>Review / Expiry</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${restrictions.map(r => `
                <tr>
                  <td style="font-family:monospace; font-weight:700; color:var(--danger);">${r.caseNumber}</td>
                  <td style="font-weight:700;">${r.citizenName}</td>
                  <td style="font-family:monospace;">${r.userAadhaarMasked}</td>
                  <td style="font-weight:600; color:#991b1b;">${r.offence}</td>
                  <td style="font-size:0.8rem;">${r.authority}</td>
                  <td>${r.imposedDate}</td>
                  <td style="font-weight:600;">${r.expiryDate}</td>
                  <td><span class="status-badge ${r.status === 'Active' ? 'cancelled' : 'collected'}">${r.status}</span></td>
                  <td>
                    ${r.status === 'Active' ? `
                      <button class="btn-filter-action" style="padding:0.25rem 0.6rem; font-size:0.75rem; color:var(--primary);" onclick="tasmacApp.revokeRestriction('${r.aadhaarNumber}')">
                        Clear / Revoke
                      </button>
                    ` : `
                      <span style="font-size:0.75rem; color:var(--text-muted);">Cleared</span>
                    `}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // Admin Inventory Tab
  renderAdminInventoryTab(shops, products) {
    const selectedShop = shops[0];
    return `
      <div>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; flex-wrap:wrap; gap:0.5rem;">
          <h3 style="font-size:1.15rem; font-weight:800;">Inventory Management by Shop</h3>
          <div>
            <select class="select-control" id="adminInventoryShopSelect" onchange="tasmacApp.handleAdminInventoryShopChange(this.value)">
              ${shops.map(s => `
                <option value="${s.id}">${s.name} (${s.id})</option>
              `).join('')}
            </select>
          </div>
        </div>

        <div id="adminInventoryTableContainer">
          ${this.renderAdminShopInventoryTable(selectedShop, products)}
        </div>
      </div>
    `;
  },

  renderAdminShopInventoryTable(shop, products) {
    return `
      <div class="data-table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Product Code</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>TN MRP</th>
              <th>Current Stock</th>
              <th>Status</th>
              <th>Adjust Stock</th>
            </tr>
          </thead>
          <tbody>
            ${products.map(p => {
              const stock = shop.inventory?.[p.id] ?? 0;
              return `
                <tr>
                  <td style="font-family:monospace; font-weight:700;">${p.id}</td>
                  <td style="font-weight:700;">${p.name} <br><span style="font-size:0.75rem; color:var(--text-muted);">${p.size}</span></td>
                  <td>${p.category}</td>
                  <td style="font-weight:700;">₹${p.price}</td>
                  <td style="font-size:1.1rem; font-weight:800; color:${stock <= 5 ? 'var(--danger)' : 'var(--primary)'};">${stock}</td>
                  <td>
                    <span class="status-badge ${stock <= 0 ? 'cancelled' : stock <= 5 ? 'ready' : 'collected'}">
                      ${stock <= 0 ? 'Out of Stock' : stock <= 5 ? 'Low' : 'Adequate'}
                    </span>
                  </td>
                  <td>
                    <div style="display:flex; align-items:center; gap:0.4rem;">
                      <input type="number" min="0" value="${stock}" id="stock-input-${shop.id}-${p.id}" class="select-control" style="width:75px; padding:0.35rem;">
                      <button class="btn-primary" style="padding:0.35rem 0.75rem; font-size:0.75rem;" onclick="tasmacApp.saveStockUpdate('${shop.id}', '${p.id}')">Update</button>
                    </div>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;
  },

  // Admin User Limit Ledger Tab
  renderAdminUsersTab(users) {
    return `
      <div>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; flex-wrap:wrap; gap:0.5rem;">
          <h3 style="font-size:1.15rem; font-weight:800;">Citizen Limit Ledger & Reset</h3>
          <p style="font-size:0.82rem; color:var(--text-muted);">Inspect or reset weekly citizen consumption quotas.</p>
        </div>

        <div class="data-table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Citizen Name</th>
                <th>Masked Aadhaar</th>
                <th>Alcohol Used</th>
                <th>Cigarettes Used</th>
                <th>Restriction Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${users.map(u => {
                const limits = tasmacStore.getUserLimits(u);
                return `
                  <tr>
                    <td style="font-weight:700;">${u.name}</td>
                    <td style="font-family:monospace;">XXXX-XXXX-${u.aadhaarNumber.slice(-4)}</td>
                    <td>
                      <span style="font-weight:800; color:${limits.alcohol.isReached ? 'var(--danger)' : 'var(--primary)'};">
                        ${limits.alcohol.used} / ${limits.alcohol.max} unit
                      </span>
                      ${limits.alcohol.isReached ? '<span class="status-badge cancelled" style="margin-left:0.4rem;">Exhausted</span>' : ''}
                    </td>
                    <td style="font-size:0.82rem;">
                      High: <strong>${limits.cigarettes.high.used}/${limits.cigarettes.high.max}</strong> | Low: <strong>${limits.cigarettes.low.used}/${limits.cigarettes.low.max}</strong>
                    </td>
                    <td>
                      ${u.isRestricted ? `
                        <span class="status-badge cancelled">Restricted (DUI)</span>
                      ` : `
                        <span class="status-badge collected">Clean</span>
                      `}
                    </td>
                    <td>
                      <button class="btn-filter-action" style="padding:0.3rem 0.65rem; font-size:0.75rem;" onclick="tasmacApp.resetCitizenLimits('${u.aadhaarNumber}')">
                        Reset Quota
                      </button>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // 17. Main Footer
  renderFooter() {
    return `
      <footer class="main-footer">
        <div class="container">
          <div class="footer-grid">
            <div>
              <div style="display:flex; align-items:center; gap:0.6rem; margin-bottom:0.75rem;">
                <div class="emblem-icon" style="width:32px; height:32px; font-size:0.85rem;">TN</div>
                <span style="font-weight:800; font-size:1.05rem; color:var(--primary);">Tamil Nadu TASMAC Limited</span>
              </div>
              <p style="color:var(--text-secondary); font-size:0.85rem; line-height:1.6; margin-bottom:1rem;">
                Tamil Nadu State Marketing Corporation is a Government of Tamil Nadu undertaking company that has a monopoly over wholesale and retail vending of alcoholic beverages in the State of Tamil Nadu.
              </p>
              <div style="font-size:0.78rem; color:var(--text-muted);">
                CMDA Tower-II, IV Floor, Gandhi Irwin Bridge Road, Egmore, Chennai - 600008.
              </div>
            </div>

            <div>
              <h4 class="footer-col-title">Quick Navigation</h4>
              <ul class="footer-links">
                <li><a href="javascript:void(0)" onclick="tasmacStore.setView('home')">Home Page</a></li>
                <li><a href="javascript:void(0)" onclick="tasmacStore.setView('shops')">Find Nearby Shops</a></li>
                <li><a href="javascript:void(0)" onclick="tasmacStore.setView('shop-detail')">Browse Products</a></li>
                <li><a href="javascript:void(0)" onclick="tasmacStore.setView('limits')">Quota Guidelines</a></li>
                <li><a href="javascript:void(0)" onclick="tasmacStore.setView('my-bookings')">My Active Tokens</a></li>
              </ul>
            </div>

            <div>
              <h4 class="footer-col-title">Legal & Guidelines</h4>
              <ul class="footer-links">
                <li><a href="javascript:void(0)" onclick="tasmacApp.openLegalCaseModal()">Prohibition & Excise Rules</a></li>
                <li><a href="javascript:void(0)" onclick="tasmacStore.setView('limits')">Weekly Purchase Quota</a></li>
                <li><a href="javascript:void(0)" onclick="alert('Consumption of liquor in public places is strictly punishable under IPC 510.')">Public Order Regulations</a></li>
                <li><a href="javascript:void(0)" onclick="alert('Legal age for purchase of alcoholic beverages in Tamil Nadu is 21 years.')">Minimum Age Policy (21+)</a></li>
                <li><a href="javascript:void(0)" onclick="tasmacStore.setView('history')">Data Privacy & Security</a></li>
              </ul>
            </div>

            <div>
              <h4 class="footer-col-title">Responsible Consumption</h4>
              <div style="background:var(--bg-muted); padding:1rem; border-radius:var(--radius-md); font-size:0.8rem; color:var(--text-secondary); line-height:1.5;">
                <p style="font-weight:700; color:var(--danger); margin-bottom:0.4rem;">⚠️ Statutory Warning:</p>
                <p style="margin-bottom:0.5rem;">Liquor consumption is injurious to health. Be safe — do not drink and drive.</p>
                <p style="font-size:0.75rem; color:var(--text-muted);">மது அருந்துதல் உடல் நலத்திற்கு கேடு. பாதுகாப்பாய் இருங்கள் - மது அருந்திவிட்டு வாகனம் ஓட்டாதீர்கள்.</p>
              </div>
            </div>
          </div>

          <div class="footer-bottom">
            <div>
              © 2026 TASMAC - Government of Tamil Nadu. All rights reserved. Smart Portal Prototype v1.0.
            </div>
            <div style="display:flex; gap:1rem;">
              <span>Mock Identity Safe System</span>
              <span>•</span>
              <span>Encrypted Token Verification</span>
            </div>
          </div>
        </div>
      </footer>
    `;
  }
};

window.TasmacComponents = TasmacComponents;
