#!/bin/bash
# Generate IQ_Notes stubs for chapter JS files missing documentation
# Bash version for Mac/Linux

set -e

REPO_ROOT=$(git rev-parse --show-toplevel)
cd "$REPO_ROOT"

echo "📝 IQ_Notes Stub Generator"
echo ""

CREATED=0
SKIPPED=0

# Find all chapter JS files
while IFS= read -r js_file; do
    BASE=$(basename "$js_file" .js)
    IQ_FILE="IQ_Notes/${BASE}_IQ.md"

    if [ ! -f "$IQ_FILE" ]; then
        echo "📄 Creating: $IQ_FILE"

        # Read JS file content
        JS_CONTENT=$(cat "$js_file")

        # Extract chapter name from directory
        CHAPTER_NAME=$(basename $(dirname "$js_file") | sed 's/^[0-9]*_chapter_//')

        # Create stub content
        STUB="# ${BASE} — ${CHAPTER_NAME}

**File:** \`${js_file##*/}\`

## Overview

Write a brief description of what this file demonstrates.

---

## Main Concept

Explain the primary concept or pattern shown in this file.

### Code Example

\`\`\`javascript
${JS_CONTENT}
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
"

        # Create directory if needed
        mkdir -p $(dirname "$IQ_FILE")

        # Write stub file
        echo "$STUB" > "$IQ_FILE"
        echo "   ✅ Created"
        CREATED=$((CREATED + 1))
    else
        SKIPPED=$((SKIPPED + 1))
    fi
done < <(find . -path "./[0-9][0-9]_chapter_*/*.js" -type f | sort)

echo ""
echo "📊 Results:"
echo "   ✅ Created: $CREATED stub files"
echo "   ⏭️  Skipped: $SKIPPED (already documented)"
echo ""
echo "📝 Next Steps:"
echo "   1. Open IQ_Notes/*.md files"
echo "   2. Replace placeholder text with real explanations"
echo "   3. Keep the code block (already populated)"
echo "   4. Remove placeholders when done"
echo "   5. Run: bash ./.claude/scripts/go-pikachu.sh"
