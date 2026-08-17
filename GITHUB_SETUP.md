# Publishing this site on GitHub Pages

Everything from an empty GitHub repository to a live, shareable link. Written for username
**`htetwailin`** — every command below is ready to copy as-is.

Your finished link will be:

```
https://htetwailin.github.io
```

Free, permanent, and no verification step. Nothing on your computer needs changing — the site is
already written, committed and passing its own checks.

---

## Step 1 — Create the repository

1. Go to **github.com** → **+** (top right) → **New repository**
2. Fill in:

   | Field | Value |
   | --- | --- |
   | **Repository name** | `htetwailin.github.io` |
   | **Visibility** | **Public** |
   | Add a README file | **unticked** |
   | Add .gitignore | **None** |
   | Choose a license | **None** |

3. **Create repository**

Two things that matter here:

- **The name must be exactly `htetwailin.github.io`** — your username, then `.github.io`. GitHub
  treats a repository with that name as your personal site and serves it at the bare domain. Any
  other name gives you `https://htetwailin.github.io/other-name` instead.
- **Leave the three "Initialize" options off.** Your repo already has commits. A README created
  here puts a commit on GitHub that your machine doesn't have, and the first push is rejected with
  `non-fast-forward`.

Free GitHub Pages requires a **public** repository. The code being public is normal for a portfolio;
it is the same site everyone can already see.

---

## Step 2 — Push

```powershell
cd "D:\Htet Wai Lin\Project\hwl-portfolio"
git remote add origin https://github.com/htetwailin/htetwailin.github.io.git
git push -u origin main
```

If it says *"remote origin already exists"*:

```powershell
git remote set-url origin https://github.com/htetwailin/htetwailin.github.io.git
```

**Authentication:** a browser window opens — sign in and approve. If it asks in the terminal
instead, your account password will not work; use a personal access token
(**Settings → Developer settings → Personal access tokens → Tokens (classic)**, scope `repo`) as
the password. Windows remembers it after the first time.

**Check it landed:**

```powershell
git ls-remote origin refs/heads/main
```

The SHA it prints must match `git rev-parse HEAD`. If they match, every file is on GitHub.

---

## Step 3 — Switch Pages on ⚠️

**This is the step people miss.** Without it the workflow runs green and nothing is ever served.

In your new repository: **Settings** → **Pages** (left sidebar) → under **Build and deployment**:

```
Source:  [ GitHub Actions ▾ ]     ← change from "Deploy from a branch"
```

That is the whole change. There is no Save button; it applies immediately.

---

## Step 4 — Watch it build

Open the **Actions** tab. The push started a run called *Verify and deploy*:

```
verify   ✓   required files, asset paths, placeholders, title/description
deploy   ✓   uploads public/ and publishes it
```

About a minute. `deploy` only runs after `verify` passes, and only on `main`.

If nothing is listed at all, the workflow file didn't reach GitHub — check that
`.github/workflows/deploy.yml` appears in the repository's file list.

---

## Step 5 — Your link

**Settings → Pages** shows it once the first deploy finishes:

```
https://htetwailin.github.io
```

The very first deploy can take a few extra minutes to propagate. If it 404s right after the green
tick, wait five minutes before assuming anything is wrong.

Open it and check: the page is styled (not plain black text on white), **Download CV** downloads the
PDF, the three Nan San buttons open the right sites, and the menu works on your phone.

---

## Step 6 — Share it

| Where | What to do |
| --- | --- |
| **CV** | Put it in the header, next to or instead of the LinkedIn line |
| **LinkedIn** | Profile → Contact info → Website → add it |
| **Facebook** | HWL Tech page → Edit page info → Website; and in the pinned post |
| **Email signature** | One line under your name |
| **Job applications** | "Portfolio: https://htetwailin.github.io" |

---

## Every change from now on

```powershell
cd "D:\Htet Wai Lin\Project\hwl-portfolio"
# edit public\index.html
git add -A
git commit -m "Update portfolio"
git push github main
```

Push, and GitHub rebuilds and republishes on its own — roughly two minutes to live. No force, no
settings, nothing else to press.

**For a change you want to see before it is public**, use a branch:

```powershell
git checkout -b new-section
# ...edit...
git add -A
git commit -m "Add new section"
git push -u github new-section
```

The checks run on the branch but `deploy` does not, so the live site is untouched. Merge to `main`
when you are happy and that merge publishes.

---

## If something goes wrong

| Symptom | Cause and fix |
| --- | --- |
| `Updates were rejected (non-fast-forward)` | The repo was created with a README. Delete the repo and recreate it empty, or `git pull --rebase github main` then push |
| `Support for password authentication was removed` | Use a personal access token as the password — Step 2 |
| Actions tab is empty | `.github/workflows/deploy.yml` is not on GitHub. Confirm it is in the repo's file list |
| Workflow green but the site 404s | Step 3 was skipped — Source is still "Deploy from a branch" |
| `verify` fails with **BROKEN** | `index.html` links a file that isn't committed. The log names it |
| `verify` fails on placeholders | Text like `[PHONE]` reached the page |
| Site loads but is unstyled | `style.css` wasn't published. `verify` should have caught it — check the deploy log |
| Changes not appearing | Hard refresh: **Ctrl+F5**. Pages caches aggressively |
| 404 on `https://htetwailin.github.io` | Repository name isn't exactly `htetwailin.github.io`, or it is private |

---

## Later, if you want your own domain

Buy something like `htetwailin.com`, then:

1. **Settings → Pages → Custom domain** → enter it → Save
2. At your registrar's DNS panel, add four `A` records for `@`:
   `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
3. Wait for the check to pass, then tick **Enforce HTTPS**

Until then `htetwailin.github.io` is a perfectly good address to put on a CV.
