# Fluba Admin — AI Seats (Brain Scorecards)

This build adds an **AI Seats** tab in /admin.

## What it does
Fluba calls Brain control endpoints (Option B):
- GET /control/seats/scorecards
- GET /control/seats/:seatId/reports?limit=30
- GET /control/jobs/:jobId/timeline

## Config
In the AI Seats tab, set:
- Brain base URL (stored in Firestore: brain_control/config.baseUrl)

## Auth
The module sends the current user's Firebase ID token as:
Authorization: Bearer <idToken>

Brain must verify:
- token validity
- admin claim OR allowlist

## Files added/changed
- web/src/admin/AiSeatsModule.tsx (NEW)
- web/src/pages/Admin.tsx (updated tabs)
- web/src/styles/global.css (small UI helpers)
