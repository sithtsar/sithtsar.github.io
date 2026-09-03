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
