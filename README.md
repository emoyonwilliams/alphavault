# AlphaVault

> The on-chain reputation layer for crypto analysts.

## The Problem

Skilled crypto analysts make accurate calls every day but have no verifiable proof. Screenshots get faked, X posts get deleted, and real track records disappear. Reputation in crypto is built on vibes and follower count, not accuracy.

## The Solution

AlphaVault stores every signal permanently on Walrus decentralized storage, timestamped on Sui via Tatum RPC. Every call is immutable from the moment of posting. Nobody can delete it. Nobody can fake when it was made.

## What It Does

- Post alpha signals with asset, entry price, target price, thesis, confidence level, and time horizon
- Every signal stored as a permanent Walrus blob on Sui testnet
- Signal registry lives on Walrus — fully decentralized, globally retrievable
- Live price feed shows current price vs entry with real-time delta
- TradingView chart embedded per signal for technical analysis
- Sui testnet block number pulled live via Tatum RPC on every page load
- Wallet-based identity via Slush — no email, no password, no platform lock-in
- Landing page with full product vision, how it works, tech stack, and FAQ
- Cypherpunk terminal aesthetic — monospace, high contrast, zero ornamentation

## Tech Stack

- React + TypeScript + Vite
- Walrus testnet decentralized storage
- Sui blockchain via Tatum RPC endpoints
- @mysten/dapp-kit for wallet connection
- TradingView embedded chart widget
- CoinGecko free API for live price feeds
- React Router for landing page and app routing
- Deployed on Vercel

## Live Demo

https://alphavault-six.vercel.app

## Architecture

Every signal is uploaded to Walrus as a JSON blob via the publisher API. The blob ID is then added to a registry blob — also stored on Walrus — which serves as the decentralized index of all signals. On every app load, the registry blob is fetched from Walrus and each signal is loaded individually. This makes the feed fully decentralized with no central database.

## Setup

git clone https://github.com/emoyonwilliams/alphavault.git
cd alphavault
npm install

Create a .env file:

VITE_TATUM_API_KEY=your_tatum_testnet_api_key

npm run dev

## Hackathon

Built for the Tatum x Build on Sui with Walrus Hackathon (May 23 - June 6, 2026).

Powered by Walrus + Sui + Tatum.
