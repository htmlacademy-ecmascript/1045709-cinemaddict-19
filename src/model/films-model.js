import Observable from '../framework/observable.js';

export default class FilmsModel extends Observable {
  #filmsApiService = null;
  #films = null;

  constructor({filmsApiService, mockFilms}) {
    super();
    this.#filmsApiService = filmsApiService;
    this.#films = mockFilms;

    this.#filmsApiService.films.then((films) => {
      console.log(films);
    });
  }

  get films() {
    return this.#films;
  }

  set films(films) {
    this.#films = films;
  }

  updateFilm(updatedType, update) {
    const index = this.#films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting film');
    }

    this.#films = [
      ...this.#films.slice(0, index),
      update,
      ...this.#films.slice(index + 1)
    ];

    this._notify(updatedType, update);
  }

}
