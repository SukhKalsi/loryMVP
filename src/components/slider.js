import {lory} from 'lory.js';

class Slider {
  
  constructor() {
    const sliders = document.querySelectorAll('.js_slider');

    for (var slider of sliders) {

      this.bindEvents(slider);
      lory(slider, {
          infinite: 1,
          enableMouseEvents: true
      });
    }
  }

  bindEvents(slider) {
    slider.addEventListener('before.lory.init', this.handleEvent.bind(this));
    slider.addEventListener('after.lory.init', this.handleEvent.bind(this));
    slider.addEventListener('before.lory.slide', this.handleEvent.bind(this));
    slider.addEventListener('after.lory.slide', this.handleEvent.bind(this));

    slider.addEventListener('on.lory.resize', this.handleEvent.bind(this));
    slider.addEventListener('on.lory.touchend', this.handleEvent.bind(this));
    slider.addEventListener('on.lory.touchmove', this.handleEvent.bind(this));
    slider.addEventListener('on.lory.touchstart', this.handleEvent.bind(this));
    slider.addEventListener('on.lory.destroy', this.handleEvent.bind(this));
  }

  handleEvent(e) {
      var time = new Date();
      time = time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds() + ',' + time.getMilliseconds();
      console.log('[' + time + '] Event dispatched: "' + e.type + '"');
  }
}

export default Slider;
