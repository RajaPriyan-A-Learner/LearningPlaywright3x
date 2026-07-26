/**
 * validate-md-quality.js
 * PreToolUse hook — fires on: git add <files>
 *
 * Purpose:
 *   Before any markdown file is staged, verify that it meets the minimum
 *   quality bar defined for this project:
 *     1. No TODO placeholders remain.
 *     2. Required sections are present: Overview, Summary.
 *     3. At least one code block (```) exists (reference code is mandatory).
 *
 *   If any staged .md file fails validation the hook blocks the `git add`
 *   and tells the agent exactly which files need fixing and why.
 *
 * Trigger: PreToolUse — Bash(git add *)
 */

const fs   = require('fs');
const path = require('path');

// ─── Required section headings (case-insensitive) ──────────────────────────
const REQUIRED_SECTIONS = ['## overview', '## summary'];

// ─── Read stdin (Claude passes the tool_input JSON here) ──────────────────
let raw = '';
process.stdin.on('data', chunk => raw += chunk);
process.stdin.on('end', () => {
  let input;
  try { input = JSON.parse(raw); } catch { return; }

  const cmd = (input.tool_input && input.tool_input.command) || '';

  // Only act on `git add` commands
  if (!/\bgit\s+add\b/.test(cmd)) return;

  // ── Resolve repo root ────────────────────────────────────────────────────
  let repoRoot;
  try {
    const { execSync } = require('child_process');
    repoRoot = execSync('git rev-parse --show-toplevel', { encoding: 'utf8' }).trim()
                 .replace(/\//g, path.sep);
  } catch { return; }

  // ── Parse file paths from the git add command ─────────────────────────────
  // Strip the leading "git add" and split remaining tokens.
  // Handles: git add file.md, git add ., git add -A, git add IQ_Notes/
  const tokens = cmd.replace(/^git\s+add\s+/, '').trim().split(/\s+/);

  // Resolve each token to a list of absolute .md file paths
  const mdFiles = [];

  for (const token of tokens) {
    if (!token || token.startsWith('-')) continue; // skip flags

    const abs = path.isAbsolute(token) ? token : path.join(repoRoot, token);

    if (!fs.existsSync(abs)) continue;

    const stat = fs.statSync(abs);
    if (stat.isDirectory()) {
      collectMd(abs, mdFiles);
    } else if (abs.toLowerCase().endsWith('.md')) {
      mdFiles.push(abs);
    }
  }

  if (mdFiles.length === 0) return; // no markdown files involved — pass through

  // ── Validate each .md file ───────────────────────────────────────────────
  const errors = [];

  for (const mdPath of mdFiles) {
    const rel  = path.relative(repoRoot, mdPath).replace(/\\/g, '/');
    let content;
    try { content = fs.readFileSync(mdPath, 'utf8'); } catch { continue; }

    const lower     = content.toLowerCase();
    const fileErrors = [];

    // 1. TODO check
    const todoMatches = (content.match(/\bTODO\b/g) || []).length;
    if (todoMatches > 0) {
      fileErrors.push(
        `  ✗ Contains ${todoMatches} TODO placeholder(s) — replace with real content`
      );
    }

    // 2. Required sections check
    for (const section of REQUIRED_SECTIONS) {
      if (!lower.includes(section)) {
        fileErrors.push(
          `  ✗ Missing required section: "${section.replace('## ', '## ')}" heading`
        );
      }
    }

    // 3. Code block check — at least one ``` fence
    if (!content.includes('```')) {
      fileErrors.push(
        '  ✗ No code block found — add a ```javascript reference code section'
      );
    }

    if (fileErrors.length > 0) {
      errors.push(`${rel}:\n${fileErrors.join('\n')}`);
    }
  }

  if (errors.length === 0) return; // all good — allow git add

  // ── Block staging and report ─────────────────────────────────────────────
  const reason = [
    `Blocking git add: ${errors.length} markdown file(s) failed quality checks.`,
    '',
    'Files that need fixes before staging:',
    '',
    ...errors.map(e => e + '\n'),
    'Quality requirements for every IQ note:',
    '  1. No TODO placeholders — replace all with real explanations.',
    '  2. Must have a "## Overview" section.',
    '  3. Must have a "## Summary" section with a Key Takeaway.',
    '  4. Must have at least one ```javascript code block.',
    '',
    'Fix the issues above, then retry git add.'
  ].join('\n');

  console.log(JSON.stringify({
    hookSpecificOutput: {
      hookEventName: 'PreToolUse',
      permissionDecision: 'deny',
      permissionDecisionReason: reason
    }
  }));
});

// ─── Helper: recursively collect .md files from a directory ────────────────
function collectMd(dir, results) {
  let entries;
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      collectMd(full, results);
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.md')) {
      results.push(full);
    }
  }
}
