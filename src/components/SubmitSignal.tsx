import { useState } from 'react';
import { useCurrentAccount } from '@mysten/dapp-kit';
import { uploadToWalrus } from '../lib/walrus';
import type { Signal, SignalFormData } from '../types';

interface Props {
  onSignalSubmitted: (signal: Signal) => void;
}

export function SubmitSignal({ onSignalSubmitted }: Props) {
  const account = useCurrentAccount();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState<SignalFormData>({
    asset: '',
    entryPrice: '',
    category: 'DeFi',
    thesis: '',
    timeHorizon: '1month',
  });

  const handleSubmit = async () => {
    if (!account) { setError('Connect your wallet first'); return; }
    if (!form.asset || !form.entryPrice || !form.thesis) { setError('Please fill in all fields'); return; }
    setLoading(true);
    setError('');
    try {
      const signal: Signal = {
        id: crypto.randomUUID(),
        walletAddress: account.address,
        ...form,
        timestamp: Date.now(),
        blobId: '',
      };
      const blobId = await uploadToWalrus(signal);
      signal.blobId = blobId;
      onSignalSubmitted(signal);
      setForm({ asset: '', entryPrice: '', category: 'DeFi', thesis: '', timeHorizon: '1month' });
    } catch {
      setError('Failed to submit signal. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="submit-signal">
      <h2>Post Alpha Signal</h2>
      <div className="form-group">
        <label>Asset / Token</label>
        <input type="text" placeholder="e.g. SUI, LAB, BTC" value={form.asset} onChange={(e) => setForm({ ...form, asset: e.target.value })} />
      </div>
      <div className="form-group">
        <label>Entry Price (USD)</label>
        <input type="text" placeholder="e.g. 0.01" value={form.entryPrice} onChange={(e) => setForm({ ...form, entryPrice: e.target.value })} />
      </div>
      <div className="form-group">
        <label>Category</label>
        <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as Signal['category'] })}>
          <option value="DeFi">DeFi</option>
          <option value="NFT">NFT</option>
          <option value="Layer1">Layer 1</option>
          <option value="Layer2">Layer 2</option>
          <option value="Meme">Meme</option>
          <option value="Presale">Presale</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="form-group">
        <label>Time Horizon</label>
        <select value={form.timeHorizon} onChange={(e) => setForm({ ...form, timeHorizon: e.target.value as Signal['timeHorizon'] })}>
          <option value="1week">1 Week</option>
          <option value="1month">1 Month</option>
          <option value="3months">3 Months</option>
          <option value="6months">6 Months</option>
          <option value="1year+">1 Year+</option>
        </select>
      </div>
      <div className="form-group">
        <label>Thesis</label>
        <textarea placeholder="Why is this a good opportunity? What's the catalyst?" value={form.thesis} onChange={(e) => setForm({ ...form, thesis: e.target.value })} rows={4} />
      </div>
      {error && <p className="error">{error}</p>}
      <button onClick={handleSubmit} disabled={loading || !account} className="submit-btn">
        {loading ? 'Storing on Walrus...' : 'Post Signal'}
      </button>
      {!account && <p className="connect-hint">Connect your wallet to post a signal</p>}
    </div>
  );
}