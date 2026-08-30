# 176_Bank — Business Logic and Authorization-Based Encapsulation

**File:** `21_chapter_Encapsulation/176_Bank.js`

## Overview
This file demonstrates a classic real-world banking domain example (`ICICI` class). It highlights how encapsulation enables role-based authorization and business rule validation before allowing modifications to sensitive private data (`#balance`).

---

## Main Concept
Encapsulation is not just about making variables private—it is about putting gatekeepers on state changes.

### Role-Based Access Control in Setters
In a banking scenario, an arbitrary caller cannot simply reset the balance. In `176_Bank.js`, the `setBalance(balance, isCashier)` method enforces that only authorized roles (`isCashier === true`) can update `#balance`.

### Code Example

```javascript
class ICICI {
    #balance;

    constructor(name, balance) {
        this.#balance = balance;
        this.name = name;
    }

    getBalance() {
        return this.#balance;
    }

    setBalance(balance, isCashier) {
        if (isCashier) {
            this.#balance = balance;
        } else {
            console.log("Not allowed");
        }
    }
}

let pramod = new ICICI("Pramod", 1000);
console.log(pramod.getBalance()); // 1000
pramod.setBalance(10000000, false); // "Not allowed"
console.log(pramod.getBalance()); // 1000 (Unchanged!)

let pramod_father = new ICICI("Pramod", 2000);
console.log(pramod_father.getBalance()); // 2000
pramod_father.setBalance(300000, true);
console.log(pramod_father.getBalance()); // 300000 (Updated by cashier)
```

### Key Points
- Without `#balance`, any code could run `pramod.balance = 10000000;` directly, leading to catastrophic security and accounting vulnerabilities.
- Setters can accept auxiliary parameters (e.g. `isCashier`, user roles, auth tokens) or perform validation checks (e.g. `balance >= 0`) before committing state changes.
- Each instance retains its own private `#balance` memory slot.

---

## Common Mistakes
- **Relying only on naming conventions (like `_balance`):** Using an underscore prefix `_balance` is merely a cosmetic hint and does NOT prevent external code from mutating the value. Only `#` provides true engine-enforced privacy.
- **Forgetting error handling / feedback:** If validation fails in a setter, log an informative warning or throw an explicit `Error` so callers understand why the update was rejected.

---

## Summary
**Key Takeaway:** Encapsulating sensitive fields like `#balance` behind authorization-checked setter methods ensures that business rules and role permissions are strictly enforced.
