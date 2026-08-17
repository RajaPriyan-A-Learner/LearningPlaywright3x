# ⚡ GO PIKACHU — Automated Chapter Workflow

## Overview

Go Pikachu is an automated workflow that validates, commits, and publishes chapter learning materials. It runs all configured hooks (PreToolUse/PostToolUse) to ensure quality before pushing code to the repository.

## What It Does

When you trigger "Go Pikachu", this workflow:

1. **🔍 Scan** — Finds all chapter JS files missing IQ documentation
2. **📝 Alert** — Lists missing IQ_Notes files that need creation
3. **📦 Stage** — `git add -A` (stages all changes)
4. **🪝 PreToolUse** — Runs configured pre-commit hooks from `settings.json`
   - `validate-md-quality.js` — Checks IQ markdown quality
   - `require-js-docs.js` — Ensures all JS files have IQ docs
   - `create-js-practise-notes.js` — Generates practice stubs
   - `generate-chapter-master-iq.js` — Validates MASTER files
5. **💾 Commit** — Creates commit with standardized message
6. **🪝 PostToolUse** — Runs post-commit hooks
   - `git-fail-doc-reminder.js` — Reminds on failures
7. **🚀 Push** — `git push origin main`

---

## How to Trigger It

### Windows (PowerShell)
```powershell
.\.claude\scripts\go-pikachu.ps1
```

### Mac/Linux (Bash)
```bash
bash ./.claude/scripts/go-pikachu.sh
```

### Via Claude Code CLI
```bash
claude code "Go Pikachu"
```

---

## What Happens

### Success Flow ✅
```
Scan → Stage → Validate (PreToolUse) → Commit → PostToolUse → Push
```

**Output:**
```
⚡ GO PIKACHU ACTIVATED ⚡

🔍 Scanning chapter JS files...
✅ All chapter JS files have IQ documentation.

📦 Staging all changes...
🪝 Running PreToolUse hooks...
💾 Creating commit...
🪝 Running PostToolUse hooks...
🚀 Pushing to main...

✅ GO PIKACHU COMPLETE!
   ⚡ All changes committed and pushed to main
```

### Blocked Flow ❌
If IQ documentation is missing:
```
⚡ GO PIKACHU ACTIVATED ⚡

🔍 Scanning chapter JS files...
  ⚠️  Missing: IQ_Notes/92_NewTopic_IQ.md (for 11_chapter_Function/92_NewTopic.js)

❌ 1 file(s) missing documentation.

⚡ Note: Auto-generation of IQ notes requires manual creation.
   Use the IQ_Notes template to document each JS file.
```

**Action required:** Create the missing IQ_Notes files using the template before re-running.

---

## IQ_Notes Template

When Go Pikachu reports missing documentation, create files following this structure:

```markdown
# [FILE_NUMBER]_[TOPIC] — [Descriptive Title]

**File:** `[chapter_folder]/[filename].js`

## Overview
Brief description of what this file demonstrates.

## [Main Concept 1]
Explanation with code example.

```javascript
// Code example here
```

## [Main Concept 2]
More content.

---

## Summary
**Key Takeaway:** One-liner summary of the most important idea.
```

---

## Hooks Executed

### PreToolUse Hooks (Before Commit)
1. **validate-md-quality.js**
   - Checks: No placeholder content or fill-in-the-blank sections
   - Checks: Required sections (Overview, Summary)
   - Checks: At least one code block
   - Blocks: `git add` if fails

2. **require-js-docs.js**
   - Scans: All chapter JS files in status
   - Blocks: Commit if any JS lacks IQ documentation
   - Message: Lists undocumented files

3. **create-js-practise-notes.js**
   - Scans: JS_Practise folder
   - Auto-creates: Stub .md files with placeholder content
   - Blocks: If stubs incomplete (placeholders remain unfilled)

4. **generate-chapter-master-iq.js**
   - Scans: All MASTER IQ files per chapter
   - Blocks: If MASTER missing required sections

### PostToolUse Hooks (After Commit)
1. **git-fail-doc-reminder.js**
   - Logs: Reminds on failures
   - No blocking (informational only)

---

## Typical Workflow

### Adding a New Chapter

1. **Create JS files** (e.g., `11_chapter_Function/80_Function_Basics1.js`)
2. **Create IQ_Notes** (e.g., `IQ_Notes/80_Function_Basics1_IQ.md`)
3. **Create MASTER file** (e.g., `IQ_Notes/Chapter_Notes/11/MASTER_Function_IQ.md`)
4. **Say "Go Pikachu"** or run the script
5. **Push complete** ✅

### If Blocked

1. Read the hook error message
2. Fix the issue (missing IQ file, placeholder content in markdown, etc.)
3. Run Go Pikachu again

---

## Configuration

Hooks are configured in `.claude/settings.json` under `hooks`:

```json
{
  "hooks": {
    "PreToolUse": [...],
    "PostToolUse": [...]
  }
}
```

To modify hook behavior, edit `settings.json` or the hook scripts in `.claude/hooks/`.

---

## Troubleshooting

### "N file(s) missing documentation"
**Cause:** JS files in chapter folders lack corresponding IQ_Notes.
**Fix:** Create IQ_Notes/[filename]_IQ.md for each missing file.

### "Blocking git add: N markdown file(s) failed quality checks"
**Cause:** IQ files missing required sections or code blocks.
**Fix:** Add `## Overview`, `## Summary`, and code examples to IQ files.

### "Blocking commit: 1 chapter(s) are missing their MASTER IQ file"
**Cause:** MASTER_[TopicName]_IQ.md doesn't exist or is incomplete.
**Fix:** Create MASTER file with all 9 required sections (see template).

### "Push failed (likely due to missing documentation)"
**Cause:** Remote branch also enforces documentation rules.
**Fix:** Ensure all files have complete IQ documentation locally first.

---

## Tips

- **Run frequently** — Go Pikachu after adding any chapter JS files
- **Check output** — Read error messages carefully; they guide fixes
- **Template reuse** — Copy structure from existing IQ files in same chapter
- **MASTER last** — Create individual IQ files first, MASTER consolidates them

---

## Summary

**Key Takeaway:** Go Pikachu automates the entire chapter publishing workflow—from validation to commit to push—ensuring all documentation is complete and high-quality before code reaches the repository.
