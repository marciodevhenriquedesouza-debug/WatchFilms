export function renderNovidades(filmes) {
  const section = document.getElementById("novidades");
  const lista = filmes.slice(0, 10);
  let atual = 0;
  let mutado = true;
  let autoTimer = null;

  section.innerHTML = `
    <button class="seta seta-esq" id="setaEsq">&#8592;</button>

    <div class="trailer-container" id="trailerContainer">
      <iframe
        id="trailerFrame"
        src=""
        allow="autoplay; encrypted-media"
        allowfullscreen>
      </iframe>
      <div id="trailerInfo"></div>
      <button id="assistir-btn">▶ Assistir</button>
      <button class="btn-som" id="btnSom">🔇</button>
    </div>

    <button class="seta seta-dir" id="setaDir">&#8594;</button>
  `;

  const frame     = document.getElementById("trailerFrame");
  const info      = document.getElementById("trailerInfo");
  const btnSom    = document.getElementById("btnSom");
  const btnAssistir = document.getElementById("assistir-btn");

  function enviarComando(cmd) {
    frame.contentWindow.postMessage(
      JSON.stringify({ event: "command", func: cmd, args: [] }),
      "*"
    );
  }

  function trocarFilme(index) {
    const f = lista[index];

    mutado = true;
    btnSom.textContent = "🔇";

    if (autoTimer) clearTimeout(autoTimer);

    if (f.trailer_url) {
      frame.style.display = "block";
      frame.style.opacity = "0";

      setTimeout(() => {
        frame.src = `https://www.youtube.com/embed/${f.trailer_url}?autoplay=1&mute=1&loop=1&playlist=${f.trailer_url}&controls=0&rel=0&modestbranding=1&enablejsapi=1`;
        setTimeout(() => {
          frame.style.opacity = "1";
        }, 800);
      }, 600);

      autoTimer = setTimeout(() => {
        atual = (atual + 1) % lista.length;
        trocarFilme(atual);
      }, 15000);

    } else {
      frame.src = "";
      frame.style.display = "none";
      autoTimer = setTimeout(() => {
        atual = (atual + 1) % lista.length;
        trocarFilme(atual);
      }, 15000);
    }

    // atualiza botão assistir com id do filme atual
    btnAssistir.onclick = () => window.abrirFilme(f.id);

    
    info.style.opacity = "0";
    setTimeout(() => {
      info.innerHTML = `
        <span class="trailer-titulo" onclick="abrirFilme(${f.id})" style="cursor:pointer">${f.titulo}</span>
      `;
      info.style.opacity = "1";
    }, 1000);
  }

  btnSom.addEventListener("click", () => {
    if (mutado) {
      enviarComando("unMute");
      btnSom.textContent = "🔊";
      if (autoTimer) clearTimeout(autoTimer);
    } else {
      enviarComando("mute");
      btnSom.textContent = "🔇";
      if (autoTimer) clearTimeout(autoTimer);
      autoTimer = setTimeout(() => {
        atual = (atual + 1) % lista.length;
        trocarFilme(atual);
      }, 15000);
    }
    mutado = !mutado;
  });

  document.getElementById("setaEsq").addEventListener("click", () => {
    atual = (atual - 1 + lista.length) % lista.length;
    trocarFilme(atual);
  });

  document.getElementById("setaDir").addEventListener("click", () => {
    atual = (atual + 1) % lista.length;
    trocarFilme(atual);
  });

  trocarFilme(0);
}

export function renderTop10(filmes) {
  const sections = document.querySelectorAll(".top10");
  const top = [...filmes]
    .filter((f) => f.nota)
    .sort((a, b) => b.nota - a.nota)
    .slice(0, 10);
  const lista = top.length > 0 ? top : filmes.slice(0, 10);
  const html = lista
    .map(
      (f, i) => `
    <div class="cards" onclick="abrirFilme(${f.id})" style="cursor:pointer">
      ${
        f.capa_url
          ? `<img src="${f.capa_url}" alt="${f.titulo}" class="img-card">`
          : `<div style="display:flex;align-items:center;justify-content:center;
                       height:100%;font-size:13px;color:#7a7890;">${f.titulo}</div>`
      }
      <div style="position:absolute;bottom:8px;left:10px;
                  font-size:11px;color:rgba(255,255,255,0.8);">${f.titulo}</div>
      <div style="position:absolute;top:7px;left:5px;
                  display:flex;align-items:center;
                  justify-content:center;
                  border:solid white;
                  box-shadow:0 0 15px rgb(255,255,255);
                  background-color:rgb(0,0,0);
                  width:40px;border-radius:10px;
                  height:50px;
                  font-size:40px;font-weight:700;
                  color:rgb(218,25,25);">${i + 1}</div>
    </div>
  `
    )
    .join("");
  sections.forEach((section) => {
    section.innerHTML = html;
  });
}

export function renderGeneros(filmes) {
  const sections = document.querySelectorAll(".generos");
  const lista = filmes.slice(0, 10);
  const html = lista
    .map(
      (f) => `
    <div class="cards" onclick="abrirFilme(${f.id})" style="cursor:pointer">
      ${
        f.capa_url
          ? `<img src="${f.capa_url}" alt="${f.titulo}" class="img-card">`
          : `<div style="display:flex;align-items:center;justify-content:center;
                       height:100%;font-size:13px;color:#7a7890;">${f.titulo}</div>`
      }
    </div>
  `
    )
    .join("");
  sections.forEach((section) => {
    section.innerHTML = html;
  });
}
