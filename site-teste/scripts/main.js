function mudarH1() {
    const novaH1 = document.querySelector("h1")
    novaH1.textContent = "Ola Mundo"    
}

function verificarTime() {
    let time = prompt("Digite seu tima");
    if (time === "mengo") {
        alert("Time de coração Flamengo")
    } else {
        alert("Outro time não importa");
        window.location.href = "https://www.google.com/";
    }
}

document.querySelector("img").addEventListener("click", verificarTime);