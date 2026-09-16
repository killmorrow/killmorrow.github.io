function formatarData(dataIso) {
  if (!dataIso) return "SEM DATA";
  const [ano, mes, dia] = dataIso.split('-');
  const dataObj = new Date(ano, mes - 1, dia); 
  const diasSemana = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];
  return `${diasSemana[dataObj.getDay()]} ${dia}.${mes}.${ano}`;
}

function gerarEstrelas(nota) {
  nota = Number(nota);

  let resultado = '';

  for (let i = 1; i <= 5; i++) {
    if (nota >= i) {
      resultado += '<span class="star filled">★</span>';
    } else if (nota >= i - 0.5) {
      resultado += '<span class="star half">★</span>';
    } else {
      resultado += '<span class="star empty">☆</span>';
    }
  }

  return resultado;
}
async function carregarJogos() {
  try {
    // Aponta para o games.json que salvamos na raiz (Ajuste para '../games.json' se o seu HTML estiver dentro de uma pasta!)
    const resposta = await fetch('jogos/games.json'); 
    const gamesData = await resposta.json();
    
    // Lembre-se de usar este mesmo ID no seu arqucivo HTML!
    const container = document.getElementById('container-dos-jogos');
    const navAnos = document.getElementById('nav-anos'); 

    const anosJogados = Object.keys(gamesData).sort((a, b) => b - a);

    // Gera os botões de navegação no topo
    anosJogados.forEach(ano => {
      const btn = document.createElement('a');
      btn.href = `#ano-${ano}`; // Cria o link âncora
      btn.textContent = ano;
      btn.className = 'btn-ano';
      navAnos.appendChild(btn);
    });

    anosJogados.forEach(ano => {
      const section = document.createElement('section');
      section.id = `ano-${ano}`; 
      section.className = 'ano-section';
      
      const stats = document.createElement('div');
      stats.className = 'stats-box';
      stats.innerHTML = `⌚ ${gamesData[ano].length} jogos registrados em ${ano}.`;
      section.appendChild(stats);

      gamesData[ano].forEach(jogo => {
        const article = document.createElement('article');
        // 1. Mudamos a classe principal de volta para 'filme-item'
        article.className = 'filme-item'; 
        
        const dataFormatada = formatarData(jogo.datePlayed);
        const estrelas = gerarEstrelas(jogo.rating);
        const textoReview = jogo.review.replace(/\n/g, '<br>');
        
        article.innerHTML = `
          <div class="poster-container">

            <div class="poster-box">
              ${jogo.poster
                ? `<img src="${jogo.poster}" alt="Capa" class="capa-jogo roxo">`
                : `<div class="sem-capa">Sem Imagem</div>`
              }
            </div>

            ${jogo.owned ? `<div class="owned-marker">▣ OWNED</div>` : ''}

          </div>
          
          <!-- 2. Reutilizamos o 'conteudo-filme' para garantir a foto do lado -->
          <div class="conteudo-filme">
            
            <div class="data-visto">${dataFormatada} • ⏱️ ${jogo.hours}h jogadas</div>
            
            <!-- 3. Reutilizamos o 'cabecalho-filme' para alinhar o título e as estrelas -->
            <div class="cabecalho-filme">
              <h3>${jogo.title}</h3>
              
              ${jogo.link !== '#' && jogo.link !== '' ? `<a href="${jogo.link}" target="_blank" class="btn-jogue">check it out!</a>` : ''}
              
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
    console.error("Erro ao carregar o JSON:", erro);
  }
}

// Inicia o script
carregarJogos();