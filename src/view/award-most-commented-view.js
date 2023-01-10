import AbstractView from '../framework/view/abstract-view.js';
import FilmCardView from './film-card-view.js';

const createMostCommentedTemplate = (mostCommentedFilms) => (
  `<section class="films-list films-list--extra">
      <h2 class="films-list__title">Most commented</h2>

      <div class="films-list__container">
        ${mostCommentedFilms.map((film) => `
          ${new FilmCardView({film}).template}
        `)}
      </div>
    </section>`
);

export default class AwardMostCommentedView extends AbstractView {
  #mostCommentedFilms = null;

  constructor({mostCommentedFilms}) {
    super();
    this.#mostCommentedFilms = mostCommentedFilms;
  }

  get template() {
    return createMostCommentedTemplate(this.#mostCommentedFilms);
  }

}
