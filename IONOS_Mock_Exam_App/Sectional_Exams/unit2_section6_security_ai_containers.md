# Unit 2 Section 6: Security, AI, and Container Services - Sectional Exam

**Coverage:** Network Security Groups (NSGs), DDoS Protect, Certificate Manager (ACME/auto-renewal), SSH Key Manager (100-key limit), AI Model Hub (pre-trained inference), AI Model Studio (LoRA fine-tuning), Managed Kubernetes, Private Container Registry, Red Hat OpenShift, SUSE Rancher Prime, Cloud DNS, CDN
**Questions:** 30 | **Format:** Multiple Choice | **Time Estimate:** 25 minutes

---

**1. What is the default security posture of a Network Security Group (NSG) when no rules have been added?**
A. All inbound and outbound traffic is allowed until rules explicitly deny it
B. Only outbound traffic is allowed; all inbound traffic is blocked
C. All traffic not explicitly allowed by a rule is automatically denied (default-deny)
D. Only traffic from within the same VDC is allowed by default

**2. An administrator needs to apply identical firewall rules to 50 virtual machines in a VDC without creating individual firewall configurations for each VM. Which IONOS feature enables this centralized approach?**
A. Applying NIC-level firewall rules to each VM manually
B. Network Security Groups (NSGs), which apply a single policy to multiple VMs or NICs
C. VPN Gateway ACL rules, which control all VDC traffic from a central policy
D. DDoS Protect Advanced, which blocks all unauthorized traffic globally

**3. When a VM is added as a member of an NSG in IONOS Cloud, what happens to all of its NICs?**
A. Each NIC must be manually added to the NSG separately
B. All of the VM's NICs automatically inherit the NSG's security rules
C. The NICs are isolated from all external traffic until the NSG rules are reviewed
D. The NSG replaces all existing NIC-level firewall rules with a blank policy

**4. DDoS Protect Basic in IONOS Cloud is available to whom?**
A. Only customers who purchase the Advanced security package
B. Only customers running production workloads with Enterprise-grade SLAs
C. All IONOS Cloud users automatically, with no configuration required
D. Only customers with dedicated server contracts

**5. DDoS Protect defends against which OSI layers of attack?**
A. Layer 7 (Application) attacks like HTTP floods and SQL injection
B. Layer 3 (Network) and Layer 4 (Transport) attacks, such as UDP floods and SYN floods
C. Layer 2 (Data Link) attacks targeting MAC addresses
D. Layer 5 and 6 (Session and Presentation) attacks

**6. What additional capability does DDoS Protect Advanced provide beyond the Basic package?**
A. Automatic IP address rotation to avoid being targeted by attackers
B. 24/7 expert support, proactive monitoring, and on-demand IP-specific filtering or attack diagnostics
C. Layer 7 HTTP flood protection and web application firewall capabilities
D. Automatic scaling of resources during active attacks to maintain performance

**7. Certificate Manager in IONOS Cloud centralizes the management of SSL/TLS certificates. Which IONOS services can use certificates managed by Certificate Manager?**
A. Managed Network Load Balancer, VPN Gateway, and Cloud DNS only
B. Application Load Balancer, CDN, and API Gateway
C. Block Storage volumes and Network File Storage shares
D. Managed Kubernetes control plane and SSH key authentication

**8. Certificate Manager supports auto-renewal of SSL/TLS certificates via ACME providers. Which well-known free ACME provider is explicitly mentioned for use with Certificate Manager?**
A. DigiCert Enterprise CA
B. GlobalSign Atlas
C. Let's Encrypt
D. Sectigo PositiveSSL

**9. SSH Key Manager in IONOS Cloud allows centralized storage of public SSH keys. What is the maximum number of SSH public keys that can be stored?**
A. 10
B. 50
C. 100
D. 500

**10. When a Linux VM is created and a stored SSH key is selected, what automatically happens to the key?**
A. The key is emailed to the VM administrator for manual installation
B. The public key is automatically injected into the VM's image, enabling immediate SSH access without manual distribution
C. A temporary password is generated and the key is activated after the first login
D. The key is stored in the VM's /etc/ssh/ directory but requires manual configuration in authorized_keys

**11. What is the primary use case for IONOS AI Model Hub?**
A. Training custom machine learning models from scratch on your own dataset
B. Fine-tuning pre-trained models using the LoRA technique with your own data
C. Providing immediate API access to pre-trained foundation models (LLMs, embeddings, image generation) for inference without managing infrastructure
D. Hosting GPU clusters for large-scale distributed ML training jobs

