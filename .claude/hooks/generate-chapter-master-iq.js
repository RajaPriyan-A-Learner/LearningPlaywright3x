/**
 * generate-chapter-master-iq.js
 * PreToolUse hook — fires on: git commit
 *
 * Purpose:
 *   Before every commit, inspect which chapter folders (NN_chapter_*) have
 *   staged files. For each unique chapter found:
 *
 *   CASE 1 — MASTER file does NOT exist:
 *     → BLOCK the commit (deny) with a richly detailed prompt that tells
 *       the AI agent exactly what content to write into the master file.
 *       The agent creates the file, stages it, and retries the commit.
 *
 *   CASE 2 — MASTER file EXISTS but is STALE (older than newest individual note):
 *     → Allow the commit (pass-through) but inject additionalContext asking
 *       the agent to update the master file in a follow-up step.
 *
 * Master file location:
 *   IQ_Notes/Chapter_Notes/<NN>/MASTER_<ChapterName>_IQ.md
 *
 * Trigger: PreToolUse — Bash(git commit *)
 */

const { execSync } = require('child_process');
const fs   = require('fs');
const path = require('path');

// ─── Read stdin ────────────────────────────────────────────────────────────
let raw = '';
process.stdin.on('data', chunk => raw += chunk);
process.stdin.on('end', () => {
  let input;
  try { input = JSON.parse(raw); } catch { return; }

  const cmd = (input.tool_input && input.tool_input.command) || '';

  // Only act on git commit (not git commit-msg or other subcommands)
  if (!/\bgit\s+commit\b/.test(cmd)) return;

  // ── Resolve repo root ──────────────────────────────────────────────────
  let repoRoot;
  try {
    repoRoot = execSync('git rev-parse --show-toplevel', { encoding: 'utf8' })
                 .trim().replace(/\//g, path.sep);
  } catch { return; }

  // ── Get staged files ───────────────────────────────────────────────────
  let staged;
  try {
    staged = execSync('git diff --cached --name-only', {
      cwd: repoRoot, encoding: 'utf8'
    });
  } catch { return; }

  const stagedFiles = staged.split('\n').filter(Boolean);

  // ── Find unique chapters from staged files ─────────────────────────────
  // Matches: 09_chapter_Loops/52_Loops.js  → { num: '09', name: 'Loops' }
  const chapterRe = /^(\d{2})_chapter_([^/\\]+)[/\\]/;
  const chaptersMap = new Map(); // key = '09' → { num, name, stagedJs, individualNotes }

  for (const f of stagedFiles) {
    const m = f.match(chapterRe);
    if (!m) continue;
    const [, num, name] = m;
    if (!chaptersMap.has(num)) {
      chaptersMap.set(num, { num, name, stagedJs: [], individualNotes: [] });
    }
    if (f.endsWith('.js')) chaptersMap.get(num).stagedJs.push(f);
  }

  if (chaptersMap.size === 0) return; // no chapter JS files in this commit — pass through

  // ── For each chapter, inspect master file state ─────────────────────────
  const missing = [];  // chapters with no master file  → deny
  const stale   = [];  // chapters with stale master    → additionalContext

  for (const ch of chaptersMap.values()) {
    const notesDir   = path.join(repoRoot, 'IQ_Notes', 'Chapter_Notes', ch.num);
    const masterPath = path.join(notesDir, `MASTER_${ch.name}_IQ.md`);

    // Collect existing individual notes for this chapter
    let individualNotes = [];
    if (fs.existsSync(notesDir)) {
      individualNotes = fs.readdirSync(notesDir)
        .filter(f => f.endsWith('.md') && !f.startsWith('MASTER_'));
    }
    ch.individualNotes = individualNotes;

    if (!fs.existsSync(masterPath)) {
      missing.push(ch);
    } else {
      // Check staleness: master mtime vs newest individual note mtime
      const masterMtime = fs.statSync(masterPath).mtimeMs;
      const newestNote  = individualNotes
        .map(f => fs.statSync(path.join(notesDir, f)).mtimeMs)
        .reduce((a, b) => Math.max(a, b), 0);

      if (newestNote > masterMtime) {
        stale.push({ ch, masterPath: path.relative(repoRoot, masterPath).replace(/\\/g, '/') });
      }
    }
  }

  // ── CASE 1: Missing master files → BLOCK (deny) ────────────────────────
  if (missing.length > 0) {
    const blocks = missing.map(ch => buildMissingPrompt(ch, repoRoot)).join('\n\n' + '─'.repeat(60) + '\n\n');

    const reason = [
      `Blocking commit: ${missing.length} chapter(s) are missing their MASTER IQ file.`,
      '',
      'A MASTER IQ file is a single comprehensive reference that consolidates all',
      'individual notes for a chapter into one deep, interview-ready document.',
      '',
      '═'.repeat(60),
      '',
      blocks,
      '',
      '═'.repeat(60),
      '',
      'STEPS TO UNBLOCK:',
      '  1. Create each MASTER file listed above at the exact path shown.',
      '  2. Stage it:   git add IQ_Notes/Chapter_Notes/<NN>/MASTER_<Name>_IQ.md',
      '  3. Retry the commit.'
    ].join('\n');

    console.log(JSON.stringify({
      hookSpecificOutput: {
        hookEventName: 'PreToolUse',
        permissionDecision: 'deny',
        permissionDecisionReason: reason
      }
    }));
    return;
  }

  // ── CASE 2: Stale master files → WARN (additionalContext) ─────────────
  if (stale.length > 0) {
    const staleList = stale.map(({ ch, masterPath }) =>
      `  • ${masterPath}  (chapter: ${ch.num}_chapter_${ch.name})`
    ).join('\n');

    const context = [
      'NOTE: The following MASTER IQ files are stale — individual notes have been',
      'updated more recently than the master. Please update them after this commit.',
      '',
      staleList,
      '',
      'For each stale file, refresh:',
      '  - Any new syntax or methods introduced in the new individual notes',
      '  - The cheat-sheet section at the bottom',
      '  - Interview questions if new tricky scenarios were demonstrated',
      'Then commit the updated master file separately.'
    ].join('\n');

    console.log(JSON.stringify({
      hookSpecificOutput: {
        hookEventName: 'PreToolUse',
        additionalContext: context
      }
    }));
  }

  // (if nothing to report, exit silently — commit proceeds)
});

// ─── Build the rich deny prompt for a missing master file ─────────────────
function buildMissingPrompt(ch, repoRoot) {
  const masterRelPath = `IQ_Notes/Chapter_Notes/${ch.num}/MASTER_${ch.name}_IQ.md`;
  const notesDir      = path.join(repoRoot, 'IQ_Notes', 'Chapter_Notes', ch.num);

  // Read titles from individual notes so Claude knows what's covered
  const notesSummary = ch.individualNotes.map(f => {
    const content = fs.readFileSync(path.join(notesDir, f), 'utf8');
    const titleLine = content.split('\n').find(l => l.startsWith('# ')) || `# ${f}`;
    return `    - ${f}: ${titleLine.replace(/^#\s+/, '')}`;
  }).join('\n') || '    (no individual notes yet)';

  return [
    `MISSING: ${masterRelPath}`,
    `Chapter: ${ch.num}_chapter_${ch.name}`,
    '',
    `Individual notes already written for this chapter:`,
    notesSummary,
    '',
    'CREATE the master file at the exact path above.',
    'The file MUST contain ALL of the following sections (in this order):',
    '',
    '┌─ REQUIRED SECTIONS ──────────────────────────────────────────────────┐',
    '',
    '# [ChapterNum] — [ChapterName] : Complete Interview & Reference Guide',
    '',
    '> One-paragraph elevator pitch: what this chapter covers, where it fits',
    '> in JavaScript, and why it matters for a developer/tester.',
    '',
    '---',
    '',
    '## Table of Contents',
    '(auto-generated list linking to every section below)',
    '',
    '---',
    '',
    '## 1. Syntax Reference — End to End',
    'Cover EVERY syntax variation taught in this chapter.',
    'Use annotated code blocks for each pattern.',
    'Show valid alternatives (e.g., for vs while, i++ vs ++i).',
    '',
    '---',
    '',
    '## 2. Built-in Functions & Methods',
    'List ALL built-in JS functions/methods related to this chapter.',
    'For each:',
    '  • Signature  (e.g., `Array.prototype.splice(start, deleteCount, ...items)`)',
    '  • Return value',
    '  • Minimal runnable example',
    '  • Common mistake or gotcha',
    '',
    '---',
    '',
    '## 3. Deep Insights & Gotchas',
    'Non-obvious behaviours, engine-level quirks, coercion traps.',
    'Each insight: short title + explanation + code that proves it.',
    'Examples of what to cover per chapter:',
    `  Loops: infinite loop triggers, for..in on arrays, ++i vs i++ in expressions`,
    `  Arrays: sparse arrays, negative index trap, sort() default lexicographic order`,
    '',
    '---',
    '',
    '## 4. Interview-Ready Definitions',
    'For every key term in this chapter, write a crisp, polished definition',
    'a candidate would say in a technical interview. Format:',
    '',
    '### Term',
    '> **Definition (say this):** "..."',
    '> **Follow-up the interviewer will ask:** "..."',
    '> **Answer:** "..."',
    '',
    '---',
    '',
    '## 5. Tricky Interview Questions',
    'Write 12–15 questions that interviewers commonly ask about this chapter.',
    'For each question:',
    '  **Q:** The exact question (make it tricky — output prediction, edge case, bug spot)',
    '  **A:** Comprehensive answer with code proof where relevant',
    '  **Difficulty:** Easy / Medium / Hard',
    '',
    'Include at least:',
    '  • 3 "what is the output?" questions with surprising answers',
    '  • 2 "spot the bug" questions',
    '  • 2 "when would you use X vs Y?" design questions',
    '  • 2 "what happens if...?" edge-case questions',
    '',
    '---',
    '',
    '## 6. Controversial Topics & Ongoing Debates',
    'Discuss topics that JS developers actively disagree about or that have',
    'known browser inconsistencies / spec-edge-cases / open TC39 issues.',
    'Format:',
    '',
    '### Topic Title',
    '**The debate:** ...',
    '**One side:** ...',
    '**Other side:** ...',
    '**Current consensus / best practice:** ...',
    '',
    '---',
    '',
    '## 7. Quick Reference Cheat Sheet',
    'A compact, scannable table or code block a developer can glance at',
    'during a review or before an interview. Cover:',
    '  • All syntax forms in one place',
    '  • Method signatures in one table',
    '  • "Use X when Y" decision rules',
    '',
    '└──────────────────────────────────────────────────────────────────────┘',
    '',
    'STYLE RULES for the master file:',
    '  • Use ## numbered sections, ### sub-sections',
    '  • Every code example must be in a fenced ```javascript block',
    '  • Definitions section must use the > blockquote format shown above',
    '  • End with a ## Summary that links back to individual note files',
    '  • Tone: clear, precise, slightly formal — as if writing a high-quality textbook entry'
  ].join('\n');
}
