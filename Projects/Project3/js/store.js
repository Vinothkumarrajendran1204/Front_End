/**
 * Tamil Nadu TASMAC Smart Booking & Limit Management System
 * Central Reactive State Store & Business Logic Engine
 */

class TasmacStore {
  constructor() {
    this.STORAGE_KEY = "TASMAC_SMART_PORTAL_STATE_V1";
    this.listeners = [];
    this.loadState();
  }

  loadState() {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    let initial = null;
    if (saved) {
      try {
        initial = JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse saved TASMAC state, resetting.", e);
      }
    }

    const data = window.TASMAC_DATA || {};

    this.state = {
      currentUser: initial?.currentUser || null,
      isAdmin: initial?.isAdmin || false,
      adminUser: data.adminAccount || null,
      selectedDistrict: initial?.selectedDistrict || "Chennai",
      selectedCity: initial?.selectedCity || "All",
      selectedShopId: initial?.selectedShopId || null,
      searchQuery: "",
      selectedCategory: "All",
      selectedBrand: "All",
      maxPrice: 2000,
      availabilityFilter: "all", // "all" | "in-stock"
      activeView: "home", // "home" | "shops" | "shop-detail" | "limits" | "my-bookings" | "history" | "admin"
      
      // Core dynamic datasets
      districts: data.districts || [],
      shops: initial?.shops || JSON.parse(JSON.stringify(data.shops || [])),
      products: initial?.products || JSON.parse(JSON.stringify(data.products || [])),
      users: initial?.users || JSON.parse(JSON.stringify(data.demoUsers || [])),
      bookings: initial?.bookings || JSON.parse(JSON.stringify(data.initialBookings || [])),
      purchases: initial?.purchases || JSON.parse(JSON.stringify(data.initialPurchases || [])),
      legalRestrictions: initial?.legalRestrictions || JSON.parse(JSON.stringify(data.legalRestrictions || []))
    };

    // If no currentUser is set, default to first demo user for smooth testing experience
    if (!this.state.currentUser && !this.state.isAdmin) {
      this.state.currentUser = this.state.users[0];
    }
  }

