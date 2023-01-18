import AbstractView from '../framework/view/abstract-view.js';
import { SortType } from '../consts.js';

const createSortTemplate = () => (
  `<ul class="sort">
      <li><a href="#" class="sort__button sort__button--active" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
      <li><a href="#" class="sort__button" data-sort-type="${SortType.DATE}">Sort by date</a></li>
      <li><a href="#" class="sort__button" data-sort-type="${SortType.RATING}">Sort by rating</a></li>
   </ul>`
);

export default class SortView extends AbstractView {
  #handleSortTypeChange = null;

  constructor({onSortTypeChange}) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortTemplate();
  }

  #sortTypeChangeHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.classList.contains('sort__button') && !evt.target.classList.contains('sort__button--active')) {
      this.#handleSortTypeChange(evt.target.dataset.sortType);
      this.element.querySelector('.sort__button--active').classList.remove('sort__button--active');
      evt.target.classList.toggle('sort__button--active');
    }
  };

}
