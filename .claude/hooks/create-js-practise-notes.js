const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function findJsFiles(dir) {
  let results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(findJsFiles(full));
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.js')) {
      results.push(full);
    }
  }
  return results;
}

let data = '';
process.stdin.on('data', d => data += d);
process.stdin.on('end', () => {
  let input;
  try {
    input = JSON.parse(data);
  } catch (e) {
    return;
  }

  const cmd = (input.tool_input && input.tool_input.command) || '';
  if (!/\bgit\s+(commit|push)\b/.test(cmd)) return;

  let repoRoot;
  try {
    repoRoot = execSync('git rev-parse --show-toplevel', { encoding: 'utf8' }).trim();
  } catch (e) {
    return;
  }
  repoRoot = repoRoot.replace(/\//g, path.sep);

  const practiseDir = path.join(repoRoot, 'JS_Practise');
  if (!fs.existsSync(practiseDir)) return;

  const created = [];
  const incomplete = [];

  for (const jsFile of findJsFiles(practiseDir)) {
    const relFromPractise = path.relative(practiseDir, jsFile);
    const relMd = relFromPractise.replace(/\.js$/i, '_IQ.md');
    const mdPath = path.join(repoRoot, 'IQ_Notes', 'JS_Practise_Notes', relMd);
    const relMdForward = path.relative(repoRoot, mdPath).replace(/\\/g, '/');

    if (!fs.existsSync(mdPath)) {
      const baseName = path.basename(relFromPractise, '.js');
      const source = fs.readFileSync(jsFile, 'utf8').replace(/\s+$/, '');
      const stub = [
        `# ${baseName} — Practice Notes`,
        '',
        '## Overview',
        '',
        `Covers \`JS_Practise/${relFromPractise.replace(/\\/g, '/')}\` — TODO: describe what this file demonstrates.`,
        '',
        '## Source',
        '',
        '```javascript',
        source,
        '```',
        '',
        '---',
        '',
        '## Notes',
        '',
        'TODO: add explanation, worked examples, and any gotchas.',
        '',
        '---',
        '',
        '## Summary',
        '',
        '**Key Takeaway:** TODO.',
        ''
      ].join('\n');

      fs.mkdirSync(path.dirname(mdPath), { recursive: true });
      fs.writeFileSync(mdPath, stub, 'utf8');
      try {
        execSync('git add ' + JSON.stringify(relMdForward), { cwd: repoRoot });
      } catch (e) {
        // best effort; file stays on disk unstaged if `git add` fails
      }
      created.push(relMdForward);
    }

    const content = fs.readFileSync(mdPath, 'utf8');
    if (/TODO/.test(content)) {
      incomplete.push(relMdForward);
    }
  }

  if (incomplete.length === 0) {
    if (created.length > 0) {
      console.log(JSON.stringify({
        systemMessage: `Created and staged ${created.length} notes stub(s):\n` + created.map(f => '  - ' + f).join('\n')
      }));
    }
    return;
  }

  const reason = [
    'Blocking commit/push: JS_Practise notes still contain TODO placeholders.',
    '',
    'Files needing a real explanation:',
    ...incomplete.map(f => '  - ' + f),
    '',
    'Open each file listed above (the JS source is already embedded in it) and replace every TODO with a real explanation: what the file demonstrates, a worked walkthrough or trace of the logic, and any gotchas/bugs. Reuse or link ([[note-name]]) existing related IQ_Notes where relevant instead of duplicating.',
    'Then stage the updated notes and retry the commit/push.'
  ].join('\n');

  console.log(JSON.stringify({
    hookSpecificOutput: {
      hookEventName: 'PreToolUse',
      permissionDecision: 'deny',
      permissionDecisionReason: reason
    }
  }));
});
