// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ivvuxnafxhnvrkwlywvf.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2dnV4bmFmeGhudnJrd2x5d3ZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE3ODI4NzEsImV4cCI6MjA1NzM1ODg3MX0.x9c8cX60TmJP8Z3_WflqIJdiRyJ65gYAtKwusFEFM8U";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);