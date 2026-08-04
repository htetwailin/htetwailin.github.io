# Publishing this site on GitLab Pages

From an empty GitLab account to a live URL. Everything on your machine is already done — the repo is
initialised, committed and passing its own checks. What is left is creating the project and pushing.

Assume your GitLab username is `htetwailin` throughout; substitute your real one.

---

## Decide the URL first

This is the one choice you cannot change later without breaking every link you have shared.

| Project name | Your site's address |
| --- | --- |
| `hwl-portfolio` | `https://htetwailin.gitlab.io/hwl-portfolio` |
| **`htetwailin.gitlab.io`** | **`https://htetwailin.gitlab.io`** ← no folder, cleaner |

**Name the project `<your-username>.gitlab.io`.** GitLab treats a project with that exact name as the
namespace's root site and serves it at the bare domain. It costs nothing and it is the difference
between a link that looks like a personal site and one that looks like a subfolder of something else.

The rest of this guide assumes you did that.

---

## Step 1 — Create the project

1. Sign in at **gitlab.com** (a free account is enough — Pages, CI/CD and private repos are all included).
2. **New project** → **Create blank project**.
3. Fill in:
   - **Project name:** `htetwailin.gitlab.io`
   - **Visibility:** Public is simplest. Private also works, but then see Step 5.
   - **⚠️ Untick "Initialize repository with a README".**

That last one matters. Your repo already has commits; an auto-created README makes GitLab's history
diverge from yours and the first push is rejected with `non-fast-forward`. An empty project accepts
your history as it is.

---

## Step 2 — Push

```powershell
cd "D:\Htet Wai Lin\Project\hwl-portfolio"
git remote add origin https://gitlab.com/htetwailin/htetwailin.gitlab.io.git
git push -u origin main
```

GitLab will ask for credentials. Your account password will **not** work over HTTPS — use a personal
access token as the password:

**Profile → Preferences → Access tokens → Add new token**
- Name: `git-push`
- Scopes: **`write_repository`** (that is all it needs)
- Expiry: set one — a year is fine

Copy the token when it is shown; it is never displayed again. Username = your GitLab username,
password = the token. Windows Credential Manager will remember it after the first time.

---

## Step 3 — Watch the pipeline

**Build → Pipelines** in the left sidebar. The push starts one automatically. You should see:

```
verify ─┬─ check:structure   ✓
        ├─ check:content     ✓
        └─ check:html        ✓ (or ⚠ — it is allowed to fail)
deploy ─── pages             ✓
```

The three verify jobs run in parallel and take a few seconds. `pages` runs only after they pass, and
only on `main`.

If `pages` is missing entirely, the pipeline ran on a branch other than your default — the job is
restricted to the default branch on purpose, so a work-in-progress branch can never overwrite the
live site.

---

## Step 4 — Get your link

**Deploy → Pages.** The URL is displayed there once the first `pages` job has succeeded.

First deploy takes a few minutes longer than later ones — GitLab has to provision the domain. If the
URL 404s immediately after the job goes green, wait five minutes before assuming anything is wrong.

**If the URL has a random suffix** like `htetwailin-gitlab-io-a1b2c3.gitlab.io`, GitLab enabled its
"unique domain" feature by default. Untick **Deploy → Pages → Use unique domain** and redeploy to get
the clean address.

---

## Step 5 — If the project is private

A private project's Pages site is private too, and visitors get a login screen instead of your CV.

**Settings → General → Visibility, project features, permissions → Pages → Everyone.**

Do this before you put the link on your CV or your Facebook page.

---

## Everyday workflow

**Small change — text, a price, a new project:**

```powershell
cd "D:\Htet Wai Lin\Project\hwl-portfolio"
# edit public/index.html
git add -A
git commit -m "Add new project to portfolio"
git push
```

Push, and the site rebuilds itself. Roughly two minutes from `git push` to the change being live.

**Bigger change you want to check before it goes live:**

```powershell
git checkout -b redesign-hero
# ...edit...
git add -A
git commit -m "Rework hero section"
git push -u origin redesign-hero
```

The verify jobs run on the branch, but `pages` does not — the live site is untouched. Open a merge
request in GitLab, look at the diff, merge it into `main`, and *that* deploy publishes.

This is worth using for anything you cannot fully picture in your head. The whole reason for the
branch rule is that the live site is now something an employer might be looking at while you edit.

---

## When something goes wrong

| Symptom | Cause and fix |
| --- | --- |
| `remote: HTTP Basic: Access denied` | You used your account password. Use a personal access token — Step 2 |
| `Updates were rejected... non-fast-forward` | The project was created with a README. Either delete and recreate it empty, or `git pull --rebase origin main` and push again |
| `check:structure` fails with **BROKEN** | `index.html` references a file that is not committed. The job prints which one |
| `check:content` fails | Placeholder text like `[PHONE]` reached the page, or the title/meta description was removed |
| `check:html` is red | Advisory only — it is `allow_failure: true` and never blocks the deploy. Read it and decide |
| Pipeline says "no jobs" | `.gitlab-ci.yml` was not committed, or is not at the repository root |
| Site loads but is unstyled | `style.css` did not deploy. `check:structure` should have caught it — check the `pages` job's artifact list |
| Pages URL 404s | First deploy still provisioning (wait 5 min), or the `pages` job never ran because you pushed to a non-default branch |
| Visitors see a login page | Private project — Step 5 |
| Changes not showing | Hard refresh: **Ctrl+F5**. Pages caches aggressively |

---

## Optional — your own domain

If you buy something like `htetwailin.com`:

1. **Deploy → Pages → New Domain**, enter it. GitLab shows a `TXT` verification record and an `A`
   record (or `CNAME`).
2. Add both at your domain registrar's DNS panel.
3. Wait for verification — usually under an hour, occasionally a day.
4. Tick **Automatic certificate management (Let's Encrypt)** for free HTTPS.

Until then `htetwailin.gitlab.io` is a perfectly respectable address to put on a CV.

---

## Where to put the link once it is live

- **CV** — replace the LinkedIn line at the top, or sit it beside it
- **LinkedIn** — Profile → Contact info → Website
- **Facebook page** — the HWL Tech page's Website field, and in the pinned post
- **Email signature**
- **The site's own README** — replace the `USERNAME` placeholder in the "Live" line
