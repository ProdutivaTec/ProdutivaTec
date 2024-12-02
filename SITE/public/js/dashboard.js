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
    document.addEventListener("DOMContentLoaded", function () {
        const selectFiltro = document.getElementById("filtroSatisfacaoProdutividade");
        selectFiltro.addEventListener("change", function () {
            const opcaoSelecionada = selectFiltro.value;
    
            if (opcaoSelecionada === "produtividade") {
                carregarDadosProdutividadeEquipes();
            } else if (opcaoSelecionada === "satisfacao") {
                carregarDadosSatisfacaoEquipes();
            }
        });
    
        carregarDadosProdutividadeEquipes();
    });    

    function carregarGraficoRecursos() {
        console.log("Iniciando requisição para 'dashboard/graficoRecursos'");
        fetch('dashboard/graficoRecursos', { method: 'POST' })
            .then(resposta => {
                console.log("Resposta recebida:", resposta);
                if (!resposta.ok) {
                    throw new Error('Erro na resposta da API: ' + resposta.status);
                }
                return resposta.json();
            })
            .then(resultado => {
                console.log('Dados recursos:', resultado);
    
                // Verifica se o resultado contém os dados necessários
                if (!resultado.remoto || !resultado.presencial) {
                    console.error("Dados ausentes na resposta:", resultado);
                    return;
                }
    
                // Atualiza os datasets do gráfico com os dados recebidos
                resourceUsageChart.data.datasets[0].data = [
                    resultado.remoto.tempoFamilia || 0,
                    resultado.presencial.tempoFamilia || 0
                ];
    
                resourceUsageChart.data.datasets[1].data = [
                    resultado.remoto.tempoTrabalho || 0,
                    resultado.presencial.tempoTrabalho || 0
                ];
    
                // Atualiza o gráfico
                resourceUsageChart.update();
            })
            .catch(erro => {
                console.error("Erro ao carregar os dados de recursos:", erro);
            });
    }
    
    function carregarDadosProdutividadeEquipes() {
        fetch('/dashboard/produtividade/equipes', { method: 'POST' })
            .then(function (resposta) {
                if (resposta.status === 204) {
                    throw new Error("Nenhum dado encontrado para produtividade.");
                }
                return resposta.json();
            })
            .then(function (dados) {
                console.log('Dados de produtividade por equipe:', dados);
    
                const equipes = [];
                const produtividades = [];
    
                dados.forEach(item => {
                    if (!equipes.includes(item.equipe)) {
                        equipes.push(item.equipe);
                    }
                    produtividades.push(item.quantidade); 
                });
    
                atualizarGraficoFeedback(equipes, produtividades, 'Produtividade por Equipe');
            })
            .catch(function (erro) {
                console.error("Erro ao carregar os dados de produtividade por equipe:", erro);
                alert("Erro ao carregar os dados de produtividade por equipe. Verifique o console para mais detalhes.");
            });
    }
    
    function carregarDadosSatisfacaoEquipes() {
        fetch('/dashboard/satisfacao/equipes', { method: 'POST' })
            .then(function (resposta) {
                if (resposta.status === 204) {
                    throw new Error("Nenhum dado encontrado para satisfação.");
                }
                return resposta.json();
            })
            .then(function (dados) {
                console.log('Dados de satisfação por equipe:', dados);
    
                const equipes = [];
                const satisfacoes = [];
    
                dados.forEach(item => {
                    if (!equipes.includes(item.equipe)) {
                        equipes.push(item.equipe);
                    }
                    satisfacoes.push(item.quantidade); 
                });
    
                atualizarGraficoFeedback(equipes, satisfacoes, 'Satisfação por Equipe');
            })
            .catch(function (erro) {
                console.error("Erro ao carregar os dados de satisfação por equipe:", erro);
                alert("Erro ao carregar os dados de satisfação por equipe. Verifique o console para mais detalhes.");
            });
    }
    
    function atualizarGraficoFeedback(labels, data, titulo) {
        const ctx3 = document.getElementById('feedbackEquipes').getContext('2d');
    
        if (window.myFeedbackChart) {
            window.myFeedbackChart.destroy();
        }
    
        window.myFeedbackChart = new Chart(ctx3, {
            type: 'bar',
            data: {
                labels: labels, 
                datasets: [{
                    label: titulo,
                    data: data,
                    backgroundColor: [
                        '#0A82B0', '#0A82B0', '#0A82B0', '#0A82B0', '#0A82B0', '#0A82B0'
                    ],
                    borderWidth: 1,
                    borderRadius: 7,
                    barPercentage: 1.3,
                    categoryPercentage: 0.66
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y', 
                scales: {
                    x: {
                        beginAtZero: true,
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            display: false
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: titulo,
                        font: {
                            size: 20
                        }
                    }
                }
            }
        });
    }
    function carregarComparacaoEquipes() {
        fetch('/dashboard/comparacao/equipes', { method: 'POST' })
            .then(resposta => {
                if (resposta.status === 204) {
                    throw new Error("Nenhum dado encontrado para comparação.");
                }
                return resposta.json();
            })
            .then(dados => {
                console.log('Dados de comparação por equipe:', dados);
    
                const labels = dados.map(item => item.equipe);
                const produtividade = dados.map(item => item.produtividade);
                const satisfacao = dados.map(item => item.satisfacao);
    
                const ctx2 = document.getElementById('comparacaoEquipes').getContext('2d');
    
                if (window.myBarChart) {
                    window.myBarChart.destroy();
                }
    
                window.myBarChart = new Chart(ctx2, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Produtividade',
                            data: produtividade,
                            backgroundColor: '#0A82B0', 
                            borderWidth: 1,
                            borderRadius: 5,
                            barPercentage: 1.5,
                            categoryPercentage: 0.5
                        }, {
                            label: 'Satisfação',
                            data: satisfacao,
                            backgroundColor: '#00bfff', 
                            borderWidth: 1,
                            borderRadius: 5,
                            barPercentage: 1.5,
                            categoryPercentage: 0.5
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        indexAxis: 'y', 
                        scales: {
                            x: {
                                beginAtZero: true,
                                grid: {
                                    display: false
                                }
                            },
                            y: {
                                beginAtZero: true,
                                grid: {
                                    display: false
                                }
                            }
                        },
                        plugins: {
                            legend: {
                                display: true,
                                position: 'bottom'
                            },
                            title: {
                                display: true,
                                text: 'Comparação por Equipes',
                                font: {
                                    size: 20
                                }
                            }
                        }
                    }
                });
            })
            .catch(erro => {
                console.error("Erro ao carregar os dados de comparação:", erro);
                alert("Erro ao carregar os dados de comparação. Verifique o console para mais detalhes.");
            });
    }
    document.addEventListener("DOMContentLoaded", function () {
        const selectAspectos = document.querySelector(".selectAspectos");
    
        selectAspectos.addEventListener("change", function () {
            const opcaoSelecionada = selectAspectos.value; 
            carregarDadosPioresAspectos(opcaoSelecionada); 
        });
        carregarDadosPioresAspectos("remoto");
    });

    function carregarDadosPioresAspectos(tipo) {
        fetch(`/dashboard/pioresAspectos/${tipo}`, { method: "GET" })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Erro ao carregar os dados.");
                }
                return response.json();
            })
            .then((dados) => {
                console.log(`Dados de piores aspectos (${tipo}):`, dados);
    
                const top4 = dados.slice(0, 4);
    
                const labels = top4.map((item) => item.aspecto);
                const data = top4.map((item) => item.quantidade);
    
                const ctx = document.getElementById("GraficoPiorAspecto").getContext("2d");
    
                if (window.graficoAtual) {
                    window.graficoAtual.destroy(); 
                }
    
                window.graficoAtual = new Chart(ctx, {
                    type: "pie",
                    data: {
                        labels: labels,
                        datasets: [
                            {
                                label: `Piores Aspectos do Trabalho (${tipo})`,
                                data: data,
                                backgroundColor: [
                                     "#007bff", "#0056b3", "#6f42c1", "#c71585", "#17a2b8", "#28a745"
                                ],
                                borderColor: "#FFFFFF",
                                borderWidth: 1,
                            },
                        ],
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                position: "bottom",
                                labels: {
                                    color: "#000", 
                                    font: {
                                        size: 12, 
                                    },
                                },
                            },
                        },
                    },
                });
            })
            .catch((erro) => {
                console.error("Erro ao carregar os dados de piores aspectos:", erro);
            });
    }
    window.onload = function () {
        carregarDadosGenero();
        carregarTotalColaboradores();
        carregarPorcentagemRespostas();
        carregarDadosSatisfeitos();
        carregarDadosInsatisfeitos();
        carregarDadosRecomendacao();
        atualizarGraficoFeedback();
        carregarComparacaoEquipes();
        carregarDadosPioresAspectos();
        carregarGraficoRecursos();
    };