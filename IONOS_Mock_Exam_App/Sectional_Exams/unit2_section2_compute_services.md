# Unit 2 Section 2: Compute Services - Sectional Exam

**Coverage:** vCPU Servers, Dedicated Core Servers, Cubes (NVMe fixed-size), Cloud GPU VMs, VM Auto Scaling, Live Vertical Scaling, Images, Snapshots, pricing models, when to use each compute type
**Questions:** 30 | **Format:** Multiple Choice | **Time Estimate:** 25 minutes

---

**1. What is the defining characteristic of a Dedicated Core server in IONOS Cloud?**
A. It uses the fastest NVMe storage available and is pre-configured at a fixed size
B. Each VM receives an exclusively allocated physical CPU core, eliminating shared resource contention
C. It provides GPU acceleration for AI and machine learning workloads
D. It automatically scales horizontally based on CPU utilization metrics

**2. A general-purpose web application requires scalable virtual machines at the lowest cost possible, and occasional minor performance variation is acceptable. Which IONOS compute option is the best fit?**
A. Dedicated Core servers for guaranteed CPU performance
B. Cubes for the lowest price point with NVMe storage
C. vCPU servers for cost-effective, scalable general-purpose compute
D. Cloud GPU VMs for maximum processing throughput

**3. Which IONOS compute option includes NVMe Direct-Attached Storage (DAS) as part of a fixed, pre-configured package?**
A. vCPU Servers
B. Dedicated Core Servers
C. Cubes
D. Cloud GPU VMs

**4. A development team needs throwaway test environments that are cheap, quick to provision, and do not require guaranteed CPU performance. Which compute service is most appropriate?**
A. Dedicated Core servers with a 3-year Cloud Savings Plan
B. Cubes with pre-configured templates
C. vCPU servers with Live Vertical Scaling
D. Cloud GPU VMs with NVIDIA H200 GPUs

**5. The "noisy neighbor" effect refers to performance degradation caused by other virtual machines competing for shared physical resources. Which IONOS compute type completely eliminates this effect?**
A. vCPU servers, because they use virtual CPUs with resource capping
B. Cubes, because they use NVMe storage which reduces I/O contention
C. Dedicated Core servers, because the physical CPU core is exclusively allocated
D. Cloud GPU VMs, because GPU resources are never shared

**6. What is the over-provisioning factor used by IONOS Cubes on shared infrastructure?**
A. 1-to-2
B. 1-to-5
C. 1-to-10
D. 1-to-20

**7. Live Vertical Scaling (LVS) allows which operations on a running Linux server without requiring a reboot?**
A. Decreasing RAM and removing CPU cores
B. Adding CPU cores, RAM, and NICs
C. Migrating the VM to a different Availability Zone
D. Changing the underlying storage from HDD to SSD

**8. A company runs a PostgreSQL database on a Dedicated Core server. Transaction volumes spike at quarter-end. They need to add CPU cores without taking the database offline. Which feature enables this?**
A. VM Auto Scaling, by launching additional identical VM instances
B. Live Vertical Scaling (LVS), by adding cores while the server continues running
C. Snapshots, by cloning the VM to a larger instance type
D. Cubes migration, by moving to a larger fixed-size template

**9. What is the maximum number of vCPUs supported on a single IONOS Cloud virtual machine?**
A. 64
B. 128
C. 256
D. 60

**10. Which IONOS compute service is specifically designed for AI/ML training, model inference, and 3D rendering workloads?**
A. Dedicated Core servers with maximum RAM
B. Memory Cubes with high RAM-to-vCPU ratio
C. Cloud GPU VMs with NVIDIA H200 GPUs
D. vCPU servers with VM Auto Scaling enabled

**11. An e-commerce platform experiences a 10x traffic spike during Black Friday. The team wants the system to automatically add web server instances when CPU utilization crosses a threshold, and remove them when traffic returns to normal. Which IONOS service handles this?**
A. Live Vertical Scaling, which adds RAM and vCPUs to existing VMs
B. VM Auto Scaling, which automatically launches or terminates VM instances based on real-time metrics
C. Managed Kubernetes, which scales container replicas automatically
D. Application Load Balancer, which distributes load to prevent any VM from being overwhelmed

