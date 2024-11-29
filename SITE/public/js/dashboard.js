
    document.addEventListener('DOMContentLoaded', function () {
        const toggleButton = document.getElementById('theme-toggle');
        const themeIcon = document.getElementById('theme-icon');
        const dashButton = document.getElementById('theme-dash');
        const themelogo = document.getElementById('theme-logo');
        const themenoti = document.getElementById('theme-noti');
        const themeconfg = document.getElementById('theme-confg');

        const body = document.body;

        // Verifica o tema atual ao carregar a página
        if (localStorage.getItem('theme') === 'dark') {
            body.classList.add('dark-mode');
            themeIcon.src = './assets/icon/Moon.png';
            themelogo.src = './assets/img/LOGO-Dark.png';
            themenoti.src = './assets/icon/icons8-sino-50.png';
            themeconfg.src = './assets/icon/icons8-configuração-50.png';
        }

        function toggleTheme() {
            body.classList.toggle('dark-mode');

            if (body.classList.contains('dark-mode')) {
                themeIcon.src = './assets/icon/Moon.png';
                themelogo.src = './assets/img/LOGO-Dark.png';
                themenoti.src = './assets/icon/icons8-sino-50.png';
                themeconfg.src = './assets/icon/icons8-configuração-50.png';
                localStorage.setItem('theme', 'dark');
            } else {
                themeIcon.src = './assets/icon/sun.png';
                themelogo.src = './assets/img/LOGO.png';
                themenoti.src = './assets/icon/notification (1).png';
                themeconfg.src = './assets/icon/setting (3).png';
                localStorage.setItem('theme', 'light');
            }
        }


        toggleButton.addEventListener('click', toggleTheme);

        dashButton.addEventListener('click', toggleTheme);
    });



    function carregarDadosGenero() {
        fetch('dashboard/genero', { method: 'POST' })
            .then(function (resposta) {
                return resposta.json();
            })
            .then(function (resultado) {
                console.log('Dados genero:', resultado);
                const totalColaboradores = resultado.quantidade_homens + resultado.quantidade_mulheres;
                const porcentagemHomens = totalColaboradores ? (resultado.quantidade_homens / totalColaboradores) * 100 : 0;
                const porcentagemMulheres = totalColaboradores ? (resultado.quantidade_mulheres / totalColaboradores) * 100 : 0;
    
                const qtdHomensElem = document.getElementById("quantidade-homens");
                const qtdMulheresElem = document.getElementById("quantidade-mulheres");
                const percHomensElem = document.getElementById("porcentagem-homens");
                const percMulheresElem = document.getElementById("porcentagem-mulheres");
    
                if (qtdHomensElem) qtdHomensElem.textContent = resultado.quantidade_homens || 0;
                if (qtdMulheresElem) qtdMulheresElem.textContent = resultado.quantidade_mulheres || 0;
                if (percHomensElem) percHomensElem.textContent = porcentagemHomens.toFixed(0) + "%" || "0%";
                if (percMulheresElem) percMulheresElem.textContent = porcentagemMulheres.toFixed(0) + "%" || "0%";
            })
            .catch(function (erro) {
                console.error("Erro ao carregar os dados de gênero:", erro);
            });
    }
    function carregarTotalColaboradores() {
        fetch('dashboard/totalColaboradores', { method: 'POST' })
            .then(function (resposta) {
                return resposta.json();
            })
            .then(function (resultado) {
                console.log('Total de colaboradores:', resultado);
                document.getElementById("quantidade-colaboradores").textContent = resultado.quantidade_colaboradores || 0;
            })
            .catch(function (erro) {
                console.error("Erro ao carregar o total de colaboradores:", erro);
            });
    }
    
    function carregarPorcentagemRespostas() {
        fetch('dashboard/porcentagemRespostas', { method: 'POST' })
            .then(function (resposta) {
                return resposta.json();
            })
            .then(function (resultado) {
                console.log('Porcentagem de respostas:', resultado);
                document.getElementById("porcentagem-respostas").textContent = resultado.porcentagem_respostas + "%" || 0;
            })
            .catch(function (erro) {
                console.error("Erro ao carregar a porcentagem de respostas:", erro);
            });
    }
    function carregarDadosSatisfeitos() {
        fetch('dashboard/satisfeitos', { method: 'POST' })
            .then(function (resposta) {
                return resposta.json();
            })
            .then(function (resultado) {
                console.log('Dados de satisfação:', resultado); 
    
                let porcentagemSatisfeitos = parseFloat(resultado.porcentagem_satisfeitos);
                

                if (isNaN(porcentagemSatisfeitos)) {
                    console.error("Erro ao converter a porcentagem para número.");
                    porcentagemSatisfeitos = 0;  
                }
                const percSatisfeitosElem = document.getElementById("porcentagem-satisfeitos");
    
                if (percSatisfeitosElem) {
                    percSatisfeitosElem.textContent = porcentagemSatisfeitos.toFixed(0) + "%"; 
                } else {
                    console.error("Elemento com id 'porcentagem-satisfeitos' não encontrado.");
                }
            })
            .catch(function (erro) {
                console.log("Erro ao carregar os dados de colaboradores satisfeitos:", erro);
            });
    }
    
    function carregarDadosInsatisfeitos() {
        fetch('dashboard/insatisfeitos', { method: 'POST' })
            .then(function (resposta) {
                return resposta.json();
            })
            .then(function (resultado) {
                console.log('Dados insatisfeitos:', resultado);
    
                const porcentagemInsatisfeitos = parseFloat(resultado.porcentagem_insatisfeitos) || 0;
    
                const quantidadeSatisfeitos = parseInt(resultado.quantidade_satisfeitos) || 0;
                const quantidadeInsatisfeitos = parseInt(resultado.quantidade_insatisfeitos) || 0;
    
    
                const totalColaboradores = quantidadeSatisfeitos + quantidadeInsatisfeitos;
    
                const percInsatisfeitos = totalColaboradores ? (quantidadeInsatisfeitos / totalColaboradores) * 100 : porcentagemInsatisfeitos;
    
                const qtdInsatisfeitosElem = document.getElementById("quantidade-insatisfeitos");
                const percInsatisfeitosElem = document.getElementById("porcentagem-insatisfeitos");
    
                if (qtdInsatisfeitosElem) {
                    qtdInsatisfeitosElem.textContent = quantidadeInsatisfeitos;
                }
    
                if (percInsatisfeitosElem) {
                    percInsatisfeitosElem.textContent = percInsatisfeitos.toFixed(0) + "%";
                }
            })
            .catch(function (erro) {
                console.log("Erro ao carregar os dados de colaboradores insatisfeitos:", erro);
            });
    }
    function carregarDadosRecomendacao() {
        fetch('dashboard/recomendacao', { method: 'POST' })
            .then(function (resposta) {
                return resposta.json();
            })
            .then(function (resultado) {
                console.log('Dados recomendação:', resultado);
    
                const percRecomendariaElem = document.getElementById("porcentagem-recomendaria");
    
                if (percRecomendariaElem) {
                    percRecomendariaElem.textContent = resultado.porcentagem + "%" || "0%";
                }
            })
            .catch(function (erro) {
                console.error("Erro ao carregar os dados de recomendação:", erro);
            });
    }
    
    window.onload = function () {
        carregarDadosGenero();
        carregarTotalColaboradores();
        carregarPorcentagemRespostas();
        carregarDadosSatisfeitos();
        carregarDadosInsatisfeitos();
        carregarDadosRecomendacao();
    };