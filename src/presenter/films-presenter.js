import { remove, render, RenderPosition } from '../framework/render.js';
import { UpdateType, UserAction, SortType, DateFormat} from '../consts';
import { humanizeDate } from '../utils.js';
import FilmSectionView from '../view/film-section-view.js';
import FilmListContainerView from '../view/film-list-container-view.js';
import FilmListView from '../view/film-list-view.js';
//import EmptyFilmListView from '../view/empty-film-list-view.js';
import LoadingView from '../view/loading-view.js';
import SortView from '../view/sort-view.js';
import ShowMoreBtnView from '../view/show-more-btn-view.js';
import FiltersPresenter from './films-filters-presenter.js';
import FilmPresenter from './film-presenter.js';
import AwardedFilmsPresenter from './awarded-films-presenter.js';

const DEFAULT_RENDERED_FILMS_QUANTITY = 5;
const FILMS_TO_RENDER_QUANTITY = 5;

export default class FilmListPresenter {
  #filmSectionComponent = new FilmSectionView();
  #filmListComponent = new FilmListView();
  #filmListContainerComponent = new FilmListContainerView();
  #loadingComponent = new LoadingView();
  #sortComponent = null;
  #filmShowMoreBtnComponent = null;
  #filmsContainer = null;
  #filmsModel = null;
  #commentsModel = null;
  #filterModel = null;

  #filmPresenter = new Map();
  #filtersPresenter = null;
  #currentSortType = SortType.DEFAULT;
  #isLoading = true;

  constructor({filmsContainer, filmsModel, commentsModel, filterModel}) {
    this.#filmsContainer = filmsContainer;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
    this.#filterModel = filterModel;

    this.#filmsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
    this.#commentsModel.addObserver(this.#handleModelEvent);
  }

  get films() {
    const filterType = this.#filterModel.filter;
    const filteredFilms = this.#filtersPresenter.filters[filterType].filteredFilms;

    switch (this.#currentSortType) {
      case SortType.DATE:
        return filteredFilms.sort((a, b) => humanizeDate(b.filmInfo.release.date, DateFormat.FILM_CARD) - humanizeDate(a.filmInfo.release.date, DateFormat.FILM_CARD));
      case SortType.RATING:
        return filteredFilms.sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating);
      default:
        return filteredFilms;
    }
  }

  get comments() {
    return this.#commentsModel.comments;
  }

  init() {
    this.#renderFilters();
    // if (this.films.length === 0) {
    //   this.#renderFilmsContainers();
    //   this.#renderEmptyFilmList();
    //   return;
    // }
    this.#renderSort();
    this.#renderFilmsContainers();
    this.renderFilms(DEFAULT_RENDERED_FILMS_QUANTITY);
    this.#renderShowMoreBtn();
    this.#renderAwardSection();
  }

  clearFilmList({resetSortType = false} = {}) {
    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();

    remove(this.#filmShowMoreBtnComponent);
    this.#renderShowMoreBtn();

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
      this.#setActiveSortButton(this.#sortComponent.element.querySelector('.sort__button[data-sort-type="default"]'));
    }
  }

  renderFilms(toRenderQuantity) {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }
    const filmsToRender = this.films;
    const renderedFilmsQuantity = this.#filmListContainerComponent.element.children.length;
    for (let i = renderedFilmsQuantity; i < renderedFilmsQuantity + toRenderQuantity; i++) {
      this.#renderFilm(filmsToRender[i]);
      const isLastFilm = filmsToRender[i] === filmsToRender[filmsToRender.length - 1];
      if (isLastFilm) {
        remove(this.#filmShowMoreBtnComponent);
        return;
      }
    }
  }

  #renderFilm(film) {
    const filmPresenter = new FilmPresenter({
      filmListContainer: this.#filmListContainerComponent.element,
      commentsModel: this.#commentsModel,
      currentFilterType: this.#filterModel.filter,
      onDataChange: this.#handleViewAction
    });
    filmPresenter.init(film);
    this.#filmPresenter.set(film.id, filmPresenter);
  }

  #renderFilters() {
    this.#filtersPresenter = new FiltersPresenter({
      filtersContainer: this.#filmsContainer,
      filterModel: this.#filterModel,
      filmsModel: this.#filmsModel
    });

    this.#filtersPresenter.init();
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#filmListComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderSort() {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange,
      currentSortType: this.#currentSortType
    });

    render(this.#sortComponent, this.#filmsContainer);
  }

  #renderFilmsContainers() {
    render(this.#filmSectionComponent, this.#filmsContainer);
    render(this.#filmListComponent, this.#filmSectionComponent.element);
    render(this.#filmListContainerComponent, this.#filmListComponent.element);
  }

  // #renderEmptyFilmList() {
  //   render(new EmptyFilmListView({
  //     filters: this.#filtersPresenter.filters,
  //     activeFilter: this.#filterModel.filter
  //   }), this.#filmSectionComponent.element);
  // }

  #renderShowMoreBtn() {
    this.#filmShowMoreBtnComponent = new ShowMoreBtnView({
      onClick: this.#handleLoadMoreButtonClick
    });
    render(this.#filmShowMoreBtnComponent, this.#filmListComponent.element);
  }

  #renderAwardSection() {
    const awardedFilmsPresenter = new AwardedFilmsPresenter({
      awardedFilmsContainer: this.#filmSectionComponent.element,
      films: this.films
    });
    awardedFilmsPresenter.init();
  }

  #setActiveSortButton(button) {
    this.#sortComponent.element.querySelector('.sort__button--active').classList.remove('sort__button--active');
    button.classList.add('sort__button--active');
  }

  #handleSortTypeChange = (button, sortType) => {
    this.clearFilmList();
    this.#currentSortType = sortType;
    this.#setActiveSortButton(button);
    this.renderFilms(DEFAULT_RENDERED_FILMS_QUANTITY);
  };

  #handleLoadMoreButtonClick = () => {
    this.renderFilms(FILMS_TO_RENDER_QUANTITY);
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this.#filmsModel.updateFilm(updateType, update);
        break;
      case UserAction.ADD_COMMENT:
        this.#filmsModel.updateFilm(updateType, update);
        this.#commentsModel.addComment(updateType, update);
        break;
      case UserAction.DELETE_COMMENT:
        this.#commentsModel.deleteComment(updateType, update);
        break;
      default:
        throw new Error(`Unknown action type: ${actionType}`);
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#filmPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.clearFilmList();
        this.renderFilms(DEFAULT_RENDERED_FILMS_QUANTITY);
        break;
      case UpdateType.MAJOR:
        this.clearFilmList({resetSortType: true});
        this.renderFilms(DEFAULT_RENDERED_FILMS_QUANTITY);
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.renderFilms(DEFAULT_RENDERED_FILMS_QUANTITY);
        break;
      default:
        throw new Error(`Unknown update type: ${updateType}`);
    }
  };

}
