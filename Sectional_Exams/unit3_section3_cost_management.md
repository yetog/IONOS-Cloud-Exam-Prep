# Unit 3 Section 3: Cost Management and Billing - Sectional Exam

**Coverage:** Cost and Usage dashboard, Cost Alerts behavior (notification-only, fires once, does NOT stop services), budget management strategies, Pay-Per-Use (PAYG) vs Cloud Savings Plans pricing models, resource limits vs quotas, Billing API, PAYG hourly billing cycle, cost optimization strategies, and cost breakdown by resource
**Questions:** 30 | **Format:** Multiple Choice | **Time Estimate:** 25 minutes

---

**1. What is the primary purpose of the Cost and Usage Dashboard in IONOS Cloud?**
A. To provision and de-provision resources based on budget thresholds automatically
B. To provide a centralized view of resource consumption and spending broken down by product category and VDC
C. To generate GDPR compliance reports for billing data
D. To compare IONOS Cloud pricing against competitor pricing models

**2. How far back can a user view historical billing data in the Cost and Usage Dashboard?**
A. 30 days
B. 3 months
C. The current month plus the previous 5 months (6 months total)
D. 12 months

**3. A Cost Alert is configured with a threshold of $2,000. The contract's net invoice amount reaches $2,000, and an email is sent. Spending then continues to $2,800. How many total Cost Alert emails are sent?**
A. Two — one at $2,000 and one at $2,800
B. One — Cost Alerts trigger exactly one email per threshold breach and do not fire again
C. Zero — Cost Alerts only send emails at the end of the billing cycle
D. Three — one per $800 increment above the threshold

**4. A team receives a Cost Alert notification that their spending has reached the configured threshold. They decide to take no action. What happens to their running services?**
A. Running services are automatically paused until the next billing cycle
B. Running services are throttled to prevent additional charges
C. Nothing — Cost Alerts are informational only and do not stop, pause, or throttle any resources
D. IONOS Support contacts the Contract Owner to approve continued spending

**5. Which of the following statements about Cost Alerts in IONOS Cloud is TRUE?**
A. Cost Alerts can be configured to automatically shut down specific resource groups when the threshold is reached
B. Cost Alerts send a single email notification when the threshold is crossed and never send additional emails even if spending continues to rise
C. Cost Alerts are triggered multiple times: once at 50%, 75%, and 100% of the defined threshold
D. Cost Alerts stop billing accumulation until the Contract Owner manually resumes services

**6. Who can create, edit, or delete Cost Alerts in IONOS Cloud?**
A. Any user who has been granted the "Manage Billing" privilege
B. Only Contract Owners
C. Contract Owners and Administrators
D. Contract Owners, Administrators, and any group member with View privileges

**7. A startup sets a single Cost Alert at $5,000 and their bill reaches $5,200 before they notice. According to IONOS best practice, what should they have done to catch the overage earlier?**
A. Set a single alert at $5,000 with SMS notifications instead of email
B. Set multiple Cost Alerts at different thresholds, such as 50%, 75%, and 90% of their maximum budget, to get earlier warnings
C. Disabled pay-per-use billing and switched to an annual flat-rate plan
D. Monitored the Monitoring Service dashboard for CPU usage spikes

**8. Under IONOS Cloud's Pay-Per-Use (PAYG) pricing model, how are resources billed?**
A. A flat monthly fee regardless of actual usage
B. By the hour based on actual consumption, with no upfront commitment
C. A one-time setup fee plus a monthly maintenance charge
D. By the day, with a minimum 30-day charge even if resources are deleted earlier

**9. A company runs a VM from 9:00 AM to 5:00 PM and then shuts it down. Under PAYG pricing, how much compute time are they billed for?**
A. 24 hours, as IONOS bills for full calendar days
B. 8 hours of compute time
C. 8 hours plus a daily instance fee
D. 1 hour minimum charge plus 7 additional hours

