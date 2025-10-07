// gerador.js

function gerarTabelaUniversal(dadosProdutos) {
    const corpoTabela = document.getElementById('corpo-tabela');
    const vlrTotalTransferencia = document.getElementById('vlr-transferencia');

    const formatarMoeda = (valor) => {
        const numero = parseFloat(valor);
        if (isNaN(numero)) {
            return "0,00";
        }
        return numero.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    const calcularTotalLinha = (item, caixasInput, unidadesInput, totalSpan) => {
        const caixas = parseFloat(caixasInput.value) || 0;
        const unidades = parseFloat(unidadesInput.value) || 0;

        const total = (caixas * item.custoCaixa) + (unidades * item.custoUn);
        totalSpan.textContent = formatarMoeda(total);

        return total;
    };

    window.calcularTotalGeral = () => {
        let totalGeral = 0;
        document.querySelectorAll('.total-item').forEach(totalSpan => {
            const valorString = totalSpan.textContent.replace('.', '').replace(',', '.');
            totalGeral += parseFloat(valorString) || 0;
        });

        vlrTotalTransferencia.textContent = formatarMoeda(totalGeral);
    };

    const gerarLinhasTabela = (dados) => {
        corpoTabela.innerHTML = ''; 

        dados.forEach(item => {
            const tr = document.createElement('tr');

            tr.innerHTML = `
                <td>${item.codigo}</td>
                <td>${item.descricao}</td>
                <td>${item.qtCaixa}</td>
                <td><input type="number" class="caixas" min="0"></td>
                <td><input type="number" class="unidades" min="0"></td>
                <td>${formatarMoeda(item.valorUn)}</td>
                <td>${formatarMoeda(item.royalties)}</td>
                <td>${formatarMoeda(item.st)}</td>
                <td>${formatarMoeda(item.ipi)}</td>
                <td>${formatarMoeda(item.txsAdicionais)}</td>
                <td>${formatarMoeda(item.txMidia)}</td>
                <td>${formatarMoeda(item.custoCaixa)}</td>
                <td>${formatarMoeda(item.custoUn)}</td>
                <td><span class="total-item" id="total-valor-${item.codigo}">0,00</span></td>
            `;

            corpoTabela.appendChild(tr);

            const caixasInput = tr.querySelector('.caixas');
            const unidadesInput = tr.querySelector('.unidades');
            const totalSpan = tr.querySelector('.total-item');

            const handleInput = () => {
                calcularTotalLinha(item, caixasInput, unidadesInput, totalSpan);
                calcularTotalGeral();
            };

            caixasInput.addEventListener('input', handleInput);
            unidadesInput.addEventListener('input', handleInput);
        });
    };

    gerarLinhasTabela(dadosProdutos);
}

// Nova função para limpar os dados da planilha e do formulário
function limparTabela() {
    // Limpa os inputs da tabela
    document.querySelectorAll('.tableizer-table input[type="number"]').forEach(input => {
        input.value = "";
    });

    // Limpa os totais de cada linha
    document.querySelectorAll('.total-item').forEach(span => {
        span.textContent = "0,00";
    });

    // Limpa os campos do formulário
    document.querySelector("#remetente").value = "";
    document.querySelector("#destino").value = "";
    document.querySelector("#date").value = "";

    // Zera o valor total da transferência
    document.querySelector("#vlr-transferencia").textContent = "0,00";
}

// Adiciona o event listener para o novo botão de limpar
document.addEventListener('DOMContentLoaded', () => {
    const btnLimpar = document.getElementById('btn-limpar');
    if (btnLimpar) {
        btnLimpar.addEventListener('click', limparTabela);
    }
});