

## Render one-click deploy
- `render.yaml` included at repo root. Update secrets in Render dashboard after linking the repo.

## Postman & demo
- `postman_collection.json` contains demo requests; import into Postman and set `baseUrl` to your backend URL.
- `demo_curl.sh` is a bash script to exercise login/create invoice/list bookings.

## Notes
- Admin password stored as bcrypt hash in server/data/users.json.
