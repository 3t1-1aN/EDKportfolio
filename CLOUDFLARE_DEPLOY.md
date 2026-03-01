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

5. **Set the build settings:**
   - **Build command:** `npx @cloudflare/next-on-pages`
   - **Build output directory:** `.vercel/output/static`
   - **Root directory:** Leave blank if the repo root is your app folder. If your app is in a subfolder (e.g. `portfolio-website`), set **Root directory** to that folder name.

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
