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
window.onload = function () {
    carregarDadosPioresAspectos();
    
};