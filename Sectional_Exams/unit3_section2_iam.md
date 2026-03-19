# Unit 3 Section 2: Identity and Access Management - Sectional Exam

**Coverage:** IONOS RBAC model (Contract Owner / Administrator / User roles), Groups and Users management, resource-level permissions (View / Edit / Share), Token Manager and Bearer tokens, 2FA enforcement, IAM Federation / SSO (SAML 2.0, OpenID Connect), S3 keys, least privilege principle, and IAM security best practices
**Questions:** 30 | **Format:** Multiple Choice | **Time Estimate:** 25 minutes

---

**1. What does RBAC stand for in the context of IONOS Cloud Identity and Access Management?**
A. Resource-Based Access Control
B. Role-Based Access Control
C. Rule-Based Authorization Configuration
D. Registry-Bound Access Credentials

**2. In IONOS Cloud's three-tier role system, which role has full unrestricted access including the ability to change payment methods?**
A. Super Administrator
B. Administrator
C. Contract Owner (Account Owner)
D. Privileged User

**3. Which of the following is the key operational difference between a Contract Owner and an Administrator in IONOS Cloud IAM?**
A. Administrators can create subcontracts; the Contract Owner cannot
B. Administrators can view all resources but must request edit access; the Contract Owner can edit freely
C. Administrators cannot change the payment method; the Contract Owner can
D. Administrators are limited to one region; the Contract Owner manages globally

**4. A new user account is created in IONOS Cloud. Before any groups or privileges are assigned, which resources can the user access?**
A. All resources in read-only mode
B. Only resources in the user's home region
C. Resources they personally created
D. No resources — the user has zero default permissions

**5. What is the primary benefit of using Groups over direct individual permission assignments in IONOS Cloud?**
A. Groups automatically elevate users to Administrator level for efficiency
B. Groups allow you to assign privileges collectively and manage team access by simply adding or removing members
C. Groups bypass the Principle of Least Privilege to speed up onboarding
D. Groups are the only way to grant access to Object Storage resources

**6. A user is a member of the "DevOps" group, which has Edit privileges on a specific VDC. The Contract Owner also directly assigns the user View privilege on the same VDC. What is the user's effective permission level?**
A. View — the most restrictive permission always wins
B. Edit — IONOS permissions are additive; the highest granted privilege takes effect
C. No access — conflicting permissions cancel each other out
D. Edit — but only for 24 hours after the direct assignment

**7. What are the three resource-level permission types available in IONOS Cloud when sharing a resource with a group?**
A. Read, Write, Execute
B. View, Edit, Share
C. Get, Post, Delete
D. Viewer, Editor, Owner

**8. A Contract Owner creates a new Virtual Data Center. By default, which other users can see it?**
A. All Administrators and users in the contract
B. All users who belong to at least one group
C. No other users — the resource is hidden until explicitly shared with at least one group
D. All users with at least View privileges on any resource in the contract

**9. Token Manager in IONOS Cloud generates which type of token for API authentication?**
A. OAuth 1.0 Request Tokens
B. SAML Assertions
C. Bearer tokens (JSON Web Tokens / JWTs)
D. API Key pairs (public/private)

**10. A developer has Two-Factor Authentication (2FA) enabled on their IONOS account and needs their automation script to make API calls. What is the correct authentication method?**
A. Use username and password directly — 2FA only applies to browser logins
B. Use an SSH key pair from the SSH Key Manager for API authentication
C. Generate a Bearer token via Token Manager and include it in the Authorization header
D. Disable 2FA temporarily each time the script needs to run

**11. What is the maximum number of active tokens a single user can have in IONOS Cloud Token Manager at one time?**
A. 10
B. 25
C. 50
D. 100

**12. When a Bearer token is generated in Token Manager, when can the actual token value be retrieved again?**
A. Anytime by revisiting the Token Manager interface
B. Only by an Administrator using the Billing API
C. Never — the token value is shown only once at creation and must be copied immediately
D. Within 24 hours of creation using the token's ID

**13. What is the recommended Time-To-Live (TTL) range for API tokens used in production automation environments?**
A. 365 days (maximum security through infrequent rotation)
B. 1–7 days (short-lived tokens that are rotated regularly)
C. Exactly 30 days, as specified by IONOS platform requirements
D. No TTL — production tokens should never expire automatically

**14. IAM Federation in IONOS Cloud supports which two industry-standard authentication protocols?**
A. Kerberos and NTLM
B. OAuth 1.0 and Basic Authentication
C. SAML 2.0 and OpenID Connect (OIDC)
D. WS-Federation and LDAP

**15. An organization has implemented IAM Federation with their corporate Azure Active Directory. A user's Azure AD account is disabled when they leave the company. What happens to their IONOS Cloud access?**
A. Nothing — their IONOS account remains active and must be manually deactivated
B. Their IONOS Cloud access is automatically revoked because authentication via the IdP will fail
C. Their IONOS account is suspended for 30 days then permanently deleted
D. An Administrator receives an automated email to manually revoke IONOS access

