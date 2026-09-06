const fs = require('fs');
const path = require('path');
const cp = require('child_process');

console.log('--- Building Playwright Virtual Book ---');

// Chapter Titles Map
const CHAPTER_TITLES = {
  '01': 'Chapter 01: JavaScript Basics & Environment',
  '02': 'Chapter 02: Execution Context & Memory Lifecycle',
  '03': 'Chapter 03: Identifiers & Naming Rules',
  '04': 'Chapter 04: Literals & Data Primitives',
  '05': 'Chapter 05: Operators, Bitwise & Precedence',
  '06': 'Chapter 06: Control Flow & Conditional Statements',
  '07': 'Chapter 07: Switch-Case & Decision Matrices',
  '08': 'Chapter 08: User Inputs, Terminal & Prompts',
  '09': 'Chapter 09: Loops & Iteration Control',
  '10': 'Chapter 10: Arrays & Buffer Foundations',
  '11': 'Chapter 11: Functions, Scope, Hoisting & TDZ',
  '12': 'Chapter 12: Closures & Lexical Environments',
  '13': 'Chapter 13: Strings, Templates & RegExp',
  '14': 'Chapter 14: Objects & Property Descriptors',
  '15': 'Chapter 15: Multi-Dimensional Arrays & Matrices',
  '16': 'Chapter 16: Callbacks & Async Foundations',
  '17': 'Chapter 17: Promises & Microtask Queues',
  '18': 'Chapter 18: Async/Await & Concurrency Patterns',
  '19': 'Chapter 19: ES Modules, Dynamic Imports & Live Bindings',
  '20': 'Chapter 20: Classes, Constructors, Private Fields & Super',
  '21': 'Chapter 21: Encapsulation & Role-Based Authorization',
  '22': 'Chapter 22: Inheritance, Super Chains & Multiple Mixins',
  '23': 'Chapter 23: Subtype Polymorphism & Dynamic Dispatch',
  '24': 'Chapter 24: OOPS Master Interview Problem Sets',
  '25': 'Chapter 25: TypeScript Compilation, Types & Type Erasure',
  '26': 'Chapter 26: Abstractions: Interfaces, Enums & Abstract Classes',
  '27': 'Chapter 27: Generics: Constraints & API Envelopes',
  '28': 'Chapter 28: Access Modifiers & Page Object Model'
};

function getPartForChapter(ch) {
  const num = parseInt(ch, 10);
  if (num >= 1 && num <= 10) return 'Part I: JavaScript Core Engine (Ch 01-10)';
  if (num >= 11 && num <= 18) return 'Part II: Asynchronous Architecture & Closures (Ch 11-18)';
  if (num >= 19 && num <= 24) return 'Part III: Object-Oriented Design & Patterns (Ch 19-24)';
  if (num >= 25 && num <= 28) return 'Part IV: TypeScript & Playwright Abstractions (Ch 25-28)';
  return 'Additional Modules';
}

function extractTitleFromMd(content, fallback) {
  const lines = content.split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('# ')) {
      return trimmed.replace(/^#\s+/, '').replace(/^NN_FileName\s+[—\-]\s*/, '').trim();
    }
  }
  return fallback;
}

const documents = [];

// 1. Process JS/TS Chapters 01 to 28
const chDir = path.join(__dirname, '..', 'IQ_Notes', 'Chapter_Notes');
if (fs.existsSync(chDir)) {
  const chapters = fs.readdirSync(chDir).filter(f => fs.statSync(path.join(chDir, f)).isDirectory()).sort();
  for (const ch of chapters) {
    const dir = path.join(chDir, ch);
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
    
    // Sort so MASTER file is first, then alphanumeric
    files.sort((a, b) => {
      const aMaster = a.startsWith('MASTER_');
      const bMaster = b.startsWith('MASTER_');
      if (aMaster && !bMaster) return -1;
      if (!aMaster && bMaster) return 1;
      return a.localeCompare(b, undefined, { numeric: true });
    });

    for (const file of files) {
      const filePath = path.join(dir, file);
      const rawContent = fs.readFileSync(filePath, 'utf8');
      const isMaster = file.startsWith('MASTER_');
      const cleanFallback = file.replace(/\.md$/, '').replace(/_/g, ' ');
      const title = extractTitleFromMd(rawContent, cleanFallback);
      
      documents.push({
        id: `ch${ch}_${file.replace(/[^a-zA-Z0-9_]/g, '')}`,
        part: getPartForChapter(ch),
        chapterNum: ch,
        chapterTitle: CHAPTER_TITLES[ch] || `Chapter ${ch}`,
        fileName: file,
        isMaster,
        track: 'js',
        title,
        content: rawContent
      });
    }
  }
}
console.log(`Loaded ${documents.length} chapter documents from Chapter_Notes.`);

