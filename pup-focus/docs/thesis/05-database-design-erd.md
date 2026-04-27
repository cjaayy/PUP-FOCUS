# Database Design and ERD Notes

## Core Entity Clusters

- Identity: profiles, roles, user_roles.
- Academic: programs, curricula, compliance_template_items.
- Submission: submissions, document_versions, review_decisions.
- Governance: audit_logs, notifications.

## Relationship Highlights

- One curriculum has many compliance template items.
- One submission has many document versions.
- One reviewer can create many review decisions.

## Constraints

- Unique requirement per curriculum in template items.
- Unique version number per submission in document_versions.
