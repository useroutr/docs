<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/useroutr/.github/main/profile/assets/mark-dark.png">
  <img src="https://raw.githubusercontent.com/useroutr/.github/main/profile/assets/mark-light.png" alt="Useroutr" width="48">
</picture>

# docs

Public developer documentation for Useroutr. Built with [Mintlify](https://mintlify.com).

## Local development

```bash
npm i -g mint
mint dev
```

Serves on `http://localhost:3000` with hot reload.

## Layout

```
docs.json              Navigation, theme, and the OpenAPI wiring
index.mdx              Introduction
quickstart.mdx         Zero to a settled test funding
concepts/              Core model, lifecycle, ledger, settlement
guides/                Authentication, idempotency, webhooks, errors
errors/                One page per error code
api-reference/
  introduction.mdx     Conventions
  openapi.yaml         Synced from the product repo. Do not edit here
snippets/              Reusable fragments
scripts/
  sync-openapi.sh      Pull the spec from useroutr/openapi
  check-nav.mjs        Assert every navigation entry resolves
```

## The two rules

**The API reference is generated, never written.** `api-reference/openapi.yaml` is a copy of the spec from the [useroutr](https://github.com/useroutr/useroutr) repo, where it is authored alongside the handlers it validates. Editing it here would create a second source of truth that silently drifts from the implementation.

```bash
./scripts/sync-openapi.sh
```

**Every error code has a page.** The `docs_url` field in every API error response points at `docs.useroutr.com/errors/<code>`. Adding an error code to the API without adding a page here ships a link to a 404. Both sides of that contract are checked in CI.

## Checks

CI validates that `docs.json` parses, that every page in the navigation exists on disk and every page on disk is reachable from the navigation, and that the OpenAPI spec lints.

```bash
node scripts/check-nav.mjs
```

## Writing

Sparse and specific. Say what the thing does, when it fails, and what to do about it. Prefer a table to a paragraph and an example to a description.

House style, matching the rest of the codebase: no em dashes, no emoji. Use commas, colons, or periods.

Status pages and unavailable features are labelled as such rather than omitted. A developer who can see that something is coming makes better decisions than one who cannot tell whether they missed it.