  saveState() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify({
        currentUser: this.state.currentUser,
        isAdmin: this.state.isAdmin,
        selectedDistrict: this.state.selectedDistrict,
        selectedCity: this.state.selectedCity,
        selectedShopId: this.state.selectedShopId,
        shops: this.state.shops,
        products: this.state.products,
        users: this.state.users,
        bookings: this.state.bookings,
        purchases: this.state.purchases,
        legalRestrictions: this.state.legalRestrictions
      }));
    } catch (e) {
      console.warn("Storage save failed:", e);
    }
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.saveState();
    this.listeners.forEach(cb => {
      try {
        cb(this.state);
      } catch (e) {
        console.error("Listener error:", e);
      }
    });
  }

  getState() {
    return this.state;
  }

  // Navigation
  setView(view, shopId = null) {
    this.state.activeView = view;
    if (shopId) {
      this.state.selectedShopId = shopId;
    }
    this.notify();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Location filter
  setLocation(district, city = "All") {
    this.state.selectedDistrict = district;
    this.state.selectedCity = city;
    this.notify();
  }

  // User Auth & Persona switching
  loginUser(aadhaarNumber) {
    const cleanNum = aadhaarNumber.replace(/\s+/g, "");
    let user = this.state.users.find(u => u.aadhaarNumber === cleanNum);
    
    if (!user) {
      // Auto-register new mock citizen
      const masked = "XXXX-XXXX-" + cleanNum.slice(-4);
      user = {
        aadhaarNumber: cleanNum,
        name: "Citizen " + cleanNum.slice(-4),
        phone: "+91 98400 " + cleanNum.slice(-5),
        phoneMasked: "+91 98*** **" + cleanNum.slice(-3),
        district: this.state.selectedDistrict,
        city: this.state.selectedCity !== "All" ? this.state.selectedCity : "Central",
        isRestricted: false,
        restrictionDetails: null,
        weeklyQuota: {
          alcoholUsedUnits: 0,
          maxAlcoholUnits: 1.0,
          alcoholResetDate: "2026-09-14T00:00:00+05:30",
          highNicotineUsed: 0,
          lowNicotineUsed: 0
        },
        personaBadge: "New Registered Citizen",
        personaDescription: "Newly registered citizen via Aadhaar OTP."
      };
      this.state.users.push(user);
    }

    this.state.currentUser = user;
    this.state.isAdmin = false;
    this.notify();
    return user;
  }

  loginAdmin(pin) {
    if (pin === "8899" || pin === "ADMIN") {
      this.state.isAdmin = true;
      this.state.currentUser = null;
      this.state.activeView = "admin";
      this.notify();
      return true;
    }
    return false;
  }

  logout() {
    this.state.currentUser = null;
    this.state.isAdmin = false;
    this.state.activeView = "home";
    this.notify();
  }

  switchPersona(aadhaarNumber) {
    const user = this.state.users.find(u => u.aadhaarNumber === aadhaarNumber);
    if (user) {
      this.state.currentUser = user;
      this.state.isAdmin = false;
      this.notify();
    }
  }

  // Limit & Quota Calculations
  getUserLimits(user = this.state.currentUser) {
    if (!user) {
      return {
        isRestricted: false,
        alcohol: { max: 1.0, used: 0, remaining: 1.0, percent: 0, isReached: false, resetDate: "2026-09-14T00:00:00+05:30" },
        cigarettes: {
          hasAlcoholUsed: false,
          high: { max: 5, used: 0, remaining: 5, percent: 0, isReached: false },
          low: { max: 10, used: 0, remaining: 10, percent: 0, isReached: false }
        }
      };
    }

    const quota = user.weeklyQuota || {
      alcoholUsedUnits: 0,
      maxAlcoholUnits: 1.0,
      highNicotineUsed: 0,
      lowNicotineUsed: 0,
      alcoholResetDate: "2026-09-14T00:00:00+05:30"
    };

    const isRestricted = !!user.isRestricted;
    const maxAlcohol = isRestricted ? 0 : 1.0;
    const alcoholUsed = isRestricted ? 0 : quota.alcoholUsedUnits;
    const alcoholRemaining = isRestricted ? 0 : Math.max(0, Math.round((maxAlcohol - alcoholUsed) * 10) / 10);
    const alcoholPercent = maxAlcohol > 0 ? Math.min(100, Math.round((alcoholUsed / maxAlcohol) * 100)) : 100;
    const isAlcoholReached = isRestricted || alcoholRemaining <= 0;

    // Cigarette Quota Rules:
    // If user has NOT used alcohol (used === 0): High: 5, Low: 10
    // If user HAS used alcohol (used > 0): High: 3, Low: 6
    const hasAlcoholUsed = alcoholUsed > 0;
    const maxHigh = hasAlcoholUsed ? 3 : 5;
    const maxLow = hasAlcoholUsed ? 6 : 10;

    const highUsed = Math.min(maxHigh, quota.highNicotineUsed || 0);
    const lowUsed = Math.min(maxLow, quota.lowNicotineUsed || 0);

    const highRemaining = Math.max(0, maxHigh - highUsed);
    const lowRemaining = Math.max(0, maxLow - lowUsed);

    const highPercent = Math.min(100, Math.round((highUsed / maxHigh) * 100));
    const lowPercent = Math.min(100, Math.round((lowUsed / maxLow) * 100));

    return {
      isRestricted,
      restrictionDetails: user.restrictionDetails,
      alcohol: {
        max: maxAlcohol,
        used: alcoholUsed,
        remaining: alcoholRemaining,
        percent: alcoholPercent,
        isReached: isAlcoholReached,
        resetDate: quota.alcoholResetDate || "2026-09-14T00:00:00+05:30"
      },
      cigarettes: {
        hasAlcoholUsed,
        high: {
          max: maxHigh,
          used: highUsed,
          remaining: highRemaining,
          percent: highPercent,
          isReached: highRemaining <= 0
        },
        low: {
          max: maxLow,
          used: lowUsed,
          remaining: lowRemaining,
          percent: lowPercent,
          isReached: lowRemaining <= 0
        }
      }
    };
  }

  // Can user book this product?
  canBookProduct(productId, quantity = 1, user = this.state.currentUser) {
    if (!user) return { allowed: false, reason: "Please log in to book products." };
    if (user.isRestricted) {
      return { 
        allowed: false, 
        reason: "Account Restricted: Legal case recorded under Motor Vehicles Act / IPC. Alcohol booking is suspended by order." 
      };
    }

    const product = this.state.products.find(p => p.id === productId);
    if (!product) return { allowed: false, reason: "Product not found." };

    const limits = this.getUserLimits(user);

    if (product.category === "Hard Liquor") {
      if (limits.alcohol.isReached) {
        return { 
          allowed: false, 
          reason: "Weekly alcohol limit reached. You can purchase again after the limit resets." 
        };
      }
      if (quantity * (product.quotaCost || 1.0) > limits.alcohol.remaining) {
        return {
          allowed: false,
          reason: `Requested quantity exceeds your remaining alcohol quota (${limits.alcohol.remaining} unit remaining). Maximum 1 full bottle per week.`
        };
      }
    } else if (product.category === "Beer" || product.category === "Wine") {
      if (limits.alcohol.isReached) {
        return { 
          allowed: false, 
          reason: "Weekly alcohol limit reached. You can purchase again after the limit resets." 
        };
      }
      const costPerItem = product.quotaCost || 0.5;
      if (quantity * costPerItem > limits.alcohol.remaining) {
        const bottlesLeft = Math.floor(limits.alcohol.remaining / costPerItem);
        return {
          allowed: false,
          reason: `Exceeds remaining quota. You have quota for ${bottlesLeft} more ${product.category} bottle(s) this week.`
        };
      }
    } else if (product.category === "Cigarettes") {
      const isHigh = product.nicotineType === "high";
      const cigLimits = isHigh ? limits.cigarettes.high : limits.cigarettes.low;
      if (cigLimits.isReached) {
        return {
          allowed: false,
          reason: `Weekly ${isHigh ? "High" : "Low"} Nicotine cigarette quota reached (${cigLimits.max} packs max per week).`
        };
      }
      if (quantity > cigLimits.remaining) {
        return {
          allowed: false,
          reason: `You can only book up to ${cigLimits.remaining} pack(s) of this cigarette category this week.`
        };
      }
    }

    return { allowed: true, reason: "" };
  }

  // Create Booking
  createBooking({ shopId, productId, quantity, date, timeSlot }) {
    if (!this.state.currentUser) {
      throw new Error("Citizen authentication required.");
    }

    const check = this.canBookProduct(productId, quantity);
    if (!check.allowed) {
      throw new Error(check.reason);
    }

    const shop = this.state.shops.find(s => s.id === shopId);
    if (!shop) throw new Error("Selected shop not found.");

    const product = this.state.products.find(p => p.id === productId);
    if (!product) throw new Error("Selected product not found.");

    // Check inventory
    const currentStock = shop.inventory?.[productId] ?? 0;
    if (currentStock < quantity) {
      throw new Error(`Insufficient stock at this shop. Only ${currentStock} item(s) available.`);
    }

    // Deduct stock
    shop.inventory[productId] = currentStock - quantity;

    // Deduct user quota
    const user = this.state.users.find(u => u.aadhaarNumber === this.state.currentUser.aadhaarNumber);
    if (user) {
      if (product.category === "Hard Liquor") {
        user.weeklyQuota.alcoholUsedUnits += (product.quotaCost || 1.0) * quantity;
      } else if (product.category === "Beer" || product.category === "Wine") {
        user.weeklyQuota.alcoholUsedUnits += (product.quotaCost || 0.5) * quantity;
      } else if (product.category === "Cigarettes") {
        if (product.nicotineType === "high") {
          user.weeklyQuota.highNicotineUsed = (user.weeklyQuota.highNicotineUsed || 0) + quantity;
        } else {
          user.weeklyQuota.lowNicotineUsed = (user.weeklyQuota.lowNicotineUsed || 0) + quantity;
        }
      }
      // Update currentUser session reference
      this.state.currentUser = user;
    }

    // Generate unique ID
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const distCode = shop.district.substring(0, 3).toUpperCase();
    const bookingId = `TASMAC-2026-${distCode}-${randomSuffix}`;

    const qrData = `TASMAC-TOKEN|ID:${bookingId}|SHOP:${shop.id}|CITIZEN:${user.aadhaarNumber.slice(-4)}|PROD:${product.name}|QTY:${quantity}|DATE:${date}|SLOT:${timeSlot}`;

    const newBooking = {
      id: bookingId,
      userId: user.aadhaarNumber,
      userName: user.name,
      userAadhaarMasked: "XXXX-XXXX-" + user.aadhaarNumber.slice(-4),
      shopId: shop.id,
      shopName: shop.name,
      shopAddress: shop.address,
      shopPhone: shop.phone,
      productId: product.id,
      productName: product.name,
      productCategory: product.category,
      quantity: quantity,
      size: product.size,
      unitPrice: product.price,
      totalAmount: product.price * quantity,
      date: date,
      timeSlot: timeSlot,
      status: "Confirmed", // Confirmed, Ready for Collection, Collected, Cancelled, Expired
      qrData: qrData,
      createdAt: new Date().toISOString(),
      notes: "Customer must visit the selected shop during the declared time slot to collect the order. Valid Govt photo ID required."
    };

    this.state.bookings.unshift(newBooking);
    this.notify();
    return newBooking;
  }

  // Cancel Booking (Citizen initiated)
  cancelBooking(bookingId) {
    const booking = this.state.bookings.find(b => b.id === bookingId);
    if (!booking) throw new Error("Booking not found");
    if (booking.status !== "Confirmed" && booking.status !== "Ready for Collection") {
      throw new Error("Only active bookings can be cancelled.");
    }

    booking.status = "Cancelled";
    booking.cancelledAt = new Date().toISOString();

    // Restock
    const shop = this.state.shops.find(s => s.id === booking.shopId);
    if (shop && shop.inventory && shop.inventory[booking.productId] !== undefined) {
      shop.inventory[booking.productId] += booking.quantity;
    }

    // Refund quota
    const user = this.state.users.find(u => u.aadhaarNumber === booking.userId);
    if (user && user.weeklyQuota) {
      const product = this.state.products.find(p => p.id === booking.productId);
      if (product) {
        if (product.category === "Hard Liquor") {
          user.weeklyQuota.alcoholUsedUnits = Math.max(0, user.weeklyQuota.alcoholUsedUnits - (product.quotaCost || 1.0) * booking.quantity);
        } else if (product.category === "Beer" || product.category === "Wine") {
          user.weeklyQuota.alcoholUsedUnits = Math.max(0, user.weeklyQuota.alcoholUsedUnits - (product.quotaCost || 0.5) * booking.quantity);
        } else if (product.category === "Cigarettes") {
          if (product.nicotineType === "high") {
            user.weeklyQuota.highNicotineUsed = Math.max(0, user.weeklyQuota.highNicotineUsed - booking.quantity);
          } else {
            user.weeklyQuota.lowNicotineUsed = Math.max(0, user.weeklyQuota.lowNicotineUsed - booking.quantity);
          }
        }
      }
      if (this.state.currentUser?.aadhaarNumber === user.aadhaarNumber) {
        this.state.currentUser = user;
      }
    }

    this.notify();
    return true;
  }

  // Admin Updates Booking Status
  updateBookingStatus(bookingId, newStatus) {
    const booking = this.state.bookings.find(b => b.id === bookingId);
    if (!booking) throw new Error("Booking not found");

    const oldStatus = booking.status;
    booking.status = newStatus;

    if (newStatus === "Collected" && oldStatus !== "Collected") {
      booking.collectedAt = new Date().toISOString();
      // Record purchase in secure purchase history
      const newPurchase = {
        id: "PUR-2026-" + Math.floor(1000 + Math.random() * 9000),
        bookingId: booking.id,
        userId: booking.userId,
        shopId: booking.shopId,
        shopName: booking.shopName,
        productName: booking.productName,
        category: booking.productCategory,
        quantity: booking.quantity,
        amount: booking.totalAmount,
        date: new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }),
        status: "Completed",
        paymentMethod: "TASMAC Smart Token / POS"
      };
      this.state.purchases.unshift(newPurchase);
    }

    this.notify();
    return booking;
  }

  // Account Restriction Controls (Admin Only)
  toggleUserRestriction(aadhaarNumber, isRestricted, restrictionData = null) {
    const user = this.state.users.find(u => u.aadhaarNumber === aadhaarNumber);
    if (!user) throw new Error("User not found");

    user.isRestricted = isRestricted;
    if (isRestricted) {
      user.restrictionDetails = restrictionData || {
        caseNumber: "TN-POL-2026-DUI-" + Math.floor(1000 + Math.random() * 9000),
        policeStation: "Chennai Traffic Investigation Wing (TIW)",
        offenceType: "Drunk Driving (Sec 185 Motor Vehicles Act)",
        bloodAlcoholLevel: "92 mg / 100 ml",
        imposedDate: new Date().toISOString().split("T")[0],
        reviewDate: "2026-12-31",
        sanctionAuthority: "Regional Transport Office & TASMAC Prohibition Wing",
        statusNote: "License suspended. Mandatory alcohol counseling pending.",
        canAppeal: true
      };
      // Record in legal restrictions log
      const existing = this.state.legalRestrictions.find(r => r.aadhaarNumber === aadhaarNumber);
      if (!existing) {
        this.state.legalRestrictions.unshift({
          caseId: "LEG-2026-" + Math.floor(100 + Math.random() * 900),
          userAadhaarMasked: "XXXX-XXXX-" + aadhaarNumber.slice(-4),
          aadhaarNumber: aadhaarNumber,
          citizenName: user.name,
          offence: user.restrictionDetails.offenceType,
          caseNumber: user.restrictionDetails.caseNumber,
          authority: user.restrictionDetails.policeStation,
          imposedDate: user.restrictionDetails.imposedDate,
          expiryDate: user.restrictionDetails.reviewDate,
          status: "Active",
          severity: "High",
          remarks: user.restrictionDetails.statusNote
        });
      }
    } else {
      user.restrictionDetails = null;
      // Mark resolved in legal restrictions log
      const rec = this.state.legalRestrictions.find(r => r.aadhaarNumber === aadhaarNumber);
      if (rec) {
        rec.status = "Cleared / Revoked";
      }
    }

    if (this.state.currentUser?.aadhaarNumber === aadhaarNumber) {
      this.state.currentUser = user;
    }

    this.notify();
    return user;
  }

  // Reset Quotas (Admin or weekly auto-reset)
  resetUserLimits(aadhaarNumber) {
    const user = this.state.users.find(u => u.aadhaarNumber === aadhaarNumber);
    if (!user) throw new Error("User not found");

    user.weeklyQuota = {
      alcoholUsedUnits: 0,
      maxAlcoholUnits: 1.0,
      alcoholResetDate: "2026-09-14T00:00:00+05:30",
      highNicotineUsed: 0,
      lowNicotineUsed: 0
    };

    if (this.state.currentUser?.aadhaarNumber === aadhaarNumber) {
      this.state.currentUser = user;
    }

    this.notify();
    return user;
  }

  // Admin Shop & Inventory Updates
  updateShopInventory(shopId, productId, newStock) {
    const shop = this.state.shops.find(s => s.id === shopId);
    if (!shop) throw new Error("Shop not found");
    if (!shop.inventory) shop.inventory = {};
    shop.inventory[productId] = Math.max(0, parseInt(newStock) || 0);
    this.notify();
  }

  toggleShopStatus(shopId) {
    const shop = this.state.shops.find(s => s.id === shopId);
    if (!shop) throw new Error("Shop not found");
    shop.isOpen = !shop.isOpen;
    this.notify();
  }

  // Filter Getters
  getFilteredShops() {
    return this.state.shops.filter(shop => {
      // District match
      if (this.state.selectedDistrict && shop.district.toLowerCase() !== this.state.selectedDistrict.toLowerCase()) {
        return false;
      }
      // City match
      if (this.state.selectedCity && this.state.selectedCity !== "All" && shop.city.toLowerCase() !== this.state.selectedCity.toLowerCase()) {
        return false;
      }
      // Text search
      if (this.state.searchQuery) {
        const q = this.state.searchQuery.toLowerCase();
        const matchName = shop.name.toLowerCase().includes(q);
        const matchId = shop.id.toLowerCase().includes(q);
        const matchAddr = shop.address.toLowerCase().includes(q);
        const matchCity = shop.city.toLowerCase().includes(q);
        if (!matchName && !matchId && !matchAddr && !matchCity) return false;
      }
      return true;
    });
  }

  getFilteredProducts(shopId = this.state.selectedShopId) {
    const shop = shopId ? this.state.shops.find(s => s.id === shopId) : null;

    return this.state.products.filter(product => {
      // Category match
      if (this.state.selectedCategory !== "All" && product.category !== this.state.selectedCategory) {
        return false;
      }
      // Brand match
      if (this.state.selectedBrand !== "All" && product.brand !== this.state.selectedBrand) {
        return false;
      }
      // Price filter
      if (product.price > this.state.maxPrice) {
        return false;
      }
      // Shop inventory check if a shop is selected
      if (shop) {
        const inStock = (shop.inventory?.[product.id] || 0);
        if (this.state.availabilityFilter === "in-stock" && inStock <= 0) {
          return false;
        }
      }
      // Search query
      if (this.state.searchQuery) {
        const q = this.state.searchQuery.toLowerCase();
        const matchName = product.name.toLowerCase().includes(q);
        const matchBrand = product.brand.toLowerCase().includes(q);
        const matchCategory = product.category.toLowerCase().includes(q);
        const matchSub = (product.subCategory || "").toLowerCase().includes(q);
        if (!matchName && !matchBrand && !matchCategory && !matchSub) return false;
      }
      return true;
    });
  }

  // Get current user's purchase history (Strictly private)
  getUserPurchases(userId = this.state.currentUser?.aadhaarNumber) {
    if (!userId && !this.state.isAdmin) return [];
    if (this.state.isAdmin) return this.state.purchases;
    return this.state.purchases.filter(p => p.userId === userId);
  }

  // Get current user's bookings
  getUserBookings(userId = this.state.currentUser?.aadhaarNumber) {
    if (!userId && !this.state.isAdmin) return [];
    if (this.state.isAdmin) return this.state.bookings;
    return this.state.bookings.filter(b => b.userId === userId);
  }
}

// Global store instance
window.tasmacStore = new TasmacStore();
