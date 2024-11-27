// variáveis globais
let nav = 0;
let clicked = null;
let events = [];

// variáveis do modal:
const newEvent = document.getElementById('newEventModal');
const deleteEventModal = document.getElementById('deleteEventModal');
const backDrop = document.getElementById('modalBackDrop');
const eventTitleInput = document.getElementById('eventTitleInput');
// --------
const calendar = document.getElementById('calendar');
const weekdays = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];

// função para buscar os eventos
async function fetchEvents() {
  try {
    const response = await fetch('/api/events');
    if (response.ok) {
      events = await response.json();
      await load(); // Garanta que a carga de eventos seja feita após a resposta
    } else {
      console.error("Erro ao buscar eventos:", response.statusText);
    }
  } catch (error) {
    console.error("Erro ao buscar eventos:", error);
  }
}

// função openModal()
function openModal(date) {
  clicked = date;
  const eventDay = events.find((event) => event.date === clicked);

  if (eventDay) {
    document.getElementById('eventText').innerText = eventDay.title;
    deleteEventModal.style.display = 'block';
  } else {
    newEvent.style.display = 'block';
  }

  backDrop.style.display = 'block';
}

// função load()
async function load() {
  const date = new Date();

  if (nav !== 0) {
    date.setMonth(new Date().getMonth() + nav);
  }

  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const daysMonth = new Date(year, month + 1, 0).getDate();
  const firstDayMonth = new Date(year, month, 1);
  const dateString = firstDayMonth.toLocaleDateString('pt-br', { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' });
  const paddinDays = weekdays.indexOf(dateString.split(', ')[0]);

  const monthName = date.toLocaleDateString('pt-br', { month: 'long' });
  document.getElementById('monthDisplay').innerText = `${monthName.charAt(0).toUpperCase() + monthName.slice(1)}, ${year}`;
  calendar.innerHTML = '';

  for (let i = 1; i <= paddinDays + daysMonth; i++) {
    const dayS = document.createElement('div');
    dayS.classList.add('day');
    const dayString = `${month + 1}/${i - paddinDays}/${year}`;

    if (i > paddinDays) {
      dayS.innerText = i - paddinDays;

      const eventDay = events.find((event) => event.date === dayString);

      if (i - paddinDays === day && nav === 0) {
        dayS.id = 'currentDay';
      }

      if (eventDay) {
        const eventDiv = document.createElement('div');
        eventDiv.classList.add('event');
        eventDiv.innerText = eventDay.title;
        dayS.appendChild(eventDiv);
      }

      dayS.addEventListener('click', () => openModal(dayString));
    } else {
      dayS.classList.add('padding');
    }

    calendar.appendChild(dayS);
  }
}

// função closeModal()
function closeModal() {
  eventTitleInput.classList.remove('error');
  newEvent.style.display = 'none';
  backDrop.style.display = 'none';
  deleteEventModal.style.display = 'none';

  eventTitleInput.value = '';
  clicked = null;
  load();
}

// função saveEvent()
async function saveEvent() {
  if (eventTitleInput.value) {
    eventTitleInput.classList.remove('error');

    const newEvent = {
      date: clicked,
      title: eventTitleInput.value,
    };

    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEvent),
      });

      if (response.ok) {
        fetchEvents(); // Recarregar os eventos
        closeModal();
      } else {
        console.error("Erro ao salvar o evento:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao salvar o evento:", error);
    }
  } else {
    eventTitleInput.classList.add('error');
  }
}

// Exemplo de chamada do fetch no frontend
async function deleteEvent() {
  if (!clicked) {
    console.error("Nenhum evento selecionado para exclusão.");
    return;
  }
  try {
    const response = await fetch(`/api/events/${encodeURIComponent(clicked)}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      console.log('Evento excluído com sucesso');
      fetchEvents(); // Recarregar os eventos
      closeModal();
    } else {
      console.error("Erro ao excluir o evento:", response.statusText);
    }
  } catch (error) {
    console.error("Erro ao excluir o evento:", error);
  }
}

// botões
function buttons() {
  document.getElementById('backButton').addEventListener('click', () => {
    nav--;
    load();
  });

  document.getElementById('nextButton').addEventListener('click', () => {
    nav++;
    load();
  });

  document.getElementById('saveButton').addEventListener('click', () => saveEvent());
  document.getElementById('cancelButton').addEventListener('click', () => closeModal());
  document.getElementById('deleteButton').addEventListener('click', () => deleteEvent());
  document.getElementById('closeButton').addEventListener('click', () => closeModal());
}

// Inicializando
buttons();
fetchEvents(); // Carregar eventos ao inicializar a página
