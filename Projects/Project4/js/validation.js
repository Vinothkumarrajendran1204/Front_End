/**
 * UNAKKU AVLOTHA LIMIT - 6-Point Purchase Validation Engine
 * Implements strict statutory and quota checks before any purchase/booking is authorized.
 */

const PurchaseValidator = {
  /**
   * Evaluates all 6 purchase rules sequentially.
   * Returns:
   * {
   *   passed: boolean,
   *   ruleResults: Array<{ id: number, label: string, passed: boolean, message: string }>,
   *   blockingError: string | null
   * }
   */
  validatePurchase({ userId, category, quantity, slotId, date }) {
    const store = window.ualState;
    const user = store.getUserById(userId);

    const checks = [
      { id: 1, label: 'Age Verification (18+)' },
      { id: 2, label: 'Identity Verification Status' },
      { id: 3, label: 'Administrative & Legal Restriction' },
      { id: 4, label: 'Weekly Quota Allowance' },
      { id: 5, label: 'Permitted Product Classification' },
      { id: 6, label: 'Time Slot Capacity & Validity' }
    ];

    const ruleResults = [];

    // Check 1: Is user 18+?
    if (!user || user.age < 18) {
      ruleResults.push({
        id: 1,
        label: checks[0].label,
        passed: false,
        message: 'Purchase blocked: Individual must be aged 18 or above subject to statutory regulations.'
      });
      return {
        passed: false,
        ruleResults,
        blockingError: 'Purchase blocked: Individual must be aged 18 or above subject to statutory regulations.'
      };
    }
    ruleResults.push({ id: 1, label: checks[0].label, passed: true, message: `Age verified (${user.age} years).` });

    // Check 2: Is account verified?
    if (user.verification_status !== 'Verified') {
      ruleResults.push({
        id: 2,
        label: checks[1].label,
        passed: false,
        message: 'Purchase blocked: Resident identity verification is pending or invalid.'
      });
      return {
        passed: false,
        ruleResults,
        blockingError: 'Purchase blocked: Resident identity verification is pending or invalid.'
      };
    }
    ruleResults.push({ id: 2, label: checks[1].label, passed: true, message: 'Identity verified with simulated credential.' });

    // Check 3: Is user currently restricted?
    const hasRestriction = store.hasActiveLegalRestriction(userId) || user.account_status !== 'Active';
    if (hasRestriction) {
      ruleResults.push({
        id: 3,
        label: checks[2].label,
        passed: false,
        message: 'Purchase blocked: Your purchase access is currently restricted. Please contact the appropriate authority for further information.'
      });
      return {
        passed: false,
        ruleResults,
        blockingError: 'Purchase blocked: Your purchase access is currently restricted. Please contact the appropriate authority for further information.'
      };
    }
    ruleResults.push({ id: 3, label: checks[2].label, passed: true, message: 'Account clear of legal or public safety restrictions.' });

    // Check 4: Has weekly limit been reached for this category?
    let remainingUnits = 0;
    const al = store.getAlcoholLimits(userId);
    const tl = store.getTobaccoLimits(userId);

    if (category === 'Hard Liquor') remainingUnits = al.hardRemaining;
    else if (category === 'Beer') remainingUnits = al.beerRemaining;
    else if (category === 'Wine') remainingUnits = al.wineRemaining;
    else if (category === 'Normal Cigarette') remainingUnits = tl.normalRemaining;
    else if (category === 'Alternative Category') remainingUnits = tl.altRemaining;

    if (remainingUnits < quantity) {
      const msg = `Purchase blocked: Your weekly limit for ${category} has already been reached (${remainingUnits} unit(s) remaining).`;
      ruleResults.push({
        id: 4,
        label: checks[3].label,
        passed: false,
        message: msg
      });
      return {
        passed: false,
        ruleResults,
        blockingError: msg
      };
    }
    ruleResults.push({
      id: 4,
      label: checks[3].label,
      passed: true,
      message: `Weekly limit compliant. Requested: ${quantity}, Remaining: ${remainingUnits}.`
    });

    // Check 5: Is selected product category permitted?
    const validCategories = ['Hard Liquor', 'Beer', 'Wine', 'Normal Cigarette', 'Alternative Category'];
    if (!validCategories.includes(category)) {
      ruleResults.push({
        id: 5,
        label: checks[4].label,
        passed: false,
        message: 'Purchase blocked: The selected product category is not permitted or recognized.'
      });
      return {
        passed: false,
        ruleResults,
        blockingError: 'Purchase blocked: The selected product category is not permitted or recognized.'
      };
    }
    ruleResults.push({ id: 5, label: checks[4].label, passed: true, message: `Category '${category}' is authorized.` });

    // Check 6: Is selected time slot valid and has capacity?
    const slot = store.getTimeSlots().find(s => s.slot_id === slotId);
    if (!slot || !slot.active) {
      ruleResults.push({
        id: 6,
        label: checks[5].label,
        passed: false,
        message: 'Purchase blocked: Selected reservation time slot is inactive or not found.'
      });
      return {
        passed: false,
        ruleResults,
        blockingError: 'Purchase blocked: Selected reservation time slot is inactive or not found.'
      };
    }

    if (slot.booked >= slot.capacity) {
      ruleResults.push({
        id: 6,
        label: checks[5].label,
        passed: false,
        message: 'Purchase blocked: Time slot capacity has reached maximum capacity. Please select another slot.'
      });
      return {
        passed: false,
        ruleResults,
        blockingError: 'Purchase blocked: Time slot capacity has reached maximum capacity. Please select another slot.'
      };
    }
    ruleResults.push({
      id: 6,
      label: checks[5].label,
      passed: true,
      message: `Time slot verified: ${slot.start_time} – ${slot.end_time} (${slot.booked}/${slot.capacity} reserved).`
    });

    return {
      passed: true,
      ruleResults,
      blockingError: null
    };
  }
};

window.PurchaseValidator = PurchaseValidator;
