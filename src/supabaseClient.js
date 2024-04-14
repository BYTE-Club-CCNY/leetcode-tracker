import { createClient } from "@supabase/supabase-js";

const supabase = createClient('https://iflpjcsiyakzpglmgfuz.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlmbHBqY3NpeWFrenBnbG1nZnV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE5MDc2ODQsImV4cCI6MjAyNzQ4MzY4NH0.3qIDg-LMoAqzF-DDW35UMp8DIgG2XGkDkCNDj8dxROA')

export default supabase;