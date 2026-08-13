#!/usr/bin/env bash
# Copy the API specification from the product repo. The spec is authored there,
# alongside the handlers it validates, and this repo only renders it.
set -euo pipefail

SRC="${1:-../useroutr/openapi/openapi.yaml}"
DEST="api-reference/openapi.yaml"

if [ ! -f "$SRC" ]; then
  echo "spec not found at $SRC" >&2
  echo "pass the path explicitly: ./scripts/sync-openapi.sh /path/to/openapi.yaml" >&2
  exit 1
fi

cp "$SRC" "$DEST"
echo "synced $SRC -> $DEST"

if ! git diff --quiet "$DEST" 2>/dev/null; then
  echo "spec changed. Review the diff and commit."
else
  echo "spec unchanged."
fi
