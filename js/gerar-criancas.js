document.addEventListener('DOMContentLoaded', () => {
    const corpoTabela = document.getElementById('corpo-tabela');
    const vlrTotalTransferencia = document.getElementById('vlr-transferencia');

    // Função para formatar números para a exibição em Real (BRL)
    const formatarMoeda = (valor) => {
        return valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    // Função que calcula o total de uma única linha da tabela
    const calcularTotalLinha = (item, caixasInput, unidadesInput, totalSpan) => {
        const caixas = parseFloat(caixasInput.value) || 0;
        const unidades = parseFloat(unidadesInput.value) || 0;

        const total = (caixas * item.custoCaixa) + (unidades * item.custoUn);
        totalSpan.textContent = formatarMoeda(total);

        return total;
    };

    // Função que calcula o total geral da transferência
    const calcularTotalGeral = () => {
        let totalGeral = 0;
        document.querySelectorAll('.total-item').forEach(totalSpan => {
            const valorString = totalSpan.textContent.replace('.', '').replace(',', '.');
            totalGeral += parseFloat(valorString) || 0;
        });

        vlrTotalTransferencia.textContent = formatarMoeda(totalGeral);
    };

    // Função para gerar as linhas da tabela
    const gerarLinhasTabela = (dados) => {
        corpoTabela.innerHTML = ''; // Limpa o conteúdo atual da tabela

        dados.forEach(item => {
            const tr = document.createElement('tr');

            tr.innerHTML = `
                <td>${item.codigo}</td>
                <td>${item.descricao}</td>
                <td>${item.qtCaixa}</td>
                <td><input type="number" class="caixas" min="0"></td>
                <td><input type="number" class="unidades" min="0"></td>
                <td>${formatarMoeda(item.valorCx)}</td>
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

            // Adiciona a lógica de cálculo após a linha ser criada
            const caixasInput = tr.querySelector('.caixas');
            const unidadesInput = tr.querySelector('.unidades');
            const totalSpan = tr.querySelector('.total-item');

            // Adiciona o event listener para os campos de input
            const handleInput = () => {
                calcularTotalLinha(item, caixasInput, unidadesInput, totalSpan);
                calcularTotalGeral();
            };

            caixasInput.addEventListener('input', handleInput);
            unidadesInput.addEventListener('input', handleInput);
        });
    };

    // Chama a função para gerar a tabela quando a página carregar
    gerarLinhasTabela(produtos_criancas);

});