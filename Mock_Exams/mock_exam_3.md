# IONOS Cloud Foundational - Mock Exam 3

**Total Questions:** 40 | **Time Limit:** 60 minutes | **Passing Score:** 70% (28/40)

**Instructions:** Select the best answer for each question. All questions are worth 1 point. This exam emphasizes scenario-based and application questions at a harder difficulty level.

---

## Section 1: Cloud Fundamentals & Benefits (Questions 1–13)

**1. A startup is pitching to investors and claims they will move their entire on-premise server room to IONOS Private Cloud. The CFO asks what TCO advantage they should expect over on-premise infrastructure. Which answer is the most accurate according to IONOS estimates?**
A. 5–15% savings due to reduced hardware refresh cycles
B. Costs are roughly equivalent to on-premise but with better reliability
C. 40–60% savings, or up to 70% in some configurations
D. 80–90% savings because physical hardware is eliminated entirely

**2. A European pharmaceutical company is evaluating cloud providers. Their legal team is most concerned about ensuring that foreign governments — specifically those with jurisdiction outside the EU — cannot compel access to their clinical trial data. Which IONOS characteristic satisfies this requirement?**
A. IONOS uses AES-256 encryption, which no government can break
B. IONOS is a German company operating exclusively under European jurisdiction, making it immune to the US CLOUD Act
C. IONOS offers a "Sovereign Mode" add-on that blocks all foreign DNS queries
D. IONOS uses private BGP routes that prevent foreign routing of data

**3. A company is transitioning from their own physical servers to IONOS Cloud. The IT Director asks how the billing model changes. Which statement BEST describes the shift in financial terms?**
A. Cloud eliminates all IT costs by replacing CAPEX and OPEX equally
B. Cloud shifts spending from capital expenditures (CAPEX) on hardware to operational expenditures (OPEX) based on consumption
C. Cloud requires a larger upfront CAPEX investment compared to buying physical servers outright
D. Cloud has no OPEX component because all resources are pre-purchased annually

**4. A development team uses a CI/CD pipeline that spins up test environments every night, runs them for 6 hours, and destroys them every morning. Which cloud characteristic is the team leveraging most directly?**
A. Resource Pooling
B. Broad Network Access
C. On-Demand Self-Service with Pay-As-You-Go (PAYG) billing
D. Digital Sovereignty

**5. An enterprise has stable, predictable compute needs: 40 CPU cores and 160 GB RAM running 24/7 in production. Their infrastructure will not change significantly for the next 3 years. Which pricing approach will minimize their total cost?**
A. Pay-Per-Use, because it provides maximum flexibility
B. Cloud Savings Plans, committing to resources for 1 or 3 years for substantial discounts
C. Buying physical servers co-located at a third-party data center
D. Free Tier resources, scaled up as needed

**6. An architect is deploying a high-availability web application and wants to ensure the application survives a complete failure of one physical data center building. What IONOS architectural feature supports this goal?**
A. Virtual Data Centers (VDCs), because each VDC is in a separate country
B. Availability Zones (AZs), which are isolated physical segments with independent power and cooling within a region
C. Cross Connect, which mirrors data between two VDCs automatically
D. VM Auto Scaling, which replaces failed VMs with healthy ones in the same zone

**7. A company's application team says they want their infrastructure to "automatically scale down at night when traffic drops, and scale back up in the morning." Which cloud concept describes this behavior?**
A. Vertical Scalability
B. Horizontal Scalability
C. Elasticity
D. Resource Pooling

**8. Under the IaaS service model on IONOS Cloud, which layer is the customer responsible for managing?**
A. The physical servers and their cooling systems
B. The hypervisor that runs underneath virtual machines
C. The guest operating system, middleware, and applications
D. The network backbone connecting IONOS data centers

**9. A healthcare company must store patient records in a way that prevents any modification or deletion for a minimum of 7 years to meet regulatory requirements. Which IONOS feature enables this?**
A. Block Storage with SSD Premium for performance
B. IONOS Object Lock (WORM — Write Once, Read Many)
C. Managed MariaDB with self-restore capability
D. Activity Logs with immutable audit trail

