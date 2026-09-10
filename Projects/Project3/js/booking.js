/**
 * Unakku Avlotha Limit - 11-Step Token Booking Flow Controller
 * Handles shop, category, product, strict quantity stepper with daily limit clamp,
 * slot reservation, confirmation, and QR pass generation.
 */

document.addEventListener("DOMContentLoaded", () => {
  // Common header & footer mounts
  const headerMount = document.getElementById("headerMount");
  if (headerMount && window.UalUI) {
    headerMount.innerHTML = UalUI.renderHeader("booking");
  }
  const footerMount = document.getElementById("footerMount");
  if (footerMount && window.UalUI) {
    footerMount.innerHTML = UalUI.renderFooter();
  }

  const store = window.ualStore;
  const user = store.state.currentUser;

  // Check login
  if (!user) {
    UalUI.toast("Please log in with Aadhaar OTP to book a token.", "warning");
    setTimeout(() => { window.location.href = "login.html"; }, 800);
    return;
  }

  // Parse URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const paramShopId = urlParams.get("shopId");
  const paramProductId = urlParams.get("productId");

  if (paramShopId) store.state.selectedShopId = paramShopId;
  if (paramProductId) store.state.selectedProductId = paramProductId;
  store.save();

  // Booking State
  let bookingState = {
    shopId: store.state.selectedShopId || store.state.shops[0].id,
    category: "HOT", // "HOT" | "NON-HOT"
    productId: store.state.selectedProductId || null,
    quantity: 1,
    date: new Date().toLocaleDateString("en-GB"),
    timeSlot: "6:00 PM – 7:00 PM"
  };

  // Preload product type if product selected
  if (bookingState.productId) {
    const p = store.state.products.find(item => item.id === bookingState.productId);
    if (p) bookingState.category = p.type;
  }

  // Check Account Restriction
  const limits = store.getDailyLimits(user);
  if (limits.isRestricted) {
    const container = document.getElementById("bookingWizardContainer");
    if (container) {
      container.innerHTML = `
        <div class="card" style="padding:2.5rem; text-align:center; max-width:600px; margin:2rem auto; border-top:5px solid #dc2626;">
          <div style="font-size:3rem; margin-bottom:1rem;">🚫</div>
          <h2 style="font-size:1.4rem; font-weight:800; color:#dc2626; margin-bottom:0.5rem;">
            Account Temporarily Restricted
          </h2>
          <p style="font-size:0.95rem; color:var(--text-secondary); line-height:1.5; margin-bottom:1.5rem;">
            Booking is currently unavailable for Aadhaar resident <strong>${user.name}</strong> (${user.customerId}).
            Statutory restriction notice: <em>${user.restrictionCase?.category || "Drink-and-drive related restriction"}</em>.
          </p>
          <div class="flex gap-3 justify-center">
            <a href="dashboard.html" class="btn-outline">Back to Dashboard</a>
            <button class="btn-primary" onclick="UalUI.openPersonaModal()">Switch Test Persona</button>
          </div>
        </div>
      `;
    }
    return;
  }

  // Wizard Steps Container & Navigation
  initWizard();

  function initWizard() {
    renderShopSelector();
    renderCategorySelector();
    renderProductSelector();
    renderQuantityStepper();
    renderSlotSelector();
    renderSummary();
    attachEventListeners();
  }

  // 1. Shop Selector
  function renderShopSelector() {
    const sel = document.getElementById("wizardShopSelect");
    if (!sel) return;
    sel.innerHTML = store.state.shops.map(s => `
      <option value="${s.id}" ${s.id === bookingState.shopId ? 'selected' : ''}>
        ${s.name} (${s.district} – ${s.distanceKm} km)
      </option>
    `).join('');

    sel.addEventListener("change", (e) => {
      bookingState.shopId = e.target.value;
      renderProductSelector();
      renderSummary();
    });
  }

  // 2. Category Selector (Strict HOT vs NON-HOT)
  function renderCategorySelector() {
    const btnHot = document.getElementById("wizardCatHot");
    const btnNonHot = document.getElementById("wizardCatNonHot");
    if (!btnHot || !btnNonHot) return;

    const currentLimits = store.getDailyLimits(user);

    // Disable button if limit already reached
    if (currentLimits.hot.isReached) {
      btnHot.disabled = true;
      btnHot.title = "Your HOT daily limit has been reached.";
    }
    if (currentLimits.nonHot.isReached) {
      btnNonHot.disabled = true;
      btnNonHot.title = "Your NON-HOT daily limit has been reached.";
    }

    // Auto switch if currently selected category is exhausted
    if (bookingState.category === "HOT" && currentLimits.hot.isReached && !currentLimits.nonHot.isReached) {
      bookingState.category = "NON-HOT";
    }

    updateCatButtons();

    btnHot.addEventListener("click", () => {
      if (currentLimits.hot.isReached) {
        UalUI.toast("Your HOT daily limit has been reached. You can book again tomorrow.", "warning");
        return;
      }
      bookingState.category = "HOT";
      bookingState.productId = null;
      bookingState.quantity = 1;
      updateCatButtons();
      renderProductSelector();
      renderQuantityStepper();
      renderSummary();
    });

    btnNonHot.addEventListener("click", () => {
      if (currentLimits.nonHot.isReached) {
        UalUI.toast("Your NON-HOT daily limit has been reached. You can book again tomorrow.", "warning");
        return;
      }
      bookingState.category = "NON-HOT";
      bookingState.productId = null;
      bookingState.quantity = 1;
      updateCatButtons();
      renderProductSelector();
      renderQuantityStepper();
      renderSummary();
    });

    function updateCatButtons() {
      if (bookingState.category === "HOT") {
        btnHot.style.background = "#b45309";
        btnHot.style.color = "#ffffff";
        btnHot.style.borderColor = "#b45309";
        btnNonHot.style.background = "#ffffff";
        btnNonHot.style.color = "#0f172a";
        btnNonHot.style.borderColor = "#e2e8f0";
      } else {
        btnNonHot.style.background = "#0f5a34";
        btnNonHot.style.color = "#ffffff";
        btnNonHot.style.borderColor = "#0f5a34";
        btnHot.style.background = "#ffffff";
        btnHot.style.color = "#0f172a";
        btnHot.style.borderColor = "#e2e8f0";
      }
    }
  }

  // 3. Product Selector
  function renderProductSelector() {
    const sel = document.getElementById("wizardProductSelect");
    if (!sel) return;

    const shop = store.state.shops.find(s => s.id === bookingState.shopId) || store.state.shops[0];
    const availableProducts = store.state.products.filter(p => p.type === bookingState.category);

    if (availableProducts.length === 0) {
      sel.innerHTML = `<option value="">No items available</option>`;
      return;
    }

    // Default to first product if none or mismatched
    if (!bookingState.productId || !availableProducts.some(p => p.id === bookingState.productId)) {
      bookingState.productId = availableProducts[0].id;
    }

    sel.innerHTML = availableProducts.map(p => {
      const stock = shop.inventory?.[p.id] ?? 0;
      return `
        <option value="${p.id}" ${p.id === bookingState.productId ? 'selected' : ''}>
          ${p.name} (${p.size}) — ₹${p.price} [Stock: ${stock}]
        </option>
      `;
    }).join('');

    sel.addEventListener("change", (e) => {
      bookingState.productId = e.target.value;
      renderQuantityStepper();
      renderSummary();
    });
  }

  // 4. Strict Quantity Stepper
  function renderQuantityStepper() {
    const minusBtn = document.getElementById("qtyMinusBtn");
    const plusBtn = document.getElementById("qtyPlusBtn");
    const qtyInput = document.getElementById("qtyDisplayInput");
    const limitNote = document.getElementById("qtyLimitNote");

    const currentLimits = store.getDailyLimits(user);
    const maxAllowed = bookingState.category === "HOT" ? currentLimits.hot.remaining : currentLimits.nonHot.remaining;

    // Clamp current quantity
    if (bookingState.quantity > maxAllowed) {
      bookingState.quantity = Math.max(1, maxAllowed);
    }
    if (maxAllowed <= 0) {
      bookingState.quantity = 0;
    }

    if (qtyInput) qtyInput.value = bookingState.quantity;

    if (minusBtn) {
      minusBtn.disabled = bookingState.quantity <= 1;
    }

    if (plusBtn) {
      plusBtn.disabled = bookingState.quantity >= maxAllowed || maxAllowed <= 0;
    }

    if (limitNote) {
      if (maxAllowed <= 0) {
        limitNote.innerHTML = `<span style="color:#dc2626; font-weight:700;">⚠️ Daily limit reached. You cannot add units today.</span>`;
      } else {
        limitNote.innerHTML = `
          <span>Cap for ${bookingState.category}: <strong>${maxAllowed} unit${maxAllowed === 1 ? '' : 's'} remaining</strong> today.</span>
        `;
      }
    }
  }

  // 5. Time Slot Selector
  function renderSlotSelector() {
    const slotsContainer = document.getElementById("wizardSlotsGrid");
    if (!slotsContainer) return;

    const shop = store.state.shops.find(s => s.id === bookingState.shopId) || store.state.shops[0];
    const slots = shop.timeSlots || [
      { id: "S1", label: "12:00 PM – 1:00 PM", capacity: 20, booked: 5 },
      { id: "S2", label: "2:00 PM – 3:00 PM", capacity: 25, booked: 10 },
      { id: "S3", label: "5:00 PM – 6:00 PM", capacity: 30, booked: 18 },
      { id: "S4", label: "6:00 PM – 7:00 PM", capacity: 35, booked: 22 },
      { id: "S5", label: "7:00 PM – 8:00 PM", capacity: 35, booked: 28 },
      { id: "S6", label: "8:00 PM – 9:00 PM", capacity: 30, booked: 29 }
    ];

    slotsContainer.innerHTML = slots.map(slot => {
      const isFull = slot.booked >= slot.capacity;
      const isSelected = slot.label === bookingState.timeSlot;
      const available = slot.capacity - slot.booked;

      return `
        <div class="slot-card ${isSelected ? 'selected-slot' : ''} ${isFull ? 'slot-full' : ''}" 
             onclick="${isFull ? '' : `selectTimeSlot('${slot.label}')`}"
             style="border:1.5px solid ${isSelected ? '#0f5a34' : '#e2e8f0'}; background:${isSelected ? '#f0fdf4' : isFull ? '#f1f5f9' : '#ffffff'}; padding:0.75rem 1rem; border-radius:8px; cursor:${isFull ? 'not-allowed' : 'pointer'};">
          <div class="flex justify-between items-center">
            <strong style="font-size:0.88rem; color:${isFull ? '#94a3b8' : '#0f172a'};">${slot.label}</strong>
            <span class="badge ${isFull ? 'badge-danger' : available <= 3 ? 'badge-warning' : 'badge-success'}" style="font-size:0.7rem;">
              ${isFull ? 'Full' : `${available} left`}
            </span>
          </div>
        </div>
      `;
    }).join('');
  }

  window.selectTimeSlot = (label) => {
    bookingState.timeSlot = label;
    renderSlotSelector();
    renderSummary();
  };

  // 6. Summary Card
  function renderSummary() {
    const shop = store.state.shops.find(s => s.id === bookingState.shopId) || store.state.shops[0];
    const product = store.state.products.find(p => p.id === bookingState.productId);

    const sumShopElem = document.getElementById("sumShop");
    const sumProductElem = document.getElementById("sumProduct");
    const sumCategoryElem = document.getElementById("sumCategory");
    const sumQtyElem = document.getElementById("sumQuantity");
    const sumTotalElem = document.getElementById("sumTotal");
    const sumSlotElem = document.getElementById("sumSlot");
    const confirmBtn = document.getElementById("confirmBookingBtn");

    if (sumShopElem) sumShopElem.textContent = `${shop.name} (${shop.id})`;
    if (sumProductElem && product) sumProductElem.textContent = `${product.name} (${product.size})`;
    if (sumCategoryElem) sumCategoryElem.textContent = `${bookingState.category} Spirit`;
    if (sumQtyElem) sumQtyElem.textContent = `${bookingState.quantity} Unit(s)`;
    if (sumSlotElem) sumSlotElem.textContent = `${bookingState.date} • ${bookingState.timeSlot}`;

    const total = product ? product.price * bookingState.quantity : 0;
    if (sumTotalElem) sumTotalElem.textContent = `₹${total}`;

    // Confirm button validation
    if (confirmBtn) {
      const validation = store.canBook(bookingState.category, bookingState.quantity, user);
      if (!validation.allowed || bookingState.quantity <= 0) {
        confirmBtn.disabled = true;
        confirmBtn.textContent = validation.reason || "Daily Limit Exhausted";
      } else {
        confirmBtn.disabled = false;
        confirmBtn.textContent = "Confirm & Generate Token Pass";
      }
    }
  }

  function attachEventListeners() {
    const minusBtn = document.getElementById("qtyMinusBtn");
    const plusBtn = document.getElementById("qtyPlusBtn");
    const confirmBtn = document.getElementById("confirmBookingBtn");

    if (minusBtn) {
      minusBtn.addEventListener("click", () => {
        if (bookingState.quantity > 1) {
          bookingState.quantity--;
          renderQuantityStepper();
          renderSummary();
        }
      });
    }

    if (plusBtn) {
      plusBtn.addEventListener("click", () => {
        const currentLimits = store.getDailyLimits(user);
        const maxAllowed = bookingState.category === "HOT" ? currentLimits.hot.remaining : currentLimits.nonHot.remaining;
        if (bookingState.quantity < maxAllowed) {
          bookingState.quantity++;
          renderQuantityStepper();
          renderSummary();
        } else {
          UalUI.toast(`Daily limit reached: Maximum ${maxAllowed} unit(s) allowed today.`, "warning");
        }
      });
    }

    if (confirmBtn) {
      confirmBtn.addEventListener("click", handleBookingSubmit);
    }
  }

  function handleBookingSubmit() {
    try {
      const newBooking = store.createBooking({
        shopId: bookingState.shopId,
        productId: bookingState.productId,
        quantity: bookingState.quantity,
        date: bookingState.date,
        collectionTime: bookingState.timeSlot
      });

      UalUI.toast("Token Confirmed Successfully!", "success");

      // Show Token Modal Screen
      showSuccessPass(newBooking);
    } catch (err) {
      UalUI.toast(err.message, "error");
    }
  }

  function showSuccessPass(booking) {
    const container = document.getElementById("bookingWizardContainer");
    if (!container) return;

    container.innerHTML = `
      <div class="token-pass-card" style="margin:2rem auto;">
        <div class="token-pass-header">
          <div class="flex items-center gap-2">
            <span style="font-size:1.3rem;">🎫</span>
            <strong style="font-size:1.1rem;">Official Collection Token</strong>
          </div>
          <span class="badge" style="background:#22c55e; color:#ffffff;">CONFIRMED</span>
        </div>
        <div class="token-pass-body">
          <h2 style="font-size:1.75rem; font-weight:900; color:#0f5a34; margin:0.35rem 0;">${booking.id}</h2>
          <p style="font-size:0.85rem; color:var(--text-secondary);">
            Present this QR pass at the physical TASMAC counter along with original ID.
          </p>

          <div class="qr-code-frame" id="passQrCodeTarget"></div>

          <div class="token-pass-meta-grid">
            <div>
              <span style="font-size:0.72rem; color:var(--text-muted); display:block;">Resident</span>
              <strong>${booking.customerName}</strong>
            </div>
            <div>
              <span style="font-size:0.72rem; color:var(--text-muted); display:block;">Customer ID</span>
              <strong class="mono-text">${booking.customerId}</strong>
            </div>
            <div>
              <span style="font-size:0.72rem; color:var(--text-muted); display:block;">Outlet Name</span>
              <strong>${booking.shopName}</strong>
            </div>
            <div>
              <span style="font-size:0.72rem; color:var(--text-muted); display:block;">Time Slot</span>
              <strong style="color:#b45309;">⏰ ${booking.collectionTime}</strong>
            </div>
            <div>
              <span style="font-size:0.72rem; color:var(--text-muted); display:block;">Category & Product</span>
              <strong>${booking.productName} (${booking.quantity} Unit)</strong>
            </div>
            <div>
              <span style="font-size:0.72rem; color:var(--text-muted); display:block;">Total at Counter</span>
              <strong style="color:#0f5a34; font-size:1rem;">₹${booking.totalAmount}</strong>
            </div>
          </div>

          <div class="flex gap-3 justify-center" style="margin-top:1.5rem;">
            <button class="btn-primary" onclick="window.print()" style="font-size:0.85rem; padding:0.6rem 1.25rem;">
              🖨️ Print Pass
            </button>
            <a href="history.html" class="btn-outline" style="font-size:0.85rem; padding:0.6rem 1.25rem;">
              View in My Bookings
            </a>
            <a href="dashboard.html" class="btn-outline" style="font-size:0.85rem; padding:0.6rem 1.25rem;">
              Dashboard
            </a>
          </div>
        </div>
      </div>
    `;

    // Render QR Code
    setTimeout(() => {
      const qrTarget = document.getElementById("passQrCodeTarget");
      if (qrTarget && window.QRCode) {
        qrTarget.innerHTML = "";
        new QRCode(qrTarget, {
          text: booking.qrData,
          width: 180,
          height: 180,
          colorDark: "#0f5a34",
          colorLight: "#ffffff",
          correctLevel: QRCode.CorrectLevel.H
        });
      }
    }, 60);
  }
});
