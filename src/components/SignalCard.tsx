import { useState, useEffect } from 'react';
import type { Signal } from '../types';
import { getLivePrice, getPriceDelta } from '../lib/prices';
import { PriceChart } from './PriceChart';

interface Props {
  signal: Signal;
}

const timeHorizonLabels: Record<Signal['timeHorizon'], string> = {
  '1week': '1 WEEK',
  '1month': '1 MONTH',
  '3months': '3 MONTHS',
  '6months': '6 MONTHS',
  '1year+': '1 YEAR+',
};

function ConfidenceDisplay({ level }: { level: number }) {
  return (
    <span className="confidence-display">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} style={{ color: i <= level ? 'var(--color-accent)' : 'var(--color-border)' }}>
          ■
        </span>
      ))}
    </span>
  );
}

export function SignalCard({ signal }: Props) {
  const [livePrice, setLivePrice] = useState<number | null>(null);
  const [priceLoading, setPriceLoading] = useState(true);

  useEffect(() => {
    async function fetchPrice() {
      setPriceLoading(true);
      const price = await getLivePrice(signal.asset);
      setLivePrice(price);
      setPriceLoading(false);
    }
    fetchPrice();
  }, [signal.asset]);

  const date = new Date(signal.timestamp).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const entryNum = parseFloat(signal.entryPrice);
  const targetNum = parseFloat(signal.targetPrice);
  const delta = livePrice && !isNaN(entryNum) ? getPriceDelta(entryNum, livePrice) : null;
  const toTarget = livePrice && !isNaN(targetNum) ? getPriceDelta(livePrice, targetNum) : null;
  const xUrl = signal.xHandle ? signal.xHandle.replace('@', '') : '';

  return (
    <div className="signal-card">
      <div className="signal-card-header">
        <div className="signal-asset-info">
          <span className="signal-asset">{signal.asset}</span>
          <span className={signal.signalType === 'Short' ? 'signal-type short' : 'signal-type long'}>
            {signal.signalType || 'LONG'}
          </span>
          <span className="signal-category">{signal.category}</span>
        </div>
        <div className="signal-header-right">
          {signal.xHandle && (
            <a href={'https://x.com/' + xUrl} target="_blank" rel="noopener noreferrer" className="signal-x-handle">
              {signal.xHandle.startsWith('@') ? signal.xHandle : '@' + signal.xHandle}
            </a>
          )}
          <span className="signal-date">{date}</span>
        </div>
      </div>
      <div className="signal-price-grid">
        <div className="price-box">
          <span className="price-label">ENTRY</span>
          <span className="price-value">${signal.entryPrice}</span>
        </div>
        <div className="price-box">
          <span className="price-label">TARGET</span>
          <span className="price-value target">${signal.targetPrice}</span>
          {toTarget && (
            <span className={toTarget.isUp ? 'price-to-target up' : 'price-to-target down'}>
              {toTarget.isUp ? '+' : ''}{toTarget.percent}% to go
            </span>
          )}
        </div>
        <div className="price-box">
          <span className="price-label">NOW</span>
          {priceLoading ? (
            <span className="price-loading">...</span>
          ) : livePrice ? (
            <span>
              <span className="price-value">${livePrice.toLocaleString()}</span>
              {delta && (
                <span className={delta.isUp ? 'price-delta up' : 'price-delta down'}>
                  {delta.isUp ? '+' : ''}{delta.percent}%
                </span>
              )}
            </span>
          ) : (
            <span className="price-unknown">N/A</span>
          )}
        </div>
      </div>

      <p className="signal-thesis">{signal.thesis}</p>

      <PriceChart asset={signal.asset} />

      <div className="signal-card-footer">
        <span className="signal-horizon">{timeHorizonLabels[signal.timeHorizon]}</span>
        <ConfidenceDisplay level={signal.confidence || 3} />
        <span className="signal-wallet">
          {signal.walletAddress.slice(0, 6)}...{signal.walletAddress.slice(-4)}
        </span>
        <a href={'https://aggregator.walrus-testnet.walrus.space/v1/blobs/' + signal.blobId} target="_blank" rel="noopener noreferrer" className="signal-blob-link">
          VIEW ON WALRUS
        </a>
      </div>
    </div>
  );
}