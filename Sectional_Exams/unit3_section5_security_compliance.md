# Unit 3 Section 5: Security and Compliance - Sectional Exam

**Coverage:** Shared responsibility model (Security OF vs IN the Cloud), DDoS protection, firewall rules and Network Security Groups (NSGs), compliance certifications (ISO 27001, SOC 2 Type II, GDPR, BSI C5, PCI DSS), digital sovereignty and the US CLOUD Act, data encryption (AES-256 at rest, TLS 1.2/1.3 in transit), Object Lock/WORM for compliance immutability, backup and disaster recovery concepts, Activity Logs as audit trails, key management
**Questions:** 30 | **Format:** Multiple Choice | **Time Estimate:** 25 minutes

---

**1. Under the IONOS Cloud shared responsibility model, which layer of the infrastructure is IONOS exclusively responsible for securing?**
A. Operating system patching and application security on virtual machines
B. User access management, IAM roles, and password policies
C. Physical data centers, network backbone, and the hypervisor layer
D. Data encryption decisions and firewall rule configuration within VDCs

**2. Under the IONOS Cloud shared responsibility model, which of the following is the CUSTOMER's responsibility?**
A. Maintaining the physical security of IONOS data centers in Germany and Spain
B. Patching and updating the hypervisor that runs underneath virtual machines
C. Patching the operating system and configuring security settings on deployed virtual machines
D. Ensuring the network backbone connecting IONOS regions operates securely

**3. A company deploys a web application on IONOS Cloud but fails to patch a known Linux vulnerability on their VMs. A breach occurs through that vulnerability. Who bears responsibility for this security failure?**
A. IONOS, because they manage all infrastructure security
B. The customer, because OS patching on VMs is the customer's responsibility under the shared responsibility model
C. Both equally, because the shared responsibility model divides OS management 50/50
D. Neither — cloud breaches via unpatched software are considered force majeure events

**4. Which IONOS Cloud compliance certification is the international standard for Information Security Management Systems (ISMS)?**
A. SOC 2 Type II
B. PCI DSS
C. BSI C5
D. ISO 27001

**5. What does the BSI C5 certification represent, and which government body created it?**
A. A US-based cloud security standard created by NIST for federal agencies
B. A European payment processing standard created by the EU Payment Council
C. A cloud computing compliance standard created by the German Federal Office for Information Security (BSI)
D. An international privacy standard created by the International Organization for Standardization (ISO)

**6. A German public sector agency requires its cloud provider to hold BSI C5 certification. Does IONOS Cloud qualify?**
A. No — IONOS Cloud holds ISO 27001 but not BSI C5
B. Yes — IONOS Cloud undergoes the required BSI C5 audits and has conformity confirmed by independent auditors
C. Yes — but only for customers in Germany; international customers cannot use BSI C5-certified services
D. No — BSI C5 only applies to German government agencies and is not available to private cloud providers

**7. Which compliance certification specifically addresses the security of payment card data processing and storage?**
A. ISO 27001
B. SOC 2 Type II
C. GDPR
D. PCI DSS

**8. How does IONOS Cloud's status as a German company protect customers from foreign government data access requests?**
A. IONOS stores all data in encrypted form that no government can decrypt
B. IONOS is not subject to the US CLOUD Act because it is a German company without a US parent entity; data access requires European legal processes only
C. IONOS has signed bilateral agreements with all foreign governments to reject data requests
D. IONOS routes all data through neutral Swiss infrastructure to maintain political neutrality

**9. Under the US CLOUD Act, US cloud providers can be compelled to provide access to customer data even if that data is stored outside the United States. Which IONOS characteristic makes it immune to this law?**
A. IONOS uses military-grade encryption that cannot be broken by any legal mandate
B. IONOS is a German company operating exclusively under European jurisdiction, not a US company or US subsidiary
C. IONOS stores data only in locations that have signed the CLOUD Act exemption treaty
D. IONOS encrypts data with customer-held keys that IONOS itself cannot access

**10. IONOS Cloud encrypts Block Storage volumes using which encryption standard?**
A. DES-128
B. RSA-2048
C. AES-XTS 256-bit encryption
D. ChaCha20-Poly1305

**11. All IONOS Cloud API endpoints and management interfaces (including the DCD) use which protocol to protect data in transit?**
A. IPSec only
B. SSH tunneling
C. TLS 1.2 or TLS 1.3
D. WEP/WPA2 encryption

