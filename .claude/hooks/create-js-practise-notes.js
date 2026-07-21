const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

let data = '';
process.stdin.on('data', d => data += d);
process.stdin.on('end', () => {
  let input;
  try {
    input = JSON.parse(data);
  } catch (e) {
    return;
  }

  const filePath = (input.tool_input && input.tool_input.file_path) || '';
  if (!filePath.toLowerCase().endsWith('.js')) return;

  let repoRoot;
  try {
    repoRoot = execSync('git rev-parse --show-toplevel', { encoding: 'utf8' }).trim();
  } catch (e) {
    return;
  }
  repoRoot = repoRoot.replace(/\//g, path.sep);

  const absFilePath = path.resolve(filePath);
  const relFromRoot = path.relative(repoRoot, absFilePath);
  const practiseRoot = 'JS_Practise' + path.sep;
  if (!relFromRoot.startsWith(practiseRoot)) return;

  const relFromPractise = relFromRoot.slice(practiseRoot.length);
  const relMd = relFromPractise.replace(/\.js$/i, '_IQ.md');
  const mdPath = path.join(repoRoot, 'IQ_Notes', 'JS_Practise_Notes', relMd);

  if (fs.existsSync(mdPath)) return;

  const baseName = path.basename(relFromPractise, '.js');
  const stub = [
    `# ${baseName} — Practice Notes`,
    '',
    '## Overview',
    '',
    `Covers \`JS_Practise/${relFromPractise.replace(/\\/g, '/')}\` — TODO: describe what this file demonstrates.`,
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

  const relMdForward = path.relative(repoRoot, mdPath).replace(/\\/g, '/');
  console.log(JSON.stringify({
    systemMessage: `Created stub notes file: ${relMdForward}`,
    hookSpecificOutput: {
      hookEventName: 'PostToolUse',
      additionalContext: `A new JS file was created under JS_Practise/. A stub notes file was auto-created at ${relMdForward} — fill it in with real explanation, worked examples, and gotchas for this file.`
    }
  }));
});
