import UserRankView from './view/user-rank-view.js';
import FiltersView from './view/filters-view.js';
import SortView from './view/sort-view.js';
import QuantityStatisticsView from './view/quantity-statistics-view.js';
import FilmPopupView from './view/film-popup-view.js';
import {render} from './render.js';
import FilmsPresenter from './presenter/films-presenter.js';
import FilmsModel from './model/films-model.js';

const siteHeader = document.querySelector('.header');
const siteMain = document.querySelector('.main');
const siteFooter = document.querySelector('.footer__statistics');

const filmsModel = new FilmsModel();
const filmsPresenter = new FilmsPresenter({
  filmsContainer: siteMain,
  filmsModel
});

render(new UserRankView(), siteHeader);
render(new FiltersView(), siteMain);
render(new SortView(), siteMain);
render(new QuantityStatisticsView(), siteFooter);
render(new FilmPopupView(), document.body);

filmsPresenter.init();

