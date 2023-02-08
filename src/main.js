import QuantityStatisticsView from './view/quantity-statistics-view.js';
import { render } from './framework/render.js';
import FilmsPresenter from './presenter/films-presenter.js';
import FilterModel from './model/filter-model.js';
import FilmsModel from './model/films-model.js';
import CommentsModel from './model/comments-model.js';
import FilmsApiService from './service/api/films-api-service.js';
import CommentsApiService from './service/api/comments-api-service.js';

const AUTHORIZATION = 'Basic tKF54Tgh3jd';
const END_POINT = 'https://19.ecmascript.pages.academy/cinemaddict';

const siteHeader = document.querySelector('.header');
const siteMain = document.querySelector('.main');
const siteFooter = document.querySelector('.footer__statistics');

const filmsModel = new FilmsModel({
  filmsApiService: new FilmsApiService(END_POINT, AUTHORIZATION)
});

const commentsModel = new CommentsModel({
  commentsApiService: new CommentsApiService(END_POINT, AUTHORIZATION),
  filmsModel
});

const filterModel = new FilterModel();

const filmsQuantity = filmsModel.films.length.toLocaleString();
const filmsPresenter = new FilmsPresenter({
  filmsContainer: siteMain,
  userRankContainer: siteHeader,
  filmsModel,
  commentsModel,
  filterModel
});

render(new QuantityStatisticsView({filmsQuantity}), siteFooter);

filmsPresenter.init();
filmsModel.init();
