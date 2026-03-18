# PRD: SaaS Revenue Architecture Migration Model

**Project:** Interactive 5-Year Pricing Transition Financial Model
**Source:** MGI Research · Pricing Migration Model
**Target Users:** SaaS CFOs, Revenue Leaders, Pricing Strategy Teams
**Deliverable:** Single-page React web application (desktop-first)

---

## 1. Product Overview

Build an interactive web application that models a SaaS company's transition from pure seat-based pricing to a hybrid revenue architecture with five concurrent pricing streams. Users adjust input sliders and scenario presets to see a 5-year revenue projection update in real time.

**Core value proposition:** A live, explorable financial model that makes the "pricing transition valley" legible — showing exactly how seat erosion, new stream adoption, and pricing changes compound over 5 years.

---

## 2. Page Header

```
● MGI RESEARCH · PRICING MIGRATION MODEL        [Export CSV]  [Export JSON]
SaaS Revenue Architecture Migration
Model the transition from seat-based to hybrid pricing: seats + agent 
workflows + consumption + platform fees + outcome-based.
```

- Breadcrumb: `MGI RESEARCH · PRICING MIGRATION MODEL` with a small colored dot
- Title: `SaaS Revenue Architecture Migration` (large, bold)
- Subtitle: one-line description of the model's purpose
- Top-right: two export buttons — **Export CSV** and **Export JSON**

---

## 3. Scenario Presets

Four scenario tabs at the top of the content area:

| Tab | Label | Behavior |
|-----|-------|----------|
| Custom | `Custom` | User-defined; activates automatically when any slider is moved. Green outline border when active. |
| Bear Case | `Bear Case` | "SaaS Inertia" — seat attrition outpaces new stream adoption |
| Base Case | `Base Case` | "Managed Transition" — deliberate migration, shallow valley |
| Bull Case | `Bull Case` | "AI-Enhanced Dominance" — aggressive adoption, strong diversification |

**Behavior:** Clicking Bear/Base/Bull snaps **all** sliders to preset values instantly and re-renders all charts and KPI cards. Any slider movement automatically switches active tab to `Custom`.

### Preset Defaults

| Input | Bear Case | Base Case | Bull Case |
|-------|-----------|-----------|-----------|
| Starting Seats | 7,000 | 7,000 | 7,000 |
| Annual Seat Price | $1,200 | $1,200 | $1,200 |
| Annual Seat Attrition | 15% | 8% | 5% |
| Per-Seat Price Increase | 5% | 12% | 18% |
| New Customer Growth | 2% | 6% | 10% |
| Agent Y1 Adoption | 3% | 5% | 10% |
| Agent Adoption Growth YoY | 30% | 60% | 80% |
| Agent Rev Per Customer Unit | $500 | $800 | $1,200 |
| Agent Price Growth | 5% | 5% | 8% |
| Consumption Y1 Adoption | 4% | 8% | 12% |
| Consumption Adoption Growth YoY | 25% | 40% | 60% |
| Consumption Rev Per Unit | $250 | $500 | $800 |
| Consumption Usage Price Growth | 2% | 3% | 5% |
| Platform Fees Y1 Adoption | 8% | 15% | 20% |
| Platform Fees Adoption Growth YoY | 15% | 30% | 40% |
| Platform Fee (per unit) | $2,000 | $3,000 | $4,000 |
| Platform Fee Price Growth | 3% | 5% | 8% |
| Outcome-Based Y1 Adoption | 1% | 2% | 3% |
| Outcome-Based Adoption Growth YoY | 15% | 20% | 30% |
| Outcome-Based Rev Per Unit | $300 | $500 | $800 |
| Outcome-Based Price Growth | 5% | 5% | 8% |

---

## 4. KPI Summary Cards

Four stat cards displayed in a single row, always visible, updated reactively on every slider change:

### Card 1: Base Revenue
- **Label:** `BASE REVENUE`
- **Value:** Large blue number, e.g. `$8.4M`
- **Subtitle:** `7,000 seats × $1,200/yr`
- **Formula:** `Starting Seats × Annual Seat Price`

