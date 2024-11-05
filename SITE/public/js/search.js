document.getElementById('searchBtn').addEventListener('click', function () {
    const searchInput = document.getElementById('searchInput').value;

    // Simulação de busca
    if (searchInput === "João") {
        const resultadoBusca = document.getElementById('resultadoBusca');
        resultadoBusca.innerHTML = `
      <br><br> 
      <p>Dados Pessoais</p>
      <br>
      <div class="funcionario">
          <div class="funcionario-info">
              
              <div class="nome-sobrenome">
                  <div class="inputGroup">
                      <label>Nome</label>
                      <div class="inputNome" id="nome"><p>João</p></div>
                  </div>
  
                  <div class="inputGroup">
                      <label>Sobrenome</label>
                      <div class="inputNome" id="sobrenome"><p>Silva</p></div>
                  </div>
              </div>
  
              <div class="inputGroup">
                  <label>Email</label>
                  <div class="inputNome" id="email"><p>joao.silva@sptech.school</p></div>
              </div>
  
              <div class="inputGroup">
                  <label>Função</label>
                  <div class="inputNome" id="funcao"><p>Diretor de Operações</p></div>
              </div>
  
          </div>
            <br>
         <div class="areaBotaoTela">
  <a href="./dashboard-VisãoGestor.html">  <button class="bntOutraTela">Tela</button> </a>
      </div>

          <br>
          <div class="botoes">
              <button class="editar">Atualizar Informações</button>
            <button class="deletar">Excluir Funcionário</button>
          </div>
      </div>
        `;

        // Função para editar informações
        document.querySelector('.editar').addEventListener('click', function () {
            const nomeDiv = document.getElementById('nome');
            const sobrenomeDiv = document.getElementById('sobrenome');
            const emailDiv = document.getElementById('email');
            const funcaoDiv = document.getElementById('funcao');

            const nomeTexto = nomeDiv.innerText;
            const sobrenomeTexto = sobrenomeDiv.innerText;
            const emailTexto = emailDiv.innerText;
            const funcaoTexto = funcaoDiv.innerText;

            // Verifica se já estão em modo de edição, para evitar múltiplas criações de input
            if (!document.getElementById('nomeInput')) {
                nomeDiv.innerHTML = `<input type="text" id="nomeInput" value="${nomeTexto}">`;
                sobrenomeDiv.innerHTML = `<input type="text" id="sobrenomeInput" value="${sobrenomeTexto}">`;
                emailDiv.innerHTML = `<input type="email" id="emailInput" value="${emailTexto}">`;
                funcaoDiv.innerHTML = `<input type="text" id="funcaoInput" value="${funcaoTexto}">`;

                // Alterar o botão "Atualizar Informações" para "Salvar Informações"
                this.textContent = "Salvar Informações";
            } else {
                // Se já estiver no modo de edição, ao clicar novamente, salva as mudanças
                const novoNome = document.getElementById('nomeInput').value;
                const novoSobrenome = document.getElementById('sobrenomeInput').value;
                const novoEmail = document.getElementById('emailInput').value;
                const novaFuncao = document.getElementById('funcaoInput').value;

                // Atualizando as divs com os novos valores
                nomeDiv.innerHTML = `<p>${novoNome}</p>`;
                sobrenomeDiv.innerHTML = `<p>${novoSobrenome}</p>`;
                emailDiv.innerHTML = `<p>${novoEmail}</p>`;
                funcaoDiv.innerHTML = `<p>${novaFuncao}</p>`;

                // Restaurar o botão para "Atualizar Informações"
                this.textContent = "Atualizar Informações";

                alert('Informações atualizadas com sucesso.');
            }
        });

        // Função para deletar funcionário
        document.querySelector('.deletar').addEventListener('click', function () {
            const confirma = confirm("Tem certeza que deseja excluir este funcionário?");
            if (confirma) {
                resultadoBusca.innerHTML = '';
                alert('Funcionário excluído.');
            }
        });
    } else {
        alert('Funcionário não encontrado.');
    }
});