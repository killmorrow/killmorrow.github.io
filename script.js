const cursor = document.createElement("img");

cursor.id = "custom-cursor";
cursor.src = "/cursor/3.gif";
cursor.alt = "";

Object.assign(cursor.style, {
    position: "fixed",
    pointerEvents: "none",
    zIndex: "2147483647",
    width: "32px",
    height: "32px",
    transform: "translate(-2px, -2px)",
    display: "none"
});

document.body.appendChild(cursor);

document.documentElement.style.minHeight = "100vh";
document.body.style.minHeight = "100vh";

document.documentElement.style.cursor = "none";
document.body.style.cursor = "none";

const style = document.createElement("style");

style.textContent = `
    html,
    html *,
    body,
    body * {
        cursor: none !important;
    }
`;

document.head.appendChild(style);

// Mover cursor
document.addEventListener("mousemove", (e) => {
    cursor.style.display = "block";

    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
});


// Links
document.addEventListener("mouseover", (e) => {
    const link = e.target.closest("a");

    if (link) {
        cursor.src = "/cursor/4.gif";
    }
});

document.addEventListener("mouseout", (e) => {
    const link = e.target.closest("a");

    if (link && !link.contains(e.relatedTarget)) {
        cursor.src = "/cursor/3.gif";
    }
});


// Iframes / Atabook
document.querySelectorAll("iframe").forEach(iframe => {
    iframe.addEventListener("mouseenter", () => {
        cursor.style.display = "none";
    });

    iframe.addEventListener("mouseleave", () => {
        cursor.style.display = "block";
        cursor.src = "/cursor/3.gif";
    });
});


// Loading
document.addEventListener("click", (e) => {
    const link = e.target.closest("a");

    if (!link) return;

    const href = link.getAttribute("href");

    if (
        href &&
        !href.startsWith("#") &&
        !href.startsWith("javascript:") &&
        link.target !== "_blank"
    ) {
        cursor.src = "/cursor/carregando.gif";
    }
});


function atualizarTempo() {
    document.querySelectorAll(".thought-time").forEach(function(element) {
        const data = new Date(element.dataset.date);
        const agora = new Date();

        const segundos = Math.floor((agora - data) / 1000);

        let texto;

        if (segundos < 60) {
            texto = "right now";
        } else if (segundos < 3600) {
            const minutos = Math.floor(segundos / 60);
            texto = `${minutos} minutes ago${minutos === 1 ? "" : "s"}`;
        } else if (segundos < 86400) {
            const horas = Math.floor(segundos / 3600);
            texto = `${horas} hours ago${horas === 1 ? "" : "s"}`;
        } else {
            const dias = Math.floor(segundos / 86400);
            texto = `${dias} days ago${dias === 1 ? "" : "s"}`;
        }

        element.textContent = texto;
    });
}

atualizarTempo();
setInterval(atualizarTempo, 60000);

function slides(){
    var slideIndex = 1;
    showSlides(slideIndex);

    function plusSlides(n){
        showSlides(slideIndex += n);
    }

    function showSlides(N){
        var i;
        var slides = document.getElementsByClassName("mySlides");
        if (n>slides.length) {slideIndex=1}
        if (n<1) {slideIndex = slides.length}
        for (i=0; i<slides.length;i++){
            slides[i].style.display = "none";
        }
        slides[slideIndex-1].style.display = "block";
    }
}

const conteiner = document.querySelector('.rolagem2');

if (conteiner) {
    conteiner.addEventListener('wheel', (evento) => {
        if (evento.deltaY !== 0) {
            evento.preventDefault();
            conteiner.scrollLeft += evento.deltaY;
        }
    });
}


fetch("updates.json")
    .then(response => response.json())
    .then(updates => {
        const container = document.getElementById("updates");

        updates.reverse();

        updates.forEach(update => {
            const lace = document.createElement("div");
            lace.className = "caixa3";

            const content = document.createElement("div");
            content.className = "";

            content.innerHTML = `<p><u>${update.date}</u> ${update.text}</p>`;

            lace.appendChild(content);
            container.appendChild(lace);
            container.appendChild(document.createElement("br"));
        });
    })
    .catch(error => {
        console.error("Erro ao carregar updates:", error);
    });
    
    
    
    









const itens = [
    {
        imagem: "http://www.theotaku.com/guru_results/3855_Miku.jpg",
        link: "https://www.theotaku.com/quizzes/view/3855/which_vocaloid_are_you%3F",
        nome: "which vocaloid are you?"
    },
    {
        imagem: "http://www.theotaku.com/guru_results/4150_Joseph_Joestar.jpg",
        link: "https://www.theotaku.com/quizzes/view/4150/which_jjba_stardust_crusader_are_you",
        nome: "which jjba stardust crusader are you?"
    },
    {
        imagem: "http://www.theotaku.com/guru_results/4097_Himedere.jpg",
        link: "https://www.theotaku.com/quizzes/view/4097/what_dere_type_are_you",
        nome: "which dere type are you?"
    },
    {
        imagem: "http://www.theotaku.com/guru_results/4126_kyoko_sakura.jpg",
        link: "https://www.theotaku.com/quizzes/view/4126/which_madoka_magica_girl_r_u_",
        nome: "which madoka magica girl are you?"
    },
    {
        imagem: "http://www.theotaku.com/guru_results/2412_Flareon.jpg",
        link: "https://theotaku.com/quizzes/view/2412/what_eevee_evolution_are_you",
        nome: "what eeve evolution are you?"
    },
    {
        imagem: "http://www.theotaku.com/guru_results/2838_Amy.jpg",
        link: "https://theotaku.com/quizzes/view/2838/what_sonic-x_character_are_you",
        nome: "what sonic x character are you?"
    },
    {
        imagem: "http://www.theotaku.com/guru_results/4079_Twitter.jpg",
        link: "https://www.theotaku.com/quizzes/view/4079/which_fan-chao_are_you",
        nome: "which fan-chao are you?"
    },
    {
        imagem: "http://www.nerdtests.com/images/badge/nt2/abd7fbd680a80c5d.jpg",
        link: "http://www.nerdtests.com/ft_nt2.php",
        nome: "type of nerd"
    }
];

let atual = 0;

function mostrarItem() {
    document.getElementById("imagem").src = itens[atual].imagem;

    const link = document.getElementById("link");
    link.href = itens[atual].link;
    link.textContent = itens[atual].nome;
}

function proximo() {
    atual++;

    if (atual >= itens.length) {
        atual = 0;
    }

    mostrarItem();
}

function anterior() {
    atual--;

    if (atual < 0) {
        atual = itens.length - 1;
    }

    mostrarItem();
}





