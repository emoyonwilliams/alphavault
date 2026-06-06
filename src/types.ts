export interface Signal {
    id: string;
    walletAddress: string;
    asset: string;
    entryPrice: string;
    targetPrice: string;
    category: 'DeFi' | 'NFT' | 'Layer1' | 'Layer2' | 'Meme' | 'Presale' | 'Other';
    thesis: string;
    timeHorizon: '1week' | '1month' | '3months' | '6months' | '1year+';
    signalType: 'Long' | 'Short';
    confidence: 1 | 2 | 3 | 4 | 5;
    xHandle: string;
    timestamp: number;
    blobId: string;
    reactions?: {
      watching: number;
      faded: number;
    };
  }
  
  export interface SignalFormData {
    asset: string;
    entryPrice: string;
    targetPrice: string;
    category: Signal['category'];
    thesis: string;
    timeHorizon: Signal['timeHorizon'];
    signalType: Signal['signalType'];
    confidence: Signal['confidence'];
    xHandle: string;
  }
  
  export interface CallerProfile {
    walletAddress: string;
    xHandle: string;
    signalCount: number;
    points: number;
    badge: 'ROOKIE' | 'CALLER' | 'ORACLE' | 'CONTRARIAN' | 'DEGEN';
    winRate: number;
  }