      import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
      import { supabase } from "./supabase.js";

      // ── PEGA O ID DA URL ────────────────────────────────────────
      // quando vier de um card: filme.html?id=3
      const params = new URLSearchParams(location.search);
      const id = params.get("id");

      if (id) {
        // busca o filme no Supabase
        const { data: filme } = await supabase
          .from("filmes")
          .select("*")
          .eq("id", id)
          .single();

        if (filme) {
          // atualiza título
          document.getElementById("filmeTitulo").textContent = filme.titulo;
          document.title = `WatchFilms — ${filme.titulo}`;

          // atualiza poster
          if (filme.capa_url) {
            document.querySelector(".poster").innerHTML =
              `<img src="${filme.capa_url}" alt="${filme.titulo}">`;
          } 
         
          // atualiza trailer se tiver
          if (filme.trailer_url) {
            const tid = filme.trailer_url;
            document.getElementById("trailerFrame").src =
              `https://www.youtube.com/embed/${tid}?autoplay=1&mute=0&loop=1&playlist=${tid}&controls=0&rel=0&modestbranding=1`;
          }

          // atualiza sinopse
          if (filme.descricao) {
            document.querySelector(".desc-texto").textContent = filme.descricao;
          }

          // atualiza ficha
        
          if (filme.nota) {
            document.querySelector(".nota").innerHTML =
              `<svg viewBox="0 0 24 24" width="14" height="14" fill="#fbbf24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
           ${filme.nota}`;
          }
        }
      }

