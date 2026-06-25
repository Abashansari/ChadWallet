import { Token } from '../types';

function generateSparkline(trend: 'up' | 'down' | 'volatile', points = 20): number[] {
  const data: number[] = [];
  let value = 50 + Math.random() * 50;
  for (let i = 0; i < points; i++) {
    if (trend === 'up') {
      value += (Math.random() - 0.3) * 8;
    } else if (trend === 'down') {
      value += (Math.random() - 0.7) * 8;
    } else {
      value += (Math.random() - 0.5) * 15;
    }
    value = Math.max(10, Math.min(100, value));
    data.push(value);
  }
  return data;
}

export const mockTokens: Token[] = [
  {
    id: '1', name: 'Jotchua', symbol: 'JOTCHUA', price: 0.0042,
    change24h: 4.02, marketCap: 6500000, volume: 1200000, liquidity: 890000,
    holders: 12400, logoColor: '#F5A623', logoEmoji: '🐕',
    sparkline: generateSparkline('up'), category: 'trending',
  },
  {
    id: '2', name: 'Asteroid The Space Shuttle', symbol: 'ASTEROID', price: 0.0053,
    change24h: -6.95, marketCap: 5300000, volume: 980000, liquidity: 720000,
    holders: 8900, logoColor: '#6366F1', logoEmoji: '🚀',
    sparkline: generateSparkline('down'), category: 'trending',
  },
  {
    id: '3', name: "Wendy's Co", symbol: 'WEN', price: 0.000742,
    change24h: 25.68, marketCap: 742300, volume: 456000, liquidity: 320000,
    holders: 34000, logoColor: '#00B8D4', logoEmoji: '🐧',
    sparkline: generateSparkline('up'), category: 'trending',
  },
  {
    id: '4', name: 'AI Associated Institute', symbol: 'AIAIAI', price: 0.000273,
    change24h: 83.0, marketCap: 273700, volume: 189000, liquidity: 145000,
    holders: 5600, logoColor: '#1A1A2E', logoEmoji: '🤖',
    sparkline: generateSparkline('up'), category: 'trending',
  },
  {
    id: '5', name: 'GIGACHAD', symbol: 'GIGA', price: 0.0228,
    change24h: -2.95, marketCap: 22800000, volume: 3400000, liquidity: 2100000,
    holders: 67000, logoColor: '#8B5CF6', logoEmoji: '💪',
    sparkline: generateSparkline('down'), category: 'trending',
  },
  {
    id: '6', name: 'Starbase', symbol: 'STAR', price: 0.000242,
    change24h: 10.0, marketCap: 242200, volume: 98000, liquidity: 67000,
    holders: 3200, logoColor: '#14B8A6', logoEmoji: '⭐',
    sparkline: generateSparkline('up'), category: 'trending',
  },
  {
    id: '7', name: 'Kintara', symbol: 'KINS', price: 0.0114,
    change24h: -5.66, marketCap: 11400000, volume: 2300000, liquidity: 1500000,
    holders: 23000, logoColor: '#F97316', logoEmoji: '🟠',
    sparkline: generateSparkline('down'), category: 'trending',
  },
  {
    id: '8', name: 'dogwifhat', symbol: '$WIF', price: 1.489,
    change24h: -3.84, marketCap: 148900000, volume: 45000000, liquidity: 28000000,
    holders: 340000, logoColor: '#3B82F6', logoEmoji: '🐶',
    sparkline: generateSparkline('down'), category: 'trending',
  },
  {
    id: '9', name: 'c0mpute', symbol: 'ZERO', price: 0.0033,
    change24h: -7.69, marketCap: 3300000, volume: 890000, liquidity: 540000,
    holders: 7800, logoColor: '#EF4444', logoEmoji: '🔴',
    sparkline: generateSparkline('down'), category: 'trending',
  },
  {
    id: '10', name: 'Bonk', symbol: 'BONK', price: 0.00002834,
    change24h: 12.45, marketCap: 1890000000, volume: 234000000, liquidity: 89000000,
    holders: 890000, logoColor: '#F59E0B', logoEmoji: '🦴',
    sparkline: generateSparkline('up'), category: 'trending',
  },
  {
    id: '11', name: 'Popcat', symbol: 'POPCAT', price: 0.872,
    change24h: 8.34, marketCap: 856000000, volume: 67000000, liquidity: 34000000,
    holders: 234000, logoColor: '#EC4899', logoEmoji: '🐱',
    sparkline: generateSparkline('up'), category: 'trending',
  },
  {
    id: '12', name: 'Moo Deng', symbol: 'MOODENG', price: 0.234,
    change24h: -4.12, marketCap: 234000000, volume: 45000000, liquidity: 23000000,
    holders: 156000, logoColor: '#A78BFA', logoEmoji: '🦛',
    sparkline: generateSparkline('down'), category: 'new',
  },
  {
    id: '13', name: 'Peanut the Squirrel', symbol: 'PNUT', price: 0.0567,
    change24h: 34.21, marketCap: 56700000, volume: 23000000, liquidity: 12000000,
    holders: 89000, logoColor: '#D97706', logoEmoji: '🐿️',
    sparkline: generateSparkline('up'), category: 'new',
  },
  {
    id: '14', name: 'Goatseus Maximus', symbol: 'GOAT', price: 0.456,
    change24h: -1.23, marketCap: 456000000, volume: 78000000, liquidity: 45000000,
    holders: 278000, logoColor: '#059669', logoEmoji: '🐐',
    sparkline: generateSparkline('volatile'), category: 'new',
  },
  {
    id: '15', name: 'Fartcoin', symbol: 'FART', price: 0.891,
    change24h: 15.67, marketCap: 891000000, volume: 123000000, liquidity: 67000000,
    holders: 345000, logoColor: '#7C3AED', logoEmoji: '💨',
    sparkline: generateSparkline('up'), category: 'new',
  },
  {
    id: '16', name: 'ai16z', symbol: 'AI16Z', price: 1.234,
    change24h: 6.78, marketCap: 1234000000, volume: 178000000, liquidity: 89000000,
    holders: 567000, logoColor: '#2563EB', logoEmoji: '🧠',
    sparkline: generateSparkline('up'), category: 'graduated',
  },
  {
    id: '17', name: 'Jupiter Perps', symbol: 'JLP', price: 4.567,
    change24h: 2.34, marketCap: 4567000000, volume: 567000000, liquidity: 234000000,
    holders: 890000, logoColor: '#DC2626', logoEmoji: '🪐',
    sparkline: generateSparkline('up'), category: 'graduated',
  },
  {
    id: '18', name: 'Raydium', symbol: 'RAY', price: 5.678,
    change24h: -3.45, marketCap: 1567000000, volume: 234000000, liquidity: 123000000,
    holders: 456000, logoColor: '#4F46E5', logoEmoji: '☀️',
    sparkline: generateSparkline('down'), category: 'graduated',
  },
  {
    id: '19', name: 'Orca', symbol: 'ORCA', price: 3.456,
    change24h: 1.23, marketCap: 345600000, volume: 56000000, liquidity: 34000000,
    holders: 234000, logoColor: '#0EA5E9', logoEmoji: '🐋',
    sparkline: generateSparkline('up'), category: 'graduated',
  },
  {
    id: '20', name: 'Drift Protocol', symbol: 'DRIFT', price: 0.789,
    change24h: -8.90, marketCap: 78900000, volume: 23000000, liquidity: 12000000,
    holders: 67000, logoColor: '#7C3AED', logoEmoji: '🌊',
    sparkline: generateSparkline('down'), category: 'soon',
  },
  {
    id: '21', name: 'Nosana', symbol: 'NOS', price: 2.345,
    change24h: 5.67, marketCap: 234500000, volume: 34000000, liquidity: 23000000,
    holders: 89000, logoColor: '#10B981', logoEmoji: '🔮',
    sparkline: generateSparkline('up'), category: 'soon',
  },
  {
    id: '22', name: 'Tensor', symbol: 'TNSR', price: 0.567,
    change24h: -2.34, marketCap: 56700000, volume: 12000000, liquidity: 8900000,
    holders: 45000, logoColor: '#F43F5E', logoEmoji: '🎯',
    sparkline: generateSparkline('down'), category: 'soon',
  },
  {
    id: '23', name: 'Marinade', symbol: 'MNDE', price: 0.123,
    change24h: 3.45, marketCap: 12300000, volume: 3400000, liquidity: 2300000,
    holders: 23000, logoColor: '#F59E0B', logoEmoji: '🧪',
    sparkline: generateSparkline('up'), category: 'soon',
  },
  {
    id: '24', name: 'Bome', symbol: 'BOME', price: 0.00789,
    change24h: 45.67, marketCap: 789000000, volume: 234000000, liquidity: 123000000,
    holders: 567000, logoColor: '#8B5CF6', logoEmoji: '📖',
    sparkline: generateSparkline('up'), category: 'new',
  },
  {
    id: '25', name: 'Slerf', symbol: 'SLERF', price: 0.234,
    change24h: -12.34, marketCap: 23400000, volume: 8900000, liquidity: 5600000,
    holders: 45000, logoColor: '#EC4899', logoEmoji: '🦥',
    sparkline: generateSparkline('down'), category: 'new',
  },
  {
    id: '26', name: 'Wen New ATH', symbol: 'WATH', price: 0.00056,
    change24h: 123.45, marketCap: 560000, volume: 234000, liquidity: 120000,
    holders: 2300, logoColor: '#22D3EE', logoEmoji: '📈',
    sparkline: generateSparkline('up'), category: 'new',
  },
  {
    id: '27', name: 'SolChat', symbol: 'CHAT', price: 0.0089,
    change24h: 7.89, marketCap: 8900000, volume: 2300000, liquidity: 1200000,
    holders: 12000, logoColor: '#6366F1', logoEmoji: '💬',
    sparkline: generateSparkline('up'), category: 'soon',
  },
  {
    id: '28', name: 'Deez Nuts', symbol: 'DEEZ', price: 0.00123,
    change24h: -23.45, marketCap: 1230000, volume: 456000, liquidity: 234000,
    holders: 5600, logoColor: '#D97706', logoEmoji: '🥜',
    sparkline: generateSparkline('down'), category: 'trending',
  },
  {
    id: '29', name: 'Myro', symbol: 'MYRO', price: 0.0567,
    change24h: 8.90, marketCap: 56700000, volume: 12000000, liquidity: 7800000,
    holders: 34000, logoColor: '#14B8A6', logoEmoji: '🐕‍🦺',
    sparkline: generateSparkline('up'), category: 'trending',
  },
  {
    id: '30', name: 'Solama', symbol: 'SOLAMA', price: 0.00234,
    change24h: -5.67, marketCap: 2340000, volume: 890000, liquidity: 560000,
    holders: 8900, logoColor: '#F43F5E', logoEmoji: '🦙',
    sparkline: generateSparkline('down'), category: 'new',
  },
  {
    id: '31', name: 'Ponke', symbol: 'PONKE', price: 0.345,
    change24h: 18.23, marketCap: 345000000, volume: 67000000, liquidity: 34000000,
    holders: 123000, logoColor: '#A855F7', logoEmoji: '🐒',
    sparkline: generateSparkline('up'), category: 'graduated',
  },
  {
    id: '32', name: 'Zeus Network', symbol: 'ZEUS', price: 0.567,
    change24h: 3.21, marketCap: 56700000, volume: 12000000, liquidity: 8900000,
    holders: 34000, logoColor: '#FBBF24', logoEmoji: '⚡',
    sparkline: generateSparkline('up'), category: 'graduated',
  },
];

