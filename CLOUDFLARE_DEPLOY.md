# Deploying to Cloudflare (dynamic Next.js)

This app is set up to deploy as a **dynamic** Next.js site on Cloudflare (SSR, API routes, image optimization), using **@cloudflare/next-on-pages** with Next.js 14.

---

## Recommended on Windows: Deploy with Git (no local build)

**`npm run pages:build` doesn’t run reliably on Windows.** The simplest approach is to let **Cloudflare build your app on their Linux servers** via Git. You push code; they build and deploy. No local build step.

### Step-by-step: Deploy with Git

1. **Push your code** to GitHub (or GitLab).

2. **Open the Cloudflare dashboard:**  
   [dash.cloudflare.com](https://dash.cloudflare.com) → sign in.

3. **Create a Pages project:**  
   **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.

4. **Connect your repo:**  
   Choose your Git provider (e.g. GitHub), authorize Cloudflare, then select the repo and the branch you want to deploy (e.g. `main`).

5. **Set the build settings (must match exactly):**
   - **Build command:** `npx @cloudflare/next-on-pages`  
     *(Do not use `npm run build` — that produces the wrong output.)*
   - **Build output directory:** `.vercel/output/static`  
     *(Do not use `.next` or `.open-next` — this project uses next-on-pages.)*
   - **Root directory:** Leave blank if the repo root is your app folder (e.g. `package.json` and `app/` at the top level). If your app is in a subfolder (e.g. `portfolio-website`), set it to that folder name exactly. If the field cannot be left blank, use `.` so Cloudflare uses the clone root as the project root.
   - **Production branch deploy command** and **Non-production branch deploy command:** Leave **both empty**. Cloudflare Pages deploys the build output automatically. Do not put a path (e.g. `.vercel/output/static`) or a command (e.g. `npx wrangler deploy`) in these fields — that causes "Permission denied" or wrong deploy behavior.

6. **Environment variables (optional):**  
   Under **Build variables and secrets**, add any vars your app needs (e.g. `NODE_VERSION` = `18`).  
   Then click **Save**.

7. **Deploy:**  
   Click **Save and Deploy**. Cloudflare will run the build on their servers and deploy. When it finishes, you’ll get a URL like `https://your-project.pages.dev`.

8. **Later:** Every push to the connected branch will trigger a new build and deploy automatically.

---

## Alternative: Build and deploy from your machine (Mac/Linux or WSL)

If you’re on **Mac, Linux, or WSL on Windows**, you can build and deploy from the CLI. (On plain Windows, the build often hangs; use the Git flow above instead.)

1. **Log in to Cloudflare** (one-time): `npx wrangler login`
2. **Build:** `npm run pages:build`
3. **Deploy:** `npm run pages:deploy`

You’ll get a URL like `https://portfolio-website.pages.dev`.

---

## Build (reference)

```bash
npm run pages:build
```

This runs `npx @cloudflare/next-on-pages`, which builds your Next.js app for the Cloudflare Workers runtime and outputs to **`.vercel/output/static`**.

## Deploy

### Option A: Wrangler CLI

1. Log in once:
   ```bash
   npx wrangler login
   ```
2. Build and deploy:
   ```bash
   npm run pages:deploy
   ```
   This runs `pages:build` then deploys `.vercel/output/static` to Cloudflare Pages (project name: `portfolio-website`).

### Option B: Cloudflare dashboard (Git)

1. In [Cloudflare Dashboard](https://dash.cloudflare.com) go to **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Select your repo and branch.
3. Set:
   - **Build command:** `npx @cloudflare/next-on-pages`
   - **Build output directory:** `.vercel/output/static`
   - **Root directory:** (leave blank if repo root is the app, or set e.g. `portfolio-website`)
4. Add env vars in **Build variables and secrets** if needed (e.g. `NODE_VERSION = 18`).
5. Save and deploy.

## Local dev

- **Next.js dev server:** `npm run dev` (unchanged).
- **Preview in Workers runtime:** `npm run pages:dev` (builds and runs with `wrangler pages dev`).

## Windows

`@cloudflare/next-on-pages` uses the Vercel CLI and is unreliable on Windows. **Use the Git deployment above** so Cloudflare builds on Linux. If you need to build locally, use **WSL** and run `npm run pages:build` there.

---

## Troubleshooting

### Error: "The entry-point file at '.open-next/worker.js' was not found"

Your Cloudflare project is using the **wrong build and deploy setup**. It’s trying to deploy an OpenNext-style Worker (which expects `.open-next/`) while the build is either plain Next.js or next-on-pages.

**Fix:**

1. In the Cloudflare dashboard, open your Pages project → **Settings** → **Builds & deployments** → **Build configuration**.
2. Set **Build command** to: `npx @cloudflare/next-on-pages`
3. Set **Build output directory** to: `.vercel/output/static`
4. **Remove any custom deploy command** (e.g. `npx wrangler deploy`). Use the default so Pages deploys the build output. If there’s a “Deploy command” or “Build command” that runs `wrangler deploy`, clear it or leave it blank.
5. Save and trigger a new deployment.

### Error: "Root directory not found"

Cloudflare is looking for a folder path that does not exist in your cloned repo.

**Step 1 — Confirm your repo layout on GitHub**

- Open your repo and the branch Cloudflare builds (e.g. `main`).
- If you see `package.json`, `app/`, `components/` at the **top level**, the app is at repo root. Root directory in Cloudflare should be **empty** or **`.`**.
- If you see a single folder (e.g. `portfolio-website/`) and the app is inside it, set Root directory to that folder name exactly (e.g. `portfolio-website`).

**Step 2 — Set Root directory in Cloudflare**

- Dashboard → your Pages project → **Settings** → **Builds & deployments** → **Build configuration**.
- Find **Root directory** (or "Base directory").
- **App at repo root:** leave empty or use **`.`** (required if the field cannot be left blank).
- **App in a subfolder:** set to that folder name only (e.g. `portfolio-website`), no leading slash, correct spelling and case (Linux is case-sensitive).
- Save and trigger a new deployment.

| Repo layout | Root directory value |
|-------------|----------------------|
| App at repo root (`package.json` at top level) | Empty or `.` |
| App in subfolder (e.g. `portfolio-website/package.json`) | `portfolio-website` |

## Optional: OpenNext (Next.js 15, recommended by Cloudflare)

For the current recommended stack:

1. Upgrade to Next.js 15 and install OpenNext:
   ```bash
   npm install next@15 @opennextjs/cloudflare@latest
   npm install -D wrangler@latest
   ```
   Use `--legacy-peer-deps` if you hit peer dependency conflicts.
2. Use the config described in [OpenNext – Get started](https://opennext.js.org/cloudflare/get-started) (`wrangler.jsonc`, `open-next.config.ts`, and scripts).
3. Build and deploy with:
   ```bash
   npx opennextjs-cloudflare build && npx opennextjs-cloudflare deploy
   ```

This gives you full dynamic SSR, image optimization, and compatibility with the latest Next.js features.
