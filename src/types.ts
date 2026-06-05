export interface Signal {
    id: string;
    walletAddress: string;
    asset: string;
    entryPrice: string;
    category: 'DeFi' | 'NFT' | 'Layer1' | 'Layer2' | 'Meme' | 'Presale' | 'Other';
    thesis: string;
    timeHorizon: '1week' | '1month' | '3months' | '6months' | '1year+';
    timestamp: number;
    blobId: string;
  }
  
  export interface SignalFormData {
    asset: string;
    entryPrice: string;
    category: Signal['category'];
    thesis: string;
    timeHorizon: Signal['timeHorizon'];
  }