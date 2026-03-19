# Unit 2 Section 1: Core Architecture - Sectional Exam

**Coverage:** Virtual Data Centers (VDCs), regions, availability zones, LANs, NICs, Cross Connect, firewall fundamentals, network topology, resource organization, Data Center Designer
**Questions:** 30 | **Format:** Multiple Choice | **Time Estimate:** 25 minutes

---

**1. What is the primary function of a Virtual Data Center (VDC) in IONOS Cloud?**
A. A physical server rack in a specific IONOS data center facility
B. A logical container that groups compute, storage, and networking resources in a specific region
C. A billing account that tracks costs for individual projects
D. A type of virtual machine configuration for enterprise workloads

**2. A company needs to keep EU customer data inside Germany for GDPR compliance while serving North American users from a US-based location. What IONOS architectural feature supports this requirement?**
A. Multiple Availability Zones within a single VDC
B. Multiple LANs configured within one Virtual Data Center
C. Separate VDCs created in different geographic regions
D. Cross Connect linking VDCs across continents

**3. Which of the following statements correctly describes IONOS Cloud Availability Zones (AZs)?**
A. AZs are separate cloud accounts that provide billing isolation for different teams
B. AZs are isolated physical zones within a region with independent power, cooling, and networking
C. AZs automatically replicate data between different geographic regions
D. AZs are virtual partitions within a single server for resource isolation

**4. A production web application requires fault tolerance against a complete data center failure. What is the IONOS best-practice architecture to achieve this?**
A. Deploy all servers in a single AZ for simplified management
B. Distribute web servers and database replicas across at least two Availability Zones within a VDC
C. Enable automatic cross-region replication for all VDC resources
D. Create a backup VDC in a different contract to handle failover

**5. An IT services company manages infrastructure for five separate client projects. They want clear financial reporting per client and simple access control so each client's team can only see their own environment. What is the recommended IONOS resource organization strategy?**
A. Create one large VDC with separate LANs per client
B. Use one VDC and apply IAM tags to separate client resources
C. Create one project-specific VDC per client plus a core VDC for shared services
D. Deploy all clients into the same Availability Zone for lowest latency

**6. What is the region code for the IONOS Cloud Frankfurt location?**
A. de/txl
B. de/fra
C. fr/par
D. gb/lhr

**7. Which type of LAN in a VDC allows resources to be reached from the public internet?**
A. Private LAN
B. Management LAN
C. Public LAN
D. Cross Connect LAN

**8. A company wants to connect a production VDC to a development VDC so that both environments can share a centralized firewall appliance and VPN gateway, without any traffic traversing the public internet. Which service achieves this?**
A. VPN Gateway using IPSec tunnels
B. Cross Connect, using a private LAN-based link between VDCs
C. Managed NAT Gateway with SNAT rules
D. A public LAN with firewall rules restricting external access

**9. Cross Connect on IONOS Cloud has which of the following constraints?**
A. VDCs must be in different regions and different contracts
B. VDCs must be in the same region and the same contract
C. VDCs must be in the same region but can be in different contracts
D. There are no geographic constraints; Cross Connect works globally

**10. How much does Cross Connect cost on IONOS Cloud?**
A. Billed per GB of data transferred between VDCs
B. A flat monthly fee based on the number of connected VDCs
C. It is provided at no additional charge
D. Priced based on the bandwidth tier selected

**11. What is the maximum internal network throughput a single NIC can achieve in an IONOS Cloud VDC?**
A. 1 Gbps
B. 10 Gbps
C. 6 Gbps
D. 25 Gbps

**12. A virtual machine needs to handle both public web traffic and internal management communications on separate network segments. What IONOS feature enables this topology?**
A. Assigning multiple public IP addresses to a single NIC
B. Attaching multiple NICs to the VM, each connected to a different LAN
C. Creating multiple VDCs and connecting them via Cross Connect
D. Enabling IPv6 dual-stack on the primary NIC

**13. When a firewall is activated on a NIC in IONOS Cloud, what is the default behavior for incoming traffic?**
A. All incoming traffic is allowed by default until rules are added to deny it
B. Only ICMP traffic is blocked; TCP and UDP are allowed
C. All incoming traffic is blocked by default; rules must be added to allow specific traffic
D. Traffic is allowed from within the VDC but blocked from the internet

**14. IONOS documentation states that virtual LANs "work just like normal physical networks" and that "transmitted data is completely isolated." What does this mean for a multi-tenant IONOS environment?**
A. All tenants share the same VLAN but use encryption to prevent interception
B. Traffic in one tenant's LAN cannot be intercepted by other IONOS users
C. IONOS staff can monitor all LAN traffic for compliance purposes
D. Traffic isolation only applies to cross-region communications

