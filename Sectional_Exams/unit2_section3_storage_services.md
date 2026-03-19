# Unit 2 Section 3: Storage Services - Sectional Exam

**Coverage:** Block Storage (HDD vs SSD Standard vs SSD Premium), Object Storage (S3-compatible, HTTP/HTTPS, Object Lock/WORM), Network File Storage (NFS), snapshots, images, Backup Service, use-case selection
**Questions:** 30 | **Format:** Multiple Choice | **Time Estimate:** 25 minutes

---

**1. A company needs to store the operating system and application files for a virtual machine. The storage must be presented to the OS as a raw block device that the team can format with ext4. Which IONOS storage service is correct?**
A. IONOS Cloud Object Storage, accessed via S3-compatible API
B. Network File Storage (NFS), mounted via NFSv4.2
C. Block Storage, which presents data as virtual block devices
D. Backup Service, which stores VM images for recovery

**2. What is the fixed sequential throughput of an HDD Block Storage volume in IONOS Cloud, regardless of volume size?**
A. 100 MiB/s
B. 200 MiB/s
C. 300 MiB/s
D. 400 MiB/s

**3. An HDD Block Storage volume provides approximately how many IOPS for random operations?**
A. 500 IOPS
B. 800 IOPS
C. 1,100 IOPS
D. 5,000 IOPS

**4. SSD Standard Block Storage delivers how many read IOPS per GB of volume size, up to a maximum cap?**
A. 20 IOPS per GB, up to 12,000 IOPS
B. 40 IOPS per GB, up to 24,000 IOPS
C. 75 IOPS per GB, up to 45,000 IOPS
D. 100 IOPS per GB, up to 60,000 IOPS

**5. An architect needs the highest possible IOPS for a large relational database handling thousands of transactions per second. Which Block Storage type should they select?**
A. HDD, because its fixed performance is predictable
B. SSD Standard, because it scales linearly with volume size
C. SSD Premium, which delivers up to 45,000 IOPS maximum
D. Network File Storage on SSD Standard backing

**6. IONOS Cloud Block Storage is described as "dual-redundant." What does this mean?**
A. Data is replicated across two geographic regions automatically
B. Data is written synchronously to two separate storage servers in active-active configuration
C. Two snapshots are automatically created for every write operation
D. HDD and SSD copies of data are maintained simultaneously

**7. A media company stores thousands of video files that must be globally accessible via HTTPS, cost-effective for long-term storage, and do not need to be mounted as a virtual disk. Which IONOS storage service best fits?**
A. Block Storage (SSD Standard), for high-throughput sequential reads
B. Network File Storage (NFS), for POSIX-compliant shared access
C. IONOS Cloud Object Storage, accessible via HTTP/HTTPS and ideal for large, static data
D. Backup Service, because it supports large binary files

**8. IONOS Cloud Object Storage is described as "S3-compatible." What practical advantage does this compatibility provide?**
A. It allows Object Storage to be mounted as a virtual disk using standard OS tools
B. Any S3-compatible tool, SDK, or client (such as AWS CLI, rclone, or Terraform) can interact with it without modification
C. Data stored in IONOS Object Storage can be automatically synchronized with AWS S3
D. It provides a Block Storage interface through the S3 API

**9. A regulatory requirement mandates that financial records must not be modified or deleted for 7 years. Which IONOS Cloud Object Storage feature enforces this?**
A. Bucket Versioning, which preserves previous versions of objects
B. Lifecycle Rules, which automate deletion after a defined period
C. Object Lock (WORM — Write-Once-Read-Many), which prevents modification or deletion during a retention period
D. Pre-signed URLs, which restrict access to authorized users only

**10. A SaaS company accidentally deletes a critical configuration file in their Object Storage bucket. Which feature, if enabled, would allow them to recover the previous version?**
A. Object Lock, which prevents deletion
B. Bucket Versioning, which preserves multiple versions of an object
C. Lifecycle Rules, which restore objects after deletion automatically
D. Pre-signed URLs, which provide temporary recovery access

