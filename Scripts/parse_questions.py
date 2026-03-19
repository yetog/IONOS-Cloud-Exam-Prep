"""
parse_questions.py
Line-by-line parser for sectional exam markdown files -> TypeScript question bank.
"""

import re
import os

BASE = "C:/Users/iyoungburke/Downloads/IONOS Cloud Exam Prep"
SECTIONAL_DIR = os.path.join(BASE, "Sectional_Exams")
OUTPUT_FILE = os.path.join(BASE, "IONOS_Mock_Exam_App/src/data/questionBank.ts")

FILE_META = {
    "unit1_section1_cloud_computing_fundamentals.md": ("unit1", "s1", ["Cloud Fundamentals", "Characteristics", "Regions"]),
    "unit1_section2_cloud_service_benefits.md":       ("unit1", "s2", ["Benefits", "TCO", "Pricing", "Savings Plans"]),
    "unit1_section3_cloud_service_models.md":         ("unit1", "s3", ["IaaS", "PaaS", "SaaS", "Shared Responsibility"]),
    "unit2_section1_core_architecture.md":            ("unit2", "s1", ["Architecture", "VDC", "Regions"]),
    "unit2_section2_compute_services.md":             ("unit2", "s2", ["Compute", "vCPU", "Dedicated Core", "Cubes"]),
    "unit2_section3_storage_services.md":             ("unit2", "s3", ["Storage", "Block Storage", "Object Storage"]),
    "unit2_section4_networking_services.md":          ("unit2", "s4", ["Networking", "ALB", "NLB", "NAT"]),
    "unit2_section5_database_services.md":            ("unit2", "s5", ["Database", "DBaaS", "PostgreSQL", "Redis"]),
    "unit2_section6_security_ai_containers.md":       ("unit2", "s6", ["Security", "AI", "Containers", "Kubernetes"]),
    "unit3_section1_dcd_account_management.md":       ("unit3", "s1", ["DCD", "Account Management"]),
    "unit3_section2_iam.md":                          ("unit3", "s2", ["IAM", "Token Manager", "2FA"]),
    "unit3_section3_cost_management.md":              ("unit3", "s3", ["Cost Management", "Billing", "Cost Alerts"]),
    "unit3_section4_monitoring_logging.md":           ("unit3", "s4", ["Monitoring", "Activity Logs", "Flow Logs"]),
    "unit3_section5_security_compliance.md":          ("unit3", "s5", ["Security", "Compliance", "GDPR"]),
}

LETTER_TO_IDX = {"A": 0, "B": 1, "C": 2, "D": 3}

def difficulty_for(num):
    if num <= 10:  return "easy"
    if num <= 20:  return "medium"
    return "hard"

def parse_file(filepath):
    with open(filepath, "r", encoding="utf-8") as f:
        raw = f.read()

    # Normalize line endings
    raw = raw.replace("\r\n", "\n").replace("\r", "\n")

    if "## Answer Key" not in raw:
        print(f"  WARNING: No Answer Key in {os.path.basename(filepath)}")
        return {}, {}

    q_part, a_part = raw.split("## Answer Key", 1)

    # ---- Parse questions (line by line) ----
    questions = {}
    lines = q_part.split("\n")
    i = 0
    while i < len(lines):
        line = lines[i].strip()

        # Question line: **N. text** or **N. text** (bold markers)
        m = re.match(r'^\*\*(\d+)\.\s+(.+?)\*\*$', line)
        if m:
            num = int(m.group(1))
            qtext = m.group(2).strip()
            options = []
            i += 1
            # Collect option lines A. B. C. D.
            while i < len(lines):
                opt_line = lines[i].strip()
                opt_m = re.match(r'^([A-D])\.\s+(.+)$', opt_line)
                if opt_m:
                    options.append(opt_m.group(2).strip())
                    i += 1
                elif opt_line == "" and len(options) > 0 and len(options) < 4:
                    i += 1  # skip blank lines between options
                else:
                    break
            questions[num] = {"question": qtext, "options": options}
        else:
            i += 1

    # ---- Parse answers (line by line) ----
    answers = {}
    a_lines = a_part.split("\n")
    current_num = None
    current_letter = None
    current_explanation = []

    def flush_answer():
        if current_num is not None and current_letter is not None:
            answers[current_num] = {
                "letter": current_letter,
                "explanation": " ".join(" ".join(current_explanation).split())
            }

    for line in a_lines:
        line_stripped = line.strip()
        # Match: N. A — explanation  (em dash, en dash, or hyphen)
        m = re.match(r'^(\d+)\.\s+([A-D])\s+[—–\-]\s+(.*)$', line_stripped)
        if m:
            flush_answer()
            current_num = int(m.group(1))
            current_letter = m.group(2)
            current_explanation = [m.group(3).strip()]
        elif current_num is not None and line_stripped:
            current_explanation.append(line_stripped)

    flush_answer()

    return questions, answers

def escape_ts(s):
    s = s.replace("\\", "\\\\")
    s = s.replace("'", "\\'")
    return s

def ts_str(s):
    return "'" + escape_ts(s) + "'"

def ts_arr(items):
    return "[" + ", ".join(ts_str(i) for i in items) + "]"

def main():
    all_questions = []
    total = 0

    for filename, (section, subsection, tags) in FILE_META.items():
        filepath = os.path.join(SECTIONAL_DIR, filename)
        if not os.path.exists(filepath):
            print(f"MISSING: {filename}")
            continue

        questions, answers = parse_file(filepath)
        count = 0

        for num in sorted(questions.keys()):
            q = questions[num]
            if num not in answers:
                print(f"  WARNING: No answer for Q{num} in {filename}")
                continue

            a = answers[num]
            correct_idx = LETTER_TO_IDX.get(a["letter"], 0)
            explanation = a["explanation"]
            # Derive strategy: first sentence of explanation
            strategy = re.split(r'(?<=[.!?])\s', explanation)[0]

            all_questions.append({
                "id": f"{section}-{subsection}-{num:03d}",
                "section": section,
                "difficulty": difficulty_for(num),
                "question": q["question"],
                "options": q["options"],
                "correctAnswer": correct_idx,
                "explanation": explanation,
                "strategy": strategy,
                "tags": tags,
            })
            count += 1

        print(f"  {filename}: {count} questions, {len(answers)} answers")
        total += count

    print(f"\nTotal: {total} questions")

    # ---- Write TypeScript ----
    lines = [
        "import { Question } from '@/types/gmat';",
        "",
        f"// Auto-generated from sectional exam markdown files — {total} questions",
        "",
        "export const QUESTION_BANK: Question[] = [",
    ]

    for q in all_questions:
        opts = "[\n" + "".join(f"      {ts_str(o)},\n" for o in q["options"]) + "    ]"
        lines += [
            "  {",
            f"    id: {ts_str(q['id'])},",
            f"    section: '{q['section']}',",
            f"    type: 'multiple-choice',",
            f"    difficulty: '{q['difficulty']}',",
            f"    question: {ts_str(q['question'])},",
            f"    options: {opts},",
            f"    correctAnswer: {q['correctAnswer']},",
            f"    explanation: {ts_str(q['explanation'])},",
            f"    strategy: {ts_str(q['strategy'])},",
            f"    commonTraps: [],",
            f"    targetTime: 60,",
            f"    tags: {ts_arr(q['tags'])},",
            "  },",
        ]

    lines += ["];", ""]

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))

    print(f"Written: {OUTPUT_FILE}")

if __name__ == "__main__":
    main()
