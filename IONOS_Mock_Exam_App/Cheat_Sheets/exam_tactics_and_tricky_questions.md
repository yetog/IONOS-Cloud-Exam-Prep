# IONOS Exam Tactics & Tricky Questions

To pass the IONOS Cloud Foundational exam, you don't just need knowledge—you need test-taking strategy. This guide breaks down exactly how to approach True/False questions, how to dissect Case Studies, and provides a set of intentionally tricky questions to test your reflexes.

---

## 1. Tactics for True / False Questions

True/False questions are designed to test your confidence in absolute limits and fundamental architectures. 

**Tactic 1: Beware of "Absolutes"**
Words like `always`, `never`, `only`, and `all` usually make a statement **False**.
*   *Example:* "An Administrator can *always* change the settings of a contract." 
*   *Verdict:* **False**. They cannot change financial/billing settings.
*   *Exception:* Hard platform limits! "You can *never* exceed 100 SSH keys in the manager." (This is **True** because 100 is a hard limit).

**Tactic 2: Spot the Mixed Concept**
The exam will often take a true statement about Service A, and apply it to Service B.
*   *Example:* "Activity Logs are stored in an S3-compatible bucket and track network packets."
*   *Verdict:* **False**. This describes *Flow Logs*, not *Activity Logs*.

**Tactic 3: The "Requires Support" Trap**
Many True/False questions will claim you need to contact IONOS Support to perform an action that is actually self-service.
*   *Example:* "To add more RAM to a running Dedicated Core server, you must open a support ticket."
*   *Verdict:* **False**. Live Vertical Scaling allows you to do this via the DCD yourself.

---

## 2. Tactics for Case Study (Scenario) Questions

Case studies give you a background story and ask you to choose the best product or architecture. 

**Tactic 1: Identify the Constraint**
Read the scenario and immediately highlight the *primary constraint*. Is the customer optimizing for **Cost**, **Performance**, or **Compliance**?
*   If the constraint is **Cost** -> Look for *Cubes*, *HDD Storage*, or *Object Storage*.
*   If the constraint is **Performance** -> Look for *Dedicated Cores*, *SSD Premium*, or *Managed NLB*.
*   If the constraint is **Compliance** -> Look for *Activity Logs*, *IONOS Object Lock (WORM)*, or *German Data Centers*.

**Tactic 2: Match the Trigger Words**
Memorize these immediate vocabulary mappings:
*   "Noisy neighbor" = Dedicated Cores
*   "Massive streaming" or "IoT telemetry" = Kafka
*   "URL routing" = Application Load Balancer (ALB)
*   "Same region private connection" = Cross Connect

**Tactic 3: Process of Elimination (The "Good, but Wrong" Answer)**
Often, two answers will technically work, but one is the *best* fit.
*   *Scenario:* "A customer needs to archive old image files."
*   *Options:* HDD Block Storage vs. Object Storage. 
*   *Verdict:* Object Storage is the *best* fit because it is accessible via HTTP, whereas HDD block storage requires you to spin up and maintain a VM just to attach the disk.

---

## 3. The "Tricky" Practice Questions

These questions are intentionally brutal. Cover the answers and test yourself.

**Tricky Q1:** A user is added to the "Network Team" group, which is granted `View` permissions on the production VDC. However, the Contract Owner also directly grants that specific user `Edit` permissions on the same production VDC. What level of access does the user actually have?
A. View (Group policies override individual policies)
B. Edit (Permissions in IONOS are additive; the highest privilege wins)
C. None (Conflicting permissions result in an automatic lockout)
D. View (Individual policies cannot exceed group policies)

**Tricky Q2:** A developer sets a Cost Alert threshold at $500 for their dev environment. By mid-month, the bill reaches $550, and they receive an email. They aggressively delete all their VMs to stop costs from rising. How many total Cost Alert emails did they receive?
A. None, because they deleted the VMs before the billing cycle ended.
B. One.
C. Two (one at $500, one when the resources were deleted).
D. One per day until the invoice drops below $500.

**Tricky Q3:** A start-up needs a managed database that can handle highly unstructured data, rapid schema changes, and cataloging. They select Managed PostgreSQL. Why might this *not* be the optimal choice?
A. PostgreSQL is not ACID compliant.
B. Managed MongoDB is specifically designed as a NoSQL document database, making it vastly superior for unstructured data and rapid schema changes.
C. PostgreSQL does not support JSON data.
D. PostgreSQL is only available as an In-Memory DB.

**Tricky Q4:** A customer deploys a web server in the `de/fra` (Frankfurt) region and a database server in the `es/mad` (Madrid) region. They want to connect them privately, bypassing the public internet, without incurring additional bandwidth costs. Should they use Cross Connect?
A. Yes, Cross Connect is free and provides private connectivity.
B. No, Cross Connect only works between VDCs in the *same* region. They must use a VPN Gateway instead.
C. Yes, but they must contact support to bridge the regions.
D. No, Cross Connect is only for on-premise to cloud connectivity.

---
<br><br><br><br><br><br><br><br>

### Tricky Question Answers & Explanations

**Tricky Q1: B (Edit).** 
*Why it's tricky:* In some systems, group policies restrict users. In IONOS IAM, permissions are **additive**. If you get "View" from a group, but "Edit" directly, you get "Edit". The highest granted privilege always wins.

**Tricky Q2: B (One).** 
*Why it's tricky:* Cost alerts *never* reverse themselves and *never* spam you. They fire exactly one email the moment the threshold is crossed, regardless of what you do afterward.

**Tricky Q3: B (Managed MongoDB).** 
*Why it's tricky:* PostgreSQL *does* actually support JSON, but it is fundamentally a relational (SQL) database requiring rigid schemas. For purely unstructured data and rapid schema changes, a document database like MongoDB is fundamentally the correct architecture choice.

**Tricky Q4: B (No, Cross Connect is same-region only).** 
*Why it's tricky:* Cross Connect *is* free and private, but the absolute unbending rule is that the VDCs must be in the identical region. Spanning from Germany to Spain requires a VPN gateway.
