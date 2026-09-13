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
  user_id TEXT NOT NULL UNIQUE,
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

-- RPC function to increment wallet atomically
CREATE OR REPLACE FUNCTION increment_wallet(p_user_id TEXT, p_amount INTEGER)
RETURNS BIGINT AS $$
DECLARE
  new_balance BIGINT;
BEGIN
  LOOP
    -- Try to update existing wallet row
    UPDATE wallet
    SET balance = balance + p_amount,
        updated_at = now()
    WHERE user_id = p_user_id
    RETURNING balance INTO new_balance;

    IF FOUND THEN
      RETURN new_balance;
    END IF;

    -- If no row existed, insert it
    BEGIN
      INSERT INTO wallet(user_id, balance, updated_at)
      VALUES (p_user_id, p_amount, now())
      RETURNING balance INTO new_balance;
      RETURN new_balance;
    EXCEPTION WHEN unique_violation THEN
      -- If a concurrent insert happened, loop and try update again
      CONTINUE;
    END;
  END LOOP;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
