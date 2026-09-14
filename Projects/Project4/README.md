# UNAKKU AVLOTHA LIMIT (உனக்கு அவ்ளோதான் லிமிட்)

> **“Know Your Limit. Stay Safe. Stay Responsible.”**
> 
> *Tamil Nadu Alcohol & Tobacco Purchase-Limit Management & Public Awareness System Prototype*

---

## ⚠️ Prototype & Non-Government Public Disclaimer
This web application is strictly a **demonstration prototype and portfolio concept** designed to explore public health safeguards, algorithmic quota enforcement, and identity-linked retail regulation. 
- It is **not** an official government portal.
- It is **not** affiliated with or operated by the Tamil Nadu State Marketing Corporation (TASMAC) or the Government of Tamil Nadu.
- Real Aadhaar authentication and law enforcement records are **never** utilized; all citizen IDs, mobile numbers, and OTP verifications are completely simulated.

---

## 🎨 Theme & Visual Identity
Designed under a **clean, modern public-service and public-welfare aesthetic**:
- **Light Theme Only**:
  - Primary Green: `#059669` / `#10b981` / `#ecfdf5`
  - Soft Blue: `#0284c7` / `#f0f9ff`
  - White: `#ffffff`
  - Dark Green: `#064e3b` / `#065f46`
  - Slate Gray: `#f8fafc` / `#e2e8f0` / `#64748b`
- **Semantic Status Signals**:
  - 🟢 **Green**: Permitted, eligible, active quota
  - 🟡 **Orange / Amber**: Approaching limit, caution, dynamic adjustment
  - 🔴 **Red**: Limit exhausted, blocked purchase, legal restriction, age barrier
- **Clean Rounded Cards (`border-radius: 12px – 16px`)**, subtle shadows, accessible typography, and responsive layouts across mobile, tablet, and desktop viewports.

---

## 🚀 Key Modules & Business Logic

### 1. Dual-Substance Quota Management
#### Alcohol Weekly Limits
- **Hard Liquor (IMFL):** Strictly capped at **1 unit per resident per week**.
- **Mild Beer:** Strictly capped at **2 units per resident per week**.
- **Table Wine:** Strictly capped at **2 units per resident per week**.
- Upon reaching any category's limit, booking buttons are locked with the warning:
  > *“Weekly limit reached. No additional purchase is permitted for this category until the next weekly cycle.”*

#### Tobacco Dynamic Limits (Cross-Category Logic)
Categorized into **Normal Cigarette** and **Lower-Harm / Alternative Category**.
- *Statutory Notice:* “There is no risk-free tobacco product. This category is provided only as a prototype classification.”
- **Cross-Category Rule Engine**:
  - **If alcohol was purchased during the current week:**
    - Normal Cigarette: Maximum **3 units**
    - Alternative Category: Maximum **6 units**
  - **If alcohol was NOT purchased during the current week:**
    - Normal Cigarette: Maximum **5 units**
    - Alternative Category: Maximum **10 units**

---

### 2. Time Slot Scheduling & 6-Point Validation Engine
To eliminate counter overcrowding and panic buying, residents reserve 30-minute collection windows:
- `10:00 AM – 10:30 AM`
- `10:30 AM – 11:00 AM`
- `11:00 AM – 11:30 AM`
- `04:00 PM – 04:30 PM`
- `04:30 PM – 05:00 PM`

Before any booking pass is generated, the system evaluates all 6 statutory rules:
1. **Age Verification**: Resident must be strictly $\ge$ 18 years old.
2. **Identity Verification**: Simulated citizen credential must be verified.
3. **Legal Restrictions**: Resident must be free of active court, police, or driving restrictions.
4. **Weekly Limit Compliance**: Remaining quota must accommodate requested units.
5. **Product Category Allowance**: Product must belong to an approved category.
6. **Time Slot Validity**: Chosen slot must be active and within counter capacity.

---

