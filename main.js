import data from './data.js';

const dataLength = data.length;

const wrapper = document.querySelector('.wrapper');
let cards = [];
let index = 0;
let x = 0;
let cx = 0;

function setCard(i) {
    data[i].imgSrc = data[i].name;
    if (data[i].admission === '') {
        data[i].admission = '-';
    }
    if (data[i].graduated === '') {
        data[i].graduated = '-';
    }
    if (data[i].liveIn === '') {
        data[i].liveIn = '-';
    }
    if (data[i].prayerTopic === '') {
        data[i].prayerTopic = '-';
    }
    let card = `
    <div class="container">
    <div class="card" data-index="${data[i].id - 1}">
    <div class="nav">
        <div class="home"><i class="fas fa-home"></i></div>
        <div class="search">
            <i class="fas fa-search"></i>
        </div>
    </div>
    <div class="img-container">
        <div
            class="img"
            style="background-image: url(./image-data/${data[i].imgSrc}.png)"
        ></div>
    </div>
    <div class="text">
        <h1 class="name">${data[i].name}</h1>
        <div class="sub-text">
            <p class="number">${data[i].admission}기 입학/ ${
        data[i].graduated
    }회 졸업</p>
            <p class="live-in">${data[i].liveIn}</p>
        </div>
        <p class="prayer-topic">
            ${data[i].prayerTopic}
        </p>
    </div>
</div>
</div>
    `;
    cards[i] = card;
    const newArray = cards.join('');
    wrapper.innerHTML = newArray;
}

for (let i = 0; i < dataLength; i++) {
    setCard(i);
}

window.addEventListener('touchstart', (e) => {
    x = e.touches[0].clientX;
});
window.addEventListener('touchend', (e) => {
    cx = e.changedTouches[0].clientX;

    if (cx - x < 50 && cx - x !== 0) {
        index++;
        if (index > dataLength - 1) {
            index = dataLength - 1;
        }
    } else if (cx - x > -50 && cx - x !== 0) {
        index--;
        if (index < 0) {
            index = 0;
        }
    } else if (cx - x === 0) {
        index = index;
    }
    if (index > 0) {
        if (cardItem[index - 1].classList.contains('active')) {
            cardItem[index - 1].classList.remove('active');
        }
    }
    if (cardItem[index + 1]) {
        if (cardItem[index + 1].classList.contains('active')) {
            cardItem[index + 1].classList.remove('active');
        }
    }

    cardItem[index].classList.add('active');
});
const cardItem = document.querySelectorAll('.card');
cardItem[index].classList.add('active');

// search click

const searchBtn = document.querySelectorAll('.search');
const searchBox = document.querySelector('.search-box');
const form = document.querySelector('.form');

for (let i = 0; i < searchBtn.length; i++) {
    searchBtn[i].addEventListener('click', () => {
        searchBox.classList.toggle('active');
    });
}
function setUserName(userName) {
    let newArray = [...data];
    newArray.map((item, i) => {
        if (item.name === userName) {
            index = i;
        }
        if (cardItem[i].classList.contains('active')) {
            cardItem[i].classList.remove('active');
        }
    });
    cardItem[index].classList.add('active');
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let userName = e.target[0].value;
    setUserName(userName);
    e.target[0].value = '';
    searchBox.classList.remove('active');
});