### Card 2: Year 5 Revenue
- **Label:** `YEAR 5 REVENUE`
- **Value:** Color-coded number (green = growth vs Base, red = decline)
- **Subtitle:** Delta indicator — `▲ 28.0%` (green) or `▼ 3.1%` (red)
- **Formula:** Sum of all five streams at Y5

### Card 3: 5-Year CAGR
- **Label:** `5-YEAR CAGR`
- **Value:** Percentage, green if positive, red if negative (e.g. `-0.6%` or `20.5%`)
- **Formula:** `CAGR = (Y5 Total / Y0 Total)^(1/5) − 1`

### Card 4: Seat Share Y5
- **Label:** `SEAT SHARE Y5`
- **Value:** Purple percentage (e.g. `66%`)
- **Subtitle:** `was 100% · seats -50%` (showing erosion from baseline)
- **Formula:** `Seat Revenue Y5 / Total Revenue Y5 × 100`

---

## 5. Input Panel (Left Sidebar)

Scrollable left column, approximately 280–300px wide. Six labeled sections with color-coded section headers. Each input row: label on left, current value on right, slider spanning full width below.

### Section 1: BASE METRICS
*Color: dark navy/blue*

| Slider | Range | Step |
|--------|-------|------|
| Starting Seats | 1,000 – 100,000 | 500 |
| Annual Seat Price | $100 – $10,000 | $50 |

### Section 2: SEAT DYNAMICS
*Color: dark navy/blue*

| Slider | Range | Step | Subtitle |
|--------|-------|------|----------|
| Annual Seat Attrition | 0% – 30% | 1% | *AI-driven seat displacement* |
| Per-Seat Price Increase | 0% – 30% | 1% | *AI-enhanced seat value uplift* |
| New Customer Growth | 0% – 20% | 1% | *Market penetration expansion* |

### Section 3: AGENT WORKFLOWS
*Color: purple*

| Slider | Range | Step |
|--------|-------|------|
| Y1 Adoption | 0% – 30% | 1% |
| Adoption Growth YoY | 0% – 100% | 1% |
| Rev Per Customer Unit | $100 – $5,000 | $50 |
| Agent Price Growth | 0% – 30% | 1% |

### Section 4: CONSUMPTION / USAGE
*Color: teal/green*

| Slider | Range | Step |
|--------|-------|------|
| Y1 Adoption | 0% – 30% | 1% |
| Adoption Growth YoY | 0% – 100% | 1% |
| Rev Per Unit | $50 – $3,000 | $50 |
| Usage Price Growth | 0% – 20% | 1% |

### Section 5: PLATFORM FEES
*Color: orange/amber*

| Slider | Range | Step |
|--------|-------|------|
| Y1 Adoption | 0% – 40% | 1% |
| Adoption Growth YoY | 0% – 60% | 1% |
| Platform Fee | $500 – $10,000 | $100 |
| Fee Price Growth | 0% – 20% | 1% |

### Section 6: OUTCOME-BASED
*Color: red/coral*

| Slider | Range | Step | Note |
|--------|-------|------|------|
| Y1 Adoption | 0% – 15% | 1% | Subtitle: *Limited applicability* |
| Adoption Growth YoY | 0% – 60% | 1% | |
| Rev Per Unit | $100 – $3,000 | $50 | |
| Outcome Price Growth | 0% – 25% | 1% | |

---

## 6. Computation Model

All computation is client-side. Recalculates on every slider change with no debounce (calculations are trivial at this scale).

### Year 0 (Base)
```
Base Revenue = Starting Seats × Annual Seat Price
```

### Seat Revenue (Years 1–5)
```
Each Year:
  Seats Lost    = Prior Seats × Attrition%
  Seats Added   = Prior Seats × New Customer Growth%
  Net Seats     = Prior Seats × (1 − Attrition% + Growth%)
  Seat Price    = Prior Price × (1 + Per-Seat Price Increase%)
  Seat Revenue  = Net Seats × Seat Price
```

