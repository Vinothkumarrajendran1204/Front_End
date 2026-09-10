# Tamil Nadu TASMAC Smart Booking & Limit Management Portal

A modern, light-theme web application designed for the **Tamil Nadu State Marketing Corporation (TASMAC)** under the Prohibition & Excise Department, Government of Tamil Nadu.

This application provides a disciplined, transparent, queue-free advance token booking system with automated weekly alcohol and cigarette quota management, Aadhaar verification, real-time shop inventory tracking, scannable QR collection passes, private purchase history, and an administrative legal restriction enforcement portal.

---

## 🌟 Key Features Implemented

### 1. Login & User Verification
- **Aadhaar Input**: Formatted 12-digit number input (`0000 0000 0000`) with privacy-safe masking (`XXXX-XXXX-2345`).
- **Mock OTP Verification**: 6-digit PIN input with 60-second countdown timer and 1-click test simulation helper.
- **Privacy Assurance**: No real Aadhaar or personal data is collected or exposed.
- **Auto-Registration**: Seamless session persistence in `localStorage`.

### 2. Location Selection & Shop Locator
- **District & City Selectors**: Covers key Tamil Nadu districts (Chennai, Coimbatore, Madurai, Tiruchirappalli, Salem, Tirunelveli, Vellore).
- **GPS Distance Recommendation**: "Use My GPS Location" simulation calculates exact distance (km) and sorts nearest outlets.
- **Filtered Shop View**: Displays only outlets serving the chosen city or locality.

### 3. TASMAC Shop List
Each shop card clearly displays:
- Shop Name and State ID (e.g. `TN-CHE-1042`)
- Full physical address with landmark and contact number
- Calculated distance from the citizen
- Opening and closing timings (`12:00 PM - 10:00 PM`)
- Current status (`Open Now`, `High Stock`, token availability)
- Quick action buttons: **View Products** and **Book Now**

### 4. Shop Product Page
- Shop-specific live inventory and stock counts
- Categorized browsing:
  - **Hard Liquor** (Whisky, Rum, Brandy, Vodka, Gin)
  - **Beer** (Lager, Strong Beer, Craft Beer)
  - **Wine** (Shiraz, Cabernet Sauvignon, Merlot, Chenin Blanc)
  - **Cigarettes** (High Nicotine, Low Nicotine)
- Product cards show high-resolution photography, ABV / Nicotine / Tar specs, volume (750ml, 650ml, 20 sticks), TN MRP price, remaining citizen quota, and real-time booking eligibility.

### 5. Alcohol Limit Management
- **Weekly State Quota**:
  - Maximum 1 Full Bottle (750ml) Hard Liquor
  - **OR** Maximum 2 Beers (650ml bottles / 330ml cans)
  - **OR** Maximum 2 Wine bottles (750ml)
- **Visual Progress Gauges**: Real-time meters tracking units used, units remaining, and percentage.
- **Automatic Reset**: Displays next reset date (Monday 12:00 AM).
- **Hard Limit Enforcement**: Booking button immediately disables with the exact statutory message:
  > *"Weekly alcohol limit reached. You can purchase again after the limit resets."*

### 6. Cigarette Limit Management (Dynamic Tiering)
Automatically monitors alcohol consumption to determine cigarette quotas:
- **If alcohol has NOT been used (0 units)**:
  - High Nicotine: Max **5 packs / week**
  - Low Nicotine: Max **10 packs / week**
- **If alcohol HAS been used (> 0 units)**:
  - High Nicotine: Dynamically restricted to max **3 packs / week**
  - Low Nicotine: Dynamically restricted to max **6 packs / week**

### 7. Smart Booking System
- Select Product, Quantity (strictly validated against remaining limit), Collection Date, and 2-Hour Time Slot.
- Generates a unique Alphanumeric Booking ID (e.g. `TASMAC-2026-CHE-98421`).
- Generates an offline-capable, scannable **QR Code Collection Pass**.
- Complete digital pass displaying collection guidelines, shop address, and status (`Confirmed`, `Ready for Collection`, `Collected`, `Cancelled`, `Expired`).
- Citizens can cancel active bookings to immediately restore quota and shop inventory.

