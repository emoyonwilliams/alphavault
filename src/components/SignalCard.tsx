import { useState, useEffect } from 'react';
import type { Signal } from '../types';
import { getLivePrice, getPriceDelta } from '../lib/prices';
import { PriceChart } from './PriceChart';
interface Props {
  signal: Signal;
}

const categoryColors: Record<Signal['category'], string> = {
  DeFi: '#00ff00',
  NFT: '#00ff00',
  Layer1: '#00ff00',
  Layer2: '#00ff00',
  Meme: '#00ff00',
  Presale: '#00ff00',
  Other: '#00ff00',
};

const timeHorizonLabels: Record<Signal['timeHorizon'], string> = {
  '1week': '1 WEEK',
  '1month': '1 MONTH',
  '3months': '3 MONTHS',
  '6months': '6 MONTHS',
  '1year+': '1 YEAR+',
};

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
  const delta = livePrice && !isNaN(entryNum)
    ? getPriceDelta(entryNum, livePrice)
    : null;

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

      <div className="signal-price-row">
        <div className="signal-entry">
          Entry: <strong>${signal.entryPrice}</strong>
        </div>
        <div className="signal-live-price">
          {priceLoading ? (
            <span className="price-loading">FETCHING...</span>
          ) : livePrice ? (
            <span className="price-now">
              NOW: <strong>${livePrice.toLocaleString()}</strong>
              {delta && (
                <span className={`price-delta ${delta.isUp ? 'up' : 'down'}`}>
                  {delta.isUp ? '+' : ''}{delta.percent}%
                </span>
              )}
            </span>
          ) : (
            <span className="price-unknown">PRICE N/A</span>
          )}
        </div>
      </div>

      <p className="signal-thesis">{signal.thesis}</p>
      <PriceChart asset={signal.asset} />
      <div className="signal-card-footer">
        <span className="signal-horizon">
          {timeHorizonLabels[signal.timeHorizon]}
        </span>
        <span className="signal-wallet">
          {signal.walletAddress.slice(0, 6)}...{signal.walletAddress.slice(-4)}
        </span>
        
          <a href={`https://aggregator.walrus-testnet.walrus.space/v1/blobs/${signal.blobId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="signal-blob-link"
        >
          VIEW ON WALRUS
        </a>
      </div>
    </div>
  );
}