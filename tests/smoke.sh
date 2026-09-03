#!/bin/sh
set -eu

test -f public/index.html
grep -q '<meta name=viewport' public/index.html
grep -q 'Skip to content' public/index.html
grep -q 'Sarthak Mishra' public/index.html
grep -q 'Selected work' public/index.html
grep -Eq 'data-cover-motif="?orbit"?' public/index.html
grep -q 'Representative content' public/index.html
test -f public/work/index.html
for page in public/work/agent-evaluation-ledger/index.html public/notes/index.html public/notes/why-evidence-beats-demos/index.html public/about/index.html public/studio/index.html; do
  test -f "$page"
done
grep -q '<details' public/work/agent-evaluation-ledger/index.html
grep -q 'p5.brush' public/studio/index.html
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
