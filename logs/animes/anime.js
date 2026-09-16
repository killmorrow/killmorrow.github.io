const container = document.getElementById("container-dos-animes");
const navAnos = document.getElementById("nav-anos");


function escaparHTML(texto) {

    const div = document.createElement("div");

    div.textContent = texto ?? "";

    return div.innerHTML;

}


function formatarData(data) {

    if (!data) return "";

    const [ano, mes, dia] = data.split("-");

    return `${dia}/${mes}/${ano}`;

}


function gerarEstrelas(nota) {

    let html = '<span class="estrelas">';

    const inteiras = Math.floor(nota);

    const temMeia = nota % 1 !== 0;

    for (let i = 0; i < 5; i++) {

        if (i < inteiras) {

            html += '<span class="star filled">★</span>';

        } else if (i === inteiras && temMeia) {

            html += '<span class="star half">★</span>';

        } else {

            html += '<span class="star empty">★</span>';

        }

    }

    html += "</span>";

    return html;

}


function criarAnime(anime) {

    const titulo = escaparHTML(anime.title);

    const review = escaparHTML(anime.review);

    const data = formatarData(anime.dateWatched);

    const tipo = escaparHTML(anime.animeType);

    const episodios = escaparHTML(anime.episodes);

    return `
        <article class="anime-item">

            <div class="poster-container">

                <div class="poster-box">

                    ${
                        anime.poster
                            ? `
                                <img
                                    class="roxo"
                                    src="${escaparHTML(anime.poster)}"
                                    alt="Capa de ${titulo}"
                                >
                            `
                            : `
                                <div class="sem-capa">
                                    Sem Imagem
                                </div>
                            `
                    }

                </div>

                ${
                    anime.manga
                        ? `
                            <div class="manga-marker">
                                ▣ MANGA
                            </div>
                        `
                        : ""
                }

            </div>


            <div class="conteudo-anime">

                <div class="data-visto">
                    ${data}
                </div>


                <div class="cabecalho-anime">

                    <h3>
                        ${titulo}
                    </h3>

                    ${gerarEstrelas(Number(anime.rating))}

                </div>


                <div class="info-anime">

                    <span>
                        ${episodios} episódios
                    </span>

                    <span>•</span>

                    <span>
                        ${tipo}
                    </span>

                </div>


                <div class="caixa-review">
                    ${review}
                </div>

            </div>

        </article>
    `;
}


async function carregarAnimes() {

    try {

        const resposta = await fetch("animes/animes.json");

        if (!resposta.ok) {

            throw new Error("Erro ao carregar animes.json");

        }

        const dados = await resposta.json();

        const anos = Object.keys(dados)
            .sort((a, b) => Number(b) - Number(a));


        /* ===== BOTÕES DOS ANOS ===== */

        navAnos.innerHTML = anos
            .map(ano => `
                <a
                    href="#ano-${ano}"
                    class="btn-ano"
                >
                    ${ano}
                </a>
            `)
            .join("");


        /* ===== ANIMES ===== */

        container.innerHTML = anos
            .map(ano => {

                const animes = dados[ano];

                return `
                    <section
                        class="ano-section"
                        id="ano-${ano}"
                    >

                        <div class="stats-box">
                            ${animes.length} anime${animes.length !== 1 ? "s" : ""}
                        </div>

                        ${animes
                            .map(anime => criarAnime(anime))
                            .join("")
                        }

                    </section>
                `;

            })
            .join("");


    } catch (erro) {

        console.error(erro);

        container.innerHTML = `
            <div class="stats-box">
                não foi possível carregar os animes.
            </div>
        `;

    }

}


carregarAnimes();