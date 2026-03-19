# Unit 2 Section 4: Networking Services - Sectional Exam

**Coverage:** VDC networking, LANs, IP failover, NAT Gateway (SNAT/outbound-only), Network Load Balancer vs Application Load Balancer (Layer 3/4 vs Layer 7), Cross Connect, VPN Gateway (IPSec/WireGuard), Flow Logs vs Activity Logs, CDN, Cloud DNS, IPv4 vs IPv6 (128-bit)
**Questions:** 30 | **Format:** Multiple Choice | **Time Estimate:** 25 minutes

---

**1. At which OSI layer does the Managed Application Load Balancer (ALB) operate?**
A. Layer 3 (Network)
B. Layer 4 (Transport)
C. Layer 7 (Application)
D. Layer 2 (Data Link)

**2. At which OSI layer does the Managed Network Load Balancer (NLB) operate?**
A. Layer 7 (Application)
B. Layer 5 (Session)
C. Layer 4 (Transport)
D. Layer 3 (Network)

**3. A team deploys a microservices application where requests to /api/users must go to one backend group and requests to /api/orders must go to a different backend group. Which load balancer can implement this URL-path-based routing?**
A. Managed Network Load Balancer, because it inspects TCP packets at Layer 4
B. Managed Application Load Balancer, because it operates at Layer 7 and can route based on URL paths
C. Managed NAT Gateway, because it performs Source NAT on all traffic
D. VPN Gateway, because it routes encrypted traffic between services

**4. A financial application must preserve end-to-end TLS encryption from the client all the way through to the backend database servers. No intermediate component should decrypt the traffic. Which load balancer satisfies this requirement?**
A. Managed Application Load Balancer, because it terminates TLS at the listener and re-encrypts to the backend
B. Managed Network Load Balancer, because it does not terminate TLS and passes encrypted traffic unchanged
C. Managed NAT Gateway, because it routes traffic without inspecting its content
D. Cross Connect, because it is a private channel that cannot be inspected

**5. What type of health checks does the Managed Network Load Balancer use to verify backend server availability?**
A. HTTP health checks that verify a specific URL returns a 200 OK response
B. DNS health checks that verify the server's hostname resolves correctly
C. TCP health checks that verify the server accepts new TCP connections
D. ICMP ping checks that verify the server responds to ping requests

**6. An e-commerce company needs to redirect all HTTP traffic to HTTPS automatically, without involving any backend server. Which load balancer feature enables this?**
A. The NLB's Source IP algorithm, which routes traffic based on client IP
B. The ALB's redirect capability, which can return HTTP redirects based on routing rules without hitting a backend
C. The NAT Gateway's SNAT rules, which rewrite HTTP requests to HTTPS
D. The VPN Gateway, which transparently upgrades all HTTP connections

**7. A company's private VMs need to download security patches from the internet but must never accept incoming connections from external sources. Which IONOS service provides this outbound-only internet access?**
A. VPN Gateway with IPSec tunnels to a public-facing server
B. Managed NAT Gateway, which uses Source NAT (SNAT) to allow outbound traffic while blocking unsolicited inbound connections
C. Managed Application Load Balancer configured in reverse proxy mode
D. A public LAN with a firewall rule blocking all ingress traffic

**8. What does SNAT stand for, and what does the NAT Gateway use it for?**
A. Secure Network Address Translation; encrypts outbound traffic before it leaves the VDC
B. Source NAT; rewrites the source IP address of outbound packets from private VMs to a public IP address
C. Static NAT; assigns a permanent one-to-one mapping between a private IP and a public IP
D. Subnet NAT; translates entire private subnets to public address ranges

**9. How many private networks can be attached to a single IONOS Managed NAT Gateway?**
A. Up to 2
B. Up to 4
C. Up to 6
D. Up to 10

**10. A company needs encrypted, bidirectional connectivity between their on-premises data center in Berlin and an IONOS Cloud VDC in Frankfurt. Which IONOS service is designed for this use case?**
A. Cross Connect, for private LAN links between VDCs
B. Managed NAT Gateway, for outbound-only internet access
C. VPN Gateway, which creates encrypted IPSec or WireGuard site-to-site tunnels
D. Managed Application Load Balancer, for routing HTTPS traffic between sites

**11. IONOS VPN Gateway supports which two VPN protocols?**
A. OpenVPN and PPTP
B. IPSec (IKEv2) and WireGuard
C. SSL VPN and L2TP/IPSec
D. GRE tunneling and VXLAN

