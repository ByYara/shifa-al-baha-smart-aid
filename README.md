# Al-Baha Smart Heal

Build a bilingual (Arabic default / English) prototype for "Shifa Al-Baha Al-Thaki" (Smart Al-Baha Healing), designed as a smart service embedded within the official Emirate of Al-Baha e-government portal (never describe as standalone or a website; always state "the Shifa Al-Baha Smart Service, embedded within the Emirate of Al-Baha portal").

Key Requirements:
1. Branding & Header:
- Persistent portal top header showing Emirate of Al-Baha affiliation, official emblem/crest, portal breadcrumb, and a toggle for Arabic (RTL, default) / English (LTR).
- Saudi official government visual theme: deep official green, refined gold accents, crisp off-white/light backgrounds, formal and trustworthy medical typography and iconography.

2. Interactive Multi-Stage Citizen Journey (with step counter and stage title):
- Entry: Nafath single sign-on verification screen coming from the Al-Baha portal for medical evacuation/treatment request.
- Step 1 - Conversational Triage: Smart assistant asking 5-7 clear structured questions (patient identity, current location, hospital status, diagnosis, stability, ICU need) with fixed critical emergency notice.
- Step 2 - Medical Document Extraction: Upload medical report (PDF/image preview), automated extraction card (extracted diagnosis, severity level, specialty, bed type, completeness score) with trial AI disclaimer.
- Step 3 - AI Priority Classification: Urgency level (Urgent/Moderate), clinical reasons, and note confirming final physician decision.
- Step 4 - Smart Hospital Matching: Cards/table of Al-Baha hospitals with compatibility %, available bed, distance, ETA, highlighting best match with "Send Request" action.
- Step 5 - Hospital Acceptance: Acceptance confirmation with assigned bed #, department, attending physician, and timestamp.
- Step 6 - Transport Dispatch: Comparison of ICU Ambulance, Air Evacuation (Helicopter), and Standard Ambulance with readiness, ETA, recommended badge, and operations approval trigger.
- Step 7 - Live Tracking: Case timeline from dispatch to arrival with simulated route map (current facility -> transport -> destination).
- Step 8 - Handover & Impact Metrics: Patient handover confirmation, impact dashboard comparing traditional response hours vs. Shifa smart service minutes, coordinated entities count.
- Step 9 - Satisfaction Survey: 3-question feedback form (ease of request, response speed, update clarity).

3. Three Additional Dashboards (accessible via top/side role switcher):
- Physician Dashboard: Queue of requests with priority tags and review actions.
- Hospital Bed Management Dashboard: Inbound cases, accept/reject actions, bed capacity controls.
- Central Operations Command: Key metrics (critical cases, average response time, regional bed occupancy, simulated GIS overview).

4. Data & Disclaimers:
- Fully populated interactive mock data allowing seamless step-by-step progression.
- Clear disclaimers on simulated data, AI trial extraction, and emergency services.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://shifa-al-baha-smart-aid.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/85c5ef83-6805-4c35-a0da-b91deddade51).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
