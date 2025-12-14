document.addEventListener('DOMContentLoaded', () => {
    const eventForm = document.getElementById('event-form');
    const eventInput = document.getElementById('event-input');
    const eventList = document.getElementById('event-list');

    let events = JSON.parse(localStorage.getItem('events')) || [];

    function renderEvents() {
        eventList.innerHTML = '';
        events.forEach(eventText => {
            const li = document.createElement('li');
            li.textContent = eventText;
            eventList.appendChild(li);
        });
    }

    function saveEvents() {
        // Convierte el array de eventos a una cadena JSON antes de guardar
        localStorage.setItem('events', JSON.stringify(events));
    }

    eventForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Previene el envío del formulario tradicional
        const newEvent = eventInput.value.trim();

        if (newEvent) {
            events.push(newEvent);
            saveEvents();
            renderEvents();
            eventInput.value = ''; // Limpia el input
        }
    });

    // Carga los eventos al cargar la página
    renderEvents();
});
