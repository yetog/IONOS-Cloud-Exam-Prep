# Unit 3 Section 4: Monitoring and Logging - Sectional Exam

**Coverage:** Activity Logs (user actions, control plane, immutable audit trail, stored in DCD/API) vs Flow Logs (network traffic, VPC-level, stored in Object Storage); Monitoring Service (1-minute default push interval, Grafana dashboards, metric types, alert thresholds); Logging Service (Fluent Bit, application/system logs, Grafana); choosing the right observability service; log retention
**Questions:** 30 | **Format:** Multiple Choice | **Time Estimate:** 25 minutes

---

**1. Which IONOS Cloud observability service tracks user actions such as who created a VM, who deleted a snapshot, and who changed a firewall rule?**
A. Flow Logs
B. Monitoring Service
C. Activity Logs
D. Logging Service

**2. Which IONOS Cloud observability service captures network packet metadata including source/destination IP addresses, ports, and protocols?**
A. Activity Logs
B. Flow Logs
C. Monitoring Service
D. Logging Service

**3. A security analyst needs to answer: "Which user account deleted a production database snapshot at 3:47 PM last Tuesday?" Which service provides this answer?**
A. Flow Logs — they capture all changes to cloud resources
B. Monitoring Service — it tracks resource creation and deletion metrics
C. Activity Logs — they provide a chronological audit trail of all user-initiated actions
D. Logging Service — it stores application logs from all infrastructure components

**4. A network engineer needs to investigate why outbound traffic from a web server is being blocked. Which service should they use?**
A. Activity Logs — they track firewall rule changes that may have caused the block
B. Flow Logs — they capture network packet flow data including which connections were accepted or rejected
C. Monitoring Service — it shows CPU and bandwidth utilization spikes
D. Logging Service — it contains application-level error messages about connection failures

**5. Where are Activity Logs stored in IONOS Cloud?**
A. In an IONOS Object Storage bucket configured by the user
B. In a Grafana-managed time-series database
C. As read-only records accessible via the DCD and IONOS API (GET requests only)
D. In a customer-managed relational database via the Billing API

**6. Where are Flow Logs stored in IONOS Cloud?**
A. Directly in the DCD as read-only audit records
B. In a Grafana-managed metrics store
C. In an IONOS Cloud Object Storage bucket specified by the user when creating the flow log rule
D. In the Logging Service's managed aggregation layer automatically

**7. What is the default metric push interval for the IONOS Cloud Monitoring Service?**
A. 5 seconds
B. 30 seconds
C. 1 minute
D. 5 minutes

**8. Which visualization platform does the IONOS Cloud Monitoring Service use to display performance dashboards?**
A. Kibana
B. Datadog
C. Grafana
D. Prometheus UI

**9. Activity Logs in IONOS Cloud are described as "immutable." What does this mean in practice?**
A. Activity Logs are automatically deleted after 90 days to prevent storage overload
B. Activity Logs cannot be modified or deleted by any user — they are read-only records that preserve integrity for audits
C. Activity Logs can only be viewed by the Contract Owner
D. Activity Logs are stored in encrypted format that cannot be exported

**10. Which of the following is a correct statement about the difference between Activity Logs and Flow Logs?**
A. Activity Logs track network packets; Flow Logs track user API actions
B. Activity Logs are stored in Object Storage; Flow Logs are accessed via the DCD API
C. Activity Logs track user actions (who did what); Flow Logs track network traffic (what packets traversed which interfaces)
D. Activity Logs require Fluent Bit agents; Flow Logs are collected automatically without configuration

**11. A DevOps team wants to collect application error logs and system logs from 20 virtual machines and centralize them into a single searchable platform. Which IONOS service is designed for this use case?**
A. Activity Logs
B. Flow Logs
C. Monitoring Service
D. Logging Service

**12. Which agent does the IONOS Cloud Logging Service use to forward application and system logs from virtual machines to the centralized platform?**
A. Prometheus Exporter
B. OpenTelemetry Collector
C. Fluent Bit
D. Logstash

**13. An operations team receives a Grafana alert that CPU utilization on a production server has exceeded 90% for 5 minutes. Which IONOS service generated this alert?**
A. Activity Logs
B. Flow Logs
C. Monitoring Service
D. Logging Service

**14. A compliance officer needs to provide an audit report showing all login attempts (successful and failed) to IONOS Cloud resources over the past 3 months. Which service provides this data?**
A. Flow Logs — they capture all authentication-related network traffic
B. Monitoring Service — it tracks login success/failure rates as a metric
C. Logging Service — it stores application authentication logs forwarded by Fluent Bit
D. Activity Logs — they record user authentication events including logins, logouts, and failed attempts as part of the audit trail

**15. Which of the following network resources can have Flow Log rules applied to them in IONOS Cloud?**
A. Only Virtual Machine network interfaces
B. VM network interfaces, Managed NAT Gateway, and Managed Load Balancers (NLB and ALB)
C. Only Managed NAT Gateway and VPN Gateway interfaces
D. Any IONOS Cloud resource that has an IP address assigned

