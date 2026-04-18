import xml.etree.ElementTree as ET

def extract_text(xml_path):
    try:
        tree = ET.parse(xml_path)
        root = tree.getroot()
        namespaces = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
        paragraphs = []
        for p in root.findall('.//w:p', namespaces):
            texts = []
            for node in p.findall('.//w:t', namespaces):
                if node.text:
                    texts.append(node.text)
            if texts:
                paragraphs.append(''.join(texts))
        return '\n'.join(paragraphs)
    except Exception as e:
        return str(e)

with open('docs_extracted.txt', 'w', encoding='utf-8') as f:
    f.write('=== PAGE DOCS ===\n')
    f.write(extract_text('temp_pagedocs/word/document.xml'))
    f.write('\n\n=== PHASES ===\n')
    f.write(extract_text('temp_phases/word/document.xml'))
