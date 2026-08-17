# GO PIKACHU — Create IQ note stubs for new chapter JS files
# PowerShell version for Windows
# Only creates missing IQ files. Does NOT edit/remove existing files or commit.

$ErrorActionPreference = "Stop"

$REPO_ROOT = (git rev-parse --show-toplevel).Trim()
Set-Location $REPO_ROOT

Write-Host "GO PIKACHU: Creating IQ stubs for new JS files" -ForegroundColor Yellow
Write-Host ""

# Scan for chapter JS files
$jsFiles = @(Get-ChildItem -Path ".\*_chapter_*" -Filter "*.js" -Recurse -ErrorAction SilentlyContinue)

if ($jsFiles.Count -eq 0) {
    Write-Host "No new chapter JS files found." -ForegroundColor Yellow
    exit 0
}

Write-Host "Found $($jsFiles.Count) JS file(s)`n"

$created = 0
$existing = 0

# Create IQ stubs only for new JS files
foreach ($jsFile in $jsFiles) {
    $chapterMatch = $jsFile.Directory.Name -match '^(\d+)_'
    if (-not $chapterMatch) {
        continue
    }
    $chapter = $matches[1]

    $BASE = $jsFile.BaseName
    $IQ_DIR = Join-Path "IQ_Notes" "Chapter_Notes" $chapter
    $IQ_FILE = Join-Path $IQ_DIR "${BASE}_IQ.md"

    if (Test-Path $IQ_FILE) {
        $existing++
    } else {
        # Create directory if needed
        if (-not (Test-Path $IQ_DIR)) {
            New-Item -ItemType Directory -Path $IQ_DIR -Force | Out-Null
        }

        # Create IQ stub
        $iqContent = @"
# $BASE — [Descriptive Title]

**File:** `$($jsFile.Directory.Name)/$($jsFile.Name)`

## Overview

Write a brief description of what this file demonstrates.

---

## Main Concept

Explain the primary concept or pattern shown in this file.

### Code Example

\`\`\`javascript
// Add code example from $($jsFile.Name)
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

        Set-Content -Path $IQ_FILE -Value $iqContent -Encoding UTF8
        $created++
        Write-Host "Created: $IQ_FILE" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "Summary: Created $created new files | $existing already exist" -ForegroundColor Cyan
Write-Host "Done. Manually stage, commit, and push when ready." -ForegroundColor Gray

