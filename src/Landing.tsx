import { useNavigate } from 'react-router-dom';

export function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing">

      <header className="landing-header">
        <span className="landing-logo">ALPHAVAULT</span>
        <button className="landing-enter-btn" onClick={() => navigate('/app')}>
          ENTER APP →
        </button>
      </header>

      {/* HERO */}
      <section className="landing-hero">
        <div className="landing-hero-tag">// PROOF OF ALPHA ON-CHAIN</div>
        <h1 className="landing-headline">
          Your calls are only as good as your proof.
        </h1>
        <p className="landing-subtext">
          Every signal posted on AlphaVault is stored permanently on Walrus decentralized storage, timestamped on Sui. Nobody can delete it. Nobody can fake when it was made. Your track record belongs to you.
        </p>
        <button className="landing-cta" onClick={() => navigate('/app')}>
          POST YOUR FIRST SIGNAL
        </button>
        <div className="landing-powered">
          POWERED BY WALRUS + SUI + TATUM
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="landing-manifesto">
        <p>
          The best analysts in crypto have no proof. The worst ones have the loudest voices. Reputation is gamed, track records are faked, and skill goes unrecognized while noise wins. AlphaVault changes the equation. If you called it, prove it. If you proved it, own it.
        </p>
      </section>

      {/* PROBLEM */}
      <section className="landing-section">
        <div className="landing-section-tag">// THE PROBLEM</div>
        <h2 className="landing-section-title">Alpha is everywhere. Proof is nowhere.</h2>
        <div className="landing-grid">
          <div className="landing-grid-item">
            <span className="grid-number">01</span>
            <h3>Skilled analysts go unrecognized</h3>
            <p>Accurate calls are made on CT every day. Without verifiable proof, track records live and die on screenshots anyone can fake.</p>
          </div>
          <div className="landing-grid-item">
            <span className="grid-number">02</span>
            <h3>Good calls disappear forever</h3>
            <p>X posts get deleted. Telegram groups get nuked. Discord servers go offline. The most accurate calls in crypto history are gone.</p>
          </div>
          <div className="landing-grid-item">
            <span className="grid-number">03</span>
            <h3>Trust has no infrastructure</h3>
            <p>There is no on-chain way to verify who has real alpha. Credibility is based on follower count and vibes — not accuracy.</p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="landing-section">
        <div className="landing-section-tag">// HOW IT WORKS</div>
        <h2 className="landing-section-title">Three steps. Permanent record.</h2>
        <div className="landing-steps">
          <div className="landing-step">
            <span className="step-num">01</span>
            <div className="step-connector" />
            <h3>Connect your Sui wallet</h3>
            <p>Your wallet is your identity. No email, no password, no platform lock-in. You own your data.</p>
          </div>
          <div className="landing-step">
            <span className="step-num">02</span>
            <div className="step-connector" />
            <h3>Post a signal</h3>
            <p>Asset, entry price, target, thesis, confidence level. Stored on Walrus the moment you submit. Immutable from that point forward.</p>
          </div>
          <div className="landing-step">
            <span className="step-num">03</span>
            <div className="step-connector" />
            <h3>Build your record</h3>
            <p>Every call is timestamped on Sui via Tatum RPC. Your accuracy compounds into a reputation score nobody can dispute.</p>
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section className="landing-section">
        <div className="landing-section-tag">// THE SOLUTION</div>
        <h2 className="landing-section-title">Permanent. Verifiable. On-chain.</h2>
        <div className="landing-solution-grid">
          <div className="landing-solution-item">
            <span className="solution-icon">■</span>
            <div>
              <h3>Immutable signal storage</h3>
              <p>Every signal is a Walrus blob. The entry price, target, thesis, and timestamp are locked permanently. No edits, no deletions, ever.</p>
            </div>
          </div>
          <div className="landing-solution-item">
            <span className="solution-icon">■</span>
            <div>
              <h3>Live price tracking</h3>
              <p>Each signal shows live current price vs entry price. The market is the judge. Your accuracy is visible to everyone in real time.</p>
            </div>
          </div>
          <div className="landing-solution-item">
            <span className="solution-icon">■</span>
            <div>
              <h3>Reputation leaderboard</h3>
              <p>Top callers earn points based on accuracy, consistency, and boldness. Your on-chain score is your professional credential.</p>
            </div>
          </div>
          <div className="landing-solution-item">
            <span className="solution-icon">■</span>
            <div>
              <h3>Decentralized feed</h3>
              <p>The signal registry lives on Walrus. No central server, no admin, no platform risk. AlphaVault cannot censor your calls.</p>
            </div>
          </div>
        </div>
      </section>

      {/* VISION */}
      <section className="landing-section">
        <div className="landing-section-tag">// THE VISION</div>
        <h2 className="landing-section-title">Proof of work for analysts.</h2>
        <p className="landing-vision-text">
          AlphaVault is building the infrastructure layer for crypto credibility. A world where skill is measurable, track records are immutable, and the best analysts are discoverable on-chain. Your AlphaVault profile is your proof of work — built call by call, stored permanently, owned entirely by you.
        </p>
        <div className="landing-stats">
          <div className="landing-stat">
            <span className="stat-value">WALRUS</span>
            <span className="stat-label">Permanent blob storage</span>
          </div>
          <div className="landing-stat">
            <span className="stat-value">SUI</span>
            <span className="stat-label">Immutable timestamps</span>
          </div>
          <div className="landing-stat">
            <span className="stat-value">TATUM</span>
            <span className="stat-label">Enterprise-grade RPC</span>
          </div>
          <div className="landing-stat">
            <span className="stat-value">0%</span>
            <span className="stat-label">Fake track records</span>
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section className="landing-section">
        <div className="landing-section-tag">// TECH STACK</div>
        <h2 className="landing-section-title">Built on infrastructure that lasts.</h2>
        <div className="landing-tech">
          <div className="tech-item">
            <span className="tech-name">WALRUS</span>
            <p>Decentralized blob storage on Sui. Every signal is a permanent, content-addressed blob. The storage layer that makes immutability possible.</p>
          </div>
          <div className="tech-item">
            <span className="tech-name">SUI</span>
            <p>High-throughput L1 blockchain. Walrus lives natively on Sui. Every signal registry update is a Sui transaction — verifiable by anyone.</p>
          </div>
          <div className="tech-item">
            <span className="tech-name">TATUM</span>
            <p>Enterprise-grade Sui RPC nodes. AlphaVault queries live chain data via Tatum — block numbers, transaction history, wallet state.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="landing-section">
        <div className="landing-section-tag">// FAQ</div>
        <h2 className="landing-section-title">Questions.</h2>
        <div className="landing-faq">
          <div className="faq-item">
            <h3>Is this free to use?</h3>
            <p>Testnet is completely free. Mainnet will require a small WAL fee for Walrus storage — a few cents per signal. The leaderboard and feed are always free to read.</p>
          </div>
          <div className="faq-item">
            <h3>Can I delete or edit a signal after posting?</h3>
            <p>No. That is the point. Walrus storage is permanent. Your call stands forever — win or lose. That is what makes the track record trustworthy.</p>
          </div>
          <div className="faq-item">
            <h3>How is reputation calculated?</h3>
            <p>Points are awarded for posting signals, hitting targets, calling early before price moves, and consistency over time. The full formula is open source on GitHub.</p>
          </div>
          <div className="faq-item">
            <h3>Do I need a crypto wallet?</h3>
            <p>Yes. You need a Sui wallet — we recommend Slush. Your wallet address is your identity. No email, no password, no platform lock-in.</p>
          </div>
          <div className="faq-item">
            <h3>What assets can I post signals for?</h3>
            <p>Any asset with a ticker — BTC, ETH, SUI, SOL, or any token. AlphaVault runs on Sui but the signals can be for any market.</p>
          </div>
          <div className="faq-item">
            <h3>Is AlphaVault decentralized?</h3>
            <p>Yes. The signal registry lives on Walrus. There is no central database. Even if this frontend goes offline, every signal is still retrievable directly from Walrus by blob ID.</p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="landing-final-cta">
        <div className="landing-section-tag">// GET STARTED</div>
        <h2>Start building your on-chain track record today.</h2>
        <p>Testnet is live. Free to use. Your calls deserve permanent proof.</p>
        <button className="landing-cta" onClick={() => navigate('/app')}>
          ENTER ALPHAVAULT
        </button>
      </section>

      <footer className="landing-footer">
        <span>ALPHAVAULT — BUILT ON WALRUS + SUI + TATUM</span>
        <span>TESTNET BETA — 2026</span>
      </footer>

    </div>
  );
}