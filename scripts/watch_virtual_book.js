const fs = require('fs');
const path = require('path');
const cp = require('child_process');

console.log('⚡ [Virtual Book Watcher] Starting live file watcher...');
console.log('Watching: IQ_Notes/ and scripts/virtual_book_template.html for additions or changes...');

const buildScript = path.join(__dirname, 'build_virtual_book.js');
let timer = null;

function runBuild() {
  console.log('\n[Watcher] Changes detected. Rebuilding Playwright_Virtual_Book.html...');
  try {
    const output = cp.execSync(`node "${buildScript}"`).toString();
    console.log(output.trim());
    console.log('✅ [Watcher] Virtual Book updated successfully! Refresh your browser to view changes.\n');
  } catch (err) {
    console.error('❌ [Watcher] Build error:', err.message);
  }
}

// Initial build
runBuild();

// Watch directories
const watchDirs = [
  path.join(__dirname, '..', 'IQ_Notes'),
  path.join(__dirname, 'virtual_book_template.html')
];

watchDirs.forEach(target => {
  if (fs.existsSync(target)) {
    fs.watch(target, { recursive: true }, (eventType, filename) => {
      if (filename && (filename.endsWith('.md') || filename.endsWith('.html') || filename.endsWith('.js'))) {
        clearTimeout(timer);
        timer = setTimeout(runBuild, 500); // 500ms debounce
      }
    });
  }
});

console.log('👀 [Watcher] Active and listening for changes. Press Ctrl+C to stop.');