**15. Which IONOS Cloud tool provides the graphical interface for creating and managing VDCs and their resources?**
A. IONOS API Gateway
B. Cloud Shell
C. Data Center Designer (DCD)
D. Kubernetes Manager

**16. An architect is designing a three-VDC environment: Core, Production, and Development. The Core VDC hosts shared firewalls and VPN gateways. All three VDCs are in the Frankfurt region under the same contract. How should the Core VDC connect to Production and Development?**
A. Via VPN Gateway tunnels, since VPN is required for inter-VDC communication
B. Via Cross Connect, using private LAN links that stay on IONOS's private backbone
C. Via public LANs with firewall rules restricting the IP ranges
D. Via a Managed NAT Gateway allowing bidirectional traffic

**17. What happens to IONOS Cloud resources when a user is added to a group that has "Edit" permissions on a VDC?**
A. The user can only read VDC resources, not modify them
B. The user inherits the group's Edit permissions and can modify all resources in that VDC
C. The user must request individual resource-level permissions separately
D. The user can only modify resources they personally created

**18. A company deploys a database replica in AZ 1 and a primary database in AZ 2 within the same Frankfurt VDC. What specific failure scenario does this protect against?**
A. A failure in a completely different geographic region
B. An outage affecting one entire Availability Zone, such as a power or cooling failure
C. A network disruption between Frankfurt and Berlin regions
D. A failure of the IONOS control plane API

**19. Which of the following IPv6 blocks does IONOS automatically allocate when a new VDC is created?**
A. A /64 prefix for the entire VDC
B. A /56 prefix for the VDC, with /64 prefixes assignable per LAN
C. A /48 prefix shared across all VDCs in the same region
D. IPv6 is not automatically allocated; it must be manually requested

**20. A developer configures a private LAN for backend database servers and a public LAN for web servers within the same VDC. What is the key security benefit of this design?**
A. Private LAN resources automatically receive DDoS protection
B. Database servers on the private LAN are not accessible from the internet
C. Web servers on the public LAN are protected from all external traffic by default
D. The private LAN encrypts all traffic end-to-end automatically

**21. IONOS Cloud regions in Germany include Berlin (de/txl), Frankfurt (de/fra), and Frankfurt 2 (de/fra-2). A company choosing a German region for data residency can be confident that their data is protected from which regulation?**
A. GDPR, because all European regions comply automatically
B. The US CLOUD Act, because German jurisdiction prevents US government data access demands
C. The UK Data Protection Act, because EU data cannot be accessed by UK authorities
D. ISO 27001, which prohibits cross-border data access

**22. Which statement about IONOS Cloud's cross-region data replication is accurate?**
A. IONOS automatically replicates all VDC data across regions for disaster recovery
B. Cross-region replication is handled automatically for Block Storage but not for Object Storage
C. IONOS does not automatically replicate data across regions; customers must implement their own strategy
D. Automatic cross-region replication is available as an add-on service for all resource types

**23. An organization follows the "principle of least privilege" in its IONOS Cloud IAM strategy. What does this mean for new users added to the platform?**
A. New users start with Administrator-level access and privileges are removed as needed
B. New users receive read-only access to all VDC resources by default
C. New users receive zero privileges and access must be explicitly granted
D. New users automatically inherit permissions from the Contract Owner

**24. A company wants a "blast radius" reduction strategy — if a developer makes a catastrophic mistake in the development environment, production should not be affected. What IONOS approach achieves this?**
A. Placing production and development VMs in different Availability Zones within one VDC
B. Using separate VDCs for production and development environments
C. Applying different NSG rules to production and development servers in the same VDC
D. Assigning production and development to different LANs within one VDC

**25. A NIC in IONOS Cloud is described as the component that connects a virtual machine to a LAN. How many LANs can a single NIC be attached to simultaneously?**
A. One LAN per NIC
B. Two LANs, for redundancy
C. Up to five LANs, depending on VM type
D. Unlimited LANs, using VLAN tagging

**26. Which IONOS region is located in Spain?**
A. es/mad
B. es/bcn
C. es/vit
D. es/vlc

**27. A company centralizes shared infrastructure in a "Core VDC" rather than duplicating it in every project VDC. What is the primary operational benefit of this centralization strategy?**
A. Centralization reduces the number of available IP addresses across all VDCs
B. It reduces licensing and operational costs by sharing services rather than replicating them
C. It forces all traffic through a single point of failure for simplified monitoring
D. It allows VDCs to exist in different regions while sharing the same resources

**28. A team needs to allow both inbound (ingress) and outbound (egress) traffic to be controlled by firewall rules on a specific NIC. Which firewall direction setting achieves this?**
A. Ingress only
B. Egress only
C. Bidirectional
D. Promiscuous mode

