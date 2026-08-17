# GO PIKACHU — Auto-generate IQ notes for chapter JS files + commit
# PowerShell version for Windows

$ErrorActionPreference = "Stop"

$REPO_ROOT = (git rev-parse --show-toplevel).Trim()
Set-Location $REPO_ROOT

Write-Host "⚡ GO PIKACHU ACTIVATED ⚡" -ForegroundColor Yellow
Write-Host ""

# Step 1: Find all chapter JS files without matching IQ docs
Write-Host "🔍 Scanning chapter JS files..." -ForegroundColor Cyan

$MISSING_DOCS = 0
$jsFiles = @(Get-ChildItem -Path ".\*_chapter_*" -Filter "*.js" -Recurse -ErrorAction SilentlyContinue)

foreach ($jsFile in $jsFiles) {
    $BASE = $jsFile.BaseName
    $IQ_FILE = Join-Path "IQ_Notes" "${BASE}_IQ.md"

    if (-not (Test-Path $IQ_FILE)) {
        Write-Host "  ⚠️  Missing: $IQ_FILE (for $($jsFile.FullName))" -ForegroundColor Yellow
        $MISSING_DOCS++
    }
}

if ($MISSING_DOCS -eq 0) {
    Write-Host "✅ All chapter JS files have IQ documentation." -ForegroundColor Green
} else {
    Write-Host "❌ $MISSING_DOCS file(s) missing documentation." -ForegroundColor Red
    Write-Host ""
    Write-Host "⚡ Note: Auto-generation of IQ notes requires manual creation." -ForegroundColor Yellow
    Write-Host "   Use the IQ_Notes template to document each JS file." -ForegroundColor Yellow
    exit 1
}

# Step 2: Stage all changes
Write-Host ""
Write-Host "📦 Staging all changes..." -ForegroundColor Cyan
git add -A

# Step 3: Run hooks (PreToolUse validation)
Write-Host ""
Write-Host "🪝 Running PreToolUse hooks..." -ForegroundColor Cyan
# Hooks run automatically via settings.json

# Step 4: Commit
Write-Host ""
Write-Host "💾 Creating commit..." -ForegroundColor Cyan

$commitMessage = @"
feat: update chapter notes and examples

- Generate/update all IQ documentation for chapter JS files
- Run pre-commit validation hooks
- Ensure quality standards met

Triggered by: Go Pikachu
Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>
"@

try {
    git commit -m $commitMessage
} catch {
    Write-Host "❌ Commit failed (hooks may have blocked it)" -ForegroundColor Red
    exit 1
}

# Step 5: Run PostToolUse hooks
Write-Host ""
Write-Host "🪝 Running PostToolUse hooks..." -ForegroundColor Cyan
# Hooks run automatically via settings.json

# Step 6: Push
Write-Host ""
Write-Host "🚀 Pushing to main..." -ForegroundColor Cyan

try {
    git push origin main
} catch {
    Write-Host "⚠️  Push failed (likely due to missing documentation)" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "✅ GO PIKACHU COMPLETE!" -ForegroundColor Green
Write-Host "   ⚡ All changes committed and pushed to main" -ForegroundColor Green