**12. A company compares IPSec and WireGuard for their VPN Gateway. What is the key difference?**
A. IPSec supports BGP dynamic routing; WireGuard supports only static routing
B. WireGuard provides lower latency and higher throughput; IPSec offers broader compatibility with legacy devices
C. IPSec is free; WireGuard requires a premium VPN Gateway tier
D. WireGuard terminates TLS; IPSec operates at Layer 4

**13. A network engineer suspects that a specific external IP address is probing their web servers. They need detailed records of every TCP connection attempt, including source IPs, destination ports, and packet counts. Which IONOS observability feature provides this data?**
A. Activity Logs, which record user API calls and resource changes
B. Flow Logs, which capture network packet metadata (IPs, ports, protocols) and store it in Object Storage
C. Cloud DNS logs, which record all DNS resolution requests
D. Managed NAT Gateway SNAT rules, which log all outbound connections

**14. A compliance auditor asks: "Who deleted the production database cluster last Tuesday?" Which IONOS feature provides the answer?**
A. Flow Logs stored in Object Storage, which capture network traffic
B. Activity Logs stored in the DCD/API, which record all user API calls and resource changes
C. Backup Service logs, which track restore operations
D. NSG rule change history, which shows firewall modifications

**15. Where are Flow Logs stored in IONOS Cloud?**
A. In the DCD interface as an immutable audit trail
B. In a dedicated log database managed by IONOS
C. In an IONOS Cloud Object Storage bucket chosen by the customer
D. In the VPN Gateway's internal log buffer

**16. Activity Logs in IONOS Cloud are described as "immutable via DCD." What is the significance of immutability for compliance purposes?**
A. Immutable logs cannot be read by auditors, protecting privacy
B. Immutable logs cannot be altered or deleted, ensuring a tamper-proof audit trail for GDPR and compliance investigations
C. Immutable logs are automatically compressed to reduce storage costs
D. Immutable logs are only accessible during the first 30 days after an event

**17. Cross Connect links VDCs using IONOS's private backbone. What is the key benefit of traffic "never leaving the IONOS network"?**
A. It allows traffic to bypass all IONOS security services for higher throughput
B. It eliminates public internet hops, providing lower latency, higher bandwidth, and stronger security compared to internet-based routing
C. It automatically encrypts traffic between VDCs without any configuration
D. It allows Cross Connect to bypass regional constraints and link VDCs across countries

**18. A company wants to deploy a CDN to serve their product images to global customers faster. Which statement correctly describes how IONOS CDN improves performance?**
A. CDN stores copies of images in Object Storage buckets in every IONOS region simultaneously
B. CDN caches content at globally distributed edge servers, serving requests from the nearest location to reduce latency
C. CDN compresses images on the fly to reduce the data volume transferred to users
D. CDN bypasses the internet and uses IONOS's private backbone to serve content globally

**19. Beyond performance, IONOS CDN provides which security benefit?**
A. It replaces SSL/TLS certificates, eliminating the need for Certificate Manager
B. It provides DDoS protection and web application firewall capabilities for content served through it
C. It enforces two-factor authentication for all users accessing cached content
D. It encrypts the origin server's Block Storage volumes at rest

**20. IPv6 addresses use how many bits, compared to IPv4?**
A. IPv6 uses 64 bits vs. IPv4's 32 bits
B. IPv6 uses 128 bits vs. IPv4's 32 bits
C. IPv6 uses 128 bits vs. IPv4's 64 bits
D. IPv6 uses 256 bits vs. IPv4's 32 bits

**21. What IPv6 prefix does IONOS automatically allocate to each VDC?**
A. /48 prefix per VDC, with /64 per region
B. /56 prefix per VDC, with /64 assignable per LAN
C. /64 prefix per VDC, with /80 per LAN
D. /32 prefix per VDC shared across all resources

**22. A company's architecture team argues about whether to use ALB or NLB for their SSH bastion host service (TCP port 22). Traffic volumes are high, latency must be minimal, and no HTTP inspection is needed. Which load balancer is correct?**
A. ALB, because it supports cookie-based session stickiness for maintaining SSH sessions
B. NLB, because it operates at Layer 4 with no HTTP parsing overhead, providing the lowest latency for TCP-based services
C. ALB, because it can route based on the destination port number
D. NAT Gateway, because SSH traffic should be routed through a gateway, not a load balancer

**23. The ALB terminates TLS. What is the security implication of this for backend servers?**
A. Backend servers receive only encrypted traffic since the ALB re-encrypts after inspection
B. Backend servers may receive unencrypted traffic by default after TLS termination at the ALB, so back-end encryption must be configured separately if required
C. TLS termination at the ALB means the ALB never inspects the traffic content
D. TLS termination prevents the ALB from reading HTTP headers, limiting routing capabilities

