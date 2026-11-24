"""Rebuilds the app from these source files.
Writes:  ../website/app/index.html  (browser version)
         ../app/www/index.html      (Android version, fonts bundled)
Run from anywhere:  python3 source/build.py   (needs `npm install` in app/ first for fonts)"""
import pathlib, re, shutil
d = pathlib.Path(__file__).resolve().parent
root = d.parent
css = (d / 'style.css').read_text(encoding='utf-8')
js = '\n'.join((d / f).read_text(encoding='utf-8') for f in ['places.js', 'config.js', 'palm-prompt.js', 'compat-prompt.js', 'premium-prompts.js', 'engine.js', 'content.js', 'bhakti.js', 'extras.js', 'extras2.js', 'growth-data.js', 'temple-icons.js', 'localities.js', 'app.js'])
js = js.replace('  /*@@GROWTH@@*/', (d / 'growth.js').read_text(encoding='utf-8'), 1)
assert '@@GROWTH@@' not in js
head = '''<!DOCTYPE html>
<html lang="hi">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#7B1E2B">
<title>Jyotish Saathi</title>
'''
gfonts = '''<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Mukta:wght@400;500;600;700&family=Mukta+Vaani:wght@400;500;700&family=Tiro+Devanagari+Hindi&display=swap" rel="stylesheet">
'''
body = '</head>\n<body>\n<div id="app"></div>\n<script>' + js + '</script>\n</body>\n</html>'
web = head + gfonts + '<style>' + css + '</style>\n' + body
(root / 'website' / 'app').mkdir(parents=True, exist_ok=True)
nm = root / 'app' / 'node_modules'
libs = [nm / 'html2canvas' / 'dist' / 'html2canvas.min.js', nm / 'jspdf' / 'dist' / 'jspdf.umd.min.js']
if all(l.exists() for l in libs):
    (root / 'website' / 'app' / 'libs').mkdir(exist_ok=True)
    for l in libs: shutil.copy(l, root / 'website' / 'app' / 'libs' / l.name)
(root / 'website' / 'app' / 'index.html').write_text(web, encoding='utf-8')
# area search data (loads one small file at a time). The Android app downloads it from your website
# (siteUrl in config.js) so the app stays small; without a siteUrl it is bundled into the app.
site = re.search(r"siteUrl:\s*'([^']*)'", (d / 'config.js').read_text(encoding='utf-8'))
site = site.group(1).strip() if site else ''
for dest in [root / 'website' / 'app' / 'loc', root / 'app' / 'www' / 'loc']:
    if dest.exists(): shutil.rmtree(dest)
    if dest.parent.name == 'www' and site: continue
    shutil.copytree(d / 'loc', dest)
# Saathi's own recorded voice clips (kathas, voice test)
for dest in [root / 'website' / 'app' / 'voice', root / 'app' / 'www' / 'voice']:
    if dest.exists(): shutil.rmtree(dest)
    if (d / 'voice').exists(): shutil.copytree(d / 'voice', dest)
print('website/app/index.html', len(web))

fs = root / 'app' / 'node_modules' / '@fontsource'
www = root / 'app' / 'www'; (www / 'fonts').mkdir(parents=True, exist_ok=True)
font_css = ''
if fs.exists():
    for fam, weights in [('mukta', ['400', '500', '600', '700']), ('mukta-vaani', ['400', '500', '700']), ('tiro-devanagari-hindi', ['400'])]:
        if not (fs / fam).exists(): print('WARNING: missing font', fam); continue
        for w in weights:
            for b in re.findall(r'@font-face\s*{[^}]*}', (fs / fam / f'{w}.css').read_text()):
                if not re.search(r'(devanagari|latin|gujarati)-\d+-normal', b) or 'latin-ext' in b: continue
                if fam == 'mukta-vaani' and 'gujarati' not in b: continue
                for f in re.findall(r'\./files/([\w.-]+\.woff2)', b):
                    shutil.copy(fs / fam / 'files' / f, www / 'fonts' / f)
                b = re.sub(r",\s*url\(\./files/[\w.-]+\.woff\)\s*format\('woff'\)", '', b)
                font_css += b.replace('./files/', 'fonts/') + '\n'
else:
    print('WARNING: run `npm install` inside app/ first so fonts can be bundled')
android_css = '''
.top{padding-top:calc(.6rem + env(safe-area-inset-top,0px))}
.tabs{padding-bottom:calc(.45rem + env(safe-area-inset-bottom,0px))}
body{overscroll-behavior:none;user-select:none;-webkit-user-select:none}
input,select,textarea{user-select:text;-webkit-user-select:text}
'''
lib_js = ''.join('<script>' + l.read_text(encoding='utf-8').replace('</script', '<\\/script') + '</script>\n' for l in libs if l.exists())
andr = head.replace('initial-scale=1', 'initial-scale=1, viewport-fit=cover') + '<style>' + font_css + css + android_css + '</style>\n' + lib_js + body
(www / 'index.html').write_text(andr, encoding='utf-8')
print('app/www/index.html', len(andr))
