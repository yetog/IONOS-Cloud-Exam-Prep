

--- FILE: unit-3.1-dcd-account-management.html ---

18 min read

## Learning Objectives

By the end of this module, you will be able to: 

- Explain what the Data Center Designer (DCD) is and how it provides a visual interface for managing cloud infrastructure

- Describe the three account types (Contract Owner, Administrator, User) and their respective permissions

- Identify how to manage multiple contracts and switch between them

- Describe account security settings including two-factor authentication, password policies, and support PIN

# Unit 3.1: Data Center Designer and Account Management

## Introduction

Imagine walking into a modern factory floor where you can see the entire production line laid out visually, monitor every machine, and make changes simply by pointing and clicking. The Data Center Designer (DCD) provides exactly this experience for your cloud infrastructure. Instead of memorizing complex commands or navigating through endless menus, you can drag virtual machines, storage, and networks onto a visual canvas and watch your infrastructure come to life. 

In this unit, you will learn how IONOS Cloud&#x27;s primary management interface works, who can do what within your cloud account, and how to keep your account secure. Whether you are a contract owner managing multiple customers, an administrator overseeing daily operations, or a team member with specific responsibilities, understanding these management fundamentals ensures you can work efficiently and securely. 

## 1. Data Center Designer (DCD) Overview

The Data Center Designer (DCD) is IONOS Cloud&#x27;s web-based graphical control panel. It provides a drag-and-drop, JavaScript-driven user interface that lets you create, configure, and manage Virtual Data Centers (VDCs) and all the resources inside them, including virtual machines, storage, LANs, IP addresses, snapshots, firewall rules, and PaaS services. You can open the DCD in any modern browser without installing additional software. 

### 1.1 Visual Infrastructure Design

The DCD uses a canvas-based approach where you design your cloud environment visually. Think of it like a blueprint or wiring diagram for your infrastructure. You drag resources (such as a virtual machine, cube, or network load balancer) from a palette onto the workspace, drop them where you want them positioned, and connect their interfaces by drawing lines between components. This visual layout shows exactly how each component is linked, which helps with troubleshooting and documentation. 

After arranging your resources on the canvas, you can click any element to open the Inspector pane, where you set properties such as CPU cores, RAM, storage size, operating system image, security groups, and networking configuration. Once you are satisfied with your design, you provision the changes, and the visual layout is materialized in the cloud. 

### 1.2 Canvas Mode and Xpress Mode

The DCD offers two creation modes to suit different needs: 

Canvas Mode (Advanced) gives you full freedom to place and connect every element on the visual canvas. Power users who need complex, custom architectures typically use this mode because it provides complete control over resource placement and configuration. 

Xpress Mode (Fast) is a guided wizard introduced to speed up standard IaaS workloads. If you need to quickly spin up a basic virtual machine with storage and networking, Xpress Mode walks you through the process step-by-step. Regardless of how an instance is created, all subsequent management is performed within Canvas Mode, ensuring a consistent experience. 

### 1.3 Unified Control Panel

The DCD serves as your single pane of glass for all IONOS Cloud services. You can manage compute, storage, networking, databases, Kubernetes clusters, AI model deployments, and more from the same workspace. This centralized approach reduces the time and effort required to switch between different consoles. You see the full state of your cloud environment in one place, including: 

- Active Cloud Savings Plans and their utilization

- Resource usage tracking and limits

- Activity Logs and Flow Logs for audit trails

- Monitoring dashboards and alerts

- Role-based access controls and user permissions

The DCD also integrates common operational tools such as SSH key management, remote console access, cloud-init launch configurations, and flow log viewers. This means typical tasks like uploading an SSH key, accessing a virtual machine&#x27;s console, or inspecting network traffic logs are all reachable from the same workspace, cutting down on context-switching. 

### 1.4 Integration with Infrastructure as Code

While the DCD is primarily a graphical tool, it works seamlessly with code-first tools like Terraform, Ansible, and the IONOS Cloud API. You can design infrastructure visually in the DCD, export the configuration, and manage it programmatically, or you can build infrastructure using code and later import the result into the DCD for visual monitoring. 

When resources are created via API or SDK, the DCD will display the resulting topology, though the exact visual placement may be stacked on the canvas since the programmatic creation does not control graphical layout. For large or frequently changing environments, this hybrid approach gives you the speed of automation with the clarity of visual representation. 

## 2. Account Types and Permissions

IONOS Cloud uses a structured permission model with three primary account types: Contract Owner, Administrator, and User. Each type has different capabilities and limitations, ensuring that users have the access they need without compromising security or compliance. 

### 2.1 Contract Owner

The Contract Owner is the first user who registers the contract. This account receives all privileges on the entire contract, with unrestricted access to view, edit, delete, and share any resource, regardless of who created it. The Contract Owner can add or remove any other user, including administrators, and this owner role cannot be revoked or transferred. Additionally, the Contract Owner receives all legal communications such as invoices and contract terms updates, and is the only account type that can change the payment method for the contract. 

In essence, the Contract Owner has ultimate authority over the cloud account. This role is critical for organizations because it controls billing, legal agreements, and top-level access management. If you are the Contract Owner, you should treat this account with the highest level of security, including enabling two-factor authentication and using a strong, unique password. 

### 2.2 Administrator

An Administrator is any user that the Contract Owner (or an existing administrator) promotes to the Administrator role. Administrators have the same operational privileges as the Contract Owner for every resource. They can view, edit, share, and delete any resource, and they can add or remove users except the Contract Owner&#x27;s own account. 

The key distinction is that Administrators cannot change the payment method of the contract. This restriction ensures that financial control remains exclusively with the Contract Owner. For day-to-day operations, administrators have full access to manage infrastructure, users, and permissions, making this role ideal for IT managers and senior technical staff. 

### 2.3 User (Explicit Privileges)

A User is created as a normal user account and then granted specific privileges, either directly or via a group. Unlike the Contract Owner and Administrator roles, a newly created user has no permissions by default until privileges are explicitly assigned. This follows the Principle of Least Privilege (PoLP), which means giving users only the minimum access they need to perform their job. 

Privileges are atomic grants such as Read, Edit, and Share that can be attached to a user or a group. For example, a developer might receive Read and Edit privileges on specific virtual machines but no access to billing information. A security analyst might receive Read-only access to Activity Logs and Flow Logs for auditing purposes. 

Groups let you assign the same set of privileges to many users at once, simplifying management at scale. Instead of configuring permissions individually for each team member, you create a group (such as &quot;Developers&quot; or &quot;Operations Team&quot;), assign the necessary privileges to that group, and add users to it. When a user joins or leaves the team, you simply add or remove them from the group, and their permissions update automatically. 

### 2.4 Permission Comparison Table

The following table compares the three account types and their core capabilities: 

Account Type 

How Created 

Core Permissions 

What They Cannot Do 

Contract Owner 

First user to register the contract 

All privileges on the whole contract. Can see, edit, delete, share any resource. Can add or remove any user including administrators. Receives all legal communications. Cannot be stripped of the owner role. 

None - the owner has unrestricted access. 

Administrator 

Promoted by the owner or an existing admin 

Same privileges as the owner for every resource (view, edit, share, delete). Can add or remove users except the owner. 

Cannot change the payment method of the contract (only the owner can). 

User (Explicit Privileges) 

Created and granted specific privileges via groups or direct assignment 

Can perform only the actions that have been explicitly granted (e.g., Read, Edit, Share on selected resources). Privileges are fine-grained and managed through groups or per-resource permissions. 

No default access. Cannot manage other users unless a privilege allowing it is given. 

As shown above, the Contract Owner has full financial and administrative control, administrators have full operational control but not financial control, and users have only the specific permissions you grant them. 

## 3. Contract Management and Multi-Contract Access

Many organizations and resellers work with multiple contracts or subcontracts. IONOS Cloud makes it easy to see and switch between contracts, manage user access across contracts, and create subcontracts for customers or business units. 

### 3.1 Contract Selector

In the Data Center Designer (DCD), after you log in, you see a contract selector (usually in the top-right corner of the interface). This selector displays the contract you are currently operating in and lets you switch to any other contract or subcontract you have rights to. The switch works only if you have at least read-only permission on the target contract. To perform actions, you must belong to a group that has the needed privileges. 

When you select a different contract, the UI reloads the context so all subsequent actions (creating VDCs, managing resources, viewing logs, etc.) happen in the selected contract. This seamless switching is available to contract owners, contract administrators, and any user that has been granted the &quot;access to contract&quot; privilege. 

### 3.2 Creating Subcontracts (Resellers)

Resellers can create subcontracts for their customers from the reseller&#x27;s main contract. Only the reseller contract owner can create subcontracts and can also create administrators for those subcontracts. This structure enables managed service providers (MSPs) and resellers to operate separate cloud environments for each customer while maintaining centralized billing and oversight. 

For example, an MSP managing infrastructure for five clients can create five subcontracts, one per client. Each subcontract has its own Virtual Data Centers, resources, and users. The MSP&#x27;s contract owner can switch between subcontracts to manage them centrally, while each client&#x27;s users only see their own subcontract. 

### 3.3 Granting Multi-Contract Access to Users

To give other users access to a different contract, use the Users and Groups feature in the DCD: 

- Navigate to Menu &gt; Management &gt; Users &amp; Groups

- Choose the Groups tab

- Select (or create) a group

- In the Privileges tab, assign the appropriate contract-level privilege (e.g., &quot;Access and manage contract&quot;)

- Add the users to that group

Users inherit the contract-wide rights of the group. Administrators automatically have full access to every contract they are assigned to, but only the contract owner can change payment information. To remove or change a user&#x27;s rights on a contract, either remove the user from the group that carries the contract privilege, or disable the &quot;Administrator&quot; flag on the user account, which reverts the user to the privileges defined by groups. 

### 3.4 Key Points for Multi-Contract Management

- Contract Owner = Full Control: Can change payment data, create Savings Plans, and create subcontracts

- Contract Administrators = Owner-level rights on resources but cannot change payment information

- Regular Users get whatever rights you assign through groups (RBAC)

- Reseller Contracts can create subcontracts, but Savings Plans created at the reseller level cannot be transferred to another subcontract

- Switching contracts is a UI action in the DCD; no extra API call is required once you have the appropriate permissions

## 4. Account Security Settings

Securing your IONOS Cloud account is critical to protecting your infrastructure, data, and billing information. IONOS provides several security controls to help you enforce strong authentication and manage access safely. 

### 4.1 Password Policy

The Password Policy Manager in the DCD (accessed via Menu &gt; Management &gt; Password Policy ) lets you define rules for password strength. You can specify requirements for minimum length, required character types (uppercase, lowercase, numbers, special characters), and minimum quantities for each character type. 

Only a Contract Owner can create, edit, or delete a password policy. After saving, the policy is automatically applied to any new password setup. You can have only one active policy per contract. A typical recommended password policy requires: 

- Minimum length of 9-12 characters

- At least 1 uppercase letter

- At least 1 lowercase letter

- At least 1 digit

- At least 1 special character

If you delete the policy, the account reverts to the IONOS standard, which requires at least 5 characters and recommends a mix of upper and lower case letters, at least one digit, and optional special characters. Enforcing a strong password policy reduces the risk of credential-stuffing and brute-force attacks. 

### 4.2 Two-Factor Authentication (2FA)

Two-factor authentication (2FA) adds a second layer of security to your account. After entering your normal login credentials (email and password), you must also supply a time-based security code generated by an authenticator app on your mobile device. Once enabled, every login to the Data Center Designer (DCD) requires this code, protecting the account even if the password is compromised. 

Enabling 2FA for Your Own Account 

To enable 2FA for yourself: 

- Open the DCD and navigate to Menu &gt; Your Profile &gt; Password &amp; Security

- In the 2-Factor Authentication section, click Enable 2-Factor Authentication

- Follow the wizard: install an authenticator app (such as Google Authenticator or Authy), scan the QR code, enter the generated token, and finish

- On your next login, you will be prompted for the code

Only the account user can enable 2FA for themselves. Administrators or contract owners cannot enable it on their behalf, but they can enforce it. 

Enforcing 2FA for Sub-Users 

To require 2FA for another user: 

- Navigate to Menu &gt; Management &gt; Users &amp; Groups

- Select the user, go to the Meta Data tab

- Check Force 2-Factor Auth and click Save

The user will be required to activate 2FA before their next login. This is useful for organizations that want to enforce a uniform security baseline across all users. 

Prerequisites for 2FA 

- Install any authenticator app that can read QR codes and has automatic time sync

