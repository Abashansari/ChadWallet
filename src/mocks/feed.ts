import { FeedPost } from '../types';

const cryptoUsers = [
  {
    username: 'Zghire',
    handle: '@Zghire_',
    verified: false,
    profileEmoji: '😎',
  },
  {
    username: 'Sheep',
    handle: '@imsheepsol',
    verified: true,
    profileEmoji: '🐑',
  },
  {
    username: '0xMarioNawfal',
    handle: '@RoundtableSpace',
    verified: true,
    profileEmoji: '👨‍🚀',
  },
  {
    username: 'Ansem',
    handle: '@blknoiz06',
    verified: true,
    profileEmoji: '🥷',
  },
  {
    username: 'Doge Whisperer',
    handle: '@dogewhisperer',
    verified: false,
    profileEmoji: '🐕',
  },
];

const mockContents = [
  "We had $DOGE in 2013\nWe had $BONK in 2022\nWe had $PEPE in 2023\nWe had $WIF in 2023\nWe had $PNUT in 2024\n\nWe will have $CHIC in 2026\nIt's time we run a different and unique animal... a chicken.",
  "EVEN the original dev said that he helped make it\n\nim not sure why only him is getting fees\n\n@slqntdev shouldnt you both get 50%?",
  "AN OLD ANDROID PHONE CAN REPLACE TWILIO AS AN OPEN SOURCE SMS GATEWAY",
  "The $SOL ecosystem is literally moving faster than any other chain right now. If you're fading Solana here, you're fading the entire bull run. #SolanaSummer",
  "Just loaded up more $BTC. We are hitting $100k before Q4, don't let the short-term noise distract you.",
  "What's the next 100x memecoin on base? $PEPE is established, looking for something under $10M mcap.",
];

export const generateMockPosts = (count = 50, category: 'foryou' | 'radar' | 'surge' | 'kols' = 'foryou'): FeedPost[] => {
  const posts: FeedPost[] = [];
  const baseDate = new Date();

  for (let i = 0; i < count; i++) {
    const user = cryptoUsers[Math.floor(Math.random() * cryptoUsers.length)];
    const content = mockContents[Math.floor(Math.random() * mockContents.length)];
    
    // Randomize timestamp within the last 24 hours
    const timestamp = new Date(baseDate.getTime() - Math.random() * 24 * 60 * 60 * 1000).toISOString();
    
    posts.push({
      id: `${category}-${i}-${Math.random().toString(36).substr(2, 9)}`,
      user: {
        ...user,
        email: `${user.username.toLowerCase()}@example.com`,
        walletAddress: '0x123...abc',
        joinDate: '2023-01-01',
        totalTrades: Math.floor(Math.random() * 500),
        portfolioValue: Math.floor(Math.random() * 100000),
      },
      content,
      timestamp,
      likes: Math.floor(Math.random() * 5000),
      reposts: Math.floor(Math.random() * 1000),
      comments: Math.floor(Math.random() * 500),
      views: Math.floor(Math.random() * 50000),
      category,
    });
  }

  // Sort by newest first
  return posts.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

export const initialFeeds = {
  foryou: generateMockPosts(50, 'foryou'),
  radar: generateMockPosts(50, 'radar'),
  surge: generateMockPosts(50, 'surge'),
  kols: generateMockPosts(50, 'kols'),
};
