function formatarData(dataIso) {
  if (!dataIso) return "SEM DATA";

  const [ano, mes, dia] = dataIso.split('-');
  const dataObj = new Date(ano, mes - 1, dia);

  const diasSemana = [
    'DOM', 'SEG', 'TER', 'QUA',
    'QUI', 'SEX', 'SAB'
  ];

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

function escaparHTML(texto) {
  const div = document.createElement('div');
  div.textContent = texto ?? '';
  return div.innerHTML;
}

async function carregarLivros() {
  try {
    const resposta = await fetch('livros/books.json');
    const booksData = await resposta.json();

    const container =
      document.getElementById('container-dos-livros');

    const navAnos =
      document.getElementById('nav-anos');

    const anosLidos =
      Object.keys(booksData).sort((a, b) => b - a);

    // Botões dos anos
    anosLidos.forEach(ano => {
      const btn = document.createElement('a');

      btn.href = `#ano-${ano}`;
      btn.textContent = ano;
      btn.className = 'btn-ano';

      navAnos.appendChild(btn);
    });

    // Seções por ano
    anosLidos.forEach(ano => {
      const section = document.createElement('section');

      section.id = `ano-${ano}`;
      section.className = 'ano-section';

      const stats = document.createElement('div');

      stats.className = 'stats-box';
      stats.innerHTML =
        `⌚ ${booksData[ano].length} itens registrados em ${ano}.`;

      section.appendChild(stats);

      booksData[ano].forEach(livro => {
        const article = document.createElement('article');

        article.className = 'livro-item';

        const dataFormatada =
          formatarData(livro.dateRead);

        const estrelas =
          gerarEstrelas(livro.rating);

        const textoReview =
          escaparHTML(livro.review).replace(/\n/g, '<br>');

        const autor =
          escaparHTML(livro.author);

        const titulo =
          escaparHTML(livro.title);

        const anoPublicacao =
          livro.year
            ? `<span class="ano">(${livro.year})</span>`
            : '';

        const tipoLeitura =
          livro.physical
            ? '<span class="tipo-leitura fisico">📖 físico</span>'
            : '<span class="tipo-leitura virtual">📱 virtual</span>';

        const tagsHTML =
          livro.tags && livro.tags.length > 0
            ? `
              <div class="tags">
                ${livro.tags.map(tag =>
                  `<span class="tag">${escaparHTML(tag)}</span>`
                ).join('')}
              </div>
            `
            : '';

        article.innerHTML = `
          <div class="capa-container">
            ${
              livro.cover
                ? `<img src="${escaparHTML(livro.cover)}" alt="Capa de ${titulo}">`
                : `<div class="sem-capa">Sem Imagem</div>`
            }
          </div>

          <div class="conteudo-livro">

            <div class="data-lido">
              <span>${dataFormatada}</span>
              ${tipoLeitura}
            </div>

            <div class="cabecalho-livro">
              <h3>${titulo}</h3>

              ${
                autor
                  ? `<span class="autor">${autor}</span>`
                  : ''
              }

              ${anoPublicacao}

              <div class="estrelas">
                ${estrelas}
              </div>
            </div>

            ${tagsHTML}

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

carregarLivros();

document.getElementById('btn-topo').addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

