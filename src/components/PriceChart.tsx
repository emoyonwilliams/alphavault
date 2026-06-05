import { useEffect, useRef } from 'react';

interface Props {
  asset: string;
}

const TRADINGVIEW_SYMBOLS: Record<string, string> = {
  BTC: 'BINANCE:BTCUSDT',
  ETH: 'BINANCE:ETHUSDT',
  SUI: 'BINANCE:SUIUSDT',
  SOL: 'BINANCE:SOLUSDT',
  BNB: 'BINANCE:BNBUSDT',
  AVAX: 'BINANCE:AVAXUSDT',
  DOT: 'BINANCE:DOTUSDT',
  LINK: 'BINANCE:LINKUSDT',
  ARB: 'BINANCE:ARБUSDT',
  OP: 'BINANCE:OPUSDT',
  MATIC: 'BINANCE:MATICUSDT',
  TIA: 'BINANCE:TIAUSDT',
  SEI: 'BINANCE:SEIUSDT',
  INJ: 'BINANCE:INJUSDT',
  JUP: 'BINANCE:JUPUSDT',
  WLD: 'BINANCE:WLDUSDT',
};

export function PriceChart({ asset }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const symbol = TRADINGVIEW_SYMBOLS[asset.toUpperCase()];

  useEffect(() => {
    if (!symbol || !containerRef.current) return;

    containerRef.current.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol,
      interval: 'D',
      timezone: 'Etc/UTC',
      theme: 'dark',
      style: '1',
      locale: 'en',
      backgroundColor: '#000000',
      gridColor: '#1f1f1f',
      hide_top_toolbar: false,
      hide_legend: false,
      save_image: false,
      calendar: false,
      hide_volume: false,
    });

    containerRef.current.appendChild(script);
  }, [symbol]);

  if (!symbol) return null;

  return (
    <div className="price-chart-container">
      <div
        className="tradingview-widget-container"
        ref={containerRef}
        style={{ height: '300px', width: '100%' }}
      />
    </div>
  );
}