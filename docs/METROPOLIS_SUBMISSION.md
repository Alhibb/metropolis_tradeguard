# Submit TradeGuard to Metropolis

Use https://hackathon.monad.xyz/. The portal offers GitHub, Google and Discord sign-in. Each provider is a separate account, so return with the provider you used to register.

The portal currently shows **1 September–13 October**. Confirm the exact cutoff time/timezone and eligibility rules in your account. The official overview asks for a working product with a public project profile: a demo, short write-up and code link. It lists judging on 14–27 October and winners on 3 November.

Sources: [application portal](https://hackathon.monad.xyz/) checked 3 October 2026; [official overview](https://monad.xyz/developers/hackathons/metropolis) read 2 October 2026.

## 1. Prepare the demo

The contracts are deployed, and the local application has passed its documented tests. Before the final entry:

- Configure hosted Qwen and the token/escrow addresses, apply the environment through deployment and test the hosted flow.
- Arrange judge access. The current app link is owner-only.
- Run the buyer/supplier/arbitrator wallet flow and save the real settlement/withdrawal receipt links.
- Attach the video when it is ready. Check the platform's required format and duration.

Follow the [sandbox guide](DEMO_GUIDE.md), [Monad wallet guide](MONAD_GUIDE.md) and [recording script](DEMO_NARRATION.md). Label the sandbox as simulated and the wallet segment as testnet. Screenshots can support the write-up, but they do not replace transaction receipts or a required video.

## 2. Fill the project profile

Use [SUBMISSION_ENTRY.md](SUBMISSION_ENTRY.md) for the project text and links.

- Project: **TradeGuard**.
- Team: **DevClans**.
- Members: **Ibrahim Rabiu — Developer**; **Mardiyya Sulaiman — UI Developer**.
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
