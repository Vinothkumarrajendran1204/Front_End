/**
 * UNAKKU AVLOTHA LIMIT - Central Reactive State Store & Database Model
 * Supports LocalStorage persistence, seed personas, dynamic cross-category limits,
 * audit logging, and weekly reset simulation.
 */

const STORAGE_KEY = 'TN_UAL_DATABASE_STATE_V1';

// Standard 7-table conceptual database schema initial seed
const INITIAL_DATABASE = {
  currentWeek: '2026-W37',
  
  // 1. Users Table
  users: [
    {
      user_id: 'TN-RES-1001',
      name: 'M. Vijay',
      mobile: '9840123456',
      date_of_birth: '1992-06-15',
      age: 34,
      verification_status: 'Verified',
      account_status: 'Active',
      role: 'user',
      masked_aadhaar: 'XXXX-XXXX-7812',
      address: 'Anna Nagar, Chennai, Tamil Nadu'
    },
    {
      user_id: 'TN-RES-1002',
      name: 'K. Rahul (Under 18)',
      mobile: '9840998877',
      date_of_birth: '2009-08-20',
      age: 17, // Trigger full-screen age restriction block
      verification_status: 'Verified',
      account_status: 'Active',
      role: 'user',
      masked_aadhaar: 'XXXX-XXXX-4590',
      address: 'T. Nagar, Chennai, Tamil Nadu'
    },
    {
      user_id: 'TN-RES-1003',
      name: 'R. Karthik (Restricted)',
      mobile: '9840554433',
      date_of_birth: '1996-03-10',
      age: 30,
      verification_status: 'Verified',
      account_status: 'Temporarily Restricted', // Trigger legal restriction alert
      role: 'user',
      masked_aadhaar: 'XXXX-XXXX-6621',
      address: 'Gandhipuram, Coimbatore, Tamil Nadu'
    },
    {
      user_id: 'TN-ADM-9001',
      name: 'Officer K. Rathinavel',
      mobile: '9840001122',
      date_of_birth: '1980-01-01',
      age: 46,
      verification_status: 'Verified',
      account_status: 'Active',
      role: 'admin',
      pin: '8899',
      designation: 'Enforcement Superintendent, Prohibition Wing'
    }
  ],

  // 2. Global Base Category Limits Configuration
  product_rules: {
    hard_liquor_max: 1,
    beer_max: 2,
    wine_max: 2,
    normal_tobacco_base: 5,
    normal_tobacco_alcohol_reduced: 3,
    alt_tobacco_base: 10,
    alt_tobacco_alcohol_reduced: 6
  },

  // 3. Alcohol_Limits Table (Per-user active week usage)
  alcohol_limits: {
    'TN-RES-1001': {
      user_id: 'TN-RES-1001',
      week_start: '2026-W37',
      hard_liquor_limit: 1,
      beer_limit: 2,
      wine_limit: 2,
      hard_liquor_used: 0,
      beer_used: 0,
      wine_used: 0
    },
    'TN-RES-1002': {
      user_id: 'TN-RES-1002',
      week_start: '2026-W37',
      hard_liquor_limit: 1,
      beer_limit: 2,
      wine_limit: 2,
      hard_liquor_used: 0,
      beer_used: 0,
      wine_used: 0
    },
    'TN-RES-1003': {
      user_id: 'TN-RES-1003',
      week_start: '2026-W37',
      hard_liquor_limit: 1,
      beer_limit: 2,
      wine_limit: 2,
      hard_liquor_used: 1,
      beer_used: 1,
      wine_used: 0
    }
  },

  // 4. Tobacco_Limits Table (Per-user active week usage)
  tobacco_limits: {
    'TN-RES-1001': {
      user_id: 'TN-RES-1001',
      week_start: '2026-W37',
      normal_used: 0,
      alternative_used: 0
    },
    'TN-RES-1002': {
      user_id: 'TN-RES-1002',
      week_start: '2026-W37',
      normal_used: 0,
      alternative_used: 0
    },
    'TN-RES-1003': {
      user_id: 'TN-RES-1003',
      week_start: '2026-W37',
      normal_used: 2,
      alternative_used: 1
    }
  },

  // 5. Purchases Table (Historical ledger, never deleted on reset)
  purchases: [
    {
      purchase_id: 'PUR-2026-9041',
      user_id: 'TN-RES-1003',
      category: 'Hard Liquor',
      product_name: 'Standard IMFL Unit (750ml)',
      quantity: 1,
      date: '2026-09-10',
      time: '10:15 AM',
      status: 'Completed',
      slot_id: 'SLOT-101',
      week_code: '2026-W37'
    },
    {
      purchase_id: 'PUR-2026-8812',
      user_id: 'TN-RES-1003',
      category: 'Normal Cigarette',
      product_name: 'Regulated Tobacco Pack (Single Pack)',
      quantity: 2,
      date: '2026-09-11',
      time: '04:15 PM',
      status: 'Completed',
      slot_id: 'SLOT-104',
      week_code: '2026-W37'
    },
    {
      purchase_id: 'PUR-2026-7731',
      user_id: 'TN-RES-1001',
      category: 'Beer',
      product_name: 'Mild Lager Unit (650ml)',
      quantity: 1,
      date: '2026-09-04',
      time: '11:15 AM',
      status: 'Completed',
      slot_id: 'SLOT-103',
      week_code: '2026-W36' // Previous cycle
    }
  ],

  // 6. Time_Slots Table
  time_slots: [
    { slot_id: 'SLOT-101', start_time: '10:00 AM', end_time: '10:30 AM', capacity: 30, booked: 14, active: true },
    { slot_id: 'SLOT-102', start_time: '10:30 AM', end_time: '11:00 AM', capacity: 30, booked: 21, active: true },
    { slot_id: 'SLOT-103', start_time: '11:00 AM', end_time: '11:30 AM', capacity: 30, booked: 25, active: true },
    { slot_id: 'SLOT-104', start_time: '04:00 PM', end_time: '04:30 PM', capacity: 30, booked: 18, active: true },
    { slot_id: 'SLOT-105', start_time: '04:30 PM', end_time: '05:00 PM', capacity: 30, booked: 11, active: true }
  ],

  // 7. Restrictions Table (Legal restriction records)
  restrictions: [
    {
      restriction_id: 'REST-2026-042',
      user_id: 'TN-RES-1003',
      case_reference: 'CR-TN-2026-9812',
      restriction_type: 'Driving-related restriction',
      start_date: '2026-09-01',
      end_date: '2026-12-01',
      status: 'Active',
      authorized_officer: 'Insp. M. Selvam, Traffic North',
      remarks: 'Court order under Section 185 Motor Vehicles Act preventive enforcement.'
    }
  ],

  // 8. Audit_Logs Table
  audit_logs: [
    {
      log_id: 'AUD-2026-001',
      actor_id: 'TN-ADM-9001',
      action: 'Enforcement restriction RECORDED for internal User TN-RES-1003',
      timestamp: '2026-09-01 10:30:00'
    },
    {
      log_id: 'AUD-2026-002',
      actor_id: 'SYSTEM',
      action: 'Weekly cycle initialized for 2026-W37',
      timestamp: '2026-09-07 00:00:00'
    }
  ],

  // Age restriction attempt telemetry
  blocked_age_attempts: 7
};

