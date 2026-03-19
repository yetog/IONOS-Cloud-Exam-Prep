import { Question } from '@/types/gmat';

export const SAMPLE_QUESTIONS: Question[] = [
  // UNIT 1: Cloud Basics
  {
    id: 'u1-mc-001',
    section: 'unit1',
    type: 'multiple-choice',
    difficulty: 'easy',
    question: 'Which of the following is an advantage of selecting the IONOS Private Cloud (vs On-Premise)?',
    options: [
      'Elimination of CAPEX for physical hardware',
      'The ability to utilize more than 500 SSH keys',
      'Data will be stored physically in your own office',
      'You are no longer responsible for securing the OS'
    ],
    correctAnswer: 0,
    explanation: 'By moving to the private cloud, you switch from CAPEX (buying hardware) to OPEX (renting it). The TCO savings are up to 70%.',
    strategy: 'Look for financial metrics regarding physical hardware elimination.',
    commonTraps: ['Thinking IONOS secures the OS (They only do this in PaaS, not standard Private Cloud IaaS)'],
    targetTime: 60,
    tags: ['TCO', 'Benefits']
  },
  {
    id: 'u1-tf-001',
    section: 'unit1',
    type: 'true-false',
    difficulty: 'medium',
    question: 'True or False: Utilizing a Cloud Savings Plan allows you to turn off resources at any time to immediately stop billing.',
    options: ['True', 'False'],
    correctAnswer: 1,
    explanation: 'A Cloud Savings Plan requires a 1 or 3-year commitment. You get a massive discount, but you give up the flexibility of Pay-Per-Use billing.',
    strategy: 'Commitment equals discounts. Hourly flexibility equals Pay-Per-Use.',
    commonTraps: ['Confusing Pay-Per-Use with Savings Plans.'],
    targetTime: 30,
    tags: ['Pricing', 'Savings Plan']
  },

  // UNIT 2: Core Services
  {
    id: 'u2-mc-001',
    section: 'unit2',
    type: 'multiple-choice',
    difficulty: 'hard',
    question: 'A customer requires predictable, high-speed performance for a mission-critical database and specifically requested to avoid "noisy neighbors". Which compute offering should they select?',
    options: [
      'vCPU Servers',
      'Dedicated Core Servers',
      'Cloud Cubes',
      'Managed Kubernetes Cores'
    ],
    correctAnswer: 1,
    explanation: 'Dedicated Cores guarantee a specific physical CPU thread that is absolutely isolated from other tenants, eliminating the noisy neighbor effect.',
    strategy: 'Memorize the trigger words: "Noisy neighbor" or "Mission-critical" = Dedicated Core',
    commonTraps: ['Assuming vCPU is dedicated - it is a shared resource.'],
    targetTime: 60,
    tags: ['Compute', 'Dedicated']
  },
  {
    id: 'u2-sc-001',
    section: 'unit2',
    type: 'scenario',
    difficulty: 'hard',
    passage: 'A developer needs to route HTTPS traffic from the public internet to specific internal VMs based on the exact URL path requested (e.g. /cart vs /api). The developer wants the load balancer to handle decrypting the TLS traffic to offload work from the VMs.',
    question: 'Which Load Balancer is appropriate for this architecture?',
    options: [
      'Network Load Balancer (NLB)',
      'Application Load Balancer (ALB)',
      'NAT Gateway',
      'IP Failover Group'
    ],
    correctAnswer: 1,
    explanation: 'The ALB operates at Layer 7, allowing it to inspect URL paths and terminate TLS certificates.',
    strategy: 'Identify the constraint: URL routing and TLS termination requires Layer 7 (Application).',
    commonTraps: ['Choosing NLB. The NLB operates at Layer 4 and cannot read URL paths.'],
    targetTime: 90,
    tags: ['Network', 'ALB', 'Load Balancing']
  },

  // UNIT 3: Management
  {
    id: 'u3-mc-001',
    section: 'unit3',
    type: 'multiple-choice',
    difficulty: 'medium',
    question: 'Where are User Actions and API calls strictly audited and stored for compliance reasons?',
    options: [
      'Flow Logs',
      'Object Storage Logs',
      'Activity Logs',
      'Cost Alert Logs'
    ],
    correctAnswer: 2,
    explanation: 'Activity Logs track *who did what* (User API actions). Flow Logs track *network packets*.',
    strategy: 'Remember: Activity = API/Users. Flow = Packets/IPs.',
    commonTraps: ['Confusing Flow Logs with Activity Logs. They test this frequently.'],
    targetTime: 45,
    tags: ['Observability', 'Compliance']
  },
  {
    id: 'u3-tf-001',
    section: 'unit3',
    type: 'true-false',
    difficulty: 'hard',
    question: 'True or False: If you set a Cost Alert threshold to 80%, the system will automatically shut down the most expensive VMs to prevent you from going over budget.',
    options: ['True', 'False'],
    correctAnswer: 1,
    explanation: 'Cost Alerts *do nothing* except send exactly ONE email. They will never alter or shut down your infrastructure.',
    strategy: 'The platform prioritizes uptime over everything. It will never auto-shutdown your resources for billing reasons.',
    commonTraps: ['Assuming "Alerts" include "Actions". They do not.'],
    targetTime: 45,
    tags: ['Billing', 'Cost Alerts']
  },
];
