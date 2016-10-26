import {lory} from 'lory.js';
require('./slider.scss');

class Slider {
  
  constructor() {
    // const sliders = document.querySelectorAll('.js_slider');

    // for (var slider of sliders) {
    //   this.bindEvents(slider);
    //   lory(slider, {
    //       infinite: 1,
    //       enableMouseEvents: true
    //   });
    // }

    this.slider = document.querySelector('.js_slider');
    // this.resizeSlides();
    this.bindEvents();
    this.init();

    console.log('setup complete.');

    // setTimeout(function() {
    //   carousel.destroy();
    //   console.log('carousel should be destroyed');
    //   console.log(carousel);
      
    //   setTimeout(function() {
    //     carousel.setup();
    //     console.log('carousel re setup.');
    //   }, 10000);

    // }, 10000);
  }

  init() {
    const carousel = lory(this.slider, {
      enableMouseEvents: true,
    });
    this.carousel = carousel;
  }

  bindEvents() {
    this.slider.addEventListener('before.lory.init', this.handleEvent.bind(this));
    this.slider.addEventListener('after.lory.init', this.handleEvent.bind(this));
    // this.slider.addEventListener('before.lory.slide', this.handleEvent.bind(this));
    // this.slider.addEventListener('after.lory.slide', this.handleEvent.bind(this));

    this.slider.addEventListener('on.lory.touchend', this.handleEvent.bind(this));
    // slider.addEventListener('on.lory.resize', this.handleEvent.bind(this));
    // slider.addEventListener('on.lory.touchmove', this.handleEvent.bind(this));
    // slider.addEventListener('on.lory.touchstart', this.handleEvent.bind(this));
    // slider.addEventListener('on.lory.destroy', this.handleEvent.bind(this));
  }

  handleEvent(e) {
    const slides = this.slider.querySelectorAll('.js_slide');
    const track = this.slider.querySelector('.js_slides');
    const peek = Math.floor(this.slider.offsetWidth * 0.2); 
    const width = this.slider.offsetWidth - peek;
    const padding = peek / 2;
    let transform;

    console.log('handleEvent', e.type);

    switch (e.type) {
      case 'before.lory.init':
        for (let i = 0; i < slides.length; i++) {
          slides[i].style.width = `${width}px`;
        }
        break;
        
      case 'after.lory.init':
        transform = `translate3d(${padding}px, 0, 0)`;
        this.transform(track, transform);
        break;

      case 'on.lory.touchend':
        console.log(this.carousel.returnIndex());
        console.log(track)

        if (this.carousel.returnIndex() === 0) {
          transform = `translate3d(${padding}px, 0, 0)`;
          this.transform(track, transform);
        } else {

          setTimeout(() => {
            const xPos = track.getBoundingClientRect().left - track.offsetLeft - track.parentNode.offsetLeft;
            const isLastSlide = Math.abs(xPos) > (width * this.carousel.returnIndex());
            let translateX = xPos + padding;

            if (isLastSlide) {
              translateX = (width * (slides.length - 1) - padding) * -1;
            }

            transform = `translate3d(${translateX}px, 0, 0)`;
            this.transform(track, transform);

          }, 300);
        }
        break;
    }
  }

  transform(el, value) {
    el.style.webkitTransform = value;
    el.style.mozTransform = value;
    el.style.transform = value;
  }
}

export default Slider;
