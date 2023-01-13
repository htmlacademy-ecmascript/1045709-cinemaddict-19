export default class FilmsModel {
  #films = null;
  #comments = null;

  constructor({films, comments}) {
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