class StateStore {
  constructor() {
    this.data = this.loadState();
    this.currentUser = this.data.users.find(u => u.user_id === 'TN-RES-1001'); // Default to Standard Adult
    this.listeners = [];
  }

  loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('LocalStorage error, using defaults:', e);
    }
    return JSON.parse(JSON.stringify(INITIAL_DATABASE));
  }

  saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    } catch (e) {
      console.error('Failed to save state:', e);
    }
    this.notify();
  }

  resetToInitial() {
    this.data = JSON.parse(JSON.stringify(INITIAL_DATABASE));
    this.currentUser = this.data.users.find(u => u.user_id === 'TN-RES-1001');
    this.saveState();
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(fn => fn(this.data));
  }

  // --- User & Auth ---
  getCurrentUser() {
    return this.currentUser;
  }

  setCurrentUser(userId) {
    const user = this.data.users.find(u => u.user_id === userId);
    if (user) {
      this.currentUser = user;
      this.notify();
    }
    return user;
  }

  getUserById(userId) {
    return this.data.users.find(u => u.user_id === userId);
  }

  recordAgeBlockedAttempt(attemptDetails) {
    this.data.blocked_age_attempts = (this.data.blocked_age_attempts || 0) + 1;
    this.addAuditLog('SYSTEM', `Age verification failure: minor access attempted (${attemptDetails || 'Unknown'})`);
    this.saveState();
  }

  // --- Dynamic Quota Calculation ---
  hasUserPurchasedAlcoholThisWeek(userId) {
    const al = this.data.alcohol_limits[userId];
    if (!al) return false;
    return (al.hard_liquor_used > 0 || al.beer_used > 0 || al.wine_used > 0);
  }

  getAlcoholLimits(userId) {
    if (!this.data.alcohol_limits[userId]) {
      this.data.alcohol_limits[userId] = {
        user_id: userId,
        week_start: this.data.currentWeek,
        hard_liquor_limit: this.data.product_rules.hard_liquor_max,
        beer_limit: this.data.product_rules.beer_max,
        wine_limit: this.data.product_rules.wine_max,
        hard_liquor_used: 0,
        beer_used: 0,
        wine_used: 0
      };
    }
    const al = this.data.alcohol_limits[userId];
    const rules = this.data.product_rules;
    
    return {
      hardMax: rules.hard_liquor_max,
      beerMax: rules.beer_max,
      wineMax: rules.wine_max,
      hardUsed: al.hard_liquor_used,
      beerUsed: al.beer_used,
      wineUsed: al.wine_used,
      hardRemaining: Math.max(0, rules.hard_liquor_max - al.hard_liquor_used),
      beerRemaining: Math.max(0, rules.beer_max - al.beer_used),
      wineRemaining: Math.max(0, rules.wine_max - al.wine_used)
    };
  }

  /**
   * Tobacco dynamic logic:
   * If alcohol was purchased during current week:
   *   Normal Cigarette -> Max 3
   *   Alternative Category -> Max 6
   * If alcohol was NOT purchased:
   *   Normal Cigarette -> Max 5
   *   Alternative Category -> Max 10
   */
  getTobaccoLimits(userId) {
    if (!this.data.tobacco_limits[userId]) {
      this.data.tobacco_limits[userId] = {
        user_id: userId,
        week_start: this.data.currentWeek,
        normal_used: 0,
        alternative_used: 0
      };
    }
    const tl = this.data.tobacco_limits[userId];
    const rules = this.data.product_rules;
    const hasAlcohol = this.hasUserPurchasedAlcoholThisWeek(userId);

    const normalMax = hasAlcohol ? rules.normal_tobacco_alcohol_reduced : rules.normal_tobacco_base;
    const altMax = hasAlcohol ? rules.alt_tobacco_alcohol_reduced : rules.alt_tobacco_base;

    return {
      isAlcoholPurchased: hasAlcohol,
      normalMax,
      altMax,
      normalUsed: tl.normal_used,
      altUsed: tl.alternative_used,
      normalRemaining: Math.max(0, normalMax - tl.normal_used),
      altRemaining: Math.max(0, altMax - tl.alternative_used)
    };
  }

  // --- Time Slot & Booking ---
  getTimeSlots() {
    return this.data.time_slots;
  }

  bookPurchase(userId, category, quantity, slotId, date) {
    const user = this.getUserById(userId);
    if (!user) throw new Error('User record not found.');

    const slot = this.data.time_slots.find(s => s.slot_id === slotId);
    if (!slot) throw new Error('Selected time slot is invalid.');
    if (slot.booked >= slot.capacity) throw new Error('Selected time slot is fully booked.');

    // Deduct quota
    if (category === 'Hard Liquor') {
      this.data.alcohol_limits[userId].hard_liquor_used += quantity;
    } else if (category === 'Beer') {
      this.data.alcohol_limits[userId].beer_used += quantity;
    } else if (category === 'Wine') {
      this.data.alcohol_limits[userId].wine_used += quantity;
    } else if (category === 'Normal Cigarette') {
      this.data.tobacco_limits[userId].normal_used += quantity;
    } else if (category === 'Alternative Category') {
      this.data.tobacco_limits[userId].alternative_used += quantity;
    }

    // Increment slot booking
    slot.booked += 1;

    // Create Purchase Record
    const purchaseId = `PUR-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newPurchase = {
      purchase_id: purchaseId,
      user_id: userId,
      category: category,
      product_name: `${category} Token Allocation`,
      quantity: quantity,
      date: date || new Date().toISOString().split('T')[0],
      time: `${slot.start_time} – ${slot.end_time}`,
      status: 'Confirmed',
      slot_id: slotId,
      week_code: this.data.currentWeek
    };

    this.data.purchases.unshift(newPurchase);
    this.addAuditLog(userId, `Booked purchase token ${purchaseId} for ${category} (${quantity} unit) at ${slot.start_time}`);

    this.saveState();
    return newPurchase;
  }

  cancelPurchase(purchaseId) {
    const purchase = this.data.purchases.find(p => p.purchase_id === purchaseId);
    if (!purchase) throw new Error('Booking not found');
    if (purchase.status !== 'Confirmed') throw new Error('Only active confirmed bookings can be cancelled');

    purchase.status = 'Cancelled';

    // Restore user quota
    const userId = purchase.user_id;
    if (purchase.category === 'Hard Liquor') {
      this.data.alcohol_limits[userId].hard_liquor_used = Math.max(0, this.data.alcohol_limits[userId].hard_liquor_used - purchase.quantity);
    } else if (purchase.category === 'Beer') {
      this.data.alcohol_limits[userId].beer_used = Math.max(0, this.data.alcohol_limits[userId].beer_used - purchase.quantity);
    } else if (purchase.category === 'Wine') {
      this.data.alcohol_limits[userId].wine_used = Math.max(0, this.data.alcohol_limits[userId].wine_used - purchase.quantity);
    } else if (purchase.category === 'Normal Cigarette') {
      this.data.tobacco_limits[userId].normal_used = Math.max(0, this.data.tobacco_limits[userId].normal_used - purchase.quantity);
    } else if (purchase.category === 'Alternative Category') {
      this.data.tobacco_limits[userId].alternative_used = Math.max(0, this.data.tobacco_limits[userId].alternative_used - purchase.quantity);
    }

    // Restore slot capacity
    const slot = this.data.time_slots.find(s => s.slot_id === purchase.slot_id);
    if (slot && slot.booked > 0) {
      slot.booked -= 1;
    }

    this.addAuditLog(userId, `Cancelled booking token ${purchaseId}. Weekly quota restored.`);
    this.saveState();
    return purchase;
  }

  // --- Weekly Reset Simulation ---
  simulateWeeklyReset() {
    const currentWeekNum = parseInt(this.data.currentWeek.split('-W')[1] || '37', 10);
    const nextWeekNum = currentWeekNum + 1;
    this.data.currentWeek = `2026-W${nextWeekNum}`;

    // Reset used counters across all users
    Object.keys(this.data.alcohol_limits).forEach(uid => {
      const al = this.data.alcohol_limits[uid];
      al.hard_liquor_used = 0;
      al.beer_used = 0;
      al.wine_used = 0;
      al.week_start = this.data.currentWeek;
    });

    Object.keys(this.data.tobacco_limits).forEach(uid => {
      const tl = this.data.tobacco_limits[uid];
      tl.normal_used = 0;
      tl.alternative_used = 0;
      tl.week_start = this.data.currentWeek;
    });

    // Reset slot bookings for the new cycle
    this.data.time_slots.forEach(s => {
      s.booked = Math.floor(Math.random() * 5); // Realistic low seed
    });

    this.addAuditLog('SYSTEM', `Weekly cycle reset triggered. New cycle active: ${this.data.currentWeek}. Quotas refreshed, transaction history preserved.`);
    this.saveState();
    return this.data.currentWeek;
  }

  // --- Legal Restriction Management ---
  hasActiveLegalRestriction(userId) {
    const activeRest = this.data.restrictions.find(r => r.user_id === userId && r.status === 'Active');
    return !!activeRest;
  }

  getUserRestrictionDetails(userId) {
    return this.data.restrictions.filter(r => r.user_id === userId);
  }

  addRestriction(data) {
    const newRest = {
      restriction_id: `REST-2026-${Math.floor(100 + Math.random() * 900)}`,
      user_id: data.user_id,
      case_reference: data.case_reference || `CR-TN-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      restriction_type: data.restriction_type || 'Court/authority restriction',
      start_date: data.start_date || new Date().toISOString().split('T')[0],
      end_date: data.end_date || '2026-12-31',
      status: 'Active',
      authorized_officer: data.authorized_officer || 'Admin Officer',
      remarks: data.remarks || 'Restricted under competent public welfare direction.'
    };

    this.data.restrictions.unshift(newRest);

    // Update user account status
    const user = this.getUserById(data.user_id);
    if (user) {
      user.account_status = 'Temporarily Restricted';
    }

    this.addAuditLog('TN-ADM-9001', `Recorded legal restriction ${newRest.restriction_id} for User ${data.user_id}`);
    this.saveState();
    return newRest;
  }

  revokeRestriction(restrictionId) {
    const rest = this.data.restrictions.find(r => r.restriction_id === restrictionId);
    if (!rest) throw new Error('Restriction record not found');

    rest.status = 'Revoked';
    
    // Check if user has any other active restrictions
    const userId = rest.user_id;
    const remainingActive = this.data.restrictions.filter(r => r.user_id === userId && r.status === 'Active');
    if (remainingActive.length === 0) {
      const user = this.getUserById(userId);
      if (user) {
        user.account_status = 'Active';
      }
    }

    this.addAuditLog('TN-ADM-9001', `Revoked legal restriction ${restrictionId} for User ${userId}`);
    this.saveState();
    return rest;
  }

  // --- Audit Logging ---
  addAuditLog(actorId, action) {
    const newLog = {
      log_id: `AUD-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      actor_id: actorId,
      action: action,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };
    this.data.audit_logs.unshift(newLog);
  }

  // --- Admin Settings Updates ---
  updateProductRules(newRules) {
    this.data.product_rules = { ...this.data.product_rules, ...newRules };
    this.addAuditLog('TN-ADM-9001', 'Updated global product quota configuration rules');
    this.saveState();
  }

  toggleUserStatus(userId) {
    const user = this.getUserById(userId);
    if (!user) return;
    user.account_status = user.account_status === 'Active' ? 'Temporarily Restricted' : 'Active';
    this.addAuditLog('TN-ADM-9001', `Toggled account status for ${userId} to ${user.account_status}`);
    this.saveState();
  }
}

// Global Singleton Instance
window.ualState = new StateStore();
