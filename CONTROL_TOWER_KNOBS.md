# Fluba Control Tower – Standardized Knob Spec (v1)

**Purpose:** A single, consistent knob set per `planeId` that Fluba Admin can render and Brain can enforce.
**Rule:** Fluba reads/writes knobs **only via Brain Control API**. Planes never touch Conscience.

## Universal Plane Knobs (Top 20)

### Execution & Intake
1. `pause_all` (bool) — stop all execution for this plane.
2. `pause_new_intents` (bool) — block new intents; allow in-flight to finish.
3. `allowed_intent_types` (string[]) — allowlist of enabled lanes.
4. `blocked_intent_types` (string[]) — denylist override.

### Rate Limiting & Load Control
5. `max_intents_per_minute` (number)
6. `max_intents_per_actor_per_minute` (number)
7. `max_payload_bytes` (number)
8. `max_concurrent_jobs` (number)
9. `max_delivery_attempts` (number)

### Governance & Approval
10. `require_human_approval` (bool)
11. `approval_required_intent_types` (string[])
12. `approval_risk_score_threshold` (number)
13. `fail_closed_on_conscience_error` (bool)
14. `buffer_hours_default` (number)

### Security / Abuse
15. `blocked_actor_uids` (string[])
16. `allowed_actor_uids` (string[]) — optional allowlist-only mode.
17. `blocked_source_apps` (string[])
18. `strict_mode` (bool)

### Observability & Escalation
19. `alert_severity_threshold` ("low"|"medium"|"high"|"critical")
20. `escalation_channels` (object) — e.g. `{ "fluba_ui": true, "email": false }`

## AI‑COMMS Add‑On Knobs
Billing/Entitlement:
- `require_active_subscription_for_intents` (bool)
- `allow_free_trial_intent_types` (string[])
- `max_audits_per_billing_period` (number)
- `grace_period_days` (number)

Workflow:
- `enable_risk_scan_submit` (bool)
- `enable_evidence_pack_ingest` (bool)
- `enable_contract_generation` (bool)
- `max_evidence_files` (number)
- `max_evidence_total_bytes` (number)

Email:
- `email_notifications_enabled` (bool)
- `email_send_rate_limit_per_hour` (number)
- `escalate_on_webhook_failures` (bool)

## Storage Model (Brain)
`control_planes/{planeId}/knobs/{knobKey}`
```json
{
  "value": "any",
  "updatedAt": "serverTimestamp",
  "updatedBy": "operatorUid"
}
```
