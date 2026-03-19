

--- FILE: unit-2.1-core-components.html ---

15 min read

## Learning Objectives

By the end of this module, you will be able to: 

- Explain the role and structure of Virtual Data Centers (VDCs) in organizing cloud resources

- Describe how IONOS Cloud regions and availability zones support resilience and geographic distribution

- Identify the networking fundamentals that enable VDC connectivity and isolation

- Organize resources effectively within VDCs following IONOS best practices

# Unit 2.1: Core Architectural Components

## Introduction

Think of building a data center from scratch. You would need to provision servers, set up networks, configure storage, secure everything with firewalls, and manage it all from a single control plane. Now imagine doing that entirely in software, where you can create, modify, and delete infrastructure in minutes instead of months. That is exactly what a Virtual Data Center (VDC) gives you on IONOS Cloud. 

In this unit, you will learn about the foundational architectural components that make up IONOS Cloud. You will discover how VDCs serve as logical containers for all your cloud resources, how regions and availability zones provide geographic flexibility and high availability, and how networking fundamentals enable secure communication within and between your environments. Understanding these core components is essential before diving into specific services like compute, storage, and databases in upcoming units. 

## 1. Virtual Data Centers (VDCs)

At the heart of IONOS Cloud architecture is the Virtual Data Center. A VDC is a logical container that groups all the cloud resources you need to build an enterprise-grade IT infrastructure. Think of it as your own private data center, but entirely virtualized and managed through software. 

### 1.1 What is a Virtual Data Center?

According to IONOS documentation, a Virtual Data Center is defined as &quot;a collection of cloud resources used for creating an enterprise-grade IT infrastructure. VDC resources include the processors, memory, disk space, and networks from which virtual machines are built.&quot; 

A VDC bundles together: 

- Compute resources (processors, memory)

- Storage resources (disk space)

- Networking resources (virtual networks, IP addresses)

- Security controls (firewalls, access policies)

All of these resources are managed as a single unit through the Data Center Designer (DCD), IONOS Cloud&#x27;s graphical management interface. When you create a VDC, you are essentially provisioning a complete virtual data center that can host your applications, databases, and services. 

### 1.2 How VDCs Organize Resources

Every VDC is created in a specific geographic region (such as Berlin or Frankfurt), and all resources within that VDC belong to that location. This regional binding is important for data sovereignty, latency considerations, and compliance requirements. 

Within a VDC, resources are organized hierarchically: 

- Contract level: The top-most container owned by your organization

- VDC level: Logical data centers within your contract

- Resource level: Individual servers, storage volumes, networks, and other infrastructure components

This hierarchy enables clear organizational structure and cost tracking. Each VDC appears as a distinct line item on your monthly bill, making it easy to attribute costs to specific projects, teams, or environments. 

### 1.3 VDC Management and Access Control

Access to VDCs is controlled through IONOS Identity and Access Management (IAM). Contract owners and administrators can create VDCs, and they can grant specific permissions to users and groups at the VDC level. Permissions include: 

- Read: View VDC resources and configurations

- Edit: Modify VDC resources

- Share: Grant access to other users

These permissions are inherited by all resources within the VDC, providing centralized access control. You can also set more granular permissions at the individual resource level when needed, supporting the principle of least privilege. 

## 2. Regions and Availability Zones

IONOS Cloud operates data centers across multiple geographic locations. Understanding how regions and availability zones work is crucial for designing resilient and compliant cloud architectures. 

### 2.1 IONOS Cloud Regions

A region is a geographic location where IONOS operates one or more data centers. Each region is an independent deployment with its own infrastructure, networking, and services. IONOS Cloud regions include: 

Region 

Location 

Region Code 

Berlin 

Germany 

de/txl 

Frankfurt 

Germany 

de/fra 

Frankfurt 2 

Germany 

de/fra-2 

London 

United Kingdom 

gb/lhr 

Worcester 

United Kingdom 

gb/bhx 

Paris 

France 

fr/par 

Logroño 

Spain 

es/vit 

Lenexa 

USA 

us/mci 

Las Vegas 

USA 

us/las 

Newark 

USA 

us/ewr 

When you create a VDC, you select a region, and all resources in that VDC must reside in the chosen location. This regional architecture supports several important use cases: 

- Data sovereignty: Keep data within specific geographic boundaries to meet legal and regulatory requirements

- Latency optimization: Deploy resources close to your users for better performance

- Disaster recovery: Distribute workloads across regions for business continuity

It is important to note that IONOS does not automatically replicate data across regions. If you need multi-region resilience, you must implement your own replication and backup strategies. 

### 2.2 Availability Zones Within Regions

Within each region, IONOS Cloud infrastructure is divided into isolated physical zones called Availability Zones (AZs). Each AZ is housed in a separate physical location (different rooms or fire zones) within the data center, with independent racks, power feeds, and cooling systems. AZs are interconnected within each datacenter through a dedicated network. This isolation ensures that a hardware failure or maintenance event in one AZ does not affect resources in another AZ. 

Typically, each region supports at least two availability zones (AZ 1 and AZ 2). When you provision resources like servers or storage volumes within a VDC, you can assign them to specific availability zones. 

Distributing your resources across multiple AZs provides fault tolerance at the infrastructure level. For example, if you run a web application with servers in both AZ 1 and AZ 2, your application remains available even if one entire availability zone experiences an outage. This is the foundation of high-availability architecture on IONOS Cloud. 

### 2.3 Choosing Regions and Availability Zones

When designing your cloud architecture, consider these factors: 

For region selection: 

- Where are your users located? (Choose regions close to your user base)

- What are your compliance requirements? (Certain regulations mandate data residency)

- Do you need disaster recovery across regions? (Plan for multi-region deployment)

For availability zone distribution: 

- Spread critical workloads across at least two AZs

- Place database replicas in different AZs for high availability

- Configure load balancers to distribute traffic across AZs

While availability zones protect against data center-level failures, cross-region deployment protects against regional disasters. Most production workloads benefit from multi-AZ deployment within a single region, with cross-region deployment reserved for mission-critical applications requiring the highest level of resilience. 

## 3. Networking Fundamentals

Networking is the foundation that connects all your VDC resources together. IONOS Cloud provides software-defined networking that behaves like physical networks but with the flexibility and isolation advantages of virtualization. 

### 3.1 Virtual Networks and LANs

Within a VDC, you create Local Area Networks (LANs) to interconnect your virtual machines and other resources. These LANs are entirely software-defined and provide complete traffic isolation. 

As documented by IONOS, &quot;Virtual networks work just like normal physical networks. Transmitted data is completely isolated from other subnets and cannot be intercepted by other users.&quot; Each LAN acts as a private Ethernet segment where your resources can communicate securely. 

You can create two types of LANs: 

- Private LANs: Internal networks that are not accessible from the Internet. Resources on private LANs can only communicate with other resources within your VDC or connected VDCs.

- Public LANs: Networks that provide Internet connectivity. Resources on public LANs can reach external services and can be reached from the Internet if configured with appropriate firewall rules.

Both private and public LANs support dual-stack operation, meaning they can handle both IPv4 and IPv6 traffic simultaneously. 

### 3.2 IP Addressing and DHCP

IP addresses are given to the network cards (NICs) in your virtual machines. By default, IONOS Cloud assigns these automatically using DHCP, so you usually don’t need to worry about it. 

IPv4 addresses: 

- Your private networks get a block of addresses to use internally.

- Public dynamic IPv4 addresses are assigned automatically when a machine connects to the internet.

- If you need a permanent public address for something, you can reserve a static one.

IPv6 addresses: 

- Each cloud environment gets a large block of public IPv6 addresses.

- From this block, you can create smaller networks for your machines.

- Each NIC gets its own slice of addresses, including a single main address.

- IPv6 addresses are permanent and won’t change even if you restart your VM.

You can also choose to set addresses manually instead of using automatic assignment. This is useful for important services like DNS, load balancers, or VPNs that need a fixed address. 

### 3.3 Network Interface Cards (NICs) and Connectivity

Virtual machines connect to LANs through Network Interface Cards (NICs). Each NIC can be attached to one LAN and provides: 

- Up to 6 Gbps internal throughput (traffic within the VDC)

- Up to 6 Gbps external throughput (traffic to/from the Internet)

A single virtual machine can have multiple NICs, each connected to different LANs. This multi-homing capability enables advanced network topologies, such as separating management traffic from application traffic or creating demilitarized zones (DMZs) for public-facing services. 

### 3.4 Firewall Configuration

Every NIC can have a firewall configured directly on the interface. When you activate a firewall, you choose the traffic direction: 

- Ingress: Controls incoming traffic to the NIC

- Egress: Controls outgoing traffic from the NIC

- Bidirectional: Controls both directions

By default, activating a firewall blocks all incoming traffic. You then create firewall rules to allow specific protocols, ports, source addresses, and destination addresses. Supported protocols include TCP, UDP, ICMP (IPv4 ping), ICMPv6 (IPv6 ping), and several others. 

However, IONOS recommends using Network Security Groups (NSGs) instead of NIC-based firewalls for most use cases. NSGs provide centralized, stateful firewall management that can be applied consistently across multiple VMs and NICs. We will cover NSGs in detail in Unit 2.6 on Security Services. 

### 3.5 Cross Connect for VDC-to-VDC Communication

When you need to connect multiple VDCs together, you can use Cross Connect . This feature creates dedicated, private LAN-based links between VDCs in the same region and contract. 

Cross Connect provides: 

- High bandwidth, low-latency communication without traversing the public Internet

- Complete traffic isolation from other tenants

- Support for disaster recovery replication and workload balancing across VDCs

Each private LAN can belong to only one Cross Connect, ensuring clean network segmentation. All VDCs participating in a Cross Connect must use the same IP address range to avoid routing conflicts. 

## 4. Resource Organization Best Practices

Properly organizing resources within and across VDCs is essential for operational efficiency, cost management, and security. 

### 4.1 Separating Resources by Function and Environment

A common best practice is to create separate VDCs for different logical domains: 

- Core VDC: Hosts shared services like firewalls, VPN gateways, monitoring, and centralized logging

- Production VDC: Hosts live applications and customer-facing services

- Development VDC: Hosts development and testing workloads

- Project-specific VDCs: Each major project gets its own VDC for clear cost attribution

This separation provides several benefits: 

- Clear financial reporting (each VDC is billed separately)

- Simplified access control (grant developers access to dev VDC but not production)

- Reduced blast radius (a mistake in development cannot affect production)

### 4.2 Centralizing Shared Infrastructure

Rather than duplicating common services in every VDC, deploy them once in a core VDC and connect other VDCs via Cross Connect . This centralization: 

- Reduces licensing and operational costs

- Ensures consistent security policies across all environments

- Simplifies management and monitoring

For example, you might deploy a centralized firewall appliance, VPN Gateway , and log aggregation service in your core VDC. All other VDCs connect to the core VDC through Cross Connect, routing their traffic through the shared security infrastructure. 

### 4.3 Applying Access Controls with Groups

IONOS IAM supports user groups, which are collections of users with similar access needs. Best practices for using groups include: 

- Create groups that mirror organizational roles (e.g., Network-Engineers, Database-Admins, Security-Team)

- Grant permissions to groups rather than individual users

- Apply the principle of least privilege (give only the minimum permissions needed)

- Use the &quot;Access and manage Identity and Access Management resources&quot; privilege carefully, as it allows users to manage IAM objects

When a user joins or leaves a team, you simply add or remove them from the appropriate group. Their permissions are inherited automatically from group membership, making access management scalable and auditable. 

### 4.4 Distributing Workloads Across Availability Zones

For resilience, always distribute production workloads across at least two availability zones within a VDC. This protects against data center-level failures. Examples include: 

- Running web servers in both AZ 1 and AZ 2 with a load balancer distributing traffic

- Deploying database replicas in different AZs for high availability

- Placing backup storage in a separate AZ from primary workloads

Availability zone placement is configured when you create resources like servers and storage volumes. IONOS does not automatically balance resources across AZs, so this must be planned as part of your architecture design. 

## Common Use Cases

Real-world scenarios where IONOS Cloud core architectural components are used: 

- Multi-Tier Web Application with High Availability: A SaaS company deploys its application across three VDCs (development, staging, production) in the Frankfurt region. The production VDC distributes web servers across AZ 1 and AZ 2 as described in Section 2.2, with an application load balancer routing traffic between zones. The core VDC hosts shared services like VPN, centralized logging, and security monitoring, connected to all environments via Cross Connect as explained in Section 3.5. This architecture provides resilience against availability zone failures while maintaining clear separation between environments.

- Global Content Delivery with Regional Data Residency: An e-commerce platform serves customers in Europe and North America. The company creates separate VDCs in Frankfurt (de/fra) and Lenexa (us/len) regions, as shown in Section 2.1. European customer data stays within EU data centers for GDPR compliance, while North American traffic is served from the US region for lower latency. Each regional VDC spans multiple availability zones following the distribution strategy in Section 2.2, providing localized high availability.

- Centralized Security Architecture for Multiple Projects: An IT services company manages infrastructure for five different client projects. They create a core VDC containing shared firewall appliances and VPN gateways, plus five project-specific VDCs (one per client). Following the resource organization pattern in Section 4.1 and 4.2, all project VDCs route traffic through the core VDC&#x27;s security infrastructure via Cross Connect. The company uses IAM groups as described in Section 4.3 to grant each client&#x27;s team access only to their project VDC, ensuring complete isolation while centralizing security management.

## Summary

In this unit, you explored the core architectural components that form the foundation of IONOS Cloud. You learned that Virtual Data Centers (VDCs) serve as logical containers for all your cloud resources, providing a software-defined equivalent of physical data centers. You discovered how IONOS Cloud regions and availability zones enable geographic distribution, data sovereignty, and fault tolerance. You examined networking fundamentals including virtual LANs, IP addressing, NICs, and firewall configuration that enable secure communication within your infrastructure. Finally, you reviewed best practices for organizing resources across VDCs, using IAM groups for access control, and distributing workloads across availability zones. 

These core components work together to provide the flexibility, isolation, and resilience needed for enterprise cloud deployments. Understanding VDCs, regions, availability zones, and networking fundamentals prepares you to make informed decisions about compute, storage, and other services covered in subsequent units. 

Key Points: 

- Virtual Data Centers (VDCs) are logical containers that group compute, storage, and networking resources in a single geographic region

- IONOS Cloud regions provide geographic distribution across Europe and North America, while availability zones within each region enable fault-tolerant architecture

- Virtual LANs provide isolated networking within VDCs, with support for both IPv4 and IPv6 addressing

- Resources can be connected across VDCs using Cross Connect, enabling centralized shared services and workload distribution

- Best practices include separating environments into distinct VDCs, distributing workloads across availability zones, and using IAM groups for access control

- Regional boundaries are strict (no automatic cross-region replication), requiring explicit design for multi-region resilience

Important Terminology: 

- Virtual Data Center (VDC): A logical container for cloud resources including compute, storage, and networking, bound to a specific region

- Region: A geographic location where IONOS operates data centers, such as Berlin (de/txl) or Frankfurt (de/fra)

- Availability Zone (AZ): An isolated physical zone within a region with independent power, cooling, and networking

- LAN (Local Area Network): A software-defined virtual network that connects resources within a VDC, supporting both private and public connectivity

- Network Interface Card (NIC): A virtual network adapter that connects a virtual machine to a LAN

- Cross Connect: A private, dedicated link between LANs in different VDCs within the same region and contract

- Data Center Designer (DCD): IONOS Cloud&#x27;s graphical interface for creating and managing VDCs and their resources

## Next Steps

Continue Learning: Unit 2.2: Compute Services 

Related Topics: 

- Unit 3.1: Data Center Designer and Account Management

- Unit 3.2: Identity and Access Management

Mark as Complete 

Previous

1.4 Knowledge Check - Cloud Concepts 

Next

2.2 Compute Services


--- FILE: unit-2.2-compute.html ---

18 min read

## Learning Objectives

By the end of this module, you will be able to: 

- Explain the different IONOS compute options (Compute Engine, Cubes, Cloud GPU VMs) and their core characteristics

- Compare Dedicated Core servers and vCPU servers to determine when to use each

- Describe how VM Auto Scaling works and identify use cases where it provides value

- Differentiate between Images and Snapshots and explain their roles in compute resource management

# Unit 2.2: Compute Services

## Introduction

Think about ordering a meal at a restaurant. You might choose from a pre-set menu with fixed portions and prices (quick, simple, economical), or you might order à la carte, customizing every detail to your exact preferences (flexible, precise, but potentially more expensive). IONOS Cloud compute services work the same way, offering both pre-configured options for simplicity and fully customizable virtual machines for precision. 