**10. Which type of workload is BEST suited for Pay-Per-Use (PAYG) pricing?**
A. A database server that runs 24/7 with consistent CPU and RAM usage for 3 years
B. A production web application with highly predictable and stable traffic
C. A development and testing environment with variable, unpredictable resource usage
D. A batch processing job that runs 720 hours per month every month

**11. Cloud Savings Plans in IONOS Cloud require a commitment for which time periods?**
A. 6 months or 1 year
B. 1 year or 3 years
C. 3 years or 5 years
D. Monthly rolling commitments only

**12. Approximately how much discount do Cloud Savings Plans offer compared to standard Pay-Per-Use pricing for a 3-year commitment?**
A. 5–10%
B. 15–20%
C. 30–40%
D. 60–70%

**13. A company commits to a Cloud Savings Plan for 100 CPU cores. In a given month, they only use 80 cores. What happens?**
A. They are billed only for the 80 cores they actually used at the plan's discounted rate
B. They are billed for all 100 committed cores at the plan's rate, regardless of actual usage
C. The unused 20 cores roll over and are added to next month's allocation
D. IONOS automatically provides alternative resources to fill the committed 100 cores

**14. A company has a Cloud Savings Plan for 50 CPU cores. In a busy month, they consume 70 CPU cores. How are the extra 20 cores billed?**
A. The 20 extra cores are provided free of charge as a flex allowance
B. All 70 cores are billed at the plan's discounted rate automatically
C. The 50 committed cores are billed at the plan's rate; the extra 20 are billed at the standard PAYG rate
D. The plan is terminated and all 70 cores are billed at the full PAYG rate

**15. Cloud Savings Plans in IONOS Cloud are described as "resource-based rather than instance-based." What does this mean?**
A. The plan locks you into a specific VM type, region, and operating system
B. The committed resource amount can be applied to any combination of VMs, regions, and operating systems that collectively consume the committed quantity
C. The plan applies only to object storage resources, not compute instances
D. The plan is calculated based on the number of VDCs rather than the number of CPU cores or GB of RAM

**16. What are "resource limits" in IONOS Cloud?**
A. The contract-specific allocations defining how much of each resource type your account can use
B. The hard platform maximums that the IONOS infrastructure can support for specific resource types
C. The self-imposed budget caps a Contract Owner configures in the Cost Alert system
D. The monthly usage thresholds above which PAYG discounts are automatically applied

**17. What are "quotas" in IONOS Cloud, and how do they differ from resource limits?**
A. Quotas and resource limits are identical terms; they both refer to the platform maximum
B. Quotas are higher than resource limits and can be set by Administrators
C. Quotas are contract-specific allocations that may be lower than the overall platform resource limits
D. Quotas are the maximum number of Cost Alerts a contract can have active at once

**18. Where in the DCD can a user check their current resource consumption against their contract's quotas?**
A. Menu > Management > Cost Alert
B. Menu > Management > Resource Overview
C. Menu > Management > Token Manager
D. Menu > Your Profile > Password & Security

**19. The Billing API in IONOS Cloud can be authenticated with which methods?**
A. SSH key pairs only
B. Basic authentication or Bearer tokens (with Bearer tokens required for 2FA-enabled accounts)
C. OAuth 2.0 authorization codes only
D. SAML assertions from the corporate Identity Provider

**20. Which of the following is NOT a capability of the IONOS Cloud Billing API?**
A. Retrieving per-resource usage data for selected billing periods
B. Fetching invoices in PDF or JSON format
C. Creating, editing, and deleting Cost Alerts programmatically
D. Automatically shutting down over-budget resources when a threshold is crossed

**21. A managed service provider wants to programmatically retrieve billing data for their client's subcontract, apply a 20% service margin, and generate a branded invoice. Which IONOS tool enables this workflow?**
A. The Cost and Usage Dashboard export feature
B. The Billing API, which supports reseller access to tenant contract billing data
C. The Activity Log API, which captures all billing events
D. The Monitoring Service, which tracks resource utilization over time

