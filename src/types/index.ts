export interface Token {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  marketCap: number;
  volume: number;
  liquidity: number;
  holders: number;
  logoColor: string;
  logoEmoji: string;
  sparkline: number[];
  category: 'trending' | 'new' | 'soon' | 'graduated';
}

export interface PortfolioHolding {
  token: Token;
  quantity: number;
  avgBuyPrice: number;
  currentValue: number;
  gainLoss: number;
  gainLossPercent: number;
}

export interface Trade {
  id: string;
  type: 'buy' | 'sell' | 'swap';
  tokenSymbol: string;
  tokenName: string;
  amount: number;
  price: number;
  total: number;
  timestamp: string;
  walletAddress: string;
}

export interface Activity {
  id: string;
  type: 'trade' | 'deposit' | 'withdrawal';
  description: string;
  amount: string;
  timestamp: string;
  status: 'completed' | 'pending' | 'failed';
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  gradient: [string, string];
  insights: ToolInsight[];
  score?: number;
  status?: string;
}

export interface ToolInsight {
  label: string;
  value: string;
  trend?: 'up' | 'down' | 'neutral';
}

export interface UserProfile {
  username: string;
  email: string;
  walletAddress: string;
  profileEmoji: string;
  joinDate: string;
  totalTrades: number;
  portfolioValue: number;
}

export type ThemeMode = 'dark' | 'light';

export interface ThemeColors {
  background: string;
  surface: string;
  surfaceElevated: string;
  primary: string;
  accent: string;
  positive: string;
  negative: string;
  gold: string;
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  border: string;
  card: string;
  tabBar: string;
  tabBarActive: string;
  tabBarInactive: string;
  overlay: string;
  inputBackground: string;
}

export type RootStackParamList = {
  Splash: undefined;
  MainTabs: undefined;
  TokenDetail: { token: Token };
};

export type TabParamList = {
  Home: undefined;
  Portfolio: undefined;
  Search: undefined;
  Profile: undefined;
};