In this unit, you will explore the compute services that power applications on IONOS Cloud. Whether you need guaranteed performance for mission-critical databases, cost-effective resources for development environments, or automatic scaling for unpredictable traffic patterns, understanding these compute options helps you match the right service to your workload requirements. 

## 1. IONOS Compute Portfolio Overview

IONOS Cloud offers a complete range of compute services designed to meet diverse workload requirements, from simple development environments to performance-intensive production systems. The compute portfolio consists of two primary offerings, each optimized for different use cases and budget constraints. 

### 1.1 Compute Engine (Flexible Virtual Servers)

Compute Engine is IONOS&#x27;s high-performance, flexible virtual server platform. It provides virtual machines (VMs) running on IONOS cloud infrastructure with full control over CPU, memory, storage, and networking configurations. Compute Engine is the foundation for most production workloads on IONOS Cloud. 

The Compute Engine family splits into two product types: 

Dedicated Core Servers provide each VM with a dedicated physical CPU core (delivering 2 hyper-threads). No other customer can use that core, ensuring stable, predictable performance. This makes Dedicated Core servers ideal for performance-intensive tasks such as real-time analytics, data processing pipelines, enterprise-grade applications, and high-throughput databases where CPU performance cannot be compromised. Dedicated servers support up to 62 Dedicated Cores and 230 GB RAM, with the flexibility to scale resources vertically without rebooting (Depending on operative system) 

vCPU Servers use virtual CPUs that share underlying physical resources across multiple customers. This shared model delivers cost-effective, scalable compute capacity suitable for databases, development and test environments, microservices, and general-purpose workloads. vCPU servers support up to 60 vCPUs and 230 GB RAM, with the flexibility to scale resources vertically without rebooting (Depending on operative system). 

Both Dedicated Core and vCPU servers support Live Vertical Scaling (LVS), which allows you to increase CPU cores, RAM, and add network interfaces while the server continues running depending of operative system. This capability eliminates downtime during capacity expansions, enabling you to respond instantly to load spikes or growth. 

### 1.2 Cubes (Pre-Configured Virtual Private Servers)

Cubes are IONOS Cloud&#x27;s pre-configured virtual private server instances with fixed amounts of vCPU, RAM, and direct-attached NVMe storage. Think of Cubes as ready-to-use server templates, similar to ordering a pre-configured laptop instead of building a custom PC from individual components. 

Each Cube combines a VM with an attached NVMe Direct-Attached Storage (DAS) volume in a single package. Resource configurations are fixed at provisioning time and cannot be changed, they do not support Live Vertical Scaling or automatic migration to other sizes. later but you can add new NICs or disks. Cubes are available in two template families: 

Basic Cubes follow a balanced ratio of 1 vCPU : 2 GB RAM : 60 GB storage. Sizes range from Basic Cube XS (1 vCPU, 2 GB RAM, 60 GB storage) to Basic Cube XL (16 vCPUs, 32 GB RAM, 960 GB storage). 

Memory Cubes provide more RAM per vCPU, maintaining the same storage ratio. Memory Cube XL delivers 16 vCPUs with 64 GB RAM and 960 GB storage, ideal for memory-intensive applications that don&#x27;t require dedicated CPU performance. 

Cube Type 

vCPUs 

RAM 

NVMe Storage 

Best For 

Basic Cube XS 

1 

2 GB 

60 GB 

Simple websites, development 

Basic Cube S 

2 

4 GB 

120 GB 

Small web applications 

Basic Cube M 

4 

8 GB 

240 GB 

Testing environments 

Basic Cube L 

8 

16 GB 

480 GB 

Batch processing 

Basic Cube XL 

16 

32 GB 

960 GB 

Medium workloads 

Memory Cube S 

2 

8 GB 

120 GB 

Memory-intensive dev/test 

Memory Cube M 

4 

16 GB 

240 GB 

Caching layers 

Memory Cube L 

8 

32 GB 

480 GB 

In-memory processing 

Memory Cube XL 

16 

64 GB 

960 GB 

Large memory workloads 

Cubes run on shared infrastructure and use resource over-provisioning (typically a 1-to-10 factor), meaning the platform may distribute performance among instances during peak periods. This makes Cubes most suitable for development, testing, website hosting, and low-criticality workloads where occasional performance variation is acceptable. For consistent, guaranteed performance, Compute Engine is the better choice. 

### 1.3 Cloud GPU VMs

Cloud GPU VMs are GPU-accelerated virtual machines within the Compute Engine family, designed for workloads that require massive parallel processing power. Each Cloud GPU VM is equipped with NVIDIA H200 GPUs featuring high-bandwidth GPU memory, delivering the compute performance needed for artificial intelligence, machine learning, and high-performance computing tasks. 

Key characteristics of Cloud GPU VMs: 

- Dedicated NVIDIA H200 GPU resources attached to Compute Engine virtual machines

- High-bandwidth GPU memory optimized for large AI/ML model training and inference

- Suitable for AI/ML training, model inference, 3D rendering, scientific simulations, and video processing

- Available within IONOS Cloud data centers, keeping GPU workloads under European data sovereignty

When to use Cloud GPU VMs: 

Choose Cloud GPU VMs when your workload involves training or fine-tuning machine learning models, running AI inference at scale, performing 3D rendering or visualization, or executing scientific computing tasks that benefit from GPU parallelism. For general-purpose compute workloads that do not require GPU acceleration, Dedicated Core or vCPU servers are more cost-effective choices. 

## 2. Choosing the Right Compute Service

Understanding when to use each compute service depends on your workload characteristics, performance requirements, and budget constraints. 

### 2.1 Compute Engine vs Cubes: Decision Criteria

The fundamental difference between Compute Engine and Cubes lies in resource flexibility, performance guarantees, and cost structure. 

Aspect 

Compute Engine 

Cubes 

Resource Model 

Flexible - customize vCPUs, cores, RAM independently 

Fixed pre-configured sizes (templates) 

Performance Guarantee 

No over-provisioning; resources are reserved 

Over-provisioned (1-to-10 factor); performance may vary 

Maximum Capacity 

Up to 62 vCPUs, 230 GB RAM (more on-demand) 

Up to 16 vCPUs, 64 GB RAM (Memory Cube XL) 

SLA 

Highest SLA in IONOS Cloud 

Lower SLA - suitable for non-critical workloads 

Pricing 

Higher per-hour rates; pay for exact resources configured 

Much lower rates (e.g., Basic Cube XS from €0.007/h) 

Storage 

Separate block storage (HDD/SSD) attached as needed 

Includes direct-attached NVMe storage in package 

Scalability 

Adjust CPU, RAM, storage independently after provisioning 

Fixed resources; cannot change after creation 

Best For 

Production, databases, high-traffic applications 

Development, testing, simple websites, low-criticality workloads 

Choose Compute Engine when you need guaranteed performance for production workloads, require more than 16 vCPUs or 64 GB RAM, want flexibility to adjust resources independently, need GPU acceleration for AI/ML or rendering workloads (Cloud GPU VMs), or when SLA and uptime are primary concerns. 

Choose Cubes when your workload is development, testing, or low-criticality, you prefer a quick and low-cost entry point with ready-made VM and storage, resource needs fit a pre-defined template size, or you want to minimize operational complexity. 

### 2.2 Dedicated Core vs vCPU Servers: Performance vs Cost

Within Compute Engine , choosing between Dedicated Core and vCPU servers requires balancing performance requirements against budget. 

Dedicated Core servers allocate one physical CPU core (2 hyper-threads) exclusively to your VM. No other customer can use that core, eliminating &quot;noisy neighbor&quot; effects and providing the most stable, predictable performance in the IONOS portfolio. This makes Dedicated Core ideal for real-time analytics, data processing pipelines, enterprise applications with strict SLA requirements, and high-throughput databases where consistent CPU performance is critical. 

vCPU servers share physical resources across multiple customers, delivering good performance for most workloads while remaining cost-effective. Virtual CPUs provide approximately 80% of physical core performance under typical conditions, but performance may vary based on shared host utilization. This makes vCPU servers ideal for development and test environments, general-purpose databases, web services, microservices, and scalable workloads where some performance variability is acceptable. 

The cost difference is significant. Dedicated Core servers command premium pricing (starting around €0.034/hour with a 1-year Savings Plan) because you pay for an entire physical core. vCPU servers cost substantially less, making them the most cost-effective option for workloads that don&#x27;t require guaranteed CPU isolation. 

Performance-critical or mission-critical workloads justify Dedicated Core pricing. Development, testing, and general-purpose applications benefit from vCPU cost efficiency. 

## 3. Scaling and Flexibility Features

IONOS Cloud compute services provide multiple mechanisms to adapt resources to changing demands, both vertically (adding resources to existing VMs) and horizontally (adding more VMs). 

### 3.1 Live Vertical Scaling

Live Vertical Scaling (LVS) is a technology built into Compute Engine that allows you to increase CPU cores, RAM, and network interfaces while the server continues running. No reboot is required for Linux systems (Windows has some limitations), enabling zero-downtime capacity expansions. 

This capability delivers several important benefits. You can respond instantly to load spikes without service interruption, right-size servers on-the-fly instead of over-provisioning from the start, and eliminate the operational overhead of manual shutdown and restart procedures. Applications remain available to users while you add capacity. 

On Linux systems with modern kernels, you can hot-add CPU cores, RAM, NICs and disks without downtime. On Windows systems, you can hot-add CPU cores, NICs or disks, but RAM scaling or scaling beyond eight cores requires a reboot. Live Vertical Scaling works for both Dedicated Core and vCPU servers. If you want to reduce resources such as CPU or RAM, a reboot is required on any operating system. However, network interfaces (NICs) and disks can still be disconnected without requiring a reboot. 

Disk capacity can be increased while the server is running, but the operating system must manually resize the partition and filesystem to make use of the newly allocated space. Disk capacity reduction (shrinking) is not allowed or supported under any circumstances. 

It is important to note that hot downscaling is not supported for CPU or RAM on either Linux or Windows systems. Only NIC removal and disk detachment are supported without downtime. These limitations should be considered when designing capacity management and scaling strategies.

You can hot increase disk size, but you will need to resize the inner partitions on the operative system. Its not allowed or supported shrink any disk. 

The ability to scale vertically without downtime is particularly valuable for databases that experience gradual growth, web applications facing unexpected traffic increases, or any workload where service interruptions impact user experience or revenue. 

### 3.2 VM Auto Scaling (Horizontal Scaling)

VM Auto Scaling is a managed IONOS Cloud service that automatically launches or terminates VM instances based on real-time workload metrics such as CPU utilization or network traffic. Instead of manually monitoring load and adding servers, VM Auto Scaling continuously monitors defined metrics and adjusts the number of running VMs automatically. 

When a scaling threshold is met, VM Auto Scaling adds or removes VMs in a VM Auto Scaling Group, where all VMs are created from the same image template. This ensures consistency across instances. The service integrates with other IONOS services like Application Load Balancer (ALB) to distribute traffic evenly across the variable VM pool. 

Key benefits of VM Auto Scaling include: 

- Improved resource utilization and cost efficiency - VMs are added only when needed and removed when demand drops, avoiding over-provisioning charges

- Better application performance - The service scales out before applications become sluggish, maintaining low response times

- Rapid, automated scalability - Horizontal scaling can trigger in seconds without manual intervention, supporting traffic spikes from marketing campaigns, product launches, or seasonal events

- Reduced operational overhead - Scaling logic is handled by the service; you no longer need to manually monitor metrics and provision VMs

Common use cases for VM Auto Scaling: 

Web application front-ends: Combine VM Auto Scaling with an Application Load Balancer to automatically distribute incoming HTTP(S) traffic across a variable number of identical web server VMs, ensuring consistent latency during traffic peaks. 

API services and microservices: Scale the number of API-handling VMs based on CPU or network packet thresholds, keeping API response times within SLA limits. 

Batch processing or data ingestion pipelines: When ingest rates rise, the service adds more VMs to handle extra load. Once the queue empties, it scales back down, saving costs. 

Seasonal or event-driven workloads: E-commerce sites during holiday sales, streaming platforms during live events, or any workload with predictable spikes can pre-define minimum and maximum replica counts and let the service handle the rest. 

To get the most value from VM Auto Scaling, pair it with an Application Load Balancer for even traffic distribution and health checking, use Cloud-Init or custom images so new replicas are ready to serve immediately, and define sensible scale-in and scale-out thresholds with appropriate cool-down periods to avoid rapid oscillations. 

## 4. Images and Snapshots

Images and Snapshots are fundamental tools for managing compute resources, enabling you to create templates, backup VM states, and clone workloads across your infrastructure. 

### 4.1 Images: Templates for VM Deployment

An Image is a template containing an operating system and optionally pre-installed software that serves as the root disk when creating a new virtual server or an ISO file containing applications to be installed on your machines. Images enable you to deploy many VMs with identical configurations quickly and consistently. 

IONOS Cloud provides three types of images: 

Public Images are offered by IONOS and include common operating systems like Ubuntu, CentOS, Windows Server, and others. These images are available in all supported regions and are ready to use immediately. 

BYOS Images (Bring Your Own Subscription) allow you to use operating systems with your existing licenses, such as SUSE Linux Enterprise Server (SLES) or Red Hat Enterprise Linux (RHEL). You provide the subscription, and IONOS provides the infrastructure. 

Private Images are custom images you create or upload via FTP. These can contain pre-installed applications, security configurations, or customized operating systems. Private images are only visible in the region where they were uploaded. 

Images are managed as separate objects and do not consume your HDD quota in the same way snapshots do. You can share private images with specific users or groups using access controls, and you can protect them with 2-factor authentication for additional security. 

### 4.2 Snapshots: Point-in-Time Backups

A Snapshot is a point-in-time copy of an already-provisioned Block Storage volume. It captures the entire volume, including empty space, creating a full backup of the disk state at the moment the snapshot is taken. 

Snapshots serve several purposes. They provide quick recovery points for specific VM disks, enable you to clone volumes to roll out multiple VMs with identical data, and offer temporary backups before upgrades or patches. If an upgrade fails, you can restore the volume from the snapshot. There are not recommended as substitute to a traditional backup tool like IONOS Backup Service because they can not be scheduled and their persistence can not be automatically controlled. 

Key differences between Images and Snapshots: 

Aspect 

Image 

Snapshot 

What it is 

OS template for deploying new VMs 

Point-in-time copy of existing Block Storage volume 

How created 

Selected from catalog, uploaded via FTP, or created from snapshot 

Right-click provisioned storage volume and choose &quot;Create Snapshot&quot; 

Storage quota 

Stored as image object; minimal quota impact 

Consumes full HDD quota equal to entire volume size (including empty space) 

Incremental 

Not incremental; each image is separate object 

Not incremental; each snapshot is full copy of source volume 

Location constraints 

Private images visible only in upload region; public images available everywhere 

Snapshots usable only in same data center location where created 

Bootability 

Directly selectable as boot disk for new VM 

Must be attached to new block storage volume before use as boot disk 

Typical use 

Deploy multiple VMs with same OS/configuration 

Quick backup/recovery for specific VM disk 

Both Images and Snapshots can be shared with groups using access controls and can be protected with 2-factor authentication. Neither has automatic retention; they persist until you delete them. 

Understanding when to use each tool is straightforward. Use Images when deploying new VMs with standard or custom operating systems. Use Snapshots when backing up existing VM disks or cloning workload data to new instances. 

## 5. Pricing Models for Compute Resources

IONOS Cloud offers two pricing models for compute resources, each designed for different usage patterns and commitment levels. 

### 5.1 Pay-As-You-Go (PAYG)

Pay-As-You-Go billing charges hourly usage at listed prices for every hour resources run. There is no commitment and no upfront cost. You pay only for what you use, and you can start or stop resources at any time. 

PAYG pricing provides maximum flexibility, making it ideal for spiky workloads, short-term projects, development and testing environments, or experimental workloads where usage is unpredictable. You have full freedom to provision and deprovision resources as needed. 

Typical PAYG rates include vCPU servers at approximately 0.012€ per hour per vCPU, RAM at 0.0020€ per hour per GB, and Dedicated Core CPUs ranging from 0.036€ to 0.040€ per hour depending on CPU family. 

### 5.2 Cloud Savings Plans (Reserved-Instance-Like)

Cloud Savings Plans allow you to commit to a fixed quantity of Dedicated Core resources (CPU cores and RAM) for 1 year or 3 years in exchange for significantly lower hourly rates. Unlike traditional reserved instances, Cloud Savings Plans are resource-based and not tied to a specific VM type, region, or operating system, providing flexibility to move workloads freely. 

