-- lib/supabase.sql

-- Schema for AYO.NG minimal production tables

-- videos: store video metadata
CREATE TABLE IF NOT EXISTS videos (
  id BIGSERIAL PRIMARY KEY,
  room_id BIGINT,
  user_id TEXT,
  url TEXT,
  title TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- rooms: live rooms (live12 grid rooms etc.)
CREATE TABLE IF NOT EXISTS rooms (
  id BIGSERIAL PRIMARY KEY,
  name TEXT,
  host_user_id TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- platform_earnings: records of earnings collected by platform
CREATE TABLE IF NOT EXISTS platform_earnings (
  id BIGSERIAL PRIMARY KEY,
  type TEXT NOT NULL,
  amount BIGINT NOT NULL,
  meta JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- wallet: user wallet balances
CREATE TABLE IF NOT EXISTS wallet (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  balance BIGINT DEFAULT 0,
  currency TEXT DEFAULT 'NGN',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- transactions: record gifts, cashouts, winnings etc.
CREATE TABLE IF NOT EXISTS transactions (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT,
  type TEXT,
  amount BIGINT,
  meta JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
