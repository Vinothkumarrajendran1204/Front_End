/**
 * Unakku Avlotha Limit - User Dashboard Controller
 * Displays customer greeting, daily HOT/NON-HOT limit meters, active token, and quick action cards.
 */

document.addEventListener("DOMContentLoaded", () => {
  // Render common headers/footers
  const headerMount = document.getElementById("headerMount");
  if (headerMount && window.UalUI) {
    headerMount.innerHTML = UalUI.renderHeader("dashboard");
  }
  const footerMount = document.getElementById("footerMount");
  if (footerMount && window.UalUI) {
    footerMount.innerHTML = UalUI.renderFooter();
  }

  const store = window.ualStore;
  const user = store.state.currentUser;

  // If no user is logged in, redirect to login
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  // Populate Customer Profile Hero
  const custNameElem = document.getElementById("dashCustName");
  const custIdElem = document.getElementById("dashCustId");
  const custPhoneElem = document.getElementById("dashCustPhone");
  const custLocationElem = document.getElementById("dashCustLocation");

  if (custNameElem) custNameElem.textContent = user.name;
  if (custIdElem) custIdElem.textContent = user.customerId;
  if (custPhoneElem) custPhoneElem.textContent = user.phoneMasked;
  if (custLocationElem) custLocationElem.textContent = `${user.district || "Chennai"} District, TN`;

  // Render Daily Limit Meters & Status
  renderLimitMeters(user);

  // Render Active Booking if available
  renderActiveBooking(user);

  // Render Nearby Shops
  renderNearbyShops(user.district || "Chennai");

  // Subscribe to changes
  store.subscribe((state) => {
    if (state.currentUser) {
      renderLimitMeters(state.currentUser);
      renderActiveBooking(state.currentUser);
    }
  });
});

