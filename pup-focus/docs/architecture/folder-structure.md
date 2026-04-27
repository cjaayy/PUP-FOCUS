# Enterprise Folder Structure Notes

## App Router Route Groups

- (public): public-facing pages
- (auth): authentication flows
- (faculty): faculty portal
- (program-head): evaluator portal
- (admin): super admin console
- API: route handlers for integrations, exports, and health

## Feature Modules

Each module follows:

- components
- actions
- services
- repositories
- hooks
- schemas
- types
- utils

## Placement Rules

- Server actions stay in features/\*/actions.
- API routes stay in the app route-handler directory.
- DB access and adapters stay in lib or infrastructure with repository boundaries.
