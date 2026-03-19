# IONOS Cloud Foundational Certification - Comprehensive Practice Exam

This mock exam is designed to help you prepare for the real IONOS Cloud Foundational certification. It includes multiple-choice, true/false, and use-case questions covering Cloud Basics, Core Services, and Operations.

**Instructions**: Answer all questions, then check your answers using the Answer Key at the very end of the document.

---

## Section 1: Memory & Specific Limits (Exam Pitfalls)
*These questions cover specific numbers and concepts that are commonly seen on the exam.*

**1. What is the default push interval for monitoring service metrics in IONOS Cloud?**
A. 10 seconds
B. 1 minute
C. 5 minutes
D. 15 minutes

**2. What is the maximum number of SSH keys you can configure and manage centrally in the SSH Key Manager?**
A. 10
B. 50
C. 100
D. 500

**3. True or False: An IPv6 address is 128 bits in size.**
A. True
B. False

**4. Which term specifically describes the ability to automatically provision and de-provision resources based on real-time demand triggers (e.g., auto-scaling based on web traffic)?**
A. Scalability
B. Elasticity
C. High Availability
D. Redundancy

**5. What is the typical Total Cost of Ownership (TCO) advantage or savings that IONOS Private Cloud offers compared to traditional on-premise deployments?**
A. 10–20% savings
B. up to 30% savings
C. 40–60% or up to 70% savings
D. There is no cost advantage

---

## Section 2: Core Architecture & Services

**6. Which IONOS Cloud compute option provides guaranteed performance with exclusively allocated physical CPU resources?**
A. vCPU Servers
B. Dedicated Core Servers
C. Cubes
D. Managed Kubernetes

**7. A media company needs to store petabytes of video archive files. The files do not need to be attached to a virtual machine and should be accessible via HTTP/HTTPS. Which storage service is the best fit?**
A. Block Storage (HDD)
B. Network File Storage (NFS)
C. IONOS Cloud Object Storage
D. Block Storage (SSD Premium)

**8. True or False: The Managed Network Load Balancer (NLB) operates at Layer 7 and routes traffic based on URL paths.**
A. True
B. False

**9. What is the primary purpose of a Managed NAT Gateway?**
A. To balance incoming web traffic across multiple VMs
B. To provide secure, outbound-only internet access for private VMs
C. To connect an on-premises data center to IONOS Cloud via IPSec
D. To resolve domain names to IP addresses

**10. You need a database solution that enforces strict schema compliance (ACID) and supports complex joint queries and JSON data. Which managed database should you choose?**
A. Managed PostgreSQL
B. Managed MongoDB
C. In-Memory DB
D. Event Streams for Apache Kafka

**11. Which IONOS service acts as a centralized, stateful virtual firewall that you can apply to multiple VMs or NICs within a Virtual Data Center?**
A. DDoS Protect
B. Network Security Groups (NSGs)
C. VPN Gateway
D. Managed Application Load Balancer

---

## Section 3: Management, Security, & Billing

**12. In the IONOS Cloud permissions model, what is the primary restriction placed on the "Administrator" role compared to the "Contract Owner"?**
A. Administrators cannot create Virtual Data Centers.
B. Administrators cannot add or remove users.
C. Administrators cannot change the payment method or access billing configurations.
D. Administrators cannot delete resources.

**13. A user has Two-Factor Authentication (2FA) enabled on their IONOS account. Can they still use their username and password to authenticate API calls?**
A. Yes, API calls always accept username and password.
B. No, they must use the SSH Key Manager.
C. No, they must generate a Bearer token using the Token Manager.
D. Yes, as long as they append their 2FA code to the password.

**14. True or False: A Cost Alert will automatically shut down your virtual machines if your monthly spending exceeds the threshold you set.**
A. True
B. False

**15. You have a long-running production database that will need 32 CPU cores and 128 GB of RAM continuously for the next 3 years. Which pricing structure will save you the most money?**
A. Pay-Per-Use (PAYG)
B. Free Tier
C. Cloud Savings Plans
D. Enterprise Commitment Plan