**16. When IAM Federation is implemented, does it change the RBAC privileges assigned to a user in IONOS Cloud?**
A. Yes — federated users automatically receive Administrator privileges
B. Yes — federated users are reset to zero privileges for security reasons
C. No — IAM Federation only handles authentication (who you are), not authorization (what you can do)
D. No — but privileges must be re-assigned after federation is linked

**17. Which statement best describes the Principle of Least Privilege (PoLP) as implemented in IONOS Cloud?**
A. Users are granted the most access needed for their team's broadest possible responsibilities
B. Users receive only the minimum permissions required to perform their specific job functions
C. Privileges are automatically calculated based on the user's seniority level
D. Users are denied access to all paid resources unless they hold an Administrator role

**18. A company wants employees to log into IONOS Cloud using their corporate Microsoft 365 credentials without maintaining separate IONOS passwords. Which IONOS feature enables this?**
A. Token Manager with LDAP integration
B. SSH Key Manager with corporate certificates
C. IAM Federation / Single Sign-On (SSO) via SAML 2.0 or OpenID Connect
D. Multi-Factor Authentication (MFA) enforcement via the DCD

**19. An Administrator wants to grant a database team access to only the "Database-VDC" and no other resources. What is the most appropriate approach?**
A. Promote all database team members to Administrator role with a note in the description
B. Create a "Database Team" group, assign privileges scoped to the "Database-VDC" resource, and add team members
C. Share the Contract Owner credentials with the database team lead
D. Create a separate IONOS account for the database team with its own billing

**20. Privileges in IONOS Cloud can be assigned in which two ways?**
A. By region and by service type
B. Directly to individual users, or to groups (which members then inherit)
C. By contract owner approval request or by Administrator self-service
D. Via the DCD GUI only — API assignment is not supported for privileges

**21. Which of the following is a documented security best practice for IONOS Cloud IAM?**
A. Share one Administrator account among a team so access requests can be handled faster
B. Grant every team member Administrator rights to prevent access-related blockers
C. Use short TTLs for API tokens (1–7 days) and rotate them regularly
D. Set tokens to expire after one year to minimize re-generation overhead

**22. A security team discovers that a former employee's account was not deactivated for three months after they left. According to IAM best practices, what should be implemented to prevent this?**
A. Require all users to change their password monthly
B. Conduct regular access reviews (at least quarterly) to identify and revoke stale accounts
C. Enable 2FA for the former employee's account retroactively
D. Transfer the former employee's resources to the Contract Owner automatically

**23. IAM Federation only handles which aspect of cloud access management?**
A. Authorization — determining what resources a user can access
B. Billing — determining which cost center a user's resources are charged to
C. Authentication — verifying who the user is via an external Identity Provider
D. Provisioning — automatically creating VDCs and resources for new users

**24. A junior developer is onboarding to an IONOS Cloud project. They need to create virtual machines but should not have access to billing, networking, or any other resource type. What is the best approach?**
A. Grant the developer Administrator rights and rely on their judgment
B. Add the developer to a group with a specific "Create VMs" privilege scoped to the development VDC only
C. Share the Contract Owner account temporarily and revoke it after onboarding
D. Create a separate contract for the developer with no network connectivity

**25. Which of the following is NOT a benefit of using IAM Federation in IONOS Cloud?**
A. Users can log in with familiar corporate credentials, reducing password fatigue
B. User lifecycle management is centralized in the corporate Identity Provider
C. Federated users automatically receive elevated Administrator privileges in IONOS
D. When a user's corporate account is disabled, their IONOS access is also revoked

**26. What happens to a user's group-inherited privileges when they are removed from a group in IONOS Cloud?**
A. They retain the privileges for 7 days as a grace period
B. They lose those group-inherited privileges immediately
C. The privileges convert to direct user assignments automatically
D. An Administrator must manually revoke each privilege individually

**27. According to IONOS IAM best practices, when should you grant the Administrator role versus using the User role with explicit privileges?**
A. Use the Administrator role by default; use the User role only for external contractors
B. Use the User role with explicit privileges whenever possible; reserve the Administrator role for IT managers and senior staff who genuinely need broad access
C. Use the Administrator role for anyone who needs to access more than three resources
D. The choice is purely cosmetic — both roles provide identical access levels

**28. A DevOps team member needs to automate daily infrastructure provisioning tasks using a script. Which IAM element should they use to authenticate the script's API calls?**
A. The team member's username and password stored in the script's environment variables
B. An SSH key pair uploaded to the SSH Key Manager
C. A Bearer token generated via Token Manager with an appropriate TTL for the automation use case
D. The Contract Owner's credentials shared via an encrypted password manager

