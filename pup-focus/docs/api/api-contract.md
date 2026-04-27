# API Contract Baseline

## Internal Mutation Path

- Prefer server actions in feature actions folders for platform-internal changes.

## Public Route Handlers

- GET /api/health
- GET /api/reports/export
- GET /api/auth/callback

## Response Envelope

Use a typed response model with data and error fields for consistency.
