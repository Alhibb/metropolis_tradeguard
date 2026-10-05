<p align="center">
  <img src="docs/assets/tradeguard-banner.svg" alt="TradeGuard — clear agreements, evidence before settlement" width="100%" />
</p>

<p align="center">
  <strong>A delivery dispute should have a clear paper trail.</strong><br />
  Reviewed terms, delivery evidence and Monad testnet escrow, built by DevClans.
</p>

<p align="center">
  <a href="#the-demo">The demo</a> ·
  <a href="#screenshots">Screenshots</a> ·
  <a href="#run-it">Run it</a> ·
  <a href="#monad-testnet">Contracts</a> ·
  <a href="#submission-guide">Submission guide</a>
</p>

---

## Why TradeGuard

A buyer orders 100 bags of maize. The supplier delivers 90. The agreement, receipt and payment decision need to tell the same story.

TradeGuard keeps that record together. Qwen extracts draft terms from the agreement, people check and approve them, and delivery evidence records what arrived. If the parties disagree, their named arbitrator decides the split. Each participant withdraws their allocation from escrow.

## The demo

| Agreed | Delivered | Settlement |
| --- | --- | --- |
| 100 bags at NGN 42,000 each | 90 bags; 10 missing | 2,250 TGT to supplier, 250 TGT to buyer |

The invoice is **NGN 4,200,000**. The **2,500 TGT** settlement is a separate test-token amount; there is no currency conversion.

There are two workspaces:

- **Sandbox:** a private rehearsal with simulated roles and balances, saved records and evidence attachments.
- **Monad testnet:** a separate contract workflow with buyer, supplier and arbitrator wallets. Every transaction requires the right wallet signature.

AI helps read the agreement. It does not decide disputes or release payments.

## Screenshots

Local browser captures from the synthetic 100/90-bag demo. These show the application, not completed Monad settlement transactions.

<table>
  <tr>
    <td width="50%"><strong>Trade overview</strong><br /><img src="docs/screenshots/01-overview.jpg" alt="Trade dashboard" width="100%" /></td>
    <td width="50%"><strong>Delivery shortage</strong><br /><img src="docs/screenshots/05-delivery-evidence.jpg" alt="Evidence reporting ten missing bags" width="100%" /></td>
  </tr>
  <tr>
    <td><strong>Settlement record</strong><br /><img src="docs/screenshots/04-settlement.jpg" alt="2250 and 250 TGT allocations withdrawn in the sandbox" width="100%" /></td>
    <td><strong>Monad workspace</strong><br /><img src="docs/screenshots/07-monad-workspace.jpg" alt="Wallet-based trade controls" width="100%" /></td>
  </tr>
</table>

[Agreement import](docs/screenshots/02-agreement-import.jpg) · [Reviewed Qwen fields](docs/screenshots/03-qwen-review.jpg) · [Activity history](docs/screenshots/06-activity.jpg)

## Run it

Requires **Node 22.13+** and **pnpm**. From the repository directory:

```powershell
pnpm install --frozen-lockfile
if (-not (Test-Path -LiteralPath '.env')) {
    Copy-Item -LiteralPath '.env.example' -Destination '.env'
}
pnpm build
pnpm local
```

Open http://127.0.0.1:5173/ in a browser with MetaMask and choose **Sign in with MetaMask**. Approve account access and sign the login message. Stop with Ctrl+C. On Windows, stop the app before rebuilding; restart after changing `.env`.

Workspace authentication uses a wallet-signed login message and a server-verified session. The old local ChatGPT sign-in fixture does not authenticate wallet workspaces. D1/R2 data persists in `.wrangler/state`; keep both local ports private.