### 3. Legal Restriction & Incident Management
- Statuses: *Active*, *Temporarily Restricted*, *Permanently Restricted*, *Under Review*.
- **Privacy Safeguard for Normal Residents:**
  If an individual has an active court or drunk-driving restriction, their portal simply displays:
  > *“Your purchase access is currently restricted. Please contact the appropriate authority for further information.”*
  Confidential court reference numbers, police case IDs, and officer notes are never leaked to citizen screens.
- **Admin Management Console:** Authorized officers can review case references, record new restrictions, and revoke restrictions upon lawful clearance.

---

### 4. Interactive Public Health & Awareness Hub
- **Clinical Organ Impact Breakdown:** Pathological explanations for Liver, Heart, Brain, Sleep Architecture, and Driving Impairment.
- **“Never Drink and Drive” Statutory Alert:** Bold warning highlighting slowed reflexes, poor decision-making, and accident fatality risks.
- **“Check Your Week” Interactive Self-Assessment:** 6 reflective questions generating an educational awareness score (e.g. `82/100`) with personalized guidance and a medical non-diagnosis disclaimer.
- **24/7 Helplines:** Tele-MANAS (`14416`), National De-Addiction (`1800-11-0031`), IMH Kilpauk (`044-2644 1999`).

---

### 5. Administration, Analytics & Conceptual Database
- **Executive KPIs:** Registered Users, Active Eligible Users, Blocked Minor Attempts, Active Legal Restrictions, Alcohol & Tobacco Units Issued, Current Cycle.
- **Interactive SVG Charts:**
  1. Weekly Alcohol Purchase Trends (5-week comparative bar chart)
  2. Weekly Tobacco Purchase Trends (Normal vs Alternative line chart)
  3. Category-Wise Distribution (Donut breakdown)
  4. Users Reaching Statutory Limits (Quota exhaustion metrics)
  5. Age-Restricted Intervention Telemetry (Daily blocked attempts)
  6. Time-Slot Utilization (Occupancy progress bars)
- **Conceptual Database Inspector:** Live JSON viewer for 7 relational tables: `Users`, `Alcohol_Limits`, `Tobacco_Limits`, `Purchases`, `Time_Slots`, `Restrictions`, `Audit_Logs`.
- **Weekly Reset Simulator:** 1-click button to simulate transition into the next weekly cycle (`2026-W37` &rarr; `2026-W38`), demonstrating how quotas refresh while the historical ledger remains permanently preserved.

---

## 👥 Demo Personas for Evaluation

| Persona | Role | Age | Initial State | Primary Testing Scenario |
| :--- | :--- | :--- | :--- | :--- |
| **M. Vijay** (`TN-RES-1001`) | Resident | 34 | Active & Eligible | Test normal slot booking, quota deductions, and dynamic tobacco limit reductions. |
| **K. Rahul** (`TN-RES-1002`) | Resident | 17 | Minor (Under 18) | Test statutory age barrier: triggers unclosable full-screen **“Access Restricted”** warning. |
| **R. Karthik** (`TN-RES-1003`) | Resident | 30 | Temporarily Restricted | Test court restriction: displays restriction banner and triggers Rule 3 purchase block. |
| **Off. K. Rathinavel** (`TN-ADM-9001`) | Officer | 46 | Authorized Admin | PIN: `8899`. Access User Management, Legal Restrictions, Analytics, CSV Export, and Cycle Reset. |

---

## 💻 Tech Stack & Zero-Dependency Execution
- **HTML5**: Semantic tags, accessible forms, SVG QR code and illustrations.
- **CSS3**: Custom light-theme design tokens, CSS Grid & Flexbox, micro-transitions, responsive media queries.
- **Vanilla JavaScript (ES6+)**: Modular architecture (`state.js`, `validation.js`, `analytics.js`, `app.js`), local storage persistence, reactive subscriber pattern.
- **Zero build tools or NPM dependencies required:** Runs natively in any modern web browser directly or served through any lightweight web server.

### Running Locally
To preview in browser:
```bash
# Option 1: Python static server
python -m http.server 3000

# Open in browser:
http://localhost:3000
```
Or simply double-click `index.html` to launch in your browser.