**29. IONOS Cloud IAM supports user groups. What is the operational advantage of granting permissions to groups rather than to individual users?**
A. Groups can access resources in different contracts without additional configuration
B. When a user joins or leaves a team, simply adding or removing them from the group automatically adjusts their permissions
C. Group permissions override VDC-level permissions for faster policy updates
D. Only group members can use Cross Connect between VDCs

**30. An architect wants to understand the hierarchical resource organization in IONOS Cloud. From broadest to most granular, what is the correct order?**
A. VDC → Contract → Resource
B. Region → Contract → VDC → Resource
C. Contract → VDC → Resource
D. Resource → LAN → VDC → Contract

---

## Answer Key

1. B — A VDC is IONOS Cloud's fundamental logical container that bundles compute, storage, and networking resources, always tied to a specific geographic region.

2. C — Creating separate VDCs in different geographic regions (e.g., de/fra for EU and us/mci for North America) keeps data within the required jurisdiction while serving regional users.

3. B — Availability Zones are isolated physical zones within a region that have independent power feeds, cooling systems, and networking, ensuring that a failure in one AZ does not affect resources in another.

4. B — Distributing servers and database replicas across at least two AZs within a VDC is the IONOS best practice for fault tolerance against data center-level failures.

5. C — Creating one VDC per client project plus a centralized core VDC (connected via Cross Connect) gives clean financial reporting per VDC, isolated access control, and a shared security infrastructure.

6. B — The Frankfurt region is identified by the region code de/fra; Berlin is de/txl, Paris is fr/par, and London is gb/lhr.

7. C — Public LANs provide internet connectivity, allowing resources to reach external services and be reachable from the internet when firewall rules permit.

8. B — Cross Connect creates a dedicated, private LAN-based link between VDCs in the same region and contract, keeping all traffic on IONOS's private backbone without using the public internet.

9. B — Cross Connect requires that all participating VDCs belong to the same IONOS region and the same customer contract to ensure data sovereignty and clean network segmentation.

10. C — Cross Connect is provided at no additional charge; it is free for both legacy and current versions.

11. C — Each NIC in an IONOS VDC supports up to 6 Gbps for both internal (intra-VDC) and external (internet) throughput.

12. B — A single VM can have multiple NICs, each connected to a different LAN, enabling advanced topologies such as separating public web traffic from private management communications.

13. C — Activating a firewall on a NIC in IONOS Cloud defaults to blocking all incoming traffic; you must then add explicit rules to allow only the protocols, ports, and sources you need.

14. B — IONOS's software-defined LANs provide full traffic isolation between tenants, so data on one customer's LAN cannot be intercepted by other IONOS Cloud users.

15. C — The Data Center Designer (DCD) is IONOS Cloud's graphical management interface for creating and managing VDCs, servers, storage, networks, and all associated resources.

16. B — Cross Connect is the correct service for linking VDCs in the same region and contract via IONOS's private backbone, allowing the Core VDC's shared services to be reached without public internet hops.

17. B — In IONOS IAM, permissions are inherited from group membership, so a user added to a group with Edit permissions on a VDC can immediately modify all resources in that VDC.

18. B — Distributing the primary and replica across different AZs protects against an AZ-level outage such as a power failure or cooling failure affecting one physical zone.

19. B — IONOS automatically allocates a /56 IPv6 prefix to each VDC, from which /64 prefixes can be assigned to individual LANs, providing a large unique IPv6 space.

20. B — Backend servers on a private LAN cannot receive unsolicited inbound connections from the internet, reducing the attack surface compared to placing them on a public LAN.

21. B — Data hosted in German IONOS regions falls under German and EU jurisdiction, which means US authorities cannot compel IONOS to hand over data under the US CLOUD Act.

22. C — IONOS does not automatically replicate data across regions; customers who need multi-region resilience must implement their own replication and backup strategies.

23. C — IONOS follows the Principle of Least Privilege (PoLP): new users start with zero privileges, and access must be explicitly granted by a Contract Owner or Administrator.

24. B — Separate VDCs for production and development create a hard isolation boundary; a destructive action in the dev VDC cannot affect production resources in a different VDC.

25. A — Each NIC can be attached to exactly one LAN; to connect a VM to multiple LANs, you must attach multiple NICs (one per LAN).

26. C — The IONOS region in Logroño, Spain is identified by the region code es/vit.

27. B — Centralizing shared services (firewalls, VPN, logging) in one Core VDC and connecting other VDCs via Cross Connect avoids duplicating those services, reducing both licensing costs and operational complexity.

28. C — Setting the firewall direction to "Bidirectional" on a NIC enables IONOS to control both ingress (inbound) and egress (outbound) traffic for that interface.

29. B — Using groups makes access management scalable: adding a user to a group grants all group permissions instantly, and removing them revokes access immediately without touching individual resource policies.

30. C — The correct hierarchy in IONOS Cloud from broadest to most granular is Contract (top-level organizational owner) → VDC (logical data center) → Resource (individual servers, volumes, networks).
