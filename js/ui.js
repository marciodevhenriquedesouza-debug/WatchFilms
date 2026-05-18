
export function renderNovidades(filmes) {
  const section = document.getElementById("novidades");
  const lista = filmes.slice(0, 10);

  section.innerHTML = lista
    .map(
      (f) => `
    <div class="card-nov">
      ${
        f.capa_url
          ? `<img src="${f.capa_url}" alt="${f.titulo}" class="img-card">`
          : `<div style="display:flex;align-items:center;justify-content:center;
                       height:100%;font-size:13px;color:#7a7890;">${f.titulo}</div>`
      }
    </div>
  `,
    )
    .join("");
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
    <div class="cards">
      ${
        f.capa_url
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
  `,
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
      (f, i) => `
    <div class="cards">
      ${
        f.capa_url
          ? `<img src="${f.capa_url}" alt="${f.titulo}" class="img-card">">`
          : `<div style="display:flex;align-items:center;justify-content:center;
                       height:100%;font-size:13px;color:#7a7890;">${f.titulo}</div>`
      }
     </div>
  `,
    )
    .join("");
  sections.forEach((section) => {
    section.innerHTML = html;
  });
}
