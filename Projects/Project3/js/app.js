/**
 * Tamil Nadu TASMAC Smart Booking & Limit Management System
 * Main Application Controller, Event Router & Modal Manager
 */

class TasmacApp {
  constructor() {
    this.otpTimer = null;
    this.otpRemainingSec = 60;
    this.currentBookingDraft = null;
    this.currentLoginDraft = null;
    this.currentAdminTab = "bookings";
    this.currentFreqTab = "noAlcohol";
    this.currentAnatomyNode = "brain";
  }

  init() {
    // Check URL query param or hash for deep linking
    const urlParams = new URLSearchParams(window.location.search);
    const viewParam = urlParams.get("view") || window.location.hash.replace("#", "");
    const shopIdParam = urlParams.get("shopId");
    if (viewParam && ["home", "shops", "shop-detail", "limits", "awareness", "my-bookings", "history", "admin"].includes(viewParam)) {
      tasmacStore.state.activeView = viewParam;
      if (shopIdParam) {
        tasmacStore.state.selectedShopId = shopIdParam;
      }
    }

    // Listen to store updates
    tasmacStore.subscribe(state => this.render(state));

    // Initial render
    this.render(tasmacStore.getState());

    // Setup global listeners
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.closeAllModals();
      }
    });

    console.log("TASMAC Smart Portal initialized successfully.");
  }


  render(state) {
    const appEl = document.getElementById("app");
    if (!appEl) return;

    let contentHtml = '';

    // Render active view
    switch (state.activeView) {
      case "home":
        contentHtml = `
          ${TasmacComponents.renderHero(state)}
          ${TasmacComponents.renderUserDashboard(state)}
          ${TasmacComponents.renderAlcoholAwarenessView(state)}
        `;
        break;


      case "shops":
        contentHtml = TasmacComponents.renderShopListView(state);
        break;

      case "shop-detail":
        contentHtml = TasmacComponents.renderShopProductPage(state);
        break;

      case "limits":
        contentHtml = TasmacComponents.renderMyLimitsView(state);
        break;

      case "awareness":
        contentHtml = TasmacComponents.renderAlcoholAwarenessView(state);
        break;

      case "my-bookings":
        contentHtml = TasmacComponents.renderMyBookingsView(state);
        break;

      case "history":
        contentHtml = TasmacComponents.renderPurchaseHistoryView(state);
        break;

      case "admin":
        contentHtml = TasmacComponents.renderAdminPortal(state);
        break;

      default:
        contentHtml = TasmacComponents.renderHero(state);
        break;
    }

    // Assemble complete page
    appEl.innerHTML = `
      ${TasmacComponents.renderGovStrip()}
      ${TasmacComponents.renderNavbar(state)}
      ${TasmacComponents.renderRestrictionBanner(state.currentUser)}
      <main style="flex:1;">
        ${contentHtml}
      </main>
      ${TasmacComponents.renderFooter()}
      <div id="modalContainer"></div>
      <div id="toastContainer" class="toast-container"></div>
    `;

    // Render QR codes if present on page
    this.renderQRCodes();
  }

  // Render QR Codes on canvas elements
  renderQRCodes() {
    const qrElements = document.querySelectorAll(".qr-render-area");
    qrElements.forEach(el => {
      const qrData = el.getAttribute("data-qr");
      if (qrData && window.QRCode) {
        new window.QRCode(el, {
          text: qrData,
          width: 170,
          height: 170,
          colorDark: "#0f5a34",
          colorLight: "#ffffff"
        });
      }
    });
  }

  // Toast Notification System
  showToast(message, type = "info") {
    const container = document.getElementById("toastContainer");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;

    let icon = 'ℹ️';
    if (type === 'success') icon = '✅';
    if (type === 'error') icon = '❌';
    if (type === 'warning') icon = '⚠️';

    toast.innerHTML = `
      <span>${icon}</span>
      <span style="flex:1;">${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(30px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4500);
  }

  // Search & Filter Handlers
  handleSearch(val) {
    tasmacStore.state.searchQuery = val;
    tasmacStore.notify();
  }

  handleCategorySelect(category) {
    tasmacStore.state.selectedCategory = category;
    tasmacStore.notify();
  }

  handlePriceSlider(val) {
    tasmacStore.state.maxPrice = parseInt(val);
    tasmacStore.notify();
  }

  toggleAvailabilityFilter() {
    tasmacStore.state.availabilityFilter = tasmacStore.state.availabilityFilter === "in-stock" ? "all" : "in-stock";
    tasmacStore.notify();
  }

  resetProductFilters() {
    tasmacStore.state.searchQuery = "";
    tasmacStore.state.selectedCategory = "All";
    tasmacStore.state.selectedBrand = "All";
    tasmacStore.state.maxPrice = 2000;
    tasmacStore.state.availabilityFilter = "all";
    tasmacStore.notify();
  }

  // Simulated GPS Location Finder
  detectCurrentLocation() {
    this.showToast("Detecting your location via GPS...", "info");
    setTimeout(() => {
      // Simulate GPS match in Chennai Anna Nagar
      tasmacStore.setLocation("Chennai", "Anna Nagar");
      // Sort shops by calculated distance
      tasmacStore.state.shops.forEach(s => {
        if (s.city === "Anna Nagar") s.distanceKm = 0.6;
        else if (s.district === "Chennai") s.distanceKm = (Math.random() * 3 + 1.2).toFixed(1);
        else s.distanceKm = (Math.random() * 20 + 15).toFixed(1);
      });
      tasmacStore.notify();
      this.showToast("Location updated! Showing nearest TASMAC shops within 2 km.", "success");
    }, 600);
  }

  // ================= MODAL CONTROLLERS =================

  closeAllModals() {
    const container = document.getElementById("modalContainer");
    if (container) container.innerHTML = "";
    if (this.otpTimer) {
      clearInterval(this.otpTimer);
      this.otpTimer = null;
    }
  }

  // Location Modal
  openLocationModal() {
    const state = tasmacStore.getState();
    const currentDist = state.districts.find(d => d.name === state.selectedDistrict) || state.districts[0];

    const modalHtml = `
      <div class="modal-overlay" onclick="if(event.target === this) tasmacApp.closeAllModals()">
        <div class="modal-dialog">
          <div class="modal-header">
            <h3 class="modal-title">
              ${TasmacComponents.icons.mapPin}
              <span>Select Your District & City</span>
            </h3>
            <button class="modal-close-btn" onclick="tasmacApp.closeAllModals()">✕</button>
          </div>
          <div class="modal-body">
            <p style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:1.25rem;">
              Choose your locality to view nearby government TASMAC retail and elite outlets with real-time stock availability.
            </p>

            <div style="margin-bottom:1.25rem;">
              <label style="font-size:0.75rem; font-weight:700; color:var(--text-muted); display:block; margin-bottom:0.4rem;">SELECT DISTRICT</label>
              <select class="select-control" style="width:100%;" id="modalDistrictSelect" onchange="tasmacApp.handleModalDistrictChange(this.value)">
                ${state.districts.map(d => `
                  <option value="${d.name}" ${d.name === state.selectedDistrict ? 'selected' : ''}>${d.name} (${d.nameTamil})</option>
                `).join('')}
              </select>
            </div>

            <div style="margin-bottom:1.5rem;">
              <label style="font-size:0.75rem; font-weight:700; color:var(--text-muted); display:block; margin-bottom:0.4rem;">SELECT CITY / LOCALITY</label>
              <select class="select-control" style="width:100%;" id="modalCitySelect">
                <option value="All" ${state.selectedCity === 'All' ? 'selected' : ''}>All Areas in District</option>
                ${currentDist.cities.map(c => `
                  <option value="${c}" ${c === state.selectedCity ? 'selected' : ''}>${c}</option>
                `).join('')}
              </select>
            </div>

            <button class="btn-primary" style="width:100%; justify-content:center;" onclick="tasmacApp.confirmLocationSelect()">
              Apply Location
            </button>
          </div>
        </div>
      </div>
    `;

    document.getElementById("modalContainer").innerHTML = modalHtml;
  }

  handleModalDistrictChange(districtName) {
    const state = tasmacStore.getState();
    const dist = state.districts.find(d => d.name === districtName);
    const citySelect = document.getElementById("modalCitySelect");
    if (dist && citySelect) {
      citySelect.innerHTML = `<option value="All">All Areas in ${districtName}</option>` +
        dist.cities.map(c => `<option value="${c}">${c}</option>`).join('');
    }
  }

  confirmLocationSelect() {
    const dist = document.getElementById("modalDistrictSelect").value;
    const city = document.getElementById("modalCitySelect").value;
    tasmacStore.setLocation(dist, city);
    this.closeAllModals();
    this.showToast(`Location set to ${dist} (${city})`, "success");
  }

  // 1-Click Demo Persona Modal
  openPersonaModal() {
    const users = tasmacStore.state.users;
    const currentAadhaar = tasmacStore.state.currentUser?.aadhaarNumber;

    const modalHtml = `
      <div class="modal-overlay" onclick="if(event.target === this) tasmacApp.closeAllModals()">
        <div class="modal-dialog wide">
          <div class="modal-header">
            <h3 class="modal-title">
              <span>🎭 Demo Citizen & Admin Persona Switcher</span>
            </h3>
            <button class="modal-close-btn" onclick="tasmacApp.closeAllModals()">✕</button>
          </div>
          <div class="modal-body">
            <p style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:1.25rem;">
              Quickly test the system with predefined mock citizens representing each state of the alcohol & cigarette limit rules:
            </p>

            <div style="display:flex; flex-direction:column; gap:0.75rem;">
              ${users.map(u => {
                const isSelected = u.aadhaarNumber === currentAadhaar;
                const limits = tasmacStore.getUserLimits(u);
                return `
                  <div class="demo-user-button ${u.isRestricted ? 'restricted' : ''}" style="${isSelected ? 'border-color:var(--primary); background:var(--primary-subtle);' : ''}" onclick="tasmacApp.selectDemoPersona('${u.aadhaarNumber}')">
                    <div style="flex-grow:1;">
                      <div style="display:flex; align-items:center; gap:0.6rem; margin-bottom:0.2rem;">
                        <strong style="font-size:0.95rem;">${u.name}</strong>
                        <span class="status-badge ${u.isRestricted ? 'cancelled' : limits.alcohol.isReached ? 'ready' : 'collected'}">
                          ${u.personaBadge}
                        </span>
                        <span style="font-family:monospace; font-size:0.75rem; color:var(--text-muted);">Aadhaar: XXXX-XXXX-${u.aadhaarNumber.slice(-4)}</span>
                      </div>
                      <div style="font-size:0.8rem; color:var(--text-secondary);">${u.personaDescription}</div>
                      <div style="font-size:0.75rem; color:var(--text-muted); margin-top:0.3rem;">
                        Alcohol: <strong>${limits.alcohol.used}/${limits.alcohol.max}</strong> • Cigarettes: High <strong>${limits.cigarettes.high.used}/${limits.cigarettes.high.max}</strong>, Low <strong>${limits.cigarettes.low.used}/${limits.cigarettes.low.max}</strong>
                      </div>
                    </div>
                    <div>
                      <button class="btn-primary" style="padding:0.4rem 0.8rem; font-size:0.78rem;">Switch</button>
                    </div>
                  </div>
                `;
              }).join('')}

              <!-- Admin Option -->
              <div class="demo-user-button" style="background:#0f172a; color:#fff; border-color:#334155;" onclick="tasmacApp.selectAdminPersona()">
                <div style="flex-grow:1;">
                  <div style="display:flex; align-items:center; gap:0.6rem; margin-bottom:0.2rem;">
                    <strong style="font-size:0.95rem; color:#f8fafc;">T. Selvamani, IAS</strong>
                    <span class="status-badge" style="background:#38bdf8; color:#0f172a;">TASMAC Officer Portal</span>
                  </div>
                  <div style="font-size:0.8rem; color:#cbd5e1;">Access shop management, real-time inventory adjustments, order verification, and legal DUI restriction enforcement.</div>
                </div>
                <div>
                  <button class="btn-primary" style="background:#38bdf8; color:#0f172a; padding:0.4rem 0.8rem; font-size:0.78rem;">Open Admin</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    document.getElementById("modalContainer").innerHTML = modalHtml;
  }

  selectDemoPersona(aadhaarNumber) {
    tasmacStore.switchPersona(aadhaarNumber);
    this.closeAllModals();
    const user = tasmacStore.state.currentUser;
    this.showToast(`Switched persona to ${user.name} (${user.personaBadge})`, "success");
  }

  selectAdminPersona() {
    tasmacStore.loginAdmin("8899");
    this.closeAllModals();
    this.showToast("Logged in as TASMAC Enforcement Officer (Admin Portal)", "success");
  }

  // Login Modal (Section 1: Aadhaar & OTP)
  openLoginModal() {
    this.currentLoginDraft = { aadhaar: "", step: "aadhaar" };
    this.renderLoginModalContent();
  }

  renderLoginModalContent() {
    const draft = this.currentLoginDraft;

    let bodyHtml = '';

    if (draft.step === "aadhaar") {
      bodyHtml = `
        <p style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:1.25rem;">
          Enter your 12-digit Aadhaar number for mock OTP authentication. No real personal data is ever stored or exposed.
        </p>

        <div style="margin-bottom:1.25rem;">
          <label style="font-size:0.75rem; font-weight:700; color:var(--text-muted); display:block; margin-bottom:0.4rem;">AADHAAR NUMBER</label>
          <input type="text" id="loginAadhaarInput" placeholder="4567 8901 2345" maxlength="14" class="select-control" style="width:100%; font-size:1.1rem; font-family:monospace; letter-spacing:0.1em;" oninput="tasmacApp.formatAadhaarInput(this)">
        </div>

        <button class="btn-primary" style="width:100%; justify-content:center; padding:0.75rem;" onclick="tasmacApp.submitAadhaarForOtp()">
          Send OTP to Linked Mobile
        </button>

        <div class="demo-account-picker">
          <div class="demo-account-title">Or 1-Click Mock Test Login</div>
          <button class="demo-user-button" onclick="tasmacApp.quickFillLogin('456789012345')">
            <span>Rajesh Kannan (Clean Citizen - Full Quota)</span>
            <span>4567 8901 2345</span>
          </button>
          <button class="demo-user-button" onclick="tasmacApp.quickFillLogin('345678901234')">
            <span>S. Murugan (Active - 1 Beer Used)</span>
            <span>3456 7890 1234</span>
          </button>
          <button class="demo-user-button" onclick="tasmacApp.quickFillLogin('901234567890')">
            <span>M. Vijay (Limit Reached - 1 Full Bottle)</span>
            <span>9012 3456 7890</span>
          </button>
          <button class="demo-user-button restricted" onclick="tasmacApp.quickFillLogin('789012345678')">
            <span style="color:var(--danger);">V. Anbarasan (Account Restricted - DUI)</span>
            <span>7890 1234 5678</span>
          </button>
        </div>
      `;
    } else {
      // Step: OTP
      const clean = draft.aadhaar.replace(/\s+/g, "");
      const masked = "XXXX-XXXX-" + clean.slice(-4);

      bodyHtml = `
        <div style="text-align:center; margin-bottom:1rem;">
          <div style="font-size:2rem; margin-bottom:0.5rem;">📱</div>
          <h4 style="font-size:1.1rem; font-weight:800;">Verify OTP</h4>
          <p style="font-size:0.82rem; color:var(--text-secondary);">
            Enter the 6-digit OTP sent to mobile registered with Aadhaar <strong style="font-family:monospace;">${masked}</strong>.
          </p>
        </div>

        <!-- Simulated Mock OTP Helper Alert -->
        <div style="background:#fef3c7; border:1px solid #fde68a; border-radius:var(--radius-md); padding:0.75rem 1rem; color:#92400e; font-size:0.82rem; margin-bottom:1rem; display:flex; justify-content:space-between; align-items:center;">
          <span>Demo OTP: <strong>543210</strong> (Simulated)</span>
          <button class="btn-primary" style="padding:0.25rem 0.6rem; font-size:0.72rem; background:#b45309;" onclick="tasmacApp.autoFillOtp('543210')">
            Auto-fill
          </button>
        </div>

        <div class="otp-digit-inputs">
          <input type="text" maxlength="1" class="otp-box" id="otp-1" oninput="tasmacApp.handleOtpInput(1, this, event)">
          <input type="text" maxlength="1" class="otp-box" id="otp-2" oninput="tasmacApp.handleOtpInput(2, this, event)">
          <input type="text" maxlength="1" class="otp-box" id="otp-3" oninput="tasmacApp.handleOtpInput(3, this, event)">
          <input type="text" maxlength="1" class="otp-box" id="otp-4" oninput="tasmacApp.handleOtpInput(4, this, event)">
          <input type="text" maxlength="1" class="otp-box" id="otp-5" oninput="tasmacApp.handleOtpInput(5, this, event)">
          <input type="text" maxlength="1" class="otp-box" id="otp-6" oninput="tasmacApp.handleOtpInput(6, this, event)">
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.78rem; color:var(--text-muted); margin-bottom:1.5rem;">
          <span id="otpTimerText">Resend OTP in ${this.otpRemainingSec}s</span>
          <button style="color:var(--primary); font-weight:700;" onclick="tasmacApp.resendOtp()">Resend OTP</button>
        </div>

        <button class="btn-primary" style="width:100%; justify-content:center; padding:0.75rem;" onclick="tasmacApp.verifyOtpAndLogin()">
          Verify & Open Dashboard
        </button>

        <div style="text-align:center; margin-top:1rem;">
          <button style="font-size:0.8rem; color:var(--text-muted);" onclick="tasmacApp.currentLoginDraft.step='aadhaar'; tasmacApp.renderLoginModalContent();">
            ← Change Aadhaar Number
          </button>
        </div>
      `;
    }

    const modalHtml = `
      <div class="modal-overlay" onclick="if(event.target === this) tasmacApp.closeAllModals()">
        <div class="modal-dialog">
          <div class="modal-header">
            <h3 class="modal-title">
              ${TasmacComponents.icons.shield}
              <span>Citizen Aadhaar Verification</span>
            </h3>
            <button class="modal-close-btn" onclick="tasmacApp.closeAllModals()">✕</button>
          </div>
          <div class="modal-body">
            ${bodyHtml}
          </div>
        </div>
      </div>
    `;

    document.getElementById("modalContainer").innerHTML = modalHtml;

    if (draft.step === "otp") {
      this.startOtpCountdown();
      const firstOtp = document.getElementById("otp-1");
      if (firstOtp) firstOtp.focus();
    }
  }

  formatAadhaarInput(el) {
    let val = el.value.replace(/\D/g, "");
    if (val.length > 12) val = val.substring(0, 12);
    let parts = [];
    for (let i = 0; i < val.length; i += 4) {
      parts.push(val.substring(i, i + 4));
    }
    el.value = parts.join(" ");
  }

  submitAadhaarForOtp() {
    const input = document.getElementById("loginAadhaarInput");
    const raw = input.value.replace(/\s+/g, "");
    if (raw.length !== 12) {
      this.showToast("Please enter a valid 12-digit Aadhaar number.", "error");
      return;
    }
    this.currentLoginDraft.aadhaar = raw;
    this.currentLoginDraft.step = "otp";
    this.renderLoginModalContent();
    this.showToast("Mock OTP sent to registered mobile!", "info");
  }

  quickFillLogin(aadhaar) {
    this.currentLoginDraft.aadhaar = aadhaar;
    this.currentLoginDraft.step = "otp";
    this.renderLoginModalContent();
    this.autoFillOtp("543210");
  }

  startOtpCountdown() {
    if (this.otpTimer) clearInterval(this.otpTimer);
    this.otpRemainingSec = 60;
    this.otpTimer = setInterval(() => {
      this.otpRemainingSec--;
      const textEl = document.getElementById("otpTimerText");
      if (textEl) {
        textEl.textContent = this.otpRemainingSec > 0 ? `Resend OTP in ${this.otpRemainingSec}s` : "OTP expired. Please resend.";
      }
      if (this.otpRemainingSec <= 0) {
        clearInterval(this.otpTimer);
      }
    }, 1000);
  }

  handleOtpInput(index, input, event) {
    if (input.value.length === 1 && index < 6) {
      const next = document.getElementById(`otp-${index + 1}`);
      if (next) next.focus();
    }
  }

  autoFillOtp(code) {
    for (let i = 1; i <= 6; i++) {
      const box = document.getElementById(`otp-${i}`);
      if (box) box.value = code.charAt(i - 1);
    }
  }

  resendOtp() {
    this.showToast("Fresh OTP generated: 543210", "info");
    this.startOtpCountdown();
  }

  verifyOtpAndLogin() {
    let enteredOtp = "";
    for (let i = 1; i <= 6; i++) {
      const box = document.getElementById(`otp-${i}`);
      if (box) enteredOtp += box.value;
    }

    if (enteredOtp.length !== 6) {
      this.showToast("Please enter the complete 6-digit OTP.", "error");
      return;
    }

    const user = tasmacStore.loginUser(this.currentLoginDraft.aadhaar);
    this.closeAllModals();
    tasmacStore.setView("home");
    this.showToast(`Welcome ${user.name}! Authenticated with masked Aadhaar.`, "success");
  }

  // Admin Passcode Modal
  openAdminLoginModal() {
    const modalHtml = `
      <div class="modal-overlay" onclick="if(event.target === this) tasmacApp.closeAllModals()">
        <div class="modal-dialog">
          <div class="modal-header">
            <h3 class="modal-title">
              ${TasmacComponents.icons.shield}
              <span>Authorized Officer Authentication</span>
            </h3>
            <button class="modal-close-btn" onclick="tasmacApp.closeAllModals()">✕</button>
          </div>
          <div class="modal-body">
            <p style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:1.25rem;">
              Strictly restricted to Tamil Nadu Prohibition & Excise Department Officers. Enter your secure officer authorization PIN.
            </p>

            <div style="margin-bottom:1.25rem;">
              <label style="font-size:0.75rem; font-weight:700; color:var(--text-muted); display:block; margin-bottom:0.4rem;">OFFICER PIN (Demo: 8899)</label>
              <input type="password" id="adminPinInput" placeholder="Enter PIN" class="select-control" style="width:100%; font-size:1.2rem; text-align:center;">
            </div>

            <button class="btn-primary" style="width:100%; justify-content:center;" onclick="tasmacApp.verifyAdminPin()">
              Access Admin Portal
            </button>
          </div>
        </div>
      </div>
    `;

    document.getElementById("modalContainer").innerHTML = modalHtml;
  }

  verifyAdminPin() {
    const pin = document.getElementById("adminPinInput").value;
    if (tasmacStore.loginAdmin(pin)) {
      this.closeAllModals();
      this.showToast("Officer credentials verified. TASMAC Administration portal loaded.", "success");
    } else {
      this.showToast("Invalid officer PIN. Use demo PIN: 8899", "error");
    }
  }

  // Booking Modal (Section 7)
  openBookingModal(shopId, productId) {
    const user = tasmacStore.state.currentUser;
    if (!user) {
      this.openLoginModal();
      this.showToast("Please verify your Aadhaar to book products.", "info");
      return;
    }

    const check = tasmacStore.canBookProduct(productId, 1, user);
    if (!check.allowed) {
      this.showToast(check.reason, "error");
      return;
    }

    const shop = tasmacStore.state.shops.find(s => s.id === shopId);
    const product = tasmacStore.state.products.find(p => p.id === productId);
    const limits = tasmacStore.getUserLimits(user);

    this.currentBookingDraft = {
      shopId,
      productId,
      quantity: 1,
      date: "2026-09-10",
      timeSlot: shop.timeSlots[0].label
    };

    const maxAllowedQty = product.category === "Hard Liquor" ? 1 :
      (product.category === "Beer" || product.category === "Wine") ? Math.floor(limits.alcohol.remaining / 0.5) :
      (product.nicotineType === "high") ? limits.cigarettes.high.remaining : limits.cigarettes.low.remaining;

    const modalHtml = `
      <div class="modal-overlay" onclick="if(event.target === this) tasmacApp.closeAllModals()">
        <div class="modal-dialog">
          <div class="modal-header">
            <h3 class="modal-title">
              ${TasmacComponents.icons.calendar}
              <span>Advance Counter Token Booking</span>
            </h3>
            <button class="modal-close-btn" onclick="tasmacApp.closeAllModals()">✕</button>
          </div>

          <div class="modal-body">
            <!-- Product Snapshot -->
            <div style="display:flex; gap:1rem; align-items:center; background:var(--bg-muted); padding:1rem; border-radius:var(--radius-md); margin-bottom:1.25rem;">
              <img src="${product.image}" style="width:60px; height:60px; object-fit:cover; border-radius:var(--radius-sm);">
              <div>
                <div style="font-size:0.75rem; font-weight:700; color:var(--accent-gold);">${product.brand} • ${product.category}</div>
                <div style="font-weight:800; font-size:0.95rem;">${product.name}</div>
                <div style="font-size:0.8rem; color:var(--text-muted);">${product.size} • ₹${product.price}</div>
              </div>
            </div>

            <!-- Shop Info -->
            <div style="margin-bottom:1.25rem;">
              <label style="font-size:0.75rem; font-weight:700; color:var(--text-muted); display:block; margin-bottom:0.2rem;">COLLECTION SHOP</label>
              <div style="font-weight:700; font-size:0.9rem;">${shop.name}</div>
              <div style="font-size:0.78rem; color:var(--text-secondary);">${shop.address}</div>
            </div>

            <!-- Quantity Stepper -->
            <div style="margin-bottom:1.25rem;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.35rem;">
                <label style="font-size:0.75rem; font-weight:700; color:var(--text-muted);">SELECT QUANTITY</label>
                <span style="font-size:0.75rem; color:var(--primary); font-weight:700;">Remaining Quota allows: max ${maxAllowedQty}</span>
              </div>
              <div style="display:flex; align-items:center; gap:0.75rem;">
                <button class="btn-filter-action" style="padding:0.5rem 1rem; font-size:1.1rem; font-weight:800;" onclick="tasmacApp.adjustDraftQty(-1, ${maxAllowedQty})">-</button>
                <span id="draftQtyDisplay" style="font-size:1.2rem; font-weight:800; min-width:40px; text-align:center;">1</span>
                <button class="btn-filter-action" style="padding:0.5rem 1rem; font-size:1.1rem; font-weight:800;" onclick="tasmacApp.adjustDraftQty(1, ${maxAllowedQty})">+</button>
                <span id="draftTotalDisplay" style="margin-left:auto; font-size:1.1rem; font-weight:800; color:var(--primary);">Total: ₹${product.price}</span>
              </div>
            </div>

            <!-- Date Picker -->
            <div style="margin-bottom:1.25rem;">
              <label style="font-size:0.75rem; font-weight:700; color:var(--text-muted); display:block; margin-bottom:0.35rem;">COLLECTION DATE</label>
              <select class="select-control" style="width:100%;" id="draftDateSelect" onchange="tasmacApp.currentBookingDraft.date = this.value">
                <option value="2026-09-10" selected>Tomorrow, Thursday (10 Sep 2026)</option>
                <option value="2026-09-11">Friday (11 Sep 2026)</option>
                <option value="2026-09-12">Saturday (12 Sep 2026)</option>
              </select>
            </div>

            <!-- Time Slot Picker -->
            <div style="margin-bottom:1.5rem;">
              <label style="font-size:0.75rem; font-weight:700; color:var(--text-muted); display:block; margin-bottom:0.35rem;">COLLECTION TIME SLOT</label>
              <select class="select-control" style="width:100%;" id="draftSlotSelect" onchange="tasmacApp.currentBookingDraft.timeSlot = this.value">
                ${shop.timeSlots.map(s => `
                  <option value="${s.label}">${s.label} (${s.capacity - s.booked} slots left)</option>
                `).join('')}
              </select>
            </div>

            <!-- Declaration Checkbox -->
            <div style="background:#f0fdf4; border:1px solid var(--primary-border); border-radius:var(--radius-sm); padding:0.75rem; margin-bottom:1.5rem;">
              <label style="display:flex; align-items:flex-start; gap:0.5rem; font-size:0.78rem; color:var(--primary); cursor:pointer;">
                <input type="checkbox" id="bookingDeclarationCheck" checked style="margin-top:2px;">
                <span>I confirm that I am 21 years of age or older and agree to present my original photo ID at the TASMAC counter. I will collect the order strictly during the declared slot.</span>
              </label>
            </div>

            <button class="btn-primary" style="width:100%; justify-content:center; padding:0.8rem;" onclick="tasmacApp.confirmDraftBooking()">
              Confirm Booking & Generate QR Pass
            </button>
          </div>
        </div>
      </div>
    `;

    document.getElementById("modalContainer").innerHTML = modalHtml;
  }

  adjustDraftQty(delta, maxQty) {
    let current = this.currentBookingDraft.quantity;
    let next = current + delta;
    if (next < 1) next = 1;
    if (next > maxQty) {
      this.showToast(`Exceeds maximum available quota of ${maxQty} unit(s).`, "warning");
      return;
    }
    this.currentBookingDraft.quantity = next;

    const qtyDisplay = document.getElementById("draftQtyDisplay");
    const totalDisplay = document.getElementById("draftTotalDisplay");
    const product = tasmacStore.state.products.find(p => p.id === this.currentBookingDraft.productId);

    if (qtyDisplay) qtyDisplay.textContent = next;
    if (totalDisplay && product) totalDisplay.textContent = `Total: ₹${product.price * next}`;
  }

  confirmDraftBooking() {
    const check = document.getElementById("bookingDeclarationCheck");
    if (check && !check.checked) {
      this.showToast("Please acknowledge the age verification declaration.", "error");
      return;
    }

    try {
      const newBooking = tasmacStore.createBooking({
        shopId: this.currentBookingDraft.shopId,
        productId: this.currentBookingDraft.productId,
        quantity: this.currentBookingDraft.quantity,
        date: this.currentBookingDraft.date,
        timeSlot: this.currentBookingDraft.timeSlot
      });

      this.closeAllModals();
      this.showToast(`Booking ${newBooking.id} confirmed successfully!`, "success");
      tasmacStore.setView("my-bookings");
    } catch (e) {
      this.showToast(e.message, "error");
    }
  }

  openQuickBooking(shopId) {
    tasmacStore.setView("shop-detail", shopId);
    this.showToast("Select a product to book from this shop.", "info");
  }

  cancelBooking(bookingId) {
    if (confirm("Are you sure you want to cancel this booking? Your quota and shop inventory will be immediately restored.")) {
      try {
        tasmacStore.cancelBooking(bookingId);
        this.showToast("Booking cancelled. Quota restored.", "info");
      } catch (e) {
        this.showToast(e.message, "error");
      }
    }
  }

  printPass(bookingId) {
    window.print();
  }

  // Legal Case Information Modal (Section 9)
  openLegalCaseModal() {
    const user = tasmacStore.state.currentUser;
    const details = user?.restrictionDetails || {
      caseNumber: "TN-POL-2026-DUI-8821",
      policeStation: "Anna Nagar Traffic Police (TIW-West)",
      offenceType: "Drunk Driving (Sec 185 Motor Vehicles Act)",
      bloodAlcoholLevel: "88 mg / 100 ml (Legal limit: 30 mg)",
      imposedDate: "2026-08-15",
      reviewDate: "2026-11-15",
      sanctionAuthority: "Regional Transport Authority & Commissioner of Police",
      statusNote: "License suspended for 90 days. Mandatory de-addiction counseling pending. All TASMAC liquor bookings barred."
    };

    const modalHtml = `
      <div class="modal-overlay" onclick="if(event.target === this) tasmacApp.closeAllModals()">
        <div class="modal-dialog">
          <div class="modal-header" style="background:var(--danger-light); border-bottom-color:var(--danger-border);">
            <h3 class="modal-title" style="color:var(--danger);">
              ${TasmacComponents.icons.alertTriangle}
              <span>Legal Case & Account Restriction Notice</span>
            </h3>
            <button class="modal-close-btn" onclick="tasmacApp.closeAllModals()">✕</button>
          </div>

          <div class="modal-body">
            <div style="background:#fef2f2; border:1px solid #fca5a5; padding:1rem; border-radius:var(--radius-md); margin-bottom:1.25rem;">
              <p style="font-size:0.85rem; color:#991b1b; line-height:1.5;">
                This account is officially flagged with an active legal prohibition recorded under the Tamil Nadu Prohibition and Motor Vehicles Framework. Alcohol token booking is prohibited until authorized clearance.
              </p>
            </div>

            <div style="display:grid; grid-template-columns:1fr; gap:0.85rem; font-size:0.85rem;">
              <div class="pass-field">
                <span class="pass-field-label">Police Case Number</span>
                <span class="pass-field-value" style="font-family:monospace; color:var(--danger);">${details.caseNumber}</span>
              </div>

              <div class="pass-field">
                <span class="pass-field-label">Offence Recorded</span>
                <span class="pass-field-value">${details.offenceType}</span>
              </div>

              <div class="pass-field">
                <span class="pass-field-label">Evidence / Measured BAC</span>
                <span class="pass-field-value">${details.bloodAlcoholLevel}</span>
              </div>

              <div class="pass-field">
                <span class="pass-field-label">Enforcing Authority</span>
                <span class="pass-field-value">${details.policeStation} • ${details.sanctionAuthority}</span>
              </div>

              <div class="pass-field">
                <span class="pass-field-label">Imposed Date & Review Expiry</span>
                <span class="pass-field-value">Imposed: ${details.imposedDate} | Scheduled Review: <strong>${details.reviewDate}</strong></span>
              </div>

              <div class="pass-field">
                <span class="pass-field-label">Legal Order Details</span>
                <span style="color:var(--text-secondary); line-height:1.4;">${details.statusNote}</span>
              </div>
            </div>

            <div style="margin-top:1.5rem; padding-top:1rem; border-top:1px solid var(--border-light); font-size:0.78rem; color:var(--text-muted);">
              Citizens seeking clearance must present completion of RTO court proceedings to the TASMAC District Prohibition Officer.
            </div>
          </div>
        </div>
      </div>
    `;

    document.getElementById("modalContainer").innerHTML = modalHtml;
  }

  // Receipt Modal
  viewReceipt(purchaseId) {
    const purchase = tasmacStore.state.purchases.find(p => p.id === purchaseId);
    if (!purchase) return;

    const modalHtml = `
      <div class="modal-overlay" onclick="if(event.target === this) tasmacApp.closeAllModals()">
        <div class="modal-dialog">
          <div class="modal-header">
            <h3 class="modal-title">
              <span>🧾 TASMAC Digital Cash Receipt</span>
            </h3>
            <button class="modal-close-btn" onclick="tasmacApp.closeAllModals()">✕</button>
          </div>
          <div class="modal-body" style="font-family:monospace;">
            <div style="text-align:center; margin-bottom:1rem; border-bottom:1px dashed #cbd5e1; padding-bottom:1rem;">
              <div style="font-weight:800; font-size:1.1rem; color:var(--primary);">TAMIL NADU STATE MARKETING CORP</div>
              <div style="font-size:0.78rem;">Government of Tamil Nadu Undertaking</div>
              <div style="font-size:0.75rem; color:var(--text-muted);">${purchase.shopName}</div>
            </div>

            <div style="font-size:0.82rem; line-height:1.6; margin-bottom:1rem;">
              <div>Receipt No: <strong>${purchase.id}</strong></div>
              <div>Booking Ref: <strong>${purchase.bookingId}</strong></div>
              <div>Date & Time: <strong>${purchase.date}</strong></div>
              <div>Payment Mode: <strong>${purchase.paymentMethod}</strong></div>
            </div>

            <table style="width:100%; font-size:0.82rem; border-collapse:collapse; margin-bottom:1rem;">
              <tr style="border-bottom:1px solid #000;">
                <th style="text-align:left; padding:0.3rem 0;">ITEM</th>
                <th style="text-align:center;">QTY</th>
                <th style="text-align:right;">AMOUNT</th>
              </tr>
              <tr>
                <td style="padding:0.4rem 0;">${purchase.productName}</td>
                <td style="text-align:center;">${purchase.quantity}</td>
                <td style="text-align:right;">₹${purchase.amount}</td>
              </tr>
              <tr style="border-top:1px dashed #000; font-weight:800; font-size:0.95rem;">
                <td style="padding:0.5rem 0;" colspan="2">TOTAL PAID</td>
                <td style="text-align:right;">₹${purchase.amount}</td>
              </tr>
            </table>

            <div style="text-align:center; font-size:0.72rem; color:var(--text-muted); border-top:1px dashed #cbd5e1; padding-top:0.75rem;">
              Thank you for responsible purchase. Avoid drink and drive.
            </div>

            <button class="btn-primary" style="width:100%; justify-content:center; margin-top:1.25rem;" onclick="window.print()">
              ${TasmacComponents.icons.printer}
              <span>Print Receipt</span>
            </button>
          </div>
        </div>
      </div>
    `;

    document.getElementById("modalContainer").innerHTML = modalHtml;
  }

  // ================= ADMIN TAB CONTROLLERS =================

  switchAdminTab(tabName) {
    this.currentAdminTab = tabName;
    const tabBtns = document.querySelectorAll(".admin-tab-btn");
    tabBtns.forEach(btn => btn.classList.remove("active"));
    const clickedBtn = Array.from(tabBtns).find(b => b.getAttribute("onclick")?.includes(tabName));
    if (clickedBtn) clickedBtn.classList.add("active");

    const container = document.getElementById("adminTabContent");
    if (!container) return;

    const state = tasmacStore.getState();

    switch (tabName) {
      case "bookings":
        container.innerHTML = TasmacComponents.renderAdminBookingsTab(state.bookings);
        break;
      case "restrictions":
        container.innerHTML = TasmacComponents.renderAdminRestrictionsTab(state.legalRestrictions, state.users);
        break;
      case "inventory":
        container.innerHTML = TasmacComponents.renderAdminInventoryTab(state.shops, state.products);
        break;
      case "users":
        container.innerHTML = TasmacComponents.renderAdminUsersTab(state.users);
        break;
      case "shops":
        container.innerHTML = `
          <div class="data-table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Shop ID</th>
                  <th>Shop Name</th>
                  <th>District & City</th>
                  <th>Timings</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                ${state.shops.map(s => `
                  <tr>
                    <td style="font-family:monospace; font-weight:700;">${s.id}</td>
                    <td style="font-weight:700;">${s.name}</td>
                    <td>${s.district}, ${s.city}</td>
                    <td>${s.openingTime} - ${s.closingTime}</td>
                    <td><span class="status-badge ${s.isOpen ? 'collected' : 'cancelled'}">${s.isOpen ? 'Open' : 'Closed'}</span></td>
                    <td>
                      <button class="btn-filter-action" style="padding:0.25rem 0.6rem; font-size:0.75rem;" onclick="tasmacStore.toggleShopStatus('${s.id}')">
                        Toggle ${s.isOpen ? 'Close' : 'Open'}
                      </button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `;
        break;
    }
  }

  filterAdminBookings(query) {
    const q = query.toLowerCase();
    const rows = document.querySelectorAll("#adminBookingsTable tbody tr");
    rows.forEach(r => {
      const text = r.textContent.toLowerCase();
      r.style.display = text.includes(q) ? "" : "none";
    });
  }

  advanceBookingStatus(bookingId, status) {
    try {
      tasmacStore.updateBookingStatus(bookingId, status);
      this.showToast(`Booking ${bookingId} marked as '${status}'.`, "success");
      this.switchAdminTab("bookings");
    } catch (e) {
      this.showToast(e.message, "error");
    }
  }

  handleAdminInventoryShopChange(shopId) {
    const state = tasmacStore.getState();
    const shop = state.shops.find(s => s.id === shopId);
    const container = document.getElementById("adminInventoryTableContainer");
    if (shop && container) {
      container.innerHTML = TasmacComponents.renderAdminShopInventoryTable(shop, state.products);
    }
  }

  saveStockUpdate(shopId, productId) {
    const input = document.getElementById(`stock-input-${shopId}-${productId}`);
    if (input) {
      const newStock = parseInt(input.value) || 0;
      tasmacStore.updateShopInventory(shopId, productId, newStock);
      this.showToast(`Stock for ${productId} updated to ${newStock} units.`, "success");
    }
  }

  resetCitizenLimits(aadhaar) {
    tasmacStore.resetUserLimits(aadhaar);
    this.showToast(`Quota reset for citizen XXXX-XXXX-${aadhaar.slice(-4)}. Full 1.0 unit available.`, "success");
    this.switchAdminTab("users");
  }

  revokeRestriction(aadhaar) {
    tasmacStore.toggleUserRestriction(aadhaar, false);
    this.showToast(`Restriction revoked for citizen XXXX-XXXX-${aadhaar.slice(-4)}.`, "success");
    this.switchAdminTab("restrictions");
  }

  openFlagUserModal() {
    const users = tasmacStore.state.users.filter(u => !u.isRestricted);
    const modalHtml = `
      <div class="modal-overlay" onclick="if(event.target === this) tasmacApp.closeAllModals()">
        <div class="modal-dialog">
          <div class="modal-header">
            <h3 class="modal-title" style="color:var(--danger);">
              ${TasmacComponents.icons.alertTriangle}
              <span>Enforce Citizen Legal Restriction</span>
            </h3>
            <button class="modal-close-btn" onclick="tasmacApp.closeAllModals()">✕</button>
          </div>
          <div class="modal-body">
            <div style="margin-bottom:1rem;">
              <label style="font-size:0.75rem; font-weight:700; color:var(--text-muted); display:block; margin-bottom:0.35rem;">SELECT CITIZEN</label>
              <select class="select-control" style="width:100%;" id="flagUserSelect">
                ${users.map(u => `
                  <option value="${u.aadhaarNumber}">${u.name} (XXXX-XXXX-${u.aadhaarNumber.slice(-4)})</option>
                `).join('')}
              </select>
            </div>

            <div style="margin-bottom:1rem;">
              <label style="font-size:0.75rem; font-weight:700; color:var(--text-muted); display:block; margin-bottom:0.35rem;">LEGAL OFFENCE CATEGORY</label>
              <select class="select-control" style="width:100%;" id="flagOffenceSelect">
                <option value="Drunk Driving (Sec 185 Motor Vehicles Act)">Drunk Driving (Sec 185 Motor Vehicles Act)</option>
                <option value="Alcohol-Related Public Violence (IPC 323/324)">Alcohol-Related Public Violence (IPC 323/324)</option>
                <option value="Narcotics / NDPS Co-Violation">Narcotics / NDPS Co-Violation</option>
                <option value="Court Order Prohibition Sanction">Court Order Prohibition Sanction</option>
              </select>
            </div>

            <div style="margin-bottom:1rem;">
              <label style="font-size:0.75rem; font-weight:700; color:var(--text-muted); display:block; margin-bottom:0.35rem;">POLICE CASE NUMBER</label>
              <input type="text" id="flagCaseNum" value="TN-POL-2026-DUI-9912" class="select-control" style="width:100%;">
            </div>

            <div style="margin-bottom:1.5rem;">
              <label style="font-size:0.75rem; font-weight:700; color:var(--text-muted); display:block; margin-bottom:0.35rem;">RESTRICTION REVIEW DATE</label>
              <input type="date" id="flagReviewDate" value="2026-12-31" class="select-control" style="width:100%;">
            </div>

            <button class="btn-primary" style="width:100%; justify-content:center; background:var(--danger);" onclick="tasmacApp.confirmFlagUser()">
              Confirm Restriction & Block Alcohol Booking
            </button>
          </div>
        </div>
      </div>
    `;

    document.getElementById("modalContainer").innerHTML = modalHtml;
  }

  confirmFlagUser() {
    const aadhaar = document.getElementById("flagUserSelect").value;
    const offence = document.getElementById("flagOffenceSelect").value;
    const caseNum = document.getElementById("flagCaseNum").value;
    const reviewDate = document.getElementById("flagReviewDate").value;

    tasmacStore.toggleUserRestriction(aadhaar, true, {
      caseNumber: caseNum,
      policeStation: "Prohibition & Enforcement Wing, Chennai",
      offenceType: offence,
      bloodAlcoholLevel: "94 mg / 100 ml",
      imposedDate: new Date().toISOString().split("T")[0],
      reviewDate: reviewDate,
      sanctionAuthority: "Traffic Police & Judicial Magistrate",
      statusNote: "Prohibition order enforced by District Prohibition Officer.",
      canAppeal: true
    });

    this.closeAllModals();
    this.showToast(`Citizen XXXX-XXXX-${aadhaar.slice(-4)} is now legally restricted.`, "warning");
    this.switchAdminTab("restrictions");
  }

  // ================= ALCOHOL AWARENESS HANDLERS =================

  switchFrequencyTab(tabKey) {
    this.currentFreqTab = tabKey;
    this.render(tasmacStore.getState());
  }

  selectAnatomyPoint(nodeId) {
    this.currentAnatomyNode = nodeId;
    const data = window.TASMAC_AWARENESS_DATA?.bodyMindVisual || {};
    const allNodes = [...(data.bodyPoints || []), ...(data.mindPoints || [])];
    const node = allNodes.find(n => n.id === nodeId);

    // Update active classes on buttons
    document.querySelectorAll(".bodymind-node-btn").forEach(btn => {
      const isTarget = btn.getAttribute("onclick")?.includes(`'${nodeId}'`);
      if (isTarget) btn.classList.add("active");
      else btn.classList.remove("active");
    });

    // Update active classes on pulse points
    document.querySelectorAll(".anatomy-pulse-point").forEach(pt => {
      const isTarget = pt.getAttribute("onclick")?.includes(`'${nodeId}'`);
      if (isTarget) pt.classList.add("active");
      else pt.classList.remove("active");
    });

    const panel = document.getElementById("anatomyDetailPanel");
    if (panel && node) {
      panel.innerHTML = `
        <div class="bodymind-detail-header">
          <div class="bodymind-detail-title">
            <span>${node.icon}</span>
            <span>${node.label} — ${node.summary}</span>
          </div>
          <span class="bodymind-detail-tag">${node.tag}</span>
        </div>
        <p class="bodymind-detail-body">
          ${node.details}
        </p>
      `;
    }
  }

  openLearnMoreModal() {
    const modalHtml = `
      <div class="modal-overlay" onclick="if(event.target === this) tasmacApp.closeAllModals()">
        <div class="modal-dialog wide">
          <div class="modal-header" style="background:#f0fdf4; border-bottom:1px solid #bbf7d0;">
            <h3 class="modal-title" style="color:#064e3b;">
              <span>📖 Health Guide: Alcohol & Your Wellbeing</span>
            </h3>
            <button class="modal-close-btn" onclick="tasmacApp.closeAllModals()">✕</button>
          </div>
          <div class="modal-body">
            <div style="margin-bottom:1.5rem;">
              <h4 style="font-size:1.1rem; font-weight:800; color:#0f5a34; margin-bottom:0.4rem;">
                How Alcohol Impacts the Body & Brain
              </h4>
              <p style="font-size:0.88rem; color:var(--text-secondary); line-height:1.6;">
                When alcohol is ingested, it is absorbed directly through the stomach and small intestine into the bloodstream. Within minutes, it crosses the blood-brain barrier, altering the balance of essential neurotransmitters such as GABA (inhibitory) and glutamate (excitatory).
              </p>
            </div>

            <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.25rem; margin-bottom:1.5rem;" class="rules-split-grid">
              <div style="background:var(--bg-muted); border-radius:var(--radius-md); padding:1rem;">
                <div style="font-weight:800; font-size:0.9rem; color:#b45309; margin-bottom:0.3rem;">
                  🔬 Acetaldehyde Toxicity
                </div>
                <p style="font-size:0.82rem; color:var(--text-secondary); line-height:1.5;">
                  The liver converts ethanol into acetaldehyde—a toxic compound and recognized carcinogen. Acetaldehyde causes cellular inflammation, facial flushing, nausea, and tissue damage before further oxidation.
                </p>
              </div>

              <div style="background:var(--bg-muted); border-radius:var(--radius-md); padding:1rem;">
                <div style="font-weight:800; font-size:0.9rem; color:#15803d; margin-bottom:0.3rem;">
                  🛡️ The Myth of "High Tolerance"
                </div>
                <p style="font-size:0.82rem; color:var(--text-secondary); line-height:1.5;">
                  Being able to "hold your liquor" does not protect organs. Rather, tolerance indicates cellular and neurological adaptation, which often leads to higher consumption and increased risk of organ injury and dependency.
                </p>
              </div>
            </div>

            <div style="background:#fef3c7; border:1px solid #fde68a; border-radius:var(--radius-md); padding:1rem; margin-bottom:1.5rem;">
              <div style="font-weight:800; font-size:0.9rem; color:#92400e; margin-bottom:0.3rem;">
                💡 Practical Steps for Health Preservation
              </div>
              <ul style="font-size:0.82rem; color:#78350f; line-height:1.6; padding-left:1.2rem;">
                <li>Plan alcohol-free days during the week to allow hepatic regeneration.</li>
                <li>Never consume alcohol when driving, operating machinery, or pregnant.</li>
                <li>Stay well hydrated with water before and after any consumption.</li>
                <li>Seek immediate support if drinking begins to affect work, relationships, or mental health.</li>
              </ul>
            </div>

            <div style="display:flex; justify-content:flex-end; gap:0.75rem;">
              <button class="btn-primary" onclick="tasmacApp.closeAllModals(); tasmacApp.openHealthResourcesModal();">
                View Health Helplines
              </button>
              <button class="btn-filter-action" onclick="tasmacApp.closeAllModals()">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    document.getElementById("modalContainer").innerHTML = modalHtml;
  }

  openHealthResourcesModal() {
    const resources = window.TASMAC_AWARENESS_DATA?.healthResources || [];

    const modalHtml = `
      <div class="modal-overlay" onclick="if(event.target === this) tasmacApp.closeAllModals()">
        <div class="modal-dialog wide">
          <div class="modal-header" style="background:#f0fdf4; border-bottom:1px solid #bbf7d0;">
            <h3 class="modal-title" style="color:#064e3b;">
              <span>🏥 Tamil Nadu & National Health Resources</span>
            </h3>
            <button class="modal-close-btn" onclick="tasmacApp.closeAllModals()">✕</button>
          </div>
          <div class="modal-body">
            <p style="font-size:0.88rem; color:var(--text-secondary); margin-bottom:1.25rem;">
              Confidential, professional support for alcohol counseling, de-addiction, and family guidance is available 24/7.
            </p>

            <div style="display:flex; flex-direction:column; gap:1rem; margin-bottom:1.5rem;">
              ${resources.map(res => `
                <div style="background:var(--bg-muted); border:1px solid var(--border-light); border-radius:var(--radius-md); padding:1rem 1.25rem;">
                  <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.3rem; flex-wrap:wrap; gap:0.5rem;">
                    <div>
                      <div style="font-weight:800; font-size:0.95rem; color:var(--text-primary);">${res.name}</div>
                      <span class="status-indicator-pill status-active" style="font-size:0.72rem;">${res.type}</span>
                    </div>
                    <div style="text-align:right;">
                      <div style="font-size:1.05rem; font-weight:800; color:var(--primary); font-family:monospace;">📞 ${res.phone}</div>
                      <span style="font-size:0.75rem; color:var(--text-muted);">${res.hours}</span>
                    </div>
                  </div>
                  <p style="font-size:0.82rem; color:var(--text-secondary); margin-top:0.4rem; line-height:1.5;">
                    ${res.description}
                  </p>
                </div>
              `).join('')}
            </div>

            <div style="background:#fee2e2; border:1px solid #fecaca; border-radius:var(--radius-md); padding:0.75rem 1rem; font-size:0.8rem; color:#991b1b; display:flex; align-items:center; gap:0.5rem;">
              <span>🚨</span>
              <span><strong>Medical Emergency:</strong> If someone is unresponsive, choking, or having seizures due to acute intoxication, call <strong>108 (Ambulance)</strong> or <strong>112 (Police)</strong> immediately.</span>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn-filter-action" onclick="tasmacApp.closeAllModals()">Close</button>
          </div>
        </div>
      </div>
    `;

    document.getElementById("modalContainer").innerHTML = modalHtml;
  }
}

// Instantiate and start app on DOM load
window.tasmacApp = new TasmacApp();
document.addEventListener("DOMContentLoaded", () => {
  window.tasmacApp.init();
});
