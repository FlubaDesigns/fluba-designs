# Production Acceptance Checklist (v1)

## Must-pass gates
- [ ] Plane runs end-to-end with `HARNESS_MODE=local` (no Brain/Conscience required)
- [ ] Plane runs end-to-end with `HARNESS_MODE=brain` (routes privileged flows to Brain)
- [ ] Brain calls Conscience for every routed job (no bypass)
- [ ] Authz on Brain control endpoints (admin/operator only)
- [ ] Pub/Sub DLQ configured + monitored
- [ ] Idempotency enforced on webhooks and intents (`requestId`)

## Security
- [ ] Stripe webhook signature verification + idempotent processing (AI‑COMMS)
- [ ] Secrets stored server-side only (Secret Manager preferred); never returned to UI
- [ ] Firestore rules block client writes to privileged fields/collections

## Reliability / Ops
- [ ] Explicit timeouts/retries for Conscience call + callbacks
- [ ] Structured JSON logging: planeId, intentType, jobId, requestId, decisionId, severity
- [ ] Incidents emitted for policy blocks, conscience outages, repeated failures, DLQ hits

## Deploy
- [ ] Separate staging/prod envs
- [ ] Health checks (`/healthz`) for Brain + Conscience
- [ ] Smoke tests: deny → require approval → approve → execute → result
