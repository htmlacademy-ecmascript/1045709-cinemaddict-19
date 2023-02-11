import AbstractView from '../framework/view/abstract-view.js';

const createMostCommentedTemplate = () => (
  `<section class="films-list films-list--extra">
      <h2 class="films-list__title">Most commented</h2>

      <div class="films-list__container">
      </div>
    </section>`
);

export default class AwardMostCommentedView extends AbstractView {
  #mostCommentedFilmList = this.element.querySelector('.films-list__container');

  constructor({mostCommentedFilmsComponents}) {
    super();
    mostCommentedFilmsComponents.forEach((filmComponent) => {
      this.#mostCommentedFilmList.appendChild(filmComponent.element);
    });
  }

  get template() {
    return createMostCommentedTemplate();
  }

}
