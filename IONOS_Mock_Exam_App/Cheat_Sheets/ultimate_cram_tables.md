# Ultimate IONOS Cram Cheat Sheet

This document strips out all the fluff. It focuses purely on side-by-side **Comparisons** (the things they will try to trick you with) and **Hard Facts** (the exact numbers you need to memorize).

## Part 1: Side-By-Side Comparisons (The "Tricks")

### Compute: Dedicated vs. vCPU vs. Cubes
| Feature | Dedicated Core | vCPU | Cubes |
| :--- | :--- | :--- | :--- |
| **Pricing** | Most Expensive | Mid-Range | Cheapest |
| **Performance** | Guaranteed, locked physical core | Shared virtual core | VPS style |
| **Noisy Neighbor?** | **No** (Eliminated) | Yes | Yes |
| **Best For?** | Mission-critical DBs, predictable needs | General web servers | Dev/Test, simple apps |

### Load Balancing: ALB vs. NLB
| Feature | Managed ALB (Application) | Managed NLB (Network) |
| :--- | :--- | :--- |
| **OSI Layer** | **Layer 7** (Application) | **Layer 4** (Transport) |
| **Routing Basis** | **URL path**, methods, headers | **IP Address and Port** |
| **TLS / SSL?** | Terminates TLS (Decrypts it) | Does *not* terminate TLS |
| **Best For?** | Microservices, advanced routing | Max throughput, lowest latency |

### Networking: NAT vs. VPN vs. Cross Connect
| Service | Primary Purpose | Key Detail |
| :--- | :--- | :--- |
| **NAT Gateway** | Private VMs reaching the Internet | **Outbound only**. Uses SNAT. |
| **VPN Gateway** | Connecting on-prem to IONOS | Secure, encrypted IPSec/Wireguard tunnels. |
| **Cross Connect** | Connecting two different VDCs | Must be in **same region**. Free of charge. |

### Observability: Activity Logs vs. Flow Logs
| Feature | Activity Logs | Flow Logs |
| :--- | :--- | :--- |
| **What it tracks** | **User Actions** (API calls, deletes) | **Network Packets** (IPs, Ports) |
| **Where it's stored** | API / DCD (Immutable) | Object Storage Bucket |
| **Main Use Case** | Compliance Audits (GDPR), Who did what? | Firewall troubleshooting, detecting attacks |

### IAM: Contract Owner vs. Administrator
| Permission | Contract Owner | Administrator |
| :--- | :--- | :--- |
| **Access/Edit Resources** | Yes | Yes |
| **Add/Remove Users** | Yes | Yes |
| **Change Payment Method**| **Yes** | **No** |
| **Transfer Ownership** | Cannot be transferred | Can be promoted/demoted |

### Pricing: Pay-Per-Use vs. Cloud Savings Plans
| Feature | Pay-Per-Use (PAYG) | Cloud Savings Plans |
| :--- | :--- | :--- |
| **Commitment** | None (Hourly billing) | 1 or 3 Years |
| **Discount** | No discount | ~30% - 40% discount |
| **Flexibility** | Turn off anytime | Resource-based (Not instance based) |
| **Best For** | Unpredictable / short-term | Stable, long-running production |

## Part 2: The Hard Facts (Memorize These Numbers)

To maximize your score, you need to know *what* the limit is, and **why** it matters. Cover the left side of the screen and test yourself!

### Unit 1: Cloud Basics & Deployment
| The Hard Fact | The Number / Answer | The "IQ Connection" (Why it matters) |
| :--- | :--- | :--- |
| **Private Cloud TCO Savings (vs On-Prem)** | **40–60% (Up to 70%)** | Key marketing metric. Cloud eliminates your physical hardware CAPEX. |
| **Cloud Savings Plan Commitments** | **1 or 3 Years** | The standard contract lengths. You trade flexibility for massive discounts. |
| **Cloud Savings Plan Discounts** | **> 40%** | Incentivizes long-term resource pooling over hourly Pay-Per-Use (PAYG). |
| **Elasticity vs Scalability** | **Elasticity = Automatic / Real-time**<br>Scalability = Manual / Long-term | Automation is the differentiator. Auto-scaling is elastic. Buying a bigger server is scaling. |
| **IaaS Architecture Responsibility** | **Customer manages OS & Apps** | In Infrastructure-as-a-Service, IONOS only secures the Hypervisor and physical hardware. |
| **PaaS Architecture Responsibility** | **IONOS manages the OS** | In Platform-as-a-Service (like Managed DBs), IONOS handles the OS patching and backups. |
| **Immutable Compliance Storage** | **IONOS Object Lock (WORM)** | Write-Once-Read-Many ensures financial/medical records cannot be altered or deleted. |
| **Data Sovereignty Protection** | **European Regional Isolation** | Deploying in a German region ensures immunity from the US CLOUD Act. |
| **Availability Zones (AZ)** | **Isolated Power / Network blocks** | Utilizing multiple AZs within a single region ensures High Availability (HA) against failure. |

