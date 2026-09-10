/**
 * Unakku Avlotha Limit - Customer Booking History Controller
 * Displays private booking ledger with time filters, cancellation option, and QR modal triggers.
 */

document.addEventListener("DOMContentLoaded", () => {
  // Render common headers/footers
  const headerMount = document.getElementById("headerMount");
  if (headerMount && window.UalUI) {
    headerMount.innerHTML = UalUI.renderHeader("history");
  }
  const footerMount = document.getElementById("footerMount");
  if (footerMount && window.UalUI) {
    footerMount.innerHTML = UalUI.renderFooter();
  }

  const store = window.ualStore;
  const user = store.state.currentUser;

  if (!user) {
    UalUI.toast("Please log in to view your token history.", "warning");
    setTimeout(() => { window.location.href = "login.html"; }, 700);
    return;
  }

  const tableContainer = document.getElementById("historyListContainer");
  const timeFilterChips = document.querySelectorAll(".time-filter-chip");
  const statusFilterSelect = document.getElementById("historyStatusFilter");
  const totalBookingsCount = document.getElementById("totalBookingsCount");

  let activeTimeFilter = "all";
  let activeStatusFilter = "all";

  // Time filter listeners
  timeFilterChips.forEach(chip => {
    chip.addEventListener("click", () => {
      timeFilterChips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      activeTimeFilter = chip.dataset.time || "all";
      renderHistory();
    });
  });

  if (statusFilterSelect) {
    statusFilterSelect.addEventListener("change", (e) => {
      activeStatusFilter = e.target.value;
      renderHistory();
    });
  }

  function renderHistory() {
    if (!tableContainer) return;

    // Filter user's bookings only
    let list = store.state.bookings.filter(b => 
      b.customerId === user.customerId || 
      b.customerPhone === user.phoneMasked ||
      b.customerName === user.name
    );

    // Status filter
    if (activeStatusFilter !== "all") {
      list = list.filter(b => b.status.toLowerCase() === activeStatusFilter.toLowerCase());
    }

    // Time filter
    const now = new Date();
    if (activeTimeFilter === "today") {
      const todayStr = now.toLocaleDateString("en-GB");
      list = list.filter(b => b.date === todayStr);
    } else if (activeTimeFilter === "week") {
      // Last 7 days
      const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      list = list.filter(b => new Date(b.createdAt) >= sevenDaysAgo);
    }

    if (totalBookingsCount) {
      totalBookingsCount.textContent = `${list.length} Token${list.length === 1 ? '' : 's'}`;
    }

    if (list.length === 0) {
      tableContainer.innerHTML = `
        <div style="text-align:center; padding:3rem 1rem; background:#ffffff; border-radius:12px; border:1px solid #e2e8f0;">
          <div style="font-size:2.5rem; margin-bottom:0.5rem;">📜</div>
          <h3 style="font-size:1.15rem; font-weight:700;">No Booking Records Found</h3>
          <p style="font-size:0.85rem; color:var(--text-secondary); margin-top:0.35rem;">
            You have no token bookings matching this filter.
          </p>
          <a href="shops.html" class="btn-primary" style="margin-top:1.25rem; display:inline-flex; align-items:center; gap:0.4rem;">
            <span>Book New Token</span> <span>→</span>
          </a>
        </div>
      `;
      return;
    }

    tableContainer.innerHTML = `
      <div style="overflow-x:auto;">
        <table class="data-table" style="width:100%; border-collapse:collapse; background:#ffffff; border-radius:10px; overflow:hidden; border:1px solid #e2e8f0;">
          <thead style="background:#f8fafc; border-bottom:1px solid #e2e8f0; font-size:0.8rem; text-transform:uppercase; color:var(--text-muted);">
            <tr>
              <th style="padding:0.85rem 1rem; text-align:left;">Token ID</th>
              <th style="padding:0.85rem 1rem; text-align:left;">Retail Outlet</th>
              <th style="padding:0.85rem 1rem; text-align:left;">Product & Qty</th>
              <th style="padding:0.85rem 1rem; text-align:left;">Date & Slot</th>
              <th style="padding:0.85rem 1rem; text-align:left;">Amount</th>
              <th style="padding:0.85rem 1rem; text-align:left;">Status</th>
              <th style="padding:0.85rem 1rem; text-align:right;">Actions</th>
            </tr>
          </thead>
          <tbody style="font-size:0.85rem;">
            ${list.map(b => {
              const statusClass = b.status === "Confirmed" ? "badge-success" : b.status === "Completed" ? "badge-info" : "badge-danger";
              return `
                <tr style="border-bottom:1px solid #f1f5f9;">
                  <td style="padding:0.85rem 1rem;">
                    <strong class="mono-text" style="color:#0f5a34;">${b.id}</strong>
                    <div style="font-size:0.7rem; color:var(--text-muted);">${new Date(b.createdAt).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</div>
                  </td>
                  <td style="padding:0.85rem 1rem;">
                    <div style="font-weight:700;">${b.shopName}</div>
                    <span class="mono-text" style="font-size:0.72rem; color:var(--text-muted);">${b.shopId}</span>
                  </td>
                  <td style="padding:0.85rem 1rem;">
                    <div>${b.productName}</div>
                    <span class="badge ${b.category === 'HOT' ? 'badge-warning' : 'badge-success'}" style="font-size:0.7rem;">
                      ${b.category} • ${b.quantity} Unit
                    </span>
                  </td>
                  <td style="padding:0.85rem 1rem;">
                    <div>${b.date}</div>
                    <div style="font-size:0.78rem; color:#b45309; font-weight:600;">${b.collectionTime}</div>
                  </td>
                  <td style="padding:0.85rem 1rem; font-weight:800; color:#0f172a;">
                    ₹${b.totalAmount}
                  </td>
                  <td style="padding:0.85rem 1rem;">
                    <span class="badge ${statusClass}">${b.status}</span>
                  </td>
                  <td style="padding:0.85rem 1rem; text-align:right;">
                    <div class="flex gap-2 justify-end">
                      <button class="btn-primary" style="padding:0.35rem 0.65rem; font-size:0.75rem;" onclick="openQrPassModal('${b.id}')">
                        QR Pass
                      </button>
                      ${b.status === "Confirmed" ? `
                        <button class="btn-outline" style="padding:0.35rem 0.65rem; font-size:0.75rem; color:#dc2626; border-color:#fecaca;" onclick="cancelBooking('${b.id}')">
                          Cancel
                        </button>
                      ` : ''}
                    </div>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  window.cancelBooking = (bookingId) => {
    if (!confirm("Are you sure you want to cancel this booking? Your daily limit will be restored.")) {
      return;
    }

    const b = store.state.bookings.find(item => item.id === bookingId);
    if (!b) return;

    b.status = "Cancelled";

    // Restore daily limits
    if (user.dailyLimits) {
      if (b.category === "HOT") {
        user.dailyLimits.hotUsed = Math.max(0, (user.dailyLimits.hotUsed || 0) - b.quantity);
      } else {
        user.dailyLimits.nonHotUsed = Math.max(0, (user.dailyLimits.nonHotUsed || 0) - b.quantity);
      }
    }

    // Restore shop stock
    const shop = store.state.shops.find(s => s.id === b.shopId);
    if (shop && shop.inventory && shop.inventory[b.productId] !== undefined) {
      shop.inventory[b.productId] += b.quantity;
    }

    store.notify();
    UalUI.toast(`Booking ${bookingId} cancelled. Quota restored.`, "info");
    renderHistory();
  };

  // Initial render
  renderHistory();
});
