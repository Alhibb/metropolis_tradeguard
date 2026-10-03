# Run TradeGuard locally

## Run locally on Windows

Requires Node 22.13+ and pnpm (lockfile uses pnpm 11.25.0).

```powershell
Set-Location -LiteralPath 'C:\Users\hp\Documents\ChatGPT\TradeGuard'
pnpm install --frozen-lockfile
if (-not (Test-Path -LiteralPath '.env')) {
    Copy-Item -LiteralPath '.env.example' -Destination '.env'
}
pnpm build
pnpm local
```

Open http://127.0.0.1:5173/ and choose **Sign in to your workspace**. Use a regular browser with a wallet extension for the Monad segment. The in-app browser supports the sandbox but may have no wallet provider.

The launcher initializes D1 idempotently and retains D1/R2 state in `.wrangler/state`. The localhost sign-in fixture runs on port 5173, with a worker on 8787. This is development-only authentication; do not expose either port publicly.

Stop with **Ctrl+C**. Restart after `.env` changes. On Windows, stop the app before building: the worker can lock `dist`. Rebuild after application source changes.

## Singapore Qwen and app configuration

Edit your ignored `.env` locally:

```dotenv
QWEN_ENABLED=true
QWEN_API_KEY=YOUR_SINGAPORE_API_KEY
QWEN_BASE_URL=https://dashscope-intl.aliyuncs.com/compatible-mode/v1
QWEN_MODEL=qwen-plus
TOKEN_ADDRESS=0xfcc80262fccc19b3a833e2453e52316a0edf5f3b
ESCROW_ADDRESS=0x27ba251f396277a9af8ca7cf2cde4a279582f83a
MONAD_RPC_URL=https://testnet-rpc.monad.xyz
MONAD_CHAIN_ID=10143
```

Use a Singapore Model Studio key with model permission. Never commit `.env` or put a wallet private key in it. `.env.example` is shareable. With Qwen disabled, the labeled deterministic parser remains available.

Enabling Qwen sends agreement text to Alibaba Cloud and may incur API charges. Review every suggestion against the source. Valid schema and verified quotes do not prove accuracy. AI never receives signing keys or arbitrates.

```powershell
node --import tsx scripts/verify-qwen-live.ts
```

This check intentionally calls Qwen even if its normal enable flag is false. It reports synthetic field matches without printing the key. One fixture is not an accuracy benchmark.

Local `.env` is not transferred to Sites. Set hosted API keys through supported runtime secret entry, set the public contract addresses as hosted runtime values, and deploy to apply configuration.


## Run the checks

## Tests

```powershell
pnpm exec tsc --noEmit
node --import tsx --test tests/domain.test.ts tests/extraction.test.ts
node scripts/compile-contracts.mjs
node --test tests/contracts.test.mjs

# With pnpm local running:
node --import tsx scripts/verify-local-demo.ts
node --import tsx scripts/verify-local-worker.ts

# Read-only chain checks:
node scripts/verify-testnet.mjs
```

Domain/extraction: **11 passing tests**. Local EVM: **7 passing tests**. Ganache uses its JavaScript fallback on Node 24; that optional native warning does not invalidate the tests.

API scripts create synthetic local records. They verify extraction, approvals, funding, evidence upload/download, disputes, exact 90/10 allocations, both withdrawals, persistence, stale-version rejection and access boundaries. The worker script uses localhost-only identity fixtures to check cross-owner denial. These are not production ingress or live-wallet tests. See [verification record](VERIFICATION.md).