- The mobile device&#x27;s clock must be set to automatic to keep the generated codes in sync

- 2FA is only available in the DCD UI; API access still requires a token generated via the Token Manager (which is mandatory for 2FA-enabled accounts)

### 4.3 Support PIN

The Support PIN is a security code that you set in your IONOS Cloud account to verify your identity when contacting IONOS Cloud Support. This PIN helps ensure that only authorized users can request changes or receive sensitive information about the account during support calls. 

To set or change your Support PIN: 

- Open the Data Center Designer (DCD)

- Navigate to Menu &gt; Your Profile &gt; Password &amp; Security

- In the Set Support PIN section, type the PIN you want to use

- Click Set Support PIN to save the change

After you confirm, the PIN is stored and will be required when you contact IONOS Cloud Support. This simple step adds another layer of protection, ensuring that even if someone knows your login credentials, they cannot impersonate you when requesting support. 

### 4.4 How Security Controls Work Together

Password policy, two-factor authentication, and support PIN work together to create a defense-in-depth strategy: 

- Password Policy ensures that the first factor (the password) meets minimum complexity requirements

- 2FA adds a second, independent factor, dramatically lowering the chance of unauthorized access even if the password is leaked

- Support PIN protects against social engineering attacks where someone tries to manipulate support staff into making account changes

Both password policy and 2FA can be mandated at the contract level. The contract owner defines the password policy, while administrators can force 2FA for all sub-users, ensuring a uniform security baseline across the organization. 

## Common Use Cases

Real-world scenarios where the Data Center Designer and account management features are used: 

- Multi-Customer Managed Service Provider: An MSP manages cloud infrastructure for 20 customers. The MSP creates a subcontract for each customer, and the account owner switches between subcontracts using the DCD contract selector (discussed in Section 3.1). Each customer&#x27;s administrators and users only see their own subcontract. The MSP enforces 2FA and a strong password policy (Section 4.1 and 4.2) across all subcontracts to meet security compliance requirements.

- Large Enterprise Development Team: A company with 50 developers, 10 operations engineers, and 5 security analysts needs fine-grained access control. The contract administrator creates three groups as described in Section 2.3: &quot;Developers&quot; (Read and Edit on VMs in the dev environment), &quot;Operations&quot; (Read, Edit, Share on all production resources), and &quot;Security&quot; (Read-only on Activity Logs and Flow Logs). As team members join or leave, the administrator simply adds or removes them from the appropriate group, and their permissions update automatically following the Principle of Least Privilege from Section 2.4.

- Secure Financial Services Deployment: A financial institution deploys applications on IONOS Cloud and must comply with strict security and audit requirements. The contract owner configures a password policy requiring 12-character passwords with uppercase, lowercase, digits, and special characters (Section 4.1). All users are required to enable 2FA via the &quot;Force 2-Factor Auth&quot; setting explained in Section 4.2. The institution also sets support PINs for all administrators (Section 4.3). These security controls, combined with Activity Logs for audit trails (covered in Unit 3.4), ensure compliance with industry regulations.

## Summary

The Data Center Designer (DCD) is IONOS Cloud&#x27;s primary management interface, providing a visual, drag-and-drop canvas for designing and managing cloud infrastructure. It serves as a unified control panel where you can manage compute, storage, networking, databases, and more from a single workspace. The DCD offers two creation modes: Canvas Mode for advanced, custom designs, and Xpress Mode for fast, guided deployments. 

IONOS Cloud&#x27;s permission model includes three account types. The Contract Owner has full administrative and financial control, including the exclusive ability to change payment methods. Administrators have full operational control over resources and users but cannot change payment settings. Regular Users have only the specific privileges you grant them, following the Principle of Least Privilege. Managing permissions through Groups simplifies access control at scale. 

For organizations working with multiple contracts or subcontracts, the DCD contract selector makes it easy to switch between contexts. Resellers can create subcontracts for customers, and contract administrators can grant multi-contract access to users via group-based privileges. 

Account security in IONOS Cloud combines password policies, two-factor authentication (2FA), and support PINs. Password policies enforce strong password requirements, 2FA adds a second authentication factor using time-based codes, and support PINs protect against social engineering attacks. Together, these controls create a layered security approach that protects your cloud infrastructure and data. 

Key Points: 

- The Data Center Designer (DCD) is a web-based graphical interface for managing IONOS Cloud infrastructure using drag-and-drop visual design

- Three account types exist: Contract Owner (full control), Administrator (full operational control but no payment changes), and User (explicit privileges only)

- Multi-contract management is supported through the contract selector and group-based access controls, enabling resellers and enterprises to manage separate environments

- Account security settings include password policies (contract owner controlled), two-factor authentication (user or forced), and support PIN (user controlled)

- Groups simplify permission management by assigning privileges to multiple users at once, supporting the Principle of Least Privilege

- The DCD integrates with Infrastructure as Code tools (Terraform, Ansible, API) for hybrid visual and programmatic management

Important Terminology: 

- Data Center Designer (DCD): IONOS Cloud&#x27;s web-based graphical control panel for creating, configuring, and managing Virtual Data Centers and cloud resources

- Contract Owner: The first user to register the contract; has full administrative and financial control, including exclusive ability to change payment methods

- Administrator: User with full operational privileges identical to the owner but cannot modify payment details

- Principle of Least Privilege (PoLP): Security best practice of giving users only the minimum access they need to perform their job

- Two-Factor Authentication (2FA): Security mechanism requiring a second verification step (time-based code from an authenticator app) in addition to password

- Support PIN: Security code set by the user to verify identity when contacting IONOS Cloud Support

## Next Steps

Continue Learning: Unit 3.2: Identity and Access Management 

Related Topics: 

- Unit 2.1: Core Architectural Components - Understanding VDCs and resource organization

- Unit 3.4: Activity Logs and Monitoring - Audit trails and security monitoring

Mark as Complete 

Previous

2.7 Knowledge Check - Architecture and Services 

Next

3.2 Identity and Access Management


--- FILE: unit-3.2-iam.html ---

18 min read

## Learning Objectives

By the end of this module, you will be able to: 

- Explain the IONOS Role-Based Access Control (RBAC) model and its three core roles

- Describe how Users and Groups enable scalable permission management

- Identify when to use Token Manager for API authentication

- Explain how IAM Federation and Single Sign-On (SSO) work in IONOS Cloud

- Apply the Principle of Least Privilege to control access to cloud resources

# Unit 3.2: Identity and Access Management

## Introduction

Think of managing access to cloud resources like running a busy office building. You need some people to have master keys (administrators), others to access only specific floors (department teams), and visitors who need temporary badges for limited areas. Without a system to control who enters which rooms, security falls apart. Identity and Access Management (IAM) provides exactly this kind of control for your cloud environment. 

In this unit, you will learn how IONOS Cloud implements IAM through Role-Based Access Control (RBAC), user and group management, API authentication tokens, and identity federation. Whether you are securing a small team&#x27;s resources or managing access across multiple organizations, understanding IAM is essential for maintaining security, compliance, and operational efficiency. 

## 1. IONOS Role-Based Access Control (RBAC) Model

IONOS Cloud uses a Role-Based Access Control (RBAC) model to manage who can perform which actions within a cloud contract. Access is granted through roles, privileges, and groups, allowing you to implement the Principle of Least Privilege across your entire platform. 

### 1.1 The Three Core Roles

IONOS Cloud defines three primary roles, each with different levels of access: 

Role 

Access Level 

Key Capabilities 

Restrictions 

Account Owner 

Full access (unrestricted) 

- Holds all privileges and permissions (cannot be revoked)&lt;br&gt;- Receives all legal communications and invoices&lt;br&gt;- Can add or remove any other user&lt;br&gt;- Can change payment methods 

- Cannot be removed from the contract&lt;br&gt;- This role is automatically assigned to the user who creates the contract 

Administrator 

Full access (nearly unrestricted) 

- Same rights as Owner for resource management&lt;br&gt;- Can add or remove users (except the Owner)&lt;br&gt;- Can manage all cloud resources (VDCs, servers, storage, etc.) 

- Cannot change payment methods&lt;br&gt;- Cannot remove the Owner 

User 

Limited access (explicitly granted) 

- Can perform only actions explicitly assigned through privileges&lt;br&gt;- Can access only resources shared with their groups&lt;br&gt;- Ideal for applying Principle of Least Privilege 

- No default permissions&lt;br&gt;- Must be granted explicit privileges for each action 

The Owner role is automatically created when you first sign up for IONOS Cloud and cannot be transferred or removed. This ensures that there is always an account holder responsible for billing and legal matters. 

### 1.2 How Privileges Work

Privileges are action-level grants that define what a user or group can do. Examples include &quot;create a Virtual Data Center,&quot; &quot;read backups,&quot; &quot;manage Network File Storage ,&quot; or &quot;share snapshots.&quot; Instead of giving someone broad administrative access, you assign only the specific privileges they need to perform their job. 

Privileges can be assigned in two ways: 

- Directly to individual users - Useful for one-off or unique access requirements

- To groups - Recommended for scalable management of teams with shared responsibilities

For example, a database administrator might receive privileges to &quot;Access and manage Database as a Service&quot; and &quot;Create snapshots,&quot; while a monitoring specialist receives only &quot;Access and manage Monitoring resources&quot; without the ability to modify infrastructure. 

### 1.3 The Principle of Least Privilege (PoLP)

The Principle of Least Privilege means granting users only the minimum permissions required to perform their tasks. This security best practice reduces the attack surface by limiting what a compromised account can access or damage. 

IONOS enables PoLP implementation through: 

- Custom group profiles - Pre-defined sets of fine-grained privileges tailored to specific job functions

- Resource-level permissions - Granting access to specific VDCs, images, snapshots, or IP blocks rather than all resources

- Regular access reviews - Periodically auditing user accounts and revoking unnecessary privileges

- Multi-Factor Authentication (MFA) - Requiring a second authentication factor for privileged accounts

When implementing PoLP, start by mapping each job function to the minimal set of actions required. Use the User role with explicit privileges instead of the Administrator role whenever possible, and conduct quarterly reviews to identify and remove stale access rights. 

## 2. Users and Groups Management

Managing access for dozens or hundreds of users individually would be time-consuming and error-prone. IONOS Cloud provides Users and Groups functionality to streamline permission management at scale. 

### 2.1 What Are Users?

A user is an individual identity that can log in to the IONOS Cloud Data Center Designer (DCD) console. Each user is identified by a unique email address and can be assigned specific privileges that define which actions they can perform. 

When you create a user, you provide: 

- First name and last name

- Unique email address (this becomes the login identifier)

- Initial password (the user should change this on first login)

Users created through the DCD interface have basic access to the console. Users created via the API have limited permissions by default and cannot see any resources unless those resources are explicitly shared with a group they belong to. 

Only the contract Owner and Administrators can create and manage users. 

### 2.2 What Are Groups?

A group is a logical collection of users that enables you to apply permissions collectively rather than individually. Groups simplify RBAC for large or dynamic teams by allowing you to define privileges once and have all group members inherit those rights automatically. 

For example, you might create groups such as: 

- Network File Storage Users - Members can access and manage NFS resources

- Database Operators - Members can manage PostgreSQL, MariaDB, and MongoDB databases

- Monitoring Service Viewers - Members have read-only access to monitoring dashboards

When you add a user to a group, they immediately inherit all privileges assigned to that group. When you remove them from the group, they lose those privileges just as quickly. 

### 2.3 Creating and Managing Groups

To create a group in IONOS Cloud: 

- Navigate to Menu → Management → Users &amp; Groups

- Switch to the Groups tab

- Click Create and provide a descriptive group name

- Add users to the group via the Members tab

- Assign privileges via the Privileges tab (changes apply immediately)

- Optionally, grant the group access to specific resources via Grant Access

Groups are particularly useful when team composition changes frequently. Instead of modifying privileges for each individual user, you simply add or remove them from the appropriate group. This approach is recommended for any permission that will be shared by two or more users. 

### 2.4 Resource-Level Access Control

IONOS Cloud allows you to control access at the resource level, meaning you can specify which groups can view, edit, or share specific resources such as VDCs, images, snapshots, and IP blocks. 

Resources can have three permission levels: 

- View - Group members can see the resource but cannot modify it

- Edit - Group members can modify the resource configuration

- Share - Group members can share the resource with other groups, granting them view rights

When you create a resource as the contract Owner, it is hidden from other users by default. To make it visible, you must share it with at least one group. This ensures that sensitive resources (such as production images or backup snapshots) remain confidential unless explicitly shared. 

### 2.5 When to Use Groups vs Individual Permissions

