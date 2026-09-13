fetch("blog/posts.json")
    .then(response => response.json())
    .then(posts => {

        const container = document.getElementById("posts");

        posts.reverse().forEach(post => {

            const caixa = document.createElement("div");
            caixa.className = "caixa";

            caixa.innerHTML = `
                <h2>
                    ${post.titulo}
                    <small>${post.data}</small>
                </h2>

                ${post.conteudo}
            `;

            container.appendChild(caixa);
        });

    });