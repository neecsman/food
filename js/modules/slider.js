  //Slieder

function slider({container, slides, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    const slide = document.querySelectorAll(slides),
        slider = document.querySelector(container),
        nextSlide = document.querySelector(nextArrow),
        prevSlide = document.querySelector(prevArrow),
        current = document.querySelector(currentCounter),
        total = document.querySelector(totalCounter),
        slideWrapper = document.querySelector(wrapper),
        slideField = document.querySelector(field),
        width = window.getComputedStyle(slideWrapper).width;

    let slideIndex = 1;
    let offset = 0;

    if (slide.length < 10) {
        total.textContent = `0${slide.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slide.length;
        current.textContent = slideIndex;
    }

    slideField.style.width = 100 * slide.length + '%';

    slideField.style.display = 'flex';
    slideField.style.transition = '0.5s all';
    slideWrapper.style.overflow = 'hidden';

    slide.forEach(item => {
        item.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
            dots = [];

            
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
            position: absolute;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 15;
            display: flex;
            justify-content: center;
            margin-right: 15%;
            margin-left: 15%;
            list-style: none;
    `;

    slider.append(indicators);

    for (let i = 0; i < slide.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;

        if (i == 0) {
            dot.style.opacity = '1';
        }
        indicators.append(dot);
        dots.push(dot);
    }

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }

    nextSlide.addEventListener('click', () => {
        if (offset == deleteNotDigits(width) * (slide.length - 1)) {
            offset = 0;
        } else {
            offset += deleteNotDigits(width);
        }

        slideField.style.transform = `translateX(-${offset}px)`;

        if(slideIndex == slide.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        if(slide.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1]. style.opacity = 1;
    });

    prevSlide.addEventListener('click', () => {
        if (offset == 0) {  
            offset = deleteNotDigits(width) * (slide.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }
        
        slideField.style.transform = `translateX(-${offset}px)`;


        if(slideIndex == 1) {
            slideIndex = slide.length;
        } else {
            slideIndex--;
        }

        if(slide.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1]. style.opacity = 1;
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1);

            slideField.style.transform = `translateX(-${offset}px)`;

            if(slide.length < 10) {
                current.textContent = `0${slideIndex}`;
            } else {
                current.textContent = slideIndex;
            }

            dots.forEach(dot => dot.style.opacity = '.5');
            dots[slideIndex - 1]. style.opacity = 1;
        });
    });
}

export default  slider;