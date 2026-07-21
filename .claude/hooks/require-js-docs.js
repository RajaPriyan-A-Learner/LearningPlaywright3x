const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function findMdFiles(dir) {
  let results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(findMdFiles(full));
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.md')) {
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

  let statusOut;
  try {
    statusOut = execSync('git status --porcelain -- "[0-9][0-9]_chapter_*/*.js"', {
      cwd: repoRoot,
      encoding: 'utf8'
    });
  } catch (e) {
    return;
  }

  const jsFiles = statusOut
    .split('\n')
    .filter(Boolean)
    .filter(line => !line.substring(0, 2).includes('D'))
    .map(line => line.substring(3).trim())
    .filter(f => f.endsWith('.js') && !f.includes(' -> '));

  if (jsFiles.length === 0) return;

  const iqNotesDir = path.join(repoRoot, 'IQ_Notes');
  let mdContent = '';
  try {
    const mdFiles = findMdFiles(iqNotesDir);
    mdContent = mdFiles.map(f => fs.readFileSync(f, 'utf8')).join('\n');
  } catch (e) {
    mdContent = '';
  }

  const undocumented = jsFiles.filter(f => !mdContent.includes(path.basename(f)));

  if (undocumented.length === 0) return;

  const reason = [
    'Blocking commit/push: new or modified JS files are missing IQ_Notes documentation.',
    '',
    'Undocumented files:',
    ...undocumented.map(f => '  - ' + f),
    '',
    'Before committing, create an individual markdown file in IQ_Notes/ for EACH file listed above (one .md per .js file), documenting what it demonstrates.',
    'Also review IQ_Notes/JavaScript_Quirks_and_Known_Bugs_IQ.md — if any of these files show a bug/quirk not already listed there, add it (with a cheat-sheet row). If nothing new, leave that file unchanged.',
    'Then retry the commit/push.'
  ].join('\n');

  console.log(JSON.stringify({
    hookSpecificOutput: {
      hookEventName: 'PreToolUse',
      permissionDecision: 'deny',
      permissionDecisionReason: reason
    }
  }));
});