**11. Multiple virtual machines in a cluster need simultaneous read/write access to the same shared directory of web assets. A single VM must not lock other VMs out. Which IONOS storage service supports this concurrent access pattern?**
A. Block Storage (SSD Premium), which provides the highest IOPS
B. IONOS Cloud Object Storage, accessed via HTTP/HTTPS from all VMs
C. Network File Storage (NFS), which provides POSIX-compliant shared file system access to multiple VMs simultaneously
D. Backup Service, which can mount backups to multiple VMs at once

**12. Network File Storage (NFS) on IONOS Cloud uses which NFS protocol version?**
A. NFSv3
B. NFSv4.0
C. NFSv4.1
D. NFSv4.2

**13. What is the minimum cluster size for Network File Storage in IONOS Cloud?**
A. 500 GB
B. 1 TiB
C. 2 TiB
D. 4 TiB

**14. Network File Storage is described as "POSIX-compliant." What does POSIX compliance mean for Linux application compatibility?**
A. It means the file system is accessible via HTTP/HTTPS like Object Storage
B. It means the file system supports standard POSIX semantics: permissions, ownership, file locking, and standard file operations (open, read, write, rename)
C. It means data is automatically encrypted using AES-256 before being written
D. It means the file system can be formatted with ext4 like a Block Storage volume

**15. A Kubernetes workload needs persistent shared storage that can be mounted simultaneously by multiple pods running on different nodes. Which IONOS storage service is compatible with Managed Kubernetes for this use case?**
A. Block Storage HDD for low-cost persistent volumes
B. Network File Storage (NFS), which is compatible with IONOS Managed Kubernetes for persistent shared storage
C. Object Storage, which Kubernetes accesses natively as a storage class
D. Backup Service, which provides snapshot-based persistent volumes

**16. The "root-squash" security feature in Network File Storage does what?**
A. Compresses large files to reduce storage consumption
B. Maps client-side root users to an anonymous UID/GID, preventing super-user privileges on the NFS server
C. Restricts NFS access to VMs within the same Availability Zone
D. Encrypts all data in transit between the NFS client and the storage server

**17. An organization uses IONOS Backup Service to protect virtual machines. Where are backups stored by default?**
A. In a Block Storage volume attached to the backup agent VM
B. In IONOS Cloud Object Storage in the same region as the VMs
C. In the internal Acronis cloud infrastructure located in Berlin, Germany
D. On a dedicated NAS device provisioned within the customer's VDC

**18. IONOS Backup Service is powered by which third-party platform?**
A. Veeam Backup & Replication
B. Acronis Cyber Protect Cloud
C. Commvault Complete Data Protection
D. Zerto Continuous Replication

**19. A developer needs to back up a VM disk before applying a major OS patch. They want a quick, point-in-time copy without scheduling or automation tools. What is the fastest approach in IONOS Cloud?**
A. Create a new Image from the volume using the FTP upload method
B. Right-click the provisioned storage volume in the DCD and choose "Create Snapshot"
C. Configure a Backup Service protection plan to run immediately
D. Detach the volume and export it via the Object Storage API

**20. What is a key limitation of Snapshots that makes them unsuitable as a complete replacement for a managed backup solution like IONOS Backup Service?**
A. Snapshots cannot be used to restore a VM; they only clone data to a new volume
B. Snapshots cannot be scheduled or have their retention automatically controlled
C. Snapshots are stored externally and incur high egress fees when accessed
D. Snapshots can only be created on HDD volumes, not SSD

**21. A team is designing storage for a three-tier application. Their PostgreSQL database requires maximum IOPS, their web servers use a standard OS boot disk, and they archive old logs cheaply. Which Block Storage combination is correct?**
A. SSD Premium for the database, SSD Standard for boot disks, HDD for log archives
B. SSD Standard for the database, HDD for boot disks, SSD Premium for log archives
C. HDD for the database, SSD Standard for boot disks, SSD Premium for log archives
D. SSD Premium for both the database and boot disks, HDD for log archives

**22. How does SSD Standard Block Storage performance scale compared to HDD?**
A. SSD Standard has fixed performance regardless of volume size, similar to HDD
B. SSD Standard performance scales linearly with volume size (per-GB IOPS and throughput) until hitting the cap
C. SSD Standard performance scales based on the number of VMs attached to the volume
D. SSD Standard provides fixed performance but at a higher baseline than HDD

