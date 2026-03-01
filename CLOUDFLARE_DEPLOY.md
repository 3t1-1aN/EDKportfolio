# Deploying to Cloudflare Pages

This Next.js app is configured for **static export** so it can be deployed to Cloudflare Pages as a static site.

## Build

```bash
npm run build
```

This produces a static site in the **`out`** folder. Deploy that folder to Cloudflare Pages.

## Deploy options

### Option A: Cloudflare dashboard (Git)

1. In [Cloudflare Dashboard](https://dash.cloudflare.com) go to **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Select your repo and branch.
3. Set:
   - **Build command:** `npm run build`
   - **Build output directory:** `out`
   - **Root directory:** (leave blank if the repo root is the app; otherwise set e.g. `portfolio-website`)
4. Add **Environment variables** if needed (e.g. `NODE_VERSION = 18` or `20`).
5. Save and deploy. Future pushes to the branch will trigger new deployments.

### Option B: Wrangler CLI

1. Install Wrangler (or use `npx`):
   ```bash
   npm install -g wrangler
   # or: npx wrangler pages deploy out
   ```
2. Log in (once):
   ```bash
   wrangler login
   ```
3. Build and deploy:
   ```bash
   npm run build
   wrangler pages deploy out --project-name=portfolio-website
   ```
   Use any `--project-name` you want; Cloudflare will create the project if it doesn’t exist.

## Notes

- **Images:** `next/image` is set to `unoptimized: true` for static export (no image optimization server). Remote images still work; they’re just not resized by Next.js.
- **Routes:** All category and blog routes are pre-rendered at build time via `generateStaticParams`.
- To test the static build locally, serve the `out` folder (e.g. `npx serve out`).
