import { supabase } from './supabase.js'

// ERRO CORRIGIDO 1: função carregarFilmes() estava sendo chamada
// mas nunca foi definida neste arquivo! Estava só no supabase.js como getFilmes().
async function carregarFilmes() {
  const { data, error } = await supabase
    .from('filmes')
    .select('*')
    .order('titulo')

  if (error) {
    console.error('Erro ao buscar filmes:', error)
    return []
  }
  return data
}

function renderNovidades(filmes) {
  const section = document.getElementById('novidades')
  const lista = filmes.slice(0, 10)

  section.innerHTML = lista.map(f => `
    <div class="card-nov">
      ${f.capa_url
        ? `<img src="${f.capa_url}" alt="${f.titulo}" class="img-card">`
        : `<div style="display:flex;align-items:center;justify-content:center;
                       height:100%;font-size:13px;color:#7a7890;">${f.titulo}</div>`
      }
    </div>
  `).join('')
}

function renderTop10(filmes) {
  // ERRO CORRIGIDO 2: o id no HTML é 'top10' mas o código buscava 'top-filmes'
  const section = document.getElementById('top10')
  const top = [...filmes]
    .filter(f => f.nota)
    .sort((a, b) => b.nota - a.nota)
    .slice(0, 10)

  // ERRO CORRIGIDO 3: se nenhum filme tiver nota, o top ficava vazio.
  // Agora usa todos os filmes como fallback.
  const lista = top.length > 0 ? top : filmes.slice(0, 10)

  section.innerHTML = lista.map((f, i) => `
    <div class="cards">
      ${f.capa_url
        ? `<img src="${f.capa_url}" alt="${f.titulo}" class="img-card">">`
        : `<div style="display:flex;align-items:center;justify-content:center;
                       height:100%;font-size:13px;color:#7a7890;">${f.titulo}</div>`
      }
      <div style="position:absolute;bottom:8px;left:10px;
                  font-size:11px;color:rgba(255,255,255,0.8);">${f.titulo}</div>
      <div style="position:absolute;top:7px;left:5px;
                  display:flex;align-items: center;
                  justify-content: center;
                  border:solid white;
                  box-shadow: 0 0 15px rgb(255, 255, 255);
                  background-color: rgb(0,0,0);
                  width:40px;border-radius: 10px;
                  height:50px;
                  font-size:40px;font-weight:700;
                  color:rgb(218, 25, 25);">${i + 1}</div>
    </div>
  `).join('')
}

// Inicia tudo
const filmes = await carregarFilmes()
renderNovidades(filmes)
renderTop10(filmes)