**10. A team is evaluating cloud providers. They need to confirm that data hosted with IONOS will never leave EU borders. Which IONOS capability guarantees this?**
A. Encryption in transit using TLS 1.3
B. Regional data residency — IONOS ensures data stays within the selected EU region
C. DDoS Protect, which shields data from exfiltration
D. The SSH Key Manager, which restricts non-EU access attempts

**11. A customer's on-premise server farm has an average physical server utilization rate of 12%. Which fundamental cloud computing benefit most directly addresses this inefficiency?**
A. Pay-As-You-Go billing that charges for over-provisioned servers
B. Resource Pooling, where shared physical hardware serves multiple tenants and improves utilization
C. DDoS protection that blocks unnecessary compute cycles
D. Cross Connect, which consolidates underutilized servers

**12. A mid-size company asks whether they can provision a new virtual machine without opening a support ticket or waiting for an IONOS engineer to fulfill the request. Which cloud characteristic makes this possible?**
A. Broad Network Access
B. High Availability
C. On-Demand Self-Service
D. Cloud Savings Plans

**13. A finance company is migrating from an on-premise deployment where they owned and operated their hardware. Their CTO wants to understand what changes in terms of operational burden. Under cloud IaaS, which tasks does IONOS take on that the customer previously handled?**
A. Application code deployment and database schema management
B. Physical server maintenance, hardware patching, and hypervisor management
C. Configuring OS-level firewall rules and user access control policies
D. Encrypting application data before it is written to disk

---

## Section 2: Core Services & Architecture (Questions 14–27)

**14. A gaming company needs to run complex AI/ML model training workloads. Their models require GPU acceleration. Standard compute VMs are too slow for their training jobs. Which IONOS compute offering is designed for this requirement?**
A. Dedicated Core Servers with maximum CPU cores
B. Cubes with NVMe storage for fast data loading
C. Cloud GPU VMs with NVIDIA H200 GPUs
D. vCPU Servers with 256 vCPUs and 6 TB RAM

**15. An e-commerce company experiences traffic spikes of 10x during holiday sales. During normal days they need 4 servers, but during peaks they need 40. They want the infrastructure to adjust automatically based on real-time CPU utilization, without manual intervention. Which IONOS service handles this?**
A. Live Vertical Scaling (LVS), which adds RAM to existing VMs
B. VM Auto Scaling, which automatically adds or removes VMs based on defined metrics
C. Cross Connect, which distributes traffic across multiple VDCs
D. Cloud Savings Plans with a 3-year commitment for 40 VMs

**16. A developer is building an application where four web servers all need to read and write to the same shared directory simultaneously. The application requires POSIX-compliant file system semantics. Which storage service is the correct choice?**
A. Block Storage (SSD Standard) attached to one VM and shared manually
B. Object Storage accessed via the S3-compatible API
C. Network File Storage (NFS), which provides managed shared file system access over NFSv4.2
D. Cube NVMe Storage, because it has the lowest latency

**17. A company needs a managed database for their e-commerce platform. The primary workloads are MySQL-compatible queries, and the team wants a built-in self-restore capability that lets them roll back to any point without a full backup restoration process. Which managed database fits best?**
A. Managed PostgreSQL with strict-synchronous replication
B. Managed MongoDB for flexible document storage
C. Managed MariaDB, which is MySQL-compatible and includes a unique self-restore capability
D. In-Memory DB for sub-millisecond latency on product lookups

**18. A company's private backend VMs are in a VDC with no public IP addresses. The VMs need to reach external package repositories on the internet to download software updates, but must not be accessible from the internet themselves. Which service provides this one-directional connectivity?**
A. VPN Gateway, establishing a tunnel to the public internet
B. Managed NAT Gateway using Source NAT (SNAT) for outbound-only internet access
C. Application Load Balancer routing outbound traffic through a proxy
D. Cross Connect to a VDC that has a public IP

**19. A security architect is reviewing IONOS storage encryption. During an audit, they ask: if a Block Storage volume is deleted, how is the data made permanently unrecoverable?**
A. The physical drive is destroyed within 24 hours of deletion
B. A 35-pass overwrite is performed on the deleted sectors
C. The AES-XTS 256-bit encryption key is zeroed out, making the encrypted data permanently unreadable
D. Data is transferred to a cold archive, then manually purged after 90 days

