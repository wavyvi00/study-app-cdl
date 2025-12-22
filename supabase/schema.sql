-- CDL Study App Database Schema
-- Run this in Supabase SQL Editor (https://supabase.com -> Your Project -> SQL Editor)

-- Create questions table
CREATE TABLE IF NOT EXISTS questions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    topic_id TEXT NOT NULL,
    text TEXT NOT NULL,
    options JSONB NOT NULL,
    correct_index INTEGER NOT NULL CHECK (correct_index >= 0 AND correct_index <= 3),
    explanation TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster topic queries
CREATE INDEX IF NOT EXISTS idx_questions_topic ON questions(topic_id);

-- Enable Row Level Security (RLS)
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;

-- Allow public read access (anon key can read)
CREATE POLICY "Allow public read access" ON questions
    FOR SELECT USING (true);

-- Only authenticated users can insert/update/delete (you'll use service key or dashboard)
-- For admin access via dashboard, these aren't needed as dashboard bypasses RLS

-- Sample data (one question to verify setup)
INSERT INTO questions (topic_id, text, options, correct_index, explanation) VALUES
('general_knowledge', 'What is the most important reason for doing a pre-trip inspection?', 
 '["To make sure nothing has been stolen", "Safety for yourself and other road users", "Because other drivers do it", "To make sure vehicle will reach destination"]'::jsonb,
 1, 'Safety is the most important reason - for yourself and other road users.');

-- Verify the table was created
SELECT * FROM questions LIMIT 1;

-- Email Subscribers Table Documentation
CREATE TABLE IF NOT EXISTS public.email_subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- RLS: Enable security
alter table public.email_subscribers enable row level security;

-- RLS: Allow anyone to insert (subscribe)
create policy "anon_can_insert_email"
on public.email_subscribers
for insert
to anon
with check (true);

-- RLS: Block anyone from reading (prevent list scraping)
create policy "block_anon_select"
on public.email_subscribers
for select
to anon
using (false);

