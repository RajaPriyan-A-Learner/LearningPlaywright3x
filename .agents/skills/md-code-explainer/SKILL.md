---
name: md-code-explainer
description: >-
  Use this skill to update existing markdown (.md) files that reference code examples (.ts, .js, .spec.ts files). It instructs the agent to read the referenced code, explain it line-by-line, provide reasoning for the current implementation, and suggest alternative effective ways.
---

# Markdown Code Explainer

This skill provides a systematic approach for updating markdown documentation files with detailed explanations of referenced code examples. 

## When to Use
Use this skill when the user asks you to explain code examples mentioned in markdown files, specifically requesting line-by-line breakdowns, reasons for the coder's approach, and alternative suggestions.

## Steps

1.  **Identify Target Markdown Files:**
    Confirm which `.md` files the user wants to update. You can use the `grep_search` tool if you need to find markdown files containing specific code references.

2.  **Scan for Code References:**
    Read the target markdown file using `view_file` to identify any referenced code files, such as `.ts`, `.js`, or `.spec.ts` files.

3.  **Analyze the Referenced Code:**
    Read the content of the referenced code files using the `view_file` tool.
    Analyze the code carefully to understand its logic, purpose, and design.

4.  **Generate the Explanation:**
    For each code reference found in the markdown file, prepare an explanation block. This block MUST include three sections:
    *   **Line-by-line Explanation:** A detailed, easy-to-understand breakdown of what each line or logical block of code is doing.
    *   **Coder's Choice (Why):** An explanation of why the original author likely chose this specific approach. What problem does it solve? What are the benefits of this pattern?
    *   **Alternative Effective Way:** A proposed alternative way to implement the same functionality that might be more modern, performant, readable, or effective. Explain *why* the alternative could be better.

5.  **Update the Markdown File:**
    Use `replace_file_content` or `multi_replace_file_content` to safely insert your generated explanations into the `.md` file, placing it directly below the referenced code or in an appropriate designated section.

## Example Output Format

When updating the markdown file, structure the new section clearly using headers and bullet points. Example:

```markdown
### Code Breakdown: `example.spec.ts`

**Line-by-line Explanation:**
*   `Line 1-3`: Imports necessary modules from Playwright test runner.
*   `Line 5`: Defines the test suite using `test.describe()`.
*   ...

**Why this approach was chosen:**
The coder chose this method because it explicitly handles session state, which is crucial for tests that require authentication before proceeding.

**Alternative Effective Way:**
Alternatively, you could use `test.use({ storageState: 'state.json' })` at the configuration level. This is more effective because it automatically injects the authenticated state into all tests within the file, reducing boilerplate code and making the tests cleaner.
```
