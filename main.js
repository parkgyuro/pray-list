import data from './data.js';

const dataLength = data.length;

const wrapper = document.querySelector('.wrapper');
let cards = [];
let index = 0;
let x = 0;
let cx = 0;

const img = document.querySelector('.img');
const name = document.querySelector('.name');
const number = document.querySelector('.number');
const liveIn = document.querySelector('.live-in');
const prayerTopic = document.querySelector('.prayer-topic');
// function setCard(i) {
//     if (data[i].imgSrc === 'none') {
//         data[i].imgSrc = 'none';
//     } else {
//         data[i].imgSrc = data[i].name;
//     }
//     if (data[i].admission === '') {
//         data[i].admission = '-';
//     }
//     if (data[i].graduated === '') {
//         data[i].graduated = '-';
//     }
//     if (data[i].liveIn === '') {
//         data[i].liveIn = '-';
//     }
//     if (data[i].prayerTopic === '') {
//         data[i].prayerTopic = '-';
//     }
//     let card = `
//     <div class="container">
//     <div class="card" data-index="${data[i].id - 1}">
//     <div class="nav">
//         <div class="home"><i class="fas fa-home"></i></div>
//         <div class="search">
//             <i class="fas fa-search"></i>
//         </div>
//     </div>
//     <div class="img-container">
//         <div
//             class="img"
//             style="background-image: url(./image-data/${data[i].imgSrc}.png)"
//         ></div>
//     </div>
//     <div class="text">
//         <h1 class="name">${data[i].name}</h1>
//         <div class="sub-text">
//             <p class="number">${data[i].admission}기 입학/ ${
//         data[i].graduated
//     }회 졸업</p>
//             <p class="live-in">${data[i].liveIn}</p>
//         </div>
//         <p class="prayer-topic">
//             ${data[i].prayerTopic}
//         </p>
//     </div>
// </div>
// </div>
//     `;
//     cards[i] = card;
//     const newArray = cards.join('');
//     wrapper.innerHTML = newArray;
// }

// for (let i = 0; i < dataLength; i++) {
//     setCard(i);
// }
function setInit() {
    for (let i = 0; i < dataLength; i++) {
        if (data[i].imgSrc !== 'none') {
            data[i].imgSrc = data[i].name;
        }
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
    }
}
function setCard() {
    img.style.backgroundImage = `url(./image-data/${data[index].imgSrc}.png)`;
    name.innerHTML = data[index].name;
    number.innerHTML = `${data[index].admission}기 / ${data[index].graduated}회`;
    liveIn.innerHTML = data[index].liveIn;
    prayerTopic.innerHTML = data[index].prayerTopic;
}
window.addEventListener('load', () => {
    document.body.classList.add('active');
    setInit();
    setCard();
});
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
    // if (index > 0) {
    //     if (cardItem[index - 1].classList.contains('active')) {
    //         cardItem[index - 1].classList.remove('active');
    //     }
    // }
    // if (cardItem[index + 1]) {
    //     if (cardItem[index + 1].classList.contains('active')) {
    //         cardItem[index + 1].classList.remove('active');
    //     }
    // }

    // cardItem[index].classList.add('active');
    setCard();
});
const cardItem = document.querySelector('.card');
cardItem.classList.add('active');

// search click

const searchBtn = document.querySelector('.search');
const searchBox = document.querySelector('.search-box');
const form = document.querySelector('.form');
const backBtn = document.querySelector('.back-btn');
const description = document.querySelector('.description');

// for (let i = 0; i < searchBtn.length; i++) {
//     searchBtn[i].addEventListener('click', () => {
//         searchBox.classList.toggle('active');
//     });
// }
searchBtn.addEventListener('click', () => {
    searchBox.classList.toggle('active');
});
function setUserName(userName) {
    let newArray = [...data];
    let itemName = [];
    newArray.map((item, i) => {
        // if (cardItem.classList.contains('active')) {
        //     cardItem.classList.remove('active');
        // }
        if (item.name === userName) {
            index = i;
        }
        itemName.push(item.name);
    });
    if (itemName.includes(userName)) {
        searchBox.classList.remove('active');
        description.innerHTML = '';
    } else if (userName === '') {
        description.innerHTML = '입력란을 작성해주세요.';
    } else {
        description.innerHTML = '찾으시는 이름이 없거나 올바르지 않습니다.';
    }
    setCard();
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let userName = e.target[0].value;
    setUserName(userName);
    e.target[0].value = '';
});
backBtn.addEventListener('click', (e) => {
    e.preventDefault();
    searchBox.classList.remove('active');
});

// home
