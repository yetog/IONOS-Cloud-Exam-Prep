# Unit 1 Section 3: Cloud Service Models - Sectional Exam

**Coverage:** IaaS/PaaS/SaaS definitions and examples, shared responsibility model per tier, what customer manages vs. provider at each level, IONOS-specific examples of each model (Compute Engine=IaaS, Managed Kubernetes=PaaS, etc.), SaaS characteristics
**Questions:** 30 | **Format:** Multiple Choice | **Time Estimate:** 25 minutes

---

**1. Which cloud service model provides virtualized infrastructure building blocks — compute (virtual machines), storage, and networking — while the customer manages the operating system and everything above it?**
A. Software as a Service (SaaS)
B. Platform as a Service (PaaS)
C. Infrastructure as a Service (IaaS)
D. Function as a Service (FaaS)

**2. Which cloud service model provides a ready-to-use runtime environment, managed OS, and managed middleware, allowing developers to deploy applications without managing underlying servers?**
A. Infrastructure as a Service (IaaS)
B. Platform as a Service (PaaS)
C. Software as a Service (SaaS)
D. Database as a Service (DBaaS) — which is separate from PaaS

**3. Which cloud service model delivers a fully functional software application over the internet, where the provider manages everything from infrastructure to application updates and the user simply consumes the software?**
A. Infrastructure as a Service (IaaS)
B. Platform as a Service (PaaS)
C. Software as a Service (SaaS)
D. Container as a Service (CaaS)

**4. Which of the following IONOS Cloud services is correctly classified as an IaaS offering?**
A. Managed Kubernetes
B. Managed PostgreSQL
C. Compute Engine
D. Event Streams for Apache Kafka

**5. A developer wants to deploy containerized workloads on IONOS without managing the Kubernetes control plane, node patching, or cluster scaling. Which IONOS service should they choose, and what service model does it represent?**
A. IONOS Compute Engine — IaaS
B. IONOS Cubes — IaaS
C. IONOS Managed Kubernetes — PaaS
D. IONOS Object Storage — IaaS

**6. Which of the following is NOT a PaaS offering in the IONOS Cloud portfolio according to the source material?**
A. Managed PostgreSQL
B. Managed MariaDB
C. Event Streams for Apache Kafka
D. Compute Engine

**7. IONOS Cloud Object Storage is classified as which service model?**
A. PaaS, because it is a managed service
B. IaaS, because it provides raw storage infrastructure that customers manage and configure
C. SaaS, because customers access it through a web interface
D. PaaS, because it handles all data management automatically on behalf of the customer

**8. What does the "pizza analogy" used in the IONOS source material map to in terms of service models?**
A. Making pizza from raw ingredients at home = SaaS; fully delivered pizza = IaaS
B. Making pizza from raw ingredients at home = IaaS; take-and-bake from the store = PaaS; fully delivered pizza = SaaS
C. Making pizza from raw ingredients = PaaS; delivered pizza = IaaS; takeaway = SaaS
D. The pizza analogy applies only to database services, not the full IaaS/PaaS/SaaS spectrum

**9. Under the Shared Responsibility Model, which layer does IONOS always manage regardless of which service model the customer uses?**
A. Operating system patching and security updates
B. Application code deployment and versioning
C. Physical infrastructure, data centers, and the virtualization/hypervisor layer
D. Customer data encryption and access management policies

**10. Under the Shared Responsibility Model, which responsibility always remains with the customer regardless of whether they use IaaS, PaaS, or SaaS?**
A. Operating system patching
B. Runtime environment configuration
C. Network Configuration
D. Data protection and access management (identity)

**11. A company uses IONOS Compute Engine (IaaS) to run a database server. A critical OS-level security vulnerability is discovered. Who is responsible for applying the patch?**
A. IONOS, because they manage the virtualization layer and this falls within their responsibility
B. The customer, because in IaaS the customer is responsible for the operating system
C. Both IONOS and the customer share responsibility equally for OS patches in IaaS
D. The hypervisor automatically applies guest OS patches without any action required

**12. A company uses IONOS Managed PostgreSQL (PaaS) for their application database. A critical OS-level security vulnerability is discovered in the database server's operating system. Who is responsible for patching it?**
A. The customer, because they selected the database version
B. IONOS, because in PaaS the provider manages the operating system, runtime, and patching
C. Both the customer and IONOS must coordinate and both apply the patch simultaneously
D. The customer's security team must approve the patch before IONOS can apply it