Savings Plan rates are substantially lower than PAYG. For example, 1 Dedicated Core costs approximately 0.034€ per hour with a 1-year plan (vs. 0.036€ PAYG), and 0.024€ per hour with a 3-year plan. RAM costs approximately 0.0038€ per hour per GB with a 1-year plan (vs. 0.0045€ PAYG), and 0.0027€ per hour per GB with a 3-year plan. 

The cost savings are significant. For a workload running 10 Dedicated Cores and 40 GB RAM continuously for a month (approximately 720 hours): 

- PAYG: (10 × 0.036€ + 40 × 0.0045€) × 720 ≈ 388.8€ per month

- 1-year Savings Plan: (10 × 0.034€ + 40 × 0.0038€) × 720 ≈ 354.24€ per month (9% savings)

- 3-year Savings Plan: (10 × 0.024€ + 40 × 0.0027€) × 720 ≈ 250.56€ per month (35% savings)

Cloud Savings Plans bill the entire committed amount every month, even if you don&#x27;t use the full capacity. Any usage beyond the committed amount is billed at PAYG rates. Multiple plans can coexist, with the oldest plan applied first and excess usage falling through to newer plans or PAYG. 

Choose PAYG when workloads are variable, short-lived, experimental, or unpredictable. Choose Cloud Savings Plans when you have stable, always-on workloads with predictable core and RAM usage, need price certainty for budgeting, or want to optimize costs for long-term production systems. 

## Common Use Cases

Real-world scenarios where IONOS compute services provide value: 

- E-Commerce Platform with Seasonal Traffic: An online retailer uses Compute Engine vCPU servers for their web application, paired with VM Auto Scaling (Section 3.2) and an Application Load Balancer. During Black Friday and holiday sales, traffic increases 10x. VM Auto Scaling automatically provisions additional vCPU servers when CPU utilization exceeds the defined threshold, distributes traffic evenly via the load balancer, and removes extra servers when traffic returns to normal. The retailer pays only for the extra capacity during peak periods, avoiding year-round costs for servers that sit idle most of the year.

- Development and Test Environments with Cubes: A software development team uses Basic Cube M instances (Section 1.2) for their CI/CD pipeline and test environments. The fixed resources (4 vCPUs, 8 GB RAM, 240 GB storage) match their typical test workload requirements, the low hourly cost fits their budget constraints, and the included NVMe storage provides fast build and test performance. When tests complete, they can suspend or delete Cubes to save costs, then provision new ones quickly when the next development sprint begins.

- Mission-Critical Database with Dedicated Core Servers: A financial services company runs a PostgreSQL database on Dedicated Core servers (Section 2.2) with 8 dedicated cores and 64 GB RAM. The dedicated physical cores eliminate noisy neighbor effects, ensuring consistent query performance for real-time transaction processing. They use a 3-year Cloud Savings Plan (Section 5.2) to lock in pricing at approximately 45% less than PAYG, providing both predictable performance and predictable costs. Live Vertical Scaling (Section 3.1) allows them to add cores without downtime when transaction volumes grow during quarter-end processing.

## Summary

IONOS Cloud compute services provide flexible options for running virtual machines, from cost-effective pre-configured Cubes to high-performance Compute Engine servers with dedicated CPU cores and GPU-accelerated Cloud GPU VMs for AI/ML workloads. Understanding the characteristics, use cases, and pricing models of each service enables you to match compute resources to workload requirements effectively. 

Compute Engine delivers flexible, high-performance virtual servers with full control over CPU, memory, storage, and networking. Within Compute Engine, Dedicated Core servers provide guaranteed performance with dedicated physical cores for mission-critical workloads, while vCPU servers offer cost-effective, scalable compute for general-purpose applications. Live Vertical Scaling allows you to expand capacity without downtime. 

Cubes provide pre-configured VPS instances with fixed vCPU, RAM, and NVMe storage at the lowest prices in the IONOS portfolio, ideal for development, testing, website hosting, and low-criticality workloads where performance guarantees are less important than cost efficiency. 

VM Auto Scaling automates horizontal scaling by adding or removing VMs based on real-time metrics, improving resource utilization, application performance, and operational efficiency. Images and Snapshots enable you to create templates for consistent VM deployment and point-in-time backups for recovery and cloning. 

Pricing models include flexible Pay-As-You-Go for variable workloads and Cloud Savings Plans for long-term commitments, delivering up to 35% savings for stable, predictable compute usage. 

Key Points: 

- Compute Engine provides flexible virtual servers with Dedicated Core (guaranteed performance) and vCPU (cost-effective scalability) options

- Cubes offer pre-configured VPS instances with fixed resources at the lowest pricing, suitable for dev/test and low-criticality workloads

- Cloud GPU VMs provide NVIDIA H200 GPU-accelerated compute for AI/ML training, inference, rendering, and HPC workloads

- Live Vertical Scaling enables zero-downtime capacity expansion for Compute Engine servers

- VM Auto Scaling automates horizontal scaling based on real-time metrics, ideal for variable traffic patterns

- Images serve as templates for deploying VMs; Snapshots capture point-in-time backups of existing volumes

- Cloud Savings Plans reduce costs by up to 35% for committed Dedicated Core usage vs. Pay-As-You-Go pricing

Important Terminology: 

- Compute Engine: IONOS&#x27;s flexible virtual server platform offering Dedicated Core and vCPU servers with customizable resources

- Dedicated Core Server: Virtual machine with an exclusively allocated physical CPU core, providing guaranteed performance

- vCPU Server: Virtual machine using virtual CPUs that share physical resources, offering cost-effective scalability

- Cubes: Pre-configured virtual private server instances with fixed vCPU, RAM, and NVMe storage resources

- Cloud GPU VMs: GPU-accelerated virtual machines equipped with NVIDIA H200 GPUs for AI/ML, rendering, and high-performance computing workloads

- Live Vertical Scaling (LVS): Technology enabling CPU, RAM, and NIC expansion while the server continues running without downtime

- VM Auto Scaling: Managed service that automatically launches or terminates VM instances based on real-time workload metrics

- Image: Operating system template or application installation disk used when creating new virtual servers

- Snapshot: Point-in-time copy of an existing Block Storage volume used for backup and cloning

## Next Steps

Continue Learning: Unit 2.3: Storage Services 

Related Topics: 

- Unit 2.1: Core Architectural Components

- Unit 2.4: Networking Services

- Unit 3.3: Cost Management and Billing

Mark as Complete 

Previous

2.1 Core Architectural Components 

Next

2.3 Storage Services


--- FILE: unit-2.3-storage-services.html ---

21 min read

## Learning Objectives

By the end of this module, you will be able to: 

- Describe the key IONOS storage services and explain when to use each type

- Compare Block Storage, IONOS Cloud Object Storage, and Network File Storage based on their characteristics and use cases

- Identify the appropriate storage solution for different workload requirements

- Explain the performance differences between SSD and HDD storage options

# Unit 2.3: Storage Services

## Introduction

Imagine you are organizing your home office. Some documents need to be immediately accessible in a filing cabinet right next to your desk (fast access, small quantities). Other materials, like photo albums or archived tax records, can live in a storage unit across town (slower access, large quantities). Meanwhile, you might have a shared family calendar on the refrigerator that everyone needs to see and update (shared access, concurrent users). Cloud storage works exactly the same way. 

In this unit, you will explore IONOS Cloud&#x27;s three primary storage services: Block Storage for high-performance virtual disks, IONOS Cloud Object Storage for durable, scalable object-based storage, and Network File Storage for shared file systems. You will learn what makes each service unique, how they differ in performance and access patterns, and which scenarios call for each solution. Whether you are storing database files, backing up critical data, or sharing application content across multiple servers, understanding these storage options is essential for designing efficient cloud architectures. 

## 1. Block Storage

Block Storage is IONOS Cloud&#x27;s managed storage service that presents data to virtual machines as raw block devices, similar to traditional hard drives or SSDs attached to a physical server. Unlike a file system service, Block Storage provides the underlying blocks of storage that you format with your own file system (ext4, XFS, NTFS, etc.) and use as if it were a local disk. 

### 1.1 What is Block Storage?

Block Storage operates at the block level, meaning data is stored in fixed-size blocks rather than as files or objects. When you attach a Block Storage volume to a Compute Engine VM or Cube, the operating system sees it as a raw disk device that can be partitioned, formatted, and mounted. This makes Block Storage ideal for workloads that require low-latency, random-access input/output operations, such as databases, application servers, and VM boot disks. 

Every Block Storage volume is dual-redundant, meaning data is written synchronously to two separate storage servers, each with its own RAID configuration. This active-active redundancy ensures that if a disk or even an entire storage server fails, your data remains available without interruption. Additionally, all Block Storage data is encrypted at rest by default, and deleted blocks are securely erased to prevent recovery, meeting strict data protection requirements. 

### 1.2 Storage Media Types

IONOS offers Block Storage in three media types, each optimized for different performance and cost profiles: 

Media Type 

Typical Use Cases 

Volume Size Range 

Maximum Volumes per VM 

HDD 

Backups, archives, cold storage 

1 GiB - 4 TiB 

Up to 24 HDD per VM 

SSD Standard 

General-purpose workloads, databases, applications 

1 GiB - 4 TiB 

Up to 24 SSD Standard per VM 

SSD Premium 

High-performance databases, mission-critical applications 

1 GiB - 4 TiB 

Up to 4 SSD Premium per VM 

HDD volumes provide a fixed performance level of 200 MiB/s sequential throughput and approximately 1,100 IOPS for random operations, regardless of volume size. This makes them cost-effective for workloads where performance is not the primary concern, such as long-term backups or archival storage. 

SSD Standard volumes deliver performance that scales linearly with volume size at 0.5 MiB/s per GiB (capped at 300 MiB/s per volume). For random I/O, you get 40 IOPS per GiB for reads (up to 24,000 IOPS) and 30 IOPS per GiB for writes (up to 18,000 IOPS). This makes SSD Standard suitable for most production workloads, including databases and application servers. 

SSD Premium volumes offer the highest performance, scaling at 1 MiB/s per GiB (capped at 600 MiB/s per volume) with 75 IOPS per GiB for reads (up to 45,000 IOPS) and 50 IOPS per GiB for writes (up to 30,000 IOPS). Premium SSD is designed for latency-sensitive applications that demand maximum throughput and IOPS, such as large relational databases or high-transaction applications. 

### 1.3 Key Block Storage Features

Block Storage volumes are attached to VMs over a high-speed network, providing low latency and high throughput. Because the storage is network-attached rather than physically attached, you can detach a volume from one VM and reattach it to another, enabling flexible infrastructure management and disaster recovery scenarios. 

The dual-redundant architecture means every write is synchronously replicated to a second storage server, ensuring data durability even in the event of hardware failure. Combined with encryption at rest and secure deletion capabilities, Block Storage provides enterprise-grade reliability and security for your most critical workloads. 

## 2. IONOS Cloud Object Storage

IONOS Cloud Object Storage is a highly scalable, S3-compatible storage service designed for storing large volumes of unstructured data. Unlike Block Storage , which presents data as virtual disks, Object Storage organizes data into buckets and objects, where each object consists of the data itself, associated metadata, and a unique identifier (key). 

### 2.1 What is Object Storage?

Object Storage uses a flat, non-hierarchical structure. Instead of organizing files into directories and subdirectories, you place objects (files) into buckets and address them by unique keys. For example, you might store a file as s3://my-bucket/images/photo.jpg , where my-bucket is the bucket name and images/photo.jpg is the object key. This flat structure allows Object Storage to scale to virtually unlimited capacity without the constraints of traditional file systems. 

IONOS Cloud Object Storage is fully compatible with the Amazon S3 API, meaning you can use any S3-compatible tool, SDK, or client (such as AWS CLI, Terraform, rclone, or Cyberduck) without modification. This compatibility extends to advanced features like pre-signed URLs, bucket policies, access control lists (ACLs), versioning, object locking, lifecycle rules, and cross-region replication. 

### 2.2 Object Storage Use Cases

Object Storage excels at use cases where data is written once and read many times, or where you need durable, cost-effective storage for large datasets: 

Use Case 

Why Object Storage Fits 

Data Backup and Restore 

Built-in versioning and replication protect critical data; lifecycle rules automate retention policies 

Website Asset Storage 

Store images, PDFs, and downloadable files separately from web servers, reducing storage costs and improving scalability 

Static Website Hosting 

Host static HTML, CSS, and JavaScript directly from a bucket with public-read access, eliminating the need for a web server 

Multimedia Asset Hosting 

Large, rarely-changed media files receive a unique URL for easy embedding in applications or websites 

Private File Storage 

Default private buckets combined with ACLs and bucket policies keep data inaccessible to the public 

Unstructured Data and Big Data 

Flat structure and rich metadata make it easy to store and retrieve large datasets, logs, or analytics inputs 

Artifact and Software Distribution 

Developers can upload build artifacts or software packages and share them via secure, pre-signed URLs 

Periodic Data Retention 

Lifecycle rules automatically delete or archive data after a defined period, ideal for log retention and compliance 

Object Storage is accessible over HTTPS from anywhere, making it ideal for distributing content globally or providing backup storage that does not require a VM to access. Because you only pay for the storage you use (pay-as-you-go pricing), Object Storage is particularly cost-effective for workloads with variable storage needs. 

### 2.3 Object Storage Features

Object Storage provides several features that enhance durability, security, and manageability. Versioning allows you to preserve multiple versions of an object, protecting against accidental deletions or overwrites. Object Lock (Write-Once-Read-Many, or WORM) ensures that objects cannot be modified or deleted for a specified retention period, meeting regulatory compliance requirements. 

Lifecycle management rules let you automate data retention policies. For example, you can configure a rule to delete log files after 90 days, transition older backups to a lower-cost storage tier, or remove incomplete multipart uploads. These rules reduce manual intervention and help control storage costs over time. 

Pre-signed URLs allow you to grant temporary access to private objects without changing their permissions. This is useful for sharing files with external users or enabling time-limited downloads from otherwise restricted buckets. 

## 3. Network File Storage

Network File Storage (NFS) is IONOS Cloud&#x27;s managed, shared file system service that delivers POSIX-compliant storage over the NFSv4.2 protocol. Unlike Block Storage , which requires you to format and manage the file system yourself, Network File Storage presents a ready-to-use file system that multiple VMs can mount and access simultaneously. 

### 3.1 What is Network File Storage?

Network File Storage runs on SSD-based infrastructure and provides active-active redundancy, similar to Block Storage . However, instead of presenting raw block devices, it exposes a file-level interface that supports standard POSIX file operations such as open, read, write, rename, and lock. Multiple VMs can mount the same NFS share concurrently, making it ideal for workloads that require shared access to a common set of files. 

Because Network File Storage is managed by IONOS, you do not need to worry about provisioning, patching, or maintaining the underlying storage infrastructure. The service is accessible only from IONOS virtual machines over a private LAN, ensuring secure, low-latency connectivity. It is also compatible with IONOS Managed Kubernetes , allowing containerized applications to use NFS volumes for persistent storage. 

### 3.2 Key Network File Storage Features

The following table summarizes the core features of Network File Storage : 

Feature 

What it Provides 

Why it Matters 

SSD Standard storage 

Fast, instant data access in shared-usage mode. Minimum cluster size is 2 TiB, maximum is 42 TiB (usable space). 

Guarantees low latency and high throughput for file-level workloads. 

NFSv4.2 protocol 

Latest NFS version with compound operations, caching, and parallel connections. 

Reduces protocol overhead, enables efficient read/write operations, and supports live data movement. 

Encryption at rest 

Data encrypted on the physical media by default. 

Protects data from unauthorized access when not in use. 

Root-squash security 

Maps client-side root or all users to an anonymous UID/GID, preventing super-user privileges on the NFS server. 

Mitigates the risk of compromised client machines attacking the storage backend. 

Secure deletion 

Guarantees that deleted data cannot be recovered from the underlying block storage. 

Meets compliance and data privacy requirements. 

Active-active redundancy 

Data stored on two storage servers (hardware or software RAID) with active-active mirroring. 

Provides high availability and durability. 

POSIX-compliant file system 

Full POSIX semantics for permissions, ownership, and locking. 

Enables seamless sharing of home directories, databases, web content, and more. 

Managed service 

IONOS handles provisioning, patching, hardware replacement, and scaling. 

Removes operational overhead from the customer. 

Scalable performance 

Up to 300 MiB/s per 4 TiB (1 MiB block), 24,000 IOPS read / 18,000 IOPS write per 4 TiB (4 KiB block). Performance scales linearly with size. 

