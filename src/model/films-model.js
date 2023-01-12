import { mockComments, mockFilms } from '../mock/film.js';

export default class FilmsModel {
  #films = Array.from(mockFilms);
  #comments = mockComments;

  get films() {
    return this.#films;
  }

  get comments() {
    return this.#comments;
  }
}
