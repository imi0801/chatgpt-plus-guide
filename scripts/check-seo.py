"""Verify generated output at the actual GitHub project URL, without dependencies."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin, urlsplit, unquote
import json
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1] / 'docs'
BASE = 'https://imi0801.github.io/chatgpt-plus-guide/'
PREFIX = '/chatgpt-plus-guide/'
class Page(HTMLParser):
    def __init__(self, text):
        super().__init__(convert_charrefs=True)
        self.links=[]; self.assets=[]; self.canon=[]; self.ids=set(); self.h1=0
        self.robots=''; self.title=''; self.description=''; self.ctas=[]; self.schemas=[]
        self.capture=None; self.buffer=''
        self.feed(text)
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if 'id' in a:
            assert a['id'] not in self.ids, f"Duplicate id: {a['id']}"
            self.ids.add(a['id'])
        if tag=='h1': self.h1+=1
        if tag=='title': self.capture='title'; self.buffer=''
        if tag=='script' and a.get('type')=='application/ld+json': self.capture='json'; self.buffer=''
        if tag=='meta' and a.get('name')=='robots': self.robots=a['content']
        if tag=='meta' and a.get('name')=='description': self.description=a['content']
        if tag=='link' and a.get('rel')=='canonical': self.canon.append(a['href'])
        if tag=='link' and a.get('rel')=='stylesheet': self.assets.append(a['href'])
        if tag=='script' and a.get('src'): self.assets.append(a['src'])
        if tag=='a' and a.get('href'): self.links.append(a['href'])
        if tag=='a' and 'data-cta' in a: self.ctas.append(a)
    def handle_data(self,data):
        if self.capture: self.buffer+=data
    def handle_endtag(self,tag):
        if tag=='title' and self.capture=='title': self.title=self.buffer; self.capture=None
        if tag=='script' and self.capture=='json': self.schemas.append(json.loads(self.buffer)); self.capture=None

pages={}
for file in ROOT.rglob('*.html'):
    relative=file.relative_to(ROOT).as_posix()
    url=BASE+relative.removesuffix('index.html')
    text=file.read_text()
    assert '__CTA__' not in text, relative
    p=Page(text); pages[url]=p
    assert p.h1==1 and p.title and p.description, relative
    assert len(p.canon)==(0 if relative=='404.html' else 1), relative
    if p.canon: assert p.canon[0]==url, (url,p.canon)
    if relative=='404.html': assert 'noindex' in p.robots
    for cta in p.ctas:
        u=urlsplit(cta['href'])
        expected_host='fe.dtyuedan.cn' if cta['data-product']=='recharge' else 'www.goplus.pro'
        assert u.netloc==expected_host
        expected={'pro':'/chatgpt-pro-recharge','plus':'/chatgpt-plus-recharge','recharge':'/shop/panghu'}[cta['data-product']]
        assert u.path==expected and 'utm_content=' in u.query, (relative,cta)
        assert 'sponsored' in cta.get('rel','')
    for schema in p.schemas:
        if schema.get('@type')=='BlogPosting':
            assert schema['mainEntityOfPage']==url and schema['dateModified']>=schema['datePublished']

for url,p in pages.items():
    for href in p.links+p.assets:
        target=urlsplit(urljoin(url,href))
        if target.netloc!='imi0801.github.io': continue
        assert target.path.startswith(PREFIX), (url,href,'outside project')
        file=ROOT/unquote(target.path[len(PREFIX):])
        if target.path.endswith('/'): file=file/'index.html'
        assert file.is_file(), (url,href,'missing target')
        if target.fragment:
            target_url=target._replace(fragment='',query='').geturl()
            if target_url in pages: assert unquote(target.fragment) in pages[target_url].ids, (url,href,'missing anchor')

ns={'s':'http://www.sitemaps.org/schemas/sitemap/0.9'}
sitemap=ET.parse(ROOT/'sitemap.xml')
urls=[item.text for item in sitemap.findall('.//s:loc',ns)]
assert len(urls)==len(set(urls))
assert set(urls)=={url for url,p in pages.items() if 'noindex' not in p.robots}
assert len({p.title for p in pages.values()})==len(pages), 'Duplicate titles'
for route in ['archives/','tags/','categories/','sitemap/']:
    assert 'noindex' in pages[BASE+route].robots
print(f'PASS: {len(pages)} HTML pages; {len(urls)} canonical sitemap URLs; links, fragments, metadata, schemas, CTA destinations.')