### Agent Workflows (Years 1–5)
```
Year 1:
  Adopters     = Base Seats × Y1 Adoption%
  Rev/Unit     = starting Rev Per Customer Unit
  Agent Rev    = Adopters × Rev/Unit

Years 2–5:
  Adopters     = min(Prior Adopters × (1 + Adoption Growth YoY%), Base Seats × 0.85)
  Rev/Unit     = Prior Rev/Unit × (1 + Agent Price Growth%)
  Agent Rev    = Adopters × Rev/Unit
```
**Ceiling:** 85% of Base Seats

### Consumption / Usage (Years 1–5)
```
Year 1:
  Adopters         = Base Seats × Y1 Adoption%
  Consumption Rev  = Adopters × Rev Per Unit

Years 2–5:
  Adopters         = min(Prior Adopters × (1 + Adoption Growth YoY%), Base Seats × 0.90)
  Rev/Unit         = Prior Rev/Unit × (1 + Usage Price Growth%)
  Consumption Rev  = Adopters × Rev/Unit
```
**Ceiling:** 90% of Base Seats

### Platform Fees (Years 1–5)
```
Year 1:
  Adopters      = Base Seats × Y1 Adoption%
  Platform Rev  = Adopters × Platform Fee

Years 2–5:
  Adopters      = min(Prior Adopters × (1 + Adoption Growth YoY%), Base Seats × 0.70)
  Fee           = Prior Fee × (1 + Fee Price Growth%)
  Platform Rev  = Adopters × Fee
```
**Ceiling:** 70% of Base Seats

### Outcome-Based (Years 1–5)
```
Year 1:
  Adopters      = Base Seats × Y1 Adoption%
  Outcome Rev   = Adopters × Rev Per Unit

Years 2–5:
  Adopters      = min(Prior Adopters × (1 + Adoption Growth YoY%), Base Seats × 0.25)
  Rev/Unit      = Prior Rev/Unit × (1 + Outcome Price Growth%)
  Outcome Rev   = Adopters × Rev/Unit
```
**Ceiling:** 25% of Base Seats (tightest — structural adoption constraints)

### Derived Outputs
```
Total Revenue (each year) = Seat Rev + Agent Rev + Consumption Rev + Platform Rev + Outcome Rev
YoY Growth%               = (Current Total − Prior Total) / Prior Total × 100
Seat Share%               = Seat Rev / Total Rev × 100
5-Year CAGR               = (Y5 Total / Y0 Total)^(1/5) − 1
Revenue Mix               = Each stream's Rev / Total Rev × 100 (per year)
```

---

## 7. Chart Panel (Right Side, Tabbed)

Four tabs. Chart area updates reactively on every slider change.

### Tab 1: Revenue Stack *(default active)*

- **Chart type:** Smooth stacked area chart
- **Title:** `STACKED REVENUE BY PRICING MODALITY`
- **X-axis:** `Base, Y1, Y2, Y3, Y4, Y5`
- **Y-axis:** Auto-scaled dollar amounts (e.g. `$3.9M`, `$7.8M`, `$11.7M`)
- **Y-axis formatting:** Abbreviate to `$XM` or `$X.XM`
- **Series (5 layers, bottom to top):**

| Layer | Stream | Color |
|-------|--------|-------|
| 1 (bottom) | Seats | Blue `#6B9FD4` |
| 2 | Platform Fees | Orange `#F5A623` |
| 3 | Agent Workflows | Purple `#9B59B6` |
| 4 | Consumption | Green `#27AE60` |
| 5 (top) | Outcome-Based | Red `#E74C3C` |

- **Legend:** Horizontal, above chart, colored dots + stream labels
- **Tooltip on hover:** Show year + value per stream + total

### Tab 2: Revenue Mix

- **Chart type:** Stacked bar chart (100% normalized per year) OR grouped percentage bars
- **Title:** `REVENUE MIX BY STREAM`
- **X-axis:** `Base, Y1, Y2, Y3, Y4, Y5`
- **Y-axis:** 0% – 100%
- **Series:** Same 5 streams, same colors
- **Shows:** How seat % erodes and new streams grow as a share of total revenue over time

### Tab 3: Growth & Seats

- **Chart type:** Combo — bar chart + line chart, dual Y-axes
- **Title:** `YOY REVENUE GROWTH & SEAT COUNT TRAJECTORY`
- **Left Y-axis:** Revenue Growth % (bars, blue)
- **Right Y-axis:** Seat Count in thousands (line, red)
- **X-axis:** `Y1, Y2, Y3, Y4, Y5`
- **Tooltip on hover:** Year label + `Revenue Growth: X%` + `Seats: X.XK`

