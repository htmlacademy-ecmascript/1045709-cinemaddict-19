import FilmsPresenter from './presenter/films-presenter.js';
import FilterModel from './model/filter-model.js';
import FilmsModel from './model/films-model.js';
import CommentsModel from './model/comments-model.js';
import FilmsApiService from './service/api/films-api-service.js';
import CommentsApiService from './service/api/comments-api-service.js';

const AUTHORIZATION = 'Basic tKF54Tgh3jd';
const END_POINT = 'https://19.ecmascript.pages.academy/cinemaddict';

const siteMain = document.querySelector('.main');

const filmsModel = new FilmsModel({
  filmsApiService: new FilmsApiService(END_POINT, AUTHORIZATION)
});

const commentsModel = new CommentsModel({
  commentsApiService: new CommentsApiService(END_POINT, AUTHORIZATION),
  filmsModel
});

const filterModel = new FilterModel();

const filmsPresenter = new FilmsPresenter({
  filmsContainer: siteMain,
  filmsModel,
  commentsModel,
  filterModel
});

filmsPresenter.init();
filmsModel.init();
