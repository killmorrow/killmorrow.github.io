function formatarData(dataIso) {
  if (!dataIso) return "SEM DATA";
  const [ano, mes, dia] = dataIso.split('-');
  const dataObj = new Date(ano, mes - 1, dia); 
  const diasSemana = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];
  return `${diasSemana[dataObj.getDay()]} ${dia}.${mes}.${ano}`;
}

function gerarEstrelas(nota) {
  const cheias = Math.floor(nota);
  const vazias = 5 - cheias;
  return '<span class="star filled">★</span>'.repeat(cheias) +
         '<span class="star empty">☆</span>'.repeat(vazias);
}

async function carregarFilmes() {
  try {
    const resposta = await fetch('filmes/movies.json');
    const moviesData = await resposta.json();
    const container = document.getElementById('container-dos-filmes');
    const navAnos = document.getElementById('nav-anos'); // A barra de botões

    const anosAssistidos = Object.keys(moviesData).sort((a, b) => b - a);

    // Gera os botões de navegação no topo
    anosAssistidos.forEach(ano => {
      const btn = document.createElement('a');
      btn.href = `#ano-${ano}`; // Cria o link âncora
      btn.textContent = ano;
      btn.className = 'btn-ano';
      navAnos.appendChild(btn);
    });

    anosAssistidos.forEach(ano => {
      const section = document.createElement('section');
      section.id = `ano-${ano}`; // O id necessário para o botão te puxar pra cá
      section.className = 'ano-section';
      
      const stats = document.createElement('div');
      stats.className = 'stats-box';
      stats.innerHTML = `⌚ ${moviesData[ano].length} itens registrados em ${ano}.`;
      section.appendChild(stats);

      moviesData[ano].forEach(filme => {
        const article = document.createElement('article');
        article.className = 'filme-item';
        
        const dataFormatada = formatarData(filme.dateWatched);
        const estrelas = gerarEstrelas(filme.rating);
        const textoReview = filme.review.replace(/\n/g, '<br>');
        
        article.innerHTML = `
          <div class="poster-container">
            ${filme.poster ? `<img src="${filme.poster}" alt="Capa">` : `<div class="sem-capa">Sem Imagem</div>`}
          </div>
          <div class="conteudo-filme">
            <div class="data-visto">${dataFormatada}</div>
            <div class="cabecalho-filme">
              <h3>${filme.title}</h3>
              <span class="ano">(${filme.year})</span>
              <div class="estrelas">${estrelas}</div>
            </div>
            <div class="caixa-review">
              ${textoReview}
            </div>
          </div>
        `;
        section.appendChild(article);
      });

      container.appendChild(section);
    });

  } catch (erro) {
    console.error("Erro:", erro);
  }
}

carregarFilmes();

// Ação do botão de Voltar ao Topo
document.getElementById('btn-topo').addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // Rola a página de forma suave
  });
});