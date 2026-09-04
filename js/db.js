import { createClient }
    from "https://esm.sh/@supabase/supabase-js";

const supabase = createClient(
    "https://hqiirmiglybihqcdylat.supabase.co/",
    "sb_publishable_vLfCeaRqlrTEx4jCp3NDmA_pR-bEkcS"
);

export default supabase;