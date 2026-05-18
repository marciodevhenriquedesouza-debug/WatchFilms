import { supabase } from './supabase.js'
import { carregarFilmes } from './filmes.js'
import { renderNovidades, renderTop10 , renderGeneros } from './ui.js'

const filmes = await carregarFilmes()
renderNovidades(filmes)
renderTop10(filmes)
renderGeneros(filmes)

// pega a sessão atual e exibe o nome
const { data } = await supabase.auth.getSession()

const nomeLogado = document.querySelector('.nome-logado')

if (data.session) {
  const nome = data.session.user.user_metadata?.nome_completo || data.session.user.email
  nomeLogado.textContent = nome
} else {
  // se não tiver sessão, manda para o login
  window.location.href = '/pages/login.html'
}
document.getElementById('btnSair').addEventListener('click', async () => {
  await supabase.auth.signOut()
  window.location.href = '/pages/login.html'
})