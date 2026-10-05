import TradeGuard from './tradeguard';
import {walletUser} from '@/lib/tradeguard/wallet-auth';
export const dynamic='force-dynamic';
export default async function Page(){const user=await walletUser();return <TradeGuard signedIn={!!user} displayName={user?.displayName??'Your workspace'} />;}
