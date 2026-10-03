# Monad testnet wallet guide

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

