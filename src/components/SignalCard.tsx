import type { Signal } from '../types';

interface Props {
  signal: Signal;
}

const categoryColors: Record<Signal['category'], string> = {
  DeFi: '#00d4aa',
  NFT: '#a855f7',
  Layer1: '#3b82f6',
  Layer2: '#06b6d4',
  Meme: '#f59e0b',
  Presale: '#ef4444',
  Other: '#6b7280',
};

const timeHorizonLabels: Record<Signal['timeHorizon'], string> = {
  '1week': '1 Week',
  '1month': '1 Month',
  '3months': '3 Months',
  '6months': '6 Months',
  '1year+': '1 Year+',
};

export function SignalCard({ signal }: Props) {
  const date = new Date(signal.timestamp).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="signal-card">
      <div className="signal-card-header">
        <div className="signal-asset-info">
          <span className="signal-asset">{signal.asset}</span>
          <span
            className="signal-category"
            style={{ backgroundColor: categoryColors[signal.category] }}
          >
            {signal.category}
          </span>
        </div>
        <span className="signal-date">{date}</span>
      </div>
      <div className="signal-entry">
        Entry: <strong>${signal.entryPrice}</strong>
      </div>
      <p className="signal-thesis">{signal.thesis}</p>
      <div className="signal-card-footer">
        <span className="signal-horizon">
          Hold: {timeHorizonLabels[signal.timeHorizon]}
        </span>
        <span className="signal-wallet">
          {signal.walletAddress.slice(0, 6)}...{signal.walletAddress.slice(-4)}
        </span>
      </div>
      
        <a href={`https://aggregator.walrus-testnet.walrus.space/v1/blobs/${signal.blobId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="signal-blob-link"
      >
        View on Walrus
      </a>
    </div>
  );
}