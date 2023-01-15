import { humanizeDate } from './utils';
import { FILM_CARD_DATE_FORMAT } from './consts';

const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating',
};

const sortFilmsByDate = (films) => {
  films.sort((a, b) => humanizeDate(b.filmInfo.release.date, FILM_CARD_DATE_FORMAT) - humanizeDate(a.filmInfo.release.date, FILM_CARD_DATE_FORMAT));
};

const sortFilmsByRating = (films) => {
  films.sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating);
};

const setActiveSortButton = (button) => {
  const activedButton = document.querySelector('.sort__button--active');
  activedButton.classList.remove('sort__button--active');
  button.classList.add('sort__button--active');
};

export { SortType, sortFilmsByDate, sortFilmsByRating, setActiveSortButton };