**20. A microservices application has many backend services deployed behind a single public IP address. The routing rules are: requests to `/api/payments` go to the payments cluster, `/api/catalog` goes to the catalog cluster, and `/api/auth` goes to the auth cluster. Which IONOS load balancing service supports this routing logic?**
A. Managed Network Load Balancer (NLB), operating at Layer 4
B. Managed NAT Gateway with route tables
C. Managed Application Load Balancer (ALB), routing at Layer 7 based on URL paths
D. Cross Connect between the three backend clusters

**21. An enterprise is connecting their Frankfurt office network to their IONOS Cloud VDC in Frankfurt. The connection must be encrypted, traverse the public internet, and support site-to-site connectivity using IKEv2. Which service is appropriate?**
A. Cross Connect, for private VDC-to-VDC connectivity
B. Managed NAT Gateway for outbound corporate traffic
C. VPN Gateway using IPSec with IKEv2 for encrypted site-to-site tunnels
D. Application Load Balancer with TLS termination

**22. A startup is building a system to collect telemetry data from 500,000 IoT sensors. Data arrives continuously at millions of events per minute and needs to be ingested, buffered, and processed by multiple downstream consumers. Which IONOS data service is architected for this workload?**
A. Managed PostgreSQL with connection pooling
B. In-Memory DB (Redis-compatible) for low-latency caching
C. Event Streams for Apache Kafka, designed for high-throughput distributed event streaming
D. Network File Storage (NFS) for centralized log aggregation

**23. A data science team wants to use a pre-trained large language model for text summarization via API. Their company policy strictly prohibits sending data to US-hosted services. They want inference, not fine-tuning. Which IONOS service is the correct match?**
A. AI Model Studio, which is used to fine-tune models with custom datasets
B. Managed Kubernetes, for deploying self-hosted open-source LLMs
C. AI Model Hub, which provides API access to pre-trained foundation models with data hosted in Germany
D. Event Streams for Apache Kafka for stream-based NLP processing

**24. A SaaS company wants to deploy containerized applications on IONOS Cloud. They want the Kubernetes control plane to be fully managed — they should not have to patch, upgrade, or manage the master nodes themselves. Which service delivers this?**
A. Cloud GPU VMs running a self-hosted k3s cluster
B. Managed Kubernetes, which fully automates control plane setup, patching, and scaling
C. VM Auto Scaling applied to a group of container-running vCPU servers
D. Private Container Registry managing container images for manual deployment

**25. A company stores Docker container images that their Managed Kubernetes cluster pulls during deployments. They need a secure, authenticated private registry that integrates natively with IONOS Kubernetes. Which service is the correct choice?**
A. IONOS Object Storage bucket with public read access
B. AI Model Hub image storage
C. Private Container Registry, a managed OCI-compatible authenticated image repository
D. Network File Storage (NFS) shared directory with Docker images

**26. A company is running a production database on a Dedicated Core server. The operations team notices the database is running low on RAM. They need to add 32 GB of RAM. Which statement about this operation is correct?**
A. They must open an IONOS support ticket to request a RAM upgrade, which takes 48 hours
B. They must snapshot the VM, delete it, and redeploy it with more RAM
C. Live Vertical Scaling (LVS) allows adding RAM to a running Compute Engine server without downtime
D. Dedicated Core servers have fixed, immutable resource configurations set at creation

**27. An operations team needs to connect their two VDCs — one for Production and one for Staging — in the same Frankfurt region. They want a private, low-latency connection between them that avoids the public internet and incurs no additional bandwidth cost. Which service should they use?**
A. VPN Gateway with WireGuard between both VDCs
B. Managed NAT Gateway pointing from the Production VDC to the Staging VDC
C. Cross Connect, which provides a free private LAN link between VDCs in the same region and contract
D. Application Load Balancer with internal routing rules

---

## Section 3: Operations, Management & Security (Questions 28–40)

