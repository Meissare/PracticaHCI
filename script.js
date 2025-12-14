document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-events');
    const citySelect = document.getElementById('select-city');
    const cardsContainer = document.getElementById('event-cards-container');
    const filtersContainer = document.getElementById('category-filters');

    // Datos de eventos simulados (se añade categoría 'Infantil')
    let eventsData = [
        { id: 1, title: 'Estreno: Interestelar', category: 'Cine', city: 'Madrid' },
        { id: 2, title: 'Ciclo Kubrick', category: 'Cine', city: 'Barcelona' },
        { id: 3, title: 'Hamlet en el Albéniz', category: 'Teatro', city: 'Madrid' },
        { id: 4, title: 'Musical: El Rey León', category: 'Teatro', city: 'Madrid' },
        { id: 5, title: 'Concierto de Rock: Banda X', category: 'Concierto', city: 'Valencia' },
        { id: 6, title: 'Festival de Jazz 2025', category: 'Concierto', city: 'Barcelona' },
        { id: 7, title: 'Partido Baloncesto', category: 'Deporte', city: 'Madrid' },
        { id: 8, title: 'Carrera Popular', category: 'Deporte', city: 'Valencia' },
        { id: 9, title: 'Títeres en el Retiro', category: 'Infantil', city: 'Madrid' },
        { id: 10, title: 'Cuentacuentos en la biblioteca', category: 'Infantil', city: 'Barcelona' },
    ];

    // Lista de categorías actualizada
    const categories = ['Todos', 'Cine', 'Teatro', 'Concierto', 'Infantil', 'Deporte'];

    let currentSearchQuery = '';
    let currentCategory = 'Todos';
    let currentCity = 'Todos';
    let savedEventIds = JSON.parse(localStorage.getItem('savedEvents')) || [];

    // --- Funciones de Renderizado ---
    function createEventCard(event) {
        const card = document.createElement('div');
        card.classList.add('event-card');
        const isSaved = savedEventIds.includes(event.id);
        const saveButtonClass = isSaved ? 'save-event-btn saved' : 'save-event-btn';
        const saveButtonText = isSaved ? 'Guardado' : 'Guardar';

        card.innerHTML = `
            <h3>${event.title}</h3>
            <p>Categoría: <strong>${event.category}</strong></p>
            <p>Ciudad: <strong>${event.city}</strong></p>
            <div class="btn-group">
                <button class="reserve-btn" data-event-id="${event.id}">Reservar</button>
                <button class="${saveButtonClass}" data-event-id="${event.id}">
                    <i class="fas fa-heart"></i> ${saveButtonText}
                </button>
            </div>
        `;
        cardsContainer.appendChild(card);
    }

    function createFilterBadges() {
        // Limpiamos filtros anteriores por si acaso
        filtersContainer.innerHTML = ''; 
        
        categories.forEach(category => {
            const button = document.createElement('button');
            button.classList.add('badge');
            button.textContent = category;
            button.setAttribute('data-category', category);
            if (category === 'Todos') button.classList.add('active');

            button.addEventListener('click', () => {
                document.querySelectorAll('.badge').forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                currentCategory = category;
                filterAndRenderEvents();
            });

            filtersContainer.appendChild(button);
        });
    }

    // --- Lógica de Filtrado Principal ---
    function filterAndRenderEvents() {
        cardsContainer.innerHTML = ''; // Limpia el contenedor actual

        const filteredEvents = eventsData.filter(event => {
            // Si la categoría seleccionada es 'Todos', no aplicamos filtro de categoría
            const matchesCategory = currentCategory === 'Todos' || event.category === currentCategory;
            
            // Filtros de búsqueda y ciudad
            const matchesSearch = event.title.toLowerCase().includes(currentSearchQuery.toLowerCase());
            const matchesCity = currentCity === 'Todos' || event.city === currentCity;
            
            return matchesSearch && matchesCategory && matchesCity;
        });

        filteredEvents.forEach(createEventCard);
        addReservationListeners();
        addSaveListeners();
    }

    // --- Lógica de Botones (Reserva y Guardar) ---
    function addReservationListeners() {
        document.querySelectorAll('.reserve-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const eventId = e.target.getAttribute('data-event-id');
                const event = eventsData.find(e => e.id == eventId);
                alert(`¡Has reservado una plaza para "${event.title}" en ${event.city}!`);
            });
        });
    }

    function addSaveListeners() {
        document.querySelectorAll('.save-event-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const eventId = parseInt(e.currentTarget.getAttribute('data-event-id'));
                const isSaved = savedEventIds.includes(eventId);

                if (isSaved) {
                    savedEventIds = savedEventIds.filter(id => id !== eventId);
                    button.classList.remove('saved');
                    button.innerHTML = '<i class="fas fa-heart"></i> Guardar';
                } else {
                    savedEventIds.push(eventId);
                    button.classList.add('saved');
                    button.innerHTML = '<i class="fas fa-heart"></i> Guardado';
                }
                
                localStorage.setItem('savedEvents', JSON.stringify(savedEventIds));
            });
        });
    }

    // --- Inicialización ---
    createFilterBadges();
    filterAndRenderEvents();
});
