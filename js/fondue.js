document.addEventListener("DOMContentLoaded", function () {
    function formatCurrency(value) {
        return value.toFixed(2).replace(".", ",");
    }

    function validarValor(valor) {
        return !isNaN(valor) && valor >= 0.00 && valor <= 1000.00;
    }

    function exibirAlerta(input, nomeItem) {
        input.value = formatCurrency(0);
        alert(`O valor do ${nomeItem} deve estar entre R$ 0,00 e R$ 1000,00.`);
    }

    function calcularValores() {
        const morangoInput = document.getElementById("morango");
        const bananaInput = document.getElementById("banana");
        const uvaInput = document.getElementById("uva");
        const chocolateInput = document.getElementById("chocolate");

        let morango = parseFloat(morangoInput.value.replace(",", ".")) || 0;
        let banana = parseFloat(bananaInput.value.replace(",", ".")) || 0;
        let uva = parseFloat(uvaInput.value.replace(",", ".")) || 0;
        let chocolate = parseFloat(chocolateInput.value.replace(",", ".")) || 0;

        if (!validarValor(morango)) {
            exibirAlerta(morangoInput, "morango");
            morango = 0;
        }
        if (!validarValor(banana)) {
            exibirAlerta(bananaInput, "banana");
            banana = 0;
        }
        if (!validarValor(uva)) {
            exibirAlerta(uvaInput, "uva");
            uva = 0;
        }
        if (!validarValor(chocolate)) {
            exibirAlerta(chocolateInput, "chocolate");
            chocolate = 0;
        }

        const morangoCalculado = (morango * 1000) / 900;
        const bananaCalculada = banana * 0.9;
        const chocolateCalculado = chocolate / 4;

        document.getElementById("total-fruta").textContent = `R$ ${formatCurrency(morangoCalculado)}`;
        document.getElementById("total-banana").textContent = `R$ ${formatCurrency(bananaCalculada)}`;
        document.getElementById("total-uva").textContent = `R$ ${formatCurrency(uva)}`;
        document.getElementById("kg-chocolate").textContent = `R$ ${formatCurrency(chocolateCalculado)}`;

        // Cálculo da média dos valores das frutas (com base nos IDs de total)
        let totalFrutas = 0;
        let countFrutas = 0;

        const morangoTotal = parseFloat(document.getElementById("total-fruta").textContent.replace("R$ ", "").replace(",", ".")) || 0;
        const bananaTotal = parseFloat(document.getElementById("total-banana").textContent.replace("R$ ", "").replace(",", ".")) || 0;
        const uvaTotal = parseFloat(document.getElementById("total-uva").textContent.replace("R$ ", "").replace(",", ".")) || 0;

        if (morangoTotal > 0) {
            totalFrutas += morangoTotal;
            countFrutas++;
        }
        if (bananaTotal > 0) {
            totalFrutas += bananaTotal;
            countFrutas++;
        }
        if (uvaTotal > 0) {
            totalFrutas += uvaTotal;
            countFrutas++;
        }

        const precoMedioFrutas = countFrutas > 0 ? totalFrutas / countFrutas : 0;
        document.getElementById("media-frutas").textContent = `R$ ${formatCurrency(precoMedioFrutas)}`;

        // Cálculo do valor total das frutas
        const qntFrutas = parseFloat(document.getElementById("qnt-frutas").textContent.replace(",", ".")) || 0;
        const valorTotalFrutas = precoMedioFrutas * qntFrutas;
        document.getElementById("valor-frutas").textContent = `R$ ${formatCurrency(valorTotalFrutas)}`;

        // Exibe o valor do chocolate
        document.getElementById("valor-chocolate").textContent = `R$ ${formatCurrency(chocolate)}`;

        // Cálculo do valor total do chocolate
        const qntChocolate = parseFloat(document.getElementById("qnt-chocolate").textContent.replace(",", ".")) || 0;
        const valorChocolate = parseFloat(document.getElementById("valor-chocolate").textContent.replace("R$ ", "").replace(",", ".")) || 0;
        const totalChocolate = qntChocolate * valorChocolate;
        document.getElementById("total-chocolate").textContent = `R$ ${formatCurrency(totalChocolate)}`;

        // Cálculo do custo total do fondue
        const totalPote = 0.26;
        const totalColher = 0.06;
        const totalGuardanapo = 0.04;
        let totalFondue = valorTotalFrutas + totalPote + totalColher + totalGuardanapo + totalChocolate;
        document.getElementById("total-fondue").innerHTML = `<strong>R$ ${formatCurrency(totalFondue)}</strong>`;
    }

    function formatarInput(input) {
        const valor = parseFloat(input.value.replace(",", ".")) || 0;
        input.value = isNaN(valor) ? "0,00" : formatCurrency(valor);
    }

    document.querySelectorAll("input").forEach(input => {
        input.addEventListener("focus", function () {
            if (this.value === "0,00") {
                this.value = "";
            }
        });
        input.addEventListener("blur", function () {
            formatarInput(this);
            calcularValores();
        });
    });

    const qntPessoasInput = document.getElementById("qnt-pessoas");
    const qntFonduesPorPessoaInput = document.getElementById("qnt-fondues-por-pessoa");
    const fonduesNecessariosSpan = document.getElementById("fondues-necessarios");

    function atualizarFonduesNecessarios() {
        const pessoas = parseInt(qntPessoasInput.value) || 0;
        const fonduesPorPessoa = parseInt(qntFonduesPorPessoaInput.value) || 0;
        const totalFondues = pessoas * fonduesPorPessoa;
        fonduesNecessariosSpan.textContent = totalFondues;
    }

    function validarInteiro(input) {
        const valor = input.value.replace(/[^0-9]/g, ""); // Remove caracteres não numéricos
        input.value = valor; // Atualiza o input com apenas números

        if (valor === "") {
            input.value = "0"; // Garante que o input nunca fique vazio
        }

        atualizarFonduesNecessarios();
    }

    qntPessoasInput.addEventListener("input", function () {
        validarInteiro(this);
    });

    qntFonduesPorPessoaInput.addEventListener("input", function () {
        validarInteiro(this);
    });

    // Chamar calcularValores inicialmente para exibir os valores corretos
    calcularValores();
    atualizarFonduesNecessarios(); // Garante que o valor inicial seja exibido
});