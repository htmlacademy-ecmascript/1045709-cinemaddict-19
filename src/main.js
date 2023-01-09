import UserRankView from './view/user-rank-view.js';
import FiltersView from './view/filters-view.js';
import SortView from './view/sort-view.js';
import QuantityStatisticsView from './view/quantity-statistics-view.js';
import { render } from './framework/render.js';
import { generateFilmFilters } from './filters.js';
import FilmsPresenter from './presenter/films-presenter.js';
import FilmsModel from './model/films-model.js';

const siteHeader = document.querySelector('.header');
const siteMain = document.querySelector('.main');
const siteFooter = document.querySelector('.footer__statistics');

const filmsModel = new FilmsModel();
const filmFilters = generateFilmFilters(filmsModel.films);
const filmsQuantity = filmsModel.films.length.toLocaleString();
const filmsPresenter = new FilmsPresenter({
  filmsContainer: siteMain,
  filmsModel,
  filmFilters
});


render(new UserRankView(), siteHeader);
render(new FiltersView({filmFilters}), siteMain);
render(new SortView(), siteMain);
render(new QuantityStatisticsView({filmsQuantity}), siteFooter);

filmsPresenter.init();