**28. A new employee joins the company's cloud team. The Administrator creates a user account for them in IONOS Cloud. Before any groups or privileges are explicitly assigned, what is the user's default level of access?**
A. Read-only access to all VDCs in the contract
B. Full access limited to the VDC they were assigned to during creation
C. Zero privileges — the Principle of Least Privilege (PoLP) means new users have no access by default
D. Administrator-level access until the Contract Owner restricts them

**29. A company has 50 developers who all need the same set of permissions: view-only access to production VDCs, and full edit access to development VDCs. What is the most operationally efficient way to manage this in IONOS Cloud?**
A. Manually assign the exact privileges to each of the 50 developer accounts individually
B. Create a "Developer" Group with the required privileges, and add all 50 users to that group
C. Give all 50 developers the Administrator role, which covers both view and edit scenarios
D. Create one shared login account with edit permissions and give it to all 50 developers

**30. A CISO needs to prove to auditors that only authorized personnel accessed the production database configuration. They need a timestamped, tamper-proof log showing which user account made which API calls. Which IONOS service provides this?**
A. Flow Logs, which capture network packet metadata
B. Monitoring Service Grafana dashboards showing CPU and RAM usage
C. Activity Logs, which provide an immutable chronological audit trail of all user-initiated actions
D. Logging Service agents, which collect application stdout logs

**31. An engineer configures a Cost Alert at $2,000 for a development environment. During the month, spending reaches $1,800 (90% of the threshold) and keeps climbing. On the 22nd, spending crosses $2,000. On the 25th, spending reaches $2,400. How many alert emails are sent in total throughout the month?**
A. Zero — Cost Alerts only trigger at the end of the billing cycle
B. One — the alert fires exactly once when the $2,000 threshold is first crossed
C. Two — one at $2,000 and one when costs increase by more than 20%
D. Three — one at 90%, one at 100%, and one at 120% of the threshold

**32. A company's security team suspects a compromised VM is sending outbound traffic to a suspicious IP address range. They need to see exactly which destination IPs are being contacted from a specific NIC, which ports are used, and whether the traffic was accepted or blocked by security rules. Which service surfaces this data?**
A. Activity Logs — queried for the VM's creation and configuration history
B. Flow Logs — configured on the NIC or NAT Gateway to capture IP, port, and accept/reject metadata
C. Monitoring Service — CPU and RAM graphs help identify anomalous processing behavior
D. Logging Service — application logs from the Fluent Bit agent on the VM

**33. A large organization uses Azure Active Directory (Microsoft Entra ID) to manage all employee identities. They want IONOS Cloud users to authenticate with their existing corporate credentials using single sign-on (SSO), without creating separate IONOS passwords. Which IONOS feature enables this?**
A. Token Manager — generates Bearer tokens for API access
B. SSH Key Manager — injects corporate SSH keys into VMs
C. IAM Federation via SAML 2.0 or OpenID Connect — integrates with external identity providers
D. Support PIN — verifies identity when contacting IONOS support

**34. A compliance officer asks which IONOS compliance certification proves adherence to the international standard for Information Security Management Systems (ISMS). Which certification is the correct answer?**
A. PCI DSS
B. SOC 2 Type II
C. BSI C5
D. ISO 27001

**35. A developer's script needs to make IONOS API calls automatically. The developer has Two-Factor Authentication (2FA) enabled on their account. They try using their username and password in the API request but receive a 401 Unauthorized error. What must they do instead?**
A. Disable 2FA on their account to re-enable password-based API authentication
B. Ask a Contract Owner to make the API call on their behalf
C. Generate a short-lived Bearer token via the Token Manager and use it in the Authorization header
D. Use their SSH private key as the API authentication credential

**36. An administrator needs to view a breakdown of cloud spending by service category to identify which services are costing the most this month. Which IONOS tool provides this visibility?**
A. Activity Logs — filter by resource type to count billable events
B. Flow Logs — aggregate network usage by service
C. Cost and Usage Dashboard — provides visual breakdowns of consumption and costs by service and VDC
D. Monitoring Service — Grafana dashboards for CPU and RAM metrics