**23. Object Storage on IONOS Cloud organizes data using which structure?**
A. Hierarchical directories and subdirectories, similar to a traditional file system
B. A flat namespace of buckets and objects, where each object is addressed by a unique key
C. Tables and rows, like a relational database
D. Blocks and sectors, similar to Block Storage volumes

**24. A company wants to host a static website (HTML, CSS, JavaScript) without managing a web server. Which IONOS storage feature supports this directly?**
A. Network File Storage with a public-facing mount point
B. Block Storage with a web server daemon running on an attached VM
C. IONOS Cloud Object Storage, which supports static website hosting directly from a bucket
D. Backup Service, which can serve files via the Acronis console

**25. Pre-signed URLs in IONOS Cloud Object Storage are used for what purpose?**
A. Granting permanent public access to private bucket objects
B. Granting temporary, time-limited access to specific private objects without changing their overall permissions
C. Creating encrypted tunnels for bulk data transfer from on-premises systems
D. Authenticating API requests from within a VDC without exposing credentials

**26. A company stores customer medical records in Object Storage. Regulations require that records be retained for exactly 5 years and automatically deleted afterward. Which two Object Storage features should they combine?**
A. Versioning and Pre-signed URLs
B. Object Lock (WORM) for the 5-year retention period and Lifecycle Rules to automate deletion afterward
C. Bucket ACLs and Static Website Hosting
D. Encryption at rest and Cross-Region Replication

**27. SSD Premium Block Storage can deliver a maximum of how many read IOPS per volume?**
A. 24,000 IOPS
B. 30,000 IOPS
C. 40,000 IOPS
D. 45,000 IOPS

**28. A company's compliance team insists that deleted Block Storage data cannot be recovered by any subsequent user. What IONOS feature addresses this requirement?**
A. Dual-redundancy, which ensures data is always replicated
B. Secure deletion, which erases blocks so previously deleted data cannot be recovered
C. Object Lock (WORM), which prevents deletion for a set retention period
D. Snapshot retention, which keeps deleted data available for 30 days

**29. An architect must choose between Block Storage and Network File Storage for a database workload. The database is a single PostgreSQL instance that needs low-latency random I/O and must format the disk with its own file system. Which is the correct choice and why?**
A. Network File Storage, because NFS provides higher IOPS than Block Storage
B. Block Storage, because it presents raw block devices that the OS can format, providing low-latency random I/O suitable for databases
C. Object Storage, because S3-compatible storage eliminates the need for a file system
D. Network File Storage, because POSIX compliance is required for PostgreSQL to function

**30. All Block Storage volumes in IONOS Cloud are encrypted at rest by default. Which encryption approach is used?**
A. Application-level encryption managed by the customer
B. Server-side encryption managed by IONOS, applied automatically to all volumes
C. Client-side encryption with customer-managed keys that must be provided at provisioning
D. Encryption is optional and must be enabled explicitly per volume

---

## Answer Key

1. C — Block Storage presents data to virtual machines as raw block devices that the OS can partition and format with file systems like ext4, making it the correct choice for OS disks and application storage.

2. B — HDD Block Storage delivers a fixed sequential throughput of 200 MiB/s regardless of volume size; this static performance makes it cost-effective for cold storage and archival workloads.

3. C — HDD volumes provide approximately 1,100 IOPS for random operations (at 4 KiB block size), regardless of volume size, making them unsuitable for high-IOPS workloads like active databases.

4. B — SSD Standard delivers 40 IOPS per GB for reads and 30 IOPS per GB for writes, with a maximum read cap of 24,000 IOPS; performance scales linearly with volume size until the cap is reached.

5. C — SSD Premium delivers up to 45,000 read IOPS (at 75 IOPS per GB) and is the highest-performance Block Storage option, designed for latency-sensitive databases requiring maximum throughput.

6. B — Dual-redundant means every write to Block Storage is synchronously replicated to two separate storage servers in an active-active configuration, ensuring data durability even if one server fails.