**29. Which of the following actions can ONLY be performed by the Contract Owner and NOT by an Administrator?**
A. Creating new user accounts
B. Deleting Virtual Data Centers
C. Changing the payment method for the contract
D. Viewing Activity Logs across the contract

**30. A compliance officer needs to demonstrate that all privileged IONOS Cloud users have MFA enabled and that no unnecessary access exists. Which two IONOS features support this audit requirement?**
A. Token Manager (to verify tokens) and Cost Alerts (to monitor spending)
B. Force 2-Factor Auth setting (to enforce MFA) and Activity Logs (to review privileged user actions and access changes)
C. Flow Logs (to monitor network traffic) and the DCD canvas (to visualize resources)
D. IAM Federation (to centralize logins) and Cloud Savings Plans (to verify committed usage)

---

## Answer Key

1. B — RBAC stands for Role-Based Access Control, the framework IONOS uses to manage user actions based on assigned roles and explicit privileges.

2. C — The Contract Owner (also called Account Owner) has full unrestricted access including the exclusive right to change payment methods, which Administrators cannot do.

3. C — The sole financial restriction is that Administrators cannot change the payment method; in all other operational areas, Administrators and the Contract Owner have equivalent rights.

4. D — A new user account starts with zero default permissions; all access must be explicitly granted via groups or direct privilege assignment.

5. B — Groups allow you to define privileges once and have all members inherit them, so adding or removing team members instantly updates their access without reconfiguring individual permissions.

6. B — IONOS IAM permissions are additive; when a user receives privileges from multiple sources, the highest level of access granted applies (Edit beats View).

7. B — The three resource-level permission types in IONOS Cloud are View (see only), Edit (modify), and Share (grant view access to others).

8. C — Resources created by the Contract Owner are hidden from all other users by default and must be explicitly shared with at least one group to become visible.

9. C — Token Manager generates Bearer tokens in the form of JSON Web Tokens (JWTs), which are included in the Authorization header of API requests.

10. C — When 2FA is enabled, standard password-based API authentication is blocked; the only valid API authentication method is a Bearer token generated via Token Manager.

11. D — Each user can have up to 100 active tokens simultaneously in IONOS Cloud Token Manager.

12. C — The token value is displayed only once at the moment of creation; it cannot be retrieved again afterward, so it must be copied and stored securely immediately.

13. B — IONOS recommends short TTLs of 1–7 days for production tokens to limit the exposure window if a token is compromised, with regular rotation.

14. C — IAM Federation in IONOS Cloud supports SAML 2.0 (XML-based protocol) and OpenID Connect / OIDC (JSON-based protocol built on OAuth 2.0).

15. B — Because authentication flows through the corporate IdP, a disabled Azure AD account prevents the user from completing authentication, automatically revoking their IONOS Cloud access.

16. C — IAM Federation handles only authentication (verifying identity); the RBAC privileges assigned to the user in IONOS remain exactly the same after federation is linked.

17. B — The Principle of Least Privilege means granting users only the minimum permissions required for their specific job functions, reducing risk from compromised accounts.

18. C — IAM Federation (SSO) via SAML 2.0 or OpenID Connect allows users to authenticate with their corporate credentials, eliminating the need for separate IONOS passwords.

19. B — Creating a named group, scoping privileges to the specific VDC resource, and adding team members is the correct, scalable, least-privilege approach.

20. B — Privileges in IONOS Cloud can be assigned directly to individual users (for one-off needs) or to groups (for scalable team management), with group members inheriting all group privileges.

21. C — Using short TTLs (1–7 days) and rotating tokens regularly is an explicitly recommended IONOS IAM security best practice to minimize the risk from compromised tokens.

22. B — Conducting regular access reviews at least quarterly is the best practice to identify orphaned accounts and revoke access when employees change roles or leave.

23. C — IAM Federation handles only authentication (who the user is via the external IdP); authorization (what they can do) is still governed by the RBAC privileges assigned in IONOS.

24. B — Adding the developer to a group with a specific "Create VMs" privilege scoped to the development VDC follows the Principle of Least Privilege and contains the blast radius of any mistake.

25. C — IAM Federation does not change or elevate a user's RBAC privileges; federated users retain exactly the same permissions they had before federation was linked.

26. B — Removing a user from a group in IONOS Cloud immediately revokes the privileges inherited from that group with no grace period.

27. B — The Administrator role should be reserved for users who genuinely need broad access; the User role with explicit privileges should be used whenever possible to minimize risk.

28. C — A Bearer token generated via Token Manager with an appropriate TTL is the correct, secure authentication method for automated scripts making IONOS Cloud API calls.

29. C — Changing the payment method is the exclusive right of the Contract Owner; Administrators cannot perform this financial action regardless of their other privileges.

30. B — The Force 2-Factor Auth setting verifies MFA compliance across users, while Activity Logs provide an immutable audit trail of privileged actions and permission changes for compliance review.