### Unit 2: Core Services (Limits & Configs)
| The Hard Fact | The Number / Answer | The "IQ Connection" (Why it matters) |
| :--- | :--- | :--- |
| **Max SSH Keys managed centrally** | **100** | Exam pitfall limit for the SSH Key Manager tool. |
| **IPv4 Address Size** | **32 bits** | Ancient internet protocol running out of space. |
| **IPv6 Address Size** | **128 bits** | Provides virtually unlimited IPs natively to every VDC. Exam Pitfall! |
| **Max vCPUs per Virtual Machine** | **256** | The platform hard limit for a single massive VM. |
| **Max RAM per Virtual Machine** | **6 TB** | The platform limit, necessary for massive In-Memory Databases. |
| **Max Size of a single Block Disk** | **62 TB** | The volume limit for standard OS block storage. |
| **HDD Block Storage Performance** | **200 MiB/s & ~1100 IOPS** | Fixed, baseline performance for cheap archival storage. |
| **SSD Standard Max IOPS limit** | **24,000 IOPS** | The performance ceiling for standard solid-state drives. |
| **SSD Premium Max IOPS limit** | **45,000 IOPS** | The highest tier performance ceiling for mission-critical databases. |
| **ALB OSI Layer** | **Layer 7 (Application)** | It terminates TLS and reads URLs to route HTTPS traffic (e.g. `/cart` goes to VM A). |
| **NLB OSI Layer** | **Layer 4 (Transport)** | It only sees IPs/Ports. Doesn't terminate TLS. Low latency, high throughput. |
| **Block Storage Redundancy** | **Dual-Redundant (Active-Active)** | IONOS replicates data twice under the hood automatically to prevent data loss. |

### Unit 3: Management, Security & Observability
| The Hard Fact | The Number / Answer | The "IQ Connection" (Why it matters) |
| :--- | :--- | :--- |
| **Default Monitoring Push Interval** | **1 Minute** | Exam pitfall! Defines how often the Grafana dashboards update with new VM metrics. |
| **Cost Alert Emails** | **Trigger exactly ONE TIME** | The platform will never spam you. Reaching a threshold fires one email and stops. |
| **Cost Alert Automated Actions** | **Zero (They do nothing)** | Alerts will NEVER automatically shut down your resources when you hit your budget. |
| **API Authentication with 2FA on** | **Token Manager (Bearer Tokens)** | If you use an authenticator app, standard passwords are blocked in the API. |
| **Minimum Password Length** | **9-12 Characters** | Configured by the Contract Owner to enforce a strong security baseline. |
| **Administrator Financial Access** | **None** | Admins can spin up VMs, but they cannot change the company credit card on file. |
| **New User Default Privileges** | **Zero Privileges** | Follows the Principle of Least Privilege (PoLP). Access must be explicitly granted. |
| **Activity Log Storage** | **Immutable via DCD** | Captures User API actions (who deleted what?). Must be tamper-proof for audits. |
| **Flow Log Storage** | **Object Storage Bucket** | Captures massive network packet traffic. Requires cheap, scalable storage. |
| **Cross Connect Price & Rules** | **Free / Same Region only** | You can link two VDCs together on the private backbone at no cost. |
| **Key Compliance Certifications** | **ISO 27001 & BSI C5** | Proves adherence to strict international and German government security standards. |

---

## Part 3: The "Buzzword Decoder"

If the question asks for X, look for exactly Y in the answers.

*   *"Automated reaction to traffic spikes"* ➜ **Elasticity** (Not scalability)
*   *"True Digital Sovereignty / CLOUD Act"* ➜ **German Company / EU Jurisdiction**
*   *"POSIX compliant shared access for multiple VMs"* ➜ **Network File Storage (NFS)**
*   *"Massive streaming analytics / Telemetry"* ➜ **Kafka (Event Streams)**
*   *"Pre-trained AI Models without sharing data"* ➜ **AI Model Hub**
*   *"Troubleshoot application URL routing"* ➜ **Application Load Balancer (ALB)**
*   *"Troubleshoot a suspicious IP address targeting your webserver"* ➜ **Flow Logs**
