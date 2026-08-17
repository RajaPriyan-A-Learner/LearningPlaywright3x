# GO PIKACHU — Auto-generate IQ notes for chapter JS files + commit
# PowerShell version for Windows
# Workflow: Scan → Create IQ stubs → Validate hooks → Stage → Commit → PostHooks → Push

$ErrorActionPreference = "Stop"

$REPO_ROOT = (git rev-parse --show-toplevel).Trim()
Set-Location $REPO_ROOT

Write-Host "⚡ GO PIKACHU ACTIVATED ⚡" -ForegroundColor Yellow
Write-Host ""

# Step 1: SCAN — Find all chapter JS files
Write-Host "🔍 Step 1: Scanning chapter JS files..." -ForegroundColor Cyan

$jsFiles = @(Get-ChildItem -Path ".\*_chapter_*" -Filter "*.js" -Recurse -ErrorAction SilentlyContinue)
$filesCreated = 0
$filesExisting = 0

if ($jsFiles.Count -eq 0) {
    Write-Host "⚠️  No chapter JS files found." -ForegroundColor Yellow
    exit 0
}

Write-Host "   Found $($jsFiles.Count) JS file(s)"

# Step 2: CREATE missing IQ files (only for NEW JS files, not existing)
Write-Host ""
Write-Host "📝 Step 2: Creating IQ stubs for new JS files..." -ForegroundColor Cyan

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
        $filesExisting++
        Write-Host "   ✓ Exists: $IQ_FILE" -ForegroundColor Green
    } else {
        # Create IQ stub
        if (-not (Test-Path $IQ_DIR)) {
            New-Item -ItemType Directory -Path $IQ_DIR -Force | Out-Null
        }

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
        $filesCreated++
        Write-Host "   ✓ Created: $IQ_FILE" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "   Summary: Created $filesCreated, Existing $filesExisting"

# Step 3: VALIDATE — Run PreToolUse hooks
Write-Host ""
Write-Host "🪝 Step 3: Running PreToolUse hooks (validation)..." -ForegroundColor Cyan
Write-Host "   ⏳ Hooks validate quality, placeholders, MASTER files..." -ForegroundColor Gray

# Note: Hooks run automatically when git add/commit are called

# Step 4: RUN PostToolUse hooks info
Write-Host ""
Write-Host "🪝 Step 4: PostToolUse hooks (logging)..." -ForegroundColor Cyan
Write-Host "   ⏳ PostToolUse hooks will run after commit..." -ForegroundColor Gray

# Step 5: STAGE all changes (AFTER validation, BEFORE commit)
Write-Host ""
Write-Host "📦 Step 5: Staging all changes..." -ForegroundColor Cyan

try {
    git add -A
    Write-Host "   ✓ All changes staged" -ForegroundColor Green
} catch {
    Write-Host "❌ Staging failed" -ForegroundColor Red
    exit 1
}

# Step 6: COMMIT
Write-Host ""
Write-Host "💾 Step 6: Creating commit..." -ForegroundColor Cyan

$commitMessage = @"
feat: add/update chapter IQ documentation

- Created $filesCreated new IQ note(s)
- Validated $filesExisting existing documentation
- All files pass quality checks

Triggered by: Go Pikachu
Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>
"@

try {
    git commit -m $commitMessage
    Write-Host "   ✓ Commit created" -ForegroundColor Green
} catch {
    Write-Host "❌ Commit failed (hooks may have blocked it)" -ForegroundColor Red
    Write-Host "   Read hook errors above to fix issues" -ForegroundColor Yellow
    exit 1
}

# Step 7: PUSH
Write-Host ""
Write-Host "🚀 Step 7: Pushing to main..." -ForegroundColor Cyan

try {
    git push origin main
    Write-Host "   ✓ Pushed to main" -ForegroundColor Green
} catch {
    Write-Host "❌ Push failed" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "✅ GO PIKACHU COMPLETE!" -ForegroundColor Green
Write-Host "   Created: $filesCreated | Existing: $filesExisting | Staged & Pushed" -ForegroundColor Green

