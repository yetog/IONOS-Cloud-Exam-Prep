import sys
import time

QUESTIONS = [
    {
        "question": "What is the default push interval for monitoring service metrics in IONOS Cloud?",
        "options": {
            "A": "10 seconds",
            "B": "1 minute",
            "C": "5 minutes",
            "D": "15 minutes"
        },
        "answer": "B",
        "explanation": "The default push interval is 1 minute. This is a hard limit/fact."
    },
    {
        "question": "Which of the following IONOS Cloud compute options provides true guaranteed performance without any 'noisy neighbor' interference?",
        "options": {
            "A": "Cubes",
            "B": "vCPU Servers",
            "C": "Dedicated Core Servers",
            "D": "Cloud GPU VMs"
        },
        "answer": "C",
        "explanation": "Dedicated Core Servers map to a physical CPU core, eliminating 'steal time' and the noisy neighbor problem."
    },
    {
        "question": "What is the primary difference between a Contract Owner and an Administrator in IONOS Cloud?",
        "options": {
            "A": "Administrators cannot remove users.",
            "B": "Contract Owners cannot create Virtual Data Centers.",
            "C": "Administrators cannot change payment methods.",
            "D": "Contract Owners have to use the API."
        },
        "answer": "C",
        "explanation": "Administrators have full access to resources and user management but lack financial control (payment methods)."
    },
    {
        "question": "A media company needs to store thousands of older videos for 10 years compliance. Which storage service is cheapest and most appropriate?",
        "options": {
            "A": "Block Storage (SSD)",
            "B": "Block Storage (HDD)",
            "C": "Network File Storage (NFS)",
            "D": "IONOS Cloud Object Storage"
        },
        "answer": "D",
        "explanation": "Object Storage is accessed via HTTP, easily scales, and is the cheapest for unstructured data archiving."
    },
    {
        "question": "Why would an architecture require an Application Load Balancer (ALB) instead of a Network Load Balancer (NLB)?",
        "options": {
            "A": "To maximize throughput with the lowest network latency.",
            "B": "To route HTTP traffic based on URL path rules (Layer 7).",
            "C": "To act as an outbound SNAT gateway.",
            "D": "To handle UDP gaming traffic."
        },
        "answer": "B",
        "explanation": "ALB operates at Layer 7 and can inspect the URL path/headers. NLB operates at Layer 4 (IPs and Ports only)."
    },
    {
        "question": "Which IONOS service creates a tamper-proof audit trail of 'who did what' via the API?",
        "options": {
            "A": "Flow Logs",
            "B": "Monitoring Service",
            "C": "Activity Logs",
            "D": "Logging Service"
        },
        "answer": "C",
        "explanation": "Activity Logs track user API actions (like deleting a snapshot). Flow logs track network packets."
    },
    {
        "question": "If a user has 2FA enabled, how must they authenticate to use the IONOS Cloud API?",
        "options": {
            "A": "Using their normal username and password",
            "B": "Using an SSH key pair",
            "C": "Using a Bearer token from the Token Manager",
            "D": "By passing the 6-digit code in the API URL"
        },
        "answer": "C",
        "explanation": "Token Manager is mandatory for API authentication when an account has 2FA enabled."
    },
    {
        "question": "True or False: Cross Connect allows you to connect VDCs in the SAME region for free and without traversing the public internet.",
        "options": {
            "A": "True",
            "B": "False",
            "C": "Only if using VPN",
            "D": "Only across different regions"
        },
        "answer": "A",
        "explanation": "True. Cross connect utilizes the internal IONOS backbone to link VDCs in the same region, on the same contract, at no cost."
    },
    {
        "question": "According to IONOS, what is the typical Total Cost of Ownership (TCO) advantage of their Private Cloud vs on-premise deployments?",
        "options": {
            "A": "5-10% Savings",
            "B": "10-20% Savings",
            "C": "40–60% or up to 70% Savings",
            "D": "No cost advantage"
        },
        "answer": "C",
        "explanation": "This is a commonly tested metric! IONOS frequently markets their 40-70% TCO savings."
    },
    {
        "question": "True or False: A Cost Alert will automatically shut down running VMs if the budget threshold is exceeded.",
        "options": {
            "A": "True",
            "B": "False",
            "C": "True, but only after 24 hours.",
            "D": "True, if it's over $1,000."
        },
        "answer": "B",
        "explanation": "False. Cost alerts are purely informational emails and trigger only ONCE per configured threshold."
    }
]

def main():
    print("=============================================")
    print(" IONOS CLOUD FOUNDATIONAL - INTERACTIVE QUIZ ")
    print("                 CRAM MODE                   ")
    print("=============================================")
    print("Type A, B, C, or D to answer. Type 'Q' to quit.\n")
    
    score = 0
    total = len(QUESTIONS)
    
    for i, q in enumerate(QUESTIONS):
        print(f"Question {i+1} of {total}:")
        print(q["question"])
        for key, text in q["options"].items():
            if True:
                print(f"  {key}) {text}")
                
        while True:
            ans = input("Your answer: ").strip().upper()
            if ans == 'Q':
                print(f"\nExiting... Final Score: {score}/{i}")
                sys.exit(0)
            if ans in ["A", "B", "C", "D"]:
                break
            print("Invalid input. Please enter A, B, C, or D.")
            
        if ans == q["answer"]:
            print("\n✔️ CORRECT!")
            score += 1
        else:
            print(f"\n❌ INCORRECT. The right answer is {q['answer']}.")
            
        print(f"IQ Connection: {q['explanation']}\n")
        print("-" * 45 + "\n")
        time.sleep(1)
        
    print("=============================================")
    print(f" QUIZ COMPLETE! Your final score is: {score}/{total}")
    pct = (score / total) * 100
    print(f" Percentage: {pct:.1f}%")
    if pct >= 80:
        print(" Verdict: High IQ! You are ready for the exam.")
    else:
        print(" Verdict: Need more cramming. Review the cheat sheets!")
    print("=============================================")

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\nExiting...")