### Tab 4: Model Reference

Static documentation view. Not a chart — scrollable reference content.

**Layout:**
1. One-paragraph model overview
2. Flow diagram: `Base Seats × Seat Price → Apply Attrition & New Growth → + Agent Revenue → + Consumption Revenue → + Platform Fee Revenue → + Outcome Revenue → Total Revenue`
   - Boxes connected by `→` arrows
   - Final "Total Revenue" box in green/highlighted
3. Six parameter sections, each containing:
   - Section header (color-coded, matching sidebar)
   - For each parameter:
     - **Name** (bold) + Range (smaller, muted)
     - Description paragraph
     - Formula box (right-aligned, color-coded by timing: Year 0 = teal, Each Year = blue, Revenue = green)
4. Key relationship callout box (highlighted):
   > *"Three forces act on seat revenue each year. Attrition removes seats (AI displacement), New Customer Growth adds seats (market expansion), and Price Increase raises the value of each remaining seat."*

---

## 8. Export Functionality

### Export CSV
Downloads a flat CSV with columns: `Year, Seat Revenue, Agent Revenue, Consumption Revenue, Platform Revenue, Outcome Revenue, Total Revenue, YoY Growth%, Seat Share%, CAGR`

Rows: Base, Y1, Y2, Y3, Y4, Y5

### Export JSON
Downloads full model state:
```json
{
  "scenario": "Custom",
  "inputs": { /* all 21 slider values */ },
  "outputs": {
    "base": { "seats": 7000, "seatRevenue": 8400000, ... },
    "y1": { ... },
    "y2": { ... },
    "y3": { ... },
    "y4": { ... },
    "y5": { ... }
  },
  "kpis": {
    "baseRevenue": 8400000,
    "y5Revenue": 26000000,
    "cagr": 0.206,
    "seatShareY5": 0.33
  }
}
```

---

## 9. Visual Design Spec

### Layout
```
┌─────────────────────────────────────────────────────────────────┐
│ Header: Title + Subtitle                      [CSV] [JSON]       │
├─────────────────────────────────────────────────────────────────┤
│ [Custom] [Bear Case] [Base Case] [Bull Case]                     │
├─────────────────────────────────────────────────────────────────┤
│ [Base Revenue] [Year 5 Revenue] [5-Year CAGR] [Seat Share Y5]   │
├───────────────────┬─────────────────────────────────────────────┤
│                   │ [Revenue Stack][Revenue Mix][Growth & Seats] │
│  Input Sliders    │               [Model Reference]             │
│  (scrollable)     │                                             │
│                   │           Chart Area                        │
│                   │                                             │
│                   │                                             │
└───────────────────┴─────────────────────────────────────────────┘
```

### Colors
```css
--color-seats:        #6B9FD4;  /* blue */
--color-platform:     #F5A623;  /* orange */
--color-agent:        #9B59B6;  /* purple */
--color-consumption:  #27AE60;  /* green */
--color-outcome:      #E74C3C;  /* red */

--color-positive:     #27AE60;  /* green — positive CAGR, growth */
--color-negative:     #E74C3C;  /* red — negative CAGR, decline */
--color-neutral:      #3B5EA6;  /* blue — large neutral values */
--color-seat-share:   #8B5CF6;  /* purple — seat share % */

--section-base:       #1E3A5F;  /* dark navy */
--section-agent:      #7C3AED;  /* purple */
--section-consumption:#0D9488;  /* teal */
--section-platform:   #D97706;  /* amber */
--section-outcome:    #DC2626;  /* red */

--bg-page:            #FFFFFF;
--bg-card:            #F8F9FA;
--bg-sidebar:         #FAFAFA;
--border:             #E5E7EB;
--text-primary:       #111827;
--text-muted:         #6B7280;
```

### Typography
- Header title: Large, bold (32px+)
- Section headers: All-caps, 11px, letter-spaced, color-coded
- Slider labels: 14px regular
- Slider values: 14px, right-aligned, semibold
- KPI values: 28–32px, bold, color-coded
- KPI labels: 11px all-caps, muted

