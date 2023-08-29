const HEADER = document.querySelector('.header');
const ASIDE = document.querySelectorAll('.m_link li');
const SECTION = document.querySelectorAll('.section');

const COVER_BTN = document.querySelector('.util');
const COVER = document.querySelector('.cover');
const COVER_A = document.querySelectorAll('.cover>ul a');

const PAGE_NAME = document.querySelector('.pagenation span');
const PAGE_NUM = document.querySelector('.pagenation strong');
const PAGE_BG = document.querySelector('.pagenation .bg');

const LIST_NAME = ['intro', 'portfolio01', 'portfolio02', 'portfolio03']
const LIST_COLOR = ['#fff', '#f00', 'tomato', '#333'];

new fullpage('#main', {
    anchors: ['p01', 'p02', 'p03', 'footer'],
    css3: false,
    scrollOverflow: false, //line-height: 1에서 font-size가 box를 초과할 때 스크롤이 생기는 초기값을 false로 설정함.

    afterLoad: function (origin, destination, direction, trigger) {
        console.log(destination.index, direction);
        ASIDE.forEach(it => it.classList.remove('on'));
        ASIDE[destination.index].classList.add('on');
        SECTION.forEach(it => it.classList.remove('on'));
        SECTION[destination.index].classList.add('on');

        PAGE_NUM.innerHTML = destination.index;
        PAGE_NAME.innerHTML = LIST_NAME[destination.index];
        PAGE_NAME.style.color = LIST_COLOR[destination.index];
        PAGE_BG.style.backgroundImage = `url(../images/bg0${destination.index + 1}.png)`;

        if (destination.index > 0) {
            HEADER.classList.add('on');
        } else {
            HEADER.classList.remove('on');
        }

        if (direction == 'up') {
            HEADER.classList.remove('on');
        }
    },
});


COVER_BTN.addEventListener('click', function (e) {
    e.currentTarget.classList.toggle('on');
    //this.classList.toggle('on');
    COVER.classList.toggle('on');
});

COVER_A.forEach((lnk, idx) => {
    lnk.addEventListener('click', () => {
        COVER.classList.remove('on');
        COVER_BTN.classList.remove('on');
        console.log(idx);
    });
});

COVER.addEventListener('wheel', e => {
    //e.preventDefault(); 이벤트 자체를 막음
    e.stopPropagation(); // 이벤트의 전파를 막음.
    console.log(e.deltaY) // 방향이 찍힌다. 
});