# Shifa Al-Baha Smart Service — Bilingual Prototype

A clickable prototype of the Shifa Al-Baha Smart Service, embedded within the Emirate of Al-Baha portal. Arabic (right-to-left) is the default language, with an English toggle. All data is simulated.

## Look and feel

- Saudi official government theme: deep official green, refined gold accents, crisp off-white backgrounds.
- Formal medical typography: Arabic headings in a serif official face, clean body text; English pairs a serif display with a neutral sans.
- Persistent portal header on every screen: Emirate of Al-Baha emblem, affiliation line, portal breadcrumb (Al-Baha Portal → e-Services → Shifa Al-Baha Smart Service), language toggle, and a role switcher.

## Screens

**Entry** — Nafath single sign-on verification, arriving from the Al-Baha portal for a medical evacuation/treatment request. Shows a 2-digit Nafath number and a simulated confirmation.

**Citizen journey** (step counter + stage title on each step):
1. Conversational triage — smart assistant asks 6 structured questions (patient identity, location, hospital status, diagnosis, stability, intensive care need). A fixed critical-emergency notice stays visible.
2. Medical document extraction — upload a report (PDF/image preview) and see an extraction card: diagnosis, severity, specialty, bed type, completeness score, with a trial-AI disclaimer.
3. Priority classification — urgency level (Urgent / Moderate), clinical reasons, and a note that the final decision rests with the treating physician.
4. Hospital matching — Al-Baha hospital cards with compatibility %, available bed, distance, estimated arrival; best match highlighted with a Send Request action.
5. Hospital acceptance — confirmation with assigned bed number, department, attending physician, timestamp.
6. Transport dispatch — intensive-care ambulance vs. air evacuation vs. standard ambulance, each with readiness and arrival time; a recommended badge and an operations approval action.
7. Live tracking — case timeline from dispatch to arrival plus a simulated route illustration (current facility → transport → destination).
8. Handover and impact — handover confirmation and an impact panel comparing traditional response in hours against the smart service in minutes, plus the count of coordinated entities.
9. Satisfaction survey — three questions: ease of request, response speed, clarity of updates.

**Physician dashboard** — request queue with priority tags and review actions.

**Hospital bed management** — inbound cases with accept/reject, plus bed capacity controls per department.

**Central operations command** — critical cases, average response time, regional bed occupancy, and a simulated regional overview map.

Every screen carries disclaimers: simulated data, trial AI extraction, and a reminder to call emergency services for real emergencies.

## Technical notes

- Routes: `/` (Nafath entry) plus `/journey`, `/physician`, `/hospital`, `/operations`, each with its own page metadata.
- A language context provides Arabic/English dictionaries and sets `dir`/`lang`; Arabic is the default.
- Journey state lives in one client store so steps unlock progressively; all hospital, transport, and metric records come from a single mock-data module.
- Green/gold theme added as semantic tokens in the stylesheet; shared header, step rail, and card components reused across roles.
- No backend — everything runs in the browser.
