# Unit 2 Section 5: Database Services - Sectional Exam

**Coverage:** DBaaS overview, managed vs self-managed databases, Managed PostgreSQL, Managed MariaDB, Managed MongoDB, In-Memory DB (Redis-compatible), Event Streams for Apache Kafka, backup and restore, use-case selection
**Questions:** 30 | **Format:** Multiple Choice | **Time Estimate:** 25 minutes

---

**1. What does "managed" mean in the context of IONOS Database-as-a-Service (DBaaS)?**
A. IONOS manages your application code and schema design on your behalf
B. IONOS handles infrastructure provisioning, patching, backups, and high availability while you retain control over data and database configuration
C. IONOS manages user access to the database directly, replacing your IAM policies
D. The database engine is locked to a specific version and cannot be upgraded

**2. A team is evaluating managed versus self-managed database deployment. Which operational task is eliminated by using a managed database service like IONOS DBaaS?**
A. Writing SQL queries and designing the database schema
B. Choosing the appropriate database engine for the workload
C. Provisioning physical servers, applying OS patches, and managing backup agents
D. Monitoring query performance and optimizing slow queries

**3. A financial services application requires strict ACID compliance, complex SQL joins across multiple tables, and the ability to replicate with zero data loss. Which IONOS managed database is the best fit?**
A. Managed MariaDB, because it is MySQL-compatible and easy to migrate to
B. Managed MongoDB, because it supports flexible schemas and horizontal sharding
C. Managed PostgreSQL, because it supports strict-synchronous replication and advanced ACID compliance
D. In-Memory DB, because sub-millisecond latency is critical for financial transactions

**4. A web development team is migrating from a MySQL-based e-commerce platform to IONOS Cloud. They want a relational database that is MySQL-compatible and allows them to reuse their existing queries, stored procedures, and schemas with minimal changes. Which IONOS service is the best choice?**
A. Managed PostgreSQL, because it has more advanced features than MySQL
B. Managed MariaDB, because it originated as a MySQL-compatible fork and maintains full MySQL syntax compatibility
C. Managed MongoDB, because its flexible schema avoids the need to rewrite schemas
D. In-Memory DB, because web applications benefit from in-memory caching

**5. Which IONOS managed database supports a unique self-restore feature that allows point-in-time recovery directly through the DCD or API without opening a support ticket?**
A. Managed PostgreSQL
B. Managed MongoDB
C. Managed MariaDB
D. In-Memory DB

**6. A product catalog for an e-commerce site needs to store items with highly variable attributes — a shirt might have size and color, while a TV has resolution and HDMI ports. New product types with new attributes are added frequently. Which database model handles this naturally?**
A. Managed PostgreSQL with strict schema enforcement and foreign key constraints
B. Managed MariaDB with a column-store analytics engine
C. Managed MongoDB, which stores data as BSON documents with flexible, per-document schemas
D. In-Memory DB, which stores key-value pairs for fast catalog lookups

**7. Managed MongoDB is available in three editions. Which edition provides free, single-node clusters for development and testing, based on Cube VMs with NVMe storage?**
A. Community Edition
B. Playground Edition
C. Business Edition
D. Enterprise Edition

**8. A company needs their MongoDB cluster to handle massive write throughput by distributing data across multiple nodes. Which MongoDB feature enables this horizontal scaling?**
A. Replica sets, which replicate data across nodes for read scaling
B. Write-ahead logging (WAL), which buffers writes for durability
C. Sharding, which distributes data partitions across multiple nodes to handle large datasets and high write throughput
D. Point-in-time recovery, which enables write-ahead log archiving

**9. In-Memory DB in IONOS Cloud is described as "Redis-compatible." What is the primary reason a team would choose In-Memory DB over a traditional disk-based database?**
A. In-Memory DB provides stronger ACID guarantees than relational databases
B. In-Memory DB stores all data in RAM, delivering sub-millisecond access latency — thousands of times faster than disk-based reads
C. In-Memory DB uses NVMe storage, which is faster than SSD Standard Block Storage
D. In-Memory DB automatically replicates data across multiple IONOS regions

**10. A web application with 50 app servers needs to store user session data centrally, ensuring all servers can access any user's session regardless of which server handled the previous request. Which IONOS service is ideally suited for this?**
A. Managed PostgreSQL with a sessions table, because it supports ACID transactions
B. Network File Storage (NFS), because all app servers can mount the same share
C. In-Memory DB (Redis-compatible), which provides fast, centralized session storage accessible from all application servers
D. IONOS Cloud Object Storage, which can be accessed via HTTP from all servers

