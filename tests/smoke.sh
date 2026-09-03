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
