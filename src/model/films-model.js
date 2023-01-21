import Observable from '../framework/observable.js';

export default class FilmsModel extends Observable {
  #films = null;
  #comments = null;

  constructor({films, comments}) {
    super();
    this.#films = films;
    this.#comments = comments;
  }

  get films() {
    return this.#films;
  }

  get comments() {
    return this.#comments;
  }
}
