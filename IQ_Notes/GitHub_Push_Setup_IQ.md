# Pushing a Local Project to a GitHub Public Repo (main branch) — Full Walkthrough

Real record of setting up this project (`LearningPlaywright3x`) as a git repo and
pushing it to `https://github.com/RajaPriyan-A-Learner/LearningPlaywright3x.git`,
including every error hit along the way and how it was fixed. Written for future-me
to skim before doing this again on a new machine/project.

## Prerequisites

| Requirement | Why | Check |
|---|---|---|
| Git installed | obviously, it's the tool doing all this | `git --version` |
| Git in your terminal's PATH | so `git` works in *that specific* shell (cmd/PowerShell/Git Bash each have their own PATH) | `where git` |
| GitHub account with access to the target repo | need push rights | — |
| The remote repo exists on GitHub | can't push to a repo that isn't created yet | visit repo URL in browser |
| Auth method ready: PAT, `gh auth login`, or SSH key | GitHub dropped plain password auth over HTTPS years ago | — |

## The Commands (ideal path, no errors)

Run from the project root:

```bash
git init
git branch -M main
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/RajaPriyan-A-Learner/LearningPlaywright3x.git
git push -u origin main
```

When prompted for credentials: username = GitHub username, password = **Personal
Access Token (PAT)**, not your account password.

---

## Issues Actually Hit (and fixes)

### 1. `'git' is not recognized as an internal or external command`

Happened in plain `cmd.exe`, even though Git was installed.

**Cause:** Git was installed, but its folder wasn't in the Windows **PATH**
environment variable that `cmd.exe` reads. Git Bash has its own separate PATH
that already includes Git, so it worked fine there — the tool being "installed"
and being "on PATH for this specific shell" are two different things.

**Fix options:**
- Quick: just use **Git Bash** instead of `cmd.exe`/PowerShell.
- Permanent: add `C:\Program Files\Git\cmd` to the User/System PATH via
  *Environment Variables* settings, then **reopen** the terminal (PATH changes
  don't apply to already-open windows).

Confirmed actual install location with:
```bash
where git
# C:\Program Files\Git\mingw64\bin\git.exe
```

### 2. `fatal: 'origin' does not appear to be a git repository`

Happened on `git push -u origin main`.

**Cause:** The `git remote add origin ...` step was never actually run (or was
run in a different terminal/folder than where the push was attempted).

**Diagnosis:**
```bash
git remote -v      # showed nothing → confirms no remote configured
pwd                 # sanity check: am I even in the right folder?
```

**Fix:**
```bash
git remote add origin https://github.com/RajaPriyan-A-Learner/LearningPlaywright3x.git
git remote -v       # now shows origin (fetch) and (push)
```

**Lesson:** always run `git remote -v` before pushing if something feels off —
cheap way to confirm the remote link actually exists before debugging further.

### 3. Where does the Personal Access Token actually go?

Not an error, but a genuine "where do I type this" moment. When `git push` needs
HTTPS auth, it prompts:

```
Username for 'https://github.com': <github username>
Password for 'https://<username>@github.com': <paste PAT here — screen stays blank, that's normal>
```

The PAT goes in the **password** field, never your real account password.
Git Credential Manager (bundled with Git for Windows) caches it after first use,
so you won't be asked again on that machine.

**Generating a PAT:** GitHub → Settings → Developer settings → Personal access
tokens → Tokens (classic) → Generate new token → check `repo` scope → Generate
→ copy immediately (shown once only).

⚠️ **Security note:** if a PAT is ever pasted into a chat, doc, or committed
file, treat it as **compromised immediately** — revoke it on GitHub and
generate a new one. Never let a token sit in a plaintext file, remote URL
config, or a chat transcript longer than it has to.

### 4. `! [rejected] main -> main (fetch first)`

Happened on the actual `git push`, even with `origin` correctly configured and
a valid token.

**Cause:** The GitHub repo was created with **"Initialize this repository with
a README"** checked, so it already had one commit (`Initial commit` adding
`README.md`) sitting on `main` before the first push. Local `main` and remote
`main` had **completely unrelated histories** — pushing would've overwritten
one side.

**Diagnosis:**
```bash
git fetch <remote-url> main
git log --oneline FETCH_HEAD          # see what's actually on the remote
git merge-base <local-commit> FETCH_HEAD   # "no common ancestor" confirms unrelated histories
```

**Fix — two options, picked "merge" to keep both sides:**
```bash
git merge FETCH_HEAD --allow-unrelated-histories -m "Merge remote README with local initial commit"
git push origin main
```
(The other option would've been to force-push and blow away the remote
README — faster, but destructive; not worth it for one README file.)

**Lesson:** when creating a new GitHub repo that you're about to push an
*existing* local project into, **don't** check "Initialize with README" — leave
the repo fully empty so the very first push has nothing to conflict with.

### 5. Upstream tracking didn't get set automatically

After pushing successfully via a direct URL (with the token embedded, instead
of via the `origin` remote name), `main` wasn't tracking `origin/main`:

```bash
git branch --set-upstream-to=origin/main main
# fatal: the requested upstream branch 'origin/main' does not exist
```

**Cause:** Because the push went to a raw `https://user:token@github.com/...`
URL rather than through the configured `origin` remote, git never created the
local remote-tracking ref `refs/remotes/origin/main`.

**Fix:** manually fetch into that specific tracking ref, then link it:
```bash
git fetch <remote-url> main:refs/remotes/origin/main
git branch --set-upstream-to=origin/main main
git status   # "Your branch is up to date with 'origin/main'"
```

After this, plain `git push` / `git pull` work without specifying remote/branch.

---

## Final Working Sequence (as actually executed, in order)

```bash
git init
git branch -M main
git add .
git commit -m "Initial commit"

# remote was missing → had to add it explicitly
git remote add origin https://github.com/RajaPriyan-A-Learner/LearningPlaywright3x.git

# first push rejected — remote had unrelated history (auto-created README)
git fetch <remote-url-with-token> main
git merge FETCH_HEAD --allow-unrelated-histories -m "Merge remote README with local initial commit"
git push <remote-url-with-token> main:main

# upstream wasn't linked since push used a raw URL, not the 'origin' name
git fetch <remote-url-with-token> main:refs/remotes/origin/main
git branch --set-upstream-to=origin/main main
```

## TL;DR Checklist for Next Time

1. Create the GitHub repo **empty** (no README/license/`.gitignore` auto-init).
2. Confirm `git` is on PATH for *this* terminal (`where git`).
3. `git init` → `git branch -M main` → `git add .` → `git commit`.
4. `git remote add origin <url>` → **verify with `git remote -v`** before pushing.
5. `git push -u origin main` (use PAT as password when prompted).
6. If rejected with "fetch first" → check `git log --oneline FETCH_HEAD` and
   `git merge-base` to see if histories are unrelated; merge with
   `--allow-unrelated-histories` if so.
7. Never leave a PAT sitting in a URL, config file, or chat — revoke/rotate if
   it was ever exposed in plaintext anywhere.

See also: [[Source_Code_ByteCODE_Binary_IQ]], [[Compilation_vs_Interpretation_vs_JIT_IQ]]
