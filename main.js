import data from './data.js';

const wrapper = document.querySelector('.wrapper');
let cards = [];
let index = 0;
let x = 0;
let cx = 0;
let userData = [...data];

let dataLength = userData.length;

// home
const homeBtn = document.querySelector('.home');
const homePage = document.querySelector('.home-wrapper');
const pageBtn = document.querySelector('.home-container');
homeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    homePage.classList.remove('active');
    userData = [...data];
});
pageBtn.addEventListener('click', (e) => {
    userData = [];
    index = 0;
    let target = e.target;
    let seoul = [];
    let chungcheong = [];
    let gwangju = [];
    let deagu = [];
    let busan = [];
    let global = [];
    data.map((item) => {
        if (
            item.liveIn.includes('서울') ||
            item.liveIn.includes('경기') ||
            item.liveIn.includes('인천')
        ) {
            seoul.push(item);
        } else if (item.liveIn.includes('충청')) {
            chungcheong.push(item);
        } else if (item.liveIn.includes('호남')) {
            gwangju.push(item);
        } else if (item.liveIn.includes('대경')) {
            deagu.push(item);
        } else if (item.liveIn.includes('부경')) {
            busan.push(item);
        } else if (item.liveIn.includes('237')) {
            global.push(item);
        }
    });
    while (!target.classList.contains('area')) {
        target = target.parentNode;
    }
    if (target.classList.contains('area')) {
        homePage.classList.add('active');
        switch (target.dataset.area) {
            case '전체':
                userData = [...data];
                break;
            case '서경인':
                userData = [...seoul];
                break;
            case '충청':
                userData = [...chungcheong];
                break;
            case '대경':
                userData = [...deagu];
                break;
            case '호남':
                userData = [...gwangju];
                break;
            case '부경':
                userData = [...busan];
                break;
            case '237':
                userData = [...global];
                break;
        }
        dataLength = userData.length;
        setCard();
    }
});

// cardsection
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
        if (userData[i].imgSrc !== 'none') {
            userData[i].imgSrc = data[i].name;
        }
        if (userData[i].admission === '') {
            userData[i].admission = '-';
        }
        if (userData[i].graduated === '') {
            userData[i].graduated = '-';
        }
        if (userData[i].liveIn === '') {
            userData[i].liveIn = '-';
        }
        if (userData[i].prayerTopic === '') {
            userData[i].prayerTopic = '-';
        }
    }
}
function setCard() {
    img.style.backgroundImage = `url(./image-data/${userData[index].imgSrc}.png)`;
    name.innerHTML = userData[index].name;
    number.innerHTML = `${userData[index].admission}기 입학/ ${userData[index].graduated}회 졸업`;
    liveIn.innerHTML = userData[index].liveIn;
    prayerTopic.innerHTML = userData[index].prayerTopic;
}
window.addEventListener('load', () => {
    document.body.classList.add('active');
    setInit();
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
    if (homePage.classList.contains('active')) {
        setCard();
    }
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
    let newArray = [...userData];
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
    description.innerHTML = '';
});

// intro

const intro = document.querySelector('.intro');

window.addEventListener('load', () => {
    setTimeout(() => {
        intro.classList.add('active');
    }, 2000);
});
