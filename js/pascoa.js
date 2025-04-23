<<<<<<< HEAD
const usuariosAutorizados = ["1065","","7552","2631","7662","6346","9194","4048", "1487", "9603", "1871", "1692", "3540", "3809", "6890", "8135", "8820","5901", "8844"];
=======
const usuariosAutorizados = ["1065","9438","1370","7552","2631","7662","6346","9194","4048", "1487", "9603", "1871", "1692", "3540", "3809", "6890", "8135", "8820","5901", "8844"];
>>>>>>> e65b12ef8ee705498b6e86fc2c021e5e6f7a9d2b

    // Aguarda o carregamento do DOM
    document.addEventListener("DOMContentLoaded", function() {
      // Seleciona o link contido na div com a classe 'campanha-3'
      const linkCampanha3 = document.querySelector('.campanha-3 a');

      if (linkCampanha3) {
        // Adiciona um listener para o evento de clique
        linkCampanha3.addEventListener('click', function(event) {
          // Solicita que o usuário informe seu código RCKY
          const rckyUsuario = prompt("Digite seu RCKY para acessar a Transferência de Páscoa:");
          
          // Verifica se o input possui exatamente 4 dígitos numéricos
          if (!/^\d{4}$/.test(rckyUsuario)) {
            event.preventDefault();
            alert("Código inválido! Digite apenas 4 dígitos numéricos.");
            return;
          }
          
          // Se o código não estiver autorizado, impede o redirecionamento
          if (!usuariosAutorizados.includes(rckyUsuario)) {
            event.preventDefault();
            alert("Acesso negado! Você não tem permissão para acessar essa campanha.");
          }
          // Se o código estiver autorizado, o redirecionamento prossegue normalmente.
        });
      }
    });