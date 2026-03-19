# Unit 1 Section 1: Cloud Computing Fundamentals - Sectional Exam

**Coverage:** Cloud computing definition & characteristics (on-demand self-service, broad network access, resource pooling, elasticity vs scalability), evolution from on-premises to virtualization to cloud, IONOS regions/AZs/VDC, European data sovereignty, GDPR/ISO 27001
**Questions:** 30 | **Format:** Multiple Choice | **Time Estimate:** 25 minutes

---

**1. Which of the following best defines cloud computing?**
A. Purchasing and maintaining dedicated physical servers in a co-location facility
B. Delivery of IT services over a network, with infrastructure hosted by a vendor and consumed on demand
C. Installing licensed software on company-owned hardware at headquarters
D. Connecting multiple office networks together using private leased lines

**2. A company wants to provision a new virtual machine at 2 AM without contacting a support team. Which cloud characteristic makes this possible?**
A. Resource Pooling
B. Broad Network Access
C. On-Demand Self-Service
D. Elasticity

**3. What does "Broad Network Access" mean as a cloud characteristic?**
A. The cloud provider owns a wide area network connecting all customers
B. Cloud services are available over the internet from any device, including laptops, tablets, and smartphones
C. The provider pools network hardware so multiple customers share the same physical switches
D. Customers can access their resources only from company-approved devices on a VPN

**4. Which characteristic describes the cloud model where physical hardware is shared among multiple customers while their workloads remain logically isolated?**
A. Elasticity
B. On-Demand Self-Service
C. Pay-As-You-Go
D. Resource Pooling

**5. What is the key distinction between scalability and elasticity in cloud computing?**
A. Scalability applies only to storage; elasticity applies only to compute
B. Scalability refers to the ability to increase or decrease capacity; elasticity adds automation so resources adjust in real time without manual intervention
C. Scalability is a PaaS feature; elasticity is an IaaS feature
D. Scalability and elasticity are interchangeable terms describing the same concept

**6. What term describes the billing model in which you pay only for the resources you actually consume, measured in hourly units, with no upfront capital expenditure?**
A. Reserved Capacity Pricing
B. Spot Pricing
C. Pay-As-You-Go (PAYG)
D. Cloud Savings Plans

**7. Before virtualization became widespread, what was the typical server utilization rate in traditional on-premises data centers?**
A. Below 15%
B. Around 35%
C. Above 50%
D. Close to 80%

**8. What technology, pioneered around 2002–2003, allowed multiple virtual machines to share a single physical server, each running its own OS in isolation?**
A. Container orchestration
B. Software-Defined Networking (SDN)
C. Hypervisor-based virtualization
D. Network Function Virtualization (NFV)

**9. What was a primary limitation of the virtualization era compared to full cloud computing?**
A. Virtualization could not support more than one VM per server
B. Virtualized environments required organizations to continue owning and managing physical hardware
C. Hypervisors were incompatible with Linux operating systems
D. Virtualization eliminated the ability to run multiple applications simultaneously

**10. After adopting virtualization, what did server utilization rates typically improve to?**
A. Above 50%
B. Around 25%
C. Exactly 100%
D. Below 20%

**11. Which phase of IT evolution is characterized by automation, self-service, instant scaling, and a shift from capital expenses (CAPEX) to operational expenses (OPEX)?**
A. Traditional On-Premises Data Center era
B. Mainframe computing era
C. Virtualized Data Center era
D. Cloud Computing era

**12. IONOS Cloud is described as a European-based public cloud platform. Which of the following is a direct consequence of IONOS being a German company with no US parent entity?**
A. IONOS can serve only customers located within Germany
B. IONOS services are immune to US Cloud Act data requests, even when data is physically stored in Europe
C. IONOS is required to share all customer data with EU governments on request
D. IONOS cannot offer services to customers outside the European Union

**13. Which region code corresponds to IONOS Cloud's data center in Berlin, Germany?**
A. de/fra
B. gb/lhr
C. de/txl
D. us/mci

**14. Which region code represents IONOS Cloud's US data center location in Lenexa?**
A. us/las
B. us/ewr
C. de/txl
D. us/mci

**15. A customer deploys an application in the de/fra region. What does this guarantee under IONOS Cloud's data sovereignty model?**
A. The data is automatically replicated to the us/mci region for disaster recovery
B. The data is stored in Frankfurt, Germany, and will never leave the European Union
C. The customer's billing is calculated in US dollars
D. The workload is shared across all European IONOS regions for redundancy

**16. What is an Availability Zone (AZ) in the context of IONOS Cloud?**
A. A billing grouping that separates development costs from production costs
B. An isolated physical segment inside a data center region, with its own power, cooling, and network connections
C. A virtual network that spans multiple regions for global redundancy
D. A pricing tier that reduces cost by sharing hardware resources with other customers

