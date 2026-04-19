#!/usr/bin/env python3
import os
import re
import sys

HTML_FILES = [
    'index.html',
    'about.html',
    'services.html',
    'contacts.html',
    'gallery.html',
    'fibis.html'
]

JS_FILES = ['js/header.js', 'js/footer.js']

def extract_paths(filepath):
    """Extract src, href, url(), background-image paths from file."""
    if not os.path.exists(filepath):
        return []
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    # Patterns
    src_matches = re.findall(r'src="([^"]+)"', content)
    href_matches = re.findall(r'href="([^"]+)"', content)
    url_matches = re.findall(r'url\(([^)]+)\)', content, re.IGNORECASE)
    bg_matches = re.findall(r'background-image:\s*url\(([^)]+)\)', content, re.IGNORECASE)
    
    all_paths = src_matches + href_matches + url_matches + bg_matches
    
    # Filter out external links, anchors, etc.
    filtered = []
    for p in all_paths:
        p = p.strip('\'"')
        if p.startswith(('http://', 'https://', '//', 'data:', 'tel:', 'mailto:', '#', 'javascript:')):
            continue
        if p == '':
            continue
        filtered.append(p)
    return filtered

def check_exists(path):
    """Check if file exists relative to project root."""
    if os.path.exists(path):
        return True
    # Maybe path has leading slash? try without
    if path.startswith('/'):
        return False
    # Try with ./ prefix
    if not path.startswith('./') and os.path.exists('./' + path):
        return True
    return False

def main():
    print("PAGE | ATTRIBUTE | PATH | STATUS")
    print("---------------------------------")
    
    for html_file in HTML_FILES:
        if not os.path.exists(html_file):
            print(f"{html_file} | FILE NOT FOUND | N/A | MISSING")
            continue
        paths = extract_paths(html_file)
        for p in paths:
            status = "EXISTS" if check_exists(p) else "MISSING"
            # Determine attribute type
            if p in re.findall(r'src="([^"]+)"', open(html_file).read()):
                attr = "src"
            elif p in re.findall(r'href="([^"]+)"', open(html_file).read()):
                attr = "href"
            elif p in re.findall(r'url\(([^)]+)\)', open(html_file).read(), re.IGNORECASE):
                attr = "url()"
            else:
                attr = "background-image"
            print(f"{html_file} | {attr} | {p} | {status}")
    
    # Check JS files
    for js_file in JS_FILES:
        if not os.path.exists(js_file):
            continue
        paths = extract_paths(js_file)
        for p in paths:
            status = "EXISTS" if check_exists(p) else "MISSING"
            print(f"{js_file} | src/href | {p} | {status}")

if __name__ == '__main__':
    main()