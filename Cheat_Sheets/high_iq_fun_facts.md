# IONOS Cloud High-IQ Fun Facts & Concept Connectors

To cram effectively, you don't just want to memorize definitions—you want to understand *why* things are the way they are. This "High-IQ" cheat sheet connects the dots between different IONOS services to make them stick in your memory.

---

### 1. The "Why" Behind Compute Offerings
*   **Fun Fact:** Why do "Dedicated Cores" exist when vCPUs are cheaper? 
    *   **The IQ Connection:** Because of the "Noisy Neighbor" problem! If you share a physical CPU running a hypervisor (vCPU), another customer's spike in web traffic can momentarily slow down *your* database. IONOS offers Dedicated Cores to physically lock a core to you, guaranteeing consistent performance for mission-critical apps.
*   **Fun Fact:** Why are "Cubes" so cheap?
    *   **The IQ Connection:** Flexibility costs money. By forcing you into pre-configured, rigid packages (fixed vCPU, RAM, NVMe), IONOS can pack them into servers highly efficiently without complex orchestration, allowing them to pass the savings to you as a VPS (Virtual Private Server).

### 2. The "Why" Behind Pricing Models
*   **Fun Fact:** Why do Cloud Savings Plans care about *Resources* and not *Instances*?
    *   **The IQ Connection:** If you commit to 50 CPU Cores for 3 years, IONOS doesn't care if you run one massive 50-core VM, or fifty 1-core VMs, or if you run them in Germany or Spain. It's a "resource-based" pool commitment, making it vastly more flexible for you to change your architecture over 3 years without breaking the contract.

### 3. The "Why" Behind the IAM Model
*   **Fun Fact:** Why did IONOS create the "Administrator" role if it's 99% the same as the "Contract Owner"?
    *   **The IQ Connection:** Legal and financial liability! The Contract Owner is the person who legally registered the contract and pays the bills. An IT Manager might need to run the entire cloud infrastructure (Administrator), but they shouldn't be able to change the company's credit card or transfer ownership of the legal entity.

### 4. The "Why" Behind Networking Layers
*   **Fun Fact:** Why do we need the Application Load Balancer (ALB) if the Network Load Balancer (NLB) is faster?
    *   **The IQ Connection:** The NLB operates at Layer 4 (Transport), meaning it only sees IP addresses and ports to pass raw traffic incredibly fast. But modern microservices often share a single IP and need traffic routed based on the URL (e.g., sending `/video` to server A and `/cart` to server B). Only the ALB operates at Layer 7 (Application) to actually read the URL!

### 5. The "Why" Behind the Two Log Types
*   **Fun Fact:** Why does IONOS split "Activity Logs" from "Flow Logs"?
    *   **The IQ Connection:** It's the difference between Human Security and Network Security.
        *   **Activity Logs:** Did *Kevin* accidentally *delete a database snapshot* at 2 AM? (User actions, immutable, accessed via API)
        *   **Flow Logs:** Is a *hacker from Russia* rapidly hitting *port 22* on my web server? (Network traffic packets, written to Object Storage)

### 6. The "Why" Behind European Data Sovereignty
*   **Fun Fact:** Why does the US CLOUD Act matter to European IONOS customers?
    *   **The IQ Connection:** If you use a US-based cloud provider (like AWS or Azure), the US government can legally demand your data, *even if the servers are physically located in Frankfurt*. Because IONOS is a German company with no US parent entity, they are completely immune to the US CLOUD act, granting true "Digital Sovereignty" to their clients.

### 7. Hard Facts Summary (Memorize These)
*   **Default Push Interval for Monitoring:** 1 minute.
*   **Max SSH Keys in Manager:** 100.
*   **IPv6 Address Size:** 128 bit.
*   **Elasticity vs. Scalability:** Elasticity is automated real-time scaling (up *and* down). Scalability is manual resource management for growth.
*   **Private Cloud TCO Savings:** 40–60% (up to 70%) vs on-premise.
