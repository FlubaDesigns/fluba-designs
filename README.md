# Fluba Designs — AI Control Tower & Platform Orchestration

Multi-AI orchestration platform with AI governance, creator economy, and viral distribution engine.

## What is Fluba Designs?

Fluba Designs is a unified system that allows businesses to:
- **Orchestrate multiple AI providers** (Claude, GPT, Gemini, etc.) in a Courtroom with Support/Oppose/Neutral reasoning
- **Deploy governed AI safely** through Brain (orchestration) + Conscience (AI-Guardrails)
- **Distribute content virally** via QR Gear (creator marketplace)
- **Manage advertising across all platforms** with one-click deployment
- **Monetize through credits** (per AI call, per artifact, per feature)

## Core Platforms

1. **Fluba Web** — Control Tower & Admin Dashboard
2. **Brain v1** — Orchestration Engine with Pub/Sub Job Processing
3. **Conscience** — AI-Guardrails & Policy Enforcement
4. **Conductor** — Multi-Agent Orchestration UI
5. **QR Gear** — Creator Marketplace with Revenue Share
6. **Kingdom Connects** — Faith-Based Directory
7. **Pollsit** — Real-Time Polling Platform
8. **AfterSignal** — Dead Man's Switch with Encryption

## Architecture

User → Fluba Web (Control Tower) → Brain (Orchestration) → Conscience (Governance) → Execution

## Tech Stack

- **Frontend:** React 18 + TypeScript + Vite
- **Backend:** Firebase (Firestore, Cloud Functions, Hosting)
- **Auth:** Firebase Auth
- **Messaging:** Google Cloud Pub/Sub
- **Payments:** Stripe
- **CI/CD:** GitHub Actions

## Deployment

### Quick Start
```bash
npm install
npm run dev
```

### Deploy to Firebase
```bash
npm run build
npm run deploy
```

### GitHub Actions (Automated)
Push to main → GitHub Actions runs tests → Deploys to Firebase

## File Structure

```
fluba-designs/
├── client/              # React frontend
├── functions/           # Cloud Functions
├── services/            # Standalone services
├── server/              # Express (dev)
├── scripts/             # Deploy scripts
├── firestore.rules      # Firestore security
└── firebase.json        # Firebase config
```

## Next Steps

1. Install dependencies: `npm install`
2. Set Firebase config in `.env`
3. Run locally: `npm run dev`
4. Deploy: `npm run deploy`

---

**Status:** Pre-revenue, seed-stage, 7 platforms in development.

**Vision:** $30M-50M valuation by EOY 2026 with 100+ users.
