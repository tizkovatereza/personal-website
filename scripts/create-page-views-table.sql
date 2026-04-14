-- Create page_views table for analytics tracking
CREATE TABLE IF NOT EXISTS page_views (
  id SERIAL PRIMARY KEY,
  path VARCHAR(500) NOT NULL,
  referrer VARCHAR(500),
  user_agent TEXT,
  country VARCHAR(100),
  city VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on path for faster queries
CREATE INDEX IF NOT EXISTS idx_page_views_path ON page_views(path);

-- Create index on created_at for time-based queries
CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON page_views(created_at);
