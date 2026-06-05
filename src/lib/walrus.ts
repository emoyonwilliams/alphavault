import axios from 'axios';

const AGGREGATOR = 'https://aggregator.walrus-testnet.walrus.space';
const PUBLISHER = 'https://publisher.walrus-testnet.walrus.space';
const REGISTRY_BLOB_KEY = 'alphavault_registry_blob_id';

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

export async function updateRegistry(newBlobId: string): Promise<void> {
  // Load existing registry from Walrus or localStorage fallback
  let blobIds: string[] = [];

  const existingRegistryBlobId = localStorage.getItem(REGISTRY_BLOB_KEY);

  if (existingRegistryBlobId) {
    try {
      const registry = await fetchFromWalrus(existingRegistryBlobId);
      blobIds = Array.isArray(registry.blobIds) ? registry.blobIds : [];
    } catch {
      blobIds = [];
    }
  }

  // Add new blob ID
  if (!blobIds.includes(newBlobId)) {
    blobIds = [newBlobId, ...blobIds];
  }

  // Upload updated registry to Walrus
  const newRegistryBlobId = await uploadToWalrus({ blobIds, updatedAt: Date.now() });

  // Save new registry blob ID to localStorage
  localStorage.setItem(REGISTRY_BLOB_KEY, newRegistryBlobId);
}

export async function loadSignalsFromRegistry(): Promise<any[]> {
  const registryBlobId = localStorage.getItem(REGISTRY_BLOB_KEY);

  if (!registryBlobId) return [];

  try {
    const registry = await fetchFromWalrus(registryBlobId);
    const blobIds: string[] = Array.isArray(registry.blobIds) ? registry.blobIds : [];

    const signals = await Promise.all(
      blobIds.map(async (blobId) => {
        try {
          const signal = await fetchFromWalrus(blobId);
          return signal;
        } catch {
          return null;
        }
      })
    );

    return signals.filter(Boolean);
  } catch {
    return [];
  }
}

// Legacy support
export async function saveRegistry(blobIds: string[]): Promise<void> {
  localStorage.setItem('alphavault_registry', JSON.stringify(blobIds));
}

export function loadRegistry(): string[] {
  const existing = localStorage.getItem('alphavault_registry');
  return existing ? JSON.parse(existing) : [];
}