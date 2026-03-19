# Unit 1 Section 2: Cloud Service Benefits - Sectional Exam

**Coverage:** TCO percentages (40-60% vs on-prem, 30-40% vs hyperscalers), Cloud Savings Plans (>40% savings, 1 or 3 year commits), PAYG pricing, scalability vs elasticity distinction, VM Auto Scaling, compliance/data residency, Object Lock/WORM
**Questions:** 30 | **Format:** Multiple Choice | **Time Estimate:** 25 minutes

---

**1. According to IONOS source material, what percentage reduction in Total Cost of Ownership (TCO) does IONOS Private Cloud deliver compared to traditional on-premises infrastructure?**
A. 10–20%
B. 20–30%
C. 40–60% (up to 70% in some cases)
D. 70–90%

**2. How does IONOS Private Cloud TCO compare to major hyperscalers over a three-year period?**
A. 10–15% lower
B. 30–40% lower
C. 50–60% lower
D. IONOS is typically more expensive than major hyperscalers

**3. A company's CFO asks why cloud computing reduces Total Cost of Ownership compared to on-premises. Which of the following is NOT a source of TCO savings cited in the IONOS source material?**
A. Eliminating upfront capital expenditure for hardware purchases
B. Avoiding data center rent, power, and cooling costs
C. Eliminating hardware refresh cycles and VMware licensing fees
D. Receiving automatic discounts on all software licenses used within VMs

**4. What is IONOS's policy on egress fees for data transferred out of its platform?**
A. Egress fees are charged at a tiered rate based on monthly data volume
B. IONOS charges a flat egress fee of $0.09 per GB, matching industry norms
C. IONOS charges no egress fees, making monthly bills predictable and transparent
D. Egress fees apply only when data is transferred between different IONOS regions

**5. A company adopts IONOS Cloud and reports 85% faster deployment compared to traditional infrastructure builds. What characteristic of cloud computing enables this speed improvement?**
A. Resource Pooling shared across all customers
B. Instant, on-demand provisioning through self-service portals and APIs
C. Dedicated hardware assigned exclusively to each customer
D. The shift from OPEX to CAPEX spending models

**6. A company reports 60% less management time after migrating to IONOS Cloud. Which cloud operational model change most directly causes this?**
A. Customers are no longer responsible for any security configuration
B. A single-vendor managed service model eliminates the need to coordinate multiple hardware, networking, and software vendors
C. IONOS automatically writes and deploys all application code on behalf of customers
D. Pay-As-You-Go pricing automatically shuts down unused resources

**7. What commitment does a customer make when purchasing an IONOS Cloud Savings Plan?**
A. Committing to use a specific VM size in a specific region for one or three years
B. Committing to a specified amount of CPU cores and RAM for either one year or three years in exchange for a lower hourly rate
C. Paying the full year's compute costs upfront in a single lump sum payment
D. Agreeing to use only a single IONOS region for all workloads during the commitment term

**8. What is the discount offered by IONOS Cloud Savings Plans compared to standard Pay-As-You-Go pricing?**
A. Up to 10% on CPU costs only
B. Approximately 20–25% on RAM costs
C. More than 40% on CPU or RAM costs
D. Exactly 50% on all compute resource types

**9. A company commits to an IONOS Cloud Savings Plan for 50 CPU cores. During the plan term, they decide to switch from running 50 single-core VMs to running one 50-core VM, and they also move the workload from Berlin to Frankfurt. What happens to their savings plan discount?**
A. The discount is forfeited because the VM count and region changed
B. The discount continues to apply because Savings Plans are resource-based, not tied to specific VM sizes or regions
C. The customer must purchase a new Savings Plan for the Frankfurt region
D. The discount is reduced by 50% as a penalty for changing configuration mid-term

**10. What happens when a customer's resource usage exceeds the amount committed in their IONOS Cloud Savings Plan?**
A. The system automatically blocks additional resource provisioning
B. The excess usage is automatically billed at standard Pay-As-You-Go rates
C. The customer must manually upgrade their Savings Plan before additional resources can be used
D. IONOS charges a 20% overage penalty on top of standard rates

