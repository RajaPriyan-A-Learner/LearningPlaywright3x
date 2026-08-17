#!/bin/bash
# GO PIKACHU — Create IQ note stubs for new chapter JS files
# Only creates missing IQ files. Does NOT edit/remove existing files or commit.

set -e

REPO_ROOT=$(git rev-parse --show-toplevel)
cd "$REPO_ROOT"

echo "GO PIKACHU: Creating IQ stubs for new JS files"
echo ""

# Find all chapter JS files
JS_FILES=()
while IFS= read -r js_file; do
    JS_FILES+=("$js_file")
done < <(find . -path "./[0-9][0-9]_chapter_*/*.js" -type f | sort)

if [ ${#JS_FILES[@]} -eq 0 ]; then
    echo "No new chapter JS files found."
    exit 0
fi

echo "Found ${#JS_FILES[@]} JS file(s)"
echo ""

FILES_CREATED=0
FILES_EXISTING=0

# Create IQ stubs only for new JS files
for js_file in "${JS_FILES[@]}"; do
    BASE=$(basename "$js_file" .js)
    CHAPTER_DIR=$(dirname "$js_file")
    CHAPTER=$(basename "$CHAPTER_DIR" | sed 's/_chapter_.*$//')

    IQ_DIR="IQ_Notes/Chapter_Notes/$CHAPTER"
    IQ_FILE="$IQ_DIR/${BASE}_IQ.md"

    if [ -f "$IQ_FILE" ]; then
        ((FILES_EXISTING++))
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
        echo "Created: $IQ_FILE"
    fi
done

echo ""
echo "Summary: Created $FILES_CREATED new files | $FILES_EXISTING already exist"
echo "Done. Manually stage, commit, and push when ready."