**12. An AI development team wants to build a customer support chatbot that answers questions based on their internal knowledge base of policy documents. They want to use Retrieval-Augmented Generation (RAG). Which IONOS service is designed for this?**
A. AI Model Studio, because RAG requires fine-tuning the model on the document collection
B. AI Model Hub, which includes document collections management, embeddings, and RAG endpoints for grounding LLM answers in your documents
C. Managed Kubernetes with a self-deployed LLM container image
D. IONOS Cloud Object Storage, which serves documents to the LLM via HTTP

**13. AI Model Hub uses what type of billing for API usage?**
A. Monthly flat-rate subscription per model
B. Per-request billing where each API call is charged individually
C. Token-based billing providing transparent, usage-driven pricing
D. Compute-hour billing based on GPU time consumed per query

**14. A healthcare provider wants to build a clinical documentation tool where the AI model understands specific medical terminology, internal procedures, and clinical note formats. A general-purpose model is insufficient. Which IONOS AI service enables this customization?**
A. AI Model Hub, because it provides models that can be configured with system prompts
B. AI Model Studio, which allows fine-tuning pre-trained models with domain-specific data using the LoRA technique
C. Cloud GPU VMs, which host custom models with full hardware control
D. Managed Kubernetes, which deploys pre-built medical AI containers from the Private Container Registry

**15. AI Model Studio uses the LoRA technique for fine-tuning. What does LoRA (Low-Rank Adapter) do?**
A. It replaces the entire model with a new architecture trained from scratch on custom data
B. It freezes the original model weights and adds small trainable adapter matrices, so only a few parameters need to be updated — making fine-tuning efficient and accessible
C. It compresses the model to reduce inference latency at the cost of lower accuracy
D. It distributes training across multiple GPU nodes for faster convergence

**16. Where does IONOS AI Model Hub and AI Model Studio process and store data?**
A. In the nearest IONOS region to the user making the API call
B. In German data centers, complying with GDPR and ensuring data sovereignty
C. In US-based data centers managed by the model provider (e.g., Meta or Mistral)
D. In whichever IONOS region the customer's VDC is located

**17. What is the key operational difference between IONOS Managed Kubernetes and self-managed Kubernetes?**
A. Self-managed Kubernetes supports more pod replicas per cluster than Managed Kubernetes
B. Managed Kubernetes has IONOS fully manage the control plane, updates, and infrastructure, while self-managed requires the customer to install, patch, and maintain all Kubernetes components
C. Managed Kubernetes only supports Linux worker nodes; self-managed supports Windows
D. Self-managed Kubernetes is free; Managed Kubernetes incurs a per-cluster management fee

**18. IONOS Managed Kubernetes is described as being built on "vanilla Kubernetes." What advantage does this provide?**
A. It means the cluster uses only IONOS-proprietary extensions not compatible with community tools
B. It ensures maximum compatibility with the standard Kubernetes ecosystem, including community tools, Helm charts, and third-party operators
C. It means the cluster cannot be customized beyond the default IONOS configuration
D. It provides automatic integration with all IONOS services without additional configuration

**19. A DevOps team builds Docker images in their CI/CD pipeline and needs to store them in a private, authenticated registry within IONOS Cloud for deployment to Managed Kubernetes. Which IONOS service provides this?**
A. IONOS Cloud Object Storage with a custom Docker registry container deployed on a VM
B. Private Container Registry, which provides a managed, authenticated Docker/OCI artifact store with access-control tokens
C. Managed Kubernetes' built-in image registry that is automatically provisioned with each cluster
D. A public Docker Hub repository with private repository access tokens

**20. What types of artifacts can be stored in IONOS Private Container Registry?**
A. Docker images only
B. Docker images and Helm charts (OCI-compliant artifacts)
C. Docker images, Helm charts, and raw source code repositories
D. Container images and virtual machine disk images (VMDKs)

**21. A company is deploying containerized applications on IONOS Cloud. Which approach to container image management provides the best security and eliminates dependency on external public registries?**
A. Pulling all images directly from Docker Hub using public image names in Kubernetes manifests
B. Storing proprietary container images in the IONOS Private Container Registry within the same cloud environment, eliminating external registry dependencies
C. Embedding container images directly in the Kubernetes cluster's persistent storage
D. Using Block Storage volumes mounted to Kubernetes nodes to cache Docker images locally

**22. When should a company choose Red Hat OpenShift over IONOS Managed Kubernetes?**
A. When they need a simpler, lower-cost Kubernetes solution for basic container orchestration
B. When they need an enterprise-grade Kubernetes platform with integrated developer tools, built-in CI/CD pipelines, and enhanced security features, especially in regulated industries
C. When they need multi-cluster management across on-premises and cloud environments
D. When they need to manage containers on IONOS without paying for Kubernetes infrastructure