**13. Which service model gives the customer the highest level of control and flexibility over the software stack?**
A. Software as a Service (SaaS) — maximum flexibility through configuration options
B. Platform as a Service (PaaS) — customers control application runtime
C. Infrastructure as a Service (IaaS) — customers control OS, middleware, runtime, data, and applications
D. All three service models provide equivalent levels of customer control

**14. In a SaaS model, what is the customer's primary responsibility?**
A. Managing the operating system and middleware of the application servers
B. Applying security patches to the application runtime environment
C. Managing their data within the application and controlling user access
D. Configuring the load balancer and network topology for the SaaS application

**15. Does IONOS Cloud currently offer SaaS products?**
A. Yes — IONOS offers several SaaS products including email and collaboration tools
B. No — IONOS specializes in IaaS and PaaS; customers can use IONOS infrastructure to build their own SaaS applications
C. Yes — IONOS offers SaaS through a partnership with Microsoft 365
D. No — IONOS does not offer any managed services and focuses exclusively on raw IaaS

**16. A company cannot use a third-party SaaS CRM application because of strict data sovereignty requirements. What does the IONOS source material suggest as an alternative approach?**
A. Use IONOS Object Lock to force the SaaS provider to comply with EU data residency rules
B. Build a custom CRM application on IONOS IaaS (Compute Engine) and PaaS (Managed PostgreSQL) to achieve SaaS-like functionality with full data control
C. Deploy the third-party SaaS application on IONOS IaaS, which automatically makes it compliant
D. Use IONOS Managed Kubernetes to host the SaaS provider's application in a dedicated cluster

**17. What is the "Cubes" offering from IONOS Cloud, and what service model does it represent?**
A. Cubes are managed Kubernetes clusters — PaaS
B. Cubes are pre-configured VPS instances with fixed vCPU, RAM, and NVMe storage — IaaS
C. Cubes are serverless compute functions that scale automatically — PaaS
D. Cubes are managed in-memory caching clusters — PaaS

**18. Which of the following correctly maps IONOS services to their service model categories?**
A. Managed Kubernetes = IaaS; Compute Engine = PaaS; Managed MongoDB = SaaS
B. Compute Engine = IaaS; Managed Kubernetes = PaaS; Gmail (example) = SaaS
C. Block Storage = PaaS; Managed PostgreSQL = SaaS; Cubes = IaaS
D. Object Storage = PaaS; VPN Gateway = SaaS; Event Streams = IaaS

**19. A software company wants to deploy a microservices-based application with automatic cluster upgrades and security patches handled by the provider. Which IONOS service and model fits this requirement?**
A. Compute Engine (IaaS) — the company's team handles all OS and cluster management
B. Managed Kubernetes (PaaS) — IONOS handles control plane operations, upgrades, and patches
C. Object Storage (IaaS) — provides scalable storage for microservices data
D. Cubes (IaaS) — pre-configured VPS instances optimized for container workloads

**20. In the Shared Responsibility Model table from the IONOS source material, how is "Network Configuration" responsibility classified across service models?**
A. Customer responsibility in IaaS, IaaS and PaaS, and IONOS responsibility in SaaS
B. IONOS responsibility in all three service models
C. Customer responsibility in all three service models
D. Customer in IaaS, Shared between customer and IONOS in PaaS, and IONOS in SaaS

**21. In the Shared Responsibility Model, who manages "Application Code" in a PaaS environment?**
A. IONOS — because PaaS abstracts application management from the customer
B. The Customer — because in PaaS, the customer writes, tests, and deploys their own application code
C. Both the customer and IONOS jointly review all application code before deployment
D. A third-party audit firm reviews and manages application code in PaaS environments

**22. What is the primary reason IaaS is recommended when migrating existing on-premises applications to the cloud with minimal changes?**
A. IaaS is always cheaper than PaaS, making migrations more cost-effective
B. IaaS gives the customer full control over the operating system and software stack, allowing existing configurations to be replicated in the cloud
C. IaaS automatically converts legacy application code to cloud-native architecture
D. IaaS migrations are managed entirely by IONOS engineers at no additional cost

