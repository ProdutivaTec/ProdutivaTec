document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("myModal");
    const btn = document.getElementById("openModalBtn");
    const span = document.getElementsByClassName("close")[0];

    // Abre o modal ao clicar no botão de notificações
    btn.addEventListener("click", function () {
        modal.style.display = "flex"; // Mostra o modal
    });

    // Fecha o modal ao clicar no "X"
    span.onclick = function () {
        modal.style.display = "none";
    }

    // Fecha o modal ao clicar fora dele
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});