**12. VM Auto Scaling in IONOS Cloud creates new VMs within an Auto Scaling Group. What characteristic do all VMs in an Auto Scaling Group share?**
A. They are all assigned to the same Availability Zone
B. They are all created from the same image template
C. They all have identical public IP addresses
D. They all use Dedicated Core servers for consistent performance

**13. A Basic Cube XS instance on IONOS Cloud has which resource configuration?**
A. 2 vCPUs, 4 GB RAM, 120 GB NVMe storage
B. 1 vCPU, 2 GB RAM, 60 GB NVMe storage
C. 4 vCPUs, 8 GB RAM, 240 GB NVMe storage
D. 1 vCPU, 4 GB RAM, 60 GB NVMe storage

**14. Which of the following scaling operations is NOT supported without a reboot on IONOS Compute Engine servers?**
A. Adding a new NIC to the VM
B. Adding CPU cores to a Linux VM
C. Decreasing RAM on any VM (Linux or Windows)
D. Increasing the size of an attached Block Storage volume

**15. A company uses Compute Engine servers for production and Cubes for development. A developer requests moving a Cube from a Basic Cube M to a Basic Cube XL template. What is the constraint they must know?**
A. Cubes can be resized dynamically using Live Vertical Scaling
B. Cube resources are fixed at provisioning; templates cannot be changed after creation
C. Cubes can only be resized by creating a snapshot and restoring to a larger template
D. Resizing is possible but requires a minimum 1-hour maintenance window

**16. What distinguishes a Memory Cube from a Basic Cube in IONOS Cloud?**
A. Memory Cubes use SSD Block Storage instead of NVMe DAS
B. Memory Cubes provide more RAM per vCPU compared to Basic Cubes
C. Memory Cubes include a Dedicated CPU core for memory-intensive tasks
D. Memory Cubes support Live Vertical Scaling while Basic Cubes do not

**17. An Image in IONOS Cloud serves what primary purpose?**
A. A point-in-time backup of an existing Block Storage volume for recovery
B. An OS template used when deploying new virtual servers
C. A configuration snapshot of network settings and firewall rules
D. A compressed archive of all VDC resources for disaster recovery

**18. A Snapshot in IONOS Cloud captures what exactly?**
A. The entire VDC configuration including networking and firewall rules
B. A point-in-time copy of an existing Block Storage volume
C. An operating system template with pre-installed software packages
D. A live memory dump of a running virtual machine

**19. A team takes a snapshot of a Boot Volume in the Berlin (de/txl) region. They later need to use it to restore a VM in the Frankfurt (de/fra) region. What constraint applies?**
A. Snapshots can be copied across regions using the IONOS migration tool
B. Snapshots are usable only in the same data center location where they were created
C. Snapshots are globally available like public images
D. Cross-region snapshot access requires a Cross Connect between the two regions

**20. What is the key difference between a Private Image and a Snapshot in IONOS Cloud?**
A. Private Images are encrypted; Snapshots are stored in plaintext
B. Private Images serve as deployment templates for new VMs; Snapshots are point-in-time backups of existing volumes
C. Private Images are shared with all users; Snapshots are restricted to the Contract Owner
D. Private Images only support Linux; Snapshots support both Linux and Windows

**21. A Snapshot consumes storage quota equal to the full volume size, including empty space. A team has a 500 GB Block Storage volume that is only 10% full. How much storage quota does a snapshot consume?**
A. 50 GB (only the used portion of the disk)
B. 500 GB (the entire volume size, including empty space)
C. Zero, because snapshots are stored as metadata only
D. 250 GB (half the volume size, using delta compression)

**22. Which pricing model does IONOS Cloud offer for stable, always-on Dedicated Core workloads that run continuously for years?**
A. Pay-As-You-Go (PAYG), because it is always cheaper for long-running resources
B. Cloud Savings Plans with 1-year or 3-year commitments, delivering up to 35% savings
C. Reserved Instances tied to a specific VM type and region
D. Spot Instances using unused capacity at variable prices