**16. When creating a Flow Log rule, which traffic direction options are available?**
A. Inbound and Outbound only
B. Upload and Download
C. Ingress, Egress, or Bidirectional
D. Internal and External

**17. A security team wants to see only the connections that were BLOCKED by their firewall rules (not accepted traffic). Which Flow Log action filter should they select?**
A. Any
B. Accepted
C. Rejected
D. Blocked

**18. Both the Monitoring Service and the Logging Service in IONOS Cloud use the same visualization platform. What is it?**
A. Kibana
B. Grafana
C. Datadog
D. Splunk

**19. A systems administrator wants to set an alert that fires when disk I/O on a VM exceeds a defined threshold for more than 2 minutes. Which IONOS service provides this capability?**
A. Activity Logs — they can be configured to trigger alerts on resource changes
B. Flow Logs — they track I/O metrics as part of network packet analysis
C. Monitoring Service — it collects performance metrics including disk I/O and supports Grafana-based threshold alerts
D. Logging Service — it can parse disk I/O entries from system logs and trigger alerts

**20. How does the IONOS Cloud Monitoring Service collect metrics from virtual machines?**
A. The DCD automatically installs a monitoring agent during VM provisioning
B. Users configure agents or exporters (such as Prometheus, Grafana Agent, or OpenTelemetry) on their servers to push metrics to the regional endpoint
C. The hypervisor layer automatically collects and forwards all VM metrics without any user configuration
D. Metrics are collected by reading the Activity Log and correlating resource changes to performance events

**21. A startup wants complete observability: user action auditing for compliance, network traffic analysis for security, and application performance dashboards. Which combination of IONOS services should they deploy?**
A. Activity Logs only — it covers all three use cases
B. Activity Logs (user auditing) + Flow Logs (network traffic) + Monitoring Service (performance dashboards)
C. Flow Logs (covers both network and user actions) + Monitoring Service (dashboards)
D. Logging Service only — it centralizes all types of logs including network and user actions

**22. The Logging Service's default ingestion rate is how many HTTP requests per second per pipeline?**
A. 10
B. 25
C. 50
D. 100

**23. What happens to Flow Log data once it is written to the Object Storage bucket?**
A. It is automatically deleted after 30 days by IONOS retention policy
B. It is retained indefinitely unless the user configures a bucket lifecycle policy or manually deletes it
C. It is automatically migrated to the Logging Service after 7 days
D. It is encrypted and moved to IONOS cold storage after 90 days

**24. An engineer notices a suspicious IP address making repeated connection attempts to their web server. Which IONOS service should they use to investigate the connection patterns and determine if the firewall is blocking the attempts?**
A. Activity Logs — they show which user accounts interacted with the web server
B. Monitoring Service — it tracks CPU and RAM spikes that accompany attack traffic
C. Flow Logs — they capture source/destination IP addresses, ports, and whether connections were accepted or rejected
D. Logging Service — it contains the web server's application error messages

