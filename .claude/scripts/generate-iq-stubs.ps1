# Generate IQ_Notes stubs for chapter JS files missing documentation
# PowerShell version for Windows

$ErrorActionPreference = "Stop"

$REPO_ROOT = (git rev-parse --show-toplevel).Trim()
Set-Location $REPO_ROOT

Write-Host "📝 IQ_Notes Stub Generator" -ForegroundColor Yellow
Write-Host ""

# Find all chapter JS files
$jsFiles = @(Get-ChildItem -Path ".\*_chapter_*" -Filter "*.js" -Recurse -ErrorAction SilentlyContinue)

$created = 0
$skipped = 0

foreach ($jsFile in $jsFiles) {
    $BASE = $jsFile.BaseName
    $IQ_FILE = Join-Path "IQ_Notes" "${BASE}_IQ.md"

    if (-not (Test-Path $IQ_FILE)) {
        Write-Host "📄 Creating: $IQ_FILE" -ForegroundColor Cyan

        # Read JS file content
        $jsContent = Get-Content -Path $jsFile.FullName -Raw

        # Extract chapter number from path
        $chapterMatch = $jsFile.DirectoryName -match '\d+_chapter'
        $chapterName = if ($jsFile.DirectoryName -match '(\d+)_chapter_(\w+)') {
            $matches[2]
        } else {
            "Topic"
        }

        # Create stub content
        $stub = @"
# ${BASE} — ${chapterName}

**File:** `${jsFile.Name}`

## Overview

Write a brief description of what this file demonstrates.

---

## Main Concept

Explain the primary concept or pattern shown in this file.

### Code Example

\`\`\`javascript
$jsContent
\`\`\`

### Key Points

- Point 1
- Point 2
- Point 3

---

## Common Mistakes

- Mistake 1
- Mistake 2

---

## Summary

**Key Takeaway:** Write the most important takeaway from this lesson in one sentence.
"@

        # Create directory if needed
        $dir = Split-Path $IQ_FILE
        if (-not (Test-Path $dir)) {
            New-Item -ItemType Directory -Path $dir -Force | Out-Null
        }

        # Write stub file
        Set-Content -Path $IQ_FILE -Value $stub -Encoding UTF8
        Write-Host "   ✅ Created" -ForegroundColor Green
        $created++
    } else {
        $skipped++
    }
}

Write-Host ""
Write-Host "📊 Results:" -ForegroundColor Cyan
Write-Host "   ✅ Created: $created stub files" -ForegroundColor Green
Write-Host "   ⏭️  Skipped: $skipped (already documented)" -ForegroundColor Yellow
Write-Host ""
Write-Host "📝 Next Steps:" -ForegroundColor Yellow
Write-Host "   1. Open IQ_Notes/*.md files" -ForegroundColor White
Write-Host "   2. Replace placeholder text with real explanations" -ForegroundColor White
Write-Host "   3. Keep the code block (already populated)" -ForegroundColor White
Write-Host "   4. Remove placeholders when done" -ForegroundColor White
Write-Host "   5. Run: .\.claude\scripts\go-pikachu.ps1" -ForegroundColor White