**12. A customer deletes a Block Storage volume from IONOS Cloud. What happens to the encrypted data on that volume?**
A. The data remains on the physical disk until it is overwritten by new data from another customer
B. The deletion zeroes out the metadata and destroys the encryption key, rendering the encrypted data permanently unreadable
C. The data is archived in IONOS cold storage for 30 days before permanent deletion
D. IONOS Support must be contacted to confirm data deletion for compliance purposes

**13. IONOS Cloud Object Storage supports which encryption approach for data at rest?**
A. No built-in encryption — customers must encrypt data client-side before uploading
B. Server-side encryption using AES-256 (SSE-S3) and optionally Customer-Managed Keys (SSE-C)
C. AES-128 encryption applied only to objects larger than 1 GB
D. Symmetric encryption using customer-provided RSA public keys

**14. A financial services company backs up sensitive customer data to IONOS Cloud. They require that IONOS and their backup provider can NEVER access the decryption key. Which backup encryption option should they use?**
A. Server-side encryption (SSE-S3) where IONOS manages the encryption keys
B. No encryption — key management complexity introduces more risk than it prevents
C. Customer-side (client-side) encryption using a password-derived key, which IONOS and the backup provider (Acronis) never store
D. Platform-managed keys with a 90-day automatic rotation policy

**15. What is IONOS Object Lock (WORM) and what compliance use case does it address?**
A. A network security tool that blocks unauthorized write operations to VDC resources
B. A Write-Once-Read-Many storage feature that prevents objects from being modified or deleted, ensuring data immutability for compliance records (financial, medical, legal)
C. An IAM feature that locks user accounts after repeated failed login attempts
D. A DDoS protection mechanism that locks inbound traffic rules when an attack is detected

**16. Network Security Groups (NSGs) in IONOS Cloud represent which aspect of the shared responsibility model?**
A. IONOS provides the NSG platform capability; the customer is responsible for configuring the specific firewall rules
B. IONOS configures all NSG rules automatically based on the deployed resource type
C. NSGs are entirely the customer's responsibility — IONOS provides no platform support for firewall management
D. NSGs are entirely IONOS's responsibility — customers cannot modify security group rules

**17. SOC 2 Type II certification is different from SOC 2 Type I because it verifies which additional aspect?**
A. It verifies more service categories (security, availability, confidentiality, privacy, and processing integrity vs. just security)
B. It is performed by an internal audit team instead of an independent auditor
C. It verifies that security controls operated effectively over a defined period of time, not just that they were designed correctly
D. It is a self-attestation certification, whereas Type I requires independent verification

**18. GDPR requires that personal data of EU citizens be processed in compliance with which key principles? (Choose the best answer.)**
A. Data must be encrypted with customer-managed keys and stored exclusively in German data centers
B. Data protection requires appropriate technical and organizational measures, including data residency controls and encryption; IONOS Cloud provides EU-based infrastructure to support this
C. All data processing must be approved by the European Data Protection Board before cloud deployment
D. GDPR compliance requires annual third-party audits of all customer application code

**19. A healthcare application deployed on IONOS Cloud must comply with regulations requiring audit trails of all patient data access. Which IONOS service provides this audit trail?**
A. Flow Logs — they capture all data access events at the network level
B. Monitoring Service — it tracks resource utilization that correlates with data access
C. Activity Logs — they record all user actions including data access events with timestamps and user identities
D. Logging Service — it centralizes application logs that include patient data access records

**20. Which of the following correctly describes the encryption applied to IONOS Cloud Block Storage?**
A. Encryption is optional and must be enabled manually by the customer after provisioning
B. All Block Storage volumes are automatically encrypted using AES-XTS 256-bit encryption, with optional drive-level encryption as an additional layer
C. Encryption is available only on SSD Premium volumes; HDD volumes are stored unencrypted
D. Block Storage uses AES-128 encryption, with AES-256 available as a paid upgrade option

**21. A company experiences a suspected data breach. The forensic team needs to trace the sequence of events: which user accounts were active, what changes were made, and from which IP addresses. Which IONOS service provides this chain of evidence?**
A. Flow Logs — they show which IP addresses connected to which resources
B. Activity Logs — they provide a tamper-proof, chronological record of all user actions, resource changes, and source IP addresses
C. Monitoring Service — it shows performance anomalies that indicate a breach
D. Logging Service — it stores application-level access logs from the breached systems