Ensures consistent performance as storage needs grow. 

Network File Storage is particularly useful for centralized user home directories, shared storage for databases and application servers, and web content repositories that need to be accessed by multiple front-end servers. By providing a single, shared file system, Network File Storage simplifies infrastructure management and ensures that all VMs see a consistent view of the data. 

### 3.3 Network File Storage Use Cases

Common scenarios for Network File Storage include: 

- Centralized user home directories for Linux VMs: All users across multiple VMs access their home directories from a single NFS share, simplifying user management and ensuring data consistency.

- Shared storage for databases and application servers: Multiple database instances or application servers can read and write to the same NFS share, enabling horizontal scaling and cost-efficient resource utilization.

- Web content repository served by multiple web servers: A single NFS share holds static and dynamic web content, ensuring that all front-end servers deliver identical content to users.

- Persistent storage for Kubernetes workloads: Containers running in IONOS Managed Kubernetes can mount NFS volumes for persistent data, supporting stateful applications and shared configuration files.

## 4. Backup Service

Backup Service (formerly known as Managed Backup) is IONOS Cloud&#x27;s managed backup and recovery solution, powered by Acronis Cyber Protect Cloud. It provides a comprehensive platform for protecting data across VMs, physical servers, databases, NAS devices, and cloud workloads, with centralized management through a web-based console. 

### 4.1 What is Backup Service?

Backup Service allows you to create Backup Units, which are logical containers that hold Acronis credentials and the devices you want to protect. You manage backups through the Backup Service Console, accessible via single sign-on from the Data Center Designer (DCD) or directly at https://backup.ionos.com . The console supports 25 languages and provides role-based permissions, allowing you to control who can create backup units, manage protection plans, and restore data. 

Backup Service supports multiple backup targets. By default, backups are stored in the internal Acronis cloud infrastructure located in Berlin, Germany. Optionally, you can configure backups to store in IONOS Cloud Object Storage buckets, allowing you to choose your preferred region (Berlin, Frankfurt, Spain, etc.) and take advantage of lower per-GB storage rates. 

### 4.2 Backup Service Features

Backup Service provides end-to-end data protection with several key capabilities: 

Feature 

What it Provides 

Pricing models 

Standard pay-as-you-go charges per GB of backup storage; Advanced packages add per-device fees for features like continuous data protection (CDP) and immutable storage. 

Backup targets 

Internal Acronis cloud (Berlin) or external S3-compatible IONOS Cloud Object Storage (choose your region). 

Encryption at rest 

AES-256 server-side encryption by default; optional client-side encryption with customer-managed keys. 

Encryption in transit 

TLS/HTTPS with Diffie-Hellman and RSA key exchange. 

Secure deletion 

NIST SP 800-88 Rev. 1 compliant erasure or physical destruction of media. 

Full and incremental backups 

User-defined retention policies, customizable compression levels. 

Pre- and post-script execution 

Run scripts before or after backups (e.g., database dumps, service stop/start). 

Restore options 

Full VM/device restore, file-level recovery, point-in-time recovery. 

High availability 

Storage volumes synchronously replicated across separate fire zones; 99.95% data center SLA. 

Advanced features 

Immutable storage, multi-factor authentication (MFA), extended detection and response (XDR), continuous data protection (CDP), patch management (available in Advanced and higher tiers). 

Backup traffic to the European Acronis infrastructure is whitelisted, meaning there are no egress charges for data transferred to the internal backup cloud. If you use IONOS Cloud Object Storage as a backup target, inbound traffic is free, and outbound traffic follows standard Object Storage pricing. 

### 4.3 Backup Service Use Cases

Backup Service is designed for a wide range of backup and recovery scenarios, including: 

- Enterprise backup strategy: Store nightly snapshots of production databases, VM images, or file systems in a highly durable, geo-redundant backup repository.

- Rapid restore: Retrieve any backup version instantly via the console or API, supporting recovery point objectives (RPO) and recovery time objectives (RTO).

- Regulatory compliance: Use immutable storage and lifecycle rules to automatically delete backups after a legally required retention period.

- Multi-platform protection: Protect Windows, Linux, macOS, iOS, Android, VMware, Hyper-V, dedicated servers, virtual servers, NAS devices (Synology), and Google Workspaces.

Backup Service simplifies data protection by handling provisioning, maintenance, and scaling, while giving you full control over backup schedules, retention policies, and recovery workflows. 

## 5. Choosing the Right Storage Service

Selecting the appropriate storage service depends on your workload&#x27;s access patterns, performance requirements, and whether you need shared or dedicated storage. The following decision framework will help you choose the right service for your needs. 

### 5.1 Storage Service Comparison

The table below compares the three primary storage services based on key characteristics: 

Storage Type 

What It Is 

Typical Access Pattern 

Ideal Workloads 

Key Strengths 

When to Prefer It 

Block Storage 

Raw virtual disks presented as block devices (e.g., /dev/sdx). Managed, double-redundant, SSD/HDD, encrypted at rest. 

Random-access reads/writes, low-latency I/O, file-system-level control. 

Databases, VM system disks, high-performance applications, stateful services needing consistent low-latency block I/O. 

Very high IOPS/throughput (up to 24,000 IOPS per 4 TiB SSD Standard); encryption at rest and secure deletion; active-active redundancy across two storage servers. 

You need a mountable disk that the OS will format (ext4, XFS, NTFS, etc.); your application expects block-level semantics (e.g., PostgreSQL, MySQL, VM boot disks). 

Object Storage 

Flat namespace of objects (data + metadata) addressed by a unique key inside a bucket. Access via HTTP(S) APIs (S3, REST, SDKs). 

Write-once / read-many, sequential or bulk transfers; no POSIX file system semantics. 

Backup and archive, static website assets, media libraries, big data / analytics datasets, software distribution, log retention, artifact storage, any unstructured data addressed by a key. 

Unlimited scalability, virtually infinite capacity; built-in durability via erasure coding and replication; lifecycle rules, versioning, Object Lock (WORM) for compliance; accessible from anywhere over HTTPS. 

You do not need a traditional file system or block-level random I/O; data is largely static or append-only (logs, backups, media); you want cost-effective, highly durable, globally reachable storage. 

Network File Storage 

Managed, POSIX-compliant shared file system exported via NFSv4.2. Internally built on SSD Standard block storage but presented as a file service. 

File-level operations (open, read, write, rename, lock) over a network share; multiple VMs can mount the same share concurrently. 

Home directories, shared application data, web content served by several web servers, collaborative workspaces, small-to-medium databases on NFS, any workload needing a common file hierarchy. 

Shared, concurrent access with POSIX permissions; high-performance SSD backend (300 MiB/s per 4 TiB, 24,000 IOPS); encryption at rest; managed, no-hardware maintenance. 

You need a shared filesystem that multiple VMs can read/write simultaneously; applications rely on file-level semantics (e.g., NFS-based CMS, shared home directories, container image caches); you want the simplicity of a mount point rather than managing a block device. 

### 5.2 Decision Flow

Use the following decision flow to determine which storage service best fits your workload: 

- Do you need a mountable disk that the OS will format and treat as a local drive?

Yes - Use Block Storage. It is ideal for database data files, VM OS disks, or any workload that requires low-latency random I/O.

- Do you need many VMs to see the same directory tree with POSIX permissions?

Yes - Use Network File Storage. It provides an NFS share that can be mounted on several instances at once (home directories, shared web content, collaborative folders).

- Is the data unstructured, static or append-only, and you mainly access it via key-based APIs?

Yes - Use Object Storage. It is ideal for backups, static website hosting, media assets, logs, large datasets, software distribution, etc.

- If more than one of the above applies, combine services:

Store a database on Block Storage but keep daily backups in Object Storage (via snapshots or third-party backup tools).

- Host a web application&#x27;s dynamic data on Block Storage, serve static assets via Object Storage, and keep shared configuration files on Network File Storage.

### 5.3 Performance Considerations

When choosing between HDD and SSD for Block Storage , consider the following performance characteristics: 

Characteristic 

HDD 

SSD Standard 

SSD Premium 

Sequential throughput 

200 MiB/s (fixed for any volume size) 

0.5 MiB/s per GiB (capped at 300 MiB/s per volume) 

1 MiB/s per GiB (capped at 600 MiB/s per volume) 

Random read IOPS 

1,100 IOPS @ 4 KiB (fixed) 

40 IOPS per GiB (max 24,000 IOPS per volume) 

75 IOPS per GiB (max 45,000 IOPS per volume) 

Random write IOPS 

Included in 1,100 IOPS 

30 IOPS per GiB (max 18,000 IOPS per volume) 

50 IOPS per GiB (max 30,000 IOPS per volume) 

Performance scaling 

Static (does not change with volume size) 

Size-dependent (scales linearly with GB until caps) 

Size-dependent (scales linearly with GB until caps) 

Typical use cases 

Backups, archives, cold storage 

General-purpose databases, applications, VM disks 

High-performance databases, mission-critical apps 

HDD provides consistent, moderate performance regardless of volume size, making it cost-effective for non-performance-critical workloads. SSD performance grows with volume size, so a 100 GiB SSD Standard volume delivers 50 MiB/s and 4,000 read IOPS, while a 500 GiB volume delivers 250 MiB/s and 20,000 read IOPS. SSD Premium roughly doubles the performance of SSD Standard, at approximately twice the price per GB. 

## Common Use Cases

Real-world scenarios where IONOS storage services are used: 

- E-commerce Platform with Multi-Tier Storage: An online retailer runs its PostgreSQL product database on SSD Premium Block Storage for maximum transaction performance (as discussed in Section 1.2). Static product images and downloadable PDFs are stored in IONOS Cloud Object Storage, which serves them directly to the website via HTTPS (Section 2.2). Configuration files and shared session data are kept on Network File Storage, mounted by all front-end web servers (Section 3.3). Nightly database backups are sent to Object Storage using Backup Service (Section 4.2), leveraging lifecycle rules to delete backups older than 90 days.

- Media Production Company with Shared Asset Repository: A video production studio uses Network File Storage to create a centralized repository of raw footage, project files, and final renders (Section 3.1). Multiple editors mount the NFS share simultaneously, allowing collaborative editing workflows with full POSIX permissions (Section 3.2). Completed videos are published to IONOS Cloud Object Storage for distribution via pre-signed URLs (Section 2.3), and long-term archival copies are stored on HDD Block Storage volumes attached to dedicated archive VMs (Section 1.2).

- SaaS Application with Disaster Recovery Strategy: A SaaS provider runs application VMs with SSD Standard Block Storage for the operating system and application binaries (Section 1.1). User-uploaded files are stored in IONOS Cloud Object Storage with versioning enabled, protecting against accidental deletions (Section 2.3). The company uses Backup Service to create daily snapshots of all VMs, storing them in Object Storage in a different region for geographic redundancy (Section 4.1). The storage decision flow (Section 5.2) guided the architecture: Block Storage for low-latency disk I/O, Object Storage for durable file storage and backups, and Backup Service for centralized recovery management.

## Summary

IONOS Cloud offers a comprehensive portfolio of storage services designed to meet diverse workload requirements. Block Storage provides high-performance, dual-redundant virtual disks in HDD, SSD Standard, and SSD Premium configurations, ideal for databases, VM boot disks, and applications requiring low-latency block-level I/O. IONOS Cloud Object Storage delivers S3-compatible, scalable storage for unstructured data, backups, static website hosting, and multimedia distribution, with features like versioning, lifecycle management, and object locking. Network File Storage offers a managed, POSIX-compliant NFS service for shared file access across multiple VMs, supporting home directories, shared application data, and web content repositories. Backup Service provides centralized, managed backup and recovery for all your workloads, with flexible storage targets and advanced features like immutable storage and continuous data protection. 

Choosing the right storage service depends on your workload&#x27;s access patterns, performance needs, and whether you require shared or dedicated storage. Block Storage is best when you need mountable disks with block-level semantics. Network File Storage is ideal when multiple VMs need concurrent access to a shared file system. Object Storage excels at storing large volumes of static or append-only data accessible via HTTP(S) APIs. Many architectures combine multiple storage types to balance performance, cost, and durability. 

Key Points: 

- Block Storage delivers high-performance virtual disks with HDD, SSD Standard, and SSD Premium options, dual redundancy, and encryption at rest

- IONOS Cloud Object Storage is an S3-compatible service ideal for backups, static content, media hosting, and unstructured data with virtually unlimited scalability

- Network File Storage provides managed, NFSv4.2-based shared file systems with POSIX compliance, supporting concurrent access from multiple VMs

- Backup Service offers centralized, managed backup and recovery with flexible storage targets, encryption, and advanced features like immutable storage

- SSD performance scales linearly with volume size, while HDD provides fixed performance suitable for non-critical workloads

- Use Block Storage for databases and VM disks, Object Storage for backups and static content, and Network File Storage for shared file access

Important Terminology: 

- Block Storage: Managed storage service that presents data as raw block devices, formatted with customer-chosen file systems

- Dual-redundant: Data written synchronously to two separate storage servers, ensuring availability even during hardware failures

- IONOS Cloud Object Storage: S3-compatible storage service organizing data into buckets and objects, accessed via HTTP(S) APIs

- Network File Storage (NFS): Managed, POSIX-compliant shared file system service accessible over NFSv4.2 protocol

- IOPS (Input/Output Operations Per Second): Measurement of storage performance for random read and write operations

- Backup Service: Managed backup and recovery solution powered by Acronis, supporting multiple platforms and storage targets

## Next Steps

Continue Learning: Unit 2.4: Networking Services 

Related Topics: 

- Unit 2.2: Compute Services

- Unit 2.5: Database and Data Services

Mark as Complete 

Previous

2.2 Compute Services 

Next

2.4 Networking Services


--- FILE: unit-2.4-networking-services.html ---

16 min read

## Learning Objectives

By the end of this module, you will be able to: 

- Explain the differences between Managed Application Load Balancer and Managed Network Load Balancer and when to use each

- Describe the purpose of Managed NAT Gateway and VPN Gateway in cloud networking

- Identify when to use Cross Connect for connecting Virtual Data Centers

- Explain the benefits of Cloud DNS and IPv6 configuration in IONOS Cloud

# Unit 2.4: Networking Services

## Introduction

Think of networking services as the postal system of your cloud infrastructure. Just as mail needs to be sorted, routed, and delivered securely to the right addresses, your cloud applications need traffic distribution, secure connections, and efficient routing between services. IONOS Cloud provides a comprehensive suite of networking services that handle everything from distributing traffic across multiple servers to connecting your cloud resources securely to on-premises systems. 

In this unit, you will explore the key networking services that power IONOS Cloud infrastructure. Whether you need to balance traffic across multiple servers, provide secure internet access to private resources, or connect different parts of your infrastructure, understanding these services will help you design robust, scalable network architectures. 

## 1. Load Balancing Services

Load balancing is the practice of distributing incoming network traffic across multiple servers to ensure no single server becomes overwhelmed. IONOS Cloud offers two types of load balancers, each designed for different scenarios and operating at different layers of the network stack. 

### 1.1 Managed Application Load Balancer (ALB)

The Managed Application Load Balancer operates at Layer 7 of the OSI model (the application layer), which means it can make intelligent routing decisions based on HTTP/HTTPS traffic content. When a request arrives at an ALB, it examines the HTTP attributes and forwards the request to the appropriate backend servers (called Target Groups) based on user-defined policies. 

Key Characteristics: 

The ALB supports advanced routing capabilities that go far beyond simple traffic distribution. You can route requests based on HTTP method, headers, hostname, URL path, or query string parameters. This makes it ideal for microservices architectures where different services handle different parts of your application. The ALB can also return fixed responses or redirect traffic to another host without involving any backend server, which is useful for maintenance pages or URL redirects. 

Health checks are built into the ALB, continuously probing registered targets to ensure only healthy servers receive traffic. This improves overall reliability and makes your architecture highly available. The service also supports both public load balancing (exposed to the internet) and private load balancing (internal traffic within your data center). 

When to Use ALB: 

Choose the Managed Application Load Balancer when you need application-layer intelligence such as URL-based routing, cookie-based session stickiness, HTTP redirects, or TLS termination. It is typical for web applications, SaaS front-ends, container or Kubernetes ingress controllers, and API services where content-aware routing is required. 

### 1.2 Managed Network Load Balancer (NLB)

The Managed Network Load Balancer operates at Layer 4 of the OSI model (the transport layer), working with raw TCP traffic. Unlike the ALB, the NLB does not inspect HTTP content. Instead, it simply forwards TCP packets to backend servers based on IP address and port, making it lighter weight and capable of handling higher throughput with lower latency. 