**24. A company wants to use the ALB's advanced routing to return a "503 Service Unavailable" page for a specific URL path without forwarding the request to any backend server at all. Which ALB capability enables this?**
A. Health check routing, which marks backends as unhealthy
B. Fixed response capability, which returns a configured HTTP response directly from the ALB
C. NLB fallback, which redirects unmatched traffic to a default backend
D. NAT Gateway SNAT rules applied to the ALB's listener

**25. When designing a hybrid cloud architecture, which IONOS networking services would a company use together to (a) connect on-premises to IONOS and (b) allow private VMs to download patches from the internet?**
A. Cross Connect for on-premises connectivity and ALB for patch downloads
B. VPN Gateway for the on-premises encrypted tunnel and NAT Gateway for private VM outbound internet access
C. CDN for on-premises connectivity and NLB for patch traffic distribution
D. Cross Connect for the private tunnel and VPN Gateway for outbound internet

**26. Cloud DNS in IONOS Cloud is described as a "managed" service. What operational burden does this remove compared to self-managed DNS?**
A. Customers no longer need to purchase domain names; IONOS registers them automatically
B. Customers no longer need to provision and maintain redundant DNS server infrastructure; IONOS handles availability and global distribution
C. Customers can skip SSL/TLS certificate validation since DNS and Certificate Manager are integrated
D. Cross Connect between VDCs is no longer needed because Cloud DNS routes traffic automatically

**27. A company runs a high-traffic web application using VM Auto Scaling with multiple identical web server VMs. Which IONOS service should be paired with VM Auto Scaling to evenly distribute incoming HTTP/HTTPS requests across the dynamically changing pool of VMs?**
A. Managed NAT Gateway, because it handles outbound-only traffic from the VMs
B. Managed Application Load Balancer, which distributes HTTP/HTTPS traffic and integrates with Auto Scaling groups
C. VPN Gateway, because it routes encrypted traffic between the load balancer and the VMs
D. Cross Connect, because it provides private LAN links between the Auto Scaling VMs

**28. A team needs to troubleshoot why a specific application server is being denied network connections. They need to see actual network packet records showing source IPs, destination ports, and whether traffic was accepted or dropped. Which IONOS tool provides this?**
A. Activity Logs, because they record all user and API-level changes to resources
B. DCD firewall rule history, which shows recent rule modifications
C. Flow Logs, which capture network packet metadata and store it in Object Storage for analysis
D. Cloud DNS query logs, which show all DNS lookups made from VMs

**29. Which statement correctly distinguishes when to use VPN Gateway versus Cross Connect?**
A. VPN Gateway connects two VDCs in the same region; Cross Connect connects on-premises to IONOS
B. Cross Connect connects VDCs in the same region via the private backbone; VPN Gateway connects IONOS to external networks (on-premises or other clouds) via encrypted tunnels
C. Both services are identical; the choice is based on available budget
D. Cross Connect supports BGP dynamic routing; VPN Gateway supports only static routing

**30. An NLB is described as providing "highest throughput, lowest latency" compared to the ALB. What is the technical reason for this performance advantage?**
A. The NLB uses dedicated physical hardware while the ALB runs on shared virtual machines
B. The NLB does not inspect HTTP content, operating only at Layer 4 (IP/port), which eliminates the overhead of HTTP parsing and TLS decryption present in the ALB
C. The NLB operates at Layer 3 (IP), which is one layer below the ALB's Layer 4
D. The NLB bypasses IONOS security services, which reduces processing overhead

---

## Answer Key

1. C — The Managed Application Load Balancer (ALB) operates at Layer 7 (the Application layer) of the OSI model, enabling it to inspect and route based on HTTP/HTTPS content such as URL paths, methods, and headers.

2. C — The Managed Network Load Balancer (NLB) operates at Layer 4 (the Transport layer), forwarding TCP traffic based solely on IP address and port without inspecting application-layer content.

3. B — The ALB operates at Layer 7 and can inspect HTTP attributes including URL paths, allowing it to route requests to different backend target groups based on path-matching rules like /api/users vs. /api/orders.

4. B — The NLB does not terminate TLS; it passes encrypted traffic unchanged to backend servers, enabling end-to-end encryption from client to backend without decryption at the load balancer.

5. C — The NLB uses TCP-based health checks (connection-oriented), verifying that backend servers can accept new TCP connections rather than checking HTTP response codes.

6. B — The ALB supports fixed response and redirect capabilities, allowing it to return HTTP 301/302 redirect responses directly (e.g., HTTP to HTTPS) without the request ever reaching a backend server.