**11. A customer wants maximum pricing flexibility to scale up resources for one month and then deprovision them with no ongoing commitment. Which IONOS pricing model is most appropriate?**
A. Cloud Savings Plans with a 1-year term
B. Cloud Savings Plans with a 3-year term
C. Pay-As-You-Go (PAYG) pricing
D. Reserved capacity pricing for a specific VM family

**12. What is "vertical scaling" in cloud computing?**
A. Adding more servers (virtual machines) to distribute the workload horizontally
B. Adding more CPU cores or RAM to an existing virtual machine to increase its capacity
C. Automatically removing underutilized VMs based on CPU utilization thresholds
D. Distributing traffic across multiple Availability Zones using a load balancer

**13. What is "horizontal scaling" in cloud computing?**
A. Increasing the CPU or RAM of a single existing virtual machine
B. Adding more virtual machines and distributing the workload across them
C. Moving a workload from one region to another for better performance
D. Automatically adjusting storage volume sizes based on disk usage metrics

**14. An e-commerce company experiences 10x normal traffic during Black Friday. Their infrastructure automatically adds new virtual machine instances when CPU utilization exceeds 70% and removes them when CPU drops below 30%. This behavior is best described as which cloud concept?**
A. Scalability
B. Vertical Scaling
C. Elasticity
D. Resource Pooling

**15. Which specific IONOS Cloud service provides elasticity for compute workloads by automatically monitoring metrics and adjusting VM instance counts?**
A. Cloud Savings Plans
B. IONOS VM Auto Scaling
C. IONOS Compute Engine with Dedicated Cores
D. Virtual Data Center replication

**16. What metrics can IONOS VM Auto Scaling use to trigger scaling actions? Select the most complete and accurate answer.**
A. Only CPU utilization percentage
B. CPU utilization, inbound network packets, or outbound network packets
C. Memory usage, disk I/O, and storage capacity thresholds only
D. Billing costs, since scaling is triggered when monthly spend exceeds a threshold

**17. What is the recommended maximum number of VMs per Auto Scaling Group in IONOS for optimal efficiency?**
A. 10 VMs
B. 50 VMs
C. 100 VMs
D. 500 VMs

**18. IONOS VM Auto Scaling limits scaling actions to a maximum of how many VMs per action?**
A. 1 VM per action
B. 5 VMs per action
C. 10 VMs per action
D. 25 VMs per action

**19. What is the purpose of a "cooldown period" in IONOS VM Auto Scaling?**
A. To ensure newly added VMs are fully warmed up before serving production traffic
B. To prevent rapid scaling oscillations by waiting a specified time after a scaling action before triggering another one
C. To reduce the billing rate for newly provisioned VMs during their first hour of operation
D. To automatically delete VMs that have been running for longer than a defined maximum period

**20. IONOS VM Auto Scaling integrates with which service to ensure that traffic is automatically distributed across newly created VMs?**
A. VPN Gateway
B. NAT Gateway
C. Application Load Balancer (ALB)
D. Cross Connect

**21. What does "data sovereignty" mean in the context of IONOS Cloud?**
A. IONOS owns the intellectual property of all data stored on its platform
B. Customers retain control over their data, ensuring it remains under the jurisdiction and legal framework of a specific geographic region
C. Data is automatically encrypted at rest using the customer's own encryption keys
D. Customers can request IONOS to delete all their data within 24 hours of contract termination

**22. IONOS Cloud hosts all European services in ISO 27001-certified data centers located in Germany and other European countries. What GDPR-related requirement does this most directly satisfy?**
A. The requirement to encrypt data in transit using TLS 1.2 or higher
B. The requirement to retain personal data for no longer than five years
C. The requirement that personal or business data generated in the EU remains under EU jurisdiction
D. The requirement to provide customers with a self-service data deletion portal

