-- 1. Add Security Columns to Profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS is_pro BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS questions_answered_count INTEGER DEFAULT 0;

-- 2. Add 'is_free' column to Questions (to allow trial access)
ALTER TABLE public.questions
ADD COLUMN IF NOT EXISTS is_free BOOLEAN DEFAULT FALSE;

-- 3. Enable RLS on Questions (if not already enabled)
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;

-- 4. Create Policy: "Pro users see all, Free users see free questions"
-- Drop existing policy if it exists to avoid conflicts
DROP POLICY IF EXISTS "Access control for questions" ON public.questions;

CREATE POLICY "Access control for questions"
ON public.questions
FOR SELECT
USING (
  -- User is Pro
  (auth.uid() IN (SELECT id FROM profiles WHERE is_pro = TRUE))
  OR
  -- OR Question is Free
  (is_free = TRUE)
);

-- 5. Create Secure RPC for Incrementing Counter
CREATE OR REPLACE FUNCTION increment_questions_answered(count_inc INTEGER)
RETURNS VOID AS $$
BEGIN
  UPDATE public.profiles
  SET questions_answered_count = questions_answered_count + count_inc,
      updated_at = NOW()
  WHERE id = auth.uid();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
