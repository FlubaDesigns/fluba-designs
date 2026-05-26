# FLUBA Control Plane — Claude Handoff (READ FIRST)
Updated: 2026-03-02

This zip is the **Fluba Designs Control Plane** (Today Dashboard + Bills + Business modules).
It is a standalone Firebase web + functions project.

## Read in order
1) `README_DEPLOY.md` (root)
2) `Deploy/ToDo.txt` (updated for this zip name)
3) `HARDENING_NOTES.md` (root)

## What changed in this hardened build
- Cloud Function `submitPatchRequest` now uses `serverTimestamp()` for `createdAt` (tamper-resistant ordering).

## Deploy
Follow `Deploy/ToDo.txt` exactly. It assumes you unzip:
- `FLUBA_CONTROLPLANE_TODAY_BUSINESS_HARDENED_v2.zip`

into a folder with the same name (without .zip), then deploy from there.


---

## Zero-confusion commands
Read: `CLAUDE/DEPLOY_COMMAND_SHEET.md`
