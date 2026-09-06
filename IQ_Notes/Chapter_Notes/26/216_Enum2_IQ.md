# 216 — Defect Severity Levels and Enum Constants

**File:** `26_chapter_Abstractions/02_chapter_ENUM/216_Enum2.ts`

## Overview
This file demonstrates **Enumerating Defect Severity Levels** using a `SeverityLevels` string enum (`LOW`, `MEDIUM`, `HIGH`, `CRITICAL`, `BLOCKING`). It illustrates how QA defect tracking, bug prioritization, and test triage classifications are formalized through TypeScript enums.

---

## Main Concept

Defect tracking systems (like Jira, Bugzilla, or Azure DevOps) categorize test failures into standardized severity tiers. Declaring an enum standardizes these values across defect reporting classes and automated alert webhooks.

### Enum Definition
```typescript
enum SeverityLevels {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high",
    CRITICAL = "critical",
    BLOCKING = "blocking"
}
```

### Code Example

```typescript
enum SeverityLevels {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high",
    CRITICAL = "critical",
    BLOCKING = "blocking"
}

console.log(SeverityLevels.LOW); // "low"

interface DefectReport {
    title: string;
    severity: SeverityLevels;
}

const bug: DefectReport = {
    title: "Checkout 500 error",
    severity: SeverityLevels.CRITICAL
};

console.log(`Defect: [${bug.severity.toUpperCase()}] ${bug.title}`);
```

### Key Points
- **Consistent Payloads:** Useful when sending Slack/Teams notifications or raising bugs via Jira REST APIs where severity strings must match exact predefined tokens.
- **Refactoring Resilience:** Renaming underlying wire values (e.g., changing `"low"` to `"P3"`) only requires editing the enum definition, leaving all consuming code unchanged.
- **Autocomplete & Discoverability:** Developers get IDE autocomplete for all valid severity levels immediately after typing `SeverityLevels.`.

---

## Common Mistakes
- **Confusing numeric and string enums:** Numeric enums (`enum Level { Low, High }`) auto-increment (`0, 1`) and support reverse mapping (`Level[0] === "Low"`). String enums do NOT have reverse mapping.
- **Modifying enum members at runtime:** Enum members are read-only constants; attempting `SeverityLevels.LOW = "trivial"` produces a compiler error.

---

## Summary
**Key Takeaway:** The `SeverityLevels` enum encapsulates standardized defect classification tiers, providing IDE autocomplete and type safety for bug tracking and reporting workflows.
