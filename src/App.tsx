import { useState, useEffect } from 'react';
import { createNetworkConfig, SuiClientProvider, WalletProvider } from '@mysten/dapp-kit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@mysten/dapp-kit/dist/index.css';
import { WalletConnect } from './components/WalletConnect';
import { SignalFeed } from './components/SignalFeed';
import { SubmitSignal } from './components/SubmitSignal';
import { loadSignalsFromRegistry, updateRegistry } from './lib/walrus';
import { getLatestCheckpoint } from './lib/tatum';
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
  const [checkpoint, setCheckpoint] = useState<string>('');

  useEffect(() => {
    async function init() {
      setLoading(true);
      try {
        const [loadedSignals, cp] = await Promise.all([
          loadSignalsFromRegistry(),
          getLatestCheckpoint(),
        ]);
        setSignals(loadedSignals);
        setCheckpoint(cp);
      } catch {
        // silent fail
      } finally {
        setLoading(false);
      }
    }
    init();
  }, []);

  const handleSignalSubmitted = async (signal: Signal) => {
    setSignals((prev) => [signal, ...prev]);
    await updateRegistry(signal.blobId);
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

      {checkpoint && (
        <div className="chain-status">
          <span className="chain-dot" />
          <span>Sui Testnet — Block <strong>#{checkpoint}</strong> via Tatum</span>
        </div>
      )}

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