**37. A company runs both production and testing workloads in IONOS Cloud. Their production environment is stable and has predictable usage of 20 CPU cores and 80 GB RAM. Their test environment is highly variable. Which billing approach best serves each environment?**
A. Cloud Savings Plans for both environments to maximize discounts
B. Pay-Per-Use for both environments to maintain flexibility
C. Cloud Savings Plans for production (stable, long-running) and Pay-Per-Use for testing (variable, unpredictable)
D. A single Cloud Savings Plan covering both environments equally

**38. During a penetration test, a security firm asks whether IONOS Cloud's block storage is encrypted at rest. Which statement is accurate?**
A. Block Storage volumes are not encrypted by default; customers must enable encryption manually in the DCD
B. Block Storage volumes are encrypted at rest using AES-XTS 256-bit encryption automatically, with no action required from the customer
C. Only SSD Premium volumes are encrypted; HDD volumes are not encrypted
D. Block Storage is encrypted only if the VM uses a Linux OS; Windows VMs receive unencrypted volumes

**39. An IT manager needs to allow three junior developers to SSH into Linux VMs securely without distributing passwords. The manager wants to centrally store and manage the public keys so they are automatically injected when new VMs are created. Which IONOS feature is designed for this?**
A. IAM Federation with SAML 2.0 to federate SSH access
B. Token Manager to generate temporary access credentials
C. SSH Key Manager, which stores up to 100 public SSH keys and injects them into new VMs
D. Network Security Groups (NSGs) configured with IP-based allowlists for developer workstations

**40. A company is designing a disaster recovery strategy. They need their application in Frankfurt to continue operating if the entire Frankfurt Availability Zone 1 experiences a power failure. They have already deployed replicas in Availability Zone 2. What additional IONOS observability action would help them quickly detect the outage and confirm the failover worked?**
A. Configure Cost Alerts for the Frankfurt VDC to detect unexpected billing changes
B. Use the Monitoring Service with Grafana dashboards and alerting rules to track VM availability metrics and receive alerts when resources in AZ1 go offline
C. Review Activity Logs post-incident to see who deleted the resources in AZ1
D. Enable Flow Logs on the AZ1 NAT Gateway to observe when outbound traffic stops

---

## Answer Key