### Slider Styling
- Track: light gray
- Filled track: matches section color
- Thumb: white circle with colored border, slight drop shadow
- Label + value inline above slider

### Scenario Tab Styling
- Inactive: ghost/outline button
- Active (Bear/Base/Bull): filled button, dark background
- Active (Custom): outlined with **green** border

---

## 10. Technical Requirements

### Stack
- **Framework:** React (functional components + hooks)
- **Charting:** Recharts (preferred) or Chart.js
- **Styling:** CSS Modules or Tailwind — no component library required
- **State:** Single `useState` object holding all 21 input values + active scenario
- **No backend** — all math computed client-side

### State Shape
```typescript
interface ModelInputs {
  // Base Metrics
  startingSeats: number;           // default: 7000
  annualSeatPrice: number;         // default: 1200

  // Seat Dynamics
  seatAttrition: number;           // default: 0.15 (15%)
  perSeatPriceIncrease: number;    // default: 0.05
  newCustomerGrowth: number;       // default: 0.02

  // Agent Workflows
  agentY1Adoption: number;         // default: 0.03
  agentAdoptionGrowthYoY: number;  // default: 0.30
  agentRevPerUnit: number;         // default: 500
  agentPriceGrowth: number;        // default: 0.05

  // Consumption / Usage
  consumptionY1Adoption: number;   // default: 0.04
  consumptionAdoptionGrowth: number; // default: 0.25
  consumptionRevPerUnit: number;   // default: 250
  consumptionPriceGrowth: number;  // default: 0.02

  // Platform Fees
  platformY1Adoption: number;      // default: 0.08
  platformAdoptionGrowth: number;  // default: 0.15
  platformFee: number;             // default: 2000
  platformFeeGrowth: number;       // default: 0.03

  // Outcome-Based
  outcomeY1Adoption: number;       // default: 0.01
  outcomeAdoptionGrowth: number;   // default: 0.15
  outcomeRevPerUnit: number;       // default: 300
  outcomePriceGrowth: number;      // default: 0.05
}

type Scenario = 'bear' | 'base' | 'bull' | 'custom';
```

### Output Shape (computed, not stored in state)
```typescript
interface YearData {
  seats: number;
  seatRevenue: number;
  agentAdopters: number;
  agentRevenue: number;
  consumptionAdopters: number;
  consumptionRevenue: number;
  platformAdopters: number;
  platformRevenue: number;
  outcomeAdopters: number;
  outcomeRevenue: number;
  totalRevenue: number;
  yoyGrowth: number | null;       // null for Base year
  seatShare: number;
}

type ModelOutput = {
  base: YearData;
  y1: YearData;
  y2: YearData;
  y3: YearData;
  y4: YearData;
  y5: YearData;
  cagr: number;
};
```

### Performance
- All 5 streams × 6 years = ~30 calculations per slider change
- No debounce needed — synchronous compute is well under 1ms
- Charts should update within a single React render cycle

### File Structure (suggested)
```
/src
  /components
    Header.tsx
    ScenarioTabs.tsx
    KpiCards.tsx
    InputPanel.tsx
      SliderInput.tsx
      SectionHeader.tsx
    ChartPanel.tsx
      RevenueStackChart.tsx
      RevenueMixChart.tsx
      GrowthSeatsChart.tsx
      ModelReference.tsx
  /utils
    compute.ts        ← all financial model logic
    formatters.ts     ← $XM, X.X%, X.XK helpers
    presets.ts        ← bear/base/bull preset objects
    exporters.ts      ← CSV and JSON export functions
  /types
    model.ts          ← ModelInputs, ModelOutput, YearData, Scenario
  App.tsx
  index.css
```

---

## 11. Adoption Ceilings Reference

| Stream | Ceiling | Rationale |
|--------|---------|-----------|
| Agent Workflows | **85%** of Base Seats | Not all customers need or can adopt agent workflows |
| Consumption / Usage | **90%** of Base Seats | Lowest adoption friction — highest ceiling |
| Platform Fees | **70%** of Base Seats | Limited to customers large enough for committed tiers |
| Outcome-Based | **25%** of Base Seats | Structural challenges defining and measuring outcomes at scale |

