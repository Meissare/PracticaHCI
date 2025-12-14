document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-events');
    const citySelect = document.getElementById('select-city');
    const badgeButtons = document.querySelectorAll('.badge');
    const resultsPara = document.getElementById('active-filters');

    // Variables de estado simuladas
    let searchQuery = '';
    let selectedCategory = 'Todos';
    let selectedCity = 'Madrid';

    function updateDisplay() {
        resultsPara.textContent = `Búsqueda: "${searchQuery}" | Ciudad: ${selectedCity} | Categoría: ${selectedCategory}`;
    }

    // Event Listener para Input de Búsqueda
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        updateDisplay();
    });

    // Event Listener para Select de Ciudad
    citySelect.addEventListener('change', (e) => {
        selectedCity = e.target.value;
        updateDisplay();
    });

    // Event Listener para los Badges/Botones de Categoría
    badgeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Eliminar 'active' de todos los botones
            badgeButtons.forEach(btn => btn.classList.remove('active'));

            // Añadir 'active' al botón clickeado
            e.target.classList.add('active');
            
            selectedCategory = e.target.getAttribute('data-category');
            updateDisplay();
        });
    });
    
    // Inicializar el estado activo del botón 'Todos' al cargar la página
    document.querySelector('.badge[data-category="Todos"]').classList.add('active');
    updateDisplay();
});
