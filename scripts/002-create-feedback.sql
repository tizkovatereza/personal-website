-- Create table for "Write me something" feedback messages
CREATE TABLE IF NOT EXISTS website_feedback (
  id SERIAL PRIMARY KEY,
  message TEXT NOT NULL,
  contact VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
