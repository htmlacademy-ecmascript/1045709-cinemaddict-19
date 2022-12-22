import { mockComments, getRandomFilm } from '../mock/film.js';

const FILMS_COUNT = 5;

export default class FilmsModel {
  #films = Array.from({length: FILMS_COUNT}, getRandomFilm);
  #comments = mockComments;

  get films() {
    return this.#films;
  }

  get comments() {
    return this.#comments;
  }
}
