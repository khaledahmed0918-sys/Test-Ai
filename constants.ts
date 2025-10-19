
import type { User, Server, LogEntry, LeaderboardUser } from './types';

export const MOCK_SERVER_ID = '1001';

export const mockUser: User = {
  id: 'user001',
  username: 'Aether',
  discriminator: '1337',
  avatarUrl: 'https://picsum.photos/seed/user/100/100',
};

export const mockServers: Server[] = [
  { id: MOCK_SERVER_ID, name: 'Gemini Devs', iconUrl: 'https://picsum.photos/seed/server1/100/100', memberCount: 1245 },
  { id: '1002', name: 'React Enthusiasts', iconUrl: 'https://picsum.photos/seed/server2/100/100', memberCount: 876 },
  { id: '1003', name: 'Tailwind Gamers', iconUrl: 'https://picsum.photos/seed/server3/100/100', memberCount: 2301 },
];

export const mockLogs: LogEntry[] = [
    { id: 'log1', timestamp: '2023-10-27 10:00:00', user: 'Spambot#1234', action: 'Warn', details: 'Reason: Excessive spamming' },
    { id: 'log2', timestamp: '2023-10-27 10:05:00', user: 'RuleBreaker#5678', action: 'Mute', details: 'Duration: 10 minutes' },
    { id: 'log3', timestamp: '2023-10-27 10:15:00', user: 'TrollUser#9012', action: 'Kick', details: 'Reason: Inappropriate language' },
    { id: 'log4', timestamp: '2023-10-27 10:20:00', user: 'MaliciousBot#3456', action: 'Ban', details: 'Reason: Malicious activity' },
];

export const mockLeaderboard: LeaderboardUser[] = [
    { rank: 1, username: 'Pixel_Master', avatarUrl: 'https://picsum.photos/seed/lb1/40/40', level: 50, xp: 250000 },
    { rank: 2, username: 'Code_Wizard', avatarUrl: 'https://picsum.photos/seed/lb2/40/40', level: 48, xp: 235000 },
    { rank: 3, username: 'Synth_Wave', avatarUrl: 'https://picsum.photos/seed/lb3/40/40', level: 45, xp: 210000 },
    { rank: 4, username: 'Data_Dynamo', avatarUrl: 'https://picsum.photos/seed/lb4/40/40', level: 42, xp: 195000 },
    { rank: 5, username: 'Glitch_Gamer', avatarUrl: 'https://picsum.photos/seed/lb5/40/40', level: 40, xp: 180000 },
];
   