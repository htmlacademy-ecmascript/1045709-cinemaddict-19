import { getRandomArrayElement } from '../utils.js';
import { POSTERS, GENRES, EMOTIONS } from '../const.js';

const mockComments = [
  {
    id: 1,
    author: 'Ilya O\'Reilly',
    comment: 'a film .',
    date: '2019-05-11T16:12:32.554Z',
    emotion: getRandomArrayElement(EMOTIONS)
  },
  {
    id: 2,
    author: 'author',
    comment: 'a film that changed my life.',
    date: '2019-05-11T16:12:32.554Z',
    emotion: getRandomArrayElement(EMOTIONS)
  },
  {
    id: 3,
    author: 'Ilya O\'Reilly',
    comment: 'a film that changed my life, a true masterpiece',
    date: '2019-05-11T16:12:32.554Z',
    emotion: getRandomArrayElement(EMOTIONS)
  },
  {
    id: 4,
    author: 'Ilya O\'Reilly',
    comment: 'a film that changed my life, a true masterpiece, post-credit scene was just amazing omg.',
    date: '2019-05-11T16:12:32.554Z',
    emotion: getRandomArrayElement(EMOTIONS)
  },
  {
    id: 5,
    author: 'Ilya O\'Reilly',
    comment: 'a true masterpiece.',
    date: '2019-05-11T16:12:32.554Z',
    emotion: getRandomArrayElement(EMOTIONS)
  }
];

const mockFilms = [
  {
    id: 1,
    src: `./images/posters/${getRandomArrayElement(POSTERS)}`,
    mockComments: [1],
    filmInfo: {
      title: 'Title',
      rating: 5.4,
      year: 1929,
      duration: '1h 55m',
      genre: getRandomArrayElement(GENRES),
      description: 'Lorem ipsum ad odit molestiae et repellat'
    },
    userDetails: {
      watchlist: true,
      alreadyWatched: true,
      favorite: true
    }
  },
  {
    id: 2,
    src: `./images/posters/${getRandomArrayElement(POSTERS)}`,
    mockComments: [2],
    filmInfo: {
      title: 'Title',
      rating: 5.4,
      year: 1929,
      duration: '1h 55m',
      genre: getRandomArrayElement(GENRES),
      description: 'Lorem ipsum dolor, sit amet consectetur. Tenetur impedit ad odit molestiae et repellat'
    },
    userDetails: {
      watchlist: true,
      alreadyWatched: true,
      favorite: false
    }
  },
  {
    id: 3,
    src: `./images/posters/${getRandomArrayElement(POSTERS)}`,
    mockComments: [2, 3],
    filmInfo: {
      title: 'Title',
      rating: 5.4,
      year: 1929,
      duration: '1h 55m',
      genre: getRandomArrayElement(GENRES),
      description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur impedit ad odit molestiae et repellat'
    },
    userDetails: {
      watchlist: false,
      alreadyWatched: true,
      favorite: false
    }
  },
  {
    id: 4,
    src: `./images/posters/${getRandomArrayElement(POSTERS)}`,
    mockComments: [4, 5],
    filmInfo: {
      title: 'Title',
      rating: 5.4,
      year: 1929,
      duration: '1h 55m',
      genre: getRandomArrayElement(GENRES),
      description: 'Lorem ipsum dolor,  adipisicing elit. Tenetur impedit ad odit molestiae et repellat'
    },
    userDetails: {
      watchlist: false,
      alreadyWatched: false,
      favorite: false
    }
  },
  {
    id: 5,
    src: `./images/posters/${getRandomArrayElement(POSTERS)}`,
    mockComments: [5, 3],
    filmInfo: {
      title: 'Title',
      rating: 5.4,
      year: 1929,
      duration: '1h 55m',
      genre: getRandomArrayElement(GENRES),
      description: 'Lorem ipsum, sit amet consectetur adipisicing elit. et repellat'
    },
    userDetails: {
      watchlist: false,
      alreadyWatched: true,
      favorite: true
    }
  }
];

const getRandomFilm = () => getRandomArrayElement(mockFilms);

const getRandomComment = () => getRandomArrayElement(mockComments);

export { getRandomFilm, getRandomComment };
