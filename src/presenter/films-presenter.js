import {render} from '../render.js';
import FilmSectionView from '../view/film-section-view.js';
import FilmListContainerView from '../view/film-list-container-view.js';
import FilmListView from '../view/film-list-view.js';
import FilmCardView from '../view/film-card-view.js';
import ShowMoreBtnView from '../view/show-more-btn-view.js';
import TopRatedView from '../view/extra-top-rated-view.js';
import MostCommentedView from '../view/extra-most-commented-view.js';

export default class FilmsPresenter {
  filmSectionComponent = new FilmSectionView();
  filmListContainerComponent = new FilmListContainerView();
  filmListComponent = new FilmListView();

  constructor({filmsContainer}) {
    this.filmsContainer = filmsContainer;
  }

  init() {
    render(this.filmSectionComponent, this.filmsContainer);
    render(this.filmListComponent, this.filmSectionComponent.getElement());
    render(this.filmListContainerComponent, this.filmListComponent.getElement());

    for (let i = 0; i < 5; i++) {
      render(new FilmCardView(), this.filmListContainerComponent.getElement());
    }

    render(new ShowMoreBtnView(), this.filmListComponent.getElement());
    render(new TopRatedView(), this.filmSectionComponent.getElement());
    render(new MostCommentedView(), this.filmSectionComponent.getElement());
  }
}