**23. A financial services company must retain trading records in a format that cannot be modified or deleted for regulatory compliance. Which IONOS Cloud feature is specifically designed for this use case?**
A. Cloud Savings Plans with a 3-year commitment
B. Virtual Data Center snapshots stored in a separate region
C. IONOS Object Lock (WORM — Write-Once-Read-Many)
D. Pay-As-You-Go block storage with automated daily backups

**24. What does WORM stand for in the context of IONOS Object Lock?**
A. Write-Only-Read-Many
B. Write-Once-Read-Many
C. Write-Often-Retain-Manually
D. Wide-Object-Replication-Mode

**25. In addition to GDPR, which two specific regulations are cited in the IONOS source material as being addressed by Object Lock in Compliance mode?**
A. HIPAA and FISMA
B. PCI-DSS and SOC 2
C. MiFID II and eIDAS
D. ISO 27001 and IT-Grundschutz

**26. A customer uses IONOS AI Model Hub and is concerned about GDPR's purpose-limitation principle. Which IONOS design decision addresses this concern?**
A. All AI prompts are stored encrypted in a dedicated per-customer database permanently
B. The AI Model Hub operates as a stateless system where prompts and outputs are discarded after each session and never used for model training
C. AI model outputs are automatically anonymized before being stored in object storage
D. The customer must sign a separate DPA specifically for AI services before any processing occurs

**27. What does IONOS provide to satisfy GDPR's requirement for a formal legal framework between a cloud provider and its customers regarding personal data processing?**
A. A self-certification letter signed by the IONOS CEO annually
B. A Data Processing Agreement (DPA) that defines legal responsibilities and grants GDPR data subject rights
C. A shared ISO 27001 certificate that covers both IONOS and the customer organization
D. A government-issued compliance badge displayed on the IONOS website

**28. IONOS Object Lock in "Compliance mode" has which specific property that distinguishes it from standard retention policies?**
A. Only administrators can override the lock to delete records before the retention period expires
B. The lock can be overridden with approval from two administrators acting together
C. The lock cannot be overridden even by administrative users, creating a legally binding immutable record
D. Records are automatically deleted at the exact moment the retention period expires

**29. The IONOS Cost and Usage dashboard enables which of the following capabilities? Select the most complete and accurate answer.**
A. Automatically shutting down resources when they exceed budget thresholds
B. Viewing detailed resource consumption and costs, tracking spending patterns, and identifying optimization opportunities
C. Provisioning new VMs directly from within the billing interface
D. Setting permanent pricing locks on all resources to prevent any cost increases

**30. A SaaS startup initially uses IONOS Pay-As-You-Go pricing, then after 18 months decides to adopt Cloud Savings Plans once their usage patterns stabilize. What is the primary financial rationale for this transition decision?**
A. PAYG pricing is unavailable for customers who have been on the platform for more than 12 months
B. Cloud Savings Plans require a minimum of 50 VMs, which the startup now meets
C. Predictable baseline usage now makes committed-resource discounts of over 40% more valuable than the flexibility of PAYG
D. IONOS automatically converts all PAYG customers to Savings Plans after 18 months

---

## Answer Key

1. C — IONOS Private Cloud delivers 40-60% lower TCO compared to traditional on-premises infrastructure, with some scenarios reaching up to 70% savings.

2. B — Over a three-year period, IONOS Private Cloud delivers 30-40% lower TCO compared to major hyperscalers such as AWS and Azure.

3. D — Automatic software license discounts are not cited as a source of TCO savings; the savings come from eliminating CAPEX, avoiding data center overhead, and no hardware refresh cycles.

4. C — IONOS charges no egress fees or hidden costs, making monthly bills predictable and transparent — a direct contrast to many hyperscalers that charge significant egress fees.

5. B — Instant on-demand provisioning through self-service portals and APIs enables infrastructure to be deployed in minutes rather than weeks, accounting for the 85% faster deployment improvement.

6. B — The single-vendor managed service model consolidates hardware, networking, storage, and software management under one provider, eliminating the complexity of multi-vendor coordination and reducing management time by 60%.