function renderLimitMeters(user) {
  const limits = window.ualStore.getDailyLimits(user);
  const container = document.getElementById("limitMetersContainer");
  if (!container) return;

  // Check for Restriction Notice Banner
  let restrictionHtml = '';
  if (limits.isRestricted) {
    const rCase = user.restrictionCase || {
      category: "Drink-and-drive related restriction",
      caseRef: "UAL-CASE-992",
      imposedDate: "10/09/2026",
      status: "Temporarily Restricted"
    };

    restrictionHtml = `
      <div class="restriction-alert-box">
        <div class="flex items-center gap-3">
          <span style="font-size:1.8rem;">🚫</span>
          <div style="flex:1;">
            <h4 style="color:#dc2626; font-size:1.05rem; font-weight:800; margin-bottom:0.25rem;">
              Account Temporarily Restricted — Booking is currently unavailable.
            </h4>
            <p style="font-size:0.85rem; color:#475569; margin-bottom:0.5rem;">
              An active statutory restriction is registered under your Aadhaar account.
            </p>
            <div class="flex flex-wrap gap-4" style="font-size:0.78rem; background:#fee2e2; padding:0.5rem 0.75rem; border-radius:6px;">
              <span><strong>Category:</strong> ${rCase.category}</span>
              <span><strong>Case Ref:</strong> ${rCase.caseRef}</span>
              <span><strong>Status:</strong> ${rCase.status}</span>
              <span><strong>Imposed Date:</strong> ${rCase.imposedDate}</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  container.innerHTML = `
    ${restrictionHtml}

    <div class="daily-limits-card">
      <div class="flex justify-between items-center flex-wrap gap-2">
        <div>
          <h3 style="font-size:1.15rem; font-weight:800; color:var(--primary-dark);">Today's Quota & Limit Enforcement</h3>
          <p style="font-size:0.8rem; color:var(--text-secondary);">
            Strict Tamil Nadu statutory quotas enforced per verified Aadhaar resident per calendar day.
          </p>
        </div>
        <div class="flex items-center gap-2">
          <span class="badge ${limits.isRestricted ? 'badge-danger' : 'badge-success'}">
            ${limits.isRestricted ? 'Account Blocked' : 'Quota Active'}
          </span>
          <span style="font-size:0.75rem; color:var(--text-muted); font-family:monospace;">
            ${new Date().toLocaleDateString("en-GB")}
          </span>
        </div>
      </div>

      <div class="limits-grid">
        <!-- HOT Spirit Limit Meter -->
        <div class="limit-meter-box hot-box">
          <div class="flex justify-between items-center">
            <div class="flex items-center gap-2">
              <span style="font-size:1.3rem;">🔥</span>
              <div>
                <strong style="font-size:0.95rem; color:#b45309;">HOT Spirit Quota</strong>
                <div style="font-size:0.75rem; color:var(--text-muted);">Whisky, Brandy, Rum, Vodka</div>
              </div>
            </div>
            <div style="text-align:right;">
              <span style="font-size:1.4rem; font-weight:900; color:#b45309;">
                ${limits.hot.used} / ${limits.hot.max}
              </span>
              <span style="font-size:0.75rem; color:var(--text-muted); display:block;">unit / day</span>
            </div>
          </div>

          <div class="meter-track">
            <div class="meter-fill-hot ${limits.hot.isReached ? 'meter-exhausted' : ''}" style="width: ${limits.hot.percent}%;"></div>
          </div>

          <div class="flex justify-between items-center" style="font-size:0.8rem;">
            <span style="color:${limits.hot.isReached ? '#dc2626' : '#16a34a'}; font-weight:700;">
              ${limits.isRestricted ? 'Disabled by Restriction' : limits.hot.isReached ? '⚠️ Daily limit reached' : `✅ ${limits.hot.remaining} unit remaining`}
            </span>
            <span style="color:var(--text-muted); font-size:0.75rem;">Strict Cap: 1/day</span>
          </div>

          ${limits.hot.isReached && !limits.isRestricted ? `
            <div style="margin-top:0.75rem; font-size:0.78rem; background:#fffbeb; color:#92400e; padding:0.4rem 0.6rem; border-radius:4px; border-left:3px solid #d97706;">
              Your HOT daily limit has been reached. You can book again tomorrow.
            </div>
          ` : ''}
        </div>

        <!-- NON-HOT Beer & Wine Limit Meter -->
        <div class="limit-meter-box nonhot-box">
          <div class="flex justify-between items-center">
            <div class="flex items-center gap-2">
              <span style="font-size:1.3rem;">🍺</span>
              <div>
                <strong style="font-size:0.95rem; color:#0f5a34;">NON-HOT Mild Quota</strong>
                <div style="font-size:0.75rem; color:var(--text-muted);">Beer, Wine & Mild Spirits</div>
              </div>
            </div>
            <div style="text-align:right;">
              <span style="font-size:1.4rem; font-weight:900; color:#0f5a34;">
                ${limits.nonHot.used} / ${limits.nonHot.max}
              </span>
              <span style="font-size:0.75rem; color:var(--text-muted); display:block;">units / day</span>
            </div>
          </div>

          <div class="meter-track">
            <div class="meter-fill-nonhot ${limits.nonHot.isReached ? 'meter-exhausted' : ''}" style="width: ${limits.nonHot.percent}%;"></div>
          </div>

          <div class="flex justify-between items-center" style="font-size:0.8rem;">
            <span style="color:${limits.nonHot.isReached ? '#dc2626' : '#16a34a'}; font-weight:700;">
              ${limits.isRestricted ? 'Disabled by Restriction' : limits.nonHot.isReached ? '⚠️ Daily limit reached' : `✅ ${limits.nonHot.remaining} unit(s) remaining`}
            </span>
            <span style="color:var(--text-muted); font-size:0.75rem;">Strict Cap: 2/day</span>
          </div>

          ${limits.nonHot.isReached && !limits.isRestricted ? `
            <div style="margin-top:0.75rem; font-size:0.78rem; background:#fffbeb; color:#92400e; padding:0.4rem 0.6rem; border-radius:4px; border-left:3px solid #d97706;">
              Your NON-HOT daily limit has been reached. You can book again tomorrow.
            </div>
          ` : ''}
        </div>
      </div>
    </div>
  `;
}

function renderActiveBooking(user) {
  const container = document.getElementById("activeBookingContainer");
  if (!container) return;

  const bookings = window.ualStore.state.bookings;
  const active = bookings.find(b => 
    (b.customerId === user.customerId || b.customerPhone === user.phoneMasked) &&
    b.status === "Confirmed"
  );

  if (!active) {
    container.innerHTML = `
      <div class="card" style="padding:1.5rem; text-align:center; background:#ffffff; border:1px dashed #cbd5e1;">
        <div style="font-size:2rem; margin-bottom:0.5rem;">🎫</div>
        <h4 style="font-weight:700; color:var(--text-primary); margin-bottom:0.25rem;">No Active Token for Today</h4>
        <p style="font-size:0.85rem; color:var(--text-secondary); max-width:400px; margin:0 auto 1.25rem;">
          Advance token booking prevents crowding and guarantees prompt pickup at your local retail outlet.
        </p>
        <a href="shops.html" class="btn-primary" style="display:inline-flex; align-items:center; gap:0.4rem;">
          <span>Browse Nearby Shops</span> <span>→</span>
        </a>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="card" style="padding:1.5rem; border-left:5px solid #0f5a34; background:#ffffff;">
      <div class="flex justify-between items-start flex-wrap gap-2">
        <div>
          <span class="badge badge-success" style="margin-bottom:0.5rem; display:inline-block;">Active Token</span>
          <h3 style="font-size:1.2rem; font-weight:900; color:#0f5a34;">Token ID: ${active.id}</h3>
          <p style="font-size:0.85rem; color:var(--text-secondary); margin-top:0.25rem;">
            📍 <strong>${active.shopName}</strong>
          </p>
        </div>
        <button class="btn-primary" onclick="openQrPassModal('${active.id}')" style="display:inline-flex; align-items:center; gap:0.4rem;">
          <span>📱 View QR Token</span>
        </button>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-3" style="margin-top:1.25rem; background:#f8fafc; padding:1rem; border-radius:8px;">
        <div>
          <span style="font-size:0.75rem; color:var(--text-muted); display:block;">Product</span>
          <strong style="font-size:0.85rem;">${active.productName}</strong>
        </div>
        <div>
          <span style="font-size:0.75rem; color:var(--text-muted); display:block;">Category & Qty</span>
          <strong style="font-size:0.85rem;">${active.category} (${active.quantity} Unit)</strong>
        </div>
        <div>
          <span style="font-size:0.75rem; color:var(--text-muted); display:block;">Collection Time Slot</span>
          <strong style="font-size:0.85rem; color:#b45309;">⏰ ${active.collectionTime}</strong>
        </div>
        <div>
          <span style="font-size:0.75rem; color:var(--text-muted); display:block;">Amount Payable</span>
          <strong style="font-size:0.85rem; color:#0f5a34;">₹${active.totalAmount} (At Counter)</strong>
        </div>
      </div>
    </div>
  `;
}

function renderNearbyShops(district) {
  const container = document.getElementById("dashNearbyShops");
  if (!container) return;

  const shops = window.ualStore.state.shops.filter(s => s.district === district).slice(0, 3);
  if (shops.length === 0) {
    container.innerHTML = `<p style="color:var(--text-muted); font-size:0.85rem;">No shops found in ${district}.</p>`;
    return;
  }

  container.innerHTML = shops.map(s => `
    <div class="shop-card" style="padding:1.25rem; border-radius:12px; border:1px solid #e2e8f0; background:#ffffff;">
      <div class="flex justify-between items-start">
        <div>
          <h4 style="font-weight:800; font-size:1rem; color:#0f5a34;">${s.name}</h4>
          <span class="mono-text" style="font-size:0.75rem; color:var(--text-muted);">${s.id}</span>
        </div>
        <span class="badge ${s.isOpen ? 'badge-success' : 'badge-danger'}">${s.isOpen ? 'Open Now' : 'Closed'}</span>
      </div>
      <p style="font-size:0.82rem; color:var(--text-secondary); margin:0.6rem 0;">
        📍 ${s.address} (${s.distanceKm} km away)
      </p>
      <div class="flex justify-between items-center" style="font-size:0.78rem; color:var(--text-muted); margin-bottom:1rem;">
        <span>🕒 ${s.timing}</span>
        <span>📦 ${s.stockStatus}</span>
      </div>
      <div class="flex gap-2">
        <button class="btn-outline" style="flex:1; padding:0.45rem 0.5rem; font-size:0.8rem;" onclick="viewShopProducts('${s.id}')">
          View Products
        </button>
        <button class="btn-primary" style="flex:1; padding:0.45rem 0.5rem; font-size:0.8rem;" onclick="startBookingShop('${s.id}')">
          Book Token
        </button>
      </div>
    </div>
  `).join('');
}

window.viewShopProducts = (shopId) => {
  window.ualStore.state.selectedShopId = shopId;
  window.ualStore.save();
  window.location.href = `products.html?shopId=${shopId}`;
};

window.startBookingShop = (shopId) => {
  window.ualStore.state.selectedShopId = shopId;
  window.ualStore.save();
  window.location.href = `booking.html?shopId=${shopId}`;
};

// QR Pass Modal
window.openQrPassModal = (bookingId) => {
  const booking = window.ualStore.state.bookings.find(b => b.id === bookingId);
  if (!booking) return;

  let modal = document.getElementById("qrModal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "qrModal";
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="modal-overlay" onclick="if(event.target === this) this.remove()">
      <div class="modal-dialog">
        <div class="token-pass-header">
          <div class="flex items-center gap-2">
            <span style="font-size:1.2rem;">🎫</span>
            <strong style="font-size:1.05rem;">Official Digital Token</strong>
          </div>
          <button class="modal-close-btn" style="color:#ffffff;" onclick="this.closest('.modal-overlay').remove()">✕</button>
        </div>
        <div class="token-pass-body">
          <span class="badge badge-success" style="font-size:0.8rem;">CONFIRMED RESERVATION</span>
          <h2 style="font-size:1.6rem; font-weight:900; color:#0f5a34; margin:0.35rem 0;">${booking.id}</h2>
          <p style="font-size:0.82rem; color:var(--text-secondary);">
            Present this scannable QR pass at the physical TASMAC retail counter.
          </p>

          <div class="qr-code-frame" id="dashQrContainer"></div>

          <div class="token-pass-meta-grid">
            <div>
              <span style="font-size:0.72rem; color:var(--text-muted); display:block;">Customer</span>
              <strong>${booking.customerName}</strong>
            </div>
            <div>
              <span style="font-size:0.72rem; color:var(--text-muted); display:block;">Customer ID</span>
              <strong class="mono-text">${booking.customerId}</strong>
            </div>
            <div>
              <span style="font-size:0.72rem; color:var(--text-muted); display:block;">Outlet</span>
              <strong>${booking.shopName}</strong>
            </div>
            <div>
              <span style="font-size:0.72rem; color:var(--text-muted); display:block;">Time Slot</span>
              <strong style="color:#b45309;">${booking.collectionTime}</strong>
            </div>
            <div>
              <span style="font-size:0.72rem; color:var(--text-muted); display:block;">Item</span>
              <strong>${booking.productName} (${booking.quantity} Unit)</strong>
            </div>
            <div>
              <span style="font-size:0.72rem; color:var(--text-muted); display:block;">Pay at Outlet</span>
              <strong style="color:#0f5a34;">₹${booking.totalAmount}</strong>
            </div>
          </div>

          <div style="margin-top:1.25rem; display:flex; gap:0.5rem; justify-content:center;">
            <button class="btn-primary" onclick="window.print()" style="font-size:0.85rem; padding:0.5rem 1.25rem;">
              🖨️ Print Pass
            </button>
            <button class="btn-outline" onclick="this.closest('.modal-overlay').remove()" style="font-size:0.85rem; padding:0.5rem 1.25rem;">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Generate QR Code via QRCode generator
  setTimeout(() => {
    const qrTarget = document.getElementById("dashQrContainer");
    if (qrTarget && window.QRCode) {
      qrTarget.innerHTML = "";
      new QRCode(qrTarget, {
        text: booking.qrData,
        width: 170,
        height: 170,
        colorDark: "#0f5a34",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
      });
    }
  }, 50);
};