// 2. Process C# Track from csharp-edition branch
try {
  const csharpList = cp.execSync('git ls-tree -r --name-only csharp-edition IQ_Notes_CSharp')
    .toString().trim().split('\n').filter(Boolean);

  // Sort C# files so MASTER is first, then 01, 02...
  csharpList.sort((a, b) => {
    const aMaster = a.includes('MASTER_');
    const bMaster = b.includes('MASTER_');
    if (aMaster && !bMaster) return -1;
    if (!aMaster && bMaster) return 1;
    return a.localeCompare(b, undefined, { numeric: true });
  });

  for (const cPath of csharpList) {
    const fileContent = cp.execSync(`git show csharp-edition:${cPath}`).toString('utf8');
    const fileName = path.basename(cPath);
    const isMaster = fileName.startsWith('MASTER_');
    const cleanFallback = fileName.replace(/\.md$/, '').replace(/_/g, ' ');
    const title = extractTitleFromMd(fileContent, cleanFallback);

    documents.push({
      id: `csharp_${fileName.replace(/[^a-zA-Z0-9_]/g, '')}`,
      part: 'Part V: C# (.NET 8+) Parallel Automation Framework',
      chapterNum: 'CSharp',
      chapterTitle: 'C# (.NET 8+) & Playwright for .NET Track',
      fileName,
      isMaster,
      track: 'csharp',
      title,
      content: fileContent
    });
  }
  console.log(`Loaded ${csharpList.length} documents from C# Track.`);
} catch (err) {
  console.warn('Could not read C# track via git show:', err.message);
}

// 3. Process Practice Notes
const practiseDir = path.join(__dirname, '..', 'IQ_Notes', 'JS_Practise_Notes');
if (fs.existsSync(practiseDir)) {
  const walk = (d) => {
    fs.readdirSync(d).forEach(f => {
      const p = path.join(d, f);
      if (fs.statSync(p).isDirectory()) {
        walk(p);
      } else if (f.endsWith('.md')) {
        const rawContent = fs.readFileSync(p, 'utf8');
        const title = extractTitleFromMd(rawContent, f.replace(/\.md$/, ''));
        documents.push({
          id: `practise_${f.replace(/[^a-zA-Z0-9_]/g, '')}`,
          part: 'Part VI: Problem Sets & Interview Practice',
          chapterNum: 'Practise',
          chapterTitle: 'Hands-on Practice & Algorithms',
          fileName: f,
          isMaster: false,
          track: 'practise',
          title,
          content: rawContent
        });
      }
    });
  };
  walk(practiseDir);
}

console.log(`Total documents compiled into virtual book: ${documents.length}`);

// Load Template & Inject JSON
const templatePath = path.join(__dirname, 'virtual_book_template.html');
const templateHtml = fs.readFileSync(templatePath, 'utf8');

const jsonPayload = JSON.stringify(documents).replace(/<\/script>/g, '<\\/script>');
const finalHtml = templateHtml.split('__DATABASE_JSON__').join(jsonPayload);

const outputPath = path.join(__dirname, '..', 'Playwright_Virtual_Book.html');
fs.writeFileSync(outputPath, finalHtml, 'utf8');

console.log(`✅ Playwright Virtual Book successfully generated at: ${outputPath}`);
console.log(`Total size: ${(fs.statSync(outputPath).size / (1024 * 1024)).toFixed(2)} MB`);
