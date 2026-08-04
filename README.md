# Htet Wai Lin — portfolio

Personal site: CV for employers, and the Lynn POS products for shop and restaurant owners. One page,
two audiences, one contact section serving both.

**Live:** https://htetwailin.github.io

Setup guides: [GITHUB_SETUP.md](GITHUB_SETUP.md) (primary) · [GITLAB_SETUP.md](GITLAB_SETUP.md)

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
.gitlab-ci.yml           verify → deploy   (GitLab Pages)
```

**The site files sit at the repository root on purpose.** GitHub's built-in "Deploy from a branch"
publisher serves the root and knows nothing about subfolders, so keeping them here means the site is
correct under either publishing source — the Actions workflow or the branch builder. GitLab Pages
insists on a folder named `public/`, so its `pages` job copies these files into one at build time
rather than a second copy being kept in the repository.

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

| Stage | Job | Runs on | Does |
| --- | --- | --- | --- |
| verify | `check:structure` | every push, every MR | Required files exist; every local `href`/`src` in `index.html` resolves to a file in the repo |
| verify | `check:content` | every push, every MR | No `[PHONE]`-style placeholders reached production; page has a title and meta description |
| verify | `check:html` | every push, every MR | HTML5 + CSS validation. `allow_failure: true` — read it, don't obey it blindly |
| deploy | `pages` | default branch only | Publishes `public/` to GitLab Pages |

The two checks that can fail the pipeline are both there for the same reason: they catch mistakes
that are invisible in a diff and obvious to a visitor. A broken `style.css` path shows as an
unstyled page; a leftover placeholder on a contact section costs real enquiries.

`pages` is a reserved job name — GitLab publishes because the job is *called* `pages`, not because
of anything in its script.

## First deploy

```powershell
cd "D:\Htet Wai Lin\Project\hwl-portfolio"
git init -b main
git add -A
git commit -m "Portfolio site with GitLab Pages pipeline"
git remote add origin https://gitlab.com/USERNAME/hwl-portfolio.git
git push -u origin main
```

Then in GitLab: **Deploy → Pages**. The URL appears there once the first `pages` job succeeds —
usually a minute or two. If the project is private, tick **Settings → General → Visibility → Pages:
Everyone** or nobody outside the project can see it.

## Editing content

Everything is in `public/index.html`, in reading order — hero, products, experience, skills,
projects, contact. There is no data file and no templating: change the text in the HTML.

- **Replace the CV**: overwrite `public/Htet-Wai-Lin-CV.pdf`, keeping the filename, and both links
  keep working.
- **Add a real photo**: drop a square image in `public/`, then swap the `.avatar` div in
  `index.html` for `<img class="avatar" src="photo.jpg" alt="Htet Wai Lin">`.
- **Colours**: the whole palette is CSS custom properties at the top of `style.css`. `--accent` is
  the amber; change that one value and the whole site follows.
