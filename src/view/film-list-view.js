import {createElement} from '../render.js';

function createFilmListTemplate() {
  return '<section class="films-list"></section>';
}

export default class FilmListView {
  getTemplate() {
    return createFilmListTemplate();
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
