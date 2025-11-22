// src/supabaseClient.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

const supabaseUrl = 'https://ptoztkoaqgjxbymkknja.supabase.co'   // ← PASTE YOUR PROJECT URL HERE
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0b3p0a29hcWdqeGJ5bWtrbmphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM3NDAzNzUsImV4cCI6MjA3OTMxNjM3NX0.ythvXu7GiHjwdLMFxpYCrCnNtWLdYWhYhAjeCw-udaM'  // ← PASTE YOUR ANON KEY HERE

export const supabase = createClient(supabaseUrl, supabaseAnonKey)