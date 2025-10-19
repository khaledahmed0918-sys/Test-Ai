
export interface User {
  id: string;
  username: string;
  discriminator: string;
  avatarUrl: string;
}

export interface Server {
  id: string;
  name: string;
  iconUrl: string;
  memberCount: number;
}

export interface LogEntry {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  details: string;
}

export interface LeaderboardUser {
    rank: number;
    username: string;
    avatarUrl: string;
    level: number;
    xp: number;
}
   