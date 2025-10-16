#!/bin/bash
# Demo script: admin login -> create invoice -> view bookings -> submit supplier invoice
BASE="{{baseUrl}}"
echo "Logging in as admin..."
RESP=$(curl -s -X POST "$BASE/api/auth/login" -H "Content-Type: application/json" -d '{"username":"traffic.acbutescu@gmail.com","password":"Porumbeiimei112"}')
TOKEN=$(echo $RESP | python -c "import sys, json; print(json.load(sys.stdin).get('accessToken',''))")
echo "Access token: $TOKEN"
if [ -z "$TOKEN" ]; then echo "Login failed"; exit 1; fi
echo "Creating invoice..."
curl -s -X POST "$BASE/api/invoices" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"clientId":"client","items":[{"desc":"Freight","qty":1,"unitPrice":100}],"vatPercent":20}' | jq
echo "Listing bookings..."
curl -s -X GET "$BASE/api/bookings/bookings" -H "Authorization: Bearer $TOKEN" | jq
echo "Submitting supplier invoice (simulate subcontractor)..."
# Note: subcontractor can't use admin token; this is illustrative. To test subcontractor flow, create a subcontractor user and login.
