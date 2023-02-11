import { remove, render, RenderPosition } from '../framework/render.js';
import { UpdateType, UserAction, SortType, DateFormat} from '../consts';
import { humanizeDate } from '../utils.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import FilmSectionView from '../view/film-section-view.js';
import FilmListContainerView from '../view/film-list-container-view.js';
import FilmListView from '../view/film-list-view.js';
import EmptyFilmListView from '../view/empty-film-list-view.js';
import LoadingView from '../view/loading-view.js';
import SortView from '../view/sort-view.js';
import ShowMoreBtnView from '../view/show-more-btn-view.js';
import QuantityStatisticsView from '../view/quantity-statistics-view.js';
import FiltersPresenter from './filters-presenter.js';
import FilmPresenter from './film-presenter.js';
import AwardedFilmListPresenter from './awarded-film-list-presenter.js';

const DEFAULT_RENDERED_FILMS_QUANTITY = 5;
const FILMS_TO_RENDER_QUANTITY = 5;
const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

const userRankContainer = document.querySelector('.header');
const quantityStatisticsContainer = document.querySelector('.footer__statistics');

export default class FilmListPresenter {
  #filmSectionComponent = new FilmSectionView();
  #filmListComponent = new FilmListView();
  #filmListContainerComponent = new FilmListContainerView();
  #loadingComponent = new LoadingView();
  #sortComponent = null;
  #showMoreBtnComponent = null;
  #emptyListComponent = null;
  #filmsContainer = null;
  #filmsModel = null;
  #commentsModel = null;
  #filterModel = null;

  #filmPresenters = new Map();
  #filtersPresenter = null;
  #awardedFilmListPresenter = null;
  #currentSortType = SortType.DEFAULT;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

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
    this.#renderSort();
    this.#renderFilmsContainers();
    this.#renderLoading();
  }

  clearFilmList({resetSortType = false} = {}) {
    this.#filmPresenters.forEach((presenter) => presenter.destroy());
    this.#filmPresenters.clear();

    this.#sortComponent.element.style.display = 'flex';

    remove(this.#showMoreBtnComponent);
    this.#renderShowMoreBtn();

    remove(this.#emptyListComponent);
    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
      this.#setActiveSortButton(this.#sortComponent.element.querySelector('.sort__button[data-sort-type="default"]'));
    }
  }

  #renderFilms(toRenderQuantity) {
    const filmsToRender = this.films;
    const renderedFilmsQuantity = this.#filmListContainerComponent.element.children.length;
    if (filmsToRender.length === 0) {
      this.#renderEmptyFilmList();
      return;
    }
    for (let i = renderedFilmsQuantity; i < renderedFilmsQuantity + toRenderQuantity; i++) {
      this.#renderFilm(filmsToRender[i]);
      const isLastFilm = filmsToRender[i] === filmsToRender[filmsToRender.length - 1];
      if (isLastFilm) {
        remove(this.#showMoreBtnComponent);
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
    this.#filmPresenters.set(film.id, filmPresenter);
  }

  #renderFilters() {
    this.#filtersPresenter = new FiltersPresenter({
      filtersContainer: this.#filmsContainer,
      userRankContainer: userRankContainer,
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

  #renderEmptyFilmList() {
    this.#sortComponent.element.style.display = 'none';
    remove(this.#showMoreBtnComponent);
    this.#emptyListComponent = new EmptyFilmListView({
      filters: this.#filtersPresenter.filters,
      activeFilter: this.#filterModel.filter
    });
    render(this.#emptyListComponent, this.#filmListComponent.element);
  }

  #renderShowMoreBtn() {
    this.#showMoreBtnComponent = new ShowMoreBtnView({
      onClick: this.#handleLoadMoreButtonClick
    });
    render(this.#showMoreBtnComponent, this.#filmListComponent.element);
  }

  #renderAwardedFilms() {
    this.#awardedFilmListPresenter = new AwardedFilmListPresenter({
      awardedFilmsContainer: this.#filmSectionComponent.element,
      filmsModel: this.#filmsModel,
      commentsModel: this.#commentsModel,
      filterModel: this.#filterModel,
      onDataChange: this.#handleViewAction
    });

    this.#awardedFilmListPresenter.init();
  }

  #renderQuantityStatistics() {
    render(new QuantityStatisticsView({
      filmsQuantity: this.#filmsModel.films.length
    }), quantityStatisticsContainer);
  }

  #setActiveSortButton(button) {
    this.#sortComponent.element.querySelector('.sort__button--active').classList.remove('sort__button--active');
    button.classList.add('sort__button--active');
  }

  #handleSortTypeChange = (button, sortType) => {
    this.clearFilmList();
    this.#currentSortType = sortType;
    this.#setActiveSortButton(button);
    this.#renderFilms(DEFAULT_RENDERED_FILMS_QUANTITY);
  };

  #handleLoadMoreButtonClick = () => {
    this.#renderFilms(FILMS_TO_RENDER_QUANTITY);
  };

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        try {
          await this.#filmsModel.updateFilm(updateType, update);
          if (this.films.length === 0) {
            this.#renderEmptyFilmList();
          }
        } catch (err) {
          this.#filmPresenters.get(update.id)?.setAborting(actionType);
          this.#awardedFilmListPresenter.filmPresenters.get(update.id)?.setAborting(actionType);
        }
        break;
      case UserAction.ADD_COMMENT:
        try {
          await this.#commentsModel.addComment(updateType, update);
        } catch (error) {
          this.#filmPresenters.get(update.filmId)?.setAborting(actionType);
          this.#awardedFilmListPresenter.filmPresenters.get(update.filmId)?.setAborting(actionType);
        }
        break;
      case UserAction.DELETE_COMMENT:
        try {
          await this.#commentsModel.deleteComment(updateType, update);
        } catch (error) {
          this.#filmPresenters.get(update.id)?.setAborting(actionType);
          this.#awardedFilmListPresenter.filmPresenters.get(update.id)?.setAborting(actionType);
        }
        break;
      default:
        throw new Error(`Unknown action type: ${actionType}`);
    }

    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#filmPresenters.get(data.id)?.init(data);
        break;
      case UpdateType.MINOR:
        this.clearFilmList();
        this.#renderFilms(DEFAULT_RENDERED_FILMS_QUANTITY);
        break;
      case UpdateType.MAJOR:
        this.clearFilmList({resetSortType: true});
        this.#renderFilms(DEFAULT_RENDERED_FILMS_QUANTITY);
        break;
      case UpdateType.INIT:
        remove(this.#loadingComponent);
        this.#renderQuantityStatistics();
        if (this.films.length === 0) {
          this.#renderEmptyFilmList();
          return;
        }
        this.#renderFilms(DEFAULT_RENDERED_FILMS_QUANTITY);
        this.#renderShowMoreBtn();
        this.#renderAwardedFilms();
        break;
      default:
        throw new Error(`Unknown update type: ${updateType}`);
    }
  };

}