**23. According to the IONOS source material, which service model is best for development teams that want to accelerate application development, reduce operational overhead, and leverage managed platforms like Kubernetes and databases?**
A. IaaS — because it offers the most configuration options for developers
B. SaaS — because it eliminates all management responsibilities
C. PaaS — because the platform handles infrastructure, scaling, and patching, letting teams focus on application code
D. IaaS and SaaS together — one for compute and one for databases

**24. IONOS Managed In-Memory DB provides managed Redis clusters. What service model does this represent, and what does IONOS manage on behalf of the customer?**
A. IaaS — the customer manages Redis configuration, failover, and backups
B. PaaS — IONOS manages automatic failover and backups; the customer focuses on using Redis for their application
C. SaaS — the customer only accesses Redis through a web dashboard without any configuration
D. IaaS — because Redis is open-source software and therefore cannot be offered as a managed service

**25. Which cloud service model is described as having "low control, focus on usage" in the IONOS service model comparison table?**
A. IaaS
B. PaaS
C. SaaS
D. All models provide equal control levels

**26. A financial services company runs core banking systems on IONOS Compute Engine for maximum control, while using Managed PostgreSQL for customer data that requires automated backups and high availability. This is an example of what architecture strategy?**
A. Pure SaaS strategy — outsourcing all infrastructure management
B. Pure IaaS strategy — all services are self-managed virtual machines
C. A hybrid service model strategy — using IaaS and PaaS together based on specific workload control and compliance requirements
D. A single-vendor lock-in strategy that violates shared responsibility principles

**27. When using IONOS Managed Kubernetes (PaaS), what does the customer specifically NOT need to manage compared to running a self-managed Kubernetes cluster on Compute Engine (IaaS)?**
A. Application deployment manifests and container image specifications
B. Application-level code and data within the cluster
C. Kubernetes control plane operations, cluster upgrades, security patches, and scaling
D. Network policies and ingress rules for pod-to-pod communication

**28. SaaS applications are described as receiving updates in what manner?**
A. Customers must manually download and apply application updates during scheduled maintenance windows
B. Updates roll out automatically without requiring any action from users
C. Customers must purchase upgrade licenses before the provider can apply any application updates
D. SaaS updates are tested by the customer in a staging environment before being applied to production

**29. The IONOS source material states that building a Kubernetes environment "traditionally takes months to configure." How long does IONOS Managed Kubernetes make this process?**
A. Several weeks with proper planning
B. Hours
C. One to two business days
D. It remains weeks, but IONOS provides technical support throughout the process

**30. Which of the following best describes the "shared responsibility" principle that applies to both IaaS and PaaS customers equally, requiring both the provider and the customer to actively collaborate on security?**
A. IONOS handles all security in both models; customers have no security responsibilities
B. Customers handle all security in both models; IONOS only provides raw infrastructure
C. IONOS provides platform-level security tools and controls while customers implement best-practice security within their environments, including access control, encryption, and backup strategies
D. The shared responsibility model only applies to SaaS products; IaaS and PaaS are fully customer-managed

---

## Answer Key

1. C — Infrastructure as a Service (IaaS) provides virtualized compute, storage, and networking, with the customer responsible for the operating system and all layers above it.

2. B — Platform as a Service (PaaS) provides a managed runtime environment where the provider handles OS, middleware, scaling, and patching, allowing developers to focus on application code.

3. C — Software as a Service (SaaS) delivers a fully functional application over the internet where the provider manages everything — infrastructure, platform, and application — and users simply consume the software.

4. C — IONOS Compute Engine is classified as IaaS because it provides flexible virtual machines where the customer is responsible for the OS, middleware, and application stack.

5. C — IONOS Managed Kubernetes is a PaaS offering; IONOS manages the control plane, node patching, and cluster scaling, allowing developers to focus only on deploying and managing their containerized workloads.

6. D — Compute Engine is an IaaS offering (virtual machines); Managed PostgreSQL, Managed MariaDB, and Event Streams for Apache Kafka are all PaaS offerings in the IONOS portfolio.

7. B — IONOS Cloud Object Storage is classified as IaaS because it provides raw S3-compatible object storage infrastructure that customers configure, manage, and use for their own data storage needs.