7. B — An IONOS Cloud Savings Plan commits the customer to using a specified amount of CPU cores and RAM for either one year or three years in exchange for a lower locked-in hourly rate.

8. C — IONOS Cloud Savings Plans offer savings of more than 40% on CPU or RAM costs compared to standard Pay-As-You-Go pricing.

9. B — IONOS Cloud Savings Plans are resource-based, not tied to specific VM sizes, VM counts, or regions, so the discount continues to apply as long as the total committed resource amount is used.

10. B — Any usage beyond the committed Savings Plan amount is automatically billed at standard PAYG rates, so customers never pay a penalty and are never blocked from provisioning additional resources.

11. C — Pay-As-You-Go (PAYG) pricing provides maximum flexibility with no long-term commitment, making it ideal for variable or short-term workloads where resources may be provisioned and deprovisioned month to month.

12. B — Vertical scaling (scaling up) means adding more CPU cores or RAM to an existing virtual machine to handle increased demand on that single instance.

13. B — Horizontal scaling (scaling out) means adding more virtual machines and distributing the workload across them, increasing total capacity through additional instances rather than enlarging existing ones.

14. C — Elasticity describes the automatic, real-time provisioning and de-provisioning of resources based on demand metrics — the system acts without manual intervention, which is the defining characteristic differentiating elasticity from scalability.

15. B — IONOS VM Auto Scaling is the specific IONOS service that provides elasticity for compute workloads by monitoring metrics and automatically adjusting the number of running VM instances.

16. B — IONOS VM Auto Scaling can trigger scaling actions based on CPU utilization percentage, inbound network packets, or outbound network packets.

17. C — IONOS recommends a maximum of 100 VMs per Auto Scaling Group for optimal efficiency, beyond which performance management becomes more complex.

18. B — IONOS VM Auto Scaling limits each scaling action to a maximum of 5 VMs at a time to avoid performance issues during rapid scale-out events.

19. B — A cooldown period prevents rapid scaling oscillations by requiring the system to wait a specified time (such as 5 minutes) after a scaling action before evaluating whether another action is needed.

20. C — IONOS VM Auto Scaling integrates with the Application Load Balancer (ALB) to ensure traffic is automatically distributed across newly added VM instances as soon as they are provisioned.

21. B — Data sovereignty means that customers' data remains under the jurisdiction and legal framework of a specific geographic region, ensuring it is subject to local law rather than foreign regulations.

22. C — Hosting European services in EU-located, ISO 27001-certified data centers directly satisfies the GDPR and EU Data Act requirement that personal or business data generated in the EU must remain under EU jurisdiction.

23. C — IONOS Object Lock (WORM — Write-Once-Read-Many) is specifically designed for regulatory-grade immutable record retention, preventing records from being modified or deleted for a specified period.

24. B — WORM stands for Write-Once-Read-Many, describing a storage model where data can be written only once and subsequently only read, never modified or deleted.

25. C — The IONOS source material specifically cites MiFID II (Markets in Financial Instruments Directive) and eIDAS (electronic identification and trust services) as European regulations addressed by Object Lock in Compliance mode.

26. B — The AI Model Hub operates as a stateless system, discarding all prompts and outputs after each session and never using them for model training, which satisfies GDPR's purpose-limitation principle by ensuring data is not used beyond its stated purpose.

27. B — IONOS provides a Data Processing Agreement (DPA) that defines IONOS's legal responsibilities as a data processor and grants customers and data subjects the rights required by GDPR.

28. C — In Compliance mode, Object Lock cannot be overridden even by administrative users, creating a legally binding immutable record that satisfies strict regulatory audit trail requirements.

29. B — The IONOS Cost and Usage dashboard provides detailed resource consumption and cost data, enables spending pattern tracking, and helps identify optimization opportunities for cost management.

30. C — Once usage patterns stabilize and become predictable, the over-40% discount from Cloud Savings Plans delivers greater financial value than PAYG flexibility for that baseline consumption, making the transition economically rational.
