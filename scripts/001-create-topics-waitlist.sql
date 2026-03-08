-- Create topics waitlist table for email signups
CREATE TABLE IF NOT EXISTS topics_waitlist (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_topics_waitlist_email ON topics_waitlist(email);