**11. Event Streams for Apache Kafka is designed for which category of workload?**
A. Transactional relational data with complex SQL joins
B. Rapid development with flexible document schemas
C. High-throughput, real-time event streaming and processing
D. Caching frequently accessed data with sub-millisecond latency

**12. An IoT platform collects telemetry from 100,000 sensors simultaneously. Each sensor pushes a reading every second. The data must be processed in real time for anomaly detection. Which IONOS service handles this ingestion pattern?**
A. Managed PostgreSQL, because it supports time-series data types
B. In-Memory DB, because it stores data in RAM for immediate access
C. Event Streams for Apache Kafka, because it is designed for massive parallel event ingestion and real-time processing
D. Managed MongoDB, because it supports time-series collections

**13. In Apache Kafka's architecture, data is organized into what structure that enables parallel processing?**
A. Shards and replicas
B. Topics and partitions
C. Tables and indexes
D. Buckets and objects

**14. Which IONOS Managed Database service stores data as BSON (Binary JSON) documents?**
A. Managed PostgreSQL
B. Managed MariaDB
C. Managed MongoDB
D. In-Memory DB

**15. A Managed PostgreSQL cluster is configured with "strict-synchronous" replication. What does this guarantee?**
A. Writes are only committed after being acknowledged by a majority of replicas
B. Writes are confirmed as committed only after being durably written to all replica nodes, providing zero data loss
C. Writes are performed asynchronously for maximum throughput with eventual consistency
D. The primary node synchronously replicates to disk before acknowledging the write

**16. All IONOS managed database clusters share which common networking security characteristic?**
A. Databases are exposed via a public IP address protected by a managed WAF
B. Database clusters are deployed within private LANs and are reachable only through private networks, never directly from the internet
C. Database access requires an active VPN Gateway tunnel from any client
D. Databases use self-signed certificates that must be manually trusted by each application

**17. Automated backups for IONOS managed databases are typically retained for how long, supporting point-in-time recovery?**
A. 24 hours only
B. 3 days
C. Up to one week (7 days)
D. 30 days

**18. What is the maximum storage size for a single Managed MariaDB node on IONOS Cloud?**
A. 500 GB
B. 1 TB
C. 2 TB
D. 4 TB

**19. A company uses Managed MariaDB and discovers that a developer accidentally dropped a production table at 3:45 PM yesterday. They need to restore the database to exactly 3:44 PM. Which capability enables this?**
A. Daily snapshot restore, which restores the most recent full backup
B. Point-in-time recovery (PITR), which allows restoration to any specific moment within the retention period
C. Schema migration rollback, which reverses the last DDL statement applied
D. MongoDB-style oplog replay, which replays recent operations in reverse

**20. An application architect needs to choose between Managed PostgreSQL and Managed MongoDB for a new social media platform's user profile store. User profiles have widely varying numbers of fields, new profile attributes are added monthly, and the team wants to avoid schema migration downtime. Which is the better choice and why?**
A. PostgreSQL, because it has the most advanced indexing for profile lookups
B. MongoDB, because its flexible document schema accommodates variable profile structures without schema migration downtime
C. MariaDB, because it is MySQL-compatible and social media platforms traditionally use MySQL
D. In-Memory DB, because all profile data should be cached in RAM for fast access

**21. An e-commerce platform uses four different database services for different data types: orders, product catalog, shopping carts, and user click-stream events. Match each use case to the correct IONOS database service:**
A. Orders=PostgreSQL, Catalog=MongoDB, Carts=In-Memory DB, Click-stream=Kafka
B. Orders=MongoDB, Catalog=PostgreSQL, Carts=Kafka, Click-stream=In-Memory DB
C. Orders=In-Memory DB, Catalog=Kafka, Carts=PostgreSQL, Click-stream=MongoDB
D. Orders=Kafka, Catalog=In-Memory DB, Carts=MongoDB, Click-stream=PostgreSQL

**22. In-Memory DB offers several persistence options. What is the purpose of the AOF (Append-Only File) persistence mode?**
A. It compresses data to reduce RAM usage on memory-constrained clusters
B. It logs every write operation to disk continuously, enabling recovery of the most recent data after a restart
C. It creates hourly full snapshots of all in-memory data to SSD storage
D. It replicates all data to a secondary IONOS region for disaster recovery