7. B — The Managed NAT Gateway uses Source NAT (SNAT) to allow private VMs to initiate outbound internet connections while blocking all unsolicited inbound connections, keeping the VMs hidden from external access.

8. B — SNAT stands for Source NAT; the NAT Gateway rewrites the source IP address of outbound packets from private VMs to a shared public IP address, allowing multiple private VMs to reach the internet through a single gateway.

9. C — A single IONOS Managed NAT Gateway can have up to six private networks attached, and custom SNAT rules can control which traffic is allowed outbound from each network.

10. C — VPN Gateway creates encrypted site-to-site tunnels using IPSec (IKEv2) or WireGuard, making it the correct service for bidirectional connectivity between on-premises data centers and IONOS Cloud VDCs.

11. B — IONOS VPN Gateway supports IPSec (IKEv2) and WireGuard, both of which can be configured simultaneously on the same gateway for different tunnel types or peer requirements.

12. B — WireGuard is a modern VPN protocol designed for lower latency and higher throughput; IPSec (IKEv2) offers broader compatibility with legacy network devices and is the more widely supported industry standard.

13. B — Flow Logs capture network packet metadata (source/destination IPs, ports, protocols, accepted/dropped status) and store them in Object Storage, making them the correct tool for detecting suspicious IP activity.

14. B — Activity Logs record all user API actions including resource creation, modification, and deletion, providing a tamper-proof audit trail that answers "who did what and when" questions for compliance investigations.

15. C — Flow Logs are stored in an IONOS Cloud Object Storage bucket that the customer designates, because the volume of network traffic data requires scalable, cost-effective storage.

16. B — Immutability means Activity Logs cannot be altered or deleted after being written, ensuring a trustworthy, tamper-proof audit trail that satisfies GDPR and regulatory compliance requirements.

17. B — Traffic that never leaves the IONOS private backbone has no public internet exposure, meaning it avoids public internet congestion, achieves lower latency, maintains higher bandwidth, and cannot be intercepted by third parties.

18. B — CDN distributes content to globally located edge servers; user requests are served from the nearest edge location, reducing the round-trip distance and dramatically lowering latency for geographically distributed audiences.

19. B — In addition to performance benefits, IONOS CDN provides DDoS protection and web application firewall capabilities for content served through it, adding a security layer in front of the origin infrastructure.

20. B — IPv6 uses 128-bit addresses, compared to IPv4's 32-bit addresses; this is a critical exam fact as 128-bit addressing provides a virtually unlimited pool of IP addresses to solve IPv4 exhaustion.

21. B — IONOS automatically allocates a /56 IPv6 prefix to each VDC and individual /64 prefixes can be assigned to each LAN within that VDC, providing unique, routable IPv6 space for all workloads.

22. B — The NLB is the correct choice for SSH (TCP port 22) traffic: it operates at Layer 4 with no HTTP parsing overhead, delivering the lowest latency and highest throughput for any TCP-based protocol.

23. B — When the ALB terminates TLS, it decrypts traffic at the listener; by default, the connection to the backend may be unencrypted unless re-encryption is configured, which is why end-to-end TLS requires the NLB instead.

24. B — The ALB's fixed response capability allows it to return a pre-configured HTTP response (such as a 503 with a custom body) directly from the load balancer, without the request reaching any backend server.

25. B — VPN Gateway creates the encrypted site-to-site tunnel for on-premises connectivity, while Managed NAT Gateway provides the outbound-only SNAT path for private VMs to reach the internet for patch downloads.

26. B — A managed DNS service means IONOS provisions and maintains the redundant DNS server infrastructure, handles geographic distribution, and ensures high availability, eliminating the customer's need to manage DNS servers.

27. B — The ALB is the correct pairing with VM Auto Scaling for HTTP/HTTPS workloads; it distributes requests across the dynamically scaling pool of VMs and performs health checks to route traffic only to healthy instances.

28. C — Flow Logs capture detailed network packet metadata including source/destination IPs, ports, protocols, and accept/drop decisions, making them the correct tool for diagnosing connection denials and security incidents.

29. B — Cross Connect uses IONOS's private backbone to connect VDCs within the same region (free, low-latency, no internet); VPN Gateway creates encrypted tunnels connecting IONOS to external networks such as on-premises data centers or other clouds.

30. B — The NLB's performance advantage comes from operating only at Layer 4 (IP address and port), requiring no HTTP content inspection, URL parsing, or TLS decryption, which significantly reduces processing overhead compared to the ALB.
