import { useState, useEffect } from 'react';
import { createNetworkConfig, SuiClientProvider, WalletProvider } from '@mysten/dapp-kit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@mysten/dapp-kit/dist/index.css';
import { WalletConnect } from './components/WalletConnect';
import { SignalFeed } from './components/SignalFeed';
import { SubmitSignal } from './components/SubmitSignal';
import { fetchFromWalrus, saveRegistry, loadRegistry } from './lib/walrus';
import type { Signal } from './types';
import './App.css';

const { networkConfig } = createNetworkConfig({
  testnet: { url: 'https://sui-testnet.gateway.tatum.io' },
} as any);

const queryClient = new QueryClient();

function AlphaVault() {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [activeTab, setActiveTab] = useState<'feed' | 'submit'>('feed');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSignals() {
      setLoading(true);
      try {
        const blobIds = loadRegistry();
        const loaded: Signal[] = [];
        for (const blobId of blobIds) {
          try {
            const signal = await fetchFromWalrus(blobId);
            loaded.push(signal);
          } catch {
            // skip corrupted blobs
          }
        }
        setSignals(loaded);
      } catch {
        // registry empty
      } finally {
        setLoading(false);
      }
    }
    loadSignals();
  }, []);

  const handleSignalSubmitted = async (signal: Signal) => {
    setSignals((prev) => [signal, ...prev]);
    await saveRegistry([signal.blobId]);
    setActiveTab('feed');
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-left">
          <h1 className="logo">AlphaVault</h1>
          <span className="tagline">On-chain alpha. Permanent proof.</span>
        </div>
        <WalletConnect />
      </header>
      <nav className="app-nav">
        <button
          className={`nav-btn ${activeTab === 'feed' ? 'active' : ''}`}
          onClick={() => setActiveTab('feed')}
        >
          Signal Feed
        </button>
        <button
          className={`nav-btn ${activeTab === 'submit' ? 'active' : ''}`}
          onClick={() => setActiveTab('submit')}
        >
          Post Signal
        </button>
      </nav>
      <main className="app-main">
        {activeTab === 'feed' ? (
          <SignalFeed signals={signals} loading={loading} />
        ) : (
          <SubmitSignal onSignalSubmitted={handleSignalSubmitted} />
        )}
      </main>
      <footer className="app-footer">
        <p>Powered by Walrus + Sui + Tatum</p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networkConfig} defaultNetwork="testnet">
        <WalletProvider>
          <AlphaVault />
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
}