**17. Why does deploying resources across multiple Availability Zones within the same region provide high availability?**
A. Multiple AZs allow data to automatically replicate across different countries
B. A failure in one AZ, such as a power outage, does not affect other AZs in the same region
C. Multiple AZs enable customers to access resources from any device worldwide
D. AZs route traffic based on URL paths for intelligent load balancing

**18. What is the Virtual Data Center (VDC) in IONOS Cloud?**
A. A physical rack in an IONOS data center assigned exclusively to one customer
B. The primary web-based interface for managing IONOS resources visually
C. The fundamental organizational and logical container for infrastructure resources within a specific region
D. A type of virtual machine optimized for high-memory database workloads

**19. Which of the following resources is contained within an IONOS Virtual Data Center (VDC)?**
A. Physical servers, cooling systems, and power distribution units
B. Compute resources, storage volumes, virtual networks, IP address pools, and firewalls
C. The IONOS billing dashboard and cost alert notifications
D. Only virtual machines; storage must be managed separately outside the VDC

**20. A company creates two VDCs: one in the de/txl region for production and one in de/fra for disaster recovery. What does this architecture achieve?**
A. Lower cost because VDCs in the same country share physical hardware
B. Geographic separation of workloads, allowing failover across different IONOS regions
C. Automatic replication of data between the two VDCs by IONOS
D. Mandatory compliance with ISO 27001 certification

**21. Which compliance regulation governs the collection, processing, storage, and deletion of personal data in the European Union?**
A. HIPAA (Health Insurance Portability and Accountability Act)
B. SOC 2 (Service Organization Control 2)
C. GDPR (General Data Protection Regulation)
D. PCI-DSS (Payment Card Industry Data Security Standard)

**22. IONOS Cloud data centers hold ISO 27001 certification. What does this certification specifically validate?**
A. That IONOS data centers meet energy efficiency standards for renewable power usage
B. That IONOS meets internationally recognized standards for information security management
C. That IONOS complies with US federal government security frameworks
D. That IONOS guarantees 100% uptime across all regions at all times

**23. What is the IONOS Data Center Designer (DCD)?**
A. A command-line tool used exclusively by IONOS engineers to provision hardware
B. The primary web-based visual interface for customers to create and manage cloud resources
C. An AI-powered tool that automatically optimizes VM configurations for cost savings
D. A physical design blueprint for building new IONOS data centers

**24. Which cloud characteristic directly enables a developer to use Terraform to define and deploy infrastructure without waiting for manual approval from the cloud provider?**
A. Resource Pooling
B. Pay-As-You-Go Pricing
C. On-Demand Self-Service
D. Broad Network Access

**25. Traditional on-premises data center provisioning timelines were measured in which unit?**
A. Seconds to minutes
B. Hours to days
C. Weeks to months
D. Nanoseconds

**26. A European healthcare organization must ensure that patient data processed in Germany never becomes accessible to US authorities. Which IONOS Cloud feature most directly addresses this legal requirement?**
A. Cloud Savings Plans with a 3-year commitment in the de/fra region
B. European data sovereignty with no US Cloud Act exposure, guaranteed by IONOS's German corporate structure
C. Object Lock (WORM) applied to all patient records
D. Deployment of VMs using Dedicated Core compute instances

**27. Which of the following accurately describes how IONOS Cloud handles cross-region data replication?**
A. IONOS automatically replicates all data across at least two regions by default
B. IONOS replicates data within a region across Availability Zones, but cross-region replication must be configured by the customer
C. IONOS does not replicate data at all; customers are entirely responsible for all backup
D. Cross-region replication is included only with Cloud Savings Plans commitments

**28. A startup wants to deploy a web application and needs the flexibility to choose which Availability Zone hosts their virtual machines. Which IONOS Cloud option assigns a zone automatically when the customer does not specify one?**
A. The VDC's default region setting
B. The "Auto" Availability Zone option, which lets the system assign the zone automatically
C. The Cross Connect service, which balances resources across zones
D. The Compute Engine's burst mode, which dynamically picks zones based on load

**29. Which of the following is NOT listed as an essential characteristic of cloud computing according to IONOS source material?**
A. On-Demand Self-Service
B. Resource Pooling
C. Dedicated Hardware Per Customer
D. Pay-As-You-Go Pricing

**30. A company's IT team currently spends most of their time managing physical servers, applying firmware updates, and replacing failed hard drives. Which cloud computing benefit most directly addresses this operational burden?**
A. Resource pooling, which reduces the number of physical servers required
B. The ability to focus on building applications and driving business value rather than managing infrastructure
C. Pay-As-You-Go pricing, which eliminates all hardware costs immediately
D. Broad Network Access, which allows engineers to manage servers remotely