Situation 

Recommended Approach 

Why 

Standard roles shared by multiple people (e.g., developers, operators) 

Create a group and assign privileges to the group 

Scalable, consistent, easy to audit 

Changing team composition (people join/leave frequently) 

Use groups - add or remove members without changing privileges 

Reduces administrative overhead 

One-off or highly specific access (e.g., temporary read access to a single resource) 

Assign permissions directly to the individual user 

Avoids creating unnecessary groups for unique cases 

Administrators and contract owners 

No group needed - they automatically have full access 

Administrators inherit all permissions by default 

Fine-grained resource sharing (e.g., specific VDC or snapshot) 

Assign the resource to a group via Grant Access 

Only group members can see or manage the resource 

In general, use groups for any permission shared by two or more users, and use individual permissions only for unique, temporary, or one-off requirements. 

## 3. Token Manager for API Authentication

Many IONOS Cloud operations can be performed programmatically using the IONOS Cloud API. To authenticate API requests securely without sending your password, IONOS provides Token Manager. 

### 3.1 What Is Token Manager?

Token Manager is a service that generates Bearer tokens (JSON Web Tokens or JWTs) representing your user session. These tokens can be used instead of your username and password when making API calls. 

A token is a short-lived credential that you include in the Authorization header of every API request. Instead of authenticating with your password each time, you authenticate once by generating a token, then use that token for all subsequent API calls until it expires. 

### 3.2 Why Use Token Manager?

Token Manager provides several benefits over password-based authentication: 

- Required for 2FA accounts - If your account has Two-Factor Authentication (2FA) enabled, you cannot use password-only authentication for API calls. Token Manager provides the only way to authenticate API requests in this scenario.

- Improved security - Tokens are time-limited and can be revoked immediately if compromised, whereas changing a password affects all your access methods.

- Separation of concerns - You can create multiple tokens for different applications or automation scripts, and revoke individual tokens without affecting others.

- Audit trail - Token usage can be tracked separately from interactive console logins.

### 3.3 How Token Manager Works

To use Token Manager: 

- In the Data Center Designer, navigate to Menu → Management → Token Manager

- Click Generate Token

- Select a Time-To-Live (TTL) for the token (options range from 1 hour to 365 days)

- Click Create - the token value is displayed once and cannot be retrieved again

- Copy the token value and store it securely

Once you have a token, include it in the Authorization header of your API requests: 

Authorization: Bearer &lt;your-token-value&gt;

Each user can have up to 100 active tokens. You can delete a token at any time through the Token Manager interface, which immediately invalidates it even if the TTL has not expired. 

### 3.4 Token Attributes

Each token has the following attributes: 

- Token ID - Used to reference the token in the API (for example, when deleting it)

- Creation Date - When the token was generated

- Expiration Date - When the token will automatically expire (based on the selected TTL)

- TTL (Time-To-Live) - The lifespan of the token (selectable from 1 hour to 365 days)

- Token Value - The actual secret string used for authentication (shown only once at creation)

For security reasons, it is recommended to use shorter TTLs (such as 1 day or 1 week) for tokens used in production environments, and to rotate tokens regularly. 

## 4. IAM Federation and Single Sign-On (SSO)

For organizations that already use an enterprise Identity Provider (IdP) such as Azure Active Directory, Okta, or OneLogin, IONOS Cloud supports IAM Federation . This feature allows users to authenticate using their corporate credentials instead of maintaining separate IONOS passwords. 

### 4.1 What Is IAM Federation?

IAM Federation is a service that lets users authenticate to IONOS Cloud using credentials from an external Identity Provider. It supports two industry-standard protocols: 

- SAML 2.0 - A widely-used XML-based protocol for web-based single sign-on

- OpenID Connect (OIDC) - A modern JSON-based protocol built on top of OAuth 2.0

When IAM Federation is enabled, users can log in to the IONOS Data Center Designer by clicking &quot;Sign in with a linked account&quot; and being redirected to their organization&#x27;s IdP. After successful authentication with the IdP, they are automatically signed in to IONOS Cloud without entering an IONOS-specific password. 

### 4.2 Benefits of IAM Federation

IAM Federation provides several advantages: 

Benefit 

Description 

Single Sign-On (SSO) 

Users sign in once and gain access to multiple IONOS services (DCD, Control Panel, Reseller Portal) without repeated logins 

Improved Security 

Authentication is performed by your organization&#x27;s trusted IdP, often with Multi-Factor Authentication and conditional access policies already in place 

Reduced Phishing Risk 

User passwords are never stored in IONOS Cloud, eliminating one attack vector for credential theft 

Cross-Domain Collaboration 

Users from partner organizations can access your IONOS resources using their own IdP credentials, simplifying external collaboration 

Simplified User Management 

User accounts are managed centrally in your IdP - when someone leaves the organization or changes roles, access to IONOS Cloud is automatically updated 

Enhanced User Experience 

Seamless login with familiar corporate credentials, no need to remember multiple passwords 

Reduced Administrative Overhead 

No need to create, update, or delete IONOS user accounts separately from your existing identity management system 

### 4.3 How IAM Federation Works

Setting up IAM Federation involves the following steps: 

- Domain Ownership Verification - You prove ownership of your organization&#x27;s domain (such as yourcompany.com) by creating a TXT record in your DNS

- Identity Provider Onboarding - You provide IONOS with your IdP&#x27;s discovery endpoint information (such as the SAML metadata XML URL or OIDC configuration endpoints)

- User Account Linking - Each user links their existing IONOS Cloud account to their corporate identity via the IAM Federation menu in the DCD

- SSO Login - Users can now log in to IONOS Cloud by entering their corporate email address and selecting &quot;Sign in with a linked account&quot;

After linking, the user is redirected to the organization&#x27;s IdP login page, authenticates there (often with MFA), and is then returned to the IONOS Data Center Designer fully authenticated. 

### 4.4 IAM Privileges and Federation

It is important to understand that IAM Federation only handles authentication (verifying who the user is), not authorization (determining what the user can do). The IONOS RBAC privileges assigned to a user remain unchanged when they link to an external IdP. 

For example, if a user has the privilege &quot;Access and manage Database as a Service&quot; before linking to federation, they will still have that same privilege after linking. Federation provides an alternative login method but does not change the underlying permissions. 

## 5. Implementing IAM Best Practices

Effective IAM implementation goes beyond understanding the technical features. It requires following security best practices to protect your cloud environment. 

### 5.1 Security Best Practices Checklist

When implementing IAM in IONOS Cloud, follow these guidelines: 

- Apply the Principle of Least Privilege (PoLP) - Grant users only the minimum permissions required for their job functions. Use the User role with explicit privileges instead of the Administrator role whenever possible.

- Use Groups for Team-Based Access - Create groups that reflect organizational roles (such as developers, operators, auditors) and assign privileges to groups rather than individual users. This simplifies management and ensures consistency.

- Enable Multi-Factor Authentication (MFA) - Require MFA for the contract Owner, all Administrators, and any users with elevated privileges. This adds a critical second layer of security.

- Conduct Regular Access Reviews - At least quarterly, review user accounts, group memberships, and assigned privileges. Revoke access immediately when employees change roles or leave the organization.

- Rotate API Tokens Regularly - Use short TTLs for production tokens (1-7 days recommended) and rotate them on a regular schedule. Delete tokens that are no longer in use.

- Use IAM Federation When Available - If your organization already has an enterprise IdP, use IAM Federation to centralize authentication and leverage your existing security controls.

- Document Your IAM Policies - Maintain written documentation that defines roles, group structures, privilege assignments, and review schedules. This ensures consistency and helps with compliance audits.

- Monitor Activity Logs - Use the Activity Logs service (covered in Unit 3.4) to track who performed which actions and when. This provides an audit trail for security and compliance purposes.

### 5.2 Common IAM Mistakes to Avoid

Several common mistakes can undermine IAM security: 

- Over-privileging users - Granting Administrator rights when specific privileges would suffice increases risk if an account is compromised

- Sharing credentials - Each individual should have their own user account and credentials, never shared with teammates

- Ignoring stale accounts - Failing to remove users who have left the organization or changed roles leaves unnecessary access in place

- Using long-lived tokens - Tokens with 365-day TTLs are convenient but create long-term security risks if compromised

- Forgetting to enable MFA - Relying on passwords alone leaves accounts vulnerable to phishing and credential stuffing attacks

- Not documenting group structures - Without documentation, privilege assignments become unclear over time, making audits difficult

## Common Use Cases

Real-world scenarios where Identity and Access Management is essential: 

- Multi-Team Development Environment: A software company has separate teams for frontend, backend, and DevOps. Using IONOS Groups, they create &quot;Frontend Developers&quot; with privileges to manage Compute Engine and Load Balancers (covered in Unit 2.2 and 2.4), &quot;Backend Developers&quot; with access to Database as a Service and Object Storage (Unit 2.5 and 2.3), and &quot;DevOps Engineers&quot; with full infrastructure privileges. When developers change teams, administrators simply move them to the appropriate group rather than reconfiguring individual permissions.

- Federated Access for Enterprise: A large corporation already uses Azure Active Directory for employee authentication across all internal systems. By implementing IAM Federation (Section 4), they allow employees to access IONOS Cloud using their corporate credentials and MFA policies. When an employee leaves, disabling their Azure AD account automatically revokes IONOS Cloud access without requiring separate deprovisioning steps.

- API Automation with Token Manager: An e-commerce platform uses automated scripts to provision test environments every morning and tear them down each evening to save costs. Using Token Manager (Section 3), they generate a 7-day API token with minimal required privileges (&quot;Create VDC,&quot; &quot;Create Servers,&quot; &quot;Delete Resources&quot;) and use it in their automation scripts. The token is rotated weekly and provides an audit trail separate from individual user accounts.

## Summary

Identity and Access Management is the cornerstone of cloud security, determining who can access your resources and what they can do with them. IONOS Cloud provides a comprehensive IAM framework built on Role-Based Access Control, enabling you to implement fine-grained security policies that scale from small teams to large enterprises. 

You have learned how IONOS&#x27;s three-tier role system (Owner, Administrator, User) provides flexibility in access control, how Users and Groups enable scalable permission management, and how Token Manager secures API authentication. You have also explored how IAM Federation and Single Sign-On can integrate IONOS Cloud with your existing enterprise identity infrastructure, simplifying user management while improving security. 

Effective IAM implementation requires more than technical configuration. It demands a commitment to the Principle of Least Privilege, regular access reviews, Multi-Factor Authentication enforcement, and clear documentation of policies and procedures. By following these best practices, you can significantly reduce security risks while maintaining operational efficiency. 

Key Points: 

- IONOS Cloud uses a Role-Based Access Control (RBAC) model with three roles: Owner (full unrestricted access), Administrator (full access except payment changes), and User (explicitly granted privileges only)

- Groups enable scalable permission management by allowing you to assign privileges collectively to multiple users rather than individually

- Token Manager generates Bearer tokens for secure API authentication, required for accounts with Two-Factor Authentication enabled

- IAM Federation supports SAML 2.0 and OpenID Connect, allowing users to authenticate with external Identity Providers for Single Sign-On

- The Principle of Least Privilege means granting users only the minimum permissions required for their job functions, reducing security risk

- Best practices include enabling MFA, conducting quarterly access reviews, rotating API tokens regularly, and documenting IAM policies

Important Terminology: 

- RBAC (Role-Based Access Control): A model for managing access based on predefined roles with specific privileges

- Privilege: An action-level grant that defines what a user or group can perform (e.g., create VDCs, manage databases)

- Group: A logical collection of users that inherit privileges collectively

- Token Manager: A service for generating Bearer tokens (JWTs) used for API authentication

- IAM Federation: A service allowing users to authenticate with external Identity Providers using SAML 2.0 or OIDC

- SSO (Single Sign-On): Authentication method allowing users to log in once and access multiple services without repeated credential entry

- Principle of Least Privilege (PoLP): Security practice of granting users only the minimum permissions required for their tasks

## Next Steps

Continue Learning: Unit 3.3: Cost Management and Billing 

Related Topics: 

- Unit 3.1: Data Center Designer and Account Management

- Unit 3.4: Activity Logs and Monitoring

- Unit 3.5: Security and Compliance

Mark as Complete 

Previous

3.1 Data Center Designer and Account Management 

Next

3.3 Cost Management and Billing


--- FILE: unit-3.3-cost-billing.html ---

17 min read

## Learning Objectives

By the end of this module, you will be able to: 

- Explain how the Cost and Usage dashboard tracks resource consumption and billing

