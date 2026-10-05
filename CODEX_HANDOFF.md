# TradeGuard maintenance notes

## Project

TradeGuard is a DevClans prototype for agreement review, delivery evidence and escrow settlement. The frontend uses React/TypeScript and Vinext/Vite. Sandbox records use Cloudflare D1/R2. Qwen extraction is server-side. The separate Monad workspace uses viem and Solidity.

Team: Ibrahim Rabiu (Developer), Mardiyya Sulaiman (UI Developer).

Submission repository: https://github.com/Alhibb/metropolis_tradeguard
Original repository: https://github.com/Alhibb/TradeGuard
Hosted prototype: https://devclans-tradeguard.alhibb.chatgpt.site/

## Working locally

Use the existing project and lockfile. Run `pnpm build`, then `pnpm local`. Stop the Windows preview before rebuilding to release `dist`. Local sign-in and ports 5173/8787 are development-only. D1/R2 state is under `.wrangler/state`.

`.env` is ignored and may contain live Qwen credentials. Do not print it, include it in archives, or copy it into the repository. The hosted runtime needs separate configuration; local settings are not automatically published.

The project root is now the Git checkout, with origin pointing to Alhibb/metropolis_tradeguard. Preserve existing history and stage explicit file lists. The older `.sites-runtime/publish-checkout` is not needed for current pushes. Runtime files, dependencies and secrets are excluded.

## Contracts

Monad testnet chain 10143:

- TGT: 0xfcc80262fccc19b3a833e2453e52316a0edf5f3b
- Escrow: 0x27ba251f396277a9af8ca7cf2cde4a279582f83a

Run `node scripts/verify-testnet.mjs` for read-only checks. No private key is needed. Reuse the contracts for new trades. Sandbox records are separate from live chain trades.

Deadlines are advisory after funding. Arbitration unavailability plus refusal of mutual settlement can lock funds. Disputes clear old mutual proposals; ownership renunciation is disabled.

## Verification

On 2 October 2026, TypeScript, build, 11 domain/extraction tests, 7 EVM tests and the complete local API demo passed. Screenshots are in `docs/screenshots/`. See `docs/VERIFICATION.md` for boundaries and remaining checks.

The 5 October navigation check passed production build, TypeScript, desktop/mobile sidebar navigation, search/status filtering, evidence deep links and trade-detail tabs. The homepage CTA is intentionally `#`; local testing uses the existing sign-in fixture URL directly. A synthetic disputed trade TG-36E8DA remains in local state. No live wallet transactions were tested.

## Submission work still open

Hosted Qwen/contract settings, judge access, live wallet rehearsal and demo video. The user will attach the video later. No Metropolis entry has been submitted. Confirm the platform's current rules and cutoff before submitting.
