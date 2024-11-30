function enviarLeads() {
    event.preventDefault()
    aguardar();

    var nome_input = document.getElementById("nome_input");
    var sobrenome_input = document.getElementById("sobrenome_input");
    var email_input = document.getElementById("email_input");
    var telefone_input = document.getElementById("telefone_input");
    var descricao_input = document.getElementById("descricao_input");

    var nomeVar = `${nome_input.value} ${sobrenome_input.value}`;
    var emailVar = email_input.value;
    var telefoneVar = telefone_input.value;
    var descricaoVar = descricao_input.value;

    if (
        nomeVar == "" ||
        emailVar == "" ||
        telefoneVar == "" ||
        descricaoVar == "" 
    ) {
        finalizarAguardar();
        console.log("Preencha todos os campos");
        return false;
    } else {
        setInterval(5000);
    } 

    fetch("/usuarios/enviarLeads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nomeServer: nomeVar,
          emailServer: emailVar.toLowerCase(),
          telefoneServer: telefoneVar,
          descricaoServer: descricaoVar
        }),
    })
        .then(function (resposta) {
          console.log("resposta: ", resposta);
    
          if (resposta.ok) {
    
            setTimeout(() => {
              window.location = "configuracoesColaboradores.html";
            }, "2000");
    
            finalizarAguardar();
          } else {
            throw new Error("Erro ao enviar o leads");
          }
        })
        .catch(function (resposta) {
          console.log(`#ERRO: ${resposta}`);
          finalizarAguardar();
        });
    
      return false;
}

function aguardar() {
  const loader = document.querySelector('#loader');
  if (loader) loader.style.display = 'block';
}

function finalizarAguardar() {
  const loader = document.querySelector('#loader');
  if (loader) loader.style.display = 'none';
}