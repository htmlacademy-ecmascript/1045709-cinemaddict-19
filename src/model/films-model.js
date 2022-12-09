import { getRandomFilm } from '../mock/film';

const FILMS_COUNT = 5;

export default class FilmsModel {
  films = Array.from({length: FILMS_COUNT}, getRandomFilm);

  getFilms() {
    return this.films;
  }
}
