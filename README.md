# AlphaVault

> On-chain alpha. Permanent proof.

AlphaVault is a decentralized crypto signal board built on Sui and powered by Walrus storage. Traders and researchers post early alpha calls — presales, new protocols, undervalued gems — and every signal is stored permanently on Walrus. Nobody can delete it, nobody can fake the timestamp.

## The Problem

Early crypto opportunities get called in private Telegram groups and Discord servers. By the time they go public, it's too late. And anyone can screenshot a win while hiding their losses. There's no verifiable track record.

## The Solution

AlphaVault stores every signal as a blob on Walrus decentralized storage, timestamped permanently on Sui. Wallets build provable track records based on their calls. The archive is public, permanent, and uncensorable.

## Features

- Post alpha signals with asset, entry price, thesis, category, and time horizon
- Every signal stored as a Walrus blob on Sui testnet
- Connect Sui wallet via Slush/dApp Kit
- Persistent signal feed loaded from Walrus on every visit
- Direct link to verify each signal on Walrus aggregator

## Tech Stack

- React + TypeScript + Vite
- Walrus decentralized storage (testnet)
- Sui blockchain via Tatum RPC
- @mysten/dapp-kit for wallet connection
- Deployed on Vercel

## Live Demo

[https://alphavault-six.vercel.app](https://alphavault-six.vercel.app)

## Setup

```bash
git clone https://github.com/emoyonwilliams/alphavault.git
cd alphavault
npm install
```

Create a `.env` file:

```
VITE_TATUM_API_KEY=your_tatum_testnet_api_key
```

```bash
npm run dev
```

## Hackathon

Built for the Tatum x Build on Sui with Walrus Hackathon (May 23 - June 6, 2026).

Powered by Walrus + Sui + Tatum.