Key Characteristics: 

The NLB provides multiple Layer 4 load-balancing algorithms including Round Robin, Least Connection, Random, and Source IP. It can handle both public (internet-facing) and private (internal) traffic. Because the NLB does not terminate TLS, it can pass encrypted traffic unchanged to the backend, enabling end-to-end encryption. This makes it suitable for applications that require the backend to handle TLS directly. 

The NLB is designed for high performance, offering the lowest latency and highest connection-per-second capacity. Health checks are TCP-based (connection-oriented) rather than HTTP-based, ensuring backend servers are reachable at the network level. 

When to Use NLB: 

Choose the Managed Network Load Balancer when you need raw, high-performance TCP forwarding with no HTTP parsing, want to preserve TLS encryption all the way to the backend, or are balancing non-HTTP services such as databases, SSH, custom protocols, or high-throughput data pipelines. 

### 1.3 Choosing Between ALB and NLB

The following table summarizes the core differences to help you decide which load balancer fits your needs: 

Feature 

ALB (Layer 7) 

NLB (Layer 4) 

Protocol support 

HTTP/HTTPS only (ports 1-65535) 

TCP (ports 1-65535) 

Routing logic 

Host, path, method, header, query string, fixed response, redirects 

Simple IP/port forwarding, Layer 4 algorithms (Round Robin, Least Connection, Random, Source IP) 

TLS handling 

Terminates TLS at the listener (no end-to-end encryption by default) 

No TLS termination; traffic passes unchanged (end-to-end encryption possible) 

Health checks 

HTTP health checks 

TCP health checks (connection-based) 

Performance 

Slightly higher latency due to HTTP inspection 

Highest throughput, lowest latency 

Use case examples 

Web applications, microservices, API gateways, content-based routing 

Database proxies, SSH bastion, VPN, high-speed data pipelines 

### 1.4 Business Benefits of Load Balancing

Both load balancers provide critical business benefits. They improve scalability by distributing traffic across multiple compute resources, allowing you to add or remove servers without service interruption. They enhance reliability through health checks that ensure traffic only goes to healthy instances, eliminating single points of failure. High availability is built-in, with automatic failover if a component fails or during maintenance. 

Load balancers also enable zero-downtime deployments. Because traffic can be shifted away from instances being patched or upgraded, you can apply updates without taking your application offline. As fully managed services, they eliminate the need to provision, patch, or scale load balancer hardware or software yourself. 

## 2. Gateway Services

Gateway services provide controlled access between your cloud resources and external networks, whether that is the public internet, your on-premises data center, or other cloud environments. These managed services are available in the Public Cloud and enable secure connectivity for resources on private LANs. 

### 2.1 Managed NAT Gateway

A Network Address Translation (NAT) Gateway sits between a private network and the public internet, translating private IP addresses to public IP addresses when private resources initiate outbound connections. Crucially, it only allows outbound traffic; it does not permit unsolicited inbound connections from reaching your private resources. 

What It Provides: 

The Managed NAT Gateway performs Source NAT (SNAT), allowing VMs on private networks to reach the internet (for example, to download software updates, sync time with NTP servers, or push backups to cloud storage) without requiring each VM to have its own public IP address. All outbound traffic from attached private LANs is translated to one (or a few) public IP addresses. 

As a fully managed service, IONOS operates, patches, and updates the NAT Gateway. It is highly scalable to meet growing traffic demands and deployed across multiple availability zones for high availability and fault tolerance. You can attach up to six private networks per gateway and configure custom SNAT rules to control exactly which traffic is allowed outbound. 

When to Use NAT Gateway: 

Use the Managed NAT Gateway when your workload only needs outbound internet access and should never be reachable from the internet. This improves security by reducing the attack surface (VMs remain hidden from external threats) and simplifies your network architecture. It is ideal for application VMs that need to download patches, access external APIs, or push backups but do not serve web traffic directly. 

Benefits: 

The NAT Gateway improves security by ensuring VMs are not directly reachable from the internet. It simplifies architecture by replacing many individual public network interfaces with a single gateway and reduces costs by requiring only a single public IP address. You gain operational ease because IONOS handles all software updates, patches, and high-availability provisioning. 

### 2.2 VPN Gateway

A VPN Gateway creates encrypted, site-to-site connections over the public internet, linking your on-premises network, branch offices, or other cloud environments to IONOS Virtual Data Centers. It uses IPSec or WireGuard protocols to establish secure tunnels that protect data in transit. 

What It Provides: 

The VPN Gateway is a fully managed service that runs in a virtual data center and is assigned a public IPv4 address. It supports both IPSec (IKEv2) and WireGuard protocols, which can be used simultaneously. You can choose from three tiers (Standard, Enhanced, Premium) that support increasing numbers of LANs and tunnels/peers. Each tier can optionally include high availability (active-passive VM pair) for automatic tunnel failover. 

The gateway supports static routing only (no BGP) and can handle both IPv4 and IPv6 traffic, though tunnel endpoints and gateway IPs are IPv4 only. Performance scales up to 1 Gbps per tunnel, and the Premium tier supports up to 30 tunnels or peers. 

When to Use VPN Gateway: 

Use the VPN Gateway when you need encrypted, bidirectional connectivity between IONOS and external networks that are not in the same IONOS region. Typical use cases include hybrid-cloud connectivity to an on-premises data center, multi-cloud interconnects (linking IONOS with AWS, Azure, or other providers), disaster-recovery and migration scenarios, hub-and-spoke or mesh network topologies, and secure remote access for employees. 

Benefits: 

The VPN Gateway provides strong encryption (AES-256, SHA-256/384/512) to protect data in motion, meeting regulatory and compliance requirements. It simplifies operations as a fully managed service that handles patching and updates. High availability options minimize downtime for critical workloads. The service offers flexibility in protocol choice: IPSec for broad compatibility or WireGuard for lower latency and higher throughput. 

## 3. Connecting Virtual Data Centers

IONOS Cloud provides Cross Connect , a feature that creates private LAN-based links between multiple Virtual Data Centers in the same geographic region and contract. 

### 3.1 What is Cross Connect?

Cross Connect is an internal networking feature that connects VDCs using IONOS&#x27;s private backbone infrastructure. Traffic between connected VDCs never leaves the IONOS network, eliminating public internet hops and providing low-latency, high-bandwidth connectivity comparable to a local network interface card (NIC). 

How It Works: 

Cross Connect establishes a private LAN connection between VDCs that belong to the same contract and are located in the same IONOS region. This constraint ensures data sovereignty and compliance by keeping traffic within the chosen geographic jurisdiction. The connection is transparent to your workloads; VMs in different VDCs can communicate as if they were on the same local network. 

### 3.2 When to Use Cross Connect

Cross Connect is designed for specific scenarios where you need fast, reliable communication between VDCs in the same region: 

Resource Sharing: You can centralize services such as firewalls, VPN gateways, DNS servers, or databases in one VDC and have other VDCs connect to them securely without duplicating infrastructure. 

Organizational Separation: Different VDCs can be used for separate billing units, teams, or projects while still allowing controlled data exchange through the private link. 

Disaster Recovery and Backup: Fast replication between VDCs in the same region supports business continuity strategies. The low-latency, high-bandwidth connection makes it practical to maintain synchronized backup copies of critical data. 

Scaling Infrastructure: As your infrastructure grows, you can add new VDCs and attach them to the existing Cross Connect, providing a scalable network fabric without additional networking overhead. 

### 3.3 Benefits of Cross Connect

Cross Connect offers several important advantages. It provides reduced latency and higher throughput because traffic stays on a private LAN, avoiding public internet congestion. Reliability is enhanced because private links are less prone to network spikes and congestion. 

Security and compliance are strengthened because data never leaves the IONOS private network, helping meet regulatory requirements. Cost efficiency is achieved by sharing central resources instead of replicating them in each VDC. The service supports scalability and flexibility, allowing you to add or remove VDCs without re-architecting your network. Cross Connect is also provided at no additional charge (both legacy and upgraded versions are free). 

## 4. DNS and IP Management

IONOS Cloud provides services for managing domain name resolution and modern IP addressing. 

### 4.1 Cloud DNS

Cloud DNS is a managed Domain Name System service that translates human-readable domain names (like example.com ) into IP addresses that computers use to locate services on the internet. As a fully managed service, IONOS handles the infrastructure, redundancy, and performance of your DNS resolution. 

Why Use Cloud DNS: 

Managing DNS manually requires maintaining multiple DNS servers for redundancy, configuring zone files correctly, and ensuring high availability. Cloud DNS eliminates this operational burden by providing a managed service with built-in reliability and global distribution. It simplifies DNS management while ensuring your domain names resolve quickly and reliably for users worldwide. 

When to Use Cloud DNS: 

Use Cloud DNS when you need to manage domain name resolution for web applications, APIs, or services hosted on IONOS Cloud. It is especially valuable for production workloads that require high availability and fast DNS resolution without the complexity of managing your own DNS servers. 

### 4.2 IPv6 Configuration

IPv6 (Internet Protocol version 6) is the newest internet protocol standard, using 128-bit addresses instead of the 32-bit addresses used by IPv4. This provides an almost limitless pool of unique addresses, solving the IPv4 address exhaustion problem. 

Why Use IPv6: 

IPv4 address space has been depleted due to the exponential growth of internet-connected devices. IPv6 ensures future-proof connectivity by providing enough addresses for billions of devices without network address translation or address sharing. It also brings operational advantages such as simplified network configuration through automatic static address assignment via DHCPv6. 

What IONOS Provides: 

IONOS Cloud supports IPv6-enabled LANs with automatic DHCPv6 address assignment. Each VDC is automatically allocated a /56 IPv6 prefix, and each LAN can receive a /64 prefix, ensuring unique, routable IPv6 space for every workload. You can configure static IPv6 addresses on network interfaces directly from the Data Center Designer or API. 

When to Use IPv6: 

Enable IPv6 when you need to support modern cloud-native or IoT workloads that expect IPv6 connectivity, when you want to avoid the complexities of NAT, or when you are planning for long-term infrastructure that will outlast IPv4 availability. 

## 5. Content Delivery and Connectivity

IONOS Cloud offers additional networking services for optimizing content delivery and establishing dedicated connectivity. 

### 5.1 Content Delivery Network (CDN)

A Content Delivery Network is a system of globally distributed edge servers that cache web content and applications close to end users. By serving requests from the nearest edge location, a CDN reduces the distance data must travel, lowering latency and improving load times. 

Key Benefits: 

CDNs provide reduced latency by delivering content from the nearest edge server, shortening round-trip time for users. They enhance availability by serving cached copies even when the origin server is unavailable. Scalability is improved by offloading cacheable traffic from the origin, allowing your infrastructure to handle higher traffic spikes without degradation. 

Security is strengthened through DDoS protection, web application firewall capabilities, and SSL/TLS encryption. CDNs also improve cost efficiency by reducing origin bandwidth usage and the need for over-provisioned infrastructure. 

When to Use CDN: 

Use a CDN for website performance optimization (static assets like images, CSS, and JavaScript), software distribution (delivering updates and patches globally), and API request optimization (caching API responses at the edge to reduce backend load). CDNs are especially valuable for applications with global user bases that require consistently fast performance regardless of geographic location. 

### 5.2 Cross Connect (Revisited in Connectivity Context)

In addition to connecting VDCs within the same region (covered in Section 3), Cross Connect plays a broader role in enterprise connectivity strategies. Organizations often use it as part of hybrid-cloud architectures where certain workloads remain in IONOS Cloud while others run on-premises or in other clouds. By centralizing shared services in one VDC and connecting others via Cross Connect , you can create hub-and-spoke topologies that simplify management and reduce costs. 

## Common Use Cases

Real-world scenarios where IONOS networking services are used: 

- E-Commerce Platform with Global Traffic: An online retailer uses Managed Application Load Balancer to distribute incoming HTTP traffic across multiple web server instances during seasonal sales. The ALB&#x27;s health checks ensure only healthy servers receive traffic, and advanced routing directs mobile app traffic to optimized backends. Cross Connect links the production VDC to a separate VDC hosting centralized logging and monitoring services (as covered in Section 3.1), while CDN edge servers cache product images and static assets globally to reduce latency for international customers.

- Hybrid Cloud Infrastructure with Secure Connectivity: A financial services company maintains sensitive customer databases on-premises while running analytics workloads in IONOS Cloud. They use VPN Gateway with IPSec tunnels (discussed in Section 2.2) to create encrypted, bidirectional connectivity between their on-premises data center and IONOS VDCs. Application servers in private subnets use Managed NAT Gateway (Section 2.1) for outbound internet access to download security updates without exposing themselves to inbound connections. IPv6 is enabled (Section 4.2) to future-proof their infrastructure as they plan a 5-year cloud migration strategy.

- Microservices Architecture with Internal Routing: A SaaS provider deploys microservices across multiple VDCs in the same region. They use Cross Connect (Section 3.1 and 3.2) to establish private, low-latency links between VDCs hosting different service tiers (frontend, backend, data processing). Managed Application Load Balancer routes API requests based on URL path and HTTP headers (Section 1.1), directing /api/users to the user service and /api/orders to the order service. Cloud DNS (Section 4.1) provides reliable domain name resolution for service discovery, while Managed Network Load Balancer (Section 1.2) handles high-throughput database connections that require Layer 4 performance.

## Summary

IONOS Cloud networking services provide the connectivity, security, and performance foundations your cloud infrastructure needs. Load balancers distribute traffic intelligently (ALB for application-layer routing, NLB for high-performance Layer 4 forwarding), gateways control access between networks (NAT Gateway for outbound-only internet access, VPN Gateway for encrypted site-to-site connections), and Cross Connect enables private, low-latency links between VDCs in the same region. 

Additional services such as Cloud DNS simplify domain name management, IPv6 Configuration future-proofs your infrastructure, and CDN improves content delivery performance globally. Understanding when to use each service allows you to design network architectures that are secure, scalable, and cost-effective. 

Key Points: 

- Managed Application Load Balancer operates at Layer 7 with advanced HTTP/HTTPS routing, ideal for web applications and microservices

- Managed Network Load Balancer operates at Layer 4 for high-performance TCP forwarding with lowest latency

- Managed NAT Gateway provides secure outbound-only internet access for private resources without exposing them to inbound connections

- VPN Gateway creates encrypted site-to-site tunnels for hybrid-cloud and multi-cloud connectivity

- Cross Connect establishes private LAN links between VDCs in the same region for low-latency, high-bandwidth communication

- IPv6 configuration solves address exhaustion and future-proofs infrastructure with automatic address assignment

Important Terminology: 

- Layer 7 Load Balancing: Application-layer load balancing that can inspect and route based on HTTP content (method, headers, URL, query strings)

- Layer 4 Load Balancing: Transport-layer load balancing that forwards TCP traffic based on IP address and port without inspecting content

- Source NAT (SNAT): Network address translation that rewrites the source IP address of outbound traffic, allowing private resources to access the internet through a shared public IP

- IPSec and WireGuard: VPN protocols for creating encrypted tunnels; IPSec offers broad compatibility, WireGuard provides lower latency and higher throughput

- Cross Connect: Private LAN-based link between VDCs in the same region and contract, providing low-latency connectivity without traversing the public internet

- CDN (Content Delivery Network): Globally distributed system of edge servers that cache content close to users to reduce latency and improve performance

## Next Steps

Continue Learning: Unit 2.5: Database and Data Services 

Related Topics: 

- Unit 2.1: Core Architectural Components

- Unit 2.6: Security, AI, and Container Services

- Unit 3.4: Activity Logs and Monitoring

Mark as Complete 

Previous

2.3 Storage Services 

Next

2.5 Database and Data Services


--- FILE: unit-2.5-databases.html ---

20 min read

## Learning Objectives

By the end of this module, you will be able to: 

- Explain what managed database services are and why organizations choose them over self-managed solutions

- Describe the key characteristics and use cases for Managed PostgreSQL, MongoDB, and MariaDB

- Identify when to use In-Memory DB for caching and real-time analytics

- Explain how Event Streams for Apache Kafka enables real-time data processing and IoT scenarios

# Unit 2.5: Database and Data Services

## Introduction

Imagine a busy restaurant kitchen where the chef focuses entirely on creating amazing dishes while a dedicated team handles equipment maintenance, ingredient inventory, and cleaning. The chef does not worry about fixing the ovens or ordering supplies because those responsibilities belong to specialists. Managed database services work the same way. They let your team focus on building great applications while IONOS handles the infrastructure, patching, backups, and maintenance. 

