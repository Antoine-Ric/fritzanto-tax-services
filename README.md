# FritzAnto Tax Services — Website

A simple, fast, mobile-friendly website for FritzAnto Tax Services in Miami, FL, serving clients all around. Hosted free on GitHub Pages.

**Live site:** https://antoine-ric.github.io/fritzanto-tax-services/

## What the site does

- Shows the four services: Life Insurance, Health Insurance, Notary Services, Tax Services
- Open Enrollment callout for health insurance
- Lets a visitor pick a service and either send a message or book a free consultation at a chosen date and time (the form opens their email app addressed to the business, with everything filled in)
- Tap-to-call phone, email link, address with directions, hours

## Update the business details

All business details live in one place at the top of `app.js` — the `CONFIG` object:

- `phoneDisplay` / `phoneHref` — phone number (currently 786-443-5515)
- `email` — dad's email, fgerald68@yahoo.com (set Nov 15, 2026). The form and the "Email us" button both use this one value.
- `addressLines` / `addressOneLine` — 8269 NE 2nd Ave, Miami, FL 33138
- `hours` — Available 7 AM - 7 PM
- `services` — the four services

Edit `CONFIG`, commit, and the live site updates in a minute or two.

## Files

- `index.html` — page content and structure
- `styles.css` — navy + gold styling, mobile-first
- `app.js` — config + booking form behavior

## How the booking form works

The form does not need a server. On submit it validates the fields, builds a pre-addressed email (service, date, time, meeting format — video call, phone, or in person — contact details, message) and opens the visitor's email app. The business confirms the time by phone or email. If a real booking calendar (e.g. Calendly) is added later, it can replace the date/time fields.

## Deployment

Deployed with GitHub Pages from the `main` branch (root). Any push to `main` re-deploys automatically.
