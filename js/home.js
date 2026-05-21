import { supabase } from './supabase.js'
import { carregarFilmes } from './filmes.js'
import { renderNovidades, renderTop10, renderGeneros } from './ui.js'

const filmes = await carregarFilmes()
renderNovidades(filmes)
renderTop10(filmes)
renderGeneros(filmes)

// sessão e nome do usuário
const { data } = await supabase.auth.getSession()
const nomeLogado = document.querySelector('.nome-logado')

if (data.session) {
  const nome = data.session.user.user_metadata?.nome_completo || data.session.user.email
  nomeLogado.textContent = nome
} else {
  window.location.href = 'login.html'
}

// botão sair
document.getElementById('btnSair').addEventListener('click', async () => {
  await supabase.auth.signOut()
  window.location.href = 'login.html'
})

// navegação para página do filme
window.abrirFilme = function(id) {
  window.location.href = `filmes.html?id=${id}`
}