8. B — The pizza analogy maps as follows: making from raw ingredients (IaaS — maximum control), take-and-bake from the store (PaaS — partially prepared, customer finishes), fully delivered pizza (SaaS — fully ready, just consume).

9. C — IONOS always manages the physical infrastructure, data centers, and the virtualization/hypervisor layer across all service models (IaaS, PaaS, and SaaS).

10. D — Data protection and access management (identity) always remain with the customer regardless of service model — customers always control who accesses their data and how it is used.

11. B — In an IaaS model, the customer is responsible for the guest operating system, including applying security patches and updates; IONOS is responsible only for the hypervisor and physical infrastructure below it.

12. B — In PaaS (such as Managed PostgreSQL), IONOS manages the operating system, runtime environment, and applies security patches; the customer is not responsible for OS-level patching in a managed database service.

13. C — IaaS gives the customer the highest level of control, managing the OS, middleware, runtime environment, data, applications, and network configuration — the full software stack above the hypervisor.

14. C — In a SaaS model, the customer's primary responsibility is managing their own data within the application and controlling user access; they do not manage infrastructure, platform, or application code.

15. B — IONOS does not currently offer SaaS products; IONOS specializes in IaaS and PaaS, providing the infrastructure and platform foundation that enables customers to build and deliver their own SaaS applications.

16. B — The source material describes building a custom CRM using IONOS IaaS (Compute Engine for application servers) and PaaS (Managed PostgreSQL for the database) as the recommended alternative when third-party SaaS cannot be used due to data sovereignty requirements.

17. B — IONOS Cubes are pre-configured VPS instances with fixed vCPU, RAM, and NVMe storage resources, classified as IaaS; they are cheaper than Compute Engine due to their rigid, pre-configured packaging.

18. B — Compute Engine = IaaS (virtual machine infrastructure), Managed Kubernetes = PaaS (managed container platform), and Gmail represents a real-world SaaS example (not offered by IONOS but used as a comparison point).

19. B — IONOS Managed Kubernetes (PaaS) is the correct choice because IONOS handles control plane operations, cluster upgrades, and security patches automatically, letting the development team focus on deploying and managing containerized services.

20. D — In the shared responsibility table, Network Configuration is a Customer responsibility in IaaS (configuring firewall rules, NSGs, routing), Shared responsibility in PaaS, and IONOS's responsibility in SaaS.

21. B — In a PaaS model, the customer is responsible for application code — writing, testing, and deploying their own applications; IONOS manages the infrastructure and runtime environment beneath the application.

22. B — IaaS is recommended for migrating existing applications with minimal changes because it gives the customer full control over the OS and software stack, allowing existing configurations, dependencies, and applications to be replicated in the cloud without redesign.

23. C — PaaS is described as the best choice for development teams wanting to accelerate development and reduce operational overhead, since the platform handles infrastructure, OS, scaling, and patching while teams focus on code.

24. B — Managed In-Memory DB is a PaaS offering; IONOS manages automatic failover and backups for the Redis cluster, while the customer focuses on using Redis for their application workloads.

25. C — SaaS is characterized as having "low control, focus on usage" — the customer interacts only with the application and their data, with no control over infrastructure, platform, or application code.

26. C — This is a hybrid service model strategy where Compute Engine (IaaS) provides maximum control for core banking systems requiring fine-grained configuration, while Managed PostgreSQL (PaaS) delivers automated backups and high availability for customer data with less operational overhead.

27. C — When using IONOS Managed Kubernetes (PaaS), customers do not need to manage Kubernetes control plane operations, cluster upgrades, security patches, or scaling — all of which must be managed manually on a self-hosted Kubernetes cluster running on Compute Engine (IaaS).

28. B — SaaS applications receive updates automatically, rolled out by the provider without requiring any action from end users — one of the defining characteristics of the SaaS model.

29. B — The IONOS source material states that enterprise Kubernetes environments that "traditionally take months to configure are available in hours" with IONOS Managed Kubernetes, highlighting the time-to-value advantage of PaaS.

30. C — The shared responsibility principle requires active collaboration: IONOS provides platform-level security tools and controls (secure base images, monitoring, platform security), while customers implement best practices within their environments including OS patching (IaaS), access control, encryption, backup strategies, and incident handling.