**22. Physical drives removed from IONOS data centers contain encrypted data. Can this data be read by someone who physically possesses the drive?**
A. Yes — physical possession of a drive provides access to the raw data regardless of encryption
B. Yes — but only with specialized hardware that can bypass the encryption layer
C. No — the encryption keys are bound to the infrastructure, so physically removed drives remain unreadable without the key
D. No — IONOS uses a one-time-pad encryption that mathematically prevents decryption without the infrastructure context

**23. IONOS Cloud data centers are located in which European countries, supporting digital sovereignty?**
A. Germany and France
B. Germany (Berlin, Frankfurt) and Spain (Logroño)
C. Germany and the Netherlands
D. Germany, France, and Spain

**24. An e-commerce company processes credit card payments and deploys their payment application on IONOS Cloud. Under the shared responsibility model and PCI DSS, which security controls remain the customer's responsibility?**
A. The customer has no PCI DSS responsibilities — IONOS's certification covers the entire stack
B. The customer must ensure their application code, data handling practices, and access controls also meet PCI DSS requirements; IONOS secures only the underlying infrastructure
C. The customer is responsible only for physical card reader security; all digital processing is covered by IONOS
D. The customer must apply for PCI DSS certification independently with no help from IONOS infrastructure certification

**25. Which IONOS Cloud service or feature is specifically recommended for immutable, long-term retention of compliance records that must never be altered or deleted?**
A. Activity Logs stored in the DCD
B. IONOS Cloud Object Lock (WORM — Write-Once-Read-Many) applied to an Object Storage bucket
C. Encrypted snapshots with automated deletion prevention
D. Flow Logs written to a dedicated compliance Object Storage bucket

**26. In the IONOS shared responsibility model, what does "Security OF the Cloud" refer to?**
A. The security controls customers apply to their workloads and data
B. The encryption keys customers use to protect their application data
C. IONOS's responsibility for the physical infrastructure, hardware, hypervisor, and platform services
D. The compliance certifications customers must obtain for their own applications

**27. An organization's IONOS Cloud infrastructure is certified ISO 27001. A new team member asks if this means their application is automatically ISO 27001 compliant. What is the correct response?**
A. Yes — running on ISO 27001-certified infrastructure means the entire stack is compliant automatically
B. No — ISO 27001 certification covers IONOS's infrastructure layer; the customer must implement their own appropriate security controls to claim compliance for their application
C. Yes — as long as the application is deployed in the Frankfurt or Berlin region, it inherits the certification
D. No — ISO 27001 is only relevant for the payment card industry and has no bearing on application compliance

**28. Which encryption protocol versions does IONOS Cloud use to protect data in transit across all services?**
A. SSL 3.0 and TLS 1.0
B. TLS 1.0 and TLS 1.1
C. TLS 1.2 and TLS 1.3
D. TLS 1.3 exclusively, with TLS 1.2 deprecated

**29. What happens to IONOS Object Storage data when an object is deleted?**
A. The object is moved to a "Deleted Items" folder and recoverable for 30 days
B. The deletion removes metadata and follows NIST SP 800-88 guidelines, making the data unrecoverable
C. The object is archived in IONOS cold storage automatically
D. The data remains on disk in an encrypted state until the physical drive is retired

**30. A company's security policy requires that all cloud resources be protected by firewall rules. Under the IONOS shared responsibility model, what is the division of responsibility for Network Security Group (NSG) firewall rules?**
A. IONOS creates and manages all NSG rules based on the resource type; customers only review them
B. Customers create and manage all NSG rules without any platform tooling from IONOS
C. IONOS provides NSGs as a platform capability (Security OF the Cloud) and the customer configures the specific rules that apply to their resources (Security IN the Cloud)
D. Firewall rules are managed jointly through a shared IONOS-customer governance committee

---

## Answer Key

1. C — IONOS is exclusively responsible for the physical data centers, network backbone availability, hardware, and the hypervisor layer — collectively referred to as "Security OF the Cloud."

2. C — Patching operating systems and configuring security settings on deployed VMs is the customer's responsibility under the shared responsibility model, classified as "Security IN the Cloud."

3. B — Under the shared responsibility model, OS-level security (including patching) is the customer's responsibility; IONOS is not responsible for vulnerabilities in customer-managed operating systems.

4. D — ISO 27001 is the international standard for Information Security Management Systems (ISMS), establishing systematic approaches to managing sensitive data security risks.

