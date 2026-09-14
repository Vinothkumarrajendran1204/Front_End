/**
 * Comprehensive Automated Verification Test for Unakku Avlotha Limit
 * Tests state management, dynamic cross-category rules, 6-point validation engine,
 * persona age gating, restriction blocking, cancellation restoration, and weekly reset.
 */

// Mock window and localStorage for headless Node environment
global.window = global;
const storage = {};
global.localStorage = {
  getItem: (key) => storage[key] || null,
  setItem: (key, val) => { storage[key] = val.toString(); },
  removeItem: (key) => { delete storage[key]; },
  clear: () => { Object.keys(storage).forEach(k => delete storage[k]); }
};

// Load modules
require('./js/state.js');
require('./js/validation.js');

const store = window.ualState;
const validator = window.PurchaseValidator;

let passedTests = 0;
let totalTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    console.log(`  ✅ PASS: ${message}`);
    passedTests++;
  } else {
    console.error(`  ❌ FAIL: ${message}`);
    process.exitCode = 1;
  }
}

console.log('\n======================================================');
console.log('UNAKKU AVLOTHA LIMIT - AUTOMATED VERIFICATION SUITE');
console.log('======================================================\n');

// 1. Initial State & Adult Persona
console.log('Test Group 1: Initial Quotas & Cross-Category Tobacco Limits');
const adultId = 'TN-RES-1001';
const initialAlc = store.getAlcoholLimits(adultId);
assert(initialAlc.hardMax === 1 && initialAlc.hardRemaining === 1, 'Hard liquor starts with 1 max and 1 remaining');
assert(initialAlc.beerMax === 2 && initialAlc.beerRemaining === 2, 'Beer starts with 2 max and 2 remaining');
assert(initialAlc.wineMax === 2 && initialAlc.wineRemaining === 2, 'Wine starts with 2 max and 2 remaining');

let initialTob = store.getTobaccoLimits(adultId);
assert(!initialTob.isAlcoholPurchased, 'Initial week has NO alcohol purchased');
assert(initialTob.normalMax === 5 && initialTob.normalRemaining === 5, 'Baseline Normal Cigarette cap is 5 when alcohol NOT purchased');
assert(initialTob.altMax === 10 && initialTob.altRemaining === 10, 'Baseline Alternative Tobacco cap is 10 when alcohol NOT purchased');

// 2. Booking Hard Liquor & Dynamic Tobacco Recalculation
console.log('\nTest Group 2: Hard Liquor Booking & Dynamic Tobacco Reduction');
const booking1 = store.bookPurchase(adultId, 'Hard Liquor', 1, 'SLOT-101', '2026-09-14');
assert(booking1 && booking1.purchase_id.startsWith('PUR-2026-'), 'Hard liquor purchase token generated successfully');

const afterAlc = store.getAlcoholLimits(adultId);
assert(afterAlc.hardRemaining === 0 && afterAlc.hardUsed === 1, 'Hard liquor remaining drops to 0 after booking 1 unit');

const afterTob = store.getTobaccoLimits(adultId);
assert(afterTob.isAlcoholPurchased === true, 'Alcohol purchased flag is now TRUE');
assert(afterTob.normalMax === 3 && afterTob.normalRemaining === 3, 'Normal cigarette cap dynamically reduced to 3 because alcohol was purchased');
assert(afterTob.altMax === 6 && afterTob.altRemaining === 6, 'Alternative tobacco cap dynamically reduced to 6 because alcohol was purchased');

// 3. Quota Exhaustion Block
console.log('\nTest Group 3: 6-Point Purchase Validation on Exhausted Limit');
const exhaustedCheck = validator.validatePurchase({
  userId: adultId,
  category: 'Hard Liquor',
  quantity: 1,
  slotId: 'SLOT-102',
  date: '2026-09-14'
});
assert(exhaustedCheck.passed === false, 'Validation blocks purchase when weekly limit is reached');
assert(exhaustedCheck.blockingError.includes('already been reached'), `Correct error reason shown: "${exhaustedCheck.blockingError}"`);

// 4. Minor Age Gate (Under 18)
console.log('\nTest Group 4: Under-18 Age Gate Validation');
const minorId = 'TN-RES-1002';
const minor = store.getUserById(minorId);
assert(minor.age === 17, 'Minor persona age is 17');
const minorCheck = validator.validatePurchase({
  userId: minorId,
  category: 'Beer',
  quantity: 1,
  slotId: 'SLOT-102',
  date: '2026-09-14'
});
assert(minorCheck.passed === false, 'Minor purchase strictly blocked by Rule 1');
assert(minorCheck.blockingError.includes('aged 18 or above'), `Under-18 statutory error returned: "${minorCheck.blockingError}"`);

// 5. Legally Restricted User
console.log('\nTest Group 5: Legal Restriction Enforcement & Privacy Masking');
const restrictedId = 'TN-RES-1003';
const restCheck = validator.validatePurchase({
  userId: restrictedId,
  category: 'Beer',
  quantity: 1,
  slotId: 'SLOT-102',
  date: '2026-09-14'
});
assert(restCheck.passed === false, 'Restricted resident strictly blocked by Rule 3');
assert(restCheck.blockingError.includes('currently restricted'), `Non-leaking privacy error shown: "${restCheck.blockingError}"`);

// 6. Booking Cancellation & Quota Restoration
console.log('\nTest Group 6: Booking Cancellation & Quota Restoration');
const cancelledBooking = store.cancelPurchase(booking1.purchase_id);
assert(cancelledBooking.status === 'Cancelled', 'Booking status transitioned to Cancelled');
const restoredAlc = store.getAlcoholLimits(adultId);
assert(restoredAlc.hardRemaining === 1 && restoredAlc.hardUsed === 0, 'Hard liquor quota restored back to 1 remaining');

// 7. Weekly Cycle Reset Logic
console.log('\nTest Group 7: Weekly Cycle Transition & Historical Preservation');
// Re-book to have active usage before reset
store.bookPurchase(adultId, 'Beer', 2, 'SLOT-103', '2026-09-14');
const purchaseCountBeforeReset = store.data.purchases.length;
const newCycle = store.simulateWeeklyReset();
assert(newCycle === '2026-W38', 'Cycle rolled over to 2026-W38');

const resetAlc = store.getAlcoholLimits(adultId);
assert(resetAlc.beerUsed === 0 && resetAlc.beerRemaining === 2, 'Beer used units reset to 0 in new cycle');
assert(store.data.purchases.length === purchaseCountBeforeReset, 'All historical purchase records intact after weekly reset');

console.log('\n======================================================');
console.log(`TEST RESULTS: ${passedTests} / ${totalTests} TESTS PASSED`);
console.log('======================================================\n');