- Describe how Cost Alerts help prevent unexpected charges

- Identify the difference between pay-per-use pricing and Cloud Savings Plans

- Understand resource limits, quotas, and how to track usage against them

- Recognize the role of the Billing API in programmatic cost management

# Unit 3.3: Cost Management and Billing

## Introduction

Managing cloud costs is like keeping a household budget. Just as you track monthly expenses across groceries, utilities, and entertainment to avoid overdrafts, you need visibility into cloud resource consumption to prevent billing surprises. The difference is that cloud resources can scale up or down in minutes, so tracking expenses in real time becomes critical. 

IONOS Cloud provides a comprehensive set of tools for monitoring costs, setting budget alerts, and optimizing spending. Whether you are running a small development environment or a production infrastructure serving thousands of users, understanding these cost management capabilities helps you make informed decisions about resource allocation and financial planning. In this unit, you will learn how to use IONOS cost tracking tools, understand different pricing models, and implement strategies to keep your cloud spending under control. 

## 1. Cost and Usage Dashboard

The Cost and Usage dashboard is your central command center for monitoring cloud spending. It provides detailed visibility into what you are consuming and what it costs, enabling you to identify trends, spot anomalies, and make data-driven decisions about resource allocation. 

### 1.1 What the Dashboard Shows

The Cost and Usage dashboard aggregates billing information across all your IONOS Cloud services. When you open the dashboard (Menu → Management → Cost &amp; Usage in the Data Center Designer), you see a comprehensive breakdown of consumption and charges. 

The dashboard includes a period selector that lets you view the current month or any of the previous five months, giving you up to six months of billing history. For the current month, the dashboard shows accumulated costs from the first day through the report generation date. For past months, it displays the complete month-end totals. 

At the top of the dashboard, you see the current total amount, which is the sum of all charges for the selected period. Below that, the dashboard breaks down costs by product category. Each category ( Compute Engine , Storage, Managed Kubernetes , etc.) shows its individual total. You can click any category to expand it and see line-item details. 

### 1.2 Understanding Usage Metrics

The detailed table within each product category shows four key columns: item description, price per unit, usage (units consumed), and total (price multiplied by usage). This granular data helps you understand exactly what you are paying for. 

For example, if you are running virtual machines, you might see entries like &quot;1 hour per GB RAM&quot; or &quot;1 hour per CPU core.&quot; The usage column shows how many units you consumed (perhaps 720 hours for a VM running continuously for a month), and the total shows the calculated cost. 

The dashboard displays list prices, which means the amounts shown do not include volume discounts, Cloud Savings Plans adjustments, or VAT. This standardized view makes it easier to compare costs across periods and identify consumption patterns, even if your final invoice includes additional pricing considerations. 

### 1.3 Tracking Costs by Virtual Data Center

One valuable feature of the Cost and Usage dashboard is its ability to show costs by Virtual Data Center (VDC). If you organize resources into multiple VDCs for different projects, teams, or environments (development, staging, production), the dashboard lets you see which VDC is driving the most spending. 

This visibility supports chargeback models where you need to allocate cloud costs back to specific business units or projects. You can identify which environments are consuming the most resources and adjust allocations accordingly. For example, if your production VDC is running significantly more expensive resources than anticipated, you can investigate whether those resources are necessary or if optimizations are possible. 

## 2. Cost Alerts and Budget Management

Tracking costs is important, but proactive notifications are even more valuable. Cost Alerts give you early warning when spending reaches defined thresholds, allowing you to take action before costs spiral out of control. 

### 2.1 How Cost Alerts Work

A Cost Alert is a threshold-based notification system that monitors your contract&#x27;s net invoice amount (excluding VAT) and sends an email when spending reaches or exceeds a value you define. The alert is informational only and does not automatically stop services or prevent additional charges. 

When you create a Cost Alert, you specify two things: a monetary threshold (for example, $500) and a recipient email address. IONOS runs periodic billing aggregations, and when the calculated net amount for your contract reaches or exceeds the threshold, the system sends an email notification to the specified address. 

It is important to understand that Cost Alerts trigger only once per threshold breach. After the initial notification is sent, the alert does not fire again even if spending continues to increase. This design prevents email flooding, but it also means you should monitor costs regularly even after receiving an alert. 

### 2.2 Who Can Manage Cost Alerts

Only contract owners and administrators can create, edit, or delete Cost Alerts. This restriction ensures that budget management remains under the control of users with appropriate authority. Other users on the contract can view resources and usage but cannot configure cost notifications. 

To create a Cost Alert in the Data Center Designer, navigate to Menu → Management → Cost Alert, then click Create cost alert. Enter the threshold amount and email address, then click Create. You can edit the threshold or email address later if your budget requirements change, or delete the alert entirely if it is no longer needed. 

### 2.3 Integrating Alerts with Billing Workflows

Cost Alerts work best as part of a broader cost management strategy. Rather than setting a single alert at your maximum budget, consider creating multiple alerts at different thresholds. For example, you might set alerts at 50%, 75%, and 90% of your monthly budget, giving you multiple opportunities to review spending and adjust resources before reaching your limit. 

Combine Cost Alerts with regular reviews of the Cost and Usage dashboard. The alert tells you when a threshold is crossed, but the dashboard shows you why spending increased. This combination of reactive notification and proactive analysis gives you the tools to maintain budget discipline. 

## 3. Pricing Models and Cloud Savings Plans

IONOS Cloud offers two primary pricing models: pay-per-use (also called pay-as-you-go or PAYG) and Cloud Savings Plans . Understanding the difference between these models is essential for optimizing your cloud costs. 

### 3.1 Pay-Per-Use Pricing

Pay-per-use pricing is the most flexible pricing model. You pay for resources by the hour based on actual consumption, with no upfront commitments. If you spin up a virtual machine at 9:00 AM and shut it down at 5:00 PM, you pay for eight hours of compute time. 

This model is ideal for workloads with unpredictable demand, short-term projects, development and testing environments, or situations where you are still evaluating resource requirements. The trade-off for this flexibility is a higher hourly rate compared to committed pricing models. 

Pay-per-use pricing makes it easy to get started with IONOS Cloud because there are no minimum commitments or upfront costs. You can experiment with different resource configurations, scale up and down as needed, and only pay for what you actually use. However, for stable, long-running workloads, pay-per-use rates can add up quickly. 

### 3.2 Cloud Savings Plans Overview

Cloud Savings Plans are a commitment-based pricing model that offers significantly lower hourly rates in exchange for committing to a specific amount of resource usage for a fixed term. Instead of paying the standard pay-per-use rate, you agree to use a defined quantity of resources (such as CPU cores or RAM) for one year or three years, and IONOS provides a discounted hourly rate. 

The key benefit of Cloud Savings Plans is cost reduction. By selecting a one-year or three-year term, you can receive substantially lower hourly rates compared to pay-per-use pricing. The longer the commitment, the greater the discount, with three-year plans typically offering savings of 30-40% off the standard pay-per-use rate. 

Cloud Savings Plans are resource-based rather than instance-based. This means the committed amount applies to any eligible usage across various CPU models, VM sizes, regions, and operating systems. You are not locked into a specific virtual machine type or location. If you commit to 50 CPU cores, that commitment can be used by any combination of virtual machines that collectively consume 50 cores, regardless of where they run or what operating system they use. 

### 3.3 How Cloud Savings Plans Apply to Usage

When you have a Cloud Savings Plan, IONOS automatically applies the plan&#x27;s discounted rate to your usage. If your consumption is less than or equal to the committed quantity, all usage is billed at the plan&#x27;s lower rate. However, you are charged for the full committed amount even if you do not use all of it. Unused resources do not roll over to the next month. 

If your consumption exceeds the committed quantity, the usage up to the commitment is billed at the plan&#x27;s discounted rate, and any excess usage is billed at the standard pay-per-use rate. This hybrid billing ensures you are never blocked from scaling beyond your commitment, but you pay the higher rate for resources above the plan. 

You can create multiple Cloud Savings Plans for different resource types (for example, one plan for CPU cores and another for RAM) or even multiple plans for the same resource type. When multiple plans exist, IONOS applies them starting with the oldest plan first, then moves to newer plans, and finally applies pay-per-use rates to any remaining usage. 

### 3.4 Choosing Between Pricing Models

The following table compares the two pricing models to help you understand when to use each: 

Aspect 

Pay-Per-Use (PAYG) 

Cloud Savings Plans 

Commitment 

No upfront commitment; pay for every hour you use 

Commit to fixed resources (cores, RAM) for 1 or 3 years 

Hourly rate 

Standard list price 

Discounted rate (approximately 30% cheaper for 1-year, 30-40% cheaper for 3-year) 

Flexibility of usage 

Fully flexible; start/stop any VM anytime, change size, region, OS 

Resource-based; committed amount applies across any eligible VM, region, or OS 

Billing when consumption ≤ plan 

All consumption billed at PAYG rate 

Consumption billed at plan&#x27;s lower rate; plan billed in full even if not fully used 

Billing when consumption &gt; plan 

All excess usage continues at PAYG price 

Usage up to commitment at plan rate; over-usage at PAYG rate 

Ideal workload 

Sporadic, short-term, experimental, or highly variable workloads 

Stable, predictable, long-running workloads with consistent usage 

Use pay-per-use pricing when your workloads are sporadic, short-lived, or when you are still determining long-term resource needs. Use Cloud Savings Plans when you have stable, predictable workloads where the committed amount can be reliably consumed month after month. 

## 4. Resource Limits and Quotas

Beyond tracking costs, you also need to understand the physical and contractual limits on what you can provision. IONOS Cloud enforces both technical resource limits (the maximum the platform can support) and contract-specific quotas (the portion of those limits your account can use). 

### 4.1 What Are Resource Limits

Resource limits are the maximum values that IONOS Cloud allows for specific resource types. These limits protect the underlying infrastructure and ensure predictable performance across all customers. Resource limits are published in IONOS documentation and apply to all accounts, though individual contract quotas may be lower. 

Examples of resource limits include the maximum number of vCPUs per virtual machine (256), the maximum RAM per VM (6 TB), the maximum number of virtual disks per VM (256), and the maximum disk size (62 TB). At the cluster level, limits include the maximum number of VMs per cluster (8,000) and the maximum number of hosts per cluster (3-64, depending on configuration). 

These technical limits represent the ceiling of what the platform can support. In practice, most customers operate well below these limits, but it is important to know they exist, especially when planning large-scale deployments. 

### 4.2 Understanding Quotas

Quotas are the contract-specific allocations that define how much of each resource type your account can use. While resource limits represent the platform maximum, quotas represent your contracted allowance. Quotas are set when your account is created and can be adjusted by contacting IONOS support. 

For example, your contract might have a quota of 500 CPU cores, 2 TB of RAM, and 100 TB of storage, even though the platform&#x27;s resource limits are much higher. These quotas ensure fair distribution of resources across all customers and align with the service level you have purchased. 

### 4.3 Monitoring Resource Usage

The Resource Overview window in the Data Center Designer (Menu → Management → Resource Overview) shows your current usage against your quotas for every resource type. This compact view lists resource types such as CPUs, RAM, virtual machines, disks, and network adapters, along with your current usage and the limit for each. 

At a glance, you can see how much capacity you have consumed and how much remains available. If you are approaching a quota limit, the Resource Overview provides visibility so you can either optimize current usage or request a quota increase from IONOS support before you hit the ceiling. 

Monitoring resource usage is particularly important when planning capacity expansions. If you know you will need more resources for an upcoming project or seasonal demand spike, checking the Resource Overview helps you determine whether your current quotas can accommodate the growth or if you need to request increases in advance. 

## 5. Billing API for Programmatic Access

For organizations that need to integrate billing data into internal systems, automate reporting, or build custom invoicing solutions, IONOS provides a Billing API that exposes cost and usage information programmatically. 

### 5.1 What the Billing API Provides

The Billing API is the programmatic interface for all billing-related information in IONOS Cloud. It allows you to retrieve detailed resource usage data, fetch invoices (in PDF or JSON format), manage Cost Alerts, and access billing information for your contract. 

Key capabilities of the Billing API include retrieving granular, per-resource usage data for selected billing periods, fetching the latest invoices with line-item breakdowns and net amounts, creating, editing, and deleting Cost Alert notifications, and supporting reseller workflows where resellers can access billing data for both their own contract and tenant contracts they manage. 

The Billing API is accessible only to contract owners and administrators, ensuring that sensitive financial data remains protected. Authentication uses either basic authentication or bearer tokens, with bearer tokens required for accounts that use multi-factor authentication. 

