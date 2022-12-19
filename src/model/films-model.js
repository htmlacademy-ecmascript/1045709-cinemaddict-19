import { getRandomFilm, getRandomComment } from '../mock/film.js';

const FILMS_COUNT = 5;
const COMMENTS_COUNT = 5;

export default class FilmsModel {
  #films = Array.from({length: FILMS_COUNT}, getRandomFilm);
  #comments = Array.from({length: COMMENTS_COUNT}, getRandomComment);

  get films() {
    return this.#films;
  }

  get comments() {
    return this.#comments;
  }
}