---

## 12. Detailed Projections Table

A reactive data table displayed below the chart panel, updating on every slider change alongside the charts and KPI cards.

### Section Title
`DETAILED PROJECTIONS` — small, all-caps, muted label above the table (matching the chart section title style)

### Columns

| Column | Header | Format | Color |
|--------|--------|--------|-------|
| Row label | — | Base, Y1, Y2, Y3, Y4, Y5 | Bold |
| Seats | `Seats` | Plain integer with comma (e.g. `10,000`) | Default |
| Per-seat price | `$/Seat` | Dollar format (e.g. `$1,200`) | Default |
| Seat Revenue | `Seat Rev` | Abbreviated (e.g. `$12.0M`, `$400K`) | Blue `#6B9FD4` |
| Agent Revenue | `Agent` | Abbreviated (e.g. `$400K`, `$4.6M`) | Purple `#9B59B6` |
| Consumption Revenue | `Usage` | Abbreviated (e.g. `$320K`, `$1.7M`) | Green `#27AE60` |
| Platform Revenue | `Platform` | Abbreviated (e.g. `$4.5M`, `$14.9M`) | Orange `#F5A623` |
| Outcome Revenue | `Outcome` | Abbreviated (e.g. `$120K`, `$502K`) | Red `#E74C3C` |
| Total Revenue | `Total` | Abbreviated, **bold** (e.g. `$18.5M`) | Default, bold |
| Year-over-year growth | `YoY %` | `—` for Base row; `+54.3%` green for all other rows | Green |
| Seat percentage | `Seat %` | Percentage (e.g. `100%`, `71%`) | Purple `#8B5CF6` |

### Abbreviation Rules
```
≥ 1,000,000  → $X.XM   (e.g. $12.0M, $4.6M)
≥ 1,000      → $XXXK   (e.g. $400K, $172K)
< 1,000      → $XXX    (e.g. $502)
```

### Row Behavior
- **Base row:** YoY% shows `—`, Seat% shows `100%`
- **Y1–Y5 rows:** YoY% shows green `+X.X%` delta vs prior year
- All values update reactively as sliders are dragged

### Layout
- Full width below the chart panel
- Light gray header row
- Subtle alternating row backgrounds (white / very light gray) for readability
- Right-align all numeric columns
- Left-align row labels (Base, Y1, Y2, Y3, Y4, Y5)

---

## 13. Out of Scope (v1)


- User accounts / saved models
- Multi-company comparison
- PDF export
- Mobile responsiveness (desktop-first, min-width: 1100px)
- Backend / server-side computation
- Real-time collaboration

---

## 14. Acceptance Criteria

- [ ] All 21 sliders render with correct ranges and default (Bear Case) values
- [ ] Dragging any slider instantly updates all 4 KPI cards and all chart tabs
- [ ] Bear/Base/Bull scenario buttons snap all sliders to correct preset values
- [ ] Any slider movement switches active tab to "Custom" with green border
- [ ] Revenue Stack chart shows 5 correct color-coded stacked areas across Base–Y5
- [ ] Growth & Seats combo chart shows bar + line with dual Y-axes and correct tooltip
- [ ] Model Reference tab renders static documentation with flow diagram and formula boxes
- [ ] Adoption ceilings are enforced: agent 85%, consumption 90%, platform 70%, outcome 25%
- [ ] CAGR is green when positive, red when negative
- [ ] Y5 Revenue delta vs Base shows correct ▲/▼ with correct percentage
- [ ] Export CSV downloads valid CSV with all 6 rows and correct values
- [ ] Export JSON downloads valid JSON with full inputs + outputs
- [ ] Detailed Projections table renders below chart panel with all 11 columns
- [ ] Table updates reactively on every slider change
- [ ] Base row shows `—` for YoY% and `100%` for Seat%
- [ ] Revenue columns are correctly color-coded per stream
- [ ] Abbreviation formatting correct: $X.XM for millions, $XXXK for thousands
- [ ] Total column is bold
- [ ] Seat% column is purple
