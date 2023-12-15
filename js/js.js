let searchBtn = document.querySelector('.searchBtn');
let closeBtn = document.querySelector('.closeBtn');
let searchBox = document.querySelector('.searchBox');
let navigation = document.querySelector('.navigation');
let menuToggle = document.querySelector('.menuToggle');
let header = document.querySelector('header');
let inputField = document.getElementById('searchInput');

searchBtn.onclick = function () {
    searchBox.classList.add('active');
    searchBtn.classList.add('active');
    closeBtn.classList.add('active');
    menuToggle.classList.add('hidden');
    header.classList.remove('open');
}

closeBtn.onclick = function () {
    searchBox.classList.remove('active');
    searchBtn.classList.remove('active');
    closeBtn.classList.remove('active');
    menuToggle.classList.remove('hidden');
}

menuToggle.onclick = function () {
    header.classList.toggle('open');
    searchBox.classList.remove('active');
    searchBtn.classList.remove('active');
    closeBtn.classList.remove('active');
}

function loadMedicines(searchTerm = '') {
    const fetchURL = searchTerm ? `/remedios/search?nome=${searchTerm}` : '/remedios';

    fetch(`https://web-production-38ef.up.railway.app${fetchURL}`)
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('.table_section tbody');
            tableBody.innerHTML = '';

            if (data.length === 0) {
                const emptyRow = document.createElement('tr');
                emptyRow.innerHTML = '<td colspan="8">Nenhum resultado encontrado.</td>';
                tableBody.appendChild(emptyRow);
            } else {
                data.forEach(medicine => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${medicine.Referencia}</td>
                        <td>${medicine.Principio}</td>
                        <td>${medicine.Comercial}</td>
                        <td>${medicine.Registro}</td>
                        <td>${medicine.Colaterais}</td>
                        <td>${medicine.Decomposto}</td>
                        <td>${medicine.Farmacia}</td>
                        <td>${medicine.Concentracao}</td>
                    `;
                    tableBody.appendChild(row);
                });
            }
        })
        .catch(error => {
            console.error('Houve um erro na solicitação:', error);
        });
}

window.addEventListener('load', () => {
    loadMedicines();
});

searchBtn.addEventListener('click', () => {
    const searchTerm = inputField.value;
    loadMedicines(searchTerm);
});


