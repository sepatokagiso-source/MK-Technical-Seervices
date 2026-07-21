# Plan: Industrial-Grade UI Overhaul for MK Technical Services

## Objective
Bridge the gap between high-end corporate identity and heavy engineering. The UI must feel industrial, precise, and structurally sound—neither a boring government directory nor a trendy Silicon Valley startup.

---

## 1. Hero Section (First Impression)

### UI Changes
- Replace current hero background with a high-resolution, full-width photo of a massive HVAC plant room or automated electrical substation.
- Apply a subtle, dark blue geometric grid overlay (resembling digital blueprint lines or CAD drawings) over the hero image.
- Add a sleek, horizontal "Live Metrics Bar" directly under the main headline with animated counters that scroll into place:
  - `[Level 1] B-BBEE Contributor`
  - `[7ME / 4SF] CIDB Gradings`
  - `[100%] Black-Owned & Managed`
  - `[Zero] Lost-Time Incidents (LTI)`

### Copy Updates
- **Headline:** Engineering Infrastructure. Automating Efficiency.
- **Sub-headline:** MK Technical Services delivers Tier-1 turnkey mechanical, electrical, and Building Management Systems (BMS) for South Africa’s critical infrastructure, public works, and commercial enterprises.
- **Primary CTA:** Submit RFQ / Tender Documents
- **Secondary CTA:** Download Corporate Profile (PDF)

### Files to change
- `D:\Users\sepat\Music\WORK\MK Web 2.0\index.html`
- `D:\Users\sepat\Music\WORK\MK Web 2.0\src\style.css`
- `D:\Users\sepat\Music\WORK\MK Web 2.0\src\main.js`

---

## 2. Interactive "System Architecture" (Services Section)

### UI Changes
- Replace basic card/grid services layout with an interactive schematic switcher.
- On hover over a service category (HVAC, Electrical/BMS, Turnkey Contracting), the background graphic smoothly morphs into an animated technical line drawing of that specific system.
- Add glowing green status-indicator micro-interactions next to sub-services (LED-like control board pulse).

### Copy Updates
- **Mechanical & HVAC Engineering:** Industrial-grade climate control, thermal regulation, and ventilation architecture engineered for optimal energy efficiency, regulatory compliance, and maximum system uptime.
- **Electrical Infrastructure & BMS Automation:** Smart building automation and robust electrical reticulation networks. We design and integrate intelligent control loops and Building Management Systems that centralize facility oversight and slash operational costs.
- **Specialised Turnkey Contracting:** Comprehensive asset lifecycle management, from advanced gas suppression and fire safety installations to civil renovations and structural plant maintenance.

### Files to change
- `D:\Users\sepat\Music\WORK\MK Web 2.0\pages\services.html`
- `D:\Users\sepat\Music\WORK\MK Web 2.0\src\style.css`
- `D:\Users\sepat\Music\WORK\MK Web 2.0\src\main.js`

---

## 3. Procurement Vault (Compliance & Trust)

### UI Changes
- Build a highly visible "Compliance Vault" section with a clean 4-column layout.
- Each column is a verified asset card with a subtle metallic or glassmorphism border.
- Each card features an explicit download/verify icon for one-click access.

### Copy
- **Section Title:** Supply Chain & Procurement Compliance
- **Intro:** We eliminate supply chain risk. MK Technical Services maintains rigorous regulatory compliance, verified CIDB capacity, and active industry professional memberships to ensure frictionless public and private sector procurement.

| Document Asset | Subtext / Verification | Action |
| --- | --- | --- |
| **B-BBEE Verification** | Level 1 Contributor (135% Recognition) | Download Certificate |
| **CIDB Register** | Active Gradings: 7ME, 4SF, 2GB, 1EP | Verify Capacity |
| **Safety Compliance** | OHS Act Compliant / Zero Incident Record | View Safety File |
| **Industry Accreditations** | Registered SARACCA & SAIRAC Member | View Registrations |

### Files to change
- `D:\Users\sepat\Music\WORK\MK Web 2.0\pages\compliance.html`
- `D:\Users\sepat\Music\WORK\MK Web 2.0\src\style.css`
- `D:\Users\sepat\Music\WORK\MK Web 2.0\src\main.js`

---

## 4. "Capacity Proof" Map (Case Studies Hub)

### UI Changes
- Feature a dark-themed digital map of South Africa with glowing data pins over major contract locations (Pretoria, Limpopo, Mpumalanga).
- Clicking a pin opens a sleek, technical slide-out panel detailing the specific engineering triumph without loading a new page.

### Copy
- **Section Title:** Major Capital Works & Infrastructure Deployments
- **Intro:** Proven execution across high-security, high-output environments. We manage multi-million Rand mechanical and automation contracts with absolute precision.

- **Project Card 1: Eskom Matimba Power Station**
  - Scope: Chiller Plant Capital Replacement & BMS Automation Overhaul
  - Metrics: R3.09 Million Asset Deployment | 100% On-Time Delivery

- **Project Card 2: Rand Water Head Office**
  - Scope: Chilled Water Reticulation & Advanced Building Automation Integration
  - Metrics: R3.24 Million Commercial Modernization Contract

### Files to change
- `D:\Users\sepat\Music\WORK\MK Web 2.0\pages\projects.html`
- `D:\Users\sepat\Music\WORK\MK Web 2.0\src\style.css`
- `D:\Users\sepat\Music\WORK\MK Web 2.0\src\main.js`

---

## 5. High-Conversion Footer & Contact Hub

### UI Changes
- Split the contact section into two clear pathways:
  - **Left:** General Inquiries
  - **Right:** Tender/RFQ Submissions
- Add a drag-and-drop BOQ file-upload zone styled for engineering documents (`.dwg`, `.pdf`, `.xlsx`).

### Copy
- **Left Column Header:** Partner with Us
- **Left Column Body:** Speak directly with our engineering or estimating department regarding your facility modernizations or maintenance cycles.
- **Right Column Header:** Tender Invitation Hub
- **Right Column Body:** Issue a Request for Quotation (RFQ) or invite MK Technical Services to an active public/private sector tender panel.

### Files to change
- `D:\Users\sepat\Music\WORK\MK Web 2.0\pages\contact.html`
- `D:\Users\sepat\Music\WORK\MK Web 2.0\src\style.css`
- `D:\Users\sepat\Music\WORK\MK Web 2.0\src\main.js`

---

## Visual Identity Shift (Global)

### Palette
- **Primary:** Deep Navy/Slate Blue (Authority)
- **Secondary:** Iron Gray (Structure)
- **Base:** Clean White (Clarity)
- **Accent:** Subtle High-Vis Yellow or Electric Cyan (active buttons, status lights, metric highlights only)

### Typography
- Bold, clean, highly legible Sans-Serif fonts (Inter or Roboto Mono) for an exact, data-driven engineering tone.

### Implementation Notes
- All color changes should use CSS custom properties for consistency.
- Accent color should be used sparingly and exclusively for interactive/active states.
- Maintain existing dark mode compatibility where applicable.

---

## Execution Order
1. Hero Section (highest impact, first impression)
2. Services Section (core offering)
3. Compliance Vault (trust & procurement)
4. Projects Map (case studies)
5. Contact Hub (conversion)

## Validation
- Cross-browser visual check (Chrome, Edge, Firefox)
- Responsive behavior at 1440px, 1024px, 768px, 375px
- Accessibility: color contrast, keyboard navigation, ARIA labels
- Performance: image optimization, lazy loading for map/hero assets
