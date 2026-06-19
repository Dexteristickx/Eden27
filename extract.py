from bs4 import BeautifulSoup

with open(r"C:\Users\user\.gemini\antigravity-ide\brain\d5079eab-beae-43db-90b7-abed9ba8e772\.system_generated\steps\81\content.md", "r", encoding="utf-8") as f:
    html = f.read()

soup = BeautifulSoup(html, "html.parser")
print(soup.get_text(separator="\n", strip=True)[:2000])
