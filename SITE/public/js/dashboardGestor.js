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

document.addEventListener("DOMContentLoaded", function () {
    const selectAspectos = document.querySelector(".selectAspectos");

    selectAspectos.addEventListener("change", function () {
        const tipoSelecionado = selectAspectos.value;  
        carregarDadosPioresAspectos(tipoSelecionado); 
    });

    carregarDadosPioresAspectos("remoto");  
});

function carregarDadosPioresAspectos(tipo) {
    fetch(`/dashboardGestor/pioresAspectos/${tipo}`, { method: "GET" })
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
                                "#007bff", "#0056b3", "#6f42c1", "#c71585",
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

function carregarGraficoRecursos() {
    fetch("/dashboardGestor/graficoRecursos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ocupacao: "Gestores" })
    })
        .then((response) => {
            if (!response.ok) {
                return response.json().then((erro) => {
                    throw new Error(erro.mensagem || "Erro desconhecido no backend");
                });
            }
            return response.json();
        })
        .then((dados) => {
            console.log("Dados recebidos para o gráfico:", dados);

            const aspectos = dados.map(dado => dado.tipo_atividade); 
            const tempoPessoal = dados.map(dado => dado.tempo_pessoal); 
            const trabalho = dados.map(dado => dado.trabalho); 

            // Atualizar o gráfico com os dados processados
            atualizarGraficoRecursos(aspectos, tempoPessoal, trabalho);
        })
        .catch((erro) => {
            console.error("Erro ao carregar o gráfico de recursos:", erro);
            alert("Erro: " + erro.message); 
        });
}

function atualizarGraficoRecursos(aspectos, tempoPessoal, trabalho) {
    const ctx = document.getElementById('graficoRecursos').getContext('2d');

    if (window.resourceUsageChart) {
        window.resourceUsageChart.destroy();
    }
    window.resourceUsageChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: aspectos,
            datasets: [
                {
                    label: 'Tempo Pessoal',
                    data: tempoPessoal,
                    backgroundColor: '#00264d', 
                    borderRadius: 5
                },
                {
                    label: 'Trabalho',
                    data: trabalho,
                    backgroundColor: '#0074cc',
                    borderRadius: 5
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Utilização de Recursos (em horas)',
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            size: 14
                        }
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#e0e0e0'
                    },
                    ticks: {
                        stepSize: 50, 
                        font: {
                            size: 14
                        }
                    }
                }
            }
        }
    });
}
function mediaProdutividadeEquipe() {
    fetch('/dashboardGestor/media-produtividade-equipe')
        .then(response => response.json())
        .then(data => {
            if (data && data.mediaProdutividadeEquipe !== undefined) {
                document.getElementById('media-produtividade-equipe').textContent = data.mediaProdutividadeEquipe;
            }
        })
        .catch(error => console.error('Erro ao buscar a média de produtividade da equipe do remoto:', error));
}

function porcentagemPresencialMulher() {
    fetch('/dashboardGestor/porcentagem-presencial-mulher')
        .then(response => response.json())
        .then(data => {
            if (data && data.porcentagemPresencial !== undefined) {
                document.getElementById('porcentagem-presencial-mulher').textContent = data.porcentagemPresencial + '%';
            }
        })
        .catch(error => console.error('Erro ao buscar a porcentagem do presencial (Mulher):', error));
}

function porcentagemRemotoMulher() {
    fetch('/dashboardGestor/porcentagem-remoto-mulher')
        .then(response => response.json())
        .then(data => {
            if (data && data.porcentagemRemoto !== undefined) {
                document.getElementById('porcentagem-remoto-mulher').textContent = data.porcentagemRemoto + '%';
            }
        })
        .catch(error => console.error('Erro ao buscar a porcentagem do remoto (Mulher):', error));
}

function porcentagemProdutivoPresencial() {
    fetch('/dashboardGestor/porcentagem-produtivo-presencial')
        .then(response => response.json())
        .then(data => {
            if (data && data.porcentagemPresencial !== undefined) {
                document.getElementById('porcentagem-presencial').textContent = data.porcentagemPresencial + '%';
            }
        })
        .catch(error => console.error('Erro ao buscar a porcentagem do presencial:', error));
}

function porcentagemProdutivoRemoto() {
    fetch('/dashboardGestor/porcentagem-produtivo-remoto')
        .then(response => response.json())
        .then(data => {
            if (data && data.porcentagemRemoto !== undefined) {
                document.getElementById('porcentagem-remoto').textContent = data.porcentagemRemoto + '%';
            }
        })
        .catch(error => console.error('Erro ao buscar a porcentagem do remoto:', error));
}
function carregarTotalColaboradores() {
    fetch('dashboardGestor/totalColaboradores', { method: 'POST' })
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
window.onload = function () {
    carregarDadosPioresAspectos();
    carregarGraficoRecursos();
    mediaProdutividadeEquipe();
    porcentagemPresencialMulher();
    porcentagemRemotoMulher();
    porcentagemProdutivoPresencial();
    porcentagemProdutivoRemoto();
    carregarTotalColaboradores();
};