5. C — BSI C5 (Cloud Computing Compliance Criteria Catalogue) was created by the German Federal Office for Information Security (Bundesamt für Sicherheit in der Informationstechnik), covering 17 areas of cloud security.

6. B — IONOS Cloud undergoes the required BSI C5 audits and has received conformity confirmation from independent auditors, making it compliant for German public sector and critical infrastructure use cases.

7. D — PCI DSS (Payment Card Industry Data Security Standard) is specifically designed to protect payment card data during processing, storage, and transmission.

8. B — As a German company without a US parent entity, IONOS operates exclusively under European jurisdiction and is not subject to the US CLOUD Act, which only applies to US-based companies.

9. B — The US CLOUD Act applies to US companies and their subsidiaries; since IONOS is a German company with no US parent entity, it operates outside the CLOUD Act's jurisdiction.

10. C — IONOS Cloud Block Storage volumes are encrypted using AES-XTS 256-bit encryption, with optional drive-level encryption providing a second layer via self-encrypting drives (SEDs).

11. C — All IONOS Cloud API endpoints, the DCD management interface, and Object Storage endpoints are protected with TLS 1.2 or TLS 1.3 encryption.

12. B — Deleting a Block Storage volume zeroes out the metadata and destroys the encryption key; without the key, the encrypted data is permanently and irrecoverably unreadable, following NIST SP 800-88 guidelines.

13. B — IONOS Cloud Object Storage provides Server-Side Encryption using IONOS-managed keys (SSE-S3) with AES-256, as well as an optional Customer-Managed Keys (SSE-C) option.

14. C — Customer-side encryption using a password-derived key (AES-256) ensures that neither IONOS nor the backup provider (Acronis) ever stores or has access to the decryption key.

15. B — Object Lock (WORM) is a Write-Once-Read-Many storage feature that prevents objects from being modified or deleted after writing, making it ideal for compliance records in financial, medical, and legal contexts.

16. A — NSGs represent a shared control: IONOS provides Network Security Groups as a platform capability, but customers are responsible for configuring the specific firewall rules that protect their own resources.

17. C — SOC 2 Type II distinguishes itself by verifying that security controls operated effectively over a defined observation period (typically 6–12 months), not just that they were properly designed.

18. B — GDPR requires appropriate technical and organizational measures for protecting EU personal data; IONOS Cloud's EU-based infrastructure (Germany and Spain) and encryption capabilities support customers in meeting these requirements.

19. C — Activity Logs record all user actions including data access events with precise timestamps and user identities, providing the audit trail required by healthcare regulations like HIPAA.

20. B — All IONOS Block Storage volumes are automatically encrypted using AES-XTS 256-bit, with an optional second layer of drive-level AES-XTS 256-bit encryption via self-encrypting drives on SSD Premium and Standard volumes.

21. B — Activity Logs provide the tamper-proof, chronological chain of evidence needed for forensic investigations, including which users performed actions, what those actions were, and from which IP addresses.

22. C — Encryption keys in IONOS are bound to the infrastructure itself; a drive removed from the data center cannot be decrypted because the keys are securely stored within and tied to the IONOS infrastructure.

23. B — IONOS Cloud data centers are located in Germany (Berlin and Frankfurt) and Spain (Logroño), providing EU-based data residency to support GDPR compliance and digital sovereignty.

24. B — PCI DSS is a shared responsibility; IONOS secures the infrastructure layer, but customers must ensure their application code, data handling, access controls, and other practices also meet PCI DSS requirements.

25. B — IONOS Cloud Object Lock (WORM) is specifically designed for compliance-driven immutable storage, preventing records from being altered or deleted for defined retention periods.

26. C — "Security OF the Cloud" refers to IONOS's responsibility for the physical infrastructure, hardware, hypervisor, and platform services that form the foundation of all cloud services.

27. B — Running on ISO 27001-certified infrastructure means IONOS's infrastructure layer is certified; customers must implement appropriate security controls for their own application layer to claim compliance.

28. C — IONOS Cloud uses TLS 1.2 and TLS 1.3 to protect data in transit across all services including API endpoints, management interfaces, and Object Storage.

29. B — Deleting objects from IONOS Object Storage removes metadata and follows NIST SP 800-88 secure deletion guidelines, making the deleted data unrecoverable.

30. C — NSGs exemplify a shared control: IONOS provides the NSG platform capability as part of "Security OF the Cloud," while configuring the specific rules for each resource is the customer's "Security IN the Cloud" responsibility.