**23. Event Streams for Apache Kafka clusters are available in five pre-defined sizes (XS to XL). What resource types scale across these cluster sizes?**
A. Only the number of Kafka topics and partitions increases
B. Dedicated CPU, RAM, and SSD storage all scale with cluster size
C. Only storage capacity increases; CPU and RAM remain fixed
D. Only the network bandwidth allocation changes between sizes

**24. In-Memory DB has a maximum resource limit per instance. Which values are correct?**
A. 8 CPU cores, 16 GB RAM, 1 TB storage
B. 16 CPU cores, 32 GB RAM, 2 TB storage
C. 32 CPU cores, 64 GB RAM, 4 TB storage
D. 12 CPU cores, 48 GB RAM, 3 TB storage

**25. A company's SaaS application uses Managed MariaDB and reports that application response times have degraded because the same tenant configuration data is being queried from the database thousands of times per minute. Which IONOS service would reduce database load and improve response times most effectively?**
A. Adding read replicas to the MariaDB cluster to distribute query load
B. In-Memory DB (Redis-compatible) deployed as a caching layer in front of MariaDB, storing frequently accessed configurations in RAM
C. Migrating the tenant configuration data to Managed MongoDB for faster document retrieval
D. Enabling SSD Premium Block Storage for the MariaDB cluster to reduce disk I/O latency

**26. Managed MongoDB's Enterprise Edition differs from the Business Edition primarily in what way?**
A. Enterprise Edition includes a free Playground single-node cluster
B. Enterprise Edition provides full control over node sizing using Dedicated Core VMs and supports SSD or HDD Block Storage, plus access to MongoDB Inc. professional support
C. Enterprise Edition supports sharding; Business Edition does not
D. Enterprise Edition runs on Cube VMs with NVMe storage for highest IOPS

**27. Which IONOS managed database supports advanced features like PostGIS for geospatial data, full-text search, and JSONB storage natively?**
A. Managed MariaDB
B. Managed MongoDB
C. Managed PostgreSQL
D. In-Memory DB

**28. A company's development team wants to quickly prototype a MongoDB application at zero cost before committing to a production cluster. What IONOS MongoDB offering supports this?**
A. A trial account with 30-day free access to Business Edition clusters
B. The MongoDB Playground Edition, which provides a free single-node cluster with 2 GB RAM and 50 GB NVMe storage
C. A free tier of the Enterprise Edition with limited sharding
D. Managed MongoDB is not available for free in any edition

**29. What is the difference between "asynchronous," "synchronous," and "strict-synchronous" replication in IONOS managed databases?**
A. Asynchronous=highest latency, Synchronous=medium latency, Strict-synchronous=lowest latency
B. Asynchronous=best performance but possible data loss on failure; Synchronous=write confirmed when at least one replica acknowledges; Strict-synchronous=zero data loss, write confirmed only when all replicas have written
C. Asynchronous=within-VDC replication only; Synchronous=cross-AZ replication; Strict-synchronous=cross-region replication
D. All three modes provide the same data durability guarantee with different latency profiles

**30. An architect is designing an event-driven microservices system. Orders placed on the website must trigger inventory deduction, shipping label generation, and a customer notification simultaneously, all in near real-time. Which IONOS service enables this decoupled, event-driven architecture?**
A. Managed PostgreSQL with database triggers that call stored procedures
B. Event Streams for Apache Kafka, which allows multiple consumer services to independently process the same order event from a Kafka topic
C. In-Memory DB with pub/sub messaging mode for inter-service communication
D. Managed MongoDB with change streams for triggering downstream services

---

## Answer Key

1. B — A managed database service means IONOS handles infrastructure, OS patching, backups, and high availability automatically, while the customer retains full control over the data, schema, and database configuration.

2. C — Self-managed databases require purchasing physical servers, racking equipment, installing and patching operating systems, and managing backup agents; managed DBaaS eliminates all of these operational tasks.

3. C — Managed PostgreSQL is the correct choice: it supports strict-synchronous replication for zero data loss, full ACID compliance, and advanced features like extensions and JSONB that are critical for financial applications.

4. B — Managed MariaDB is a MySQL-compatible fork that preserves full MySQL syntax, stored procedures, and behavioral compatibility, making it ideal for migrating existing MySQL applications with minimal code changes.

5. C — Managed MariaDB includes a unique self-restore feature that allows point-in-time recovery and specific backup restoration directly through the DCD or API without requiring a support ticket.

6. C — Managed MongoDB stores data as BSON documents where each document can have different fields, making it ideal for product catalogs with variable attributes across different product types.