### 5.2 Use Cases for the Billing API

The Billing API enables several valuable use cases. Large organizations use it to feed IONOS billing data into internal financial systems, consolidating cloud costs with other IT expenses. Resellers and managed service providers use the API to retrieve usage data, apply markups, and generate custom invoices for their customers. IT teams use the API to build automated cost reports, create dashboards that visualize spending trends, or trigger alerts based on custom business logic. 

For example, a managed service provider might use the Billing API to pull detailed usage data for a tenant contract, add a service margin and additional managed services, and generate a consolidated invoice. An enterprise IT team might automate a weekly report that shows spending by department, compares current month costs to the previous month, and flags any VDCs where spending increased by more than 20%. 

### 5.3 Integrating the Billing API

While the Billing API provides powerful capabilities, it requires programming knowledge to use effectively. If you are comfortable with REST APIs and authentication workflows, the Billing API offers the flexibility to build exactly the cost management workflows your organization needs. 

For users who do not need programmatic access, the Data Center Designer provides a graphical interface to the same underlying data. The Cost and Usage dashboard and Cost Alerts are built on the Billing API, so you get the same information through a user-friendly interface without writing code. 

## Common Use Cases

Real-world scenarios where IONOS cost management tools are used: 

- Startup Managing Growth with Cost Alerts: A fast-growing startup runs its application on IONOS Cloud with a monthly budget of $2,000. They set Cost Alerts at $1,000 (50%), $1,500 (75%), and $1,800 (90%) of their budget. When the first alert triggers, they review the Cost and Usage dashboard (Section 1.2) and discover that a development environment was left running overnight. They shut down non-essential resources and stay within budget.

- Enterprise Optimizing with Cloud Savings Plans: A large enterprise runs a stable production workload requiring 200 CPU cores and 800 GB RAM continuously. Initially on pay-per-use pricing, they analyze six months of Cost and Usage data (Section 1.1) and realize their consumption is highly predictable. They purchase a three-year Cloud Savings Plan (Section 3.2), reducing their hourly rate by 35% and saving approximately $50,000 annually.

- Reseller Building Custom Invoices with Billing API: A managed service provider serves multiple small business clients on IONOS Cloud. They use the Billing API (Section 5.1) to programmatically retrieve detailed usage data for each tenant contract, apply a 20% service margin, bundle managed support services, and generate PDF invoices branded with their company logo, all automatically at the end of each month.

## Summary

Cost management on IONOS Cloud is about visibility, control, and optimization. The Cost and Usage dashboard provides detailed breakdowns of resource consumption and spending by product category and Virtual Data Center, helping you understand where money is being spent. Cost Alerts give you proactive notifications when spending reaches defined thresholds, preventing budget overruns. Cloud Savings Plans offer substantial discounts for predictable, long-running workloads in exchange for committing to resource quantities over one or three years. Resource limits and quotas define what you can provision, with the Resource Overview window showing your current usage against contracted allowances. For programmatic access, the Billing API enables integration with internal financial systems and custom reporting workflows. 

Effective cost management combines these tools into a cohesive strategy: monitor usage regularly with the dashboard, set alerts to catch unexpected spending, use Cloud Savings Plans for stable workloads, track resource consumption against quotas to plan capacity, and leverage the Billing API when automation is needed. By understanding these capabilities and using them appropriately, you can maintain budget discipline while ensuring your infrastructure has the resources it needs. 

Key Points: 

- The Cost and Usage dashboard tracks consumption by product category, VDC, and time period, showing item-level details including price per unit and usage

- Cost Alerts send one-time email notifications when net invoice amounts reach defined thresholds, providing early warning of budget overruns

- Pay-per-use pricing offers maximum flexibility with no commitments but at standard hourly rates, ideal for variable or experimental workloads

- Cloud Savings Plans provide discounted rates (30-40% savings) in exchange for committing to resource quantities for one or three years, best for stable workloads

- Resource limits are platform maximums while quotas are contract-specific allocations, both visible in the Resource Overview window

- The Billing API enables programmatic access to usage data, invoices, and Cost Alert management for automation and integration

Important Terminology: 

- Cost and Usage Dashboard: Centralized tool for viewing detailed resource consumption and billing information by product category and time period

- Cost Alert: Threshold-based email notification that triggers when contract net invoice amount reaches or exceeds a defined value

- Pay-Per-Use (PAYG): Pricing model where you pay for resources by the hour based on actual consumption with no upfront commitment

- Cloud Savings Plans: Commitment-based pricing model offering discounted hourly rates in exchange for committing to resource quantities for one or three years

- Resource Limits: Platform maximum values for specific resource types (CPUs, RAM, VMs, storage)

- Quotas: Contract-specific allocations defining how much of each resource type your account can use

- Billing API: Programmatic interface for retrieving usage data, invoices, and managing Cost Alerts

## Next Steps

Continue Learning: Unit 3.4: Activity Logs and Monitoring 

Related Topics: 

- Unit 1.2: Cloud Service Benefits - Cloud cost optimization and TCO

- Unit 3.1: Data Center Designer and Account Management - Contract management and user roles

Mark as Complete 

Previous

3.2 Identity and Access Management 

Next

3.4 Activity Logs and Monitoring


--- FILE: unit-3.4-logs-monitoring.html ---

17 min read

## Learning Objectives

By the end of this module, you will be able to: 

- Explain what Activity Logs are and why they are essential for security auditing and compliance

- Describe how Flow Logs provide network visibility and help troubleshoot connectivity issues

- Identify the key capabilities of the Monitoring Service and how it helps track system health

- Explain how the Logging Service centralizes log management across your infrastructure

- Compare these services and determine when to use each for different observability needs

# Unit 3.4: Activity Logs and Monitoring

## Introduction

Imagine running a large office building where you need to know three critical things: who entered which rooms and when (security access logs), what&#x27;s happening in the ventilation system (network flow monitoring), and whether all the equipment is running smoothly (performance metrics). In the cloud, you need similar visibility into your infrastructure to maintain security, troubleshoot issues, and ensure everything operates as expected. 

IONOS Cloud provides multiple observability services that work together to give you complete visibility into your environment. Activity Logs track every user action for security and compliance. Flow Logs capture network traffic patterns for connectivity troubleshooting. The Monitoring Service visualizes system performance metrics in real-time dashboards. The Logging Service centralizes application and infrastructure logs for analysis. Understanding what each service does and when to use it is essential for managing any cloud environment effectively. 

## 1. Activity Logs for Audit Trails

Activity Logs provide a read-only, chronological record of every action performed on your IONOS Cloud resources. Think of them as a security camera system for your cloud account, recording who did what, when they did it, and from where. 

### 1.1 What Activity Logs Capture

Activity Logs record a comprehensive range of events across your contract, creating an immutable audit trail that you cannot modify or delete. Every entry includes: 

- User actions - Logins, logouts, and authentication events

- Resource operations - Provisioning new resources, configuration changes, deletions

- Data access - When users accessed or modified data

- Source information - IP addresses, services, or systems that initiated the action

- Timeline details - Precise timestamps for every event

- Affected resources - The specific resource type, ID, and the action taken

Because Activity Logs are read-only, you interact with them exclusively through GET requests via the API. This design ensures the logs cannot be tampered with, preserving their integrity for security investigations and compliance reporting. 

### 1.2 Why Activity Logs Matter

Activity Logs deliver critical benefits for security, operations, and compliance: 

Benefit 

How Activity Logs Deliver It 

Full visibility 

Every action across your contract is recorded with details about who, what, when, and where 

Security investigations 

Quickly identify suspicious activity, trace breaches, and respond appropriately 

Audit reporting 

Generate access reports that list user login data, device/IP information, and resource actions 

Regulatory compliance 

Provide the evidence required by GDPR, SOX, HIPAA, and other frameworks 

Access reviews 

Review activity over specific date ranges, spot excessive privileges, and revoke unnecessary access 

Tamper resistance 

Read-only design ensures logs cannot be altered, preserving integrity for audits 

Organizations use Activity Logs to answer critical questions like &quot;Who deleted this snapshot?&quot; or &quot;When did a user log in from an unusual IP address?&quot; The logs are filterable by date range and grouped by contract, making it easy to narrow down investigations to specific time periods or accounts. 

### 1.3 Activity Logs in Practice

Contract owners and administrators access Activity Logs through the IONOS API. The logs are filterable by date ranges, allowing you to download entries for specific periods as JSON data. This makes it straightforward to integrate Activity Logs with security information and event management (SIEM) systems or to generate compliance reports for auditors. 

Because logs are partitioned by contract, you see only the activity relevant to your specific resources, ensuring data isolation between different customers and accounts. This architecture supports multi-contract environments where administrators manage multiple customer accounts while keeping their audit trails separate. 

## 2. Flow Logs for Network Visibility

Flow Logs capture detailed information about network traffic that passes through your virtual machines, Managed NAT Gateway , or Managed Load Balancers. Unlike Activity Logs that track user actions, Flow Logs show you the actual network communication patterns happening inside your infrastructure. 

### 2.1 What Flow Logs Capture

Flow Logs record metadata about every packet flow that traverses a network interface. The following table shows what they capture and how it provides visibility: 

What They Capture 

How They Provide Visibility 

IPv4 and IPv6 flow data - source/destination IPs, ports, protocol, packet/byte counts, timestamps, and firewall action (accepted, rejected, or any) 

Complete, queryable history of inbound, outbound, or bidirectional traffic. Identify which traffic is allowed vs. blocked, detect unexpected sources or spikes, audit firewall rule effectiveness, and perform security investigations 

Direction - Ingress (incoming), Egress (outgoing), or Bidirectional 

Focused visibility on only incoming traffic, only outgoing traffic, or the full picture, depending on troubleshooting needs 

Action filter - Accepted, Rejected, or Any 

Concentrate on denied traffic (security-oriented) or all traffic (performance-oriented) 

Target storage - Logs written to IONOS Cloud Object Storage bucket with optional prefix 

Centralized storage makes data easy to ingest into analytics tools (Grafana, Logging Service, custom pipelines) for dashboards, alerts, and long-term retention 

The glossary defines flow logs as &quot;a feature that allows you to capture data related to IPv4 network traffic flows, enabled for any network interface of a VM instance and Network Load Balancer, as well as the public interfaces of the NAT Gateway.&quot; 

### 2.2 Why Flow Logs Matter

Flow Logs provide network-level observability that complements Activity Logs &#x27; user-level visibility. They help you: 

- Monitor network security - See which connections are being blocked by firewall rules and identify potential security threats

- Troubleshoot connectivity - Diagnose why traffic isn&#x27;t reaching its destination by examining flow patterns

- Audit firewall rules - Verify that security rules are working as intended by reviewing accepted vs. rejected traffic

- Detect anomalies - Identify unexpected traffic sources, unusual port usage, or sudden traffic spikes

- Support compliance - Many regulations require tracking and reporting network flows for data security audits

Once activated, a green indicator on the network interface properties shows the flow log rule is valid and provisioned, meaning data collection has begun. The flow data is stored as objects in IONOS Cloud Object Storage , where you control retention policies and can query the data using standard analytics tools. 

### 2.3 Flow Logs in Practice

You create flow log rules for specific network resources (VM network interfaces, Managed NAT Gateway , Managed Network Load Balancer , or Managed Application Load Balancer ). Each rule specifies: 

- Name - Descriptive identifier for the rule

- Direction - What traffic to capture (Ingress, Egress, or Bidirectional)

- Action - Which packets to log (Accepted, Rejected, or Any)

- Target bucket - The IONOS Cloud Object Storage bucket where logs will be stored

- Optional prefix - Organizes logs within the bucket using a folder-like structure

The logs are written continuously as objects to your specified bucket, where they remain until you delete them or your bucket lifecycle policies remove them. This gives you complete control over retention periods while supporting long-term storage for compliance requirements. 

## 3. Monitoring Service Overview

The Monitoring Service provides real-time visibility into system performance by collecting, aggregating, and visualizing metrics from your entire infrastructure. Unlike Activity Logs and Flow Logs that focus on security and networking, the Monitoring Service tracks the health and performance of your applications, servers, and services. 

### 3.1 How the Monitoring Service Works

The Monitoring Service uses a centralized architecture that collects metrics from multiple sources and displays them in Grafana dashboards. The following table outlines what you can monitor: 

Metric Category 

What You Can Track 

Host-based 

CPU utilization, memory usage, disk space, processes, network traffic, storage I/O, system metrics 

Application 

Error/success rates, service failures/restarts, response latency, resource usage 

Network &amp; connectivity 

Connectivity status, packet loss, latency, bandwidth utilization 

