import Observable from '../framework/observable.js';
import { adaptToClient } from '../service/adapter.js';
import { UpdateType } from '../consts.js';

export default class FilmsModel extends Observable {
  #filmsApiService = null;
  #films = [];

  constructor({filmsApiService}) {
    super();
    this.#filmsApiService = filmsApiService;
  }

  get films() {
    return this.#films;
  }

  async init() {
    try {
      const films = await this.#filmsApiService.films;
      this.#films = films.map(adaptToClient);
    } catch(err) {
      this.#films = [];
    }

    this._notify(UpdateType.INIT);
  }


  async updateFilm(updateType, update) {
    try {
      const response = await this.#filmsApiService.updateFilm(update);
      const updatedFilm = adaptToClient(response);
      this.updateFilmOnClient(updateType, updatedFilm);
    } catch(err) {
      throw new Error('Can\'t update film');
    }
  }

  updateFilmOnClient(updateType, updatedFilm) {
    const index = this.#films.findIndex((film) => film.id === updatedFilm.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting film');
    }

    this.#films = [
      ...this.#films.slice(0, index),
      updatedFilm,
      ...this.#films.slice(index + 1),
    ];

    this._notify(updateType, updatedFilm);
  }

}