**22. The Cost and Usage Dashboard displays costs at "list prices." What does this mean for the amounts shown?**
A. The amounts include all applicable VAT, discounts, and Savings Plan adjustments
B. The amounts reflect the discounted rate from the most recent Cloud Savings Plan applied
C. The amounts represent standard PAYG prices before volume discounts, Savings Plan adjustments, or VAT are applied
D. The amounts are estimates only and will not match the final invoice

**23. An enterprise IT manager wants to identify which of their three VDCs — development, staging, and production — is driving the highest cloud costs. Which feature of the Cost and Usage Dashboard supports this?**
A. The Product Category breakdown, which groups costs by service type
B. The VDC cost tracking feature, which shows spending broken down by Virtual Data Center
C. The Activity Log integration, which correlates user actions to resource creation costs
D. The Flow Log dashboard, which shows which VDC has the most network traffic

**24. A company is approaching their quota limit for CPU cores and plans to launch a major new workload next quarter. What should they do?**
A. Immediately delete all existing VMs to free up quota space
B. Contact IONOS Support to request a quota increase before they reach the ceiling
C. Upgrade to the Administrator role to automatically receive higher quotas
D. Switch to a Cloud Savings Plan, which automatically doubles the CPU quota

**25. A cost-conscious startup is evaluating their IONOS Cloud spending after 6 months. They realize their production database server has run 24/7 with consistent usage the entire time. What pricing change would best optimize their cost?**
A. Continue with PAYG since they have no billing issues
B. Switch to Xpress Mode in the DCD to reduce provisioning overhead costs
C. Purchase a Cloud Savings Plan (1-year or 3-year) for the consistent CPU and RAM usage on the database server to receive a 30–40% discount
D. Delete and reprovision the database weekly to benefit from promotional new-instance pricing

**26. When multiple Cloud Savings Plans exist for the same resource type, in what order does IONOS apply them?**
A. Alphabetical order by plan name
B. Starting with the newest plan first, then progressively older plans
C. Starting with the oldest plan first, then moving to newer plans, with PAYG rates for any remaining usage
D. The largest plan is always applied first, regardless of creation date

**27. Which of the following pricing model comparisons is CORRECT?**
A. PAYG has higher discounts for long-running workloads; Savings Plans are better for sporadic usage
B. PAYG billing is monthly; Cloud Savings Plans are billed hourly
C. PAYG offers no upfront commitment with standard hourly rates; Cloud Savings Plans offer 30–40% discounts in exchange for a 1- or 3-year resource commitment
D. PAYG and Cloud Savings Plans have identical per-hour rates; the difference is only in billing frequency

**28. A Cost Alert notification email arrives at 2:00 AM. The on-call engineer sees it at 8:00 AM. During those 6 hours, spending continued and the bill grew by an additional $200 above the threshold. How many Cost Alert emails were sent during those 6 hours?**
A. One per hour the threshold remained breached (6 emails total)
B. None — the initial alert was already sent; Cost Alerts do not re-fire after the first notification
C. One per $100 increment above the threshold (2 additional emails)
D. One email every 15 minutes until the Contract Owner acknowledges the alert

**29. The Cost and Usage Dashboard shows "current month" data from the first day of the month through which date?**
A. The last day of the previous month
B. A fixed date on the 15th of each month
C. The report generation date (current accumulated costs up to today)
D. The most recent billing cycle end date, which may lag by up to 5 business days

**30. An organization runs both stable production workloads (predictable, running 24/7) and a nightly batch processing job (runs 2 hours per night, unpredictable volume). What pricing strategy best optimizes their total costs?**
A. PAYG for all workloads to maximize flexibility
B. Cloud Savings Plans for all workloads to maximize discounts
C. Cloud Savings Plans for the stable production workloads and PAYG for the nightly batch job
D. Annual flat-rate contracts for the batch jobs and PAYG for production

---

## Answer Key

1. B — The Cost and Usage Dashboard is the centralized tool for viewing resource consumption and spending broken down by product category and VDC across all IONOS Cloud services.

2. C — The dashboard provides a period selector showing the current month plus the previous five months, giving users up to six months of billing history.

