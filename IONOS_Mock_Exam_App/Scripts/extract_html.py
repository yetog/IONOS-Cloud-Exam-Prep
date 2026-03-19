import sys, re, os

def strip_html(content):
    # Try to grab just the body if it exists
    body_match = re.search(r'<main[^>]*>(.*?)</main>', content, re.IGNORECASE | re.DOTALL)
    if body_match: 
        content = body_match.group(1)
    else:
        body_match = re.search(r'<body[^>]*>(.*?)</body>', content, re.IGNORECASE | re.DOTALL)
        if body_match: 
            content = body_match.group(1)
    
    # Remove scripts and styles
    content = re.sub(r'<(script|style)[^>]*>.*?</\1>', '', content, flags=re.IGNORECASE | re.DOTALL)
    
    # Convert headings to markdown
    for i in range(1, 4):
        content = re.sub(fr'<h{i}[^>]*>(.*?)</h{i}>', lambda m: f'\n{"#" * i} {strip_inner(m.group(1))}\n', content, flags=re.IGNORECASE | re.DOTALL)
    
    # Convert list items
    content = re.sub(r'<li[^>]*>(.*?)</li>', lambda m: f'\n- {strip_inner(m.group(1))}', content, flags=re.IGNORECASE | re.DOTALL)
    
    # Replace other tags with spaces
    text = re.sub(r'<[^>]+>', ' ', content)
    
    # Collapse whitespace
    text = re.sub(r' +', ' ', text)
    text = re.sub(r'\n ', '\n', text)
    text = re.sub(r'\n+', '\n\n', text)
    return text.strip()

def strip_inner(text):
    return re.sub(r'<[^>]+>', '', text).strip()

def process_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        text = strip_html(content)
        return f'\n\n--- FILE: {filepath} ---\n\n{text}'
    except Exception as e:
        return f'Error reading {filepath}: {e}'

def process_units():
    units = {
        'unit1': ['unit-1.1-cloud-computing-fundamentals.html', 'unit-1.2-cloud-service-benefits.html', 'unit-1.3-cloud-deployment-models.html', 'unit-1.4-knowledge-check.html'],
        'unit2': ['unit-2.1-core-components.html', 'unit-2.2-compute.html', 'unit-2.3-storage-services.html', 'unit-2.4-networking-services.html', 'unit-2.5-databases.html', 'unit-2.6-security-ai-containers.html', 'unit-2.7-knowledge-check.html'],
        'unit3': ['unit-3.1-dcd-account-management.html', 'unit-3.2-iam.html', 'unit-3.3-cost-billing.html', 'unit-3.4-logs-monitoring.html', 'unit-3.5-security-compliance.html', 'unit-3.6-knowledge-check.html']
    }
    
    for unit, files in units.items():
        output = []
        for file in files:
            if os.path.exists(file):
                output.append(process_file(file))
        
        with open(f'{unit}_text.md', 'w', encoding='utf-8') as f:
            f.write('\n'.join(output))

if __name__ == '__main__':
    process_units()
