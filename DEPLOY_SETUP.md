# FD Deploy Setup — GitHub Actions + Firebase

## What You're Getting

1. **Automated deployments** — Push to GitHub → Deploy to Firebase automatically
2. **Deploy dashboard** — One-button deploy from FD admin panel
3. **No Replit cost** — GitHub Actions is free, Firebase hosting is free tier
4. **Live logs** — Watch deployments happen in real-time on your phone

---

## Step 1: Upload These Files to GitHub

Your `fluba-designs` repo needs these files:

### Files to Create:

1. **README.md** (in root)
2. **.gitignore** (in root)
3. **.github/workflows/deploy.yml** (new folder structure)
4. **admin/components/DeployDashboard.tsx** (new folder)

### How to Upload (via GitHub Web UI):

**For README.md and .gitignore:**
1. Go to https://github.com/flubadesigns/fluba-designs
2. Click **Add file** → **Create new file**
3. Paste the content
4. Name it (README.md or .gitignore)
5. Click **Commit changes**

**For .github/workflows/deploy.yml:**
1. Click **Add file** → **Create new file**
2. Name it: `.github/workflows/deploy.yml`
3. Paste the content
4. Click **Commit changes**

**For admin/components/DeployDashboard.tsx:**
1. Click **Add file** → **Create new file**
2. Name it: `admin/components/DeployDashboard.tsx`
3. Paste the content
4. Click **Commit changes**

---

## Step 2: Add Firebase Service Account to GitHub Secrets

This allows GitHub Actions to deploy to Firebase.

1. Go to https://github.com/flubadesigns/fluba-designs/settings/secrets/actions
2. Click **New repository secret**
3. **Name:** `FIREBASE_SERVICE_ACCOUNT_FD`
4. **Value:** Paste your `flubadesigns-25482-firebase-adminsdk-*.json` file contents
5. Click **Add secret**

---

## Step 3: Add Deploy Dashboard to FD Admin

In your FD Replit, add the Deploy Dashboard component to your admin pages:

1. Copy **DeployDashboard.tsx** to `client/src/pages/admin/`
2. Import it in your admin router:
   ```jsx
   import DeployDashboard from './DeployDashboard';
   ```
3. Add a route:
   ```jsx
   <Route path="/admin/deploy" element={<DeployDashboard />} />
   ```
4. Add navigation link in admin sidebar
5. Deploy to Replit

---

## Step 4: Test the Setup

### Option A: Manual Deploy (via GitHub UI)
1. Go to https://github.com/flubadesigns/fluba-designs/actions
2. Click **Deploy FD to Firebase** workflow
3. Click **Run workflow** → **Run workflow**
4. Watch the build run in real-time

### Option B: Auto Deploy
1. Make a small change to README.md in GitHub
2. Commit it
3. GitHub Actions automatically triggers
4. Check the Actions tab for logs

### Option C: From FD Admin (once integrated)
1. Navigate to FD Admin → Deploy
2. Select platforms
3. Click **Deploy**
4. Watch logs stream live

---

## What Happens When You Deploy

1. **GitHub Actions triggers** (manual or on push)
2. **Node 18 starts up**
3. **npm install** (installs dependencies)
4. **npm run build** (builds client + functions)
5. **Firebase deploy** (pushes to firebaseapp.com)
6. **Live** ✓

---

## Troubleshooting

### Deploy fails with "FIREBASE_SERVICE_ACCOUNT_FD not found"
- Make sure you added the secret to GitHub Secrets
- Double-check the name: `FIREBASE_SERVICE_ACCOUNT_FD`

### "Cannot find module" errors
- Make sure `package.json` exists in `client/` and `functions/` dirs
- Run `npm install` locally first

### Logs not appearing in Deploy Dashboard
- Dashboard component needs backend API endpoint at `/api/deploy/:platform`
- For now, just check GitHub Actions tab for full logs

---

## Cost Breakdown

| Service | Cost | Notes |
|---------|------|-------|
| GitHub Actions | Free | 2,000 free minutes/month |
| Firebase Hosting | Free tier | Up to 10GB/month |
| Cloud Functions | Free tier | Up to 2M calls/month |
| Firestore | Free tier | Up to 25K reads/month |
| **Total** | **$0** | Full stack free until scale |

---

## Next Steps

1. ✅ Upload files to GitHub
2. ✅ Add Firebase secret
3. ✅ Integrate Deploy Dashboard into FD admin
4. ✅ Test manual deploy
5. ⏳ Set up auto-deploy on push (optional)
6. ⏳ Monitor GitHub Actions for issues

---

## Files Included

- `README.md` — Project overview
- `.gitignore` — Ignore node_modules, .env, etc.
- `.github/workflows/deploy.yml` — GitHub Actions workflow
- `admin/components/DeployDashboard.tsx` — React deploy UI

---

**You're now set up for automated deployments. No Replit cost. No manual pushes.**

Questions? Check GitHub Actions logs at: https://github.com/flubadesigns/fluba-designs/actions