Server-pool 

Pooled resource usage, scaling indicators, degraded instances 

External-dependency 

Service status, success/error rates, run-rate, resource exhaustion 

All metrics are visualized in a single Grafana instance, giving you one place to query, explore, and analyze data from any source you push to the service. The Monitoring Service is designed to handle high volumes of metrics with near-real-time ingestion (approximately one-minute intervals by default), ensuring dashboards stay responsive even under heavy load. 

### 3.2 Dashboard Customization and Alerts

The Monitoring Service offers powerful dashboard customization through Grafana. You can: 

- Create new dashboards - Build custom views tailored to your specific monitoring needs

- Edit existing panels - Modify queries, change visualization types (graphs, tables, heat maps), adjust time ranges

- Share dashboards - Make dashboards accessible to other users or public within your organization

- Set up alerts - Define thresholds and conditions that trigger notifications via email, Slack, webhooks, or other channels

- Manage access - Use role-based access control to determine who can view, edit, or administer dashboards

Every sub-user gets at least a Viewer role, allowing them to see dashboards. Administrators can grant Editor or Admin roles to enable team members to create dashboards or configure alerts. Alerts are defined directly in Grafana panels by setting thresholds and conditions. When a metric breaches a rule, Grafana sends notifications through your configured channels. 

### 3.3 Monitoring Service in Practice

To use the Monitoring Service , you create a monitoring pipeline in your desired region. The service returns a unique Grafana URL that remains consistent for all your monitoring pipelines. You then configure agents or exporters (Prometheus, Grafana Agent, OpenTelemetry, FluentBit) on your servers to push metrics to the regional endpoint. 

Once metrics begin flowing, you open the Grafana URL and log in with your IONOS credentials. You&#x27;ll see a default dashboard showing an overview of all metrics. From there, you can clone the default dashboard, customize it, and save your changes. Dashboards automatically refresh at configurable intervals, providing live visibility into your infrastructure&#x27;s health. 

The service supports flexible data retention policies, allowing you to store metrics for the periods required by your business or compliance needs. The default push interval is one minute, but you can adjust this based on your monitoring requirements and cost considerations. 

## 4. Logging Service and Centralized Log Management

The Logging Service provides a centralized platform for collecting, storing, indexing, and visualizing logs from all your applications, containers, virtual machines, and infrastructure components. While Activity Logs track user actions and Flow Logs capture network traffic, the Logging Service handles application logs, system logs, and any other log data your infrastructure generates. 

### 4.1 How the Logging Service Works

The Logging Service follows a shared responsibility model with two main components: 

Component 

Responsibility 

How It Works 

Log Collection 

User (you) 

Install and configure a log-forwarding agent (Fluent Bit) on each log source. The agent sends logs via TLS to a pipeline endpoint using a Tag and a SharedKey for authentication 

Log Aggregation 

IONOS (provider) 

The service manages the aggregation layer (storage, indexing, search) and exposes a pipeline endpoint. Logs are stored with server-side encryption and made available through a Grafana interface 

The architecture enables near-real-time log ingestion (typically within seconds), giving DevOps teams immediate visibility into what&#x27;s happening across their infrastructure. Each log pipeline gets a unique regional endpoint, and every log source within a pipeline must use a unique tag so logs can be distinguished even when sharing the same endpoint. 

### 4.2 Key Capabilities

The Logging Service delivers several essential capabilities for modern cloud operations: 

Capability 

What It Provides 

Unified visualization 

All collected logs appear in a single Grafana instance where you can query, explore, and visualize data from any source 

Retention policies 

Configure automatic deletion of logs after defined periods to control costs while supporting compliance-driven long-term storage 

Real-time monitoring 

Near-real-time ingestion enables live log visualization, alerting, and dashboard updates 

Security 

TLS-encrypted transport, server-side encryption at rest, optional client-side encryption before transmission 

Access control 

Create sub-users and assign pipeline-level permissions. Sub-users see only pipelines they&#x27;re granted access to 

Scalability 

Designed to handle extensive log volumes with auto-scaling capabilities. Logs are available 24/7 via the web UI 

Integration 

Central logging can be enabled on Application Load Balancers, Network Load Balancers, Object Storage buckets, and other services 

The default ingestion rate is 50 HTTP requests per second per pipeline, though this can be adjusted based on your needs. Each pipeline runs in its own partition, ensuring data isolation between users and preventing cross-contamination of log data. 

### 4.3 Logging Service in Practice

Using the Logging Service involves several steps: 

- Create a pipeline through the Data Center Designer or API in your desired region

- Install Fluent Bit on each host or container that produces logs you want to collect

- Configure Fluent Bit with the pipeline endpoint host and port, a unique tag for the log source, and the SharedKey token

- Start the agent to begin forwarding logs over TLS to the pipeline

- Access Grafana to view, analyze, and create alerts on your log data

- Set retention policies and configure sub-user access as needed

The Grafana interface lets you search logs, create dashboards combining log data with metrics from the Monitoring Service , and set up alerts based on specific log events. This integration provides a unified observability platform where logs and metrics appear side-by-side for comprehensive troubleshooting. 

## 5. Choosing the Right Service

With four different observability services available, understanding when to use each is essential for effective cloud management. Each service focuses on a specific type of data and serves distinct operational needs. 

### 5.1 Service Comparison

The following table summarizes what each service records, where data lives, and typical use cases: 

Service 

What It Records 

Where It Lives 

Typical Use Cases 

Activity Logs 

User-level actions on IONOS Cloud resources - logins, provisioning, configuration changes, data access events 

Read-only API (GET requests) - downloadable as JSON 

Security &amp; compliance audits, forensic investigations, tracking who did what and when, reviewing privileged-user activity 

Flow Logs 

Network-traffic records for NICs, Managed NAT Gateway, or Managed Load Balancers - source/destination IP, ports, protocol, direction, and firewall action 

Written as objects to IONOS Cloud Object Storage bucket 

Network-security monitoring, troubleshooting connectivity/firewall rules, detecting unexpected or blocked traffic, compliance reporting of network flows 

Monitoring Service 

Metric data (CPU, memory, latency, error rates, business KPIs) collected from applications, servers, databases, IoT devices 

Central metric store visualized via Grafana with configurable retention 

Performance &amp; availability monitoring, capacity planning, CI/CD pipeline health, business-metric tracking, real-time alerting on thresholds 

Logging Service 

Application logs, system logs, and any custom log data generated by infrastructure 

Stored in service-managed aggregation layer, accessible via Grafana 

Centralized log management, troubleshooting application issues, DevOps monitoring during deployments, long-term log retention for compliance 

### 5.2 Decision Guide

Use this guide to determine which service best fits your specific needs: 

If You Need To... 

Use This Service 

Know who performed an action on a cloud resource and when (e.g., &quot;Who deleted this snapshot?&quot; or &quot;When did a user log in from an unusual IP?&quot;) 

Activity Logs - they provide a chronological, contract-wide view of all user-initiated operations 

See network traffic that traverses a specific interface - verify firewall effectiveness, audit connections, or comply with network-flow regulations 

Flow Logs - configure direction (Ingress/Egress/Bidirectional) and action (Accepted/Rejected/Any) and store logs in Object Storage 

Monitor the health, performance, or business metrics of applications, servers, or databases with real-time dashboards and alerts 

Monitoring Service - ingest metrics, visualize in Grafana, set custom alerts, and trigger automated remediation 

Centralize application and system logs for troubleshooting, searching specific log events, or long-term retention 

Logging Service - forward logs from all sources to a unified platform with powerful search and visualization 

Get a combined view of security events and network traffic 

Use both Activity Logs (user-level audit) and Flow Logs (packet-level audit) together 

Integrate logs and metrics in a single dashboard for comprehensive observability 

Use Monitoring Service and Logging Service together - both use Grafana for visualization 

Many organizations use multiple services together to achieve complete observability. For example, you might use Activity Logs for compliance audits, Flow Logs to troubleshoot network connectivity issues, the Monitoring Service to track server performance, and the Logging Service to investigate application errors. 

## Common Use Cases

Real-world scenarios where these services work together: 

- Security Incident Investigation: A financial services company detects unusual database access patterns. They use Activity Logs to identify which user account was compromised, Flow Logs to trace the source IP addresses and connection patterns, and the Logging Service to examine application logs for signs of data exfiltration. The combined visibility from all three services enables them to contain the breach, revoke compromised credentials, and file a detailed incident report for regulators.

- Application Performance Troubleshooting: An e-commerce platform experiences slow checkout page loads during a promotional event. The operations team uses the Monitoring Service dashboards (covered in Section 3) to identify elevated database query latency. They then examine the Logging Service (Section 4) for database error messages and discover a missing index. Flow Logs (Section 2) confirm that network connectivity to the database server is healthy, ruling out network issues. The team resolves the performance problem by adding the index.

- Compliance Audit Preparation: A healthcare provider must demonstrate HIPAA compliance for their patient portal. They configure Activity Logs (Section 1) to track all user access to patient data, set retention policies in the Logging Service (Section 4.2) to keep application logs for seven years, and enable Flow Logs (Section 2.1) to document network access patterns. During the audit, they generate reports showing who accessed what data, when access occurred, and that all access was properly authenticated and authorized.

## Summary

IONOS Cloud provides a comprehensive suite of observability services that work together to give you complete visibility into your infrastructure, applications, and user activity. Activity Logs create an immutable audit trail of user actions for security and compliance. Flow Logs capture network traffic patterns for troubleshooting connectivity and monitoring security. The Monitoring Service collects and visualizes performance metrics in real-time Grafana dashboards. The Logging Service centralizes application and system logs for analysis and long-term retention. 

Understanding what each service does and when to use it is essential for effective cloud management. Activity Logs answer &quot;who did what,&quot; Flow Logs reveal &quot;what network traffic occurred,&quot; the Monitoring Service shows &quot;how systems are performing,&quot; and the Logging Service helps you &quot;troubleshoot application issues.&quot; Many organizations use multiple services together to achieve comprehensive observability across security, networking, performance, and application layers. 

Key Points: 

- Activity Logs provide a read-only, tamper-resistant audit trail of all user actions across your IONOS Cloud contracts, essential for security investigations and compliance reporting

- Flow Logs capture detailed network traffic metadata (source/destination IPs, ports, protocols, firewall actions) and store it in Object Storage for security monitoring and troubleshooting

- The Monitoring Service collects performance metrics from infrastructure, applications, and services, displaying them in customizable Grafana dashboards with alerting capabilities

- The Logging Service centralizes application and system logs using Fluent Bit agents, providing near-real-time visibility and long-term retention through a Grafana interface

- Each service serves distinct needs: Activity Logs for user actions, Flow Logs for network visibility, Monitoring Service for performance metrics, and Logging Service for application logs

- Organizations often use multiple services together to achieve complete observability across security, networking, performance, and application layers

Important Terminology: 

- Activity Logs: Read-only audit trail recording every user action (logins, provisioning, configuration changes, data access) on IONOS Cloud resources with details about who, what, when, and where

- Flow Logs: Network traffic metadata capture that records source/destination IPs, ports, protocols, and firewall actions for VM network interfaces, Managed NAT Gateway, and Managed Load Balancers

- Monitoring Service: Centralized platform that collects performance metrics (CPU, memory, latency, error rates) from infrastructure and applications, visualized through Grafana dashboards

- Logging Service: SaaS-based platform that aggregates application and system logs from multiple sources into a single searchable repository accessible via Grafana

- Grafana: Open-source visualization and analytics platform used by both the Monitoring Service and Logging Service to display dashboards, create alerts, and explore data

- Fluent Bit: Lightweight log forwarding agent used by the Logging Service to collect logs from various sources and send them securely to the aggregation platform

## Next Steps

Continue Learning: Unit 3.5: Security and Compliance 

Related Topics: 

- Unit 2.4: Networking Services

- Unit 3.2: Identity and Access Management

- Unit 3.3: Cost Management and Billing

Mark as Complete 

Previous

3.3 Cost Management and Billing 

Next

3.5 Security and Compliance


--- FILE: unit-3.5-security-compliance.html ---

17 min read

## Learning Objectives

By the end of this module, you will be able to: 

- Explain the shared responsibility model and distinguish between IONOS security responsibilities and customer security responsibilities

- Identify IONOS Cloud&#x27;s security certifications and compliance standards (ISO 27001, SOC 2, BSI C5, GDPR, PCI DSS)

- Describe how IONOS protects data using encryption at rest and in transit

- Explain how audit trails support compliance requirements and security investigations

# Unit 3.5: Security and Compliance

