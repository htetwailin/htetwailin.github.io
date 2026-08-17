# Htet Wai Lin — portfolio

Personal site: CV for employers, and the Lynn POS products for shop and restaurant owners. One page,
two audiences, one contact section serving both.

**Live:** https://htetwailin.github.io

Setup guide: [GITHUB_SETUP.md](GITHUB_SETUP.md)

## What it is

Plain HTML, CSS and ~40 lines of JavaScript. No framework, no build step, no dependencies, no web
fonts — the page paints on the first request and there is nothing that can rot between now and the
next time it is touched. The JavaScript does three things (mobile menu, current-section highlight,
footer year) and the page is fully readable without it.

```
index.html               the whole site
style.css
script.js
Htet-Wai-Lin-CV.pdf      linked from the hero and the contact section
.nojekyll                stops GitHub processing the files through Jekyll
.github/workflows/       verify → deploy   (GitHub Pages)
```

**The site files sit at the repository root on purpose.** GitHub's built-in "Deploy from a branch"
publisher serves the root and knows nothing about subfolders, so keeping them here means the site is
correct under either publishing source — the Actions workflow or the branch builder.

## Working on it locally

There is no server to run — open the file:

```powershell
start index.html
```

If you want a local server (needed only if you later add anything fetched over HTTP):

```powershell
python -m http.server 8080
```

## The pipeline

One workflow, [.github/workflows/deploy.yml](.github/workflows/deploy.yml), with two jobs.

| Job | Runs on | Does |
| --- | --- | --- |
| `verify` | every push, every PR | Required files exist; every local `href`/`src` in `index.html` resolves to a file in the repo; no `[PHONE]`-style placeholders reached production; page has a title and meta description |
| `deploy` | `main` only, and only if `verify` passed | Copies the site files into `_site/` and publishes that to GitHub Pages |

The checks are there because they catch mistakes that are invisible in a diff and obvious to a
visitor. A broken `style.css` path shows as an unstyled page; a leftover placeholder on a contact
section costs real enquiries.

Pull requests are verified but never deployed. The deploy job stages into `_site/` rather than
publishing the repository wholesale, so this README stays in the repo without being served.

## Deploying

Push to `main`:

```powershell
git push
```

The Actions tab shows the run; the live URL appears on the `deploy` job once it finishes, usually a
minute or two. **Settings → Pages → Source** must be set to **GitHub Actions** — on "Deploy from a
branch" the workflow's deploy step fails.

## Editing content

Everything is in `index.html`, in reading order — hero, products, experience, skills,
projects, contact. There is no data file and no templating: change the text in the HTML.

- **Replace the CV**: overwrite `Htet-Wai-Lin-CV.pdf`, keeping the filename, and both links
  keep working.
- **Replace the photo**: overwrite `profile.jpg` in the repository root, keeping the filename. Use a
  square image — `.avatar` crops it to a 200px circle and `object-fit: cover` trims anything that
  doesn't match rather than stretching it. If you change the filename, update both `index.html` and
  the `cp` line in the deploy workflow.
- **Colours**: the whole palette is CSS custom properties at the top of `style.css`. `--accent` is
  the amber; change that one value and the whole site follows.
