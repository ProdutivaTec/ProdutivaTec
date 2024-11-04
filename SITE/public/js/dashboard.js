
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
