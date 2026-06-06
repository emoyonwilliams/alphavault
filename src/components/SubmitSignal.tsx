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
    targetPrice: '',
    category: 'DeFi',
    thesis: '',
    timeHorizon: '1month',
    signalType: 'Long',
    confidence: 3,
    xHandle: '',
  });

  const handleSubmit = async () => {
    if (!account) { setError('Connect your wallet first'); return; }
    if (!form.asset || !form.entryPrice || !form.targetPrice || !form.thesis) {
      setError('Please fill in all required fields');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const signal: Signal = {
        id: crypto.randomUUID(),
        walletAddress: account.address,
        ...form,
        timestamp: Date.now(),
        blobId: '',
        reactions: { watching: 0, faded: 0 },
      };
      const blobId = await uploadToWalrus(signal);
      signal.blobId = blobId;
      onSignalSubmitted(signal);
      setForm({
        asset: '',
        entryPrice: '',
        targetPrice: '',
        category: 'DeFi',
        thesis: '',
        timeHorizon: '1month',
        signalType: 'Long',
        confidence: 3,
        xHandle: '',
      });
    } catch {
      setError('Failed to submit signal. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="submit-signal">
      <h2>Post Alpha Signal</h2>

      <div className="form-row">
        <div className="form-group">
          <label>Asset / Token *</label>
          <input type="text" placeholder="BTC, ETH, SUI..." value={form.asset} onChange={(e) => setForm({ ...form, asset: e.target.value.toUpperCase() })} />
        </div>
        <div className="form-group">
          <label>Signal Type *</label>
          <select value={form.signalType} onChange={(e) => setForm({ ...form, signalType: e.target.value as Signal['signalType'] })}>
            <option value="Long">Long</option>
            <option value="Short">Short</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Entry Price (USD) *</label>
          <input type="text" placeholder="e.g. 104200" value={form.entryPrice} onChange={(e) => setForm({ ...form, entryPrice: e.target.value })} />
        </div>
        <div className="form-group">
          <label>Target Price (USD) *</label>
          <input type="text" placeholder="e.g. 150000" value={form.targetPrice} onChange={(e) => setForm({ ...form, targetPrice: e.target.value })} />
        </div>
      </div>

      <div className="form-row">
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
      </div>

      <div className="form-group">
        <label>X Handle (optional — builds your reputation)</label>
        <input type="text" placeholder="@yourhandle" value={form.xHandle} onChange={(e) => setForm({ ...form, xHandle: e.target.value })} />
      </div>

      <div className="form-group">
        <label>Confidence Level</label>
        <div className="confidence-selector">
          {[1, 2, 3, 4, 5].map((level) => (
            <button
              key={level}
              type="button"
              className={`confidence-btn ${form.confidence >= level ? 'filled' : ''}`}
              onClick={() => setForm({ ...form, confidence: level as Signal['confidence'] })}
            >
              ■
            </button>
          ))}
          <span className="confidence-label">
            {form.confidence === 1 ? 'LOW' : form.confidence === 2 ? 'MODERATE' : form.confidence === 3 ? 'MEDIUM' : form.confidence === 4 ? 'HIGH' : 'MAX CONVICTION'}
          </span>
        </div>
      </div>

      <div className="form-group">
        <label>Thesis *</label>
        <textarea
          placeholder="Why is this a good opportunity? What's the catalyst? What's your target timeline?"
          value={form.thesis}
          onChange={(e) => setForm({ ...form, thesis: e.target.value })}
          rows={4}
        />
      </div>

      {error && <p className="error">{error}</p>}

      <button onClick={handleSubmit} disabled={loading || !account} className="submit-btn">
        {loading ? 'STORING ON WALRUS...' : 'POST SIGNAL'}
      </button>

      {!account && <p className="connect-hint">Connect your wallet to post a signal</p>}
    </div>
  );
}