**25. Activity Logs in IONOS Cloud are partitioned by which boundary?**
A. By region (each data center has its own log partition)
B. By resource type (VMs, storage, and networking have separate logs)
C. By contract (each account's activity is isolated from other accounts)
D. By user role (Contract Owner, Administrator, and User activity are logged separately)

**26. A financial institution requires that Activity Log data be integrated with their SIEM (Security Information and Event Management) system for centralized threat detection. How can Activity Logs be exported?**
A. Activity Logs can only be viewed in the DCD and cannot be exported
B. Activity Logs are downloadable as JSON via GET requests to the IONOS API, enabling SIEM integration
C. Activity Logs are pushed automatically to any S3-compatible storage bucket the customer configures
D. Activity Logs require a Fluent Bit agent to export data to external systems

**27. Which statement is TRUE about the Monitoring Service's Grafana access control for sub-users?**
A. Sub-users cannot access any Grafana dashboards unless they hold the Administrator role
B. Every sub-user receives at least a Viewer role, allowing them to see dashboards; Administrators can grant Editor or Admin roles for more capabilities
C. Sub-users can only view dashboards they personally created
D. Grafana access in IONOS is completely separate from IAM and uses its own user management system

**28. "Activity Logs track user actions; Flow Logs track network packets." An exam question presents this statement and asks whether it is True or False. Which answer is correct, and why?**
A. False — Activity Logs track network packets and Flow Logs track user actions (they are reversed)
B. False — Both services track the same data type but for different time periods
C. True — Activity Logs record control-plane user actions (who did what) while Flow Logs record data-plane network traffic (which packets traversed which interface)
D. True — but only for traffic originating from outside the VDC; internal traffic is covered by Activity Logs

**29. An application team is troubleshooting slow checkout page performance during a promotional event. They want to correlate database query latency metrics with database error log messages in a single interface. Which IONOS services should they use together?**
A. Activity Logs + Flow Logs (one shows DB changes, the other shows network traffic)
B. Monitoring Service (for latency metrics) + Logging Service (for application error logs) — both visualized in Grafana
C. Flow Logs (for network analysis) + Activity Logs (for user-initiated changes)
D. Monitoring Service alone — it ingests both metrics and application logs

**30. A healthcare provider must retain application logs for seven years for regulatory compliance. Which IONOS service and feature combination addresses this requirement?**
A. Activity Logs with a 7-year retention policy configured in the DCD
B. Flow Logs stored in Object Storage with a bucket lifecycle policy set to retain objects for 7 years
C. Logging Service with a retention policy configured to keep logs for the required compliance period
D. Monitoring Service with a 7-year metrics retention setting in the Grafana dashboard

---

## Answer Key

1. C — Activity Logs provide a chronological, immutable audit trail of user-initiated actions (logins, resource creation, deletion, configuration changes) across the IONOS Cloud contract.

2. B — Flow Logs capture network packet metadata including source/destination IPs, ports, protocols, packet/byte counts, and whether traffic was accepted or rejected by the firewall.

3. C — Activity Logs answer "who did what and when" — including which user account deleted a specific resource at a specific time, making them essential for security investigations.

4. B — Flow Logs capture which connections were accepted or rejected by the firewall, making them the correct tool for diagnosing why specific outbound traffic is being blocked.

5. C — Activity Logs are read-only records accessed via GET requests through the IONOS API and viewable in the DCD; they are not stored in customer-managed Object Storage.

6. C — Flow Logs are written as objects to an IONOS Cloud Object Storage bucket specified by the user when creating the flow log rule, giving users control over retention.

7. C — The default metric push interval for the IONOS Cloud Monitoring Service is 1 minute; this is a key exam fact that is frequently tested.

8. C — The IONOS Cloud Monitoring Service uses Grafana for visualization, providing customizable dashboards and alert configuration for performance metrics.

9. B — "Immutable" means Activity Logs are read-only and cannot be modified or deleted by any user, preserving their integrity as tamper-proof evidence for security audits and compliance.

10. C — Activity Logs track control-plane user actions (who created, modified, or deleted resources), while Flow Logs track data-plane network traffic (which packets traversed which network interface).

11. D — The Logging Service is specifically designed for centralizing application and system logs from multiple infrastructure components into a single searchable, visualized platform.

12. C — Fluent Bit is the lightweight log-forwarding agent used by the IONOS Cloud Logging Service; it is installed on virtual machines and configured to forward logs to the pipeline endpoint via TLS.

13. C — The Monitoring Service collects performance metrics (including CPU utilization) and provides Grafana-based alerting with configurable thresholds and notification channels.

14. D — Activity Logs record all user authentication events including successful logins, logouts, and failed login attempts, making them the correct source for user access audit reports.

15. B — Flow Log rules can be applied to VM network interfaces, Managed NAT Gateway, and Managed Load Balancers (both NLB and ALB); all these network resources can have their traffic captured.

16. C — Flow Log rules offer three direction options: Ingress (inbound only), Egress (outbound only), or Bidirectional (all traffic), allowing focused or comprehensive capture.

17. C — Selecting the "Rejected" action filter captures only traffic that was blocked by firewall rules, allowing security teams to focus on denied connections without noise from accepted traffic.

18. B — Both the Monitoring Service (for metrics) and the Logging Service (for application logs) use Grafana as their visualization and alerting platform, enabling unified observability.

19. C — The Monitoring Service collects host-based performance metrics including disk I/O and supports Grafana-based threshold alerts that fire when metric values exceed defined conditions.

20. B — Users must configure agents or exporters (Prometheus, Grafana Agent, OpenTelemetry, FluentBit) on their servers to push metrics to the regional Monitoring Service endpoint.

21. B — This is the correct three-service combination: Activity Logs for user action compliance auditing, Flow Logs for network traffic security analysis, and Monitoring Service for application performance dashboards.

22. C — The default ingestion rate for the IONOS Cloud Logging Service is 50 HTTP requests per second per pipeline, though this can be adjusted based on workload requirements.

23. B — Flow Log data in Object Storage is retained until the user configures a bucket lifecycle policy to delete it or manually removes it; IONOS does not apply an automatic deletion timeline.

24. C — Flow Logs are the correct tool for investigating suspicious IP addresses because they capture source/destination IPs, ports, protocols, and whether the firewall accepted or rejected each connection.

25. C — Activity Logs are partitioned by contract, ensuring that each account's audit trail is isolated from other customers, supporting data isolation in multi-tenant and multi-contract environments.

26. B — Activity Logs can be retrieved as JSON via GET requests to the IONOS API, making them easily exportable and compatible with SIEM systems and custom compliance reporting pipelines.

27. B — Every sub-user in the IONOS Monitoring Service receives at minimum a Viewer role to see dashboards; Administrators can grant Editor or Admin roles to enable dashboard creation and alert management.

28. C — The statement is True: Activity Logs record control-plane user actions (API calls, provisioning, changes), while Flow Logs record data-plane network packet flows traversing network interfaces.

29. B — Using the Monitoring Service for latency metrics and the Logging Service for application error logs provides correlated visibility; both services use Grafana, enabling side-by-side analysis in a unified interface.

30. C — The Logging Service supports configurable retention policies that allow administrators to specify how long logs are kept, enabling compliance with regulations requiring multi-year log retention.
