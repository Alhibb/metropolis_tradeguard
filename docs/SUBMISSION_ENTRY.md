# Metropolis entry

## Project

**Name:** TradeGuard  
**Team:** DevClans  
**Suggested track:** Consumer Products & Payments

| Member | Role |
| --- | --- |
| Ibrahim Rabiu | Developer |
| Mardiyya Sulaiman | UI Developer |

**Code:** https://github.com/Alhibb/metropolis_tradeguard  
**App:** https://devclans-tradeguard.alhibb.chatgpt.site/  
**Video:** To be attached by the team.

The app currently has owner-only access. Arrange judge access and verify hosted configuration before using that link as the working demo.

## Short description

TradeGuard connects trade agreements, delivery evidence and escrow settlement. Singapore Qwen extracts draft terms for people to review. Buyers and suppliers approve the agreement, and a named arbitrator resolves disputed deliveries. Monad testnet contracts enforce wallet roles and let participants withdraw their own settlement credits.

## Problem

When a shipment is incomplete, the agreement, receipt and payment decision often sit in different places. A buyer who ordered 100 bags and received 90 needs a record of the agreed quantity, what arrived and how the payment was adjusted.

## What TradeGuard does

TradeGuard extracts and reviews agreement terms, records delivery evidence and highlights quantity differences. Its sandbox demonstrates the whole process in a saved workspace. A separate Monad workspace handles wallet-signed acceptance, funding, evidence commitments, disputes, settlement and withdrawals.

The demo starts with 100 bags of maize and a separate 2500 TGT test settlement. Only 90 bags arrive. The arbitrator allocates 2250 TGT to the supplier and 250 TGT to the buyer. Each withdraws independently. The NGN invoice remains separate from the no-value TGT amount.

## Monad implementation

- Chain: Monad Testnet, 10143.
- TGT: 0xfcc80262fccc19b3a833e2453e52316a0edf5f3b.
- Escrow: 0x27ba251f396277a9af8ca7cf2cde4a279582f83a.
- Fixed terms commitments, distinct wallet roles, exact deposits, named arbitration, mutual settlement and pull withdrawals.
- Documents remain off-chain; commitments and transactions are public.

Both contracts are deployed. Read-only code, token-linkage and decimal checks passed on 3 October 2026. The live three-wallet trade has not yet been completed; transaction proof will be added after that rehearsal.

## AI implementation

The server calls Singapore Qwen Plus for structured extraction. It validates fields and checks returned source quotes. People still compare the suggestions with the original agreement. AI does not sign transactions, release tokens or decide disputes.

## Verification

On 2 October 2026, TypeScript, production build, 11 domain/extraction tests, 7 local EVM tests and the complete persisted API demo passed. The API flow includes evidence byte retrieval, exact 90/10 allocations, both withdrawals and access checks. Screenshots are in the repository.

These checks cover the local application and EVM scenarios. Hosted judge access and the wallet-signed Monad rehearsal remain separate checks.

## Limitations

TradeGuard is a testnet prototype and has not been independently audited. It supports no-value TGT only. Evidence does not prove physical delivery. Deadlines are advisory after funding; unavailable arbitration and refusal of a mutual split can leave funds locked.

## Build-window information

List the eligible work and its supporting commits in the platform's requested field. The submission repository preserves the existing project history. Existing code is not evidence that all work was completed during the hackathon; check the official rules and identify the new work accurately.
