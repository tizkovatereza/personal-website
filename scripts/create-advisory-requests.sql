CREATE TABLE IF NOT EXISTS advisory_requests (
  id UUID PRIMARY KEY,
  challenge_nonce UUID NOT NULL UNIQUE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT NOT NULL DEFAULT '',
  message TEXT NOT NULL,
  availability TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS advisory_rate_limits (
  fingerprint TEXT NOT NULL,
  bucket TIMESTAMPTZ NOT NULL,
  attempts INTEGER NOT NULL DEFAULT 1,
  PRIMARY KEY (fingerprint, bucket)
);
