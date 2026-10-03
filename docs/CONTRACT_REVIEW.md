# TradeGuard contract review

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
