import { UserProfile, Trade } from '../types';

export const mockUser: UserProfile = {
  username: 'ChadTrader',
  email: 'chad@chadwallet.io',
  walletAddress: '7xKX...m8Dp',
  profileEmoji: '👤',
  joinDate: 'January 2024',
  totalTrades: 1247,
  portfolioValue: 24567.89,
};

export const fullWalletAddress = '7xKXp9n2QdRE4vB8wYmZcTfLa6hJ3sGqNP1kFu5m8Dp';

export const mockRecentTrades: Trade[] = [
  {
    id: '1', type: 'buy', tokenSymbol: 'WIF', tokenName: 'dogwifhat',
    amount: 500, price: 1.42, total: 710,
    timestamp: '2 min ago', walletAddress: '8Bx2...kL9p',
  },
  {
    id: '2', type: 'sell', tokenSymbol: 'BONK', tokenName: 'Bonk',
    amount: 5000000, price: 0.0000285, total: 142.5,
    timestamp: '5 min ago', walletAddress: '3Fm7...rQ4j',
  },
  {
    id: '3', type: 'buy', tokenSymbol: 'POPCAT', tokenName: 'Popcat',
    amount: 200, price: 0.86, total: 172,
    timestamp: '12 min ago', walletAddress: '9Kp4...tW2n',
  },
  {
    id: '4', type: 'sell', tokenSymbol: 'GIGA', tokenName: 'GIGACHAD',
    amount: 1000, price: 0.023, total: 23,
    timestamp: '18 min ago', walletAddress: '5Lm8...hY6s',
  },
  {
    id: '5', type: 'buy', tokenSymbol: 'FART', tokenName: 'Fartcoin',
    amount: 3000, price: 0.88, total: 2640,
    timestamp: '25 min ago', walletAddress: '2Rn3...fX8v',
  },
  {
    id: '6', type: 'buy', tokenSymbol: 'AI16Z', tokenName: 'ai16z',
    amount: 150, price: 1.21, total: 181.5,
    timestamp: '32 min ago', walletAddress: '6Jq9...bD1w',
  },
  {
    id: '7', type: 'sell', tokenSymbol: 'SLERF', tokenName: 'Slerf',
    amount: 800, price: 0.245, total: 196,
    timestamp: '45 min ago', walletAddress: '4Ht5...mP3k',
  },
  {
    id: '8', type: 'buy', tokenSymbol: 'PONKE', tokenName: 'Ponke',
    amount: 600, price: 0.34, total: 204,
    timestamp: '1 hr ago', walletAddress: '1Ys7...cN9j',
  },
];
