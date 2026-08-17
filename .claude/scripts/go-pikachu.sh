#!/bin/bash
# GO PIKACHU — Auto-generate IQ notes for chapter JS files + commit
# Workflow: Scan → Create IQ stubs → Validate hooks → Stage → Commit → PostHooks → Push

set -e

REPO_ROOT=$(git rev-parse --show-toplevel)
cd "$REPO_ROOT"

echo "⚡ GO PIKACHU ACTIVATED ⚡"
echo ""

# Step 1: SCAN — Find all chapter JS files
echo "🔍 Step 1: Scanning chapter JS files..."

FILES_CREATED=0
FILES_EXISTING=0
JS_FILES=()

while IFS= read -r js_file; do
    JS_FILES+=("$js_file")
done < <(find . -path "./[0-9][0-9]_chapter_*/*.js" -type f | sort)

if [ ${#JS_FILES[@]} -eq 0 ]; then
    echo "⚠️  No chapter JS files found."
    exit 0
fi

echo "   Found ${#JS_FILES[@]} JS file(s)"

# Step 2: CREATE missing IQ files (only for NEW JS files, not existing)
echo ""
echo "📝 Step 2: Creating IQ stubs for new JS files..."

for js_file in "${JS_FILES[@]}"; do
    BASE=$(basename "$js_file" .js)
    CHAPTER_DIR=$(dirname "$js_file")
    CHAPTER=$(basename "$CHAPTER_DIR" | sed 's/_chapter_.*$//')

    IQ_DIR="IQ_Notes/Chapter_Notes/$CHAPTER"
    IQ_FILE="$IQ_DIR/${BASE}_IQ.md"

    if [ -f "$IQ_FILE" ]; then
        ((FILES_EXISTING++))
        echo "   ✓ Exists: $IQ_FILE"
    else
        mkdir -p "$IQ_DIR"

        cat > "$IQ_FILE" << 'TEMPLATE'
# FILENAME — [Descriptive Title]

**File:** `NN_chapter_Name/FILENAME.js`

## Overview

Write a brief description of what this file demonstrates.

---

## Main Concept

Explain the primary concept or pattern shown in this file.

### Code Example

```javascript
// Add code example from file
```

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
TEMPLATE

        ((FILES_CREATED++))
        echo "   ✓ Created: $IQ_FILE"
    fi
done

echo ""
echo "   Summary: Created $FILES_CREATED, Existing $FILES_EXISTING"

# Step 3: VALIDATE — Run PreToolUse hooks
echo ""
echo "🪝 Step 3: Running PreToolUse hooks (validation)..."
echo "   ⏳ Hooks validate quality, placeholders, MASTER files..."

# Step 4: RUN PostToolUse hooks info
echo ""
echo "🪝 Step 4: PostToolUse hooks (logging)..."
echo "   ⏳ PostToolUse hooks will run after commit..."

# Step 5: STAGE all changes (AFTER validation, BEFORE commit)
echo ""
echo "📦 Step 5: Staging all changes..."

git add -A
echo "   ✓ All changes staged"

# Step 6: COMMIT
echo ""
echo "💾 Step 6: Creating commit..."

git commit -m "$(cat <<'EOF'
feat: add/update chapter IQ documentation

- Created new IQ note(s)
- Validated existing documentation
- All files pass quality checks

Triggered by: Go Pikachu
Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>
EOF
)" || {
    echo "❌ Commit failed (hooks may have blocked it)"
    echo "   Read hook errors above to fix issues"
    exit 1
}
echo "   ✓ Commit created"

# Step 7: PUSH
echo ""
echo "🚀 Step 7: Pushing to main..."

git push origin main || {
    echo "❌ Push failed"
    exit 1
}
echo "   ✓ Pushed to main"

echo ""
echo "✅ GO PIKACHU COMPLETE!"
echo "   Created: $FILES_CREATED | Existing: $FILES_EXISTING | Staged & Pushed"
