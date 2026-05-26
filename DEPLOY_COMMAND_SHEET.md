# Deploy Command Sheet (Template)

> Replace placeholders (PROJECT_ID, REGION, TOPIC, SUB, URLS).

## Brain
- Deploy worker / runtime
- Deploy control API (HTTP) if used
- Configure Pub/Sub subscription + DLQ

## Conscience (Guardrails)
- Deploy as Cloud Run or Functions (HTTP)
- Set `CONSCIENCE_EVAL_URL` in Brain

## AI‑COMMS
- Deploy Functions + Hosting
- Set `HARNESS_MODE=local` (standalone) OR `HARNESS_MODE=brain`
- If brain mode, set `BRAIN_BASE_URL` or Pub/Sub target

## Fluba
- Deploy Hosting + Functions
- Configure Brain base URL for control tower calls

## DLQ (GCP)
- Create DLQ topic
- Set subscription dead-letter policy + max delivery attempts
