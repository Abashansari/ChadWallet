import { PortfolioHolding, Activity } from '../types';
import { mockTokens } from './tokens';

export const mockHoldings: PortfolioHolding[] = [
  {
    token: mockTokens[7], // $WIF
    quantity: 850,
    avgBuyPrice: 1.12,
    currentValue: 850 * mockTokens[7].price,
    gainLoss: 850 * (mockTokens[7].price - 1.12),
    gainLossPercent: ((mockTokens[7].price - 1.12) / 1.12) * 100,
  },
  {
    token: mockTokens[9], // BONK
    quantity: 45000000,
    avgBuyPrice: 0.00001890,
    currentValue: 45000000 * mockTokens[9].price,
    gainLoss: 45000000 * (mockTokens[9].price - 0.00001890),
    gainLossPercent: ((mockTokens[9].price - 0.00001890) / 0.00001890) * 100,
  },
  {
    token: mockTokens[10], // POPCAT
    quantity: 1200,
    avgBuyPrice: 0.45,
    currentValue: 1200 * mockTokens[10].price,
    gainLoss: 1200 * (mockTokens[10].price - 0.45),
    gainLossPercent: ((mockTokens[10].price - 0.45) / 0.45) * 100,
  },
  {
    token: mockTokens[4], // GIGA
    quantity: 5000,
    avgBuyPrice: 0.019,
    currentValue: 5000 * mockTokens[4].price,
    gainLoss: 5000 * (mockTokens[4].price - 0.019),
    gainLossPercent: ((mockTokens[4].price - 0.019) / 0.019) * 100,
  },
  {
    token: mockTokens[15], // AI16Z
    quantity: 320,
    avgBuyPrice: 0.89,
    currentValue: 320 * mockTokens[15].price,
    gainLoss: 320 * (mockTokens[15].price - 0.89),
    gainLossPercent: ((mockTokens[15].price - 0.89) / 0.89) * 100,
  },
  {
    token: mockTokens[14], // FART
    quantity: 2500,
    avgBuyPrice: 0.56,
    currentValue: 2500 * mockTokens[14].price,
    gainLoss: 2500 * (mockTokens[14].price - 0.56),
    gainLossPercent: ((mockTokens[14].price - 0.56) / 0.56) * 100,
  },
];

export const portfolioValue = mockHoldings.reduce((sum, h) => sum + h.currentValue, 0);
export const todayPL = portfolioValue * 0.034;
export const weeklyPL = portfolioValue * 0.089;
export const monthlyPL = portfolioValue * 0.156;

export const mockActivities: Activity[] = [
  { id: '1', type: 'trade', description: 'Bought 500 $WIF', amount: '+500 WIF', timestamp: '2 min ago', status: 'completed' },
  { id: '2', type: 'trade', description: 'Sold 1M BONK', amount: '-1,000,000 BONK', timestamp: '15 min ago', status: 'completed' },
  { id: '3', type: 'deposit', description: 'Deposited SOL', amount: '+5.2 SOL', timestamp: '1 hr ago', status: 'completed' },
  { id: '4', type: 'trade', description: 'Swapped POPCAT → GIGA', amount: '200 POPCAT', timestamp: '3 hrs ago', status: 'completed' },
  { id: '5', type: 'withdrawal', description: 'Withdrew USDC', amount: '-250 USDC', timestamp: '5 hrs ago', status: 'completed' },
  { id: '6', type: 'trade', description: 'Bought 100 AI16Z', amount: '+100 AI16Z', timestamp: '8 hrs ago', status: 'completed' },
  { id: '7', type: 'deposit', description: 'Deposited USDC', amount: '+1,000 USDC', timestamp: '1 day ago', status: 'completed' },
  { id: '8', type: 'trade', description: 'Sold 5000 FART', amount: '-5,000 FART', timestamp: '1 day ago', status: 'completed' },
  { id: '9', type: 'trade', description: 'Bought 300 PONKE', amount: '+300 PONKE', timestamp: '2 days ago', status: 'completed' },
  { id: '10', type: 'withdrawal', description: 'Withdrew ETH', amount: '-0.5 ETH', timestamp: '3 days ago', status: 'pending' },
];
