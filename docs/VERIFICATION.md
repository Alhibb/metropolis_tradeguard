# Verification record — 2026-10-02

## Checks completed on 2 October 2026

- TypeScript: `pnpm exec tsc --noEmit`. The live Qwen helper's typed-key indexing issue was fixed before this check.
- Domain/extraction: 11/11 tests passed.
- Solidity compilation and local EVM: 7/7 tests passed. Full 2500 TGT funding, 2250/250 allocation and both withdrawals, role/consent checks, pause behavior and multi-order accounting are covered. Ganache used its JavaScript fallback on Node 24.
- Production build: passed after the user stopped the previous preview, which had locked `dist` on Windows.
- Local launcher: rebuilt app running at http://127.0.0.1:5173/, worker on 8787, persistent local D1/R2 state retained.
- Runtime config: HTTP 200, Qwen enabled (`qwen-plus`), chain 10143, deployed token/escrow addresses match README.
- Complete API demo: `verify-local-demo.ts` PASS, trade TG-98823D. Qwen extraction exactly matched all sample terms; buyer/supplier approvals; 2500 TGT sandbox funding; evidence upload and exact downloaded bytes; 90-bag delivery; dispute; 2250 supplier/250 buyer; both withdrawals; saved record retrieval; unauthorized, spoofed-header, stale-version and cross-origin rejection.
- Built-worker API checks: `verify-local-worker.ts` PASS, trade TG-4209B6. The same workflow plus cross-owner order/action/file denial. Uses local trusted identity fixtures, not production ingress.
- Browser: local sign-in, overview, sample agreement import and real Qwen review label/fields, persisted settled agreement, 10-bag evidence discrepancy, both withdrawal events and zero remaining sandbox escrow, mobile sidebar navigation, configured Monad create/load controls.
- Screenshots: actual browser JPEGs under `docs/screenshots/`, linked from README. Captures contain synthetic data.
- Monad read-only checks: `verify-testnet.mjs` PASS. Contract code exists; chain 10143; escrow token matches configured TGT; symbol TGT; six decimals; owner 0x70D98e179e3Ce71FdE8Ed784fA79C542D5bDEB11. Next trade ID: 1.
- Official Metropolis page was read in-browser. It requests a working product, public project profile, demo, short write-up and code link. Its application link is https://hackathon.monad.xyz/.

## Scope and remaining verification

No live-wallet trade was submitted during these checks. Next trade ID 1 means the deployed escrow had no created trades. The wallet rehearsal requires three distinct funded accounts; local EVM tests and sandbox activity cover different parts of the application.

Browser PDF import and a complete UI-only create-to-withdraw walkthrough were not verified. End-to-end mutation coverage was through the local API scripts. Browser export was clicked, but the download observer timed out; exported-file retrieval is not counted as passed. Evidence byte retrieval passed through API checks.

A successful Qwen sample demonstrates connectivity and matching explicit fields for that fixture, not accuracy on unseen documents. Qwen output remains subject to human review.

Hosted Qwen and contract configuration, external judge access, recording and final submission remain outstanding. The hosted Site remains owner-only; local sign-in tests do not prove hosted authentication or judge access.

## Reproduce

See README for commands, deployment addresses, wallet runbook, screenshots and submission steps. Stop the Windows preview before rebuilding, then run `pnpm local`. API scripts create synthetic records and need the localhost server. Never run identity fixtures against a remote service or expose the raw worker publicly.

## 3 October repository review

Read-only deployed checks passed again; next trade ID remained 1. The submission repository is now Alhibb/metropolis_tradeguard. Team details and the pending video are in SUBMISSION_ENTRY.md. Documentation was revised for clarity and current behavior; this was an editorial/source review, not an audit or new model benchmark. Tests above retain their original 2 October date.

## 5 October navigation verification

- Production build and TypeScript passed. Build warnings concerned plugin timing only.
- All seven desktop sidebar destinations rendered their intended views.
- Trades search and status filtering passed; navigating cleared filters and selected trades.
- Evidence aggregated records and opened the corresponding Delivery evidence tab. Agreement and Activity tabs also passed.
- Escrow and Monad testnet loaded the existing Testnet component. Setup displayed the configured public network/token/escrow values and active styling.
- A synthetic local dispute, TG-36E8DA, verified the disputed-only list and Overview action link. It remains in local state.
- Mobile Evidence and Trades navigation passed at 390 × 844; the sidebar closed after selection. Mobile Setup also rendered.
- Unauthenticated orders and config requests returned 401. No browser warnings or errors were reported.
- The homepage link points to `#` at the owner’s request. Authentication and API routes remain unchanged; local testing entered through the existing development sign-in fixture.

These checks did not send Monad wallet transactions or verify a hosted deployment.