| Guide | Contents |
| --- | --- |
| [Local setup](#local-setup-guide) | Windows commands, Singapore Qwen, environment settings and checks |
| [Sandbox demo](#sandbox-demo-guide) | Agreement review, evidence, dispute and 90/10 settlement |
| [Monad wallet guide](#monad-wallet-guide) | Wallet funding, deployment, TGT faucet and the three-wallet flow |
| [Submission guide](#submission-guide) | Portal steps, project details and remaining materials |

`.gitignore` excludes API keys, wallet files, dependencies, builds and local runtime state. Keep actual keys in your ignored `.env`; never commit a wallet private key. `.env.example` contains placeholders only.

## Monad testnet

| Contract | Address |
| --- | --- |
| TGT — six decimals | [`0xfcc80262fccc19b3a833e2453e52316a0edf5f3b`](https://testnet.monadscan.com/address/0xfcc80262fccc19b3a833e2453e52316a0edf5f3b) |
| Escrow | [`0x27ba251f396277a9af8ca7cf2cde4a279582f83a`](https://testnet.monadscan.com/address/0x27ba251f396277a9af8ca7cf2cde4a279582f83a) |

Chain ID: **10143**. Gas: **testnet MON**. TGT has no cash value. Reuse the same deployed contracts for new trades; app restarts do not require deployment.

```powershell
node scripts/verify-testnet.mjs
```

Code, token linkage and decimals passed read-only checks on 2 October 2026. That check returned next trade ID 1. A live three-wallet trade, settlement and withdrawal rehearsal is still outstanding.

## Under the hood

React and TypeScript run on Vinext/Vite. Cloudflare D1 stores sandbox records; R2 stores evidence. The server calls Singapore Qwen Plus for extraction. Solidity and OpenZeppelin implement escrow, and viem connects the wallet UI.

```text
app/                 Screens and authenticated API routes
lib/tradeguard/      Terms, sandbox transitions and extraction
contracts/src/       TGT and escrow contracts
scripts/             Local launcher, deployment and verification
tests/               Domain, extraction and local EVM checks
docs/                Setup, demo, review and submission material
```

The server validates extraction fields and filters source quotes. Buyers and suppliers review the result before saving. Documents stay off-chain; the testnet workflow publishes salted commitments and transaction data.

## Verification

The 5 October navigation check passed the production build, TypeScript, all seven sidebar destinations, trade-detail tabs, search/status filtering, disputed-only records and mobile menu closing. No browser warnings or errors were reported. Wallet transactions were not part of that check.

The 2 October check passed TypeScript, production build, **11 domain/extraction tests**, **7 local EVM tests**, and the full persisted API demo, including evidence bytes, 90/10 settlement, both withdrawals and access checks.

```powershell
pnpm exec tsc --noEmit
node --import tsx --test tests/domain.test.ts tests/extraction.test.ts
node scripts/compile-contracts.mjs
node --test tests/contracts.test.mjs
```

With `pnpm local` running:

```powershell
node --import tsx scripts/verify-local-demo.ts
node --import tsx scripts/verify-local-worker.ts
```

The API checks create synthetic records. A successful Qwen sample confirms connectivity and matching fields for that example, not accuracy on other documents. [Full verification record](#verification-record).

## Metropolis

**Team:** DevClans

| Member | Role |
| --- | --- |
| Ibrahim Rabiu | Developer |

**Suggested track:** Consumer Products & Payments.

- [Project repository](https://github.com/Alhibb/metropolis_tradeguard)
- [Hosted prototype](https://devclans-tradeguard.alhibb.chatgpt.site/) — currently owner-only
- [Official event](https://monad.xyz/developers/hackathons/metropolis)
- [Application portal](https://hackathon.monad.xyz/)

The video will be attached later. Hosted Qwen/contract settings, judge access and the live wallet rehearsal still need completion. The entry has not been submitted. See the [submission checklist](#submission-guide) and [ready-to-paste entry](#submission-guide).

## Limits to know

This is a testnet prototype, not audited payment infrastructure. Only the supplied TGT token is supported. Deadlines are advisory after funding; if arbitration is unavailable and the parties refuse a mutual split, funds can stay locked indefinitely.

Evidence declarations do not prove physical delivery. Scanned PDFs need OCR. Sandbox role switching is not multi-user authorization. Do not expose the raw worker without the trusted authentication boundary.

[Contract review](#contract-review) · [Verification record](#verification-record)


---

## Detailed guides

Expand a guide below. All project documentation is kept in this README.

<a id="local-setup-guide"></a>

<details>
<summary><strong>Local setup guide</strong></summary>

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

Open http://127.0.0.1:5173/ in MetaMask’s browser or a desktop browser with the MetaMask extension. Choose **Sign in with MetaMask** and sign the login message. Use a regular browser with a wallet extension for the Monad segment. The in-app browser supports the sandbox but may have no wallet provider.

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

API scripts create synthetic local records. They verify extraction, approvals, funding, evidence upload/download, disputes, exact 90/10 allocations, both withdrawals, persistence, stale-version rejection and access boundaries. The worker script uses localhost-only identity fixtures to check cross-owner denial. These are not production ingress or live-wallet tests. See [verification record](#verification-record).

</details>

<a id="sandbox-demo-guide"></a>

<details>
<summary><strong>Sandbox demo guide</strong></summary>

## Complete sandbox demo

1. **New trade → Use sample text → Extract terms**. Check the actual provider label and compare every field with the source. The sample-trade shortcut skips Qwen.
2. Save the 100-bag maize order: NGN 42,000 per bag, NGN 4,200,000 invoice, separate 2,500 TGT demonstration settlement.
3. Approve as buyer and supplier. Switch to buyer and fund demo escrow.
4. As supplier, record **90 bags**, describe the shortage, and attach a synthetic delivery receipt.
5. As buyer, inspect **Delivery evidence**, download the receipt, then raise a dispute.
6. As arbitrator, allocate **90%** to supplier with written reasoning: supplier 2,250 TGT, buyer 250 TGT.
7. Withdraw as buyer and supplier. Check zero remaining demo escrow, export the record, refresh and verify persistence.


For wallet transactions, follow the [Monad guide](#monad-wallet-guide). Sandbox roles and balances are simulations.

</details>

<a id="monad-wallet-guide"></a>

<details>
<summary><strong>Monad wallet guide</strong></summary>

## Monad deployment

| Setting | Value |
| --- | --- |
| Network / chain | Monad Testnet / 10143 |
| Gas currency | Testnet MON |
| TGT | `0xfcc80262fccc19b3a833e2453e52316a0edf5f3b` |
| Escrow | `0x27ba251f396277a9af8ca7cf2cde4a279582f83a` |
| Escrow owner | `0x70D98e179e3Ce71FdE8Ed784fA79C542D5bDEB11` |
| TGT decimals | 6 |

Explorer: [TGT](https://testnet.monadscan.com/address/0xfcc80262fccc19b3a833e2453e52316a0edf5f3b), [escrow](https://testnet.monadscan.com/address/0x27ba251f396277a9af8ca7cf2cde4a279582f83a).

```powershell
node scripts/verify-testnet.mjs
```

This checks the deployment without signing or sending transactions. **Reuse the deployed contracts for every trade.** Restarts and UI changes do not require deployment. Solidity changes to this non-upgradeable contract, or a network reset, may require new addresses.

### Fund a test wallet

Create a dedicated test account in an Ethereum-compatible wallet. Add Monad Testnet from the [official faucet](https://faucet.monad.xyz/) or use chain 10143 and RPC `https://testnet-rpc.monad.xyz`. Request testnet MON by public address and follow the faucet's current requirements.

```powershell
node scripts/check-testnet.mjs 0xYOUR_PUBLIC_ADDRESS
```

A nonzero balance does not guarantee sufficient deployment gas. Share public addresses only. Keep private keys and recovery phrases local.

### Deploy a new instance only when necessary

Skip this for the deployed instance above. Compile first:

```powershell
node scripts/compile-contracts.mjs
```

Run this block in your own PowerShell window. The helper uses local private-key signing, not browser-wallet confirmation. Enter the dedicated account's private key, never a recovery phrase.

```powershell
$tradeGuardKey = Read-Host 'Enter your TEST wallet private key locally' -AsSecureString
$tradeGuardKeyPtr = [IntPtr]::Zero
try {
    $tradeGuardKeyPtr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($tradeGuardKey)
    $env:DEPLOYER_PRIVATE_KEY = (
        [Runtime.InteropServices.Marshal]::PtrToStringBSTR($tradeGuardKeyPtr)
    ).Trim()
    if ($env:DEPLOYER_PRIVATE_KEY.StartsWith('0X')) {
        $env:DEPLOYER_PRIVATE_KEY = '0x' + $env:DEPLOYER_PRIVATE_KEY.Substring(2)
    }
    elseif (-not $env:DEPLOYER_PRIVATE_KEY.StartsWith('0x')) {
        $env:DEPLOYER_PRIVATE_KEY = '0x' + $env:DEPLOYER_PRIVATE_KEY
    }
    if ($env:DEPLOYER_PRIVATE_KEY -cnotmatch '^0x[0-9a-fA-F]{64}$') {
        throw 'Invalid key format: expected 64 hexadecimal characters.'
    }
    $env:CONFIRM_TESTNET = 'yes'
    $env:MONAD_CHAIN_ID = '10143'
    $env:MONAD_RPC_URL = 'https://testnet-rpc.monad.xyz'
    node scripts/deploy-testnet.mjs
    if ($LASTEXITCODE -ne 0) {
        throw 'Deployment failed. Check transaction history before retrying.'
    }
}
finally {
    Remove-Item Env:DEPLOYER_PRIVATE_KEY -ErrorAction SilentlyContinue
    Remove-Item Env:CONFIRM_TESTNET -ErrorAction SilentlyContinue
    Remove-Item Env:MONAD_CHAIN_ID -ErrorAction SilentlyContinue
    Remove-Item Env:MONAD_RPC_URL -ErrorAction SilentlyContinue
    if ($tradeGuardKeyPtr -ne [IntPtr]::Zero) {
        [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($tradeGuardKeyPtr)
    }
    if ($null -ne $tradeGuardKey) { $tradeGuardKey.Dispose() }
}
```

Save the printed `TOKEN_ADDRESS` and **`ESCROW_ADDRESS`** (including the initial E). Update `.env`, restart, and verify. Hosted values must be configured separately. The deployer becomes owner; each trade names its own arbitrator.

The helper deploys both contracts on every invocation. If the second fails, inspect transaction history and recover the first contract address before retrying. Do not repeatedly redeploy blindly.


## Complete three-wallet Monad demo

Prepare distinct buyer, supplier and arbitrator accounts. Each needs testnet MON for signing. Choose **Monad testnet** in the sidebar. Every time you switch wallet accounts, reconnect in the app and **Load** the same trade ID.

### Get buyer TGT

The UI currently has no faucet button. Select Buyer and Monad Testnet in your wallet, connect on the local app, open the browser developer Console and run:

```javascript
const tgChain = await window.ethereum.request({method: 'eth_chainId'});
if (Number(tgChain) !== 10143) throw new Error('Switch to Monad Testnet.');
const [tgBuyer] = await window.ethereum.request({method: 'eth_requestAccounts'});
await window.ethereum.request({
  method: 'eth_sendTransaction',
  params: [{
    from: tgBuyer,
    to: '0xfcc80262fccc19b3a833e2453e52316a0edf5f3b',
    data: '0xde5f72fd',
    value: '0x0'
  }]
});
```

Review and confirm in your wallet. This calls `faucet()` and mints 10,000 no-value TGT. For another deployment, replace the token address. Import TGT in the wallet using its address, symbol TGT and six decimals.

### Create, settle and withdraw

| Step | Wallet | Action |
| --- | --- | --- |
| 1 | Buyer | Enter supplier and arbitrator addresses, 2,500 TGT, future delivery deadline and complete terms. **Review & create trade**, retain downloaded terms JSON, **Continue in wallet**, confirm. Save the resulting trade ID. |
| 2 | Supplier | Review the terms JSON and hash, reconnect/load, **Accept terms hash**. Status: Accepted. |
| 3 | Buyer | **Approve exact TGT allowance**, wait, then **Fund escrow**. Status: Funded. |
| 4 | Supplier | Enter 90/100-bag delivery text, **Submit evidence commitment**, retain downloaded preimage. Status: Delivered. |
| 5 | Buyer | Enter shortage reason, **Dispute delivery**. Status: Disputed. |
| 6 | Arbitrator | Enter reasoning, set **Supplier allocation (TGT)** to **2250**, **Resolve dispute**. Status: Settled. |
| 7 | Supplier | Reconnect/load, **Withdraw to connected wallet**: 2,250 TGT. |
| 8 | Buyer | Reconnect/load and withdraw 250 TGT. Both credits become zero. |

Each action opens an app confirmation and wallet signature request. Wait for successful receipts and keep transaction hashes/explorer links for the submission. The UI checks chain, token and decimals and simulates calls before signing.

Share the downloaded salted terms commitment with the supplier before acceptance. Evidence text/preimages remain off-chain; their commitments are on-chain. Testnet documents are not automatically attached to sandbox R2 records.

</details>

<a id="video-guide"></a>

<details>
<summary><strong>Video guide</strong></summary>

Target length: approximately 3 minutes. Adjust to the official submission form once confirmed.

## 0:00 — The problem

"TradeGuard helps buyers and suppliers turn a written agreement into a clear delivery and payment record. Our example is a 100-bag maize order. The hard part is what happens when only 90 bags arrive."

## 0:20 — Singapore Qwen extraction

Open New trade, paste the synthetic sample, and select Extract terms. Wait for the real Qwen provider label.

"Singapore Qwen Plus extracts the parties, goods, delivery conditions and settlement terms. Every suggestion is reviewed against the original text. AI does not sign transactions or decide disputes."

Show quantity 100, invoice price 42,000 NGN per bag and separate settlement of 2,500 no-value TGT. Save the reviewed terms.

## 0:55 — Agreement and funding

Approve as buyer and supplier, then fund as buyer.

"Both participants accept the same fixed terms. This screen is our private sandbox; role switching and these balances are simulated. The separate Monad workspace uses wallet-enforced contract permissions."

## 1:15 — Short delivery

Record 90 bags as supplier with a synthetic delivery receipt. Open the evidence tab and show the ten-bag discrepancy. Raise a dispute as buyer.

"The evidence comparison flags the shortage. It checks the declaration against the agreement; it cannot verify the physical goods. Opening a dispute blocks ordinary release."

## 1:45 — Human resolution and withdrawal

Resolve as arbitrator at 90 percent to supplier, with a written reason. Show 2,250 TGT supplier and 250 TGT buyer. Withdraw each allocation and refresh.

"The named arbitrator allocates the split. Each participant withdraws their own credit. The record retains the evidence, decision and action history."

## 2:15 — Monad escrow proof (record only after live wallet rehearsal)

Show Monad testnet chain 10143, deployed escrow and TGT addresses, a successful settlement receipt, both withdrawal receipts and resulting balances. Use distinct buyer, supplier and arbitrator wallets. Never substitute local EVM results or sandbox activity for deployed transactions.

"The contract holds test tokens and enforces participant permissions. Settlement creates pull-withdrawal credits. Documents remain off-chain; only commitments and transactions are public."

Contracts are deployed and read-only checks passed. No trade has yet been created on the deployed escrow (next trade ID 1 on 2026-10-02). Until the wallet rehearsal is complete, show the contract addresses and describe the remaining verification; do not imply settlement or withdrawal receipts exist.

## 2:45 — Close

"TradeGuard combines reviewed AI extraction, delivery evidence and accountable escrow. It is a prototype using no-value test tokens. Deadlines are advisory; unavailable arbitration and refusal of mutual settlement can leave funds locked."

## Recording status

No video has been recorded. Browser verification and screenshots worked on 2026-10-02. The three-wallet testnet rehearsal, hosted configuration and judge access remain before recording the full submission demo. This narration is not a recording.

</details>

<a id="submission-guide"></a>

<details>
<summary><strong>Submission guide</strong></summary>

Use https://hackathon.monad.xyz/. The portal offers GitHub, Google and Discord sign-in. Each provider is a separate account, so return with the provider you used to register.

The portal currently shows **1 September–13 October**. Confirm the exact cutoff time/timezone and eligibility rules in your account. The official overview asks for a working product with a public project profile: a demo, short write-up and code link. It lists judging on 14–27 October and winners on 3 November.

Sources: [application portal](https://hackathon.monad.xyz/) checked 3 October 2026; [official overview](https://monad.xyz/developers/hackathons/metropolis) read 2 October 2026.

## 1. Prepare the demo

The contracts are deployed, and the local application has passed its documented tests. Before the final entry:

- Configure hosted Qwen and the token/escrow addresses, apply the environment through deployment and test the hosted flow.
- Arrange judge access. The current app link is owner-only.
- Run the buyer/supplier/arbitrator wallet flow and save the real settlement/withdrawal receipt links.
- Attach the video when it is ready. Check the platform's required format and duration.

Follow the [sandbox guide](#sandbox-demo-guide), [Monad wallet guide](#monad-wallet-guide) and [recording script](#video-guide). Label the sandbox as simulated and the wallet segment as testnet. Screenshots can support the write-up, but they do not replace transaction receipts or a required video.

## 2. Fill the project profile

Use the project description, team and links in the Metropolis section above.

- Project: **TradeGuard**.
- Team: **DevClans**.
- Member: **Ibrahim Rabiu — Developer**.
- Suggested track: **Consumer Products & Payments**. Select the closest option offered in the form.
- Repository: https://github.com/Alhibb/metropolis_tradeguard.
- App: https://devclans-tradeguard.alhibb.chatgpt.site/ after access/configuration checks.
- Video: the team will attach it later.
- TGT: https://testnet.monadscan.com/address/0xfcc80262fccc19b3a833e2453e52316a0edf5f3b.
- Escrow: https://testnet.monadscan.com/address/0x27ba251f396277a9af8ca7cf2cde4a279582f83a.

The exact authenticated form fields have not been inspected. Supply contact details, team invitations and any other required fields directly in the portal. Review sponsor-specific criteria if entering a bounty.

## 3. Explain the work

The official FAQ permits existing projects when the submitted work is new within the six-week window. Judges must be able to verify that work. Link the relevant commits and distinguish new work from the inherited project. Open source is encouraged, not required by the overview.

Keep the technical explanation concrete: reviewed terms, the 100/90-bag shortage, the 2250/250 split and separate withdrawals. Qwen is an extraction tool, not an arbitrator.

## 4. Review and submit

Check the code, app and video links from an intended judge account. Confirm the app uses the hosted provider and deployed addresses. Include actual transaction proofs after the wallet rehearsal. Read the final rules and declarations before accepting them.

When all required fields are complete, submit before the platform cutoff. Save the project-profile URL and confirmation. The repository and documents are ready for this step; no entry has been submitted yet.

</details>

<a id="contract-review"></a>

<details>
<summary><strong>Contract review</strong></summary>

This is a source review of `TradeGuardEscrow.sol` and `DemoToken.sol`, not an independent security audit. The current notes describe the implemented contract. Local EVM tests last passed on 2 October 2026.

## What the contract enforces

| Rule | Implementation |
| --- | --- |
| Fixed terms before funding | Buyer creates the trade; supplier accepts its hash. There is no terms mutator. Funding requires Accepted state. |
| Distinct participants | Buyer, supplier and arbitrator must be different nonzero addresses. |
| One settlement token | The token address is immutable. Funding checks that the escrow received exactly the requested amount. |
| Delivery authority | Only the supplier submits delivery; only the buyer approves ordinary delivery. |
| Dispute authority | Either party can dispute a funded or delivered trade. Only the named arbitrator can resolve a disputed trade. |
| Mutual agreement | One party proposes a specific supplier amount; both must approve that same amount before settlement. |
| Bounded allocation | Supplier allocation cannot exceed the deposit. Buyer receives the remainder. |
| One settlement | Settlement sets the terminal state. Further funding, delivery or allocation attempts reject it. |
| Own-credit withdrawal | The caller withdraws only their own credit. Credit is cleared before the token transfer. |
| Selective pause | Creation, acceptance, funding, delivery and ordinary approval pause. Disputes, resolution, mutual agreement and withdrawals remain available. |
| Administration | Owner can pause/unpause, cannot sweep deposits, and cannot renounce ownership. |

## Accounting

Funding increases liabilities by the deposit. Settlement moves that amount from liabilities into buyer/supplier credits; their sum equals the deposit. Withdrawal reduces credits before transferring tokens. A failed token transfer reverts the operation.

For the supported token, escrow balance must cover `liabilities + creditsTotal`. Unsolicited transfers can create surplus without creating a participant credit. Local tests exercise generated splits across multiple orders.

## Changes made after the first review

Two issues in the earlier snapshot were addressed:

- Opening a dispute now clears outstanding mutual proposals. The old offer cannot be accepted after the dispute begins.
- Ownership renunciation now reverts, preventing the owner from pausing and then permanently giving up the ability to unpause.

The tests check both changes. Ownership transfer to an unusable address still requires operational care.

## Risks that remain

### Arbitration can stall

The seven-day response target is informational. If the arbitrator is unavailable and either party refuses a mutual settlement, the contract has no forced refund or payout. Funds can stay locked indefinitely. A production fallback needs an agreed policy and further review.

### Deadlines do not release funds

Funding rejects an elapsed delivery deadline. After funding, delivery/review timestamps provide context; they do not automatically change rights or trigger payment. The contract accepts late delivery submissions and permits disputes before the deadline.

### The token assumption matters

These checks assume the supplied six-decimal TGT token, which uses standard ERC20 transfers. The constructor accepts any address containing code. Fee-changing, rebasing, malicious or upgradeable tokens may break economic assumptions even when calls succeed. The app checks token linkage and decimals; those checks are not a general token audit.

TGT's unrestricted faucet is intentional. The token has no economic value and is unsuitable for production settlement.

### Commitments are not proof of delivery

A salted terms or evidence hash records a commitment. It does not establish that the document is true, that goods arrived, or that the counterparty reviewed the downloaded preimage. Those remain application and human-review responsibilities.

## Test coverage and gaps

Seven local EVM tests cover role permissions, repeated payment rejection, arbitrator splits, exact mutual approvals, pause behavior, multi-order accounting, the 2500 → 2250/250 demo with both withdrawals, stale-consent clearing and blocked renunciation.

This is bounded scenario testing. It is not exhaustive stateful fuzzing, formal verification, a malicious-token suite or a production audit. A live three-wallet Monad rehearsal and independently commissioned security review remain separate work.

</details>

<a id="verification-record"></a>

<details>
<summary><strong>Verification record</strong></summary>

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

Read-only deployed checks passed again; next trade ID remained 1. The submission repository is now Alhibb/metropolis_tradeguard. Team details and the pending video are in the Metropolis section above. Documentation was revised for clarity and current behavior; this was an editorial/source review, not an audit or new model benchmark. Tests above retain their original 2 October date.

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

</details>


## Wallet sign-in

MetaMask requests account access and a Sign-In with Ethereum message. Login does not send a transaction, spend gas or grant a token allowance. The server verifies the exact message and signature, checks its origin and five-minute expiry, and consumes its nonce once. A random session token is stored in an HttpOnly, SameSite=Strict cookie (Secure on HTTPS); only its hash is stored in R2. Sessions last one day and Sign out revokes them.

Saved records belong to the authenticated wallet address. Signing in with a different address opens a different workspace. Previous ChatGPT-owned records are not automatically reassigned to wallets. The existing R2 binding stores authentication records under `auth/`; no extra API key, database migration or contract deployment is needed. This login supports standard externally owned MetaMask accounts. Smart-contract wallet signature verification is not included.

The earlier API verification scripts use the old local identity fixture and need wallet-session updates before rerunning. Their dated results above describe the previous authentication setup.

Wallet-auth verification on 5 October 2026 passed signed login, invalid message/signature rejection, concurrent nonce claim and replay rejection, forged-header denial, token tampering, protected POST denial after logout, and separate-wallet record isolation. `scripts/verify-wallet-auth.ts` runs against a localhost-only Worker on port 8788; it uses generated test accounts, creates synthetic records and sends no blockchain transactions. It retries once only for Wrangler’s explicit local-worker-restart response. A real MetaMask popup and hosted wallet sign-in still need an extension-browser check.

To update the existing Cloudflare Worker from PowerShell, stop any local preview first, then run:

```powershell
git pull --ff-only origin main
$env:CLOUDFLARE_D1_DATABASE_ID = 'dc63cd28-f4e1-4308-b202-0b09c9c4f4ad'
pnpm build
pnpm exec wrangler deploy --config dist/server/wrangler.json --keep-vars
```

Before deploying, confirm the generated configuration targets `metropolis-tradeguard`, DB `site-creator-d1` with that existing database ID, and R2 `site-creator-r2`. This reuses the existing storage and deployed Monad contracts.
