import {createElement} from '../render.js';

function createFilmSectionTemplate() {
  return '<section class="films"></section>';
}

export default class FilmSectionView {
  getTemplate() {
    return createFilmSectionTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
