# IONOS Cloud Foundational Certification - Unit 2 Study Guide: Core Services

This study guide covers the core services of IONOS Cloud, breaking them down into Compute, Storage, Networking, Databases, Security, AI, and Container services.

## 2.1 Core Architectural Components
- **Regions**: Logical grouping of physical data centers by country/geography (e.g., de/fra for Frankfurt). Ensures data sovereignty and compliance. Includes multiple Availability Zones.
- **Availability Zones (AZs)**: Isolated failure domains within a region. They have independent power, cooling, and networking. Used for high availability and fault tolerance.
- **Virtual Data Center (VDC)**: The fundamental building block of IONOS Cloud infrastructure. A logical container for your compute, storage, and networking resources.
  - VDCs are tied to a specific region.
  - You can create multiple VDCs in the same region to isolate environments (e.g., Production vs. Testing).

## 2.2 Compute Services
- **Compute Engine**: Flexible virtual servers with full control.
  - **Dedicated Core Servers**: Provide guaranteed performance with an exclusively allocated *physical CPU core* (with Hyper-Threading for two logical threads). Best for mission-critical databases and predictable performance. No "noisy neighbor" effect.
  - **vCPU Servers**: Virtual CPUs sharing physical resources. Cost-effective, scalable, and suitable for general-purpose workloads, web servers, and variable traffic.
- **Cubes**: Pre-configured Virtual Private Server (VPS) instances with fixed resources (vCPU, RAM, NVMe storage). Extremely cost-effective (lowest price point). Ideal for dev/test environments and small web apps.
- **Cloud GPU VMs**: GPU-accelerated VMs (NVIDIA H200) for AI/ML training, inference, rendering, and HPC.
- **Live Vertical Scaling (LVS)**: Allows you to add CPU, RAM, and NIC capacity to a running Compute Engine server without downtime.
- **VM Auto Scaling**: Managed horizontal scaling (adding/removing VMs) based on real-time metrics (CPU usage, network traffic, etc.). Good for variable traffic patterns (e.g., e-commerce sales).
- **Images and Snapshots**: Images are OS templates for deploying VMs. Snapshots are point-in-time copies of existing Block Storage volumes for backup/cloning.

## 2.3 Storage Services
- **Block Storage**: Network-attached virtual disks presented to VMs as raw block devices. Dual-redundant (active-active replication) and encrypted at rest.
  - **HDD**: Fixed performance (200 MiB/s, ~1100 IOPS). Best for backups, archives, cold storage.
  - **SSD Standard**: Performance scales linearly up to caps (40/30 read/write IOPS per GB, max 24k IOPS). Best for general databases and OS boot disks.
  - **SSD Premium**: Highest performance, scaling up to max 45k IOPS. Best for high-transaction, mission-critical databases.
- **IONOS Cloud Object Storage**: S3-compatible, flat namespace storage using buckets and object keys. accessed via HTTP(S). Features versioning, lifecycle rules, and Object Lock (WORM). Best for unstructured data, backups, media files, and static website hosting. Highly scalable.
- **Network File Storage (NFS)**: Managed, POSIX-compliant shared file system over NFSv4.2. Best when multiple VMs need concurrent access to shared files (e.g., shared home directories, CMS assets). Runs on SSD Standard.
- **Backup Service (Acronis)**: Centralized managed backup for VMs, databases, physical servers. Supports internal Acronis cloud or S3 Object Storage targets.

## 2.4 Networking Services
- **Managed Application Load Balancer (ALB)**: Operates at Layer 7 (Application layer). Routes HTTP/HTTPS traffic based on URL path, methods, headers, query strings. Good for microservices and web apps. Terminates TLS.
- **Managed Network Load Balancer (NLB)**: Operates at Layer 4 (Transport layer). Forwards TCP traffic based on IP and port. Lowest latency, highest throughput. Does not terminate TLS (end-to-end encryption possible).
- **Managed NAT Gateway**: Provides secure, outbound-only internet access for private networks using Source NAT (SNAT). Private VMs can reach the internet for patches/APIs without being exposed to incoming connections.
- **VPN Gateway**: Managed site-to-site encrypted tunnels using IPSec (IKEv2) or WireGuard. Best for hybrid-cloud to on-premises data centers or multi-cloud connectivity.
- **Cross Connect**: Private LAN-based links connecting multiple VDCs within the *same region and contract*. Low latency, no public internet hops, and free of charge.
- **Cloud DNS**: Managed domain name resolution service.
- **CDN**: Caches content globally at edge locations to reduce latency and protect against DDoS.
- **IPv6**: Future-proof connectivity, solving IPv4 depletion. IONOS provides automatic /56 per VDC and /64 per LAN natively.