In this unit, you will explore IONOS Database-as-a-Service (DBaaS) offerings. You will learn about relational databases like Managed PostgreSQL and MariaDB for structured data, document databases like Managed MongoDB for flexible schemas, In-Memory DB for ultra-fast caching, and Event Streams for Apache Kafka for real-time event processing. Understanding these services helps you choose the right database for your application needs. 

## 1. Managed Databases Overview

Database-as-a-Service (DBaaS) delivers fully managed database engines that run on dedicated infrastructure inside your Virtual Data Center. IONOS handles provisioning, patching, backups, and high availability while you retain full control over your data and database configuration. 

### 1.1 What Makes a Database &quot;Managed&quot;

A managed database service takes responsibility for the entire database stack, from hardware and operating system to the database engine and ongoing maintenance. You provision a cluster through the Data Center Designer or API, and within minutes you have a production-ready database without installing software or configuring servers. 

Managed databases differ from self-managed deployments in several key ways. The cloud provider supplies the hardware, applies firmware and operating system patches, and manages database software updates. You avoid purchasing physical servers, racking equipment, and maintaining infrastructure. Databases come pre-configured with security best practices, automated backups, and high-availability features built in. Your team focuses on schema design, query optimization, and application development instead of routine operations. 

### 1.2 Benefits of Managed Database Services

The following table compares managed databases to self-managed deployments across critical operational areas: 

Area 

Managed DB Benefits 

Self-Managed Requirements 

Hardware &amp; Firmware 

Provider provisions, installs and maintains servers, drivers, and firmware automatically 

Purchase, rack, power, network-connect and patch physical machines manually 

Initial Setup 

Databases are pre-configured and ready to use on demand 

Install database software, tune parameters, configure replication and security 

Operations &amp; Staffing 

Staff focuses on application development instead of routine operations 

Requires DBAs or engineers to handle installs, patches, monitoring, and troubleshooting 

Patching &amp; Upgrades 

Regular patches applied automatically during maintenance windows 

Track security releases, schedule downtime, test upgrades, apply manually 

High Availability 

Built-in HA clusters with automatic fail-over and replication 

Design and implement your own replication topology and test fail-over procedures 

Backup &amp; Restore 

Daily automated backups with point-in-time recovery 

Deploy backup agents, schedule snapshots, manage retention, test restores 

Scalability 

Vertical and horizontal scaling via API or console 

Procure larger servers, add nodes, re-configure load balancers, migrate data 

Security 

TLS encryption, role-based access control, private-network connectivity 

Harden OS, manage certificates, configure firewalls and network segmentation 

Monitoring 

Integrated metrics, logs, alerts available in control panel or via API 

Install monitoring agents, build dashboards, maintain alerting pipelines 

Cost Model 

Pay-as-you-go per-minute billing for resources used 

Capital expense for hardware, over-provisioned capacity, long-term contracts 

Managed databases deliver speed and simplicity by providing production-ready environments in minutes. They offer reliability through automated high-availability configurations and vendor-supported patches. They improve operational efficiency by freeing your team from routine administration tasks. They provide financial flexibility through consumption-based pricing that scales with your actual usage. 

### 1.3 Common Managed Database Features

All IONOS managed database services share core capabilities that ensure enterprise-grade reliability and security. Every service runs on dedicated virtual machines with guaranteed CPU, RAM, and storage resources. Clusters deploy within private LANs in your Virtual Data Center, ensuring network isolation and security. 

High availability comes standard through multi-node clusters with automatic fail-over. If one node fails, the cluster automatically promotes a replica to maintain service continuity. Replication can be configured as asynchronous for best performance, synchronous for stronger consistency, or strict-synchronous for zero data loss. 

Security is built into every layer. All client connections use TLS encryption to protect data in transit. Role-based access control lets you define granular permissions for users and applications. Databases are reachable only through private networks, never exposed directly to the internet. Backups are encrypted and stored securely in IONOS Cloud Object Storage . 

Automated backups run daily and support point-in-time recovery, typically for up to one week. You can restore entire clusters or specific databases to any moment during the retention period. Maintenance windows allow you to schedule patches and upgrades at convenient times with minimal disruption. 

Monitoring and reporting are integrated into the Data Center Designer and available through APIs. You can track CPU usage, memory consumption, storage capacity, connection counts, and query performance. Metrics and logs help you optimize performance and troubleshoot issues before they impact users. 

## 2. Relational Database Services

Relational databases organize data into tables with defined schemas, enforce relationships through foreign keys, and support complex queries using SQL. IONOS offers two relational database engines: PostgreSQL and MariaDB . 

### 2.1 Managed PostgreSQL

Managed PostgreSQL delivers a fully compatible, enterprise-class PostgreSQL database as a managed service. PostgreSQL is known for its advanced features, extensibility, and support for both traditional relational data and modern JSON documents. It runs on dedicated clusters with configurable CPU, RAM, and storage inside your Virtual Data Center. 

PostgreSQL supports ACID transactions, ensuring data consistency and reliability for mission-critical applications. It provides advanced indexing options, full-text search, and powerful query optimization. You can use PostgreSQL extensions to add functionality like geospatial data support (PostGIS), advanced statistics, and cryptographic functions. The database handles both structured data in tables and semi-structured data stored as JSON or JSONB. 

Key capabilities include vertical scaling (add CPU, RAM, storage on the fly) and horizontal scaling (add replica instances for read traffic). High availability is achieved through multi-node clusters with configurable replication modes. Choose asynchronous replication for best performance, synchronous for guaranteed writes to at least one replica, or strict-synchronous for zero data loss commit guarantees. 

Monitoring exposes cluster metrics through the Data Center Designer, Telemetry API, and Monitoring Service with two-week retention. Automated backups combine continuous write-ahead log (WAL) archiving with daily base backups, enabling point-in-time recovery for up to one week. You can even clone clusters from existing backups for testing or development environments. 

### 2.2 Managed MariaDB

Managed MariaDB provides a MySQL-compatible relational database that originated as a community-driven fork of MySQL. It powers high-traffic services like Wikipedia and WordPress.com. MariaDB offers familiar MySQL syntax and behavior while adding enhancements for performance, storage engines, and analytics. 

MariaDB is fully ACID-compliant and supports triggers, stored procedures, and views. It includes multiple storage engines optimized for different workloads, from transactional InnoDB to column-store engines for analytics. Native support for JSON and GIS functions makes it suitable for applications that mix structured and semi-structured data. 

The service provides vertical scaling up to 16 cores and 32 GB RAM per node, with multi-node high-availability clusters for automatic fail-over. Each user has 250 connections and max_connections is set to 500. Storage is SSD-backed, the upper limit for Storage Size is 2 TB. 

A unique self-restore feature lets you restore specific backups or roll back to any point in time during the one-week retention period directly through the Data Center Designer or API. This capability reduces downtime and data loss risk without requiring support tickets. 

### 2.3 Choosing Between PostgreSQL and MariaDB

Both PostgreSQL and MariaDB are excellent relational databases, but they excel in different scenarios. Understanding when to use each helps you make the right choice for your application. 

Choose PostgreSQL when you need sophisticated features like advanced indexing, extensive extensions, or strict transactional consistency. PostgreSQL excels at complex analytical queries, applications that mix relational and JSON data, and workloads requiring synchronous replication with zero data loss. It is ideal for financial systems, ERP applications, and data warehousing where ACID guarantees and query flexibility are critical. 

Choose MariaDB when you have existing MySQL knowledge or applications, need a familiar MySQL-compatible syntax, or are building web applications and e-commerce platforms. MariaDB offers excellent performance for high-concurrency read-heavy workloads and provides strong GIS and JSON capabilities. It is well-suited for content management systems, SaaS platforms, and scenarios where MySQL compatibility simplifies migration. 

## 3. Document Database and NoSQL Services

Document databases store data as flexible JSON-like documents instead of fixed-schema tables. This flexibility makes them ideal for applications with rapidly evolving data models or highly variable data structures. 

### 3.1 Managed MongoDB

Managed MongoDB is IONOS&#x27;s fully managed service for the MongoDB document database. MongoDB stores data as BSON documents (binary JSON) in collections, allowing each document to have a different structure. This schema flexibility accelerates development by eliminating rigid schema migrations. 

MongoDB is offered in three editions to match different needs. Playground edition provides a free single-node cluster with 2 GB RAM, 1 vCPU, and 50 GB storage based on Cube VMs and NVMe storage for development and testing. Business edition offers pre-defined templates for production workloads with multi-instance clusters also based on Cube VMs and NVMe storage. Enterprise edition provides full control over node sizing using Dedicated Core VMs, SSD and HDD Block Storage , sharding configurations, and includes access to MongoDB&#x27;s professional support team in addition to IONOS support. 

Key capabilities include horizontal scaling through built-in sharding and replica sets. Sharding distributes data across multiple nodes to handle massive datasets and high write throughput. Replica sets provide high availability with automatic fail-over. MongoDB supports up to 51,200 connections per cluster, far exceeding relational database connection limits. 

NVMe storage is available in Business edition that is hosted on Cube VMs. SSD or HDD block storage is available in the Enterprise edition that is hosted on dedicated core VMs. Multi-instance clusters automatically replicate data across nodes, with the primary handling writes and secondaries serving reads. The service includes continuous log collection with 30-day retention and built-in metrics for CPU, memory, storage, connections, and cluster health. 

MongoDB is certified by MongoDB Inc. and fully compatible with standard MongoDB tools, drivers, and the mongo shell. You manage clusters through the Data Center Designer, API v6, or SDKs. Daily off-site snapshots are stored in Object Storage for up to seven days with point-in-time recovery support. 

### 3.2 When to Use MongoDB

MongoDB excels in scenarios where schema flexibility is valuable. Rapid development projects benefit from the ability to change document structure without database migrations. Content management systems, mobile application backends, and IoT platforms often have variable data structures that fit naturally into document models. 

High-write workloads leverage MongoDB&#x27;s horizontal scaling through sharding. Applications that generate massive volumes of data, such as click-stream analytics or user event tracking, can distribute writes across multiple shards for better performance. The document model also simplifies storing complex nested data structures that would require multiple tables and joins in relational databases. 

Use MongoDB when your application has evolving requirements and you need to add new fields or change data structures frequently. Choose it for multi-tenant SaaS applications where each tenant may have custom fields. Consider it for real-time analytics where schema flexibility and high connection counts are advantages. 

## 4. Specialized Database Services

Beyond traditional relational and document databases, IONOS offers specialized services for caching and event streaming. These services solve specific performance and architectural challenges. 

### 4.1 In-Memory DB

In-Memory DB is IONOS&#x27;s fully managed, Redis-compatible database service that stores all data in RAM for sub-millisecond access times. Unlike disk-based databases that read from storage, In-Memory DB serves data directly from memory, delivering performance thousands of times faster. 

The service is built on Redis, an open-source in-memory data structure server. It supports various data types including strings, hashes, lists, sets, sorted sets, bitmaps, hyperloglogs, geospatial indexes, and streams. This flexibility makes it useful beyond simple key-value caching. 

Persistence options let you balance speed with durability. Choose no persistence for pure caching where data can be rebuilt, RDB snapshots for periodic checkpoints, AOF (Append-Only File) logging for continuous write durability, or combine both for maximum protection. Persistence writes data to SSD so that clusters can recover after restarts. 

In-Memory DB provides vertical scaling (add CPU, RAM, storage) and horizontal scaling (add nodes). Storage capacity scales automatically based on RAM and the chosen persistence mode. High availability is achieved through multi-node clusters with asynchronous replication by default, with an optional semi-synchronous mode for stronger consistency. 

Security includes TLS-encrypted client connections, role-based access control, and private-network-only deployment. Each instance runs on dedicated Enterprise VMs and is reachable only via private LANs within your VDC. Resource limits include a maximum of 16 CPU cores, 32 GB RAM, 2 TB storage per instance, and up to 10 default instances per contract. 

### 4.2 In-Memory DB Use Cases

In-Memory DB excels as a database caching layer. Place it in front of your primary database to store frequently accessed data in RAM. This reduces the number of queries hitting your database, lowers latency, and improves overall application responsiveness. Caching is especially valuable for read-heavy workloads where the same data is accessed repeatedly by many users. 

Real-time analytics applications use In-Memory DB to process streaming data with sub-millisecond latency. Online advertising platforms, recommendation engines, and real-time dashboards require instant data access that disk-based storage cannot provide. In-Memory DB can aggregate large volumes of events in memory, perform calculations, and serve results to applications immediately. 

Session storage is another common use case. Web applications store user session data in In-Memory DB for fast access across multiple application servers. The in-memory storage ensures that session lookups do not slow down user interactions. Message brokering and leaderboards for gaming applications also benefit from the speed and data structure support that In-Memory DB provides. 

### 4.3 Event Streams for Apache Kafka

Event Streams for Apache Kafka is IONOS&#x27;s fully managed service for real-time event streaming and processing. Apache Kafka is a distributed streaming platform that acts as a high-throughput message broker and event log. Applications publish event streams to Kafka topics, and other applications subscribe to those topics to process events in real time. 

Kafka organizes data into topics, which are partitioned and replicated across multiple brokers for scalability and durability. Partitions allow parallel processing while maintaining message order within each partition. Replication ensures that data is not lost if a broker fails. Producers write events to topics, and consumers read events at their own pace, enabling flexible architectures. 

IONOS Event Streams provides five pre-defined cluster sizes from XS to XL, each with dedicated CPU, RAM, and SSD storage. You can scale clusters up or down as your throughput and storage needs change. High availability is built in through redundant nodes and automatic fail-over. You configure the replication factor to control how many copies of each partition exist across brokers. 

Security includes TLS-encrypted communication, strong authentication through TLS certificates, and fine-grained authorization controls. Clusters attach to private LANs for isolated network traffic between your applications and Kafka. You can adjust partitions, retention time, and retention size to match throughput and storage requirements. 

Management is available through the graphical Data Center Designer, APIs, and SDKs. You can create and configure clusters, topics, brokers, and permissions without deep Kafka expertise. The service handles the underlying infrastructure, patching, and monitoring, allowing your team to focus on building streaming applications. 

### 4.4 Event Streams Use Cases

Event Streams excels at real-time data processing at scale. E-commerce platforms ingest millions of transactions, inventory updates, and user interactions per day. Kafka handles this volume through partitioning and parallel processing. Stream processing frameworks like Kafka Streams, Apache Flink, or Spark read from Kafka topics, perform complex event processing, and write results to downstream systems like databases or dashboards. This enables real-time personalization, fraud detection, and operational analytics. 

IoT data management leverages Kafka to collect continuous streams from thousands of sensors. Smart city initiatives deploy Kafka clusters near edge locations to minimize latency. Sensors push telemetry into topics, and stream-processing jobs detect patterns, trigger alerts, and feed AI/ML pipelines. Log compaction keeps the latest state per device while retention policies manage historical data. This architecture enables real-time monitoring, anomaly detection, and predictive maintenance. 

Click-stream analytics for websites and mobile apps is another common use case. User interactions flow into Kafka topics where they can be analyzed in real time to personalize content, detect behavior patterns, and track business metrics. Financial services use Kafka for transaction processing, regulatory reporting, and market data feeds where low latency and guaranteed ordering are critical. 

## 5. Choosing the Right Database Service

Selecting the appropriate database service depends on your data model, consistency requirements, scalability needs, and performance expectations. Understanding the strengths of each option helps you match services to application requirements. 

### 5.1 Decision Framework

The following table compares IONOS database services across key characteristics: 

Feature / Consideration 

Managed PostgreSQL 

Managed MongoDB 

Managed MariaDB 

In-Memory DB 

Event Streams for Kafka 

Data Model 

Relational (SQL) with JSON and GIS 

Document (BSON/JSON) 

Relational (MySQL-compatible) 

Key-value with data structures 

Event log / Message stream 

Best For 

Complex transactions, ACID compliance, joins 

Flexible schemas, rapid development 

Web apps, MySQL migration 

Caching, real-time analytics 

Real-time event processing, IoT 

Scalability 

Vertical + horizontal (replicas) 

Vertical + horizontal (sharding + replicas) 

Vertical + horizontal (replicas) 

Vertical + horizontal 

Horizontal (partitions) 

Consistency 

Strong (strict-sync available) 

Eventual (configurable) 

Strong 

Eventual (configurable) 

Configurable per topic 

Latency 

Low (milliseconds) 

Low (milliseconds) 

Low (milliseconds) 

Ultra-low (sub-millisecond) 

Low (milliseconds) 

Storage Type 

SSD or HDD (up to 4 TB) 

