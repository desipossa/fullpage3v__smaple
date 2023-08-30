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

const SLIDE = document.querySelector('#slide_move');
const SLIDE_ITM = document.querySelectorAll('#slide_move .slide');

new fullpage('#main', {
    anchors: ['p01', 'p02', 'p03', 'p04', 'p05', 'footer'],
    css3: false,
    scrollOverflow: false, //line-height: 1에서 font-size가 box를 초과할 때 스크롤이 생기는 초기값을 false로 설정함.


    licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',

    controlArrows: false, //슬라이드 화살표 숨김
    loopHorizontal: false, //슬라이드 반복 멈춤


    afterLoad: function (origin, destination, direction, trigger) {
        // console.log(destination.index, direction);
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

        // 5번째 페이지 슬라이드에 on을 붙임.
        if (destination.index == 4) {
            SLIDE_ITM[0].classList.add('on');
        } else {
            SLIDE_ITM[0].classList.remove('on');
        }
        // else {
        //     SLIDE_ITM.forEach(it => it.classList.remove('on'));
        // }
    },

    afterSlideLoad: function (section, origin, destination, direction, trigger) {
        // console.log(destination.index, SLIDE_ITM[0]);

        SLIDE_ITM.forEach(it => it.classList.remove('on'));
        SLIDE_ITM[destination.index].classList.add('on');
    },
});



//슬라이드에 훨이벤트 달기...

SLIDE.addEventListener('wheel', (e) => {

    console.log(e, e.deltaY); // e.deltaY 100, -100

    if (e.deltaY > 0) {
        fullpage_api.moveSlideRight();
    } else {
        fullpage_api.moveSlideLeft();
    }

})

// jquery 로 만들 때...
// $("#slide").on("mousewheel", function (e) {
//     if (e.originalEvent.wheelDelta / 120 > 0) {
//         fullpage_api.moveSlideLeft();
//     }
//     else {
//         fullpage_api.moveSlideRight();
//     }
// });


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