export function formatPrice(price: number): string {
  if (price >= 1000000000) return `$${(price / 1000000000).toFixed(1)}B`;
  if (price >= 1000000) return `$${(price / 1000000).toFixed(1)}M`;
  if (price >= 1000) return `$${(price / 1000).toFixed(1)}K`;
  if (price >= 1) return `$${price.toFixed(2)}`;
  if (price >= 0.01) return `$${price.toFixed(4)}`;
  return `$${price.toFixed(6)}`;
}

export function formatMarketCap(value: number): string {
  if (value >= 1000000000) return `$${(value / 1000000000).toFixed(1)}B`;
  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `$${(value / 1000).toFixed(1)}K`;
  return `$${value.toFixed(0)}`;
}

export function formatChange(change: number): string {
  const prefix = change >= 0 ? '▲' : '▼';
  const absChange = Math.abs(change);
  if (absChange >= 2) {
    return `${prefix} ${absChange.toFixed(2)}%`;
  }
  if (absChange >= 100) {
    return `${prefix} ${absChange.toFixed(0)}x`;
  }
  return `${prefix} ${absChange.toFixed(2)}%`;
}

export function generateChartData(points = 48): number[] {
  const data: number[] = [];
  let value = 50 + Math.random() * 50;
  for (let i = 0; i < points; i++) {
    value += (Math.random() - 0.48) * 8;
    value = Math.max(10, Math.min(100, value));
    data.push(value);
  }
  return data;
}
