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
set -- public/css/site.min.*.css
test "$#" -eq 1
css_path=$1
set -- public/js/site.min.*.js
test "$#" -eq 1
js_path=$1
cat public/index.html "$css_path" "$js_path" | gzip -9 -c > /tmp/portfolio-critical.gz
test "$(wc -c < /tmp/portfolio-critical.gz)" -le 35840
test "$(gzip -9 -c "$js_path" | wc -c)" -le 3072
set -- public/fonts/newsreader-latin.*.woff2
test "$#" -eq 1
test "$(wc -c < "$1")" -le 51200
