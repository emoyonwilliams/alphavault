const COINGECKO_IDS: Record<string, string> = {
    BTC: 'bitcoin',
    ETH: 'ethereum',
    SUI: 'sui',
    SOL: 'solana',
    BNB: 'binancecoin',
    AVAX: 'avalanche-2',
    DOT: 'polkadot',
    LINK: 'chainlink',
    ARB: 'arbitrum',
    OP: 'optimism',
    MATIC: 'matic-network',
    TIA: 'celestia',
    SEI: 'sei-network',
    INJ: 'injective-protocol',
    JUP: 'jupiter-exchange-solana',
    WLD: 'worldcoin-wld',
  };
  
  export async function getLivePrice(asset: string): Promise<number | null> {
    const id = COINGECKO_IDS[asset.toUpperCase()];
    if (!id) return null;
  
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`
      );
      const data = await response.json();
      return data[id]?.usd ?? null;
    } catch {
      return null;
    }
  }
  
  export function getPriceDelta(entryPrice: number, currentPrice: number): {
    delta: number;
    percent: string;
    isUp: boolean;
  } {
    const delta = currentPrice - entryPrice;
    const percent = ((delta / entryPrice) * 100).toFixed(1);
    return {
      delta,
      percent,
      isUp: delta >= 0,
    };
  }