7. B — The Playground Edition provides a free single-node MongoDB cluster (2 GB RAM, 1 vCPU, 50 GB storage) on Cube VMs with NVMe storage, designed specifically for development and testing workloads.

8. C — Sharding distributes data across multiple nodes (shards), enabling horizontal scaling for both storage capacity and write throughput by splitting data into partitions processed in parallel.

9. B — In-Memory DB stores all data in RAM, enabling sub-millisecond access times that are orders of magnitude faster than disk-based (SSD or HDD) database reads, making it ideal for caching and real-time use cases.

10. C — In-Memory DB (Redis-compatible) provides fast, centralized session storage accessible from all application servers simultaneously, with sub-millisecond latency for session lookups and no single-server bottleneck.

11. C — Event Streams for Apache Kafka is designed for high-throughput, real-time event streaming: ingesting, processing, and distributing large volumes of events from producers to consumers at low latency.

12. C — Event Streams for Apache Kafka is built for massive parallel event ingestion; it can handle thousands of sensors publishing simultaneously through partitioned topics and is the standard solution for IoT telemetry pipelines.

13. B — In Kafka's architecture, data is organized into topics (logical categories) that are divided into partitions (ordered, immutable logs); partitions enable parallel processing by multiple consumers simultaneously.

14. C — Managed MongoDB stores data as BSON (Binary JSON) documents in collections, allowing each document to have a different structure (flexible schema) unlike relational databases with fixed table schemas.

15. B — Strict-synchronous replication guarantees zero data loss: a write is only acknowledged as committed after it has been durably written to all replica nodes, making it the strongest consistency option.

16. B — All IONOS managed database clusters are deployed within private LANs and are accessible only through private network connections; they are never exposed directly to the public internet, protecting them from external attacks.

17. C — IONOS managed databases retain automated backups for up to one week (7 days), supporting point-in-time recovery to any moment within that retention window for disaster recovery and error correction.

18. C — Managed MariaDB has a maximum storage size of 2 TB per node (SSD-backed), which is the upper limit for single-node storage in this managed service.

19. B — Point-in-time recovery (PITR) allows restoration of the database to any specific moment within the backup retention period, enabling precise recovery to the minute before a destructive operation.

20. B — Managed MongoDB is the better choice for variable user profiles: its flexible document schema accommodates different fields per document without requiring schema migrations or table alterations when new attributes are added.

21. A — PostgreSQL for orders (ACID transactions), MongoDB for product catalog (flexible schema), In-Memory DB for shopping carts (fast session-like storage), and Kafka for click-stream events (high-throughput streaming) is the correct pattern.

22. B — AOF (Append-Only File) persistence logs every write operation to disk in sequence, providing fine-grained durability and enabling recovery of the most recently written data after an In-Memory DB cluster restart.

23. B — Across the five Kafka cluster sizes (XS to XL), all three primary resources scale: dedicated CPU, RAM, and SSD storage increase to support higher throughput, more partitions, and larger retention capacities.

24. B — The per-instance limits for In-Memory DB are a maximum of 16 CPU cores, 32 GB RAM, and 2 TB storage, with a default limit of 10 instances per contract.

25. B — Deploying In-Memory DB as a caching layer in front of MariaDB stores frequently accessed tenant configurations in RAM, reducing repetitive database queries and improving response times from seconds to milliseconds.

26. B — Enterprise Edition provides full control over node sizing (Dedicated Core VMs), supports SSD and HDD Block Storage options, sharding configurations, and includes access to MongoDB Inc. professional support in addition to IONOS support.

27. C — Managed PostgreSQL natively supports extensions like PostGIS for geospatial data, full-text search capabilities, and JSONB (binary JSON storage) for mixed relational and semi-structured workloads.

28. B — The MongoDB Playground Edition is a free, single-node cluster with 2 GB RAM, 1 vCPU, and 50 GB NVMe storage based on Cube VMs, designed for developers to prototype and test MongoDB applications at no cost.

29. B — Asynchronous replication maximizes performance but risks data loss if the primary fails before replicas catch up; synchronous requires at least one replica to acknowledge; strict-synchronous requires all replicas to acknowledge before the write is confirmed, guaranteeing zero data loss.

30. B — Event Streams for Apache Kafka enables decoupled event-driven architectures: the order event is published once to a Kafka topic, and multiple independent consumer services (inventory, shipping, notifications) each read from the same topic and process the event independently.
