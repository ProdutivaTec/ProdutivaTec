async function gerarResposta() {
    const pergunta = document.getElementById('pergunta').value;
    const response = await fetch('/perguntar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pergunta })
    });

    const data = await response.json();
    const historico = document.getElementById('historico');

    const perguntaDiv = document.createElement('div');
    perguntaDiv.classList.add('pergunta');
    perguntaDiv.innerText = pergunta;

    const respostaDiv = document.createElement('div');
    respostaDiv.classList.add('resposta');
    respostaDiv.innerText = data.resultado;

    historico.appendChild(perguntaDiv);
    historico.appendChild(respostaDiv);

    document.getElementById('pergunta').value = '';
    historico.scrollTop = historico.scrollHeight;
}