**23. What is the primary purpose of SUSE Rancher Prime on IONOS Cloud?**
A. Running individual Kubernetes clusters for single-application deployments
B. Providing centralized management of multiple Kubernetes clusters across different environments (cloud, on-premises, edge) with policy-driven governance
C. Replacing Managed Kubernetes with a free, open-source alternative
D. Providing GPU-accelerated Kubernetes nodes for AI/ML container workloads

**24. An NSG is described as a "stateful" firewall. What does "stateful" mean in this context?**
A. The firewall inspects the content of HTTP requests for malicious patterns
B. The firewall tracks connection state and automatically allows return traffic for established connections without requiring explicit outbound rules
C. The firewall maintains a persistent state file that must be manually backed up
D. The firewall logs all traffic state to an Object Storage bucket for auditing

**25. A company uses NSGs to enforce a three-tier security model. The web tier NSG allows HTTPS inbound from anywhere. The app tier NSG should only allow traffic from the web tier. The DB tier NSG should only allow traffic from the app tier. What IONOS concept enables this layered, least-privilege network security design?**
A. VPN Gateway ACL rules controlling traffic between tier subnets
B. Custom NSGs applied per-tier, with rules specifying the specific source IP ranges or VM groups permitted
C. Managed NAT Gateway SNAT rules blocking inter-tier communication by default
D. Cross Connect links between tier VDCs enforcing traffic isolation

**26. A company's security team needs to ensure that all web-facing services use up-to-date, valid SSL/TLS certificates and that certificates never expire without warning. Which IONOS service addresses this proactively?**
A. SSH Key Manager, which rotates cryptographic keys on a defined schedule
B. Certificate Manager with ACME-based auto-renewal, which automatically renews certificates before expiration from providers like Let's Encrypt
C. DDoS Protect Advanced, which includes certificate monitoring as part of proactive security management
D. Network Security Groups with TLS inspection rules

**27. Which statement about how Managed Kubernetes handles control plane maintenance is accurate?**
A. Customers must schedule and apply Kubernetes version upgrades manually through the DCD
B. IONOS automatically applies Kubernetes version upgrades and security patches to the control plane with no customer intervention required
C. Control plane updates require the customer to drain all worker nodes first
D. The control plane is shared between multiple customer clusters and updated during a global maintenance window

**28. AI Model Hub supports which types of pre-trained models, according to the available catalog?**
A. Large Language Models (text generation) only
B. Large Language Models (LLMs), Embedding Models (text-to-vector), Text-to-Image Models, and Specialized Coding Models
C. Computer vision models (image classification and object detection) only
D. LLMs and Speech-to-Text models for audio transcription

**29. A company wants to deploy an intelligent application that combines their proprietary product knowledge with a general-purpose LLM. They have 500 product manuals in PDF format. Which IONOS AI approach is most appropriate?**
A. AI Model Studio, to fine-tune the LLM by training it on all 500 product manuals
B. AI Model Hub RAG feature, which allows uploading document collections to create searchable embeddings that ground LLM responses in the specific product knowledge
C. Cloud GPU VMs with a self-hosted LLM, where the PDFs are stored in Object Storage
D. Managed Kubernetes with a custom retrieval pipeline deployed as a containerized service

**30. A startup is building a containerized microservices application on IONOS. They have a small DevOps team and want to minimize infrastructure management overhead for their Kubernetes cluster while retaining full administrator access to deploy and scale their applications. Which deployment option is most suitable?**
A. Self-managed Kubernetes on IONOS VMs, providing full control over every component
B. Red Hat OpenShift, which provides enterprise tooling the startup will need as it scales
C. IONOS Managed Kubernetes, which handles control plane management and updates automatically while giving the team full Kubernetes API access to manage workloads
D. SUSE Rancher Prime, which is designed for multi-cluster management across environments

---

## Answer Key

1. C — NSGs use a default-deny approach: any traffic not explicitly permitted by a security rule is automatically blocked, ensuring the most secure posture out of the box.

2. B — Network Security Groups allow a single security policy to be defined once and applied to multiple VMs or NICs across a VDC, eliminating the need to manage individual NIC-level firewall rules for each server.

3. B — When a VM is made a member of an NSG, all of its NICs automatically inherit the NSG's security rules, providing instant, consistent protection across all network interfaces on that VM.

4. C — DDoS Protect Basic is automatically enabled for all IONOS Cloud users at no additional cost and requires no configuration, providing baseline detection and traffic filtering against common volumetric attacks.

5. B — DDoS Protect defends against Layer 3 (Network) and Layer 4 (Transport) attacks such as UDP floods, SYN floods, and other volumetric and protocol-based attack patterns that overwhelm network infrastructure.

6. B — DDoS Protect Advanced adds 24/7 expert security support, proactive traffic monitoring, and on-demand IP-specific filtering or detailed attack diagnostics beyond the automatic protection provided by the Basic package.