## Introduction

Imagine running a secure bank vault. The bank provides the building, the vault door, security guards, and alarm systems. But you are responsible for what you store inside, who gets the key, and how you organize your valuables. Cloud security works the same way: the provider secures the infrastructure, while you secure your workloads and data. 

In this unit, you will learn how IONOS Cloud shares security responsibilities with you, what certifications and compliance standards IONOS maintains, and how the platform protects your data through encryption and audit trails. Understanding these security fundamentals helps you build compliant, secure applications while meeting regulatory requirements like GDPR, ISO 27001, and industry-specific standards. 

## 1. Shared Responsibility Model

Cloud security operates on a shared responsibility model where both the cloud provider and the customer have distinct security duties. Understanding where IONOS&#x27;s responsibilities end and yours begin is critical for maintaining a secure environment. 

### 1.1 IONOS Responsibilities (Security OF the Cloud)

IONOS is responsible for maintaining the underlying cloud infrastructure, which includes: 

- Physical Infrastructure and Data Centers

- Compute and Storage Infrastructure

- Platform Services

IONOS maintains these layers continuously, ensuring the foundation of your cloud environment remains secure without requiring customer intervention. 

### 1.2 Customer Responsibilities (Security IN the Cloud)

As an IONOS Cloud customer, you are responsible for securing everything you deploy and configure within the cloud environment: 

Responsibility Area 

IONOS (Provider) 

Customer (You) 

Physical data centers and infrastructure 

Full responsibility 

No responsibility 

Network backbone and hardware 

Full responsibility 

No responsibility 

Hypervisor and virtualization layer 

Full responsibility 

No responsibility 

Managed service infrastructure 

Full responsibility 

Configuration and usage 

Operating systems on VMs 

Not responsible 

Full responsibility 

Applications and containers 

Not responsible 

Full responsibility 

Data encryption and backups 

Provides tools 

Implements and manages 

Identity and access management 

Provides platform 

Configures users and roles 

Network security rules 

Provides NSGs 

Configures rules 

Monitoring and logging 

Provides services 

Configures and analyzes 

### 1.3 Shared Controls

Some security controls involve both IONOS and the customer: 

Network Firewalls 

- IONOS provides Network Security Groups (NSGs) as a platform capability

- You configure the specific firewall rules that apply to your resources

Encryption 

- IONOS provides encryption capabilities and infrastructure

- You decide what data to encrypt and manage application-level encryption keys where applicable

Monitoring and Logging 

- IONOS provides Activity Logs, Flow Logs, and Monitoring Services

- You configure what to monitor, set up alerts, and respond to findings

Understanding this division of responsibility helps you identify security gaps and ensure complete coverage across all layers of your cloud environment. 

## 2. IONOS Security Certifications and Compliance

IONOS Cloud maintains multiple internationally recognized security certifications and adheres to major compliance frameworks, providing assurance that the platform meets rigorous security and privacy standards. 

### 2.1 ISO 27001 Certification

What It Is 

ISO 27001 is the international standard for Information Security Management Systems (ISMS). It establishes a systematic approach to managing sensitive data through risk assessment, security controls, and continuous improvement processes. 

IONOS Compliance 

IONOS Cloud data centers and services are ISO 27001-certified, demonstrating that IONOS follows internationally recognized best practices for information security management. The certification covers data centers in Germany (Berlin and Frankfurt) where IONOS Cloud services are hosted. 

What This Means for You 

When you run workloads on IONOS Cloud, you benefit from a platform built on ISO 27001 principles, providing a secure foundation for your own compliance efforts. Many organizations require cloud providers to hold ISO 27001 certification before they can host sensitive workloads. 

### 2.2 SOC 2 Type II Certification

What It Is 

SOC 2 (Service Organization Control 2) Type II is a compliance framework that evaluates controls related to security, availability, processing integrity, confidentiality, and privacy. Type II certification specifically demonstrates that these controls are operating effectively over time, not just designed properly. 

IONOS Compliance 

IONOS Cloud holds SOC 2 Type II certification, which requires independent auditors to verify that IONOS&#x27;s security processes and controls meet strict operational criteria consistently. The certification is renewed regularly through ongoing audits. 

What This Means for You 

SOC 2 Type II certification provides assurance that IONOS Cloud operations are monitored, controlled, and audited against industry-standard criteria. This is particularly important for organizations in regulated industries (healthcare, finance, government) that must verify their vendors meet specific security requirements. 

### 2.3 GDPR Compliance

What It Is 

The General Data Protection Regulation (GDPR) is the European Union&#x27;s comprehensive data protection law that governs the processing of EU citizens personal data by organizations. 

IONOS Compliance 

IONOS Cloud is fully GDPR-compliant, with data centers located in the European Union (Germany and Spain). All data handling, encryption at rest and in transit, and data residency controls are designed to meet GDPR requirements. IONOS provides tools and features that enable customers to build GDPR-compliant applications. 

What This Means for You 

If you process personal data of EU citizens, you can leverage IONOS&#x27;s GDPR-compliant infrastructure and EU-based data centers to meet data residency and sovereignty requirements. IONOS&#x27;s compliance framework helps you fulfill your own GDPR obligations. 

### 2.4 PCI DSS Compliance

What It Is 

The Payment Card Industry Data Security Standard (PCI DSS) is a set of security requirements designed to protect payment card data during processing, storage, and transmission. Organizations that handle credit card information must comply with PCI DSS. 

IONOS Compliance 

IONOS Cloud offers PCI DSS compliance as an optional certification for customers who need to process payment card data. This provides a compliant infrastructure foundation for e-commerce, payment processing, and other applications that handle credit card information. 

What This Means for You 

If you run applications that process credit card payments, you can leverage IONOS&#x27;s PCI DSS-compliant infrastructure to simplify your own compliance efforts. However, PCI DSS is a shared responsibility: IONOS secures the infrastructure, while you must ensure your applications and data handling practices also meet PCI DSS requirements. 

### 2.5 BSI C5 (Cloud Computing Compliance Criteria Catalogue)

What It Is : 

The C5 standard was developed by the German Federal Office for Information Security (BSI). It defines a catalog of requirements for information security in cloud computing and is considered one of the world&#x27;s strictest and most transparent standards for cloud providers. It covers 17 areas – from physical security to identity verification and dealing with law enforcement agencies. 

IONOS Compliance : 

IONOS Cloud regularly undergoes the corresponding audits to demonstrate compliance with the BSI C5 criteria. As IONOS is a German provider, adherence to BSI standards is a core component of the company&#x27;s strategy to offer a level of protection that exceeds international standards such as ISO 27001. 

What This Means for You: 

Public Sector &amp; Critical Infrastructure: If you work for the public sector or in the area of ​​critical infrastructure (KRITIS), C5 certification is often a prerequisite for using cloud services. Maximum transparency: The C5 certification provides you with detailed insight into IONOS&#x27;s operational processes, significantly simplifying internal risk analysis and compliance audits. Audit verification: You can be confident that the IONOS infrastructure has been audited according to German government security standards, minimizing your own liability risk. 

### 2.6 Compliance Summary Table

The following table summarizes IONOS Cloud&#x27;s key certifications and compliance standards: 

Certification / Standard 

What It Covers 

IONOS Status 

ISO 27001 

Information Security Management System (ISMS) with systematic data security controls 

Certified (ISO 27001-compliant data centers) 

SOC 2 Type II 

Security, availability, processing integrity, confidentiality, and privacy controls verified over time 

Certified (SOC 2 Type II compliance) 

GDPR 

EU data protection regulation for personal data of EU citizens 

Fully compliant (EU-based data centers, encryption, data residency) 

PCI DSS 

Payment card industry security standard for handling credit card data 

Available as optional compliance offering 

BSI C5 

Cloud security criteria defined by the Federal Office for Information Security (BSI) 

Conformity confirmed by independent auditors 

### 2.7 Digital Sovereignty: GDPR vs. US CLOUD Act

While IONOS Cloud meets all technical security requirements, the European legal framework offers a decisive advantage over non-European providers: 

- Immunity to the US CLOUD Act: As a German company without a US parent entity, IONOS is not subject to the Clarifying Lawful Overseas Use of Data (CLOUD) Act. Unlike US providers, who may be legally compelled to grant authorities access to data regardless of its physical storage location, IONOS operates exclusively under European jurisdiction.

- Digital Sovereignty: Customers retain exclusive legal control over their workloads and data. Access by government agencies is only possible through European legal processes and judicial orders, effectively eliminating the risk of foreign legal interference or secret data disclosure mandates.

## 3. Data Protection and Encryption

IONOS Cloud protects your data through comprehensive encryption strategies covering both data at rest (stored data) and data in transit (data moving across networks). 

### 3.1 Encryption at Rest

Encryption at rest protects stored data from unauthorized access, ensuring that even if physical storage devices are compromised, the data remains unreadable without the proper encryption keys. 

Block Storage Encryption 

- All Block Storage logical volumes created on IONOS Cloud are automatically encrypted using AES-XTS 256-bit encryption

- Each volume receives a unique encryption key that is invisible to the storage server

- Even root users cannot access the raw encryption keys

- Optional drive-level encryption on SSD Premium and Standard volumes adds a second layer of AES-XTS 256-bit encryption using self-encrypting drives (SEDs)

- Physically removing a drive from the data center renders the data unreadable

Backup Service Encryption 

- Server-side encryption uses AES-256 to protect backup data on storage devices

- Optional customer-side encryption allows you to encrypt backups using a password-derived key (AES-256)

- When using customer-side encryption, IONOS and the backup provider (Acronis) never store your encryption key

- This ensures only you can decrypt and restore your backup data

IONOS Cloud Object Storage Encryption 

- Server-Side Encryption with IONOS-managed keys (SSE-S3) using AES-256

- Customer-Managed Keys (SSE-C) option also uses AES-256 encryption

- All data stored in Object Storage buckets is encrypted automatically

Private Container Registry Encryption 

- Container images stored in the Private Container Registry are encrypted at rest using AES-256

- Encryption keys are managed by the IONOS platform

- Customers cannot supply their own encryption keys for container registry storage

### 3.2 Encryption in Transit

Encryption in transit protects data as it moves between your applications, IONOS services, and external systems, preventing eavesdropping and man-in-the-middle attacks. 

TLS/HTTPS Encryption 

- All IONOS Cloud API endpoints use TLS 1.2 or TLS 1.3 encryption

- IONOS Cloud Object Storage supports TLS 1.2/1.3 for all data transfers to and from S3-compatible endpoints

- Backup Service encrypts all backup traffic in real time using HTTPS/TLS with strong cipher suites (Diffie-Hellman and RSA key exchange)

- Management interfaces (Data Center Designer, API access) are protected by HTTPS/TLS

Network Service Encryption 

- VPN Gateway connections encrypt traffic between your on-premises networks and IONOS Cloud

- Certificate Manager provisions and manages SSL/TLS certificates for Application Load Balancers, ensuring encrypted client connections

### 3.3 Key Management

Platform-Managed Keys 

For most IONOS services, encryption keys are managed automatically by the IONOS platform: 

- Keys are stored securely within IONOS infrastructure and are never exposed to customers or administrators

- Access to encryption keys requires authenticated, authorized, and encrypted requests

- Keys are bound to the infrastructure, meaning physical drives removed from data centers remain encrypted and unreadable

Customer-Managed Keys (Limited Availability) 

Some services offer customer-managed encryption options: 

- Backup Service supports password-derived encryption keys that IONOS never stores

- Object Storage supports Customer-Managed Keys (SSE-C) for bucket encryption

- Most other services use platform-managed keys exclusively

### 3.4 Secure Data Deletion

When you delete data from IONOS Cloud, secure deletion processes ensure the data cannot be recovered: 

Volume and Backup Deletion 

- Deleting a Block Storage volume or backup zeroes out metadata, destroying the encryption key

- Without the encryption key, the encrypted data becomes permanently unreadable

- Physical drives are wiped according to NIST SP 800-88 Rev 1 guidelines

- When wiping is not possible, drives are physically destroyed

Object Storage Deletion 

- Deleting objects from IONOS Cloud Object Storage removes metadata and makes data unrecoverable

- Secure deletion follows the same NIST SP 800-88 guidelines as Block Storage

This comprehensive encryption approach (AES-256 for data at rest, TLS 1.2/1.3 for data in transit, secure key management, and NIST-compliant deletion) ensures your data remains confidential throughout its lifecycle on IONOS Cloud. 

## 4. Audit Trails for Compliance

