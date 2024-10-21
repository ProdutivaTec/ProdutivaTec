
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
                themeIcon.src = './assets/icon/Light.png';
                themelogo.src = './assets/img/LOGO.png';
                themenoti.src = './assets/icon/image 35.png';
                themeconfg.src = './assets/icon/image 34.png';
                localStorage.setItem('theme', 'light');
            }
        }


        toggleButton.addEventListener('click', toggleTheme);

        dashButton.addEventListener('click', toggleTheme);







        document.addEventListener('DOMContentLoaded', function () {
            const menuItems = document.querySelectorAll('.menu-item');
            
            // Adiciona um listener para cada item de menu
            menuItems.forEach(item => {
                item.addEventListener('click', function() {
                    // Remove a classe 'ativo' de todos os itens
                    menuItems.forEach(i => i.classList.remove('ativo'));
                    // Adiciona a classe 'ativo' ao item clicado
                    item.classList.add('ativo');
                });
            });
        
            // Se você estiver usando links e deseja marcar a aba de acordo com a página atual:
            const currentPage = window.location.pathname.split("/").pop(); // Pega o nome do arquivo atual
        
            menuItems.forEach(item => {
                const link = item.querySelector('a'); // Verifica se o item é um link
                if (link) {
                    // Se o link do item for igual à página atual, marca como ativo
                    if (link.getAttribute('href') === currentPage) {
                        item.classList.add('ativo');
                    }
                }
            });
        });
        
    });
