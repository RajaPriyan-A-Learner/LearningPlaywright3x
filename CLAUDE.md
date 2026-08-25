# Project Context & Workflows

## Overview

This document defines the project structure, automated workflows, and quality standards for the JavaScript learning repository. It covers how to use Go Pikachu (the automated chapter publishing system) and guides on creating IQ_Notes documentation.

## Project Overview

Learning JavaScript through hands-on examples and comprehensive interview-ready notes. Each chapter has:
- **JS files** (`NN_chapter_*/`) — Working code examples
- **IQ_Notes** (`IQ_Notes/`) — Individual topic documentation
- **MASTER IQ** (`IQ_Notes/Chapter_Notes/NN/`) — Comprehensive reference per chapter

---

## Automated Workflows

### 🚀 Go Pikachu — Chapter Publishing Workflow

**Purpose:** Auto-validate, stage, commit, and push all chapter work in one command.

**Triggers:** Chapter completed with all JS files, IQ_Notes, and MASTER file.

#### Triggering via Antigravity Agent
Simply tell your AI assistant:
> "Run Go Pikachu"

The agent will autonomously execute the workflow using the custom skill located in `.agents/skills/go-pikachu/SKILL.md`. *(Note: The legacy `.ps1` and `.sh` scripts have been deprecated and removed.)*

#### What Happens
1. **Scans** chapter JS files for missing IQ documentation
2. **Creates** IQ_Notes stubs (only for NEW JS files, not existing)
3. **Validates** with PreToolUse hooks (quality checks, no placeholders, MASTER file)
4. **Stages** all changes (`git add -A`)
5. **Commits** with standardized message
6. **PostToolUse hooks** run (logging/reminders)
7. **Pushes** to main

#### Success Criteria
- ✅ All chapter JS files have matching IQ_Notes
- ✅ All IQ files pass quality checks (Overview, Summary, code blocks, no placeholders)
- ✅ MASTER IQ file exists with 9 required sections
- ✅ No syntax errors in markdown

#### If Blocked
Read hook error message—it tells you exactly what's missing. Fix and re-run.

See `.claude/GO_PIKACHU_README.md` for detailed guide.

---

## Git Hooks Configuration

Configured in `.claude/settings.json` under `hooks`:

### PreToolUse Hooks (Block Before Commit/Push)
1. **validate-md-quality.js** — Markdown quality checks
   - No placeholder tasks (fill-in-the-blank placeholders)
   - Required sections present
   - Code examples embedded

2. **require-js-docs.js** — JS file documentation required
   - Every chapter JS file needs IQ_Notes
   - Blocks commit/push if missing

3. **create-js-practise-notes.js** — Auto-create JS_Practise stubs
   - Generates placeholder .md files
   - Blocks if placeholders not filled

4. **generate-chapter-master-iq.js** — Validate MASTER IQ files
   - Checks for 9 required sections
   - Blocks if missing

### PostToolUse Hooks (Inform After Commit/Push)
1. **git-fail-doc-reminder.js** — Failure notifications (informational only)

---

## Chapter Structure

### Adding a New Chapter

1. **Create directory** — `NN_chapter_Name/` (e.g., `11_chapter_Function/`)
2. **Add JS files** — `NN_Topic.js` (e.g., `80_Function_Basics1.js`)
3. **Run Go Pikachu** (first run) — Auto-creates IQ_Notes stubs in `IQ_Notes/Chapter_Notes/NN/`
4. **Fill IQ_Notes** — Replace template placeholders with real content
   - Overview, Main Concept, Code Example, Key Points, Common Mistakes, Summary
   - No placeholder text ("Write a brief...", "Point 1", etc.)
5. **Create MASTER IQ** — `IQ_Notes/Chapter_Notes/NN/MASTER_Topic_IQ.md`
   - Must have: 9 sections (see template in hook error)
6. **Run Go Pikachu** (final run) — Validates and publishes

### IQ_Notes Template

Go Pikachu auto-creates stubs. Fill in these sections:

```markdown
# NN_FileName — Descriptive Title

**File:** `NN_chapter_Name/NN_FileName.js`

## Overview
[What this topic is about — 2-3 sentences]

---

## Main Concept

[Explanation of primary concept/pattern]

### Code Example

\`\`\`javascript
// Working code from NN_FileName.js
\`\`\`

### Key Points

- Point 1 (real content, not placeholder)
- Point 2
- Point 3

---

## Common Mistakes

- Mistake 1 (real content)
- Mistake 2

---

## Summary

**Key Takeaway:** [One-liner—the most important idea]
```

**Quality Checks:**
- 200-400 words
- No placeholder text ("Write a brief...", "Point 1", "Mistake 1")
- Code blocks with ``` fences
- Must have `## Overview` and `## Summary`

### MASTER IQ Template

