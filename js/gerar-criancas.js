document.addEventListener('DOMContentLoaded', () => {
    const corpoTabela = document.getElementById('corpo-tabela');

    // Função para formatar números para a exibição em Real (BRL)
    const formatarMoeda = (valor) => {
        return valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
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
                <td><span class="total-item" id="total-valor">0,00</span></td>
            `;

            corpoTabela.appendChild(tr);
        });
    };

    // Chama a função para gerar a tabela quando a página carregar
    gerarLinhasTabela(produtos); // 'produtos' é o array do arquivo dados.js
});