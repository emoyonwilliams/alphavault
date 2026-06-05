import type { Signal } from '../types';
import { SignalCard } from './SignalCard';

interface Props {
  signals: Signal[];
  loading: boolean;
}

export function SignalFeed({ signals, loading }: Props) {
  if (loading) {
    return <div className="feed-loading"><p>Loading signals from Walrus...</p></div>;
  }
  if (signals.length === 0) {
    return <div className="feed-empty"><p>No signals yet. Be the first to post alpha.</p></div>;
  }
  return (
    <div className="signal-feed">
      {signals.map((signal) => (
        <SignalCard key={signal.id} signal={signal} />
      ))}
    </div>
  );
}