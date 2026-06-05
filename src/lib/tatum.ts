import axios from 'axios';

const TATUM_API_KEY = import.meta.env.VITE_TATUM_API_KEY;
const SUI_TESTNET_RPC = 'https://sui-testnet.gateway.tatum.io';

const headers = {
  'x-api-key': TATUM_API_KEY,
  'Content-Type': 'application/json',
};

async function rpcCall(method: string, params: any[] = []) {
  const response = await axios.post(
    SUI_TESTNET_RPC,
    {
      jsonrpc: '2.0',
      id: 1,
      method,
      params,
    },
    { headers }
  );
  return response.data.result;
}

export async function getLatestCheckpoint(): Promise<string> {
  return rpcCall('sui_getLatestCheckpointSequenceNumber');
}

export async function getTransactionsByAddress(address: string): Promise<any> {
  return rpcCall('suix_queryTransactionBlocks', [
    { filter: { FromAddress: address } },
    null,
    10,
    true,
  ]);
}

export async function getSuiBalance(address: string): Promise<any> {
  return rpcCall('suix_getBalance', [address, '0x2::sui::SUI']);
}

export async function getOwnedObjects(address: string): Promise<any> {
  return rpcCall('suix_getOwnedObjects', [address]);
}