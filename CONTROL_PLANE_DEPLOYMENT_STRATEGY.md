# Control Plane Deployment Strategy (Fluba + Brain + Conscience)
Version: 1.0

## Goal
Run the **human-facing control surface** (Fluba Admin) alongside the **Harness** (Brain) and **Policy Gate** (Conscience / Guardrails)
in a single operational "control-plane environment" while preserving **unplug safety** for all planes.

## Recommended Real-World Topology (Single GCP Project)
Use ONE Google Cloud project as the "Fluba Control Plane" project.

Deploy:
1) **Fluba** (UI)
   - Firebase Hosting (web app)
   - Firebase Auth (admin/operator login)
   - Optional: Firebase Functions for UI helpers

2) **Brain**
   - Brain Control API (HTTP) via Cloud Run OR Firebase Functions (HTTPS)
   - Brain Worker (Pub/Sub subscriber) via Cloud Run Job/Service OR Compute (implementation choice)
   - Firestore (control-plane DB): knobs, approvals, incidents, jobs

3) **Conscience (AI-Guardrails)**
   - HTTP service via Cloud Run OR Firebase Functions (HTTPS)
   - Exposes: POST /conscience/evaluate
   - Called ONLY by Brain (never by Fluba or planes)

## Why this does NOT break unplug safety
Planes remain unplug-safe because their dependency is **runtime-configured**:
- `HARNESS_MODE=local` -> plane runs fully standalone
- `HARNESS_MODE=brain` -> plane submits intents to Brain

Where Brain/Conscience are hosted (same project as Fluba) does not force planes to depend on them.

## Minimum Required Interfaces
Brain must provide:
- POST /brain/intents
- GET/POST /control/plane/:planeId/knobs
- GET /control/plane/:planeId/approvals
- POST /control/plane/:planeId/approvals/:approvalId
- GET /control/plane/:planeId/incidents

Conscience must provide:
- POST /conscience/evaluate

## Secrets
Preferred: Google Secret Manager in the control-plane project.
Rule: Fluba can **set** secrets via Brain; secrets are never returned to UI.

## Observability (minimum)
- /healthz endpoints for Brain + Conscience
- Structured JSON logs with: planeId, intentType, jobId, requestId, decisionId, severity
- Pub/Sub DLQ configured (dead-letter topic + max delivery attempts)

## Environment Matrix (high level)
- Fluba: BRAIN_BASE_URL (for control calls)
- Brain: CONSCIENCE_EVAL_URL, Firestore project, Pub/Sub topic/sub, DLQ
- Conscience: optional shared secret for HMAC (if enabled)

## Deployment Order (recommended)
1) Deploy Conscience -> obtain URL
2) Deploy Brain API + Worker -> set CONSCIENCE_EVAL_URL
3) Configure Pub/Sub subscription + DLQ
4) Deploy Fluba UI -> set BRAIN_BASE_URL
5) Smoke tests (deny -> approval -> approve -> execute -> result)

