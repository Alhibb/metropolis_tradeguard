import {logout} from '@/lib/tradeguard/wallet-auth';
import {responseError} from '@/lib/tradeguard/server';
export async function POST(req:Request){try{return await logout(req)}catch(e){return responseError(e)}}
