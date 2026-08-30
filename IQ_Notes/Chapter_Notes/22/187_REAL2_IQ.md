# 187_REAL2 — Multi-Format Test Reporting with Polymorphic Classes

**File:** `22_chapter_Inheritance/Single Inheritance/187_REAL2.js`

## Overview
This file demonstrates a real-world enterprise test reporting architecture. It shows how specialized report formatters (`HTMLReport`, `JSONReport`, `TextReport`) inherit from a common `Report` base class, allowing test runners to generate multi-format test execution summaries through a unified `generate(data)` interface.

---

## Main Concept
Enterprise test suites must generate test results in multiple formats:
- HTML reports for stakeholders and visual inspection.
- JSON reports for CI/CD pipeline integration and database ingestion.
- Plain text reports for terminal/console output.

By establishing an inheritance hierarchy based on `Report`, formatting implementations are modular, decoupled, and interchangeable.

### Code Example

```javascript
class Report {
    generate(data) {
        console.log("Raw data: " + data);
    }
}

class HTMLReport extends Report {
    generate(data) {
        console.log("<html><body>" + data + "</body></html>");
    }
}

class JSONReport extends Report {
    generate(data) {
        console.log('{"report": "' + data + '"}');
    }
}

class TextReport extends Report {
    generate(data) {
        console.log("=== REPORT ===\n" + data + "\n==============");
    }
}

let reports = [new HTMLReport(), new JSONReport(), new TextReport()];

reports.forEach(function (r) {
    r.generate("5 tests passed, 1 failed");
    console.log("---");
});
```

### Key Points
- Dependency Inversion / Open-Closed Principle: High-level test runners only depend on the `Report` contract; concrete formatters can be added or swapped without touching runner logic.
- Extensibility: Adding `XMLReport` (e.g. for JUnit/Jenkins) requires only a new class extending `Report`.
- Real-world frameworks (like Allure, Playwright Reporters, Mochawesome) utilize this exact polymorphic reporter architecture.

---

## Common Mistakes
- **Formatting data in place instead of returning structured output:** In production reporter classes, `generate()` should often return string/buffer payloads or write to disk rather than solely logging to console.
- **Handling unstructured data:** Formatters should accept structured test result objects rather than raw concatenated strings to ensure robust JSON/HTML serialization.

---

## Summary
**Key Takeaway:** Extending a base `Report` class into concrete formatters (`HTMLReport`, `JSONReport`, `TextReport`) provides a flexible, modular reporting architecture for test automation pipelines.
