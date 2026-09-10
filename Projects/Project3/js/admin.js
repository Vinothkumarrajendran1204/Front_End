/**
 * Unakku Avlotha Limit - Admin Dashboard & Restriction Management Controller
 * Includes KPI metrics, HTML5 Canvas charts, shop management, inventory updates, and resident restriction toggling.
 */

document.addEventListener("DOMContentLoaded", () => {
  // Render common headers/footers
  const headerMount = document.getElementById("headerMount");
  if (headerMount && window.UalUI) {
    headerMount.innerHTML = UalUI.renderHeader("admin");
  }
  const footerMount = document.getElementById("footerMount");
  if (footerMount && window.UalUI) {
    footerMount.innerHTML = UalUI.renderFooter();
  }

  const store = window.ualStore;

  // Check Admin Authorization
  if (!store.state.isAdmin) {
    const promptPin = prompt("Officer Authorization Required.\nEnter Admin PIN (Demo: 8899):", "8899");
    if (promptPin === "8899" || promptPin === "ADMIN") {
      store.loginAdmin("8899");
    } else {
      UalUI.toast("Access Denied: Officer PIN Required", "error");
      setTimeout(() => { window.location.href = "login.html"; }, 600);
      return;
    }
  }

  // Initial Admin Render
  renderKpis();
  renderCanvasCharts();
  renderCustomerRestrictions();
  renderShopManagement();
  renderInventoryManagement();

  // Tab switcher
  const tabs = document.querySelectorAll(".admin-tab-btn");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const targetId = tab.dataset.target;
      document.querySelectorAll(".admin-section").forEach(sec => sec.classList.add("hidden"));
      const targetSec = document.getElementById(targetId);
      if (targetSec) targetSec.classList.remove("hidden");
    });
  });

  function renderKpis() {
    const customers = store.state.customers;
    const shops = store.state.shops;
    const bookings = store.state.bookings;
    const restrictedCount = customers.filter(c => c.isRestricted).length;
    const totalRev = bookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);

    const kpiResidents = document.getElementById("kpiResidents");
    const kpiShops = document.getElementById("kpiShops");
    const kpiTokens = document.getElementById("kpiTokens");
    const kpiRestrictions = document.getElementById("kpiRestrictions");
    const kpiRevenue = document.getElementById("kpiRevenue");

    if (kpiResidents) kpiResidents.textContent = customers.length;
    if (kpiShops) kpiShops.textContent = shops.length;
    if (kpiTokens) kpiTokens.textContent = bookings.length;
    if (kpiRestrictions) kpiRestrictions.textContent = restrictedCount;
    if (kpiRevenue) kpiRevenue.textContent = `₹${totalRev.toLocaleString()}`;
  }

  // HTML5 Canvas Charts
  function renderCanvasCharts() {
    renderBarChart("chartTokensByCategory", ["HOT Spirit", "NON-HOT Mild"], [
      store.state.bookings.filter(b => b.category === "HOT").length,
      store.state.bookings.filter(b => b.category === "NON-HOT").length
    ], ["#b45309", "#0f5a34"]);

    renderBarChart("chartBookingsByOutlet", 
      store.state.shops.slice(0, 4).map(s => s.name.split("–")[1] || s.name.slice(0, 10)),
      [14, 9, 18, 12],
      ["#0f5a34", "#16a34a", "#0284c7", "#d97706"]
    );
  }

  function renderBarChart(canvasId, labels, data, colors) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    const maxVal = Math.max(...data, 10);
    const barWidth = 45;
    const gap = 35;
    const startX = 50;
    const chartHeight = height - 50;

    data.forEach((val, i) => {
      const h = (val / maxVal) * (chartHeight - 30);
      const x = startX + i * (barWidth + gap);
      const y = chartHeight - h;

      // Bar
      ctx.fillStyle = colors[i % colors.length];
      ctx.beginPath();
      ctx.roundRect(x, y, barWidth, h, [6, 6, 0, 0]);
      ctx.fill();

      // Value label
      ctx.fillStyle = "#0f172a";
      ctx.font = "bold 12px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(val.toString(), x + barWidth / 2, y - 6);

      // X Label
      ctx.fillStyle = "#64748b";
      ctx.font = "11px Inter, sans-serif";
      ctx.fillText(labels[i], x + barWidth / 2, chartHeight + 18);
    });
  }

  // Customer Restriction Management
  function renderCustomerRestrictions() {
    const tbody = document.getElementById("customerRestrictionsTbody");
    if (!tbody) return;

    const customers = store.state.customers;
    tbody.innerHTML = customers.map(c => {
      const limits = store.getDailyLimits(c);
      const isRestricted = !!c.isRestricted;

      return `
        <tr style="border-bottom:1px solid #e2e8f0;">
          <td style="padding:0.75rem 1rem;">
            <strong style="color:#0f5a34;">${c.name}</strong>
            <div style="font-size:0.75rem; color:var(--text-muted);">${c.personaNote}</div>
          </td>
          <td style="padding:0.75rem 1rem;">
            <span class="mono-text">${c.customerId}</span>
            <div style="font-size:0.72rem; color:var(--text-muted);">${c.aadhaarNumber}</div>
          </td>
          <td style="padding:0.75rem 1rem; font-size:0.82rem;">
            <div>🔥 HOT: <strong>${limits.hot.used}/${limits.hot.max}</strong></div>
            <div>🍺 NON-HOT: <strong>${limits.nonHot.used}/${limits.nonHot.max}</strong></div>
          </td>
          <td style="padding:0.75rem 1rem;">
            <span class="badge ${isRestricted ? 'badge-danger' : 'badge-success'}">
              ${isRestricted ? 'Temporarily Restricted' : 'Cleared / Active'}
            </span>
            ${c.restrictionCase ? `
              <div style="font-size:0.72rem; color:#dc2626; margin-top:0.25rem;">
                ${c.restrictionCase.category} (${c.restrictionCase.caseRef})
              </div>
            ` : ''}
          </td>
          <td style="padding:0.75rem 1rem; text-align:right;">
            ${isRestricted ? `
              <button class="btn-primary" style="padding:0.35rem 0.75rem; font-size:0.75rem; background:#16a34a;" onclick="adminToggleUser('${c.aadhaarNumber}', false)">
                ✅ Clear Restriction
              </button>
            ` : `
              <button class="btn-outline" style="padding:0.35rem 0.75rem; font-size:0.75rem; color:#dc2626; border-color:#fecaca;" onclick="adminToggleUser('${c.aadhaarNumber}', true)">
                🚫 Impose Restriction
              </button>
            `}
          </td>
        </tr>
      `;
    }).join('');
  }

  window.adminToggleUser = (aadhaar, restrict) => {
    const reason = restrict ? prompt("Reason for restriction:", "Drink-and-drive related restriction") || "Drink-and-drive related restriction" : "";
    store.toggleRestriction(aadhaar, restrict, reason);
    UalUI.toast(`Customer status updated: ${restrict ? 'Restricted' : 'Cleared'}`, restrict ? 'warning' : 'success');
    renderKpis();
    renderCustomerRestrictions();
  };

  // Shop Management
  function renderShopManagement() {
    const tbody = document.getElementById("shopManagementTbody");
    if (!tbody) return;

    tbody.innerHTML = store.state.shops.map(s => `
      <tr style="border-bottom:1px solid #e2e8f0;">
        <td style="padding:0.75rem 1rem;">
          <strong class="mono-text">${s.id}</strong>
        </td>
        <td style="padding:0.75rem 1rem;">
          <strong>${s.name}</strong>
          <div style="font-size:0.75rem; color:var(--text-muted);">${s.address}</div>
        </td>
        <td style="padding:0.75rem 1rem;">
          ${s.district} / ${s.city}
        </td>
        <td style="padding:0.75rem 1rem;">
          <span class="badge ${s.isOpen ? 'badge-success' : 'badge-danger'}">
            ${s.isOpen ? 'Open' : 'Closed'}
          </span>
        </td>
        <td style="padding:0.75rem 1rem; text-align:right;">
          <button class="btn-outline" style="padding:0.3rem 0.6rem; font-size:0.75rem;" onclick="adminToggleShopOpen('${s.id}')">
            ${s.isOpen ? 'Mark Closed' : 'Mark Open'}
          </button>
        </td>
      </tr>
    `).join('');
  }

  window.adminToggleShopOpen = (shopId) => {
    const shop = store.state.shops.find(s => s.id === shopId);
    if (shop) {
      shop.isOpen = !shop.isOpen;
      store.notify();
      UalUI.toast(`Shop status updated: ${shop.name} is now ${shop.isOpen ? 'Open' : 'Closed'}.`, 'info');
      renderShopManagement();
    }
  };

  // Inventory Management
  function renderInventoryManagement() {
    const tbody = document.getElementById("inventoryTbody");
    if (!tbody) return;

    const currentShop = store.state.shops[0];
    tbody.innerHTML = store.state.products.map(p => {
      const stock = currentShop.inventory?.[p.id] ?? 0;
      return `
        <tr style="border-bottom:1px solid #e2e8f0;">
          <td style="padding:0.75rem 1rem;">
            <span class="mono-text">${p.id}</span>
          </td>
          <td style="padding:0.75rem 1rem;">
            <strong>${p.name}</strong>
            <span class="badge ${p.type === 'HOT' ? 'badge-warning' : 'badge-success'}" style="font-size:0.68rem; margin-left:0.3rem;">
              ${p.type}
            </span>
          </td>
          <td style="padding:0.75rem 1rem;">
            ₹${p.price}
          </td>
          <td style="padding:0.75rem 1rem;">
            <strong>${stock}</strong> units
          </td>
          <td style="padding:0.75rem 1rem; text-align:right;">
            <div class="flex gap-1 justify-end">
              <button class="btn-outline" style="padding:0.2rem 0.5rem; font-size:0.75rem;" onclick="adminAdjustStock('${p.id}', 10)">+10</button>
              <button class="btn-outline" style="padding:0.2rem 0.5rem; font-size:0.75rem;" onclick="adminAdjustStock('${p.id}', -10)">-10</button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  window.adminAdjustStock = (productId, delta) => {
    const shop = store.state.shops[0];
    if (shop && shop.inventory) {
      shop.inventory[productId] = Math.max(0, (shop.inventory[productId] || 0) + delta);
      store.notify();
      UalUI.toast(`Stock updated for ${productId}`, "info");
      renderInventoryManagement();
    }
  };
});
