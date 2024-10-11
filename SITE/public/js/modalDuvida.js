// Modal para dúvidas
const helpModal = document.getElementById('helpModal');
const openHelpModal = document.getElementById('openHelpModal');
const closeHelpModal = helpModal.querySelector('.close');

openHelpModal.onclick = function() {
    helpModal.style.display = 'block';
}

closeHelpModal.onclick = function() {
    helpModal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == helpModal) {
        helpModal.style.display = 'none';
    }
}
