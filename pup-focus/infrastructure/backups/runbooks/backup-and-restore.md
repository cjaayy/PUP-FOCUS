# Backup and Restore Runbook

## Backup Policy

- Daily automated PostgreSQL backups via Supabase.
- Weekly export of critical storage bucket metadata.

## Restore Drill

- Monthly restore verification in staging environment.
- Validate authentication, curriculum, submissions, and document version integrity.

## Targets

- RPO: 15 minutes
- RTO: 2 hours
