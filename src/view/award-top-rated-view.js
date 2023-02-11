import AbstractView from '../framework/view/abstract-view.js';

const createTopRatedTemplate = () => (
  `<section class="films-list films-list--extra">
      <h2 class="films-list__title">Top rated</h2>

      <div class="films-list__container">
      </div>
    </section>`
);

export default class AwardTopRatedView extends AbstractView {
  #topRatedFilmList = this.element.querySelector('.films-list__container');

  constructor({topRatedFilmsComponents}) {
    super();
    topRatedFilmsComponents.forEach((filmComponent) => {
      this.#topRatedFilmList.appendChild(filmComponent.element);
    });
  }

  get template() {
    return createTopRatedTemplate();
  }

}
