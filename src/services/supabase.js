import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://akhtlsfihlxdevxbarym.supabase.co";
const anonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFraHRsc2ZpaGx4ZGV2eGJhcnltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc4MTY4NTIsImV4cCI6MjA0MzM5Mjg1Mn0.JrrE0HTP7Ci2VP3PUQHRJ8pM5xeQ_ECyDNSgl_nvTXw";

const supabase = createClient(supabaseUrl, anonKey);

export default supabase;
