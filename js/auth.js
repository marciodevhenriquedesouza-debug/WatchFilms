import { supabase } from "./supabase.js";

// ── ELEMENTOS ──────────────────────────────────────────────
const telaEmail = document.getElementById("tela-email");
const telaLogin = document.getElementById("tela-login");
const telaCadastro = document.getElementById("tela-cadastro");
const nomeLogado = document.querySelector(".nome-logado");

const inputEmail = document.getElementById("inputEmail");
const inputSenha = document.getElementById("inputSenha");
const inputNome = document.getElementById("inputNome");
const inputSenhaNova = document.getElementById("inputSenhaNova");
const inputConfirma = document.getElementById("inputConfirma");
const emailCadastro = document.getElementById("emailCadastro");

const btnVamosLa = document.getElementById("btnVamosLa");
const btnEntrar = document.getElementById("btnEntrar");
const btnCriaConta = document.getElementById("btnCriaConta");
const linkEsqueceu = document.getElementById("linkEsqueceu");

let emailGlobal = "";

// ── ESTADO 1: verificar email ──────────────────────────────
// Supabase retorna status 400 para email inexistente
// e "Invalid login credentials" para email existente com senha errada
btnVamosLa.addEventListener("click", async () => {
  const email = inputEmail.value.trim();

  if (!email || !email.includes("@")) {
    alert("Digite um email válido.");
    return;
  }

  emailGlobal = email;
  btnVamosLa.textContent = "Verificando...";
  btnVamosLa.disabled = true;

  // consulta a tabela usuarios para ver se email existe
  const { data } = await supabase
    .from("usuarios")
    .select("email")
    .eq("email", email)
    .single();

  btnVamosLa.textContent = "Vamos lá >>";
  btnVamosLa.disabled = false;

  if (data) {
    irParaLogin(); // email encontrado na tabela → pede senha
  } else {
    irParaCadastro(); // email não encontrado → cadastro
  }
});

// ── ESTADO 2: fazer login ──────────────────────────────────
btnEntrar.addEventListener("click", async () => {
  const senha = inputSenha.value.trim();

  if (!senha) {
    alert("Digite sua senha.");
    return;
  }

  btnEntrar.textContent = "Entrando...";
  btnEntrar.disabled = true;

  const { error } = await supabase.auth.signInWithPassword({
    email: emailGlobal,
    password: senha,
  });

  btnEntrar.textContent = "Entrar";
  btnEntrar.disabled = false;

  if (error) {
    alert("Senha incorreta. Tente novamente.");
    inputSenha.style.borderColor = "#e5383b";
    return;
  }

  window.location.href = "/pages/home.html";
});

// ── ESTADO 3: criar conta ──────────────────────────────────
btnCriaConta.addEventListener("click", async () => {
  const nome = inputNome.value.trim();
  const senha = inputSenhaNova.value.trim();
  const confirma = inputConfirma.value.trim();

  if (!nome) {
    alert("Digite seu nome.");
    return;
  }
  if (senha.length < 6) {
    alert("A senha precisa ter pelo menos 6 caracteres.");
    return;
  }
  if (senha !== confirma) {
    alert("As senhas não coincidem.");
    inputConfirma.style.borderColor = "#e5383b";
    return;
  }

  btnCriaConta.textContent = "Criando conta...";
  btnCriaConta.disabled = true;

  const { error } = await supabase.auth.signUp({
    email: emailGlobal,
    password: senha,
    options: { data: { nome_completo: nome } },
  });
  await supabase.from("usuarios").insert({
    email: emailGlobal,
    nome: nome,
  });
  btnCriaConta.textContent = "Crie minha conta";
  btnCriaConta.disabled = false;

  if (error) {
    alert("Erro: " + error.message);
    return;
  }

  alert("Conta criada com sucesso!");
  window.location.href = "/pages/home.html";
  nomeLogado.textContent = `${nome}`;
});

// ── ESQUECEU A SENHA ───────────────────────────────────────
linkEsqueceu.addEventListener("click", async (e) => {
  e.preventDefault();
  if (!emailGlobal) return;
  const { error } = await supabase.auth.resetPasswordForEmail(emailGlobal);
  if (!error) alert("Email de recuperação enviado para " + emailGlobal);
});

// ── VALIDAÇÃO CONFIRMA SENHA EM TEMPO REAL ─────────────────
inputConfirma.addEventListener("input", () => {
  inputConfirma.style.borderColor =
    inputConfirma.value && inputConfirma.value !== inputSenhaNova.value
      ? "#e5383b"
      : "";
});

// ── NAVEGAÇÃO ──────────────────────────────────────────────
function irParaLogin() {
  telaEmail.style.display = "none";
  telaCadastro.style.display = "none";
  telaLogin.style.display = "block";
  inputSenha.focus();
}

function irParaCadastro() {
  telaEmail.style.display = "none";
  telaLogin.style.display = "none";
  telaCadastro.style.display = "block";
  inputNome.focus();
}
