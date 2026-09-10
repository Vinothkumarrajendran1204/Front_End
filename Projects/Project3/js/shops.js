/**
 * Unakku Avlotha Limit - TASMAC Shop Locator Controller
 * Handles district/city filtering, geolocation calculation, and shop card rendering.
 */

document.addEventListener("DOMContentLoaded", () => {
  // Render common headers/footers
  const headerMount = document.getElementById("headerMount");
  if (headerMount && window.UalUI) {
    headerMount.innerHTML = UalUI.renderHeader("shops");
  }
  const footerMount = document.getElementById("footerMount");
  if (footerMount && window.UalUI) {
    footerMount.innerHTML = UalUI.renderFooter();
  }

  const store = window.ualStore;
  const districtSelect = document.getElementById("districtSelect");
  const citySelect = document.getElementById("citySelect");
  const searchInput = document.getElementById("shopSearchInput");
  const gpsBtn = document.getElementById("gpsLocationBtn");
  const filterChips = document.querySelectorAll(".filter-chip");
  const shopsContainer = document.getElementById("shopsGrid");
  const shopCountDisplay = document.getElementById("shopCountDisplay");

  let activeFilter = "all";

  // Populate District options
  if (districtSelect) {
    districtSelect.innerHTML = UAL_DB.districts.map(d => 
      `<option value="${d.name}" ${d.name === store.state.selectedDistrict ? 'selected' : ''}>${d.name}</option>`
    ).join('');

    populateCities(districtSelect.value);

    districtSelect.addEventListener("change", (e) => {
      store.state.selectedDistrict = e.target.value;
      populateCities(e.target.value);
      store.state.selectedCity = citySelect.value;
      store.save();
      renderShops();
    });
  }

  if (citySelect) {
    citySelect.addEventListener("change", (e) => {
      store.state.selectedCity = e.target.value;
      store.save();
      renderShops();
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      renderShops();
    });
  }

  // Filter Chips (All, Open Now, Elite Stores, Near Me)
  filterChips.forEach(chip => {
    chip.addEventListener("click", () => {
      filterChips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      activeFilter = chip.dataset.filter || "all";
      renderShops();
    });
  });

  // GPS Simulation
  if (gpsBtn) {
    gpsBtn.addEventListener("click", () => {
      gpsBtn.innerHTML = `<span>⏳</span> Locating...`;
      setTimeout(() => {
        gpsBtn.innerHTML = `<span>📍</span> GPS Active (Chennai Central)`;
        store.state.selectedDistrict = "Chennai";
        if (districtSelect) districtSelect.value = "Chennai";
        populateCities("Chennai");
        // Randomize mock distances slightly
        store.state.shops.forEach(s => {
          if (s.district === "Chennai") {
            s.distanceKm = (0.5 + Math.random() * 2.5).toFixed(1);
          }
        });
        store.save();
        UalUI.toast("Location updated via GPS! Showing nearest outlets.", "success");
        renderShops();
      }, 600);
    });
  }

  function populateCities(districtName) {
    if (!citySelect) return;
    const dist = UAL_DB.districts.find(d => d.name === districtName);
    const cities = dist ? dist.cities : ["All Areas"];
    citySelect.innerHTML = `<option value="all">All Localities</option>` + 
      cities.map(c => `<option value="${c}">${c}</option>`).join('');
  }

  function renderShops() {
    if (!shopsContainer) return;

    let shops = [...store.state.shops];
    const distVal = districtSelect ? districtSelect.value : store.state.selectedDistrict;
    const cityVal = citySelect ? citySelect.value : "all";
    const query = searchInput ? searchInput.value.trim().toLowerCase() : "";

    // Filter by district
    if (distVal) {
      shops = shops.filter(s => s.district === distVal);
    }

    // Filter by city
    if (cityVal && cityVal !== "all") {
      shops = shops.filter(s => s.city === cityVal);
    }

    // Filter by search query
    if (query) {
      shops = shops.filter(s => 
        s.name.toLowerCase().includes(query) ||
        s.id.toLowerCase().includes(query) ||
        s.address.toLowerCase().includes(query)
      );
    }

    // Filter by chip
    if (activeFilter === "open") {
      shops = shops.filter(s => s.isOpen);
    } else if (activeFilter === "elite") {
      shops = shops.filter(s => s.type === "Elite");
    } else if (activeFilter === "near") {
      shops = shops.filter(s => parseFloat(s.distanceKm) <= 3.0);
    }

    // Sort by distance
    shops.sort((a, b) => parseFloat(a.distanceKm) - parseFloat(b.distanceKm));

    if (shopCountDisplay) {
      shopCountDisplay.textContent = `${shops.length} Outlet${shops.length === 1 ? '' : 's'} Available`;
    }

    if (shops.length === 0) {
      shopsContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align:center; padding:3rem 1rem; background:#ffffff; border-radius:12px; border:1px solid #e2e8f0;">
          <div style="font-size:2.5rem; margin-bottom:0.5rem;">🔍</div>
          <h3 style="font-size:1.15rem; font-weight:700; color:var(--text-primary);">No TASMAC Outlets Found</h3>
          <p style="font-size:0.85rem; color:var(--text-secondary); margin-top:0.25rem;">
            Try changing your selected district, locality, or search keyword.
          </p>
        </div>
      `;
      return;
    }

    shopsContainer.innerHTML = shops.map(s => {
      const stockBadgeColor = s.stockStatus === "High Stock" ? "badge-success" : s.stockStatus === "Moderate Stock" ? "badge-warning" : "badge-danger";
      return `
        <div class="shop-card" style="background:#ffffff; border:1px solid #e2e8f0; border-radius:12px; padding:1.4rem; box-shadow:0 2px 4px rgba(0,0,0,0.02); display:flex; flex-direction:column; justify-content:space-between; transition:transform 0.15s ease, box-shadow 0.15s ease;">
          <div>
            <div class="flex justify-between items-start">
              <div>
                <span class="mono-text" style="font-size:0.75rem; color:var(--text-muted);">${s.id}</span>
                <h3 style="font-size:1.1rem; font-weight:800; color:#0f5a34; margin:0.15rem 0 0.35rem;">${s.name}</h3>
              </div>
              <span class="badge ${s.isOpen ? 'badge-success' : 'badge-danger'}">
                ${s.isOpen ? '🟢 Open Now' : '🔴 Closed'}
              </span>
            </div>

            <p style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:0.75rem; line-height:1.45;">
              📍 ${s.address}
            </p>

            <div class="flex flex-wrap gap-2 items-center" style="font-size:0.78rem; color:var(--text-muted); margin-bottom:1rem; background:#f8fafc; padding:0.6rem 0.75rem; border-radius:6px;">
              <span>📏 <strong>${s.distanceKm} km</strong> away</span>
              <span>•</span>
              <span>🕒 ${s.timing}</span>
              <span>•</span>
              <span class="badge ${stockBadgeColor}" style="font-size:0.7rem;">${s.stockStatus}</span>
            </div>
          </div>

          <div class="flex gap-2" style="margin-top:0.5rem;">
            <button class="btn-outline" style="flex:1; padding:0.55rem 0.5rem; font-size:0.85rem;" onclick="viewShopProducts('${s.id}')">
              View Products
            </button>
            <button class="btn-primary" style="flex:1; padding:0.55rem 0.5rem; font-size:0.85rem;" onclick="startBookingShop('${s.id}')">
              Book Token
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  // Initial render
  renderShops();
});

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