NVMe (Business), SSD or HDD (Enterprise - up to 4 TB) 

SSD (up to 2 TB) 

RAM + SSD persistence 

SSD 

Use Cases 

Finance, ERP, data warehousing 

CMS, mobile backends, IoT 

Web apps, e-commerce, SaaS 

Session storage, real-time dashboards 

Streaming analytics, log aggregation 

Use relational databases ( PostgreSQL or MariaDB ) when you need strong transactional consistency, complex joins across multiple tables, and well-defined schemas. Choose document databases ( MongoDB ) when your data model evolves frequently or varies by record. Select In-Memory DB when you need caching or ultra-low latency access. Choose Event Streams when you need to process high-volume event streams in real time. 

### 5.2 Combining Database Services

Many applications use multiple database services together to meet different requirements. A common pattern pairs a relational database for transactional data with In-Memory DB for caching. The relational database ensures data integrity and supports complex queries, while the cache reduces load and improves response times. 

Another pattern combines a primary database with Event Streams for real-time processing. Application writes go to the database and are also published as events to Kafka. Stream processors consume events to update search indexes, trigger workflows, or feed analytics systems. This architecture enables event-driven microservices and real-time data pipelines without coupling systems directly. 

E-commerce platforms might use PostgreSQL for orders and inventory, MongoDB for product catalogs with variable attributes, In-Memory DB for shopping cart sessions, and Event Streams to process user activity and inventory updates in real time. Each service handles the workload it is best suited for, creating a flexible and performant architecture. 

## Common Use Cases

Real-world scenarios demonstrate how IONOS database services solve business challenges: 

- E-Commerce Platform with Multi-Database Architecture: An online retailer uses Managed PostgreSQL for order processing and financial transactions where ACID guarantees are critical (Section 2.1). Product catalogs with varying attributes like clothing sizes and electronics specifications are stored in Managed MongoDB for schema flexibility (Section 3.1). Customer shopping carts and session data live in In-Memory DB for instant access and minimal latency (Section 4.1). User click-streams flow through Event Streams for Apache Kafka to power real-time recommendations and inventory updates (Section 4.3). This combination matches each data type to the optimal database service.

- SaaS Application with Caching and High Availability: A multi-tenant SaaS platform runs Managed MariaDB for customer data with multi-node high-availability clusters ensuring zero downtime (Section 2.2). In-Memory DB caches frequently accessed tenant configurations and reduces database queries by 80%, improving response times from seconds to milliseconds (Section 4.2). Automated backups with point-in-time recovery protect against data loss, and self-restore capabilities let the team quickly recover from mistakes without contacting support. The private-network deployment ensures tenant data isolation and security.

- IoT Platform with Real-Time Analytics: A smart city initiative collects data from thousands of traffic sensors and environmental monitors. Event Streams for Apache Kafka ingests sensor telemetry with partitioning for parallel processing (Section 4.3). Stream-processing jobs analyze traffic patterns in real time and trigger alerts when anomalies are detected. Historical sensor data is stored in Managed MongoDB using time-series collections optimized for write-heavy workloads (Section 3.1). In-Memory DB maintains the latest sensor states for instant dashboard updates (Section 4.1). This architecture processes millions of events per hour while maintaining sub-second latency for operational decision-making.

## Summary

Database and data services are fundamental building blocks for cloud applications. IONOS provides fully managed database offerings that handle infrastructure provisioning, patching, backups, and high availability while you focus on application development and schema design. Managed services deliver faster time to market, lower operational overhead, and consumption-based pricing compared to self-managed deployments. 

Relational databases like Managed PostgreSQL and MariaDB provide strong consistency, ACID transactions, and SQL query capabilities for traditional applications requiring structured data and complex joins. Document databases like Managed MongoDB offer schema flexibility and horizontal scaling for modern applications with evolving requirements. Specialized services including In-Memory DB for caching and Event Streams for Apache Kafka enable real-time processing and ultra-low latency access patterns. 

Choosing the right database service requires understanding your data model, consistency needs, scalability requirements, and performance expectations. Many applications combine multiple services to leverage the strengths of each. Understanding these options helps you design architectures that are performant, reliable, and cost-effective. 

Key Points: 

- Managed database services handle infrastructure, patching, backups, and high availability automatically, freeing your team to focus on applications instead of operations

- Managed PostgreSQL and MariaDB provide relational SQL databases with ACID compliance, suitable for transactional workloads, financial systems, and data warehousing

- Managed MongoDB offers a document database with flexible schemas and horizontal scaling for content management, mobile backends, and rapidly evolving applications

- In-Memory DB delivers sub-millisecond latency through RAM-based storage, ideal for caching, session storage, and real-time analytics

- Event Streams for Apache Kafka enables high-throughput event streaming for real-time data processing, IoT telemetry, and event-driven architectures

- Choosing the right database service depends on data model (relational vs document vs key-value vs streaming), consistency requirements, and scalability needs

Important Terminology: 

- Database-as-a-Service (DBaaS): Fully managed database service where the provider handles infrastructure, maintenance, and operations

- ACID: Atomicity, Consistency, Isolation, Durability - properties that guarantee reliable database transactions

- Replication: Copying data across multiple database nodes to provide high availability and fault tolerance

- Point-in-Time Recovery (PITR): Ability to restore a database to any specific moment within the backup retention period

- Sharding: Distributing data across multiple database nodes to scale horizontally and handle larger datasets

- Document Database: NoSQL database that stores data as flexible JSON-like documents instead of fixed-schema tables

- In-Memory Database: Database that stores data in RAM for ultra-fast access with sub-millisecond latency

- Event Streaming: Continuous flow of event data through a distributed log system for real-time processing

## Next Steps

Continue Learning: Unit 2.6: Security, AI, and Container Services 

Related Topics: 

- Unit 2.3: Storage Services - Persistent data storage options that complement database services

- Unit 3.4: Activity Logs and Monitoring - Monitoring database performance and operations

Mark as Complete 

Previous

2.4 Networking Services 

Next

2.6 Security, AI, and Container Services


--- FILE: unit-2.6-security-ai-containers.html ---

17 min read

## Learning Objectives

By the end of this module, you will be able to: 

- Explain what Network Security Groups are and how they provide centralized firewall protection across your Virtual Data Centers

- Describe the purpose of Certificate Manager and SSH Key Manager in securing cloud resources

- Identify when to use AI Model Hub for pre-trained models versus AI Model Studio for custom model fine-tuning

- Compare Managed Kubernetes, Red Hat OpenShift, and SUSE Rancher Prime to understand when to use each container platform

- Understand when to use Private Container Registry

# Unit 2.6: Security, AI, and Container Services

## Introduction

Imagine building a modern city. You need security systems (traffic lights, surveillance), specialized services (hospitals, universities), and efficient transportation infrastructure (trains, highways). Your cloud environment requires similar specialized services beyond basic compute and storage. You need security tools to protect your resources, AI capabilities to add intelligence to applications, and container platforms to run modern microservices architectures. 

In this unit, you will explore three essential service categories that complement IONOS Cloud&#x27;s core infrastructure. We will cover security services that protect your network and manage credentials, AI services that bring machine learning capabilities to your applications, and container services that enable modern application deployment patterns. These services work together to provide a comprehensive cloud platform for diverse workloads. 

## 1. Network Security Services

IONOS Cloud provides security tools that help you control network access and protect against threats. Think of these as the security gates and guard systems for your digital infrastructure. 

### 1.1 Network Security Groups (NSGs)

Network Security Groups are IONOS Cloud&#x27;s virtual firewall building blocks for a Virtual Data Center (VDC). They act as centralized firewall policy managers that filter and control inbound (ingress) and outbound (egress) traffic for the resources they protect. Instead of managing individual firewall rules for each virtual machine individually, NSG can be used to apply rules to a group of VMs, thus enhancing efficiency when deploying many virtual machines that would have a similar set of firewalling rule requirements. 

How NSGs work: 

- NSGs can be attached to Network Interface Cards (NICs) or entire Virtual Machines (VMs)

- When a VM is a member of an NSG, all of its NICs automatically inherit the group&#x27;s rules

- They contain a set of security rules based on source/destination IPs, ports, and protocols

- Any traffic not explicitly allowed by a rule is automatically denied (default-deny approach)

NSG types: 

Type 

Purpose 

Application 

Default NSG 

Automatically created for each VDC 

Applied to all new VMs unless you specify otherwise, provides baseline protection 

Custom NSG 

Created for specific security requirements 

Attached to individual VMs or NICs for fine-grained control 

When to use Network Security Groups: 

You should use NSGs whenever you need centralized firewall management across your VDC. They are particularly valuable when you want to control both inbound and outbound traffic at the VM or NIC level, require fine-grained access control for specific workloads, or need to quickly adapt security as your business or threat landscape changes. NSGs help you avoid duplicated firewall configurations by letting you attach the same security policy to multiple resources. 

Key security benefits: 

- Stateful virtual firewall that tracks connections and automatically allows return traffic

- Centralized policy management in one place for an entire VDC

- Fine-grained, per-resource control for precise rule application

- Default protection with minimal effort for all new VMs

- Streamlined management and compliance with easier auditing

### 1.2 DDoS Protect

DDoS protection in IONOS Cloud is a managed defense service that safeguards your resources against Distributed Denial-of-Service attacks. When an attack is detected, traffic is redirected to IONOS&#x27;s filtering and scrubbing platform. Malicious packets are removed and only genuine traffic is forwarded to the original destination, keeping your applications available even under heavy attack. 

Protection scope: 

DDoS Protect defends against Layer 3 and Layer 4 attacks (such as UDP floods, SYN floods, and other volumetric and protocol-based attacks) for every resource in all IONOS data centers. This network-level protection ensures that your infrastructure remains accessible during attacks. 

Available packages: 

Package 

Protection Level 

Features 

DDoS Protect Basic 

Automatic, always-on 

Enabled for all users, no configuration required. Provides detection, automatic containment, and traffic filtering for common volumetric and protocol attacks 

DDoS Protect Advanced 

Enhanced, proactive 

Includes everything in Basic plus 24/7 expert support, proactive monitoring, and on-demand IP-specific filtering or attack diagnostics 

The service is cloud-native and always-on, filtering out malicious traffic at the network level without requiring manual intervention. This ensures continuous availability of your workloads during DDoS attacks. 

## 2. Credential and Certificate Management

Managing access credentials and security certificates across cloud resources can become complex as your infrastructure grows. IONOS Cloud provides dedicated services to simplify these critical security tasks. 

### 2.1 Certificate Manager

Certificate Manager is IONOS&#x27;s dedicated service for handling SSL/TLS certificates across your cloud resources. It simplifies the entire lifecycle of certificates (obtaining, installing, renewing, and revoking) so that web traffic and data exchanged between users and your servers stay encrypted and trusted. 

What Certificate Manager does: 

- Imports and manages self-managed certificates (including the certificate chain and private key) for use with Application Load Balancers (ALBs) when terminating HTTPS traffic.

- Provides auto-renewable certificates via ACME providers such as Let&#x27;s Encrypt, DigiCert, Sectigo, GlobalSign, and ZeroSSL

- Auto-renewed certificates can be used with CDN and API Gateway services, along with the Application Load Balancer

- Serves as the central hub for securely provisioning and maintaining TLS certificates

Why use Certificate Manager: 

Instead of manually generating, tracking, and renewing certificates across multiple servers, Certificate Manager centralizes this process. You avoid expired certificates that break HTTPS connections, reduce manual effort in certificate renewal, and ensure consistent security across all your web-facing services. The service is generally available, independent of data center location, and works with IONOS Public Cloud resources. 

### 2.2 SSH Key Manager

SSH key management in IONOS Cloud is the centralized handling of public SSH keys used to grant secure, password-less access to Linux-based virtual machines and other compute resources. 

How SSH Key Manager works: 

The Data Center Designer provides an SSH Keys view where you can store up to 100 public SSH keys. This eliminates the need to copy and paste a key each time you configure access to a new VM. The service supports both saved keys and ad-hoc SSH keys for Dedicated Core servers, vCPU servers, and Cubes . 

Key lifecycle actions: 

- Add keys by pasting text or uploading a key file

- Edit existing keys to update descriptions

- Set a default key that is pre-selected when configuring SSH access

- Delete keys when they are no longer needed

Why SSH key management matters: 

SSH keys replace passwords with stronger, cryptographic authentication for remote logins. Storing keys centrally simplifies VM provisioning. When you create a Linux VM, you can select any stored key from the SSH Keys setting and the key is automatically injected into the VM&#x27;s image, enabling immediate SSH access without manual key distribution. 

Typical workflow: 

- Generate a key pair locally using tools like ssh-keygen

- Add the public key to the DCD by pasting or uploading it

- Optionally set it as default for easier selection

- Associate the key with a VM during creation

- Connect to the VM using the corresponding private key

## 3. Artificial Intelligence Services

IONOS Cloud provides two complementary AI services that bring machine learning capabilities to your applications without requiring you to manage GPU infrastructure or become a machine learning expert. 

### 3.1 AI Model Hub

AI Model Hub is IONOS&#x27;s inference service that provides a catalog of pre-trained foundation models ready to be used directly through REST APIs. These models have already been trained on large public datasets by their original developers, and you can use them immediately for inference without training or fine-tuning. 

Types of pre-trained models available: 

Category 

Example Models 

Primary Use Case 

Large Language Models (text to text) 

Mistral Nemo 12B, Llama 3.1 8B, GPT-OSS 120B, Llama 3.1 405B 

Text generation, chat, code assistance 

Embedding Models (text to vector) 

BGE Large v1.5, BGE m3, Paraphrase Multilingual MPNet v2 

Semantic search, similarity, clustering 

Text-to-Image Models (text to image) 

FLUX.1-schnell, Stable Diffusion XL 

Image creation from prompts 

Specialized Models (coding) 

Code Llama 13B 

Code generation and assistance 

When to use AI Model Hub: 

You should use AI Model Hub whenever you need advanced AI capabilities (text generation, image creation, embeddings, semantic search) without the operational burden of hardware, model training, or compliance work. The service is particularly valuable for text generation and chatbots, image generation for marketing or design, document collections with semantic search, and Retrieval-Augmented Generation (RAG) where LLM answers are grounded in your own documents. 

Key benefits: 

- Managed hosting with no servers or GPU clusters to maintain

- Security and compliance with data staying in Germany, GDPR-aligned

- Scalability that auto-adjusts to meet request volume

- Unified, OpenAI-compatible API for easy integration

- Token-based billing that provides transparent, usage-driven pricing

All models are exposed through a single API, and you can switch models on the fly without redeploying infrastructure. The service includes document collections management, RAG endpoints, and tool-calling capabilities for automation. 

### 3.2 AI Model Studio

AI Model Studio is IONOS&#x27;s fully-managed web platform that lets you fine-tune pre-trained foundation models with your own data and then use the resulting custom model for inference. While AI Model Hub provides ready-to-use models, AI Model Studio enables you to customize models for your specific domain or use case. 

What AI Model Studio provides: 

Capability 

Description 

Fine-tuning workflow 

Continue training a base model on use-case-specific input-output pairs using efficient Low-Rank Adapter (LoRA) technique 

Dataset management 

Create, upload, or generate synthetic datasets for training 

Training configuration 

Set model name, base model, learning rate, batch size, epochs, and other parameters 

Job monitoring 

Run fine-tuning jobs and monitor their progress and status 

Model testing 

Test the fine-tuned model via built-in Playground or through REST API 

The service uses the LoRA technique, which freezes the original model weights and adds small trainable matrices, so only a few parameters need to be updated. This makes fine-tuning more efficient and accessible. 

Supported models: 

Currently, AI Model Studio offers smaller-to-medium sized text and multimodal models (such as Qwen3 0.6B, Qwen3 1.7B, Qwen2-VL 2B, Granite 3.3 Micro) that can be fine-tuned. The service is designed for creating domain-specific models that understand your industry&#x27;s terminology, business processes, or specialized knowledge. 

Data handling: 

All data stays within IONOS&#x27;s German data centers, complying with GDPR and providing full data privacy, security, and sovereignty. The service is currently offered as a free beta in the German market and can be accessed via the AI Model Studio web UI. 

When to use AI Model Studio: 

Use AI Model Studio when you need a model that understands your specific domain, industry terminology, or business processes better than a general-purpose model. For example, a healthcare provider might fine-tune a model on medical records and terminology, or a legal firm might train a model on case law and contracts. The resulting custom model can then be deployed for inference through API calls. 

## 4. Container Services

Container technology has become the standard way to package and run modern applications. IONOS Cloud provides managed container services that handle the complexity of running containerized workloads at scale. 