**23. A company compares the cost of running 10 Dedicated Cores for 1 month under PAYG versus a 3-year Cloud Savings Plan. The approximate savings with the 3-year plan is closest to:**
A. 9%
B. 20%
C. 35%
D. 50%

**24. A Dedicated Core server allocates "one physical CPU core delivering 2 hyper-threads." What does this mean for application performance?**
A. The VM sees 1 logical CPU and cannot run multi-threaded applications
B. The VM sees 2 logical CPUs (hyper-threads), providing better multi-threaded performance than a single-threaded core
C. The 2 hyper-threads are shared with other VMs on the same physical host
D. Hyper-threading means the core runs at double the clock speed

**25. An architect must choose between Dedicated Core and vCPU servers for a new workload. The workload is a development database for internal testing, performance variability of up to 20% is acceptable, and budget is the primary constraint. What is the correct recommendation?**
A. Dedicated Core servers, because databases always need guaranteed performance
B. vCPU servers, because they provide cost-effective compute where some performance variability is acceptable
C. Cubes, because they offer fixed-size NVMe storage ideal for databases
D. Cloud GPU VMs, because they provide the highest throughput per dollar

**26. Cloud Savings Plans in IONOS Cloud are described as "resource-based, not instance-based." What does this mean?**
A. You must commit to a specific VM size and region for the plan's duration
B. The commitment applies to a quantity of CPU cores and RAM, and you can move workloads freely without being tied to a specific VM type
C. You are billed for a fixed number of VMs regardless of actual utilization
D. Savings Plans only apply to storage resources, not compute

**27. Which IONOS Cloud compute service has the highest SLA, making it the preferred choice for production workloads with strict uptime requirements?**
A. Cubes, because they use NVMe Direct-Attached Storage for faster I/O
B. Compute Engine (Dedicated Core or vCPU), which carries the highest SLA in the IONOS portfolio
C. Cloud GPU VMs, because GPU acceleration reduces workload runtime and thus failure exposure
D. All IONOS compute options carry identical SLAs

**28. A Windows Server VM needs its RAM increased. An administrator initiates Live Vertical Scaling for RAM. What will happen?**
A. RAM is added instantly with no interruption, identical to Linux behavior
B. A reboot is required to complete the RAM scaling on Windows systems
C. RAM scaling is not supported on Windows; a new VM must be provisioned
D. Windows VMs require a maintenance window of at least 4 hours for RAM changes

**29. Shrinking a disk (reducing its capacity) on an IONOS Block Storage volume is:**
A. Supported on Linux only, not on Windows
B. Supported but requires a scheduled maintenance window
C. Not allowed or supported under any circumstances
D. Available only for HDD volumes, not SSD

**30. A startup wants to deploy AI inference workloads within a European cloud environment while maintaining GDPR data residency. Which IONOS compute service is purpose-built for this scenario?**
A. Dedicated Core servers with maximum RAM for large model hosting
B. Cloud GPU VMs with NVIDIA H200 GPUs, available within IONOS European data centers
C. Memory Cubes XL with 64 GB RAM for in-memory model serving
D. vCPU servers with VM Auto Scaling to handle inference request spikes

---

## Answer Key

1. B — A Dedicated Core server gives each VM an exclusively allocated physical CPU core (delivering 2 hyper-threads), guaranteeing stable, predictable performance with no resource sharing between customers.

2. C — vCPU servers share physical resources across customers and are cost-effective and scalable, making them the right fit for general-purpose workloads where minor performance variability is acceptable.

3. C — Cubes are pre-configured VPS instances that bundle vCPU, RAM, and NVMe Direct-Attached Storage (DAS) into a single fixed-size package.

4. B — Cubes are the lowest-cost IONOS compute option and offer ready-to-use fixed templates, making them ideal for dev/test environments where guaranteed performance is not needed.

5. C — Dedicated Core servers allocate a physical CPU core exclusively to the VM, so no other customer can compete for that core, completely eliminating the noisy neighbor effect.

