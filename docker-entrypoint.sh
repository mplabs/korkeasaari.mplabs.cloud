#!/bin/sh
cat > /usr/share/nginx/html/config.json <<EOF
{
  "lastVisit": "${LAST_VISIT:-2025-07-12}",
  "nextVisit": "${NEXT_VISIT:-2026-07-11}",
  "destination": "${DESTINATION:-Korkeasaari}"
}
EOF
exec nginx -g 'daemon off;'
