#!/usr/bin/env bash
# Export the capability document to public/CoreSentia-Capability.pdf.
# Requires the dev server running (default port 3000; pass another as $1).
set -euo pipefail

PORT="${1:-3000}"
OUT="$(cd "$(dirname "$0")/.." && pwd)/public/CoreSentia-Capability.pdf"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

"$CHROME" --headless=new --disable-gpu --no-pdf-header-footer \
  --virtual-time-budget=15000 \
  --print-to-pdf="$OUT" \
  "http://localhost:${PORT}/capability-document"

echo "Exported: $OUT"