9 required sections (see `.claude/GO_PIKACHU_README.md` for full template):
1. Syntax Reference — End to End
2. Built-in Functions & Methods
3. Deep Insights & Gotchas
4. Interview-Ready Definitions
5. Tricky Interview Questions (12–15 questions)
6. Controversial Topics & Ongoing Debates
7. Quick Reference Cheat Sheet
8. Memory Map & Visual Flowchart (ASCII + Mermaid)
9. LinkedIn-Style Post

---

## Quality Standards

### For IQ_Notes Files
- **Length:** 200-400 words per file (focused, not encyclopedic)
- **Code blocks:** At least one per file (embedded, working)
- **No Placeholders:** All fill-in-the-blank content must be replaced with real explanations
- **Sections:** Must have `## Overview` and `## Summary`
- **Readability:** Clear explanations, practical examples

### For MASTER IQ Files
- **Depth:** Comprehensive per chapter (3000-5000 words)
- **Sections:** All 9 required sections present and filled
- **Interview focus:** Definitions, tricky questions, gotchas
- **Code:** Multiple examples per section
- **Visual aids:** ASCII art mind maps + Mermaid diagrams

### For JS Files
- **Clarity:** Simple, focused examples
- **Comments:** Only when "WHY" is non-obvious
- **Realism:** Practical patterns, not toy code

---

## Commit Message Convention

Go Pikachu uses this format (customize as needed):

```
feat: [description of chapter addition/update]

- Bullet 1
- Bullet 2
- Bullet 3

Triggered by: [trigger/context]
Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>
```

Example:
```
feat: add ch11 Functions JS files 80-91 with complete IQ documentation

- Add 12 new JS files covering function fundamentals
- Create comprehensive IQ_Notes with 9-section MASTER reference
- All files pass quality validation

Triggered by: Go Pikachu
Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>
```

---

## Development Tips

### Before Running Go Pikachu

- [ ] All chapter JS files created
- [ ] All IQ_Notes created (no placeholder tasks)
- [ ] MASTER IQ file created with 9 sections
- [ ] No syntax errors in markdown (``` blocks close properly)
- [ ] All Overview/Summary sections present

### If Go Pikachu Fails

1. **Read the error** — Hook messages are specific
2. **Fix the issue** — Usually missing IQ file or placeholder content in markdown
3. **Re-run Go Pikachu** — It will pass

### Common Issues

| Error | Cause | Fix |
|-------|-------|-----|
| "N file(s) missing documentation" | JS file lacks IQ_Notes | Create IQ_Notes/[filename]_IQ.md |
| "Missing required section: ## overview" | IQ file malformed | Add `## Overview` section |
| "No code block found" | No ``` in IQ file | Add code example with ``` fences |
| "Contains N placeholder(s)" | Placeholders not replaced | Replace all placeholder content with real explanations |
| "Missing MASTER IQ file" | MASTER_[Name]_IQ.md doesn't exist | Create MASTER with 9 sections |

---

## Configuration Files

- `.claude/settings.json` — Hook definitions and permissions
- `.agents/skills/go-pikachu/SKILL.md` — The Antigravity skill that automates the Go Pikachu workflow
- `.claude/hooks/` — Individual hook scripts (don't modify unless needed)

---

## When to Use Go Pikachu

✅ **After completing a chapter** — All files ready, run Go Pikachu to publish
✅ **After updating MASTER IQ** — Changes need validation and push
✅ **After fixing hook errors** — Re-run to validate fixes

❌ **Don't use** for small edits (commit manually instead)
❌ **Don't use** if IQ documentation incomplete (Go Pikachu will block)

---

## Related Docs

- `.claude/GO_PIKACHU_README.md` — Detailed workflow guide
- `.claude/settings.json` — Hook configuration
- `IQ_Notes/` — All learning notes
- `IQ_Notes/Chapter_Notes/NN/` — Chapter MASTER references

---

## Summary

Use Go Pikachu after completing each chapter to automate validation, commit, and publication. The workflow ensures all documentation is complete before code is pushed, maintaining high quality across all learning notes.

---

## 📈 Progress Tracker

- ✅ **Chapter 11 (Functions):** Completed, validated, and pushed. Includes 24 JS examples and a comprehensive MASTER guide covering Hoisting, TDZ, Scope, and Arrow Functions.
- ✅ **Chapter 19 (Import & Export):** Completed, validated, and documented. Includes 6 JS examples and a comprehensive MASTER guide covering ES Modules, Named/Default Exports, Aliasing, Live Bindings, and Dynamic Imports.
- ✅ **Chapter 20 (Classes & Objects):** Completed, validated, and documented. Includes JS examples and a comprehensive MASTER guide covering ES6 Classes, Constructors, Private Fields (#), Inheritance, Super, and Page Object Model patterns.
