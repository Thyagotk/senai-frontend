const frm = document.querySelector("form");  // cria referência aos elementos HTML
const respPalavra = document.querySelector("#outPalavra");
const respErros = document.querySelector("#outErros");
const respDica = document.querySelector("#outDica");
const respChances = document.querySelector("#outChances");
const respMensagemFinal = document.querySelector("#outMensagemFinal");
const imgStatus = document.querySelector("img");
let palavraSorteada; // declara variáveis globais
let dicaSorteada;
window.addEventListener("load", () => {
  // se não há palavras cadastradas
  if (!localStorage.getItem("jogoPalavra")) {
    alert("Cadastre palavras para jogar");  // exibe alerta
    frm.inLetra.disabled = true;  // desabilita inLetra e botões
    frm.btJogar.disabled = true;
    frm.btVerDica.disabled = true;
  }
