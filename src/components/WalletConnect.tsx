import { ConnectButton, useCurrentAccount } from '@mysten/dapp-kit';

export function WalletConnect() {
  const account = useCurrentAccount();

  return (
    <div className="wallet-connect">
      <ConnectButton />
      {account && (
        <span className="wallet-address">
          {account.address.slice(0, 6)}...{account.address.slice(-4)}
        </span>
      )}
    </div>
  );
}