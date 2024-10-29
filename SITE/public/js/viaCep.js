const cep = document.querySelector('#input_cep')
const logradouro = document.querySelector('#input_logradouro')
const cidade = document.querySelector('#input_cidade')
const bairro = document.querySelector('#input_bairro')
const mensagem = document.querySelector('#mensagem')


const CaracteresPermitidos = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-']

function clearInput() {
    logradouro.value = ''
    cidade.value = ''
    bairro.value = ''
}

cep.addEventListener('focusout', async () => {

    let confirmacaoCep = false

    // Verificando o campo CEP

    if (input_cep.value.length >= 8 && input_cep.value.length <= 9) {
        for (let numeroChar = 0; numeroChar < cep.value.length; numeroChar++) {
            let caracter = cep.value[numeroChar]

            if (CaracteresPermitidos.indexOf(caracter) != -1) {
                confirmacaoCep = true;
            } else {
                mensagem.innerHTML = 'CEP INVALIDO!';
                setTimeout(() => {
                    mensagem.innerHTML = ''
                }, 5000)
                clearInput();
                return;
            }
        }
    } else {
        mensagem.innerHTML = 'CEP INVALIDO!';
        setTimeout(() => {
            mensagem.innerHTML = ''
        }, 5000)
        clearInput()
    }


    if (confirmacaoCep) {
        const response = await fetch(`https://viacep.com.br/ws/${cep.value}/json/`)

        const responseCep = await response.json();

        logradouro.value = responseCep.logradouro;
        cidade.value = responseCep.localidade;
        bairro.value = responseCep.bairro;
    }


})