---

## Answer Key

1. B — Cloud computing is defined as the delivery of IT services over a network, with infrastructure hosted by a vendor and consumed on demand rather than purchased and maintained by the customer.

2. C — On-Demand Self-Service means customers can provision resources instantly without requiring human intervention from the provider, enabling 24/7 self-provisioning at any time.

3. B — Broad Network Access means cloud services are available over the internet from any device (laptop, tablet, smartphone), enabling access from anywhere.

4. D — Resource Pooling is the characteristic where physical hardware is shared among multiple customers in a multi-tenant model while workloads remain logically isolated for security and privacy.

5. B — Scalability is the general ability to increase or decrease capacity, while elasticity specifically adds automation so resources adjust in real time without manual intervention.

6. C — Pay-As-You-Go (PAYG) is the consumption-based billing model where customers pay only for resources actually used, measured in hourly units, with no upfront capital expenditure required.

7. A — Traditional on-premises data centers typically ran servers at less than 15% capacity because organizations provisioned for peak demand, leaving hardware idle most of the time.

8. C — Hypervisor-based virtualization (using software like VMware or KVM) allowed multiple VMs to share a single physical server starting around 2002–2003.

9. B — Even with virtualization, organizations still owned and managed physical hardware, still incurred capital expenses, and still faced long-term planning cycles — the cloud's automation and self-service layer had not yet been added.

10. A — After virtualization, server utilization rates typically improved to above 50%, compared to below 15% in traditional on-premises environments.

11. D — The Cloud Computing era is defined by automation, self-service, instant scaling, and the shift from CAPEX (hardware purchases) to OPEX (pay-as-you-go operational spending).

12. B — Because IONOS is a German company with no US parent entity, it is completely outside US jurisdiction, making it immune to US Cloud Act data requests even for data physically stored in Europe.

13. C — The region code de/txl represents IONOS Cloud's data center in Berlin, Germany (txl is the IATA code for Berlin Tegel Airport).

14. D — us/mci is the IONOS Cloud region code for the Lenexa, USA data center (near Kansas City, Missouri).

15. B — Deploying in de/fra (Frankfurt, Germany) guarantees that data is stored in the EU and, under IONOS's data sovereignty model, will never leave the European Union.

16. B — An Availability Zone (AZ) is an isolated physical segment inside a data center region, with its own independent power distribution, cooling systems, and network connections.

17. B — Because each AZ has independent power and network infrastructure, a failure in one AZ (such as a rack-level power loss) does not propagate to other AZs in the same region.

18. C — The Virtual Data Center (VDC) is the fundamental organizational unit in IONOS Cloud — a logical container for all infrastructure resources (compute, storage, network) within a specific region.

19. B — A VDC contains compute resources (VMs), memory and disk allocations, virtual networks (LANs), IP address pools, and security services such as firewalls and Network Security Groups.

20. B — Creating VDCs in two different regions (de/txl and de/fra) achieves geographic separation, enabling disaster recovery and failover between independent IONOS facilities.

21. C — GDPR (General Data Protection Regulation) is the EU regulation governing how personal data is collected, processed, stored, and deleted, with strict requirements for organizations handling EU citizen data.

22. B — ISO 27001 is an internationally recognized certification specifically for information security management, providing third-party validation that security controls meet rigorous standards.

23. B — The Data Center Designer (DCD) is the primary web-based visual interface where customers create and manage IONOS resources through a drag-and-drop experience.

24. C — On-Demand Self-Service enables provisioning through APIs and infrastructure-as-code tools like Terraform without requiring manual approval or human intervention from the cloud provider.

25. C — Traditional on-premises infrastructure provisioning involved procurement approvals, hardware delivery, installation, and configuration, a process that typically took weeks to months.

26. B — IONOS's European data sovereignty guarantee, backed by its German corporate structure with no US parent entity, directly prevents US Cloud Act requests from applying to customer data.

27. B — IONOS provides redundancy within a region across Availability Zones but does not automatically replicate data across regions; customers must configure multi-region distribution themselves.

28. B — The "Auto" Availability Zone option in IONOS Cloud allows the system to automatically assign a resource to a zone when the customer does not specify a preference.

29. C — Dedicated Hardware Per Customer is not a cloud characteristic; cloud computing uses a multi-tenant resource pooling model where physical hardware is shared, not dedicated per customer.

30. B — A core cloud computing benefit is freeing IT teams from infrastructure management tasks (hardware maintenance, patching, replacing drives) so they can focus on applications and business innovation.
