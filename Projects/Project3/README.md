# Unakku Avlotha Limit

> **“Know Your Limit • Book Responsibly • Stay Safe”**
> 
> *Student / Demo Project – Not an Official TASMAC Website*

A modern, responsive, light-theme web application designed as an educational and portfolio demonstration of a smart TASMAC booking and alcohol-awareness management system for Tamil Nadu.

---

## ⚠️ Student Demo Disclaimer
This web application is strictly a **student / demo portfolio prototype** created for educational, UI/UX, and technical demonstration purposes. It is **not** affiliated with, operated by, or endorsed by the Tamil Nadu State Marketing Corporation (TASMAC) or the Government of Tamil Nadu. All citizen records, Aadhaar numbers, phone numbers, and OTPs are entirely simulated and mock-generated.

---

## 🎨 Theme & Visual Design
- **Clean Light Theme**:
  - Primary Background: Crisp White (`#ffffff`) and Soft Off-white/Slate (`#f8fafc`)
  - Primary Dark Green: Forest Green (`#0f5a34`)
  - Secondary Light Green: Subtle Emerald (`#f0fdf4`, `#16a34a`)
  - Gold Accent: Royal Amber (`#d97706`, `#fef3c7`)
  - Status Indicators: Emerald Green (Clean/Eligible), Amber (Limit Reached), Crimson (Restricted)
- **Modern Typography**: Inter typography with clean hierarchy, responsive grids, rounded corners (`border-radius: 10px–16px`), soft shadows, and smooth micro-interactions.
- **Custom SVG Logo**: Custom booking token silhouette featuring a bottle/glass awareness icon, green verification checkmark, and a subtle Tamil Nadu gopuram-inspired architectural peak.

---

## 🚀 Key Functional Modules

### 1. Verification & Login (`login.html`)
- 12-digit Aadhaar input with auto-formatting (`XXXX XXXX XXXX`) and privacy masking.
- Mock 6-digit OTP verification screen with 45s countdown timer, auto-focus input, and resend capability.
- **1-Click Test Persona Selector**:
  - **S. Murugan**: Clean account (`0/1` HOT, `0/2` NON-HOT)
  - **K. Anand**: Partially reached account (`1/1` HOT reached, `1/2` NON-HOT remaining)
  - **M. Vijay**: Exhausted account (`1/1` HOT reached, `2/2` NON-HOT reached)
  - **R. Karthik**: Restricted account with drink-and-drive violation notice
  - **Officer K. Rathinavel**: Administrator portal (PIN: `8899`)

### 2. User Dashboard (`dashboard.html`)
- Resident greeting banner with customer ID (`TN-DEMO-XXXX`) and location.
- **Daily Limit Enforcement Meters**:
  - 🔥 **HOT Spirits** (Whisky, Brandy, Rum, Vodka, IMFL): Strict cap of **1 unit / person / day**. Displays remaining units, percentage progress bar, and disables booking upon reaching 1/1.
  - 🍺 **NON-HOT Mild** (Beer, Wine): Strict cap of **2 units / person / day**. Displays remaining units, percentage progress bar, and disables booking upon reaching 2/2.
- **Active Token Reservation Card**: Live digital token with Token ID (`UAL-2026-XXXX`), outlet details, slot time, and 1-click button to view scannable QR pass.
- Nearby recommended retail outlets and "Your Health Comes First" educational banner.

### 3. TASMAC Outlets Directory (`shops.html`)
- District selector (Chennai, Coimbatore, Madurai, Salem, Tiruchirappalli) and locality/area dropdowns.
- Real-time search by shop name, outlet number, or street address.
- Simulated **GPS Current Location** calculation (computes distance in km and sorts nearest outlets).
- Filter chips: *All Outlets*, *Open Now*, *Elite Stores*, *Near Me (< 3km)*.

### 4. Shop Product Catalog (`products.html`)
- Selected outlet verification banner with operating hours and address.
- **Strict Category Switcher**: Prominent visual toggle between 🔥 **HOT Spirits** and 🍺 **NON-HOT Mild Spirits** (categories are strictly segregated and never mixed).
- Subcategory filtering (Whisky, Brandy, Rum, Vodka, Beer, Wine) and live keyword search.
- Product cards showing Tamil Nadu statutory MRP, bottle volume, outlet stock count, and live booking eligibility based on the user's daily quota.

