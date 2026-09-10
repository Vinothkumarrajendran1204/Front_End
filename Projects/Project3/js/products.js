/**
 * Unakku Avlotha Limit - Products Catalog Controller
 * Displays shop-specific inventory, strict HOT vs NON-HOT segregation, and live daily quota availability.
 */

document.addEventListener("DOMContentLoaded", () => {
  // Render common headers/footers
  const headerMount = document.getElementById("headerMount");
  if (headerMount && window.UalUI) {
    headerMount.innerHTML = UalUI.renderHeader("products");
  }
  const footerMount = document.getElementById("footerMount");
  if (footerMount && window.UalUI) {
    footerMount.innerHTML = UalUI.renderFooter();
  }

  const store = window.ualStore;
  const user = store.state.currentUser;

  // Determine active shop from URL param or store
  const urlParams = new URLSearchParams(window.location.search);
  const paramShopId = urlParams.get("shopId");
  if (paramShopId) {
    store.state.selectedShopId = paramShopId;
    store.save();
  }

  const activeShopId = store.state.selectedShopId || "UAL-CHE-101";
  const shop = store.state.shops.find(s => s.id === activeShopId) || store.state.shops[0];

  // Active category: null (All), "HOT", "NON-HOT"
  let selectedCategory = store.state.selectedCategory || "HOT";
  let activeSubcategory = "all";
  let searchQuery = "";

  // Elements
  const shopBadgeElem = document.getElementById("selectedShopBanner");
  const hotCategoryBtn = document.getElementById("catBtnHot");
  const nonHotCategoryBtn = document.getElementById("catBtnNonHot");
  const subcategoryPills = document.getElementById("subcategoryPills");
  const productSearch = document.getElementById("productSearchInput");
  const productsGrid = document.getElementById("productsGrid");
  const userQuotaBanner = document.getElementById("userQuotaBanner");

  // Render Shop Banner
  if (shopBadgeElem && shop) {
    shopBadgeElem.innerHTML = `
      <div class="flex justify-between items-center flex-wrap gap-2">
        <div>
          <div class="flex items-center gap-2">
            <span class="badge badge-success">Selected Retail Outlet</span>
            <span class="mono-text" style="font-size:0.75rem; color:var(--text-muted);">${shop.id}</span>
          </div>
          <h2 style="font-size:1.3rem; font-weight:900; color:#0f5a34; margin:0.25rem 0;">${shop.name}</h2>
          <p style="font-size:0.85rem; color:var(--text-secondary);">
            📍 ${shop.address} • 🕒 ${shop.timing}
          </p>
        </div>
        <a href="shops.html" class="btn-outline" style="font-size:0.82rem; padding:0.45rem 0.9rem;">
          Change Outlet
        </a>
      </div>
    `;
  }

  // Render User Quota Indicator
  renderQuotaBanner();

  // Category switch handlers
  if (hotCategoryBtn && nonHotCategoryBtn) {
    hotCategoryBtn.addEventListener("click", () => {
      selectedCategory = "HOT";
      activeSubcategory = "all";
      updateCategoryButtons();
      renderSubcategories();
      renderProducts();
    });

    nonHotCategoryBtn.addEventListener("click", () => {
      selectedCategory = "NON-HOT";
      activeSubcategory = "all";
      updateCategoryButtons();
      renderSubcategories();
      renderProducts();
    });
  }

  if (productSearch) {
    productSearch.addEventListener("input", (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      renderProducts();
    });
  }

  function updateCategoryButtons() {
    if (hotCategoryBtn && nonHotCategoryBtn) {
      if (selectedCategory === "HOT") {
        hotCategoryBtn.classList.add("active-cat-hot");
        nonHotCategoryBtn.classList.remove("active-cat-nonhot");
      } else {
        nonHotCategoryBtn.classList.add("active-cat-nonhot");
        hotCategoryBtn.classList.remove("active-cat-hot");
      }
    }
  }

  function renderSubcategories() {
    if (!subcategoryPills) return;
    const hotSubs = ["All HOT", "Whisky", "Brandy", "Rum", "Vodka"];
    const nonHotSubs = ["All NON-HOT", "Beer", "Wine"];
    const subs = selectedCategory === "HOT" ? hotSubs : nonHotSubs;

    subcategoryPills.innerHTML = subs.map(sub => {
      const isAll = sub.startsWith("All");
      const val = isAll ? "all" : sub;
      const isActive = activeSubcategory === val;
      return `
        <button class="filter-chip ${isActive ? 'active' : ''}" onclick="selectSubcategory('${val}')">
          ${sub}
        </button>
      `;
    }).join('');
  }

  window.selectSubcategory = (sub) => {
    activeSubcategory = sub;
    renderSubcategories();
    renderProducts();
  };

  function renderQuotaBanner() {
    if (!userQuotaBanner) return;
    const limits = store.getDailyLimits(user);

    if (limits.isRestricted) {
      userQuotaBanner.innerHTML = `
        <div class="restriction-alert-box" style="margin-bottom:1.5rem;">
          <strong>Account Restricted:</strong> Token booking is locked for your Aadhaar profile.
        </div>
      `;
      return;
    }

    userQuotaBanner.innerHTML = `
      <div class="flex justify-between items-center flex-wrap gap-3" style="background:#ffffff; border:1px solid #e2e8f0; border-radius:10px; padding:0.85rem 1.25rem; margin-bottom:1.5rem;">
        <div class="flex items-center gap-2">
          <span style="font-size:1.2rem;">📊</span>
          <span style="font-size:0.85rem; font-weight:700; color:var(--text-primary);">Your Daily Quota Status:</span>
        </div>
        <div class="flex gap-4 items-center" style="font-size:0.85rem;">
          <div class="flex items-center gap-1.5">
            <span>🔥 HOT:</span>
            <strong style="color:${limits.hot.isReached ? '#dc2626' : '#b45309'};">${limits.hot.used}/${limits.hot.max}</strong>
            <span class="badge ${limits.hot.isReached ? 'badge-danger' : 'badge-success'}" style="font-size:0.7rem;">
              ${limits.hot.isReached ? 'Limit Reached' : `${limits.hot.remaining} Left`}
            </span>
          </div>
          <div class="flex items-center gap-1.5">
            <span>🍺 NON-HOT:</span>
            <strong style="color:${limits.nonHot.isReached ? '#dc2626' : '#0f5a34'};">${limits.nonHot.used}/${limits.nonHot.max}</strong>
            <span class="badge ${limits.nonHot.isReached ? 'badge-danger' : 'badge-success'}" style="font-size:0.7rem;">
              ${limits.nonHot.isReached ? 'Limit Reached' : `${limits.nonHot.remaining} Left`}
            </span>
          </div>
        </div>
      </div>
    `;
  }

  function renderProducts() {
    if (!productsGrid) return;

    let items = store.state.products.filter(p => p.type === selectedCategory);

    // Subcategory filter
    if (activeSubcategory !== "all") {
      items = items.filter(p => p.category.toLowerCase() === activeSubcategory.toLowerCase());
    }

    // Search filter
    if (searchQuery) {
      items = items.filter(p => 
        p.name.toLowerCase().includes(searchQuery) ||
        p.brand.toLowerCase().includes(searchQuery) ||
        p.id.toLowerCase().includes(searchQuery)
      );
    }

    const limits = store.getDailyLimits(user);
    const categoryReached = selectedCategory === "HOT" ? limits.hot.isReached : limits.nonHot.isReached;

    if (items.length === 0) {
      productsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align:center; padding:3rem 1rem; background:#ffffff; border-radius:12px; border:1px solid #e2e8f0;">
          <div style="font-size:2rem; margin-bottom:0.5rem;">📦</div>
          <h3 style="font-size:1.1rem; font-weight:700;">No items found matching your filters.</h3>
          <p style="font-size:0.85rem; color:var(--text-secondary);">Try clearing your search query or choosing another category.</p>
        </div>
      `;
      return;
    }

    productsGrid.innerHTML = items.map(p => {
      const stock = shop?.inventory?.[p.id] ?? 0;
      const inStock = stock > 0;
      const canBookItem = inStock && !categoryReached && !limits.isRestricted;

      let btnLabel = "Book Token";
      if (limits.isRestricted) btnLabel = "Account Restricted";
      else if (!inStock) btnLabel = "Out of Stock";
      else if (categoryReached) btnLabel = `${selectedCategory} Limit Reached`;

      return `
        <div class="product-card" style="background:#ffffff; border:1px solid #e2e8f0; border-radius:12px; padding:1.25rem; display:flex; flex-direction:column; justify-content:space-between; box-shadow:0 2px 4px rgba(0,0,0,0.02);">
          <div>
            <div class="flex justify-between items-start">
              <span class="badge ${p.type === 'HOT' ? 'badge-warning' : 'badge-success'}">
                ${p.type === 'HOT' ? '🔥 HOT Spirit' : '🍺 NON-HOT Mild'}
              </span>
              <span class="mono-text" style="font-size:0.75rem; color:var(--text-muted);">${p.id}</span>
            </div>

            <div style="margin:1rem 0; text-align:center; background:#f8fafc; padding:1.25rem; border-radius:8px;">
              <span style="font-size:2.6rem;">${p.type === 'HOT' ? '🥃' : '🍺'}</span>
            </div>

            <div style="font-size:0.75rem; font-weight:700; color:var(--text-muted); text-transform:uppercase;">
              ${p.brand} • ${p.category}
            </div>
            <h3 style="font-size:1.05rem; font-weight:800; color:#0f172a; margin:0.25rem 0 0.5rem; line-height:1.3;">
              ${p.name}
            </h3>

            <div class="flex justify-between items-center" style="font-size:0.85rem; margin-bottom:0.75rem;">
              <span style="color:var(--text-secondary);">${p.size}</span>
              <span style="font-size:1.2rem; font-weight:900; color:#0f5a34;">₹${p.price}</span>
            </div>

            <div class="flex justify-between items-center" style="font-size:0.75rem; background:#f0fdf4; padding:0.4rem 0.6rem; border-radius:6px; margin-bottom:1rem;">
              <span style="color:#0f5a34; font-weight:600;">Outlet Stock:</span>
              <strong style="color:${inStock ? '#16a34a' : '#dc2626'};">${stock} unit${stock === 1 ? '' : 's'} available</strong>
            </div>
          </div>

          <button 
            class="${canBookItem ? 'btn-primary' : 'btn-outline'}" 
            style="width:100%; padding:0.6rem; font-size:0.85rem; font-weight:700;"
            ${!canBookItem ? 'disabled' : ''}
            onclick="initiateBooking('${p.id}')">
            ${btnLabel}
          </button>
        </div>
      `;
    }).join('');
  }

  window.initiateBooking = (productId) => {
    store.state.selectedProductId = productId;
    store.save();
    window.location.href = `booking.html?shopId=${activeShopId}&productId=${productId}`;
  };

  // Initial renders
  updateCategoryButtons();
  renderSubcategories();
  renderProducts();
});
