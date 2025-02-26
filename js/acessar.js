function acessar() {
    const codigoDigitado = document.getElementById("codigo").value;
    const mensagemElemento = document.getElementById("mensagem");

    if (codigoDigitado.trim() === "") {
        mensagemElemento.textContent = "Digite o código de acesso.";
        mensagemElemento.style.color = "red";
        return;
    }

    if (!/^\d{4}$/.test(codigoDigitado)) {
        mensagemElemento.textContent = "Código inválido. Digite 4 números.";
        mensagemElemento.style.color = "red";
        return;
    }

    const codigosValidos = ["1871", "5901"];

    if (codigosValidos.includes(codigoDigitado)) {
        alert("Acesso Autorizado!");
        setTimeout(function() {
            window.location.href = "../html/selecao.html";
        }, 50);
    } else {
        mensagemElemento.textContent = "Código de acesso inválido.";
        mensagemElemento.style.color = "red";
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById("formularioAcesso");
    formulario.addEventListener("submit", function(event) {
        event.preventDefault();
        acessar();
    });
});