### 5. 11-Step Token Booking Flow (`booking.html`)
1. Customer identity verification (Aadhaar & customer ID).
2. Physical TASMAC outlet selection.
3. Operating hours & outlet capacity verification.
4. Category selection (HOT vs. NON-HOT).
5. Product selection from outlet inventory.
6. **Strict Quantity Stepper** (`[-] Quantity [+]`):
   - Clamped dynamically: `+` button is disabled immediately when the customer's remaining daily limit is reached.
   - Text input is `readonly`/`pointer-events: none` to prevent typing or copy-pasting values exceeding the quota.
7. Collection date selection (defaults to current date).
8. 1-Hour time slot reservation with live capacity counter (e.g. `22/35 slots booked`).
9. Order summary review with statutory health warnings.
10. Confirmation & daily quota deduction.
11. **Digital Token Pass Generation**: Scannable QR code generated client-side via `qrcode.min.js`, token ID (`UAL-2026-XXXX`), and printable layout.

### 6. Private Booking Ledger (`history.html`)
- Private customer transaction history.
- Timeframe filters: *All Bookings*, *Today*, *This Week*.
- Status filters: *Confirmed*, *Completed*, *Cancelled*.
- 1-Click QR token pass modal view and cancellation action (canceling restores both daily customer quota and outlet stock).

### 7. Alcohol Awareness & Health Education (`awareness.html`)
- **"Understand the Difference" Comparison Cards**:
  - 🟢 **Without Alcohol**: Restorative sleep, consistent hydration, peak concentration, emotional stability, productive routine, money saved.
  - 🟡 **Occasional Alcohol Use**: Dehydration, impaired reflexes, blunted judgment, fragmented sleep, reduced reaction speed.
  - 🔴 **Frequent / Daily Use**: Fatty liver & cirrhosis, cardiovascular hypertension, mood volatility, chronic immune suppression, financial strain.
- **Interactive Anatomical Explorer (SVG)**:
  - Interactive pulsing hotspots on Brain, Heart, Liver, Stomach, and Nervous System.
  - Dynamic pathological analysis and sobriety recovery timeline on hotspot selection.
- **Certified Health Helplines**:
  - Tele-MANAS (Govt of India 24/7 Helpline: `14416`)
  - National De-addiction Helpline (`1800-11-0031`)
  - Institute of Mental Health (IMH), Kilpauk, Chennai (`044-2644 1999`)
  - TTK Hospital De-Addiction Center, Adyar, Chennai (`044-2491 2948`)
- Bilingual statutory warnings in English and Tamil:
  > *மது அருந்துதல் உடல் நலத்திற்கு கேடு. பாதுகாப்பாய் இருங்கள் - மது அருந்திவிட்டு வாகனம் ஓட்டாதீர்கள்.*

### 8. Administration & Enforcement Console (`admin.html`)
- Officer authentication (PIN: `8899`).
- KPI metrics: Verified Residents, Registered Outlets, Today's Tokens Issued, Active Restrictions, Counter Value.
- **HTML5 Canvas Visual Analytics**:
  - Token Volume by Category (HOT vs. NON-HOT)
  - Outlet Booking Density across Chennai locations
- **Customer Statutory Restriction Management**:
  - View resident daily quota usage and legal status.
  - 1-Click **Impose Restriction** / **Clear Restriction** actions (e.g. for drink-and-drive citations).
  - When restricted, customer accounts immediately display: *"Account Temporarily Restricted — Booking is currently unavailable."*
- **Shop & Inventory Operations**:
  - Toggle outlet open/closed status.
  - Real-time stock level adjustments (+10 / -10 units).

---

## 💻 Tech Stack & Zero-Dependency Setup
- **Architecture**: 100% Vanilla ES6+ JavaScript, Semantic HTML5, Modular CSS3.
- **Zero Build Tools**: No npm, webpack, or bundler required; runs directly in any modern browser.
- **Offline QR Code Generator**: High-efficiency client-side QR generation (`js/qrcode.min.js`).
- **Reactive State Store**: `localStorage` backed reactive store (`window.ualStore`) in `js/common.js`.

---

## 🏃 Running the Application
Serve the directory using Python's built-in HTTP server:

```bash
# From the project root
python -m http.server 3000
```

Open your browser at:
`http://localhost:3000/index.html`

### Quick Navigation:
- Homepage: `http://localhost:3000/index.html`
- Login & Personas: `http://localhost:3000/login.html`
- Resident Dashboard: `http://localhost:3000/dashboard.html`
- Outlet Locator: `http://localhost:3000/shops.html`
- Product Catalog: `http://localhost:3000/products.html`
- Advance Token Booking: `http://localhost:3000/booking.html`
- My Bookings Ledger: `http://localhost:3000/history.html`
- Alcohol Awareness: `http://localhost:3000/awareness.html`
- Admin Console: `http://localhost:3000/admin.html` (PIN: `8899`)
