import { supabase } from './supabaseClient';

export async function saveToSupabase(url: string, summary: string) {
  const { data, error } = await supabase
    .from('summaries')
    .insert([{ url, summary }]);

  if (error) {
    console.error('Supabase insert error:', error);
    return { success: false, error };
  }

  return { success: true, data };
}