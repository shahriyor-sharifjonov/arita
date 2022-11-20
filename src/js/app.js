import * as functions from './modules/functions.js';
import gsap from "gsap";
import 'swiped-events'

functions.isWebp();

// settings
const bgItems = document.querySelectorAll('.slide-bg__link');
const imageSlides = document.querySelectorAll('.slide-bg__inner');
const shapes = document.querySelectorAll('.shapes__content');
const shapeSlides = document.querySelectorAll('.shapes__item');
const helperInput = document.querySelector('#helper-input');
const mouse = document.querySelector('.mouse');
const slideBg = document.querySelector('.slide-bg');
const links = document.querySelectorAll('a');
const slidesCount = 5;
let slidesCounter = 1;
const easing = BezierEasing(0.770, 0.125, 0.265, 1.040);
const mainSection = document.querySelector('.main-section');

const startComplete = () => {
    imageSlides.forEach(el => { el.style.opacity = 1 })
    shapeSlides.forEach(el => { el.style.opacity = 1 })
}

const startingTl = gsap.timeline({ defaults: { ease: easing }, onComplete: startComplete })

// startAnimation
const startAnimation = () => {
    console.log('start');
    const currentSlide = document.querySelector('.slide-bg__inner--current');
    const currentShape = document.querySelector('.shapes__item--current');
    const currentText = document.querySelector('.slides-container__slide--active');

    startingTl.to('.header', 0.5, {
        opacity: 1,
        y: 0,
        delay: 0.5
    })
    .to('.main-section__explore', 0.5, {
        opacity: 1,
        y: 0,
    }, '-=0.5')
    .to(currentText.querySelector('.slides-container__title'), 0.6, {
        opacity: 1,
        y: 0,
    }, '-=0.1')
    .to(currentText.querySelector('.designers-info'), 0.6, {
        opacity: 1,
        y: 0,
    }, '-=0.4')
    .from(currentSlide, 0.4, {
        xPercent: 100
    }, '-=0.4')
    .from(currentSlide.querySelector('.slide-bg__link'), 0.4, {
        xPercent: -100
    }, '-=0.4')
    .from(currentShape, 0.6, {
        xPercent: 100
    }, '-=0.2')
    .from(currentShape.querySelector('.shapes__content'), 0.6, {
        xPercent: -100,
        delay: -0.6
    }, '-=0.2')
}

// mouse 
function moveMouse(e) {
    if (e.clientX < 5 || e.clientY < 5 || e.clientY > (window.innerHeight - 5) || e.clientX > (window.innerWidth - 5)) {
        mouse.style.opacity = 0
    } else {
        mouse.style.opacity = 1
        mouse.style.transform = `translate(${e.clientX - 15}px, ${e.clientY - 15}px)`
    }
}

// bgSlides
shapes.forEach(el => { el.style.backgroundColor = `${el.dataset.bg}` })
bgItems.forEach(el => { el.style.backgroundImage = `url(${el.dataset.bg})` })

const bgSlides = (direction) => {
    let itemClass = `slide-${slidesCounter}`;
    if(direction == 'down') {
        if(slidesCounter < slidesCount){
            mainSection.classList.remove(itemClass);
            slidesCounter++;
            itemClass = `slide-${slidesCounter}`;
            mainSection.classList.add(itemClass);
        } 
    } else if (direction == 'up') {
        if (slidesCounter > 1) {
            mainSection.classList.remove(itemClass);
            slidesCounter--;
            itemClass = `slide-${slidesCounter}`;
            mainSection.classList.add(itemClass);
        }
    }
}

const init = () => {
    window.onload = function() {
        const preloader = document.querySelector('.preloader');
        preloader.classList.add('preloader-animation');

        setTimeout(() => {
            preloader.classList.remove('preloader-animation')
            preloader.classList.add('hidden')
        }, 3000)

        setTimeout(() => {
            startAnimation();
            preloader.classList.add('preloader-none');
        }, 3200)
    }

    const showNextSlide = () => {
        // bgSlides('down');
        // console.log('next');
    }

    const showPrevSlide = () => {
        // bgSlides('up');
        // console.log('prev');
    }

    if (window.innerWidth >= 768) {
        window.addEventListener('wheel', (e) => {
            let delta = -e.deltaY;  
            if (delta > 0) {
                if(helperInput.value == '1') {
                    helperInput.value = 0;
                    showPrevSlide()
                    setTimeout(() => {
                        helperInput.value = 1
                    }, 1500);
                }
            } else {
                if(helperInput.value == '1') {
                    helperInput.value = 0;
                    showNextSlide()
                    setTimeout(() => {
                        helperInput.value = 1
                    }, 1500);
                }
            }
        })
        document.addEventListener('mousemove', moveMouse);

        slideBg.addEventListener('mouseover', () => {mouse.classList.add('view-visible')})
        slideBg.addEventListener('mouseleave', () => {mouse.classList.remove('view-visible')})

        links.forEach(link => link.addEventListener('mouseover', () => { mouse.classList.add('links-visible') }))
        links.forEach(link => link.addEventListener('mouseleave', () => { mouse.classList.remove('links-visible') }))
    } else {
        document.addEventListener('swiped-left', () => {
            showNextSlide()
        })
        document.addEventListener('swiped-right', () => {
            showPrevSlide()
        })
    }
}

init()



functions.imagesSlides();
functions.shapesSlides();
functions.textSlides();