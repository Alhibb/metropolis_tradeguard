import {challenge} from '@/lib/tradeguard/wallet-auth';
import {responseError} from '@/lib/tradeguard/server';
export async function POST(req:Request){try{return await challenge(req)}catch(e){return responseError(e)}}