**16. Under the Shared Responsibility Model, which of the following is the CUSTOMER's responsibility?**
A. Patching the hardware running the physical servers
B. Securing the physical data centers
C. Maintaining the hypervisor software
D. Configuring operating system security settings and firewall rules

**17. Which IONOS Cloud observability service provides a read-only, tamper-proof audit trail of all user-initiated actions (such as who created a VM or changed a permission)?**
A. Activity Logs
B. Flow Logs
C. Monitoring Service
D. Logging Service

**18. You are migrating to IONOS Cloud and need to ensure your data remains legally out of reach of foreign government requests, specifically achieving immunity to the US CLOUD Act. Does IONOS Cloud offer this?**
A. Yes, as a German company operating exclusively under European jurisdiction, customers retain digital sovereignty.
B. No, all cloud providers are subject to the CLOUD act.
C. Only if you use the US-based data centers.
D. Only if you purchase the Enterprise Support package.

**19. Which IONOS storage service intrinsically provides active-active dual redundancy across multiple storage nodes for data availability?**
A. In-Memory DB
B. Block Storage
C. RAM Drives
D. Flow Logs

**20. You want to connect two Virtual Data Centers located in the SAME region without sending traffic over the public internet. Which free service should you use?**
A. Cross Connect
B. VPN Gateway
C. Managed NAT Gateway
D. SSH Key Manager

---
<br><br><br><br><br><br><br><br><br>

## Answer Key

**1. B.** (1 minute). The default push interval for the monitoring service metrics is 1 minute.
**2. C.** (100). The maximum number of SSH keys you can configure in SSH Key Manager is 100.
**3. A.** (True). An IPv4 address is 32 bits, but an IPv6 address is 128 bits.
**4. B.** (Elasticity). Elasticity refers to the automated scaling up/down based on demand triggers. Scalability generally refers to the system's ability to handle growth (often manual scaling).
**5. C.** (40–60% or up to 70% savings). This is the key metric to remember for IONOS Private Cloud TCO vs on-premise.
**6. B.** (Dedicated Core Servers). Dedicated Cores eliminate the "noisy neighbor" effect by locking a physical core to your VM. 
**7. C.** (IONOS Cloud Object Storage). Object storage is accessed via API/HTTP, highly scalable, and best for unstructured data like media files.
**8. B.** (False). The Network Load Balancer (NLB) operates at Layer 4 (IP/Port). The Application Load Balancer (ALB) operates at Layer 7 (URL Paths).
**9. B.** (To provide secure, outbound-only internet access). This uses Source NAT so private IPs can reach the web (e.g., for updates) without exposing them inbound.
**10. A.** (Managed PostgreSQL). PostgreSQL provides strong ACID compliance, complex joints, and great JSON/GIS support.
**11. B.** (Network Security Groups). NSGs are centralized virtual firewalls applied to one or many VMs.
**12. C.** (Administrators cannot change the payment method). Only the Contract Owner has full financial control.
**13. C.** (Token Manager). If 2FA is active, you *must* use a Bearer token for API access.
**14. B.** (False). Cost Alerts are purely informational email notifications and will not interfere with your running resources.
**15. C.** (Cloud Savings Plans). Committing to a specific amount of resource usage for 1 or 3 years offers heavy discounts compared to Pay-Per-Use.
**16. D.** (Configuring OS security and firewall rules). The provider handles the raw infrastructure (security OF the cloud); the customer handles the OS and application layers (security IN the cloud).
**17. A.** (Activity Logs). Activity logs record user actions. Flow logs record network traffic.
**18. A.** (Yes, immunity to US CLOUD Act). Because IONOS is European/German without a US parent company, it provides true digital sovereignty. 
**19. B.** (Block Storage). IONOS Block Storage is dual-redundant by default.
**20. A.** (Cross Connect). Used to link VDCs in the same region at no cost.
