import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Database } from "./database";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL environment variable");
}

if (!supabaseAnonKey) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable");
}

const supabase: SupabaseClient<Database> = createClient(
  supabaseUrl,
  supabaseAnonKey
);

export default supabase;
