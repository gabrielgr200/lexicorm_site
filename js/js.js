let searchBtn = document.querySelector('.searchBtn');
let closeBtn = document.querySelector('.closeBtn');
let searchBox = document.querySelector('.searchBox');
let navigation = document.querySelector('.navigation');
let menuToggle = document.querySelector('.menuToggle');
let header = document.querySelector('header');

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