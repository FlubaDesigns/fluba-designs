# Harness + Control Tower Build Spec (v1)

## Non‑negotiable rules
- **Planes are unplug‑safe**: `HARNESS_MODE=local|brain`.
- **Fluba talks only to Brain** (never Conscience).
- **Brain always gates through Conscience** before any execution/routing.
- **No bypass paths**: all privileged flows in brain mode go through Brain ingress.
- **Projects remain separate** (4 separate deployables).

## Contracts
- `brain_intent_v1`
- `policy_decision_v1`
- `brain_result_v1`

## Brain (Harness) responsibilities
1. Provide **Ingress**: `POST /brain/intents` (or Pub/Sub ingress).
2. Provide **Control API**:
   - `GET/POST /control/plane/:planeId/knobs`
   - `GET /control/plane/:planeId/approvals`
   - `POST /control/plane/:planeId/approvals/:approvalId`
   - `GET /control/plane/:planeId/incidents`
3. Maintain collections:
   - `control_planes/{planeId}/knobs/{key}`
   - `jobs/{jobId}`
   - `approvals/{approvalId}`
   - `incidents/{incidentId}`
4. Worker flow (mandatory):
   - validate → load knobs → call Conscience → deny/approve/allow → route → emit result → log incident

## Conscience (AI‑Guardrails)
Expose `POST /conscience/evaluate`:
- Input: `{ intent, planeKnobs }`
- Output: `{ allow, requireApproval, decisionId, reason, riskScore? }`
Conscience is never called by Fluba or planes.

## Planes (AI‑COMMS first)
- Implement `HarnessProvider.submitIntent()`
- Local mode: existing internal behavior
- Brain mode: call Brain ingress; do not execute locally

## Fluba (Control Tower)
- Plane selector
- Knobs editor (from Brain)
- Approvals queue
- Incidents view
- Health summary
