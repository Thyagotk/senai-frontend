 //document.querySelector("button").addEventListener("click", validarLogin);
 function validarLogin() {
    let login = document.querySelector("#login").value;
    console.log(login);
    let senha = document.querySelector("#senha").value;
    console.log(senha);
    let msg = document.querySelector("span");

    if (login === "senai" && senha == "010203") {
        msg.innerHTML = "Acesso permitido! <a href='index.html'Clique aqui</a>';
        msg.style = "backgroundColor: blue"
        window.location = "index.html"
    } else {
        msg.innerText = "Login ou Senha Incorreta";
        msg.style = "backgroundColor: red"
    }
    return false;
}