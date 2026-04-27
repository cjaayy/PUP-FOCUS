# PUP FOCUS System Overview

## Architecture Style

- Modular monolith with Domain-Driven Design boundaries.
- Next.js App Router for presentation and orchestration.
- Supabase for authentication, PostgreSQL, and storage.

## Core Domains

- Authentication
- Curriculum Management
- Compliance Management
- Submissions and Document Versioning
- Document Review
- Notifications
- Reports and Analytics
- Audit Logs

## Security Foundation

- RLS-first data access model.
- Route middleware plus action-level permission checks.
- Private bucket access via signed URLs.
