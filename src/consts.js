const COMMENTS_EMOTIONS = [
  'smile',
  'sleeping',
  'puke',
  'angry'
];

const UserAction = {
  UPDATE_FILM: 'UPDATE_FILM',
  ADD_COMMENT: 'ADD_FILM',
  DELETE_COMMENT: 'DELETE_FILM',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

const FilterType = {
  ALL: 'all',
  WATCHLIST: 'watchlist',
  HISTORY: 'history',
  FAVORITE: 'favorites',
};

const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating',
};

const DateFormat = {
  FILM_CARD: 'YYYY',
  FILM_POPUP: 'D MMM YYYY'
};

const SHAKE_CLASS_NAME = 'shake';
const SHAKE_ANIMATION_TIMEOUT = 600;

export { COMMENTS_EMOTIONS, UserAction, UpdateType, SortType, FilterType, DateFormat, SHAKE_CLASS_NAME, SHAKE_ANIMATION_TIMEOUT };
