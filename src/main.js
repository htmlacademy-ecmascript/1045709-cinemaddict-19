import UserRankView from './view/user-rank-view.js';
import QuantityStatisticsView from './view/quantity-statistics-view.js';
import { render } from './framework/render.js';
import { mockComments, mockFilms } from './mock/film.js';
import FilmsPresenter from './presenter/films-presenter.js';
import FilmsModel from './model/films-model.js';
import CommentsModel from './model/comments-model.js';

const siteHeader = document.querySelector('.header');
const siteMain = document.querySelector('.main');
const siteFooter = document.querySelector('.footer__statistics');

const filmsModel = new FilmsModel({
  films: mockFilms,
  comments: mockComments
});

const commentsModel = new CommentsModel({
  comments: mockComments
});

const filmsQuantity = filmsModel.films.length.toLocaleString();
const filmsPresenter = new FilmsPresenter({
  filmsContainer: siteMain,
  filmsModel,
  commentsModel
});


render(new UserRankView(), siteHeader);
render(new QuantityStatisticsView({filmsQuantity}), siteFooter);

filmsPresenter.init();
