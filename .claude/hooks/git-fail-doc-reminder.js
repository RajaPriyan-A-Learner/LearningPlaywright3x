let data = '';
process.stdin.on('data', d => data += d);
process.stdin.on('end', () => {
  let input;
  try {
    input = JSON.parse(data);
  } catch (e) {
    return;
  }
  const text = JSON.stringify(input.tool_response || {});
  const failurePattern = /fatal:|error:|rejected|denied|could not|failed|non-fast-forward|conflict|not a git repository|no such file/i;
  if (!failurePattern.test(text)) return;
  const cmd = (input.tool_input && input.tool_input.command) || '';
  const context = [
    'A git command just failed while working in this project.',
    '',
    'Command: ' + cmd,
    '',
    'Output:',
    text,
    '',
    'Update IQ_Notes/GitHub_Push_Setup_IQ.md (project root) with this new command and error, following the existing doc format: cause, diagnosis commands used, fix applied, and a one-line lesson. Append it under the Issues Actually Hit section, numbered after the existing entries.'
  ].join('\n');
  console.log(JSON.stringify({
    hookSpecificOutput: {
      hookEventName: 'PostToolUse',
      additionalContext: context
    }
  }));
});
