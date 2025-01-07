function exportToPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Captura as informações das lojas
  const lojaRemetente = document.querySelector("#remetente").value || "";
  const lojaDestino = document.querySelector("#destino").value || "";
  const dataTransferenciaInput = document.querySelector("#date").value || "";

  // Formata a data para dd-mm-aaaa
  const dataTransferencia = dataTransferenciaInput
    ? new Date(dataTransferenciaInput).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).replace(/\//g, "-")
    : "";

  // Adiciona os dados das lojas no PDF
  doc.text("Informações da Transferência", 10, 10);
  doc.text(`Loja Remetente: ${lojaRemetente}`, 10, 20);
  doc.text(`Loja Destino: ${lojaDestino}`, 10, 30);
  doc.text(`Data da Transferência: ${dataTransferencia}`, 10, 40);

  // Captura as linhas da tabela
  const tableRows = [];
  const table = document.querySelector(".tableizer-table tbody");

  table.querySelectorAll("tr").forEach(row => {
    const codigo = row.children[0].textContent.trim();
    const descricao = row.children[1].textContent.trim();
    const caixasInput = row.querySelector("input.caixas");
    const unidadesInput = row.querySelector("input.unidades");
    const total = row.querySelector("#total-valor").textContent.trim();

    const caixas = caixasInput ? caixasInput.value || "0" : "0";
    const unidades = unidadesInput ? unidadesInput.value || "0" : "0";

    tableRows.push([codigo, descricao, caixas, unidades, total]);
  });

  // Adiciona a tabela ao PDF
  const headers = ["Código", "Descrição do Material", "Caixas", "Unidades", "Total"];

  doc.autoTable({
    head: [headers],
    body: tableRows,
    startY: 50,
    theme: 'striped',
    styles: { fontSize: 10 },
    headStyles: { fillColor: [0, 102, 204] },
  });

  // Salva o PDF
  doc.save("Custos_Natal.pdf");
}

function exportToXLS() {
  const wb = XLSX.utils.book_new();

  // Captura as informações das lojas
  const lojaRemetente = document.querySelector("#remetente").value || "";
  const lojaDestino = document.querySelector("#destino").value || "";
  const dataTransferenciaInput = document.querySelector("#date").value || "";

  // Formata a data para dd-mm-aaaa
  const dataTransferencia = dataTransferenciaInput
    ? new Date(dataTransferenciaInput).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).replace(/\//g, "-")
    : "";

  // Prepara os dados das lojas para inclusão no Excel
  const lojaInfo = [
    ["Informações da Transferência"],
    ["Loja Remetente", lojaRemetente],
    ["Loja Destino", lojaDestino],
    ["Data da Transferência", dataTransferencia],
  ];

  const tableRows = [];
  const table = document.querySelector(".tableizer-table tbody");

  table.querySelectorAll("tr").forEach(row => {
    const codigo = row.children[0].textContent.trim();
    const descricao = row.children[1].textContent.trim();
    const caixasInput = row.querySelector("input.caixas");
    const unidadesInput = row.querySelector("input.unidades");
    const total = row.querySelector("#total-valor").textContent.trim();

    const caixas = caixasInput ? caixasInput.value || "0" : "0";
    const unidades = unidadesInput ? unidadesInput.value || "0" : "0";

    tableRows.push([codigo, descricao, caixas, unidades, total]);
  });

  const headers = ["Código", "Descrição do Material", "Caixas", "Unidades", "Total"];

  // Combina as informações das lojas e a tabela em uma única aba
  const combinedData = [...lojaInfo, [], headers, ...tableRows];

  const sheet = XLSX.utils.aoa_to_sheet(combinedData);
  XLSX.utils.book_append_sheet(wb, sheet, "Custos_Natal");

  // Salva o arquivo Excel
  XLSX.writeFile(wb, "Custos_Natal.xlsx");
}
