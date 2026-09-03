#!/bin/sh
set -eu

test -f public/index.html
grep -q '<meta name=viewport' public/index.html
grep -q 'Skip to content' public/index.html
grep -q 'Sarthak Mishra' public/index.html
grep -q 'Things I’ve built' public/index.html
! grep -q 'Proof before theatre' public/index.html
! grep -q 'Personal report' public/index.html
grep -Eq 'data-cover-motif="?atlas"?' public/index.html
grep -q 'Lattice Boltzmann Flow' public/index.html
grep -q 'InstiGPT' public/work/index.html
grep -q 'QNLP Financial Intelligence' public/work/index.html
grep -q 'Anywhere you want me' public/index.html
grep -q 'AI engineer · researcher' public/index.html
! grep -q 'SM—26' public/index.html
! grep -q 'Selected systems and inquiries' public/index.html
grep -q 'mishrasarthak1520@gmail.com' public/index.html
grep -q 'github.com/sithtsar' public/index.html
grep -q 'linkedin.com/in/sarthakm15' public/index.html
grep -q 'x.com/sarthakant' public/index.html
! grep -Eqi 'candidate|representative|replace before publishing' public/index.html
test -f public/work/index.html
test -f public/index.xml
for page in public/work/lattice-boltzmann-flow/index.html public/work/instigpt/index.html public/work/qnlp-financial-intelligence/index.html public/notes/index.html public/notes/why-evidence-beats-demos/index.html public/about/index.html public/studio/index.html; do
  test -f "$page"
done
grep -q 'evidence-row' public/work/lattice-boltzmann-flow/index.html
grep -q 'p5.brush' public/studio/index.html
grep -q 'Bachelor thesis project' public/work/index.html
test -f public/favicon.svg
test -f public/robots.txt
css_url=$(grep -o '/css/site\.min\.[a-f0-9]*\.css' public/index.html | head -n 1)
js_url=$(grep -o '/js/site\.min\.[a-f0-9]*\.js' public/index.html | head -n 1)
font_url=$(grep -o '/fonts/newsreader-latin\.[a-f0-9]*\.woff2' public/index.html | head -n 1)
css_path=public$css_url
js_path=public$js_url
font_path=public$font_url
test -f "$css_path"
test -f "$js_path"
test -f "$font_path"
cat public/index.html "$css_path" "$js_path" | gzip -9 -c > /tmp/portfolio-critical.gz
test "$(wc -c < /tmp/portfolio-critical.gz)" -le 35840
test "$(gzip -9 -c "$js_path" | wc -c)" -le 3072
test "$(wc -c < "$font_path")" -le 51200
grep -q 'Prof. Amol Subhedar' public/work/lattice-boltzmann-flow/index.html
grep -q 'github.com/sithtsar/BTP' public/work/lattice-boltzmann-flow/index.html
grep -q 'SaleBuddy' public/work/index.html
grep -q 'Zwilling' public/about/index.html
grep -q 'JEE Advanced' public/about/index.html
grep -q 'Causal Security' public/about/index.html
grep -q 'Causal Security' public/work/index.html
grep -q 'FedICU' public/work/index.html
grep -q 'che.iitb.ac.in' public/about/index.html
grep -q 'minds.iitb.ac.in' public/about/index.html
grep -q 'data-paint=story' public/about/index.html
paint_url=$(grep -o '/js/paint\.min\.[a-f0-9]*\.js' public/about/index.html | head -n 1)
test -f "public$paint_url"
test "$(gzip -9 -c "public$paint_url" | wc -c)" -le 6144
! grep -q 'paint.min' public/work/index.html
for page in public/work/atlas/index.html public/work/weave/index.html public/work/lathe/index.html public/work/locus/index.html public/work/federated-ga/index.html public/notes/quantum-computing-summer/index.html public/notes/dell-case-study/index.html; do
  test -f "$page"
done
! grep -q 'Financial Analysis' public/work/index.html
grep -q 'piexie' public/work/index.html
test -f public/taste/index.html
grep -q 'taste/' public/index.html
grep -q 'data-theme-toggle' public/index.html
grep -q 'say hi.' public/index.html
grep -q 'data-ascii' public/index.html
! grep -q 'Dispatch' public/index.html
! grep -q 'Why evidence beats demos' public/index.html
test "$(gzip -c public/js/ascii.*.js | wc -c)" -le 2048
grep -q 'Copy for AI' public/work/atlas/index.html
grep -q 'textPath' public/about/index.html
grep -q 'page-lead__year' public/work/index.html
grep -q 'class=stat' public/work/lathe/index.html
grep -q 'margin-note' public/work/locus/index.html
grep -q 'plate-figure' public/studio/index.html
# Work write-ups stay at conference altitude: no internal auth, schema, or vendor detail.
for word in WorkOS CSRF pgvector 'brain.db' anydoc modernc 'delegation-token' 'delegation token'; do
  if grep -rqi -- "$word" public/work public/taste public/about; then echo "leaked internal detail: $word"; exit 1; fi
done
grep -q 'fill="#171713"' public/favicon.svg
grep -q 'bought a flight' public/about/index.html
grep -q 'IntersectionObserver' public/js/paint.*.js
grep -q 'class=diary' public/taste/index.html
grep -q 'herdr' public/taste/index.html
grep -q 'Hyprland' public/taste/index.html
grep -q 'marimo' public/taste/index.html
grep -q 'tl-row' public/work/index.html
! grep -q 'map__land' public/index.html
! grep -qi 'mumbai' public/index.html
grep -q 'polaroid--empty' public/about/index.html
! test -f public/img/me.jpg
grep -q 'Bell Labs' public/index.html
