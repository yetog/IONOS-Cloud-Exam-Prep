# Unit 3 Section 1: Data Center Designer and Account Management - Sectional Exam

**Coverage:** DCD interface modes, Virtual Data Center management, resource provisioning methods (DCD vs API vs Terraform), account types (Contract Owner / Administrator / User), account hierarchy, multi-contract management, password policy, 2FA, and Support PIN
**Questions:** 30 | **Format:** Multiple Choice | **Time Estimate:** 25 minutes

---

**1. What is the primary purpose of the Data Center Designer (DCD) in IONOS Cloud?**
A. A command-line tool for deploying Terraform templates
B. A web-based graphical interface for visually creating and managing Virtual Data Centers and cloud resources
C. A billing dashboard that tracks monthly resource consumption
D. An API gateway that routes requests to the correct IONOS backend service

**2. Which DCD mode is best suited for a power user who needs full control over a complex, custom multi-tier architecture?**
A. Xpress Mode, because it provides a step-by-step wizard
B. Blueprint Mode, because it generates Infrastructure as Code automatically
C. Canvas Mode, because it offers complete drag-and-drop freedom for resource placement and configuration
D. Inspector Mode, because it exposes all resource properties simultaneously

**3. A junior cloud engineer needs to quickly spin up a standard virtual machine with storage and networking for a development task. Which DCD mode is most appropriate?**
A. Canvas Mode
B. Xpress Mode
C. API-only provisioning
D. Terraform provider mode

**4. Which of the following statements about the Contract Owner account is accurate?**
A. The Contract Owner can be promoted or demoted by an Administrator
B. The Contract Owner role can be transferred to another user by opening a support ticket
C. The Contract Owner is the only account type that can change the payment method on the contract
D. The Contract Owner must approve every resource provisioning action performed by Administrators

**5. An Administrator in IONOS Cloud attempts to update the credit card on file for the contract. What will happen?**
A. The action will succeed because Administrators have full access to all contract settings
B. The action will fail — only the Contract Owner can change payment information
C. The action will require two-factor authentication before proceeding
D. The action will trigger a support ticket automatically

**6. A newly created User account is added to an IONOS Cloud contract. Without any group membership or direct privilege assignment, what can this user do?**
A. View all resources in the contract in read-only mode
B. Create and delete resources but cannot modify billing settings
C. Nothing — a new User has zero default permissions following the Principle of Least Privilege
D. Access the DCD dashboard but cannot provision any paid resources

**7. Which security principle does IONOS Cloud enforce for newly created User accounts?**
A. Separation of Duties
B. Defense in Depth
C. Principle of Least Privilege (PoLP)
D. Zero-Knowledge Architecture

**8. A company has 40 developers who all need the same set of privileges to manage compute resources in a specific VDC. What is the recommended approach in IONOS Cloud?**
A. Grant each developer Administrator rights to ensure they have sufficient access
B. Create a Group, assign the required privileges to the group, and add all 40 developers to it
C. Assign privileges directly to each developer individually for the most granular control
D. Create a subcontract for the developers so they cannot interfere with production resources

**9. When resources are provisioned via the IONOS Cloud API or Terraform (not the DCD GUI), how does the DCD display the resulting infrastructure?**
A. The DCD does not display resources created outside of the GUI
B. The DCD shows the topology but the visual layout may be stacked since programmatic creation does not control graphical placement
C. The DCD displays the resources only after a manual import command is run
D. The DCD generates an automatic diagram and arranges resources alphabetically

**10. Which of the following is a key advantage of using IONOS Cloud's DCD over a purely CLI/API-based approach for infrastructure management?**
A. The DCD is faster than the API for provisioning large numbers of VMs simultaneously
B. The DCD provides a visual canvas that helps with troubleshooting, documentation, and understanding how components are interconnected
C. Resources created in the DCD receive higher resource limits than those created via API
D. The DCD automatically applies security best practices and firewall rules

**11. A Contract Owner configures a password policy requiring a minimum of 12 characters and at least one special character. Who does this policy apply to?**
A. Only to the Contract Owner's own account
B. Only to newly created users — existing users retain their current passwords until they next log in
C. Only to Administrator accounts
D. To all users on the contract when they next set or change their password

**12. Which account type is created automatically when an organization first registers for IONOS Cloud?**
A. Administrator
B. Contract Owner
C. Root User
D. Super Admin

**13. A managed service provider (MSP) manages cloud infrastructure for 10 different clients. Which IONOS Cloud feature allows the MSP to maintain separate, isolated cloud environments for each client under centralized billing?**
A. Resource Groups with client-specific tags
B. Separate IONOS accounts, one per client, with no billing relationship
C. Subcontracts, which the MSP's Contract Owner creates for each client
D. Virtual Data Centers, with one VDC assigned per client

