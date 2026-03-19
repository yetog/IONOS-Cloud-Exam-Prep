# IONOS Cloud Foundational Certification - Unit 3 Study Guide: Management & Operations

This study guide covers the management, governance, and operational services of IONOS Cloud.

## 3.1 Data Center Designer (DCD) and Account Management
- **Data Center Designer (DCD)**: IONOS Cloud's web-based graphical user interface (GUI). Allows drag-and-drop visual design of Virtual Data Centers (VDCs), servers, storage, and networking.
  - **Canvas Mode**: Full drag-and-drop freedom for complex architectures.
  - **Xpress Mode**: Wizard-driven for fast, standard VM deployments.
- **Account Types**:
  - **Contract Owner**: Full unrestricted access. Only account that can change payment info/billing. Cannot be deleted or transferred.
  - **Administrator**: Full operational access to resources (view, edit, delete) and user management, but cannot change payment information.
  - **User**: No default privileges. Operates on the **Principle of Least Privilege (PoLP)**. Must be explicitly granted privileges.
- **Groups**: Best practice for managing permissions at scale. You assign specific privileges to a group, and users inherit those privileges.
- **Security Settings**:
  - **Password Policy**: Defined by Contract Owner, applies to all users.
  - **Two-Factor Authentication (2FA)**: Adds a second layer of security via authenticator app. Administrators can force 2FA for users.
  - **Support PIN**: A code required to verify your identity when calling IONOS Support.

## 3.2 Identity and Access Management (IAM)
- **RBAC (Role-Based Access Control)**: Framework for managing user actions based on explicit privileges (e.g., "Create VDCs", "Manage Databases").
- **Resource-Level Access**: Control visibility of specific resources (VDCs, backups, IP blocks) by assigning them to groups (View, Edit, Share permissions).
- **Token Manager**: Used to generate short-lived Bearer tokens (JWTs) for authenticating API requests instead of using passwords.
  - *If a user has 2FA enabled, they MUST use Token Manager for API access.*
- **IAM Federation / SSO**: Allows integration with corporate Identity Providers (IdP) like Azure AD or Okta via SAML 2.0 or OpenID Connect. Simplifies user lifecycle management and centralizes login.

## 3.3 Cost Management and Billing
- **Cost and Usage Dashboard**: Visually displays resource consumption, breaking down costs by service category or VDC.
- **Cost Alerts**: Email notifications sent *once* when the contract's net invoice amount reaches a defined threshold. They do *not* stop or shut down resources automatically.
- **Pricing Models**:
  - **Pay-Per-Use (PAYG)**: Hourly billing based on actual consumption with no upfront commitment. Best for variable, unpredictable workloads.
  - **Cloud Savings Plans**: Commit to specific resource quantities (CPU cores, RAM) for 1 or 3 years. Offers substantial discounts (30-40%). Applied across any combination of VMs/Regions.
- **Limits vs. Quotas**:
  - **Resource Limits**: Hard platform maximums (e.g., 256 vCPUs max per VM).
  - **Quotas**: Your specific contract's allowance. Viewable in the "Resource Overview" to check current consumption against your contract quota.
- **Billing API**: Allows automated retrieval of invoices, itemized usage data, and programmatic Cost Alert management.

## 3.4 Activity Logs and Monitoring (Observability)
Four main observability services:
1. **Activity Logs**: Tracks *user actions* across the contract (who created a VM, who deleted a snapshot, who changed a firewall rule, login attempts). Immutable (read-only), chronological audit trail for security/compliance.
2. **Flow Logs**: Tracks *network traffic* traversing NICs, NAT Gateways, or Load Balancers. Logs source/dest IPs, ports, protocols, and whether the firewall Accepted/Rejected it. Stored in IONOS Object Storage.
3. **Monitoring Service**: Tracks system and application *performance metrics* (CPU %, RAM, disk I/O, latency). Centralized in Grafana with customizable dashboards and rule-based alerts.
4. **Logging Service**: Centralizes *application and system logs* across your infrastructure. Uses Fluent Bit agents on the VMs to forward logs securely to the backend. Visualized in Grafana.