7. C — IONOS Cloud Object Storage is the correct answer: it is accessible via HTTP/HTTPS from anywhere, highly scalable, cost-effective for large static files, and does not require the data to be attached to a VM.

8. B — S3 compatibility means any tool or SDK built for Amazon S3 (AWS CLI, Terraform, rclone, Cyberduck, etc.) can communicate with IONOS Object Storage without modification, reducing migration and tooling costs.

9. C — Object Lock (WORM — Write-Once-Read-Many) prevents objects from being modified or deleted for a specified retention period, satisfying compliance requirements for immutable record retention.

10. B — Bucket Versioning preserves multiple versions of every object, allowing recovery of any previously saved version after an accidental deletion or overwrite.

11. C — Network File Storage provides a POSIX-compliant NFS share that multiple VMs can mount and access simultaneously, supporting concurrent reads and writes from many clients at once.

12. D — IONOS Network File Storage uses NFSv4.2, the latest NFS protocol version, which includes compound operations, caching, and parallel connections for efficient shared file access.

13. C — The minimum cluster size for Network File Storage is 2 TiB of usable space; the maximum is 42 TiB.

14. B — POSIX compliance means the file system supports standard Unix-style semantics: file permissions (read/write/execute), ownership (user/group), file locking, and standard system calls like open, read, write, and rename.

15. B — Network File Storage is compatible with IONOS Managed Kubernetes and provides persistent shared storage that multiple pods running on different nodes can mount simultaneously, which Block Storage (single-node attach) cannot.

16. B — Root-squash maps any root user connecting from a client VM to an anonymous UID/GID on the NFS server, preventing a compromised client machine from gaining super-user control over the shared storage.

17. C — By default, IONOS Backup Service stores backups in the internal Acronis cloud infrastructure located in Berlin, Germany; customers can optionally redirect backups to IONOS Cloud Object Storage.

18. B — IONOS Backup Service is powered by Acronis Cyber Protect Cloud, which provides the backup engine, centralized console, and advanced features like continuous data protection and immutable storage.

19. B — The fastest way to create a point-in-time backup of an existing volume is to right-click it in the Data Center Designer (DCD) and select "Create Snapshot"; no scheduling or additional service configuration is required.

20. B — Snapshots cannot be scheduled automatically and have no built-in retention management; they must be manually created and deleted, which is why they are not a substitute for a managed backup service like IONOS Backup Service.

21. A — SSD Premium for the database (maximum IOPS), SSD Standard for OS boot disks (good general performance), and HDD for log archives (fixed low performance at the lowest cost) is the correct tiered storage design.

22. B — Unlike HDD (fixed performance regardless of size), SSD Standard scales linearly: a larger volume delivers proportionally more IOPS and throughput until the maximum cap (24,000 read IOPS, 300 MiB/s) is reached.

23. B — Object Storage uses a flat namespace: objects are placed in buckets and addressed by unique keys (e.g., "images/photo.jpg"), with no true directory hierarchy, enabling virtually unlimited scalability.

24. C — IONOS Cloud Object Storage supports static website hosting directly from a bucket with public-read access, serving HTML, CSS, and JavaScript files without requiring a separate web server VM.

25. B — Pre-signed URLs grant temporary, time-limited access to specific private objects in Object Storage, allowing files to be shared with external users without changing bucket permissions or exposing credentials.

26. B — Object Lock (WORM) enforces the 5-year retention period by preventing modification or deletion, while Lifecycle Rules automate deletion of objects after the retention period expires, combining compliance with cost control.

27. D — SSD Premium Block Storage delivers a maximum of 45,000 read IOPS per volume (at 75 IOPS per GB), making it the highest-IOPS storage option in the IONOS portfolio.

28. B — Secure deletion in IONOS Cloud erases the underlying blocks so that data previously stored on a volume cannot be recovered by any subsequent user or administrator, meeting strict data privacy requirements.

29. B — Block Storage is the correct choice: it presents a raw block device that PostgreSQL (and the OS) can format and control directly, providing the low-latency random I/O that relational databases require.

30. B — All IONOS Block Storage volumes are encrypted at rest by default using server-side encryption managed by IONOS; customers do not need to configure or manage the encryption keys.