7. B — Certificate Manager integrates with the Application Load Balancer (for TLS termination), CDN (for HTTPS delivery), and API Gateway, providing centralized certificate lifecycle management for these services.

8. C — Let's Encrypt is explicitly mentioned as a supported free ACME certificate authority for auto-renewal in IONOS Certificate Manager, alongside DigiCert, Sectigo, GlobalSign, and ZeroSSL.

9. C — SSH Key Manager in the IONOS DCD stores up to 100 public SSH keys centrally, which is a specific exam-critical limit that distinguishes it from unlimited external key management systems.

10. B — When a stored SSH public key is selected during VM creation, IONOS automatically injects the key into the VM's image before deployment, enabling immediate password-less SSH access without any manual key distribution step.

11. C — AI Model Hub is an inference service that provides API access to pre-trained foundation models (LLMs, embeddings, text-to-image) ready for immediate use, with no infrastructure to provision or manage.

12. B — AI Model Hub includes document collections management, embedding generation, and RAG (Retrieval-Augmented Generation) endpoints specifically designed to ground LLM answers in customer-provided document collections.

13. C — AI Model Hub uses token-based billing, where usage is metered by the number of tokens processed (input and output), providing transparent, consumption-proportional pricing aligned with actual API usage.

14. B — AI Model Studio allows fine-tuning of pre-trained models with domain-specific data (such as medical records and clinical notes) using the LoRA technique, creating models that understand specialized terminology and formats.

15. B — LoRA (Low-Rank Adapter) freezes the original model weights and inserts small trainable adapter matrices into the model architecture, so only a fraction of parameters are updated during fine-tuning — making the process efficient and resource-friendly.

16. B — Both AI Model Hub and AI Model Studio process and store all data in German data centers operated by IONOS, ensuring GDPR compliance and full data sovereignty without data leaving German jurisdiction.

17. B — With Managed Kubernetes, IONOS owns and operates the control plane, applies security patches and version upgrades, and manages the underlying infrastructure; customers focus on deploying container workloads using the Kubernetes API.

18. B — Using "vanilla" (standard open-source) Kubernetes ensures full compatibility with the broader Kubernetes ecosystem: standard Helm charts, kubectl, operators, CI/CD integrations, and community tools all work without modification.

19. B — Private Container Registry is IONOS's managed, authenticated Docker/OCI artifact store that provides scoped access-control tokens, encryption at rest, and seamless integration with Managed Kubernetes clusters.

20. B — IONOS Private Container Registry stores OCI-compliant artifacts, which includes Docker container images and Helm charts, providing a complete container artifact repository for Kubernetes deployments.

21. B — Storing images in the IONOS Private Container Registry eliminates external dependencies on Docker Hub or other public registries, keeps proprietary code private, enables fine-grained access control, and removes the risk of rate limits or public registry outages.

22. B — Red Hat OpenShift is chosen when an organization needs enterprise Kubernetes features: integrated CI/CD pipelines, developer self-service tooling, built-in security controls, and Red Hat's enterprise support — especially valuable in regulated industries.

23. B — SUSE Rancher Prime is a Kubernetes management platform for organizations that operate multiple clusters across different environments (cloud, on-premises, edge) and need centralized policy governance, multi-cluster visibility, and European data sovereignty.

24. B — A stateful firewall tracks the state of network connections; it automatically permits return traffic for established connections, so administrators only need to write rules for the initiating direction without managing explicit bidirectional rules.

25. B — Custom NSGs applied per-tier with rules restricting the allowed source IP ranges (e.g., app tier NSG accepts only traffic from the web tier's IP range) implements a layered, least-privilege security model aligned with the principle of minimal access.

26. B — Certificate Manager with ACME-based auto-renewal automatically renews certificates before expiration from providers like Let's Encrypt, eliminating the risk of expired certificates breaking HTTPS connections without manual intervention.

27. B — IONOS Managed Kubernetes automatically applies Kubernetes version upgrades and security patches to the control plane; customers do not need to schedule, test, or apply these updates themselves.

28. B — AI Model Hub provides access to four categories of pre-trained models: Large Language Models (text generation, chat), Embedding Models (semantic search, similarity), Text-to-Image Models (image generation), and Specialized Models (coding assistance).

29. B — AI Model Hub's RAG feature is ideal for this use case: upload the 500 product manuals to a document collection, generate embeddings for semantic search, and configure a RAG endpoint that retrieves relevant passages before generating LLM responses — no fine-tuning required.

30. C — IONOS Managed Kubernetes is the optimal choice for a small DevOps team: IONOS manages the control plane, applies updates automatically, and handles infrastructure, while the team retains full Kubernetes API administrator access to deploy, scale, and manage their application workloads.