## 3.5 Security and Compliance
- **Shared Responsibility Model**:
  - **IONOS (Provider) Responsibility**: Physical security of data centers, network backbone availability, hypervisor layer, and hardware patching (Security *OF* the Cloud).
  - **Customer Responsibility**: Operating System patching, application code, data encryption, user access management, firewall rule configuration (Security *IN* the Cloud).
- **Compliance & Certifications**:
  - **ISO 27001**: International standard for Information Security Management Systems.
  - **SOC 2 Type II**: Verified controls for security, availability, and processing integrity over time.
  - **GDPR**: EU Data Protection Law. IONOS is fully compliant and hosts data in the EU to ensure digital sovereignty.
  - **PCI DSS**: Standard for processing payment card data (available as an optional compliance offering).
  - **BSI C5**: Strict German cloud security criteria.
  - **Digital Sovereignty**: As a German company, IONOS is *not* subject to the US CLOUD Act. Data cannot be accessed by foreign governments without European legal due process.
- **Encryption at Rest**:
  - Block storage, backups, and Object Storage are encrypted at rest using AES-256.
  - Keys are generally platform-managed and securely bound to the infrastructure.
- **Encryption in Transit**: Internal APIs, Object Storage endpoints, and VPN tunnels are protected with TLS 1.2/1.3.

---

## Unit 3 Practice Quiz

**1. Which statement best describes the key difference between an Administrator and a Contract Owner in IONOS Cloud?**
A. Administrators can create subcontracts for customers, but the Contract Owner cannot.
B. Administrators have full operational access to all resources but cannot change the payment method, while the Contract Owner can.
C. Administrators can view all resources but must request explicit permission to edit them.
D. Administrators and Contract Owners have identical rights across all areas of the account.
*Answer: B*
*Explanation: The Contract Owner has exclusive control over billing and payment, while Administrators have the same operational rights for managing resources and users but cannot modify financial settings.*

**2. A developer has Two-Factor Authentication (2FA) enabled on their IONOS Cloud account and needs to authenticate API calls from an automation script. What is the correct approach?**
A. Disable 2FA temporarily to allow the script to use a username and password for authentication.
B. Ask an Administrator to disable 2FA enforcement for API-only accounts.
C. Generate a Bearer token via the Token Manager and include it in the Authorization header of each API request.
D. Use the SSH Key Manager to generate a key pair for the automation script.
*Answer: C*
*Explanation: If 2FA is enabled, standard password authentication via the API is blocked. You must use Token Manager to generate an API token.*

**3. A Cost Alert is configured with a threshold of $1,000. Your contract reaches $1,000 in charges, triggering an email notification. Spending then continues to $1,200. How many total email notifications does the alert send?**
A. One - Cost Alerts trigger only once per threshold breach.
B. Two - the alert fires at $1,000 and again when charges increase by another 20%.
C. Zero - Cost Alerts do not send emails.
*Answer: A*
*Explanation: Cost Alerts fire only once when the threshold is crossed to prevent email spam.*

**4. A security analyst is investigating a potential data breach and needs to determine which user account performed specific configuration changes on a virtual machine last Tuesday. Which IONOS Cloud service provides this information?**
A. Flow Logs
B. Monitoring Service
C. Activity Logs
D. Logging Service
*Answer: C*
*Explanation: Activity Logs provide an immutable audit trail of user-initiated actions (who did what, and when).*

**5. Under the IONOS Cloud shared responsibility model, which of the following is the customer's responsibility?**
A. Maintaining the physical security of data centers in Germany and Spain.
B. Configuring operating system security settings and managing access controls on deployed virtual machines.
C. Patching and updating the hypervisor layer that runs underneath virtual machines.
D. Ensuring the network backbone connecting IONOS data centers operates securely.
*Answer: B*
*Explanation: The customer is responsible for what they deploy and manage *in* the cloud, such as OS-level security, application security, and IAM role configuration.*
