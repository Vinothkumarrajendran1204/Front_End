/**
 * Unakku Avlotha Limit - Login & User Verification Controller
 * Supports Aadhaar formatting, masked phone, mock OTP timer, and quick test persona selection.
 */

document.addEventListener("DOMContentLoaded", () => {
  // Render common headers/footers if container exists
  const headerMount = document.getElementById("headerMount");
  if (headerMount && window.UalUI) {
    headerMount.innerHTML = UalUI.renderHeader("login");
  }
  const footerMount = document.getElementById("footerMount");
  if (footerMount && window.UalUI) {
    footerMount.innerHTML = UalUI.renderFooter();
  }

  // Elements
  const aadhaarForm = document.getElementById("aadhaarForm");
  const aadhaarInput = document.getElementById("aadhaarInput");
  const aadhaarStep = document.getElementById("aadhaarStep");
  const otpStep = document.getElementById("otpStep");
  const adminStep = document.getElementById("adminStep");

  const otpForm = document.getElementById("otpForm");
  const otpInputs = document.querySelectorAll(".otp-digit");
  const otpPhoneMasked = document.getElementById("otpPhoneMasked");
  const otpTimerDisplay = document.getElementById("otpTimer");
  const resendOtpBtn = document.getElementById("resendOtpBtn");

  const adminToggleBtn = document.getElementById("toggleAdminLogin");
  const customerToggleBtn = document.getElementById("toggleCustomerLogin");
  const adminForm = document.getElementById("adminForm");
  const adminPinInput = document.getElementById("adminPinInput");

  let currentAadhaar = "";
  let matchedCustomer = null;
  let timerInterval = null;
  let timeLeft = 45;

  // Format Aadhaar input with spaces: XXXX XXXX XXXX
  if (aadhaarInput) {
    aadhaarInput.addEventListener("input", (e) => {
      let val = e.target.value.replace(/\D/g, "").slice(0, 12);
      let parts = [];
      for (let i = 0; i < val.length; i += 4) {
        parts.push(val.substring(i, i + 4));
      }
      e.target.value = parts.join(" ");
    });
  }

  // Handle Aadhaar Submit -> Move to OTP Step
  if (aadhaarForm) {
    aadhaarForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const raw = aadhaarInput.value.replace(/\s/g, "");
      if (raw.length !== 12) {
        UalUI.toast("Please enter a valid 12-digit mock Aadhaar number.", "warning");
        return;
      }

      currentAadhaar = raw;
      const customers = window.ualStore.state.customers;
      matchedCustomer = customers.find(c => c.aadhaarNumber.replace(/\s/g, "") === raw);

      if (!matchedCustomer) {
        // Fallback: create mock profile for any 12 digits
        matchedCustomer = {
          aadhaarNumber: `${raw.slice(0,4)} ${raw.slice(4,8)} ${raw.slice(8,12)}`,
          customerId: `TN-DEMO-${raw.slice(-4)}`,
          name: "Guest Resident",
          phoneMasked: `******${raw.slice(-4)}`,
          district: "Chennai",
          city: "Central",
          dailyLimits: { hotUsed: 0, hotMax: 1, nonHotUsed: 0, nonHotMax: 2 },
          isRestricted: false,
          personaNote: "Demo Guest Account"
        };
        window.ualStore.state.customers.push(matchedCustomer);
      }

      // Transition to OTP step
      aadhaarStep.classList.add("hidden");
      otpStep.classList.remove("hidden");
      if (otpPhoneMasked) {
        otpPhoneMasked.textContent = matchedCustomer.phoneMasked || "******4521";
      }

      // Clear & focus first OTP digit
      otpInputs.forEach(input => { input.value = ""; });
      if (otpInputs[0]) otpInputs[0].focus();

      // Show mock hint toast
      UalUI.toast(`Mock OTP: 123456 (Sent to ${matchedCustomer.phoneMasked})`, "info");
      startOtpTimer();
    });
  }

  // Handle OTP 6-Digit Auto-Focus
  otpInputs.forEach((input, index) => {
    input.addEventListener("input", (e) => {
      const val = e.target.value.replace(/\D/g, "");
      e.target.value = val ? val[0] : "";
      if (val && index < otpInputs.length - 1) {
        otpInputs[index + 1].focus();
      }
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && !e.target.value && index > 0) {
        otpInputs[index - 1].focus();
      }
    });
  });

  // Handle OTP Verification Submit
  if (otpForm) {
    otpForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let enteredOtp = "";
      otpInputs.forEach(i => { enteredOtp += i.value; });

      if (enteredOtp.length !== 6) {
        UalUI.toast("Please enter all 6 digits of the OTP.", "warning");
        return;
      }

      // In prototype, "123456" or any 6 digits succeed
      clearInterval(timerInterval);
      window.ualStore.switchCustomer(matchedCustomer.aadhaarNumber);

      UalUI.toast(`Aadhaar Verified! Welcome, ${matchedCustomer.name}`, "success");
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 700);
    });
  }

  // Resend OTP logic
  if (resendOtpBtn) {
    resendOtpBtn.addEventListener("click", () => {
      if (timeLeft > 0) return;
      UalUI.toast(`New Mock OTP: 123456 sent to ${matchedCustomer?.phoneMasked || "mobile"}`, "info");
      startOtpTimer();
    });
  }

  function startOtpTimer() {
    clearInterval(timerInterval);
    timeLeft = 45;
    if (resendOtpBtn) resendOtpBtn.disabled = true;
    updateTimerText();

    timerInterval = setInterval(() => {
      timeLeft--;
      updateTimerText();
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        if (resendOtpBtn) {
          resendOtpBtn.disabled = false;
          resendOtpBtn.textContent = "Resend OTP";
        }
      }
    }, 1000);
  }

  function updateTimerText() {
    if (otpTimerDisplay) {
      otpTimerDisplay.textContent = timeLeft > 0 ? `(Resend in ${timeLeft}s)` : "";
    }
  }

  // Admin Login Toggle
  if (adminToggleBtn && customerToggleBtn) {
    adminToggleBtn.addEventListener("click", (e) => {
      e.preventDefault();
      aadhaarStep.classList.add("hidden");
      otpStep.classList.add("hidden");
      adminStep.classList.remove("hidden");
    });

    customerToggleBtn.addEventListener("click", (e) => {
      e.preventDefault();
      adminStep.classList.add("hidden");
      aadhaarStep.classList.remove("hidden");
    });
  }

  // Admin PIN Form Submit
  if (adminForm) {
    adminForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const pin = adminPinInput ? adminPinInput.value.trim() : "";
      if (pin === "8899" || pin === "ADMIN") {
        window.ualStore.loginAdmin(pin);
        UalUI.toast("Admin Authentication Successful!", "success");
        setTimeout(() => {
          window.location.href = "admin.html";
        }, 500);
      } else {
        UalUI.toast("Invalid Officer Authorization PIN. Use demo PIN: 8899", "error");
      }
    });
  }

  // Quick Persona Click Handler
  window.fillPersona = (aadhaar) => {
    if (aadhaarInput) {
      aadhaarInput.value = aadhaar;
      if (aadhaarForm) {
        aadhaarForm.dispatchEvent(new Event("submit"));
      }
    }
  };
});
