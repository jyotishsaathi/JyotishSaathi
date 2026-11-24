# Rebuilds source/loc/*.txt (area search data) from the india-pincode (MIT) and geodata-kit-localities (GeoNames, CC BY 4.0) npm packages.
# Usage: npm pack india-pincode geodata-kit-localities into /tmp/pdata, extract, then run this script.
import gzip, json, re, unicodedata, math, collections, os
G=json.load(gzip.open('/tmp/pdata/gk/package/data/IN.json.gz'))['rows']
P=json.load(gzip.open('/tmp/pdata/x_india-pincode-2.5.9/package/data/pincodes.json.gz'))
def ascii_(s): return unicodedata.normalize('NFKD', s).encode('ascii','ignore').decode()
SUF=re.compile(r'\s*\b(S\.?O|B\.?O|H\.?O|GPO|G\.P\.O|NDC|NDSO|MDG|S O|B O|H O|PO)\b\.?\s*', re.I)
def clean_po(n):
    n=re.sub(r'\(.*?\)','',n); n=SUF.sub(' ',n); n=re.sub(r'\s+',' ',n).strip(' .-,')
    return n.title() if n.isupper() or n.islower() else n
def tc(s): return ' '.join(w.capitalize() for w in s.lower().split())
STATES=sorted({tc(x['s']) for x in P if x['s'] and x['s']!='NA'})
SI={s:i for i,s in enumerate(STATES)}
# PO records with coords -> grid for nearest district/state
po=[]
for x in P:
    try: la,lo=float(x['a']),float(x['n'])
    except: continue
    if not (6<la<37.5 and 68<lo<98) or x['s']=='NA' or x['i']=='NA': continue
    po.append((clean_po(x['o']), tc(x['i']), tc(x['s']), la, lo))
grid=collections.defaultdict(list)
for r in po: grid[(int(r[3]*5),int(r[4]*5))].append(r)
def nearest(la,lo):
    gi,gj=int(la*5),int(lo*5); best=None; bd=1e9
    for rad in (0,1,2,3):
        for i in range(gi-rad,gi+rad+1):
            for j in range(gj-rad,gj+rad+1):
                for r in grid.get((i,j),()):
                    d=(r[3]-la)**2+((r[4]-lo)*math.cos(la/57.3))**2
                    if d<bd: bd,best=d,r
        if best: return best
    return None
out={}
def add(name, dist, st, la, lo):
    if not name or len(name)<2: return
    k=ascii_(name).lower(); k=re.sub(r'[^a-z0-9 ]','',k).strip()
    if len(k)<2: return
    key=(k, round(la,1), round(lo,1))
    if key in out: return
    out[key]=(name, dist, st, round(la,3), round(lo,3), k)
for r in po: add(r[0], r[1], r[2], r[3], r[4])
for r in G:
    nm=r[2] if r[2] else r[1]; nm=ascii_(nm) if r[2] else nm
    la,lo=r[5],r[6]; n=nearest(la,lo)
    if not n: continue
    add(nm, n[1], n[2], la, lo)
print('entries', len(out))
# shards by first 2 letters
sh=collections.defaultdict(list)
for v in out.values(): sh[v[5][:2]].append(v)
OUT='.'; os.makedirs('loc', exist_ok=True)
tot=0
for k,rows in sh.items():
    dists=sorted({r[1] for r in rows}); di={d:i for i,d in enumerate(dists)}
    rows.sort(key=lambda r:(len(r[0]), r[0]))
    body='|'.join(dists)+'\n'+'\n'.join(f"{r[0]}\t{di[r[1]]}\t{SI.get(r[2],0)}\t{r[3]}\t{r[4]}" for r in rows)
    fn=re.sub(r'[^a-z0-9]','_',k)
    open(f'loc/{fn}.txt','w').write(body); tot+=len(body.encode())
open('states.json','w').write(json.dumps(STATES))
print('shards',len(sh),'total MB',tot/1e6)