### 8. Private Purchase History
- Secure encrypted ledger showing Date, Shop, Product, Quantity, Amount, Booking ID, and Status.
- **Privacy Protected**: Personal purchase history is strictly accessible to the authenticated account holder and authorized prohibition officers.
- Interactive digital cash receipt popup for download or printing.

### 9. Legal Restriction / Account Blocking
- **Account Restriction Enforcement Module** for legally recorded cases:
  - Drunk Driving (Sec 185 Motor Vehicles Act)
  - Alcohol-related violence (IPC 323/324)
  - NDPS / Narcotics offences
- Authorized officers can flag an account as **Restricted**.
- When restricted:
  - Alcohol booking is immediately blocked.
  - Prominent red warning banner with "Account Restricted".
  - Dedicated **Legal Case Details modal** showing police station, measured BAC, license suspension details, review date, and appeal instructions.

### 10. Admin Officer Dashboard
Accessible via Authorized Officer PIN (`8899`):
- **Live Counter Booking Queue**: Search tokens, verify QR passes, and advance status to `Ready` or `Collected` (which automatically writes to the citizen's purchase history).
- **Inventory Management**: Real-time stock overview per shop with stock adjustment and replenishment controls.
- **Account Restriction Management**: Flag citizen accounts with police case references or revoke restrictions.
- **Citizen Limit Ledger**: Inspect citizen quotas across the state and trigger manual quota resets.
- **Shop Outlets**: Toggle shop operating status (`Open` / `Closed`).

---

## 🎭 Predefined Test Personas

You can switch between test accounts using the **🎭 Demo Persona** button in the top navigation:

| Persona | Aadhaar Number | Status | Starting Quota | Behavior to Verify |
|---|---|---|---|---|
| **Rajesh Kannan** | `4567 8901 2345` | Clean Citizen | 0 / 1 unit used | Can book 1 full bottle OR 2 beers. Cigarette limit is 5 High / 10 Low. |
| **S. Murugan** | `3456 7890 1234` | Active Citizen | 0.5 unit used (1 Beer) | Can only book 1 more beer or wine. Cigarette limit dynamically reduced to 3 High / 6 Low. |
| **M. Vijay** | `9012 3456 7890` | Limit Reached | 1.0 unit used (Full Bottle) | Alcohol booking disabled with limit reached message. |
| **V. Anbarasan** | `7890 1234 5678` | Restricted | DUI Police Case | Alcohol booking blocked. Red banner displayed. Click "View Case" for police record. |
| **T. Selvamani, IAS** | Officer PIN: `8899` | Administrator | Enforcement Wing | Accesses Admin Dashboard, verifies tokens, modifies stock, and manages restrictions. |

---

## 🚀 How to Run

Because this project is built using modern standards-compliant HTML5, CSS3, and modular ES6+ JavaScript with zero build dependencies, you can run it immediately without `npm` or `node`:

### Option A: Python Built-in Server (Recommended)
Open a terminal in this project folder and run:
```bash
python -m http.server 3000
```
Then navigate to: `http://localhost:3000`

### Option B: Direct File Open
Simply double-click `index.html` to open it in Google Chrome, Microsoft Edge, Mozilla Firefox, or Safari.

---

## 📐 Architecture & File Structure

```
Project3/
├── index.html          # Semantic HTML5 shell
├── README.md           # Documentation & user guide
├── css/
│   └── style.css       # Light-theme GovTech design system (TN green, gold, clean white)
└── js/
    ├── qrcode.min.js   # Self-contained client-side QR code generator
    ├── data.js         # Realistic mock database (shops, products, users, cases)
    ├── store.js        # Reactive state store & quota calculation engine
    ├── components.js   # Modular UI renderers
    └── app.js          # Controller, router, search/filters & modal handlers
```