## 2.5 Database and Data Services (DBaaS)
Managed databases handle provisioning, patching, HA, and backups for you.
- **Managed PostgreSQL**: Relational, ACID-compliant. Best for complex transactions, joins, strict consistency, and mixed JSON/GIS data. Supports strict-synchronous replication for zero data loss.
- **Managed MariaDB**: MySQL-compatible relational database. Best for web apps, SaaS, and easy MySQL migration. Includes unique self-restore capability.
- **Managed MongoDB**: Document NoSQL database (BSON/JSON). Flexible schema. Best for rapid development, CMS, catalog data. Scales horizontally through sharding.
- **In-Memory DB**: Redis-compatible, RAM-based cache with SSD persistence options. Sub-millisecond latency. Best for session storage, database query caching, real-time analytics.
- **Event Streams for Apache Kafka**: Distributed event streaming. Best for massive data ingestion, IoT telemetry, real-time analytics, and event-driven architectures.

## 2.6 Security, AI, and Container Services
- **Network Security Groups (NSGs)**: Centralized, stateful virtual firewalls applied to multiple VMs or NICs within a VDC. Default-deny approach. Simplifies managing access.
- **DDoS Protect**: Network-level protection against Layer 3/4 volumetric attacks (SYN floods, UDP floods). Basic is enabled by default.
- **Certificate Manager**: Manages SSL/TLS certificate lifecycles centrally for ALBs, CDN, API Gateway. Supports auto-renewal via ACME.
- **SSH Key Manager**: Stores public SSH keys centrally (up to 100) and injects them into new Linux VMs for secure, password-less access.
- **AI Model Hub**: Inference service with pre-trained foundation models (LLMs, embeddings, image generation) via API. No infrastructure to manage. Good for text generation, RAG, and semantic search. Data stays in Germany.
- **AI Model Studio**: Service to fine-tune existing foundation models using your own custom datasets (via LoRA). Best for creating domain-specific and proprietary AI models.
- **Managed Kubernetes**: Fully automated control plane setup, patching, and scaling. Developer focuses on containers and CI/CD while IONOS manages the K8s infrastructure.
- **Private Container Registry**: Managed, secure, authenticated storage for Docker/OCI images. Integrates perfectly with Managed Kubernetes.
- **Red Hat OpenShift & SUSE Rancher Prime**: Enterprise Kubernetes platform (OpenShift) and sovereign multi-cluster management (Rancher).

---

## Unit 2 Practice Quiz

**1. A media company stores thousands of video files that must remain available for years, be accessible from any location, and cost as little as possible to store. They do not need the files to be attached to a virtual machine. Which IONOS storage service is the most appropriate choice?**
A. Block Storage (SSD)
B. Network File Storage (NFS)
C. Backup Service
D. IONOS Cloud Object Storage
*Answer: D*
*Explanation: Object Storage is S3-compatible, highly scalable, accessible via HTTP/HTTPS, cost-effective, and doesn't require attachment to a VM.*

**2. A financial services company runs a real-time transaction processing workload that requires consistent, predictable CPU performance without any interference from neighboring virtual machines. Which IONOS compute option is the best match for this requirement?**
A. Dedicated Core server
B. vCPU server
C. Cubes
D. VM Auto Scaling
*Answer: A*
*Explanation: Dedicated Core servers give each VM an exclusive physical CPU core, eliminating the "noisy neighbor" effect and "steal time", providing guaranteed performance.*

**3. A team is deploying a web application with HTTP/HTTPS traffic. They need the load balancer to route requests to different backend server groups based on the URL path (e.g., /api vs /static). Which load balancer should they use?**
A. Managed Network Load Balancer
B. Managed Application Load Balancer
C. Managed NAT Gateway
*Answer: B*
*Explanation: The ALB operates at Layer 7 and can inspect HTTP content to route traffic based on URL paths, methods, or headers. The NLB operates at Layer 4 (IP/port).*

**4. An organization wants to apply consistent firewall rules to a group of virtual machines across their Virtual Data Center, so that all inbound and outbound traffic is controlled from a single policy definition. Which service meets this need?**
A. DDoS Protect
B. Network Security Groups (NSG)
C. Managed NAT Gateway
*Answer: B*
*Explanation: NSGs act as centralized firewalls. You create a policy once and apply it to multiple VMs/NICs within a VDC.*

**5. What is the key advantage of using Cross Connect in IONOS Cloud?**
A. It connects your corporate office directly to IONOS Cloud via IPSec.
B. It automatically load-balances traffic across multiple regions.
C. It establishes a private, low-latency, free LAN connection between different VDCs in the same region.
D. It exposes private resources securely to the internet.
*Answer: C*
*Explanation: Cross Connect links VDCs in the same region and contract via a private backbone, avoiding public internet hops, and comes at no extra charge.*