Audit trails provide a chronological, tamper-proof record of all actions performed within your IONOS Cloud environment. These records are essential for security investigations, operational troubleshooting, and meeting regulatory compliance requirements. 

### 4.1 What Are Audit Trails?

An audit trail is a read-only, time-ordered log of significant events that captures: 

- Who performed the action (user identity and contract number)

- When the action occurred (exact timestamp)

- Where the action originated (source IP address and service)

- What was affected (resource type, resource ID, and specific action taken)

IONOS Cloud provides audit trails through the Activity Log service, which records every API request, configuration change, user login, resource creation, modification, and deletion across your cloud environment. 

### 4.2 Activity Log for Audit Trails

What Activity Logs Capture 

Activity Logs record all user activities and resource modifications, including: 

- User authentication events (logins, logouts, failed login attempts)

- Resource provisioning and de-provisioning (creating VMs, storage volumes, networks)

- Configuration changes (modifying firewall rules, updating load balancer settings)

- Data access events (accessing Object Storage, database connections)

- Identity and access management changes (creating users, modifying roles, changing permissions)

- Security events (Network Security Group rule changes, certificate deployments)

Activity Log Data Structure 

Each Activity Log entry includes: 

- Principal identity (user email, contract number, source IP, source service)

- Event type (e.g., RequestAccepted, ResourceCreated, ConfigurationChanged)

- Event resources (resource type, resource ID, action performed)

- Metadata (timestamp, audit log version)

Immutability and Retention 

Activity Logs are read-only and cannot be modified or deleted by users, ensuring tamper-proof audit trails. Logs are retained according to IONOS policies and compliance requirements, providing a historical record for investigations and audits. 

### 4.3 Using Audit Trails for Compliance

Audit trails support multiple compliance and security objectives: 

Regulatory Compliance 

Many regulations require audit trails of who accessed or modified data: 

- GDPR requires logging of personal data access and processing activities

- HIPAA requires audit trails for healthcare data access

- SOX (Sarbanes-Oxley) requires audit trails for financial data

- PCI DSS requires logging of access to cardholder data

Activity Logs provide the necessary evidence to demonstrate compliance with these requirements during audits. 

Security Investigations 

When security incidents occur, audit trails help you: 

- Identify the source of suspicious activity (which user, from what IP address)

- Trace the sequence of events leading to a security breach

- Determine the scope of unauthorized access or data exposure

- Provide evidence for incident response and forensic analysis

Access Reviews 

Regular audit trail reviews enable you to: 

- Identify excessive privileges granted to users or service accounts

- Detect orphaned accounts that should have been deactivated

- Monitor role and permission changes over time

- Revoke access promptly when users change roles or leave the organization

Operational Troubleshooting 

Beyond compliance, audit trails help with: 

- Diagnosing configuration issues (what changed before the problem occurred?)

- Understanding resource usage patterns and trends

- Verifying that automation scripts and Infrastructure as Code deployments executed correctly

### 4.4 Accessing Activity Logs

Activity Logs can be accessed through: 

IONOS Cloud API using GET requests to retrieve log entries programmatically

Data Center Designer (DCD) interface for viewing recent activity through the UI

Automation and integration with external SIEM (Security Information and Event Management) systems for centralized log analysis 

By regularly reviewing Activity Logs and integrating them into your security monitoring processes,

you can maintain compliance, detect security threats early, and respond quickly to incidents. 

## Common Use Cases

Real-world scenarios where IONOS Cloud security and compliance features are used: 

- Healthcare Application with GDPR and HIPAA Requirements: A healthcare provider builds a patient management system on IONOS Cloud. They leverage IONOS&#x27;s GDPR-compliant infrastructure and EU-based data centers (Section 2.3) to meet data residency requirements. Block Storage encryption at rest (Section 3.1) protects patient records, while TLS encryption in transit (Section 3.2) secures data transfers. Activity Logs (Section 4.2) provide the audit trails required by HIPAA regulations, recording all access to patient data for compliance reporting.

- E-commerce Platform with PCI DSS Compliance: An online retailer processes credit card payments and must comply with PCI DSS. They deploy their payment processing application on IONOS Cloud&#x27;s PCI DSS-compliant infrastructure (Section 2.4). Network Security Groups (referenced in Section 1.2) segment payment processing systems from other workloads. Certificate Manager (covered in Unit 2.6, referenced here for TLS termination) provides SSL/TLS certificates for secure payment transactions. Activity Logs track all configuration changes to payment systems, supporting PCI DSS audit requirements (Section 4.3).

- Financial Services Application with SOC 2 Requirements: A fintech company needs to demonstrate robust security controls to enterprise customers who require SOC 2 compliance. They build their application on IONOS Cloud&#x27;s SOC 2 Type II-certified infrastructure (Section 2.2). The shared responsibility model (Section 1) clarifies which security controls IONOS manages versus which the company must implement. They implement customer-managed encryption for sensitive financial data using Backup Service&#x27;s password-derived keys (Section 3.1), and they conduct monthly Activity Log reviews (Section 4.3) to identify any unauthorized access or privilege escalation attempts.

## Summary

Security and compliance on IONOS Cloud operate through a shared responsibility model where IONOS secures the cloud infrastructure (physical data centers, network, hypervisor) while customers secure their workloads, data, and configurations. IONOS Cloud maintains multiple internationally recognized certifications including ISO 27001, SOC 2 Type II, and GDPR compliance, with optional PCI DSS compliance for payment processing workloads. 

Data protection is achieved through comprehensive encryption strategies: AES-256 encryption at rest for Block Storage , Backup Service , Object Storage, and Container Registry, combined with TLS 1.2/1.3 encryption in transit for all data transfers. Encryption keys are managed by the IONOS platform for most services, with optional customer-managed keys for Backup Service and Object Storage. 

Audit trails provided by Activity Logs create tamper-proof records of all user activities and resource changes, supporting compliance requirements for GDPR, HIPAA, SOX, and PCI DSS. These logs capture who performed actions, when they occurred, where they originated, and what resources were affected, providing critical evidence for security investigations, access reviews, and regulatory audits. 

Key Points: 

- The shared responsibility model divides security duties: IONOS secures the infrastructure, customers secure their workloads, data, and configurations

- IONOS Cloud holds ISO 27001, SOC 2 Type II, and GDPR certifications, with optional PCI DSS compliance

- Data is encrypted at rest using AES-256 and in transit using TLS 1.2/1.3 across all IONOS Cloud services

- Activity Logs provide immutable audit trails required for compliance with GDPR, HIPAA, SOX, and PCI DSS regulations

- EU-based data centers in Germany (Berlin, Frankfurt) and Spain (Logroño) support data residency and sovereignty requirements

- Audit trails enable security investigations, access reviews, and operational troubleshooting beyond compliance requirements

Important Terminology: 

- Shared Responsibility Model: A cloud security framework dividing responsibilities between the cloud provider (infrastructure security) and customer (workload and data security)

- ISO 27001: International standard for Information Security Management Systems (ISMS) demonstrating systematic security controls

- SOC 2 Type II: Compliance framework verifying that security controls operate effectively over time, not just by design

- GDPR (General Data Protection Regulation): EU law governing personal data protection, requiring data subject rights, consent, and residency controls

- Encryption at Rest: Protecting stored data using encryption (AES-256) so it remains unreadable without decryption keys

- Encryption in Transit: Protecting data moving across networks using TLS/HTTPS to prevent eavesdropping and man-in-the-middle attacks

- Audit Trail: Chronological, read-only log of all actions in the cloud environment, capturing who, when, where, and what for compliance and security investigations

- Activity Log: IONOS Cloud&#x27;s audit trail service recording all API requests, configuration changes, and user activities

## Next Steps

Continue Learning: Course Completion 

Related Topics: 

- Unit 3.2: Identity and Access Management - Understanding user roles, permissions, and access controls

- Unit 3.4: Activity Logs and Monitoring - Deep dive into logging, monitoring, and observability services

- Unit 2.6: Security, AI, and Container Services - Network Security Groups, DDoS Protect, and Certificate Manager

Mark as Complete 

Previous

3.4 Activity Logs and Monitoring 

Next

3.6 Knowledge Check - Management and Governance


--- FILE: unit-3.6-knowledge-check.html ---

Test your understanding of the key concepts from Module 3. Select the best answer for each question, then submit to see your results. You need to score at least 60% to pass. 

1. 

Which statement best describes the key difference between an Administrator and a Contract Owner in IONOS Cloud? 

A 

Administrators can create subcontracts for customers, but the Contract Owner cannot 

B 

Administrators have full operational access to all resources but cannot change the payment method, while the Contract Owner can 

C 

Administrators can view all resources but must request explicit permission to edit them 

D 

Administrators and Contract Owners have identical rights across all areas of the account 

Explanation: 

The Contract Owner holds all privileges including exclusive control over the payment method, while Administrators share the same broad operational rights for managing resources and users but are specifically restricted from changing payment information. This distinction is covered in Section 2 of Unit 3.1. Options A, C, and D are incorrect because subcontract creation is a Contract Owner capability, Administrators have full edit rights by default, and the two roles differ precisely on financial controls. 

2. 

A developer has Two-Factor Authentication (2FA) enabled on their IONOS Cloud account and needs to authenticate API calls from an automation script. What is the correct approach? 

A 

Disable 2FA temporarily to allow the script to use a username and password for authentication 

B 

Ask an Administrator to disable 2FA enforcement for API-only accounts 

C 

Use the SSH Key Manager to generate a key pair for the automation script 

D 

Generate a Bearer token via the Token Manager and include it in the Authorization header of each API request 

Explanation: 

Token Manager is mandatory for accounts with 2FA enabled because API calls cannot use a password alone when 2FA is active. As described in Unit 3.2, Section 3, the developer generates a Bearer JWT from Menu - Management - Token Manager in the DCD, stores the token securely (it is shown only once), and places it in the Authorization header of every API call. Options A and B involve weakening security, and Option C is incorrect because SSH Key Manager handles VM access, not API authentication. 

3. 

A Cost Alert is configured with a threshold of $1,000. Your contract reaches $1,000 in charges, triggering an email notification. Spending then continues to $1,200. How many total email notifications does the alert send? 

A 

One - Cost Alerts trigger only once per threshold breach, regardless of how much spending increases afterward 

B 

Two - the alert fires at $1,000 and again when charges increase by another 20% 

C 

Three - the alert fires at the threshold, then every time charges increase by 10% 

D 

Zero - Cost Alerts do not send emails; they only appear in the Cost and Usage dashboard 

Explanation: 

As explained in Unit 3.3, Section 2.1, Cost Alerts send a single email notification the first time the threshold is reached or exceeded. The alert does not fire again even if spending continues to climb. This design prevents email flooding but means you should continue monitoring the Cost and Usage dashboard after receiving the initial alert. Options B, C, and D misrepresent how the notification mechanism works. 

4. 

A security analyst is investigating a potential data breach and needs to determine which user account performed specific configuration changes on a virtual machine last Tuesday. Which IONOS Cloud service provides this information? 

A 

Flow Logs , because they record all traffic associated with the virtual machine&#x27;s network interfaces 

B 

Monitoring Service , because it tracks all events that affect resource performance 

C 

Activity Logs , because they record every user-initiated action across the contract including who performed the action and when 

D 

Logging Service , because it centralizes all infrastructure and application events 

Explanation: 

Activity Logs provide a read-only, chronological audit trail of every user action including resource provisioning, configuration changes, logins, and data access events, along with the user identity, timestamp, and source IP. This is exactly the &quot;who did what and when&quot; question described in Unit 3.4, Section 1. Flow Logs (Option A) capture network traffic patterns, not user actions. The Monitoring Service (Option B) tracks performance metrics, not user operations. The Logging Service (Option D) handles application and system logs, not user-action audits. 

5. 

Under the IONOS Cloud shared responsibility model, which of the following is the customer&#x27;s responsibility? 

A 

Maintaining the physical security of data centers in Germany and Spain 

B 

Configuring operating system security settings and managing access controls on deployed virtual machines 

C 

Patching and updating the hypervisor layer that runs underneath virtual machines 

D 

Ensuring the network backbone connecting IONOS data centers operates securely 

Explanation: 

In the shared responsibility model covered in Unit 3.5, Section 1, IONOS is responsible for the physical infrastructure, network backbone, and hypervisor layer. Customers are responsible for everything they deploy on top of that foundation, including operating system hardening, application security, access control configuration, and data management. Options A, C, and D all describe infrastructure-layer responsibilities that IONOS owns entirely, not the customer. 

Submit Answers

Try Again

Previous

3.5 Security and Compliance 

Next

Course Completion