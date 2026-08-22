---
name: go-pikachu
description: >-
  Use this skill when the user asks to run "Go Pikachu" or wants to validate, document, commit, and publish their chapter learning materials.
---

# Go Pikachu Automated Workflow

This skill automates the validation, documentation generation, and publishing of JavaScript chapter materials in this repository, strictly enforcing the project's quality standards.

## Instructions for the Agent

When the user asks to trigger "Go Pikachu", execute the following steps precisely:

### 1. Scan the Current Chapter
Identify the current working chapter directory based on the user's open files or recent context (e.g., `11_chapter_Function`). Scan and list all `.js` files located in this directory.

### 2. Scaffold and Validate IQ Documentation
For every `.js` file found in step 1, check the corresponding `IQ_Notes/Chapter_Notes/<chapter_num>/` directory for an associated `_IQ.md` file (e.g., `92_Spread_Function_IQ.md`).
- **If missing:** Create it using the `write_to_file` tool.
- **Content Rules:** You MUST populate the file with real, high-quality content. NEVER use placeholders (e.g., "Write a brief description..."). 
- **Required Sections:** Each `_IQ.md` file MUST contain:
  - `## Overview`
  - `## Main Concept`
  - A working Javascript code block (```javascript)
  - `## Common Mistakes`
  - `## Summary`

### 3. Validate the MASTER IQ Reference
Verify that a master reference file (e.g., `MASTER_Function_IQ.md`) exists in the chapter's `IQ_Notes` directory. 
- If it is missing or incomplete, create or update it.
- **Content Rules:** The master file MUST contain exactly these 9 sections:
  1. Syntax Reference — End to End
  2. Built-in Functions & Methods
  3. Deep Insights & Gotchas
  4. Interview-Ready Definitions
  5. Tricky Interview Questions
  6. Controversial Topics & Ongoing Debates
  7. Quick Reference Cheat Sheet
  8. Memory Map & Visual Flowchart (Use mermaid.js code blocks)
  9. LinkedIn-Style Post

### 4. Stage, Commit, and Push
Once all files are verified to be complete and placeholder-free, use the `run_command` tool to execute the Git workflow:
- `git add -A`
- `git commit -m "feat: complete IQ documentation for Chapter <chapter_num> newly added files\n\n- Scaffolded missing IQ notes\n- Validated MASTER reference\n\nTriggered by: Go Pikachu Skill\nCo-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>"`
- `git push origin main`

### 5. Present Results
Create a `walkthrough.md` artifact to summarize the actions taken, list the files created, and confirm to the user that the code has been successfully pushed.
