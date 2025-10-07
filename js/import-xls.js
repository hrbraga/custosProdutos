document.addEventListener('DOMContentLoaded', () => {
    const importInput = document.getElementById('importXLS');
    const btnImportar = document.getElementById('btn-importar');

    // Quando o botão for clicado, ele dispara o clique no input de arquivo oculto.
    btnImportar.addEventListener('click', () => {
        importInput.click();
    });

    importInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (!file) {
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });

            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            preencherTabela(jsonData);
        };

        reader.readAsArrayBuffer(file);
    });
});

function preencherTabela(dadosImportados) {
    const linhasDeDados = dadosImportados.slice(1);

    linhasDeDados.forEach(linha => {
        const codigo = linha[0];
        const caixasImportadas = linha[1] || 0;
        const unidadesImportadas = linha[2] || 0;

        const linhaTabela = document.querySelector(`.tableizer-table tbody tr:has(td:first-child:contains("${codigo}"))`);

        if (linhaTabela) {
            const inputCaixas = linhaTabela.querySelector('input.caixas');
            const inputUnidades = linhaTabela.querySelector('input.unidades');

            if (inputCaixas) {
                inputCaixas.value = caixasImportadas;
            }
            if (inputUnidades) {
                inputUnidades.value = unidadesImportadas;
            }
        }
    });

    if (typeof calcularTotalGeral === 'function') {
        calcularTotalGeral();
    }
}