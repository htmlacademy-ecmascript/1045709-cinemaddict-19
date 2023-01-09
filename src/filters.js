const generateFilmFilters = (films) => {
  const filters = {
    all: {
      filterFilms: films,
      emptyFilmsMessage: 'There are no movies in our database'
    },
    watchlist: {
      filterFilms: [],
      emptyFilmsMessage: 'There are no movies to watch now'
    },
    history: {
      filterFilms: [],
      emptyFilmsMessage: 'There are no watched movies now'
    },
    favorites: {
      filterFilms: [],
      emptyFilmsMessage: 'There are no favorite movies now'
    }
  };

  films.forEach((film) => {
    if (film.userDetails.watchlist) {
      filters.watchlist.filterFilms.push(film);
    }
    if (film.userDetails.alreadyWatched) {
      filters.history.filterFilms.push(film);
    }
    if (film.userDetails.favorite) {
      filters.favorites.filterFilms.push(film);
    }
  });

  return filters;

};

export { generateFilmFilters };

