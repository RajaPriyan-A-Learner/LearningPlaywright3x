# ⚡ GO PIKACHU — Automated Chapter Workflow

## Overview

Go Pikachu is an automated workflow that validates, commits, and publishes chapter learning materials. It runs all configured hooks (PreToolUse/PostToolUse) to ensure quality before pushing code to the repository.

## What It Does

When you trigger "Go Pikachu", this workflow:

1. **🔍 Scan** — Finds all chapter JS files and checks for matching IQ documentation
2. **📝 Create** — Auto-generates IQ_Notes stubs (only for NEW JS files)
3. **🪝 Validate** — Runs PreToolUse hooks from `settings.json`
   - `validate-md-quality.js` — Checks IQ markdown quality, no placeholders
   - `require-js-docs.js` — Ensures all JS files have IQ docs
   - `create-js-practise-notes.js` — Generates practice stubs
   - `generate-chapter-master-iq.js` — Validates MASTER files
4. **📦 Stage** — `git add -A` (stages all changes)
5. **💾 Commit** — Creates commit with standardized message
6. **🪝 PostToolUse** — Runs post-commit hooks
   - `git-fail-doc-reminder.js` — Logs reminders on failures
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
Scan → Create Stubs → Validate (PreToolUse) → Stage → Commit → PostToolUse → Push
```

**Output:**
```
⚡ GO PIKACHU ACTIVATED ⚡

🔍 Step 1: Scanning chapter JS files...
   Found 5 JS file(s)

📝 Step 2: Creating IQ stubs for new JS files...
   ✓ Created: IQ_Notes/Chapter_Notes/11/80_Function_Basics1_IQ.md
   ✓ Exists: IQ_Notes/Chapter_Notes/11/81_Function_Basics2_IQ.md
   Summary: Created 1, Existing 4

🪝 Step 3: Running PreToolUse hooks (validation)...
   ⏳ Hooks validate quality, placeholders, MASTER files...

🪝 Step 4: PostToolUse hooks (logging)...
   ⏳ PostToolUse hooks will run after commit...

📦 Step 5: Staging all changes...
   ✓ All changes staged

💾 Step 6: Creating commit...
   ✓ Commit created

🚀 Step 7: Pushing to main...
   ✓ Pushed to main

✅ GO PIKACHU COMPLETE!
   Created: 1 | Existing: 4 | Staged & Pushed
```

### Blocked Flow ❌
If placeholder content remains in IQ files:
```
⚡ GO PIKACHU ACTIVATED ⚡

🔍 Step 1: Scanning chapter JS files...
   Found 5 JS file(s)

📝 Step 2: Creating IQ stubs for new JS files...
   ✓ Exists: [files...]

🪝 Step 3: Running PreToolUse hooks (validation)...
   ⏳ Hooks validate quality, placeholders, MASTER files...

❌ Commit failed (hooks may have blocked it)
   Read hook errors above to fix issues
```

**Action required:** 
1. Fill in placeholder content in IQ files (Overview, Main Concept, Key Points, Summary)
2. Replace template text with real explanations (no "Write a brief...", "Point 1", etc.)
3. Run Go Pikachu again

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

1. **Create JS files** (e.g., `11_chapter_Function/80_Function_Basics1.js`, `81_Function_Basics2.js`)
2. **Run Go Pikachu (first run)**
   - Scans and finds new JS files
   - Auto-creates IQ_Notes stubs in `IQ_Notes/Chapter_Notes/11/`
3. **Fill IQ_Notes**
   - Replace template placeholders with real content
   - Overview, Main Concept, Code Example, Key Points, Common Mistakes, Summary
4. **Create MASTER file** (e.g., `IQ_Notes/Chapter_Notes/11/MASTER_Function_IQ.md`)
   - Must have all 9 required sections
5. **Run Go Pikachu (final run)**
   - Validates all content (no placeholders, quality checks)
   - Commits and pushes to main
6. **Push complete** ✅

### If Blocked

1. Read hook error message (tells exact issue)
2. Fix the issue:
   - **Missing IQ file:** Already created by Go Pikachu step 2
   - **Placeholder content:** Fill in real explanations in IQ files
   - **Missing MASTER file:** Create with 9 required sections
   - **Missing code block:** Add ``` example block to IQ file
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

### "Commit failed (hooks may have blocked it)"
**Most Common Cause:** IQ files contain placeholder content (template text not replaced).
**Fix:** Fill in all IQ file sections with real content:
- Replace "Write a brief description..." with actual explanation
- Replace "Point 1", "Point 2" with real points
- Replace "Mistake 1", "Mistake 2" with real mistakes
- Ensure `## Overview` and `## Summary` sections have real content

### "Blocking git add: N markdown file(s) failed quality checks"
**Cause:** IQ files missing required sections, code blocks, or contain placeholders.
**Fix:** 
1. Add `## Overview` and `## Summary` sections
2. Add code blocks with ``` fences
3. Replace all template placeholder text with real content

### "Missing: IQ_Notes/Chapter_Notes/11/80_Topic_IQ.md"
**Cause:** Go Pikachu didn't create file (unlikely).
**Fix:** Re-run Go Pikachu — it should create stubs for new JS files.

### "Blocking commit: 1 chapter(s) are missing their MASTER IQ file"
**Cause:** MASTER_[TopicName]_IQ.md doesn't exist or missing required sections.
**Fix:** Create MASTER file in `IQ_Notes/Chapter_Notes/11/` with all 9 sections:
1. Syntax Reference — End to End
2. Built-in Functions & Methods
3. Deep Insights & Gotchas
4. Interview-Ready Definitions
5. Tricky Interview Questions
6. Controversial Topics & Ongoing Debates
7. Quick Reference Cheat Sheet
8. Memory Map & Visual Flowchart
9. LinkedIn-Style Post

### "Push failed"
**Cause:** Remote branch enforces same validation rules.
**Fix:** Ensure all local files pass validation first (no placeholder text, all sections filled).

---

## Tips

- **Run frequently** — Go Pikachu after adding any chapter JS files
- **Check output** — Read error messages carefully; they guide fixes
- **Template reuse** — Copy structure from existing IQ files in same chapter
- **MASTER last** — Create individual IQ files first, MASTER consolidates them

---

## Summary

**Key Takeaway:** Go Pikachu automates the entire chapter publishing workflow—from validation to commit to push—ensuring all documentation is complete and high-quality before code reaches the repository.
