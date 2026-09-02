import { createClient }
    from "https://esm.sh/@supabase/supabase-js";
/*
DB certo, mas não configurado ainda:
const supabase = createClient(
    "https://hqiirmiglybihqcdylat.supabase.co/",
    "sb_publishable_vLfCeaRqlrTEx4jCp3NDmA_pR-bEkcS"
);*/

// DB errado, mas semiconfigurado pra teste
const supabase = createClient(
    "https://qhzdcvcwcgvasarnvonu.supabase.co",
    "sb_publishable_CdHK73P-jNYM4jhCeY6o6A_5FRkfFmQ"
)

export default supabase;