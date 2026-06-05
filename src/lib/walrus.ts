import axios from 'axios';

const AGGREGATOR = 'https://aggregator.walrus-testnet.walrus.space';
const PUBLISHER = 'https://publisher.walrus-testnet.walrus.space';
const REGISTRY_KEY = 'alphavault_registry';

export async function uploadToWalrus(data: object): Promise<string> {
  const json = JSON.stringify(data);
  const blob = new Blob([json], { type: 'application/json' });

  const response = await axios.put(
    `${PUBLISHER}/v1/blobs?epochs=5`,
    blob,
    { headers: { 'Content-Type': 'application/json' } }
  );

  const result = response.data;

  if (result.newlyCreated) {
    return result.newlyCreated.blobObject.blobId;
  } else if (result.alreadyCertified) {
    return result.alreadyCertified.blobId;
  }

  throw new Error('Failed to get blob ID from Walrus');
}

export async function fetchFromWalrus(blobId: string): Promise<any> {
  const response = await axios.get(`${AGGREGATOR}/v1/blobs/${blobId}`);
  return response.data;
}

export function getWalrusUrl(blobId: string): string {
  return `${AGGREGATOR}/v1/blobs/${blobId}`;
}

export async function saveRegistry(blobIds: string[]): Promise<void> {
  const existing = localStorage.getItem(REGISTRY_KEY);
  const current: string[] = existing ? JSON.parse(existing) : [];
  const updated = [...new Set([...blobIds, ...current])];
  localStorage.setItem(REGISTRY_KEY, JSON.stringify(updated));
}

export function loadRegistry(): string[] {
  const existing = localStorage.getItem(REGISTRY_KEY);
  return existing ? JSON.parse(existing) : [];
}