6. C — IONOS Cubes use a 1-to-10 over-provisioning factor on shared infrastructure, meaning multiple Cube instances share physical resources, which is acceptable for non-critical workloads.

7. B — On Linux systems with modern kernels, Live Vertical Scaling allows hot-adding CPU cores, RAM, and NICs without a reboot; only reducing CPU or RAM requires a reboot.

8. B — Live Vertical Scaling (LVS) is the feature that allows adding CPU cores to a running Compute Engine server without downtime, regardless of whether it is a Dedicated Core or vCPU server.

9. C — The IONOS Cloud platform supports a maximum of 256 vCPUs per virtual machine, which is the hard platform limit for a single VM.

10. C — Cloud GPU VMs are equipped with NVIDIA H200 GPUs and are specifically designed for AI/ML training, inference, 3D rendering, scientific simulation, and HPC workloads.

11. B — VM Auto Scaling is the IONOS managed service that continuously monitors metrics like CPU utilization and automatically launches or terminates VM instances in response, making it ideal for variable traffic patterns.

12. B — All VMs within a VM Auto Scaling Group are created from the same image template, ensuring consistency across instances so each new VM is ready to serve immediately.

13. B — The Basic Cube XS is the smallest Cube template: 1 vCPU, 2 GB RAM, and 60 GB NVMe storage — the entry-level option in the Basic Cube family.

14. C — Decreasing RAM (downscaling) on any operating system — Linux or Windows — requires a reboot and cannot be done while the server is running.

15. B — Cube resources (vCPU, RAM, NVMe storage) are fixed at the time of provisioning and cannot be changed after creation; Cubes do not support Live Vertical Scaling or template migration.

16. B — Memory Cubes offer a higher RAM-to-vCPU ratio than Basic Cubes; for example, Memory Cube XL provides 16 vCPUs with 64 GB RAM, versus Basic Cube XL's 16 vCPUs with 32 GB RAM.

17. B — An Image is an OS template (or installation ISO) used as the root disk when deploying new virtual servers; it enables consistent, repeatable VM provisioning.

18. B — A Snapshot is a full, point-in-time copy of an existing Block Storage volume, capturing the complete disk state at the moment it is taken, including empty space.

19. B — Snapshots can only be used in the same data center location where they were created; they are not automatically available across regions, unlike public images.

20. B — Private Images are deployment templates for new VMs (selected as the boot disk when creating a server), while Snapshots are point-in-time backups of existing volumes used for recovery and cloning.

21. B — Snapshots are not incremental; each snapshot captures the entire volume including empty space, so a 500 GB volume produces a 500 GB snapshot regardless of how much data is actually written.

22. B — Cloud Savings Plans with 1-year or 3-year commitments are the correct pricing model for stable, always-on workloads, delivering up to approximately 35% savings over Pay-As-You-Go rates.

23. C — According to IONOS pricing data, a 3-year Cloud Savings Plan delivers approximately 35% savings over PAYG for Dedicated Core resources running continuously.

24. B — Hyper-threading means a single physical core presents as 2 logical CPUs, allowing two threads to run simultaneously; the VM sees 2 logical CPUs, improving multi-threaded workload performance.

25. B — For a development database where performance variability is acceptable and budget is the primary concern, vCPU servers are the correct choice due to their lower per-hour cost compared to Dedicated Core.

26. B — Cloud Savings Plans commit to a quantity of CPU cores and RAM without being tied to a specific VM type, region, or operating system, giving customers flexibility to move workloads freely during the commitment period.

27. B — Compute Engine (both Dedicated Core and vCPU options) carries the highest SLA in the IONOS portfolio; Cubes carry a lower SLA and are described as suitable for non-critical workloads.

28. B — On Windows systems, scaling RAM via Live Vertical Scaling requires a reboot; Linux systems can hot-add RAM without downtime (with supported kernel versions).

29. C — Disk shrinking (reducing capacity) is not allowed or supported under any circumstances on IONOS Cloud; only increasing disk size is supported while the server is running.

30. B — Cloud GPU VMs with NVIDIA H200 GPUs are purpose-built for AI inference and training, and being hosted within IONOS European data centers ensures GDPR data residency compliance.