3. B — Cost Alerts fire exactly one email when the threshold is crossed; they do not re-fire even if spending continues to increase significantly beyond the threshold.

4. C — Cost Alerts are purely informational notification systems; they never automatically stop, pause, throttle, or take any automated action on running services.

5. B — Cost Alerts send a single email notification at the moment the threshold is first reached; this is a fundamental and frequently tested IONOS exam fact.

6. C — Only Contract Owners and Administrators have the authority to create, edit, or delete Cost Alerts; this ensures budget management remains under appropriate control.

7. B — IONOS best practice recommends setting multiple Cost Alerts at staggered thresholds (50%, 75%, 90%) to provide progressively earlier warning signals before hitting the maximum budget.

8. B — PAYG billing charges by the hour based on actual resource consumption with no upfront commitment or minimum term requirement.

9. B — Under PAYG, the company is billed for exactly 8 hours (9 AM to 5 PM) of compute time, demonstrating the granular hourly billing model.

10. C — PAYG pricing is ideal for variable, unpredictable workloads like dev/test environments where resource needs fluctuate and commitments are undesirable.

11. B — Cloud Savings Plans require a commitment of either 1 year or 3 years; these are the only two term options available.

12. C — Cloud Savings Plans offer approximately 30–40% discount off standard PAYG rates for 3-year commitments, making them substantial savings for stable workloads.

13. B — Cloud Savings Plans bill for the full committed amount even if actual usage is lower; unused resources do not roll over to the next billing period.

14. C — Usage up to the committed quantity is billed at the plan's discounted rate; any consumption above the commitment is billed at the standard PAYG rate.

15. B — "Resource-based" means the committed CPU cores or RAM apply to any eligible VM combination across any region or OS; you are not locked to a specific instance type or location.

16. B — Resource limits are the hard platform maximums that IONOS Cloud infrastructure supports (e.g., 256 vCPUs per VM), which apply to all accounts regardless of their individual contract.

17. C — Quotas are the contract-specific allocations (e.g., 500 CPU cores for your account) that may be significantly lower than the overall platform resource limits and are set at contract creation.

18. B — Menu > Management > Resource Overview in the DCD provides a compact view of current usage against contract quotas for every resource type.

19. B — The Billing API supports both basic authentication and Bearer tokens, with Bearer tokens being mandatory for accounts that have 2FA/MFA enabled.

20. D — The Billing API cannot automatically shut down resources; Cost Alerts are notification-only and no IONOS billing tool has the ability to auto-terminate services.

21. B — The Billing API is designed for exactly this use case: resellers can retrieve granular billing data for tenant contracts and integrate it into custom invoicing workflows.

22. C — The dashboard shows list prices (standard PAYG rates) before any volume discounts, Cloud Savings Plan adjustments, or VAT are applied, providing a standardized comparison baseline.

23. B — The VDC cost tracking feature in the Cost and Usage Dashboard shows spending broken down by Virtual Data Center, enabling project-level or team-level cost allocation.

24. B — The correct action is to proactively contact IONOS Support to request a quota increase before the limit is reached, allowing time for the increase to be processed before the new workload launches.

25. C — Consistent 24/7 production workloads are the ideal use case for Cloud Savings Plans, which offer 30–40% discounts for the stable, predictable consumption pattern.

26. C — When multiple Savings Plans exist for the same resource type, IONOS applies them starting with the oldest plan first, then newer plans, with PAYG rates covering any remaining usage.

27. C — PAYG offers maximum flexibility with no commitment at standard hourly rates, while Cloud Savings Plans provide 30–40% discounts in exchange for 1-or 3-year resource commitments.

28. B — After the first Cost Alert email is sent, the alert does not re-fire regardless of how much spending increases; no additional notifications are generated during those 6 hours.

29. C — For the current month, the Cost and Usage Dashboard shows accumulated costs from the first day of the month through the report generation date (today's date).

30. C — Combining Cloud Savings Plans for stable production workloads (maximum discount) with PAYG for variable batch jobs (maximum flexibility) is the optimal cost optimization strategy.
