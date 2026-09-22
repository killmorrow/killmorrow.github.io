const playlist = [
    "https://www.dropbox.com/scl/fi/v2mb1oqi9d2ykm0gxb7vt/Catedrais-Em-Chamas.mp3?rlkey=6y5oo7ao324oxjk2xvzou6jbd&st=xaiilsxv&raw=1",
    "https://www.dropbox.com/scl/fi/d1t98slyqtdjeema2j76k/The-Killing-Moon.mp3?rlkey=2aabhia24t5o0m9zcr14yf3l8&st=zc4v5m5i&raw=1",
    "https://www.dropbox.com/scl/fi/x11gn20m5smzl2cnz2viw/Out-Of-Control-She-Wants-Revenge.mp3?rlkey=cs58ab5cncxa3l85z30mhu0a4&st=ucm2hj4p&raw=1",
    "https://www.dropbox.com/scl/fi/6fmt202tuhnpkx74y98f2/Lucretia-My-Reflection.mp3?rlkey=katytsy0hkc4r3zc2absa36cv&st=lj7kyabl&raw=1",
    "https://www.dropbox.com/scl/fi/dxcuey5tfh2s28523bkkd/Kiss-Me-Until-My-Lips-Fall-Off.mp3?rlkey=h4yhgpzit3byo8x4m4j2szuep&st=8rqi279g&raw=1",
    "https://www.dropbox.com/scl/fi/ur27nohx3jrzzuka68m95/Enjoy-the-Silence.mp3?rlkey=n3r1pvbwnjj81i41blqr1agin&st=oldtjyny&raw=1",
    "https://www.dropbox.com/scl/fi/51276gszp0xtk926llomv/Black-Cathedral.mp3?rlkey=40ntaav6zpa8eemin8p7yb0le&st=bm7upm83&raw=1",
    "https://www.dropbox.com/scl/fi/8hheipi1v6scdcsl8hfgx/Bela-Lugosi-s-Dead-Official-Version.mp3?rlkey=1o8hd4mjeramt9nndi78nlr2d&st=9htpoxof&raw=1",
    "https://www.dropbox.com/scl/fi/eahudk5nf15fb45zty87m/Amphetamine-Logic.mp3?rlkey=gqx7n7x8k1pdxbh3ymtmpefo8&st=9bpy15tp&raw=1"
];

let indiceAtual = 0;
const audio = new Audio(playlist[indiceAtual]);

const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const muteBtn = document.getElementById("mute");
const progressFill = document.getElementById("progress-fill");
const progressBar = document.getElementById("progress");
const timeDisplay = document.getElementById("music-time");
const titleDisplay = document.getElementById("music-title"); 

function atualizarNome() {
    if (!titleDisplay) return;
    let nome = playlist[indiceAtual].split('/').pop().split('?')[0];
    nome = decodeURIComponent(nome).replace(/-/g, ' ').replace('.mp3', '');
    titleDisplay.innerText = nome;
}

function carregarMusica() {
    audio.src = playlist[indiceAtual];
    audio.play();
    playBtn.innerText = "⏸";
    atualizarNome();
}

atualizarNome();

playBtn.onclick = function () {
    if (audio.paused) {
        audio.play();
        playBtn.innerText = "⏸";
    } else {
        audio.pause();
        playBtn.innerText = "▶";
    }
};

nextBtn.onclick = function () {
    indiceAtual++;
    if (indiceAtual >= playlist.length) {
        indiceAtual = 0;
    }
    carregarMusica();
};

prevBtn.onclick = function () {
    indiceAtual--;
    if (indiceAtual < 0) {
        indiceAtual = playlist.length - 1;
    }
    carregarMusica();
};

audio.addEventListener("ended", function () {
    nextBtn.click();
});

audio.addEventListener("timeupdate", function () {
    const currentTime = audio.currentTime;
    const duration = audio.duration || 0; 

    timeDisplay.innerText = `${formatTime(currentTime)} / ${formatTime(duration)}`;

    const percent = duration > 0 ? (currentTime / duration) * 100 : 0;
    progressFill.style.width = percent + "%";
});

progressBar.onclick = function (event) {
    if (!audio.duration) return;

    const rect = this.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const percent = clickX / rect.width;
    
    audio.currentTime = audio.duration * percent;
};

muteBtn.onclick = function () {
    audio.muted = !audio.muted;
    this.innerText = audio.muted ? "🔇" : "🔊";
};

function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    seconds = Math.floor(seconds);
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return m + ":" + (s < 10 ? "0" : "") + s;
}



fetch("updates.json")
    .then(response => response.json())
    .then(updates => {
        const container = document.getElementById("updates");

        updates.reverse();

        updates.forEach(update => {
            const caixa = document.createElement("div");
            caixa.className = "caixa";

            caixa.innerHTML = `<p><u>${update.date}</u> ${update.text}</p>`;

            container.appendChild(caixa);
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




 function copyCode(id) {
                    const codes = {
                        code1: '<a href="https://killmorrow.me"><img src="https://killmorrow.me/buttons/button.gif" alt="killmorrow"></a>',
                        code2: '<a href="https://killmorrow.me"><img src="https://killmorrow.me/buttons/button2.gif" alt="killnirriw"></a>'
                    };

                    navigator.clipboard.writeText(codes[id]);
                }