**14. A user who belongs to the "Network Team" group (which has View access on the production VDC) is also directly granted Edit access on the same VDC by the Contract Owner. What level of access does the user effectively have?**
A. View — group policies always take precedence over individual grants
B. No access — conflicting permissions result in a lockout
C. Edit — IONOS IAM permissions are additive; the highest granted privilege wins
D. View — individual grants cannot exceed what the group allows

**15. Which component of the DCD interface allows a user to configure properties such as CPU cores, RAM, storage size, and operating system for a resource after placing it on the canvas?**
A. The Palette
B. The Inspector Pane
C. The Blueprint Editor
D. The Resource Overview

**16. Two-Factor Authentication (2FA) in IONOS Cloud requires which of the following as the second factor?**
A. A hardware security key (FIDO2/YubiKey)
B. A time-based one-time code generated by an authenticator app on a mobile device
C. An SMS text message sent to the registered phone number
D. A secondary email confirmation link

**17. An Administrator wants to enforce 2FA for a specific sub-user. Where in the DCD is this setting configured?**
A. Menu > Your Profile > Password & Security
B. Menu > Management > Cost Alert
C. Menu > Management > Users & Groups > select the user > Meta Data tab > Force 2-Factor Auth
D. Menu > Management > Token Manager > Enforce MFA

**18. What is the purpose of the Support PIN in IONOS Cloud?**
A. It is used as a second factor for logging into the DCD
B. It is required to authenticate API calls when 2FA is enabled
C. It is a code used to verify the user's identity when contacting IONOS Cloud Support by phone
D. It encrypts the user's SSH keys stored in the SSH Key Manager

**19. A Contract Owner deletes the active password policy for their contract. What happens to the password requirements?**
A. All user passwords are immediately invalidated and must be reset
B. The contract reverts to IONOS default standards, which require at least 5 characters
C. The contract inherits the password policy of its parent reseller account
D. Users are permanently locked out until a new policy is configured

**20. Which of the following infrastructure-as-code tools is explicitly mentioned as integrating with the IONOS Cloud DCD?**
A. Chef and Puppet
B. Ansible, Terraform, and the IONOS Cloud API
C. Jenkins and GitHub Actions
D. Packer and Vagrant

**21. An Administrator is promoted to their role by the Contract Owner. Which of the following actions can the Administrator NOT perform?**
A. Create and delete Virtual Data Centers
B. Add or remove standard user accounts
C. Change the payment method or billing information for the contract
D. View and manage all cloud resources across the contract

**22. The DCD "contract selector" is used primarily for which purpose?**
A. Switching between Canvas Mode and Xpress Mode
B. Selecting which resource type to provision next
C. Switching between different contracts or subcontracts the user has access to
D. Filtering the resource palette by contract region

**23. Which of the following correctly describes the relationship between resource limits and quotas in IONOS Cloud?**
A. Quotas are higher than resource limits; quotas represent the platform maximum
B. Resource limits are hard platform maximums; quotas are the contract-specific allowances, which may be lower
C. Resource limits and quotas are identical terms referring to the same value
D. Quotas can be exceeded by the Contract Owner at any time without requesting a change

**24. A security analyst needs read-only access to Activity Logs and Flow Logs for auditing purposes but should not be able to modify any infrastructure. What approach should the Administrator take?**
A. Grant the analyst Administrator rights so they can access all areas of the contract
B. Create a User account and explicitly assign only the read privileges needed for Activity Logs and Flow Logs
C. Share the Contract Owner's credentials with the analyst under a confidentiality agreement
D. Add the analyst to the Administrator group with a time-limited expiration

**25. Which statement best describes what happens after infrastructure is provisioned through the DCD?**
A. Resources are provisioned immediately and the canvas updates in real time
B. Resources enter a pending queue and are provisioned in alphabetical order
C. After clicking "Provision," the visual canvas design is materialized in the cloud
D. A support ticket is created, and IONOS engineers manually deploy the resources

**26. A user enables 2FA on their IONOS account. From that point forward, how must they authenticate API calls from automation scripts?**
A. They can continue using username and password — 2FA only applies to browser logins
B. They must disable 2FA and re-enable it each time they need API access
C. They must generate a Bearer token via Token Manager and include it in the API Authorization header
D. They must use their SSH private key as the API authentication credential

**27. A reseller Contract Owner creates a Cloud Savings Plan for their main contract. Can this plan be transferred to a subcontract?**
A. Yes, Savings Plans can be freely transferred between any subcontracts
B. No — Savings Plans created at the reseller level cannot be transferred to a subcontract
C. Yes, but only if both contracts are in the same region
D. No — Savings Plans are bound to individual VMs and cannot be moved