### 4.1 Managed Kubernetes

Managed Kubernetes is IONOS&#x27;s fully-automated service for running production-ready Kubernetes clusters without the operational overhead of managing the control plane and underlying infrastructure yourself. 

Key benefits of Managed Kubernetes: 

Benefit 

What It Means 

Value to You 

Fully-automated cluster provisioning 

The service creates the control plane and worker nodes automatically 

No manual VM or networking setup required 

Automatic updates and security patches 

IONOS applies Kubernetes version upgrades and security fixes 

No intervention needed to stay current and secure 

High-availability control plane 

Control plane runs across multiple VMs in a region 

Built-in fault tolerance and continuous operation 

Full administrator access 

Complete control over Kubernetes API 

Retain control over workloads while IONOS manages infrastructure 

Pay-as-you-go compute 

Worker nodes billed only for resources used 

Cost-effective, no hidden admin overhead 

Node-pool abstraction 

Resources grouped into node pools 

Simple, consistent scaling and resource allocation 

Built on vanilla Kubernetes 

Standard open-source Kubernetes 

Maximum compatibility with ecosystem tools 

Integrated monitoring 

Kubernetes Manager shows status and provides kubeconfig 

Easy visibility into cluster health 

Managed vs Self-Managed Kubernetes: 

The primary difference between managed and self-managed Kubernetes is who is responsible for the control plane, updates, and infrastructure management. With Managed Kubernetes, IONOS handles cluster provisioning, control plane management (including geo-redundant high availability), security patches, scaling, and node lifecycle. You focus on container workloads, CI/CD pipelines, and application scaling. 

With self-managed Kubernetes, you must install control plane components, handle HA architecture, apply security patches, manage VM lifecycle, and design backup strategies. While self-managed gives you full control over every component, it requires significant expertise and resources to maintain properly. 

When to use Managed Kubernetes: 

Choose Managed Kubernetes when your priority is rapid time-to-value, reduced operational overhead, and a reliable, automatically updated control plane. It is ideal for development teams that want to focus on building applications rather than managing infrastructure, organizations that need production-ready Kubernetes without dedicated platform engineering teams, and scenarios where you need to scale container workloads quickly without infrastructure concerns. 

Self-managed Kubernetes may be justified only if you need deep customization of the control plane or must run Kubernetes on infrastructure you control yourself, though you will need the expertise and resources to maintain it. 

### 4.2 Private Container Registry

Container Registry is IONOS Cloud&#x27;s managed, private Docker/OCI artifact store. It provides an authenticated registry where OCI-compliant artifacts (Docker images, Helm charts, and other container artifacts) can be pushed, stored, and pulled over the public Internet, but only after valid credentials are presented. 

What Container Registry provides: 

- A repository for Docker images and other OCI artifacts

- Storage for multiple repositories within each registry

- Access control via registry-access tokens with scoped permissions and optional expiration

- Fully managed infrastructure with continuous patching and updates

- Encryption at rest for all stored images

- Integration with CI/CD pipelines and Kubernetes workloads

Why use Private Container Registry: 

Instead of relying on external providers like Docker Hub or managing your own registry infrastructure, IONOS Container Registry gives you a secure, highly-available registry that lives in the same cloud environment as your other resources. This eliminates the need to pull images across the public Internet from external providers, provides better control over who can access your container images, and ensures that proprietary application code and images remain private. 

When to use Container Registry: 

You should use Container Registry whenever you are deploying containerized applications on IONOS Cloud, especially with Managed Kubernetes . It is essential for organizations that need to store proprietary container images securely, teams that want to integrate container builds into CI/CD pipelines, and environments where you need fine-grained access control over who can push and pull images. 

The registry integrates seamlessly with Managed Kubernetes clusters, allowing your applications to pull images directly from the registry using the credentials you configure. This creates a complete container platform where you can build, store, and deploy containerized applications entirely within the IONOS Cloud environment. 

### 4.3 Red Hat OpenShift

Red Hat OpenShift is an enterprise Kubernetes platform available on IONOS Cloud that extends standard Kubernetes with integrated developer tools, CI/CD pipelines, and enhanced security features. OpenShift provides a complete application platform with built-in support for building, testing, and deploying containers, along with centralized logging, monitoring, and role-based access control. 

When to use Red Hat OpenShift vs Managed Kubernetes : 

Choose Red Hat OpenShift when your organization needs an enterprise-grade Kubernetes platform with integrated developer tooling, built-in CI/CD pipelines, and Red Hat enterprise support. OpenShift is particularly suited for regulated industries that require enhanced security controls and compliance features out of the box. Choose Managed Kubernetes when you need standard, open-source Kubernetes without additional enterprise tooling, prefer a simpler setup, or want to minimize costs for basic container orchestration. 

### 4.4 SUSE Rancher Prime

SUSE Rancher Prime is a sovereign Kubernetes management platform available on IONOS Cloud that provides centralized management of multiple Kubernetes clusters across cloud, on-premises, and edge environments. Rancher Prime offers a unified management console, policy-driven governance, and integrated security features while maintaining full data sovereignty within European infrastructure. 

When to use SUSE Rancher Prime vs Managed Kubernetes : 

Choose SUSE Rancher Prime when your organization operates multiple Kubernetes clusters across different environments and needs centralized management, consistent policy enforcement, and multi-cluster visibility from a single control plane. Rancher Prime is particularly valuable for organizations with European data sovereignty requirements and hybrid or multi-cloud Kubernetes strategies. Choose Managed Kubernetes when you need a single, straightforward Kubernetes cluster without multi-cluster management overhead. 

## Common Use Cases

Real-world scenarios where these security, AI, and container services are used: 

- Multi-Tier Application with Network Security Groups: A software company runs a three-tier application (web, application, and database layers) in IONOS Cloud. They create custom NSGs for each tier as discussed in Section 1.1. The web tier NSG allows inbound HTTPS (port 443) from anywhere but only allows outbound connections to the application tier. The application tier NSG accepts traffic only from the web tier and can connect only to the database tier. The database tier NSG accepts connections only from the application tier. This layered security approach, using the centralized firewall management described in Section 1.1, ensures each tier is isolated and protected according to the principle of least privilege.

- AI-Powered Customer Support with RAG: A financial services company wants to build an intelligent support chatbot that answers questions based on their internal knowledge base of policies, procedures, and FAQs. Using AI Model Hub (Section 3.1), they upload their document collection to the managed vector database, which creates embeddings for semantic search. They configure a RAG endpoint that combines document retrieval with a Large Language Model. When customers ask questions, the system searches the document collection for relevant policies and generates accurate, context-aware answers using the LLM. The token-based billing model and GDPR-compliant German data centers (mentioned in Section 3.1) ensure cost-effective operation while meeting regulatory requirements for financial data.

- Microservices Platform with Managed Kubernetes and Container Registry: A growing e-commerce startup deploys their application as microservices using Managed Kubernetes (Section 4.1). They store all their container images in Private Container Registry (Section 4.2), including images for their product catalog service, payment processing service, and order management service. Their CI/CD pipeline automatically builds new images when developers commit code, pushes them to the Container Registry with proper access tokens, and triggers rolling updates in the Kubernetes cluster. Because IONOS manages the Kubernetes control plane (automatic updates and patches as described in Section 4.1), the startup&#x27;s small DevOps team can focus on application features rather than cluster maintenance. During holiday shopping peaks, they scale node pools up through the Kubernetes Manager, and scale back down after the rush, paying only for the resources used.

## Summary

This unit explored three essential service categories that extend IONOS Cloud beyond basic infrastructure. Network security services protect your resources through centralized firewall policies and DDoS protection. AI services bring machine learning capabilities through pre-trained models and custom fine-tuning platforms. Container services enable modern application deployment with Managed Kubernetes and private image registries. 

Network Security Groups provide centralized, stateful firewall management across your Virtual Data Centers, with both default protection for all VMs and custom policies for specific workloads. DDoS Protect safeguards against network attacks with automatic traffic filtering and optional advanced support. Certificate Manager simplifies SSL/TLS certificate lifecycle management, while SSH Key Manager centralizes secure access to Linux VMs. 

AI Model Hub offers immediate access to pre-trained foundation models for text generation, image creation, and semantic search without managing GPU infrastructure. AI Model Studio enables fine-tuning of models with your own data for domain-specific applications. Both services keep data in German data centers for GDPR compliance. 

Managed Kubernetes provides production-ready container orchestration with fully automated cluster provisioning, high-availability control planes, and automatic updates. Red Hat OpenShift extends Kubernetes with enterprise developer tools, CI/CD pipelines, and enhanced security for regulated environments. SUSE Rancher Prime provides centralized multi-cluster Kubernetes management with policy-driven governance and European data sovereignty. Private Container Registry offers secure storage for Docker images and Helm charts with access control and encryption. Together, these services create a complete platform for modern microservices architectures. 

Key Points: 

- Network Security Groups act as centralized firewall policy managers that filter traffic at the VM and NIC level with default-deny security

- DDoS Protect provides always-on defense against Layer 3 and Layer 4 attacks with automatic traffic filtering

- Certificate Manager and SSH Key Manager centralize security credential management across your cloud resources

- AI Model Hub provides pre-trained foundation models for immediate use, while AI Model Studio enables custom model fine-tuning with your own data

- Managed Kubernetes handles control plane management, updates, and high availability so you can focus on applications

- Red Hat OpenShift provides enterprise Kubernetes with integrated developer tools, CI/CD, and enhanced security

- SUSE Rancher Prime enables centralized multi-cluster Kubernetes management with policy governance and data sovereignty

- Private Container Registry provides secure, encrypted storage for container images with fine-grained access control

Important Terminology: 

- Network Security Group (NSG): Virtual firewall that filters inbound and outbound traffic for VMs and NICs based on centrally managed security rules

- DDoS Protect: Managed defense service that redirects attack traffic to filtering platforms while allowing legitimate traffic to reach resources

- Certificate Manager: Service that handles SSL/TLS certificate lifecycle (obtaining, installing, renewing, revoking) for web applications

- AI Model Hub: Inference service providing REST API access to pre-trained foundation models (LLMs, embeddings, text-to-image) without managing infrastructure

- AI Model Studio: Platform for fine-tuning pre-trained models with custom data using Low-Rank Adapter (LoRA) technique

- Managed Kubernetes: Fully-automated container orchestration service with managed control plane, automatic updates, and high availability

- Red Hat OpenShift: Enterprise Kubernetes platform with integrated developer tools, CI/CD pipelines, and enhanced security features

- SUSE Rancher Prime: Sovereign Kubernetes management platform for centralized multi-cluster operations with policy-driven governance

- Container Registry: Private, managed Docker/OCI artifact store with authentication, access control, and encryption at rest

## Next Steps

Continue Learning: Unit 3.1: Data Center Designer and Account Management 

Related Topics: 

- Unit 2.1: Core Architectural Components - Understanding VDCs and networking fundamentals

- Unit 3.2: Identity and Access Management - Managing user access and permissions

- Unit 3.5: Security and Compliance - Shared responsibility and security best practices

Mark as Complete 

Previous

2.5 Database and Data Services 

Next

2.7 Knowledge Check - Architecture and Services


--- FILE: unit-2.7-knowledge-check.html ---

Test your understanding of the key concepts from Module 2. Select the best answer for each question, then submit to see your results. You need to score at least 60% to pass. 

1. 

A development team wants to build separate environments for production and testing on IONOS Cloud. They need each environment to have its own isolated network and resources, but both must be located in the same physical data center. Which IONOS Cloud concept best supports this requirement? 

A 

A region, which groups physical data centers by country 

B 

A Cross Connect , which links two separate networks across the internet 

C 

A Virtual Data Center (VDC), which is a logically isolated container for resources tied to a specific region 

D 

An availability zone, which is a subdivision of a region for fault tolerance 

Explanation: 

A Virtual Data Center (VDC) is a logically isolated container where you provision and manage compute, storage, and networking resources, and each VDC is created in a specific region (such as de/txl or de/fra). Because VDCs are logical constructs, you can create multiple VDCs within the same region to separate environments while keeping them in the same physical location. A region defines the geographic location, not the isolation boundary, and Cross Connect is used to link private networks between VDCs - not to isolate them. This concept is covered in Unit 2.1. 

2. 

A financial services company runs a real-time transaction processing workload that requires consistent, predictable CPU performance without any interference from neighboring virtual machines. Which IONOS compute option is the best match for this requirement? 

A 

Dedicated Core server, because it allocates a physical CPU core exclusively to the VM 

B 

vCPU server, because it supports up to 60 vCPUs and scales quickly 

C 

Cubes , because they provide pre-configured templates with fixed resources 

D 

VM Auto Scaling , because it adds extra compute capacity when demand rises 

Explanation: 

A Dedicated Core server gives each VM an exclusive physical CPU core (with Hyper-Threading providing two logical threads), which eliminates &quot;steal time&quot; caused by other tenants sharing the same hardware. This makes it the right choice for performance-intensive workloads like real-time transaction processing where consistent CPU performance is critical. vCPU servers use shared physical CPUs across multiple tenants, so performance can vary. Cubes and VM Auto Scaling address different needs - fixed VPS templates and horizontal scaling respectively - not CPU isolation. This is covered in Unit 2.2. 

3. 

A media company stores thousands of video files that must remain available for years, be accessible from any location, and cost as little as possible to store. They do not need the files to be attached to a virtual machine. Which IONOS storage service is the most appropriate choice? 

A 

Block Storage (SSD), because it delivers high performance for active workloads 

B 

Network File Storage (NFS), because it allows multiple servers to share the same files 

C 

Backup Service , because it is designed for long-term data retention 

D 

IONOS Cloud Object Storage , because it provides S3-compatible unstructured data storage with no attachment requirement 

Explanation: 

IONOS Cloud Object Storage is designed for storing large amounts of unstructured data such as videos, images, and logs using an S3-compatible interface. Objects are accessible via HTTP/HTTPS from anywhere, do not need to be attached to a virtual machine, and can use lifecycle rules to manage costs over time. Block Storage (SSD) is a network-attached volume for active workloads on a running server. NFS is best for shared file access between multiple compute instances. The Backup Service is focused on protecting existing server data, not on cost-efficient long-term media archival. This concept is covered in Unit 2.3. 

4. 

A team is deploying a web application that uses HTTP and HTTPS traffic. They need the load balancer to route requests to different backend server groups based on the URL path - for example, /api traffic goes to one group and /static traffic goes to another. Which IONOS load balancer should they use? 

A 

Managed Network Load Balancer , because it supports the widest range of protocols 

B 

Managed Application Load Balancer , because it operates at Layer 7 and supports routing rules based on HTTP headers, hostnames, and URL paths 

C 

Managed Network Load Balancer , because it provides sticky sessions and source-IP affinity 

D 

Managed NAT Gateway , because it routes outbound traffic from private networks 

Explanation: 

The Managed Application Load Balancer (ALB) operates at Layer 7 of the network stack, which means it can inspect HTTP content and apply advanced routing rules based on URL paths, hostnames, HTTP methods, and headers. This makes it the correct choice for routing /api and /static traffic to separate backend groups. The Managed Network Load Balancer (NLB) operates at Layer 4 (TCP) and supports simple forwarding algorithms and sticky sessions, but it cannot inspect URL paths. The NAT Gateway provides outbound internet access for private LANs, not load balancing. Unit 2.4 covers both load balancer types. 

5. 

An organization wants to apply consistent firewall rules to a group of virtual machines across their Virtual Data Center, so that all inbound and outbound traffic is controlled from a single policy definition rather than configuring each VM individually. Which IONOS service meets this need? 

A 

DDoS Protect , which filters volumetric attack traffic at the network edge 

B 

Certificate Manager , which manages TLS certificates for secure connections 

C 

Network Security Groups (NSG), which provide a stateful, centrally managed virtual firewall that can be applied to multiple VMs or NICs 

D 

Managed NAT Gateway , which controls egress traffic for private networks 

Explanation: 

Network Security Groups (NSGs) let you define firewall rules once and apply them to any number of VMs or NICs within a VDC. Each NSG is stateful, meaning return traffic for allowed connections is automatically permitted without additional rules. You can use a Default NSG to protect all newly created VMs, or create Custom NSGs for specific workload groups. DDoS Protect defends against large-scale volumetric attacks at the network edge and does not provide per-VM rule management. Certificate Manager handles TLS certificate lifecycle, and NAT Gateway manages outbound internet access from private LANs. NSGs are introduced in Unit 2.6. 

Submit Answers

Try Again

Previous

2.6 Security, AI, and Container Services 

Next

3.1 Data Center Designer and Account Management