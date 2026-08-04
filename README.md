# Songyah Expats: FEIE Tax Shield

A prototype expat travel tracker for FEIE planning and U.S. presence monitoring.

## What this app does

This app helps you test two IRS qualification pathways for the Foreign Earned Income Exclusion (FEIE):
- **Physical Presence Test (PPT)**
- **Bona Fide Residence Test (BFR)**

It lets you log travel dates and see how US days and foreign days affect your status.

## How the FEIE works

### 1. Physical Presence Test (PPT)
The PPT is a strict, math-based test based on where your body is located each day.

- **330-day rule**: You must spend at least 330 full 24-hour days on foreign soil within any rolling 12-month period.
- **35-day US limit**: You may spend up to 35 days in the US in a 365-day year. Day 36 in the US means the test fails.
- **Travel days**: The day you leave the US and the day you return do not count as foreign days. They count as US days because you spent some of those 24 hours in the US.
- **Rolling year**: The 12-month period can be any rolling 365-day window, not a calendar year.
- **Window overlap**: You may use overlapping 365-day windows, but this can lock up future US travel room.

### 2. Bona Fide Residence Test (BFR)
The BFR is a flexible residency test based on where your life is settled.

- **Full-year rule**: You must be a foreign resident for an uninterrupted period that includes a full calendar year (January 1–December 31).
- **Flexible US travel**: There is no automatic 35-day limit. You can spend longer periods in the US as long as you clearly intend to return abroad.
- **Proof of residency**: The IRS evaluates evidence like housing leases, local bank accounts, local licenses, family relocation, and foreign tax registration.

## Income sourcing rules

- **Foreign-source earned income**: If you are physically working from Mexico, your income is foreign sourced even if your clients or employer are in the US.
- **US-source earned income**: If you work while physically in the US, that income is US sourced and cannot be excluded.

## FEIE caps and proration

- The FEIE caps your tax-free earnings each year. For example, the 2026 cap is **$126,000**.
- Under the BFR, US travel reduces your exclusion cap by the fraction of the year spent in the US.

### Example proration math

- **Income**: $150,000 annual
- **Days in Mexico**: 305
- **Days in US**: 60
- **Prorated FEIE cap**: 305 / 365 × $126,000 = **$105,287.67**
- **US-source income**: 60 / 365 × $150,000 = **$24,657.60**
- **Foreign income remaining**: $150,000 - $24,657.60 = **$125,342.40**
- **Spillover taxable foreign income**: $125,342.40 - $105,287.67 = **$20,054.73**
- **Total taxable income**: $24,657.60 + $20,054.73 = **$44,712.33**

> Remember: the IRS taxes the spillover amount using the stacking rule, not the lowest bracket.

## Double taxation and the Mexican RESICO trap

- The US allows a **Foreign Tax Credit (FTC)** to avoid double taxation.
- In Mexico, the RESICO regime may produce very low local tax (1–2.5% of gross income).
- If your Mexican tax is too low, your FTC may not fully offset your US tax on spillover income.

## Important limits

- FEIE only applies to **earned income**: wages, salary, professional fees.
- It does not protect **passive income** like dividends, capital gains, interest, rental income, or crypto gains.

## How to use this app

1. Open `index.html` in your browser.
2. Use `Get Started with Sample Data` to preload example trips.
3. Check the calculated status and US travel totals.
4. Add or remove real trips to see the effect on PPT/BFR status.

## Example scenarios to test

### Example 1: Physical Presence Test (PPT)
- **Status**: PPT mode
- **US travel**: 30 days total inside a 365-day window
- **Foreign travel**: 340 foreign days in the same 365-day window
- **Sample travel dates**:
  - Mexico: `2026-01-05` to `2026-03-20`
  - US: `2026-03-21` to `2026-04-05` (16 days)
  - Mexico: `2026-04-06` to `2026-12-31`
- This should show a successful PPT qualification because foreign days exceed 330 and US days stay under 35.

### Example 2: Bona Fide Residence Test (BFR)
- **Status**: BFR mode
- **Residency**: full calendar year abroad with legitimate US visits
- **US travel**: 60 days total
- **Sample travel dates**:
  - Mexico: `2026-01-01` to `2026-03-31`
  - US: `2026-04-01` to `2026-04-30` (30 days)
  - Mexico: `2026-05-01` to `2026-07-31`
  - US: `2026-08-01` to `2026-08-30` (30 days)
  - Mexico: `2026-08-31` to `2026-12-31`
- This should show BFR qualification and illustrate how extended US travel reduces your prorated FEIE cap.

## Notes

- This app is a prototype only.
- It provides simplified tracking logic and does not replace professional tax advice.
