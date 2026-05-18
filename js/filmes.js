import { supabase } from "./supabase.js";
import { renderNovidades, renderTop10 , renderGeneros } from './ui.js'

export async function carregarFilmes() {
  const { data, error } = await supabase
    .from("filmes")
    .select("*")
    .order("titulo");

  if (error) {
    console.error("Erro ao buscar filmes:", error);
    return [];
  }
  return data;
}


// Inicia tudo
const filmes = await carregarFilmes();
renderNovidades(filmes);
renderTop10(filmes);
renderGeneros(filmes);
