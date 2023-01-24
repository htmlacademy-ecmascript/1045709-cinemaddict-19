import { remove, render } from '../framework/render.js';
import { UpdateType, UserAction, SortType, DEFAULT_RENDERED_FILMS_QUANTITY, FILMS_TO_RENDER_QUANTITY, FILM_CARD_DATE_FORMAT} from '../consts';
import { humanizeDate } from '../utils.js';
import FilmSectionView from '../view/film-section-view.js';
import FilmListContainerView from '../view/film-list-container-view.js';
import FilmListView from '../view/film-list-view.js';
import EmptyFilmListView from '../view/empty-film-list-view.js';
import SortView from '../view/sort-view.js';
import ShowMoreBtnView from '../view/show-more-btn-view.js';
import FiltersPresenter from './films-filters-presenter.js';
import FilmPresenter from './film-presenter.js';
import AwardedFilmsPresenter from './awarded-films-presenter.js';

export default class FilmListPresenter {
  #filmSectionComponent = new FilmSectionView();
  #filmListComponent = new FilmListView();
  #filmListContainerComponent = new FilmListContainerView();
  #sortComponent = null;
  #filmShowMoreBtnComponent = null;
  #filmsContainer = null;
  #filmsModel = null;
  #commentsModel = null;
  #filterModel = null;

  #renderedFilmsCollection = this.#filmListContainerComponent.element.children;
  #filmPresenter = new Map();
  #filtersPresenter = null;
  #currentSortType = SortType.DEFAULT;

  constructor({filmsContainer, filmsModel, commentsModel, filterModel}) {
    this.#filmsContainer = filmsContainer;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
    this.#filterModel = filterModel;

    this.#filmsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get films() {
    const filterType = this.#filterModel.filter;
    const filteredFilms = this.#filtersPresenter.filters[filterType].filteredFilms;

    switch (this.#currentSortType) {
      case SortType.DATE:
        return filteredFilms.sort((a, b) => humanizeDate(b.filmInfo.release.date, FILM_CARD_DATE_FORMAT) - humanizeDate(a.filmInfo.release.date, FILM_CARD_DATE_FORMAT));
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
    if (this.films.length === 0) {
      this.#renderFilmsContainers();
      this.#renderEmptyFilmList();
      return;
    }
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
    const filmsToRender = this.films;
    const renderedFilmsQuantity = this.#renderedFilmsCollection.length;
    for (let i = renderedFilmsQuantity; i < renderedFilmsQuantity + toRenderQuantity; i++) {
      this.#renderFilm(filmsToRender[i]);
      const isLastFilm = !filmsToRender[this.#renderedFilmsCollection.length];
      if (isLastFilm) {
        remove(this.#filmShowMoreBtnComponent);
        return;
      }
    }
  }

  #renderFilm(film) {
    const filmPresenter = new FilmPresenter({
      filmListContainer: this.#filmListContainerComponent.element,
      onDataChange: this.#handleViewAction
    });
    filmPresenter.init(film, this.comments);
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
    render(new EmptyFilmListView({
      filters: this.#filtersPresenter.filters,
      activeFilter: this.#filtersPresenter.activeFilter
    }), this.#filmSectionComponent.element);
  }

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
    if (actionType === UserAction.UPDATE_FILM) {
      this.#filmsModel.updateFilm(updateType, update);
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#filmPresenter.get(data.id).init(data, this.comments);
        break;
      case UpdateType.MINOR:
        this.clearFilmList();
        this.renderFilms(DEFAULT_RENDERED_FILMS_QUANTITY);
        break;
      case UpdateType.MAJOR:
        this.clearFilmList({resetSortType: true});
        this.renderFilms(DEFAULT_RENDERED_FILMS_QUANTITY);
        break;
    }
  };

}