**28. Which of the following is TRUE about the Contract Owner role?**
A. The Contract Owner role can be revoked by an Administrator
B. The Contract Owner is always the most recently promoted Administrator
C. The Contract Owner receives all legal communications such as invoices and contract terms updates
D. There can be multiple Contract Owners on a single contract

**29. What is the maximum recommended minimum password length defined by IONOS Cloud's recommended password policy?**
A. 6 characters
B. 8 characters
C. 9–12 characters
D. 16 characters

**30. A large enterprise wants to give different teams different levels of access to specific VDCs without using Administrator rights. What is the correct IONOS IAM mechanism to achieve this?**
A. Create separate contracts for each team
B. Use Groups with resource-level permissions (View, Edit, Share) assigned to specific VDCs
C. Set up IAM Federation with a single shared login for each team
D. Assign the "Power User" role to team leads who can then self-serve their permissions

---

## Answer Key

1. B — The DCD is IONOS Cloud's web-based graphical control panel for visually designing and managing VDCs and all cloud resources via a drag-and-drop canvas.

2. C — Canvas Mode gives power users complete freedom to place and connect every element, making it ideal for complex, custom architectures.

3. B — Xpress Mode is a guided wizard designed specifically for quickly spinning up standard IaaS workloads without the full complexity of Canvas Mode.

4. C — The Contract Owner is the only account type with the exclusive right to change payment methods; this is the critical financial distinction from the Administrator role.

5. B — Changing payment information is exclusively reserved for the Contract Owner; Administrators have full operational access but this specific financial capability is blocked.

6. C — Newly created Users have zero default permissions; IONOS enforces the Principle of Least Privilege, requiring all access to be explicitly granted.

7. C — The Principle of Least Privilege (PoLP) ensures that users start with no access and are only granted the minimum permissions needed for their specific job function.

8. B — Creating a Group and assigning privileges to the group is the recommended scalable approach; all 40 developers inherit those privileges automatically and management is simplified.

9. B — The DCD displays the topology of API/Terraform-created resources, but the visual layout may appear stacked since programmatic creation does not control graphical positioning.

10. B — The DCD's visual canvas provides a blueprint-like diagram of infrastructure that aids troubleshooting, documentation, and understanding component interconnections.

11. D — Password policies apply contract-wide; all users must meet the policy requirements when they next set or change their password.

12. B — The Contract Owner is the first user to register the contract and is automatically assigned all privileges; this role is created at account registration.

13. C — Subcontracts allow a reseller Contract Owner to create separate, isolated cloud environments for each client while maintaining centralized billing and oversight.

14. C — IONOS IAM permissions are additive; when a user receives "View" from a group and "Edit" directly, the highest privilege (Edit) takes effect.

15. B — The Inspector Pane opens when you click any element on the canvas and is where resource properties such as CPU, RAM, and OS image are configured.

16. B — IONOS 2FA uses time-based one-time codes (TOTP) generated by an authenticator app (such as Google Authenticator or Authy), not SMS or hardware keys.

17. C — Forcing 2FA for a sub-user is done in Menu > Management > Users & Groups, selecting the user, and checking "Force 2-Factor Auth" in the Meta Data tab.

18. C — The Support PIN is specifically used to verify a user's identity when contacting IONOS Support by phone, protecting against social engineering attacks.

19. B — Deleting the password policy causes the account to revert to IONOS default standards, which require a minimum of 5 characters.

20. B — The study material explicitly mentions Terraform, Ansible, and the IONOS Cloud API as tools that integrate with the DCD for hybrid visual/programmatic management.

21. C — Changing payment or billing information is exclusively reserved for the Contract Owner; an Administrator cannot perform this action regardless of their other privileges.

22. C — The contract selector (typically in the top-right of the DCD) allows users to switch between different contracts or subcontracts they have access to.

23. B — Resource limits are the hard platform maximums (e.g., 256 vCPUs per VM) while quotas are the contract-specific allocations that may be lower than the platform ceiling.

24. B — The correct approach is to create a dedicated User account and explicitly assign only the read permissions needed, following the Principle of Least Privilege.

25. C — After arranging resources on the canvas and clicking "Provision," the visual design is materialized as actual cloud infrastructure.

26. C — When 2FA is enabled, standard password-based API authentication is blocked; users must generate a Bearer token via Token Manager for all API requests.

27. B — Savings Plans created at the reseller contract level cannot be transferred to subcontracts; they remain bound to the contract where they were created.

28. C — The Contract Owner receives all legal communications including invoices and contract terms updates, which is one of their exclusive responsibilities.

29. C — IONOS Cloud's recommended password policy specifies a minimum length of 9–12 characters along with uppercase, lowercase, digit, and special character requirements.

30. B — Groups with resource-level permissions (View, Edit, Share) assigned to specific VDCs is the correct mechanism for team-based, fine-grained access control without using Administrator rights.