| Q | Answer | Explanation |
|---|--------|-------------|
| 1 | C | IONOS Private Cloud offers 40–60% TCO savings vs. on-premise, up to 70% in some cases. This is the key marketing statistic on the exam. |
| 2 | B | As a German company under European jurisdiction, IONOS is not subject to the US CLOUD Act, providing true digital sovereignty. |
| 3 | B | Cloud computing shifts IT spending from upfront capital expenditure (CAPEX) on hardware to operational expenditure (OPEX) based on actual consumption. |
| 4 | C | Spinning up resources on demand and paying only for the hours used directly leverages On-Demand Self-Service and Pay-As-You-Go billing. |
| 5 | B | Cloud Savings Plans offer discounts of more than 40% in exchange for a 1 or 3-year commitment to specific resource quantities, ideal for stable long-running workloads. |
| 6 | B | Availability Zones are isolated physical failure domains within a region, each with independent power and cooling, enabling high availability against localized failures. |
| 7 | C | Elasticity is the automated, real-time provisioning and de-provisioning of resources based on demand. Scalability refers to the capacity to handle growth, often manually. |
| 8 | C | Under IaaS, the customer is responsible for the guest OS, middleware, and application layers; IONOS manages the hardware, network, and hypervisor. |
| 9 | B | IONOS Object Lock (WORM — Write Once, Read Many) creates immutable records that cannot be modified or deleted, satisfying regulatory retention requirements. |
| 10 | B | IONOS guarantees regional data residency, ensuring data hosted in an EU region never leaves that geographic jurisdiction. |
| 11 | B | Resource Pooling allows shared physical hardware to serve multiple tenants efficiently, dramatically improving utilization rates compared to dedicated on-premise servers. |
| 12 | C | On-Demand Self-Service allows customers to provision resources instantly through the DCD or API without requiring human intervention from IONOS. |
| 13 | B | In an IaaS model, IONOS takes over physical server maintenance, hardware patching, and hypervisor management — tasks the customer previously owned on-premise. |
| 14 | C | Cloud GPU VMs feature NVIDIA H200 GPUs and are purpose-built for AI/ML training, inference, rendering, and HPC workloads. |
| 15 | B | VM Auto Scaling performs managed horizontal scaling by automatically adding or removing VM instances based on real-time metrics such as CPU utilization. |
| 16 | C | Network File Storage (NFS) provides a managed, POSIX-compliant shared file system over NFSv4.2, allowing multiple VMs to read and write concurrently. |
| 17 | C | Managed MariaDB is MySQL-compatible and uniquely includes a self-restore capability that allows point-in-time recovery without full backup restoration. |
| 18 | B | Managed NAT Gateway uses Source NAT (SNAT) to provide outbound-only internet access for private VMs, preventing any inbound connections from the internet. |
| 19 | C | When a Block Storage volume is deleted, the AES-XTS 256-bit encryption key is zeroed out, rendering the encrypted data permanently unreadable and unrecoverable. |
| 20 | C | The Managed Application Load Balancer (ALB) operates at Layer 7 and can route traffic based on URL paths, headers, and methods — required for microservices path-based routing. |
| 21 | C | VPN Gateway provides managed IPSec tunnels using IKEv2 or WireGuard for encrypted site-to-site connectivity between on-premise networks and IONOS Cloud VDCs. |
| 22 | C | Event Streams for Apache Kafka is designed for high-throughput distributed event streaming, ideal for IoT telemetry ingestion with millions of events per minute. |
| 23 | C | AI Model Hub provides API inference access to pre-trained foundation models with data hosted in Germany, satisfying data residency requirements without the infrastructure overhead. |
| 24 | B | Managed Kubernetes fully automates the Kubernetes control plane, including setup, patching, and upgrades, so developers focus on workloads rather than cluster administration. |
| 25 | C | Private Container Registry is a managed, secure, OCI-compatible image repository that integrates natively with IONOS Managed Kubernetes for authenticated image pulls. |
| 26 | C | Live Vertical Scaling (LVS) allows CPU, RAM, and NIC resources to be added to a running Compute Engine server without requiring a restart or downtime. |
| 27 | C | Cross Connect establishes a free, private, low-latency LAN connection between VDCs within the same region and contract, bypassing the public internet entirely. |
| 28 | C | New IONOS users have zero privileges by default, following the Principle of Least Privilege (PoLP). Access must be explicitly granted by an Administrator. |
| 29 | B | Creating a Group with the required privilege set and adding users to it is the most efficient and scalable approach for managing permissions across many users. |
| 30 | C | Activity Logs provide an immutable, chronological audit trail of all user-initiated API actions, showing which account performed which operation and when. |
| 31 | B | Cost Alerts trigger exactly once when the configured threshold is crossed. Subsequent spending increases do not generate additional emails from the same alert threshold. |
| 32 | B | Flow Logs capture network packet metadata — source/destination IPs, ports, protocols, and whether traffic was accepted or rejected — for NIC-level or gateway-level analysis. |
| 33 | C | IAM Federation via SAML 2.0 or OpenID Connect allows integration with external identity providers like Azure AD, enabling SSO without creating separate IONOS credentials. |
| 34 | D | ISO 27001 is the international standard for Information Security Management Systems (ISMS). IONOS holds this certification. |
| 35 | C | When 2FA is enabled, password-based API authentication is blocked. The user must generate a short-lived Bearer token via the Token Manager for API access. |
| 36 | C | The Cost and Usage Dashboard provides visual breakdowns of cloud spending by service category, VDC, and time period for cost analysis. |
| 37 | C | Cloud Savings Plans are optimal for stable, predictable production workloads; Pay-Per-Use is best for variable, unpredictable test environments where commitment would waste money. |
| 38 | B | All IONOS Block Storage volumes are automatically encrypted at rest using AES-XTS 256-bit encryption — no customer action or configuration is required. |
| 39 | C | SSH Key Manager stores up to 100 public SSH keys centrally and automatically injects them into new Linux VMs during provisioning for password-less secure access. |
| 40 | B | The Monitoring Service with Grafana dashboards and rule-based alerting is the correct tool for tracking VM availability metrics in real time and triggering alerts on outage detection. |
