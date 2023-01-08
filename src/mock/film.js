import { getRandomArrayElement } from '../utils.js';

const POSTERS = [
  'made-for-each-other.png',
  'popeye-meets-sinbad.png',
  'sagebrush-trail.jpg',
  'santa-claus-conquers-the-martians.jpg',
  'the-dance-of-life.jpg',
  'the-great-flamarion.jpg',
  'the-man-with-the-golden-arm.jpg'
];

const GENRES = [
  'comedy',
  'Musical',
  'Western',
  'drama',
  'Cartoon'
];

const EMOTIONS = [
  'smile',
  'sleeping',
  'puke',
  'angry'
];

const mockComments = [
  {
    id: 1,
    author: 'Pavel O\'Reilly',
    comment: 'a film .',
    date: '2018-05-11T16:12:32.554Z',
    emotion: getRandomArrayElement(EMOTIONS)
  },
  {
    id: 2,
    author: 'Maks',
    comment: 'a film that changed my life.',
    date: '1999-04-11T16:12:32.554Z',
    emotion: getRandomArrayElement(EMOTIONS)
  },
  {
    id: 3,
    author: 'Igor O\'Reilly',
    comment: 'a film that changed my life, a true masterpiece',
    date: '2019-02-11T16:12:32.554Z',
    emotion: getRandomArrayElement(EMOTIONS)
  },
  {
    id: 4,
    author: 'Alex O\'Reilly',
    comment: 'a film that changed my life, a true masterpiece, post-credit scene was just amazing omg.',
    date: '1997-05-11T16:12:32.554Z',
    emotion: getRandomArrayElement(EMOTIONS)
  },
  {
    id: 5,
    author: 'Ilya O',
    comment: 'a true masterpiece.',
    date: '2000-12-11T16:12:32.554Z',
    emotion: getRandomArrayElement(EMOTIONS)
  }
];

const mockFilms = [
  {
    id: 1,
    comments: [1],
    filmInfo: {
      title: 'A Little Pony Without The Carpet',
      alternativeTitle: 'Laziness Who Sold Themselves',
      totalRating: 5.1,
      poster: `images/posters/${getRandomArrayElement(POSTERS)}`,
      ageRating: 16,
      director: 'Takeshi',
      writers: [
        'Takeshi'
      ],
      actors: [
        'Morgan'
      ],
      release: {
        date: '2009-01-16T00:00:00.000Z',
      },
      duration: '55m',
      genre: getRandomArrayElement(GENRES),
      description: 'Lorem ipsum ad odit molestiae et repellat'
    },
    userDetails: {
      watchlist: false,
      alreadyWatched: false,
      favorite: false
    }
  },
  {
    id: 2,
    comments: [2, 4],
    filmInfo: {
      title: 'A The Carpet',
      alternativeTitle: 'Laziness Who Sold Themselves',
      totalRating: 1.4,
      poster: `images/posters/${getRandomArrayElement(POSTERS)}`,
      ageRating: 8,
      director: 'Ford',
      writers: [
        'Moti'
      ],
      actors: [
        'Soko'
      ],
      release: {
        date: '2015-02-21T00:00:00.000Z',
      },
      duration: '1h 55m',
      genre: getRandomArrayElement(GENRES),
      description: 'Lorem ipsum ad odit molestiae et repellat'
    },
    userDetails: {
      watchlist: false,
      alreadyWatched: true,
      favorite: false
    }
  },
  {
    id: 3,
    comments: [3, 5],
    filmInfo: {
      title: 'A The Carpet',
      alternativeTitle: 'Laziness Who Sold Themselves',
      totalRating: 7.4,
      poster: `images/posters/${getRandomArrayElement(POSTERS)}`,
      ageRating: 0,
      director: 'Tom Ford',
      writers: [
        'Kolito'
      ],
      actors: [
        'Asoti'
      ],
      release: {
        date: '2017-09-17T00:00:00.000Z',
      },
      duration: '1h 35m',
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
    id: 4,
    src: `./images/posters/${getRandomArrayElement(POSTERS)}`,
    comments: [1, 2],
    filmInfo: {
      title: 'Carpet',
      alternativeTitle: 'Laziness Who Sold Themselves',
      totalRating: 2.4,
      poster: `images/posters/${getRandomArrayElement(POSTERS)}`,
      ageRating: 12,
      director: 'Toto',
      writers: [
        'Toto'
      ],
      actors: [
        'Freeman'
      ],
      release: {
        date: '2013-03-13T00:00:00.000Z',
      },
      duration: '3h',
      genre: getRandomArrayElement(GENRES),
      description: 'Lorem ipsum ad odit'
    },
    userDetails: {
      watchlist: true,
      alreadyWatched: false,
      favorite: false
    }
  },
  {
    id: 5,
    src: `./images/posters/${getRandomArrayElement(POSTERS)}`,
    comments: [5],
    filmInfo: {
      title: 'Without The Carpet',
      alternativeTitle: 'Laziness Who Sold Themselves',
      totalRating: 5.4,
      poster: `images/posters/${getRandomArrayElement(POSTERS)}`,
      ageRating: 18,
      director: 'Tom Ford',
      writers: [
        'Takeshi'
      ],
      actors: [
        'Morgan'
      ],
      release: {
        date: '2019-05-11T00:00:00.000Z',
      },
      duration: '1h 11m',
      genre: getRandomArrayElement(GENRES),
      description: 'Lorem ipsum ad odit'
    },
    userDetails: {
      watchlist: false,
      alreadyWatched: true,
      favorite: true
    }
  },
];

const getRandomFilm = () => getRandomArrayElement(mockFilms);

export { mockComments, getRandomFilm };
