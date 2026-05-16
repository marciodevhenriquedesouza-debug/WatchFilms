import { createClient } from
  'https://esm.sh/@supabase/supabase-js@2'

const URL  = 'https://gktaiquolezaovnoqtej.supabase.co'
const KEY  = 'sb_publishable_e7URN_SVvEpf5wBz4mTepA_np89TXoH'

export const supabase = createClient(URL, KEY)