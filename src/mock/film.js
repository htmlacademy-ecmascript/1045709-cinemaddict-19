import { getRandomArrayElement } from '../utils.js';
import { COMMENTS_EMOTIONS } from '../consts.js';

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

const mockComments = [
  {
    id: 1,
    author: 'Pavel O\'Reilly',
    comment: 'a film .',
    date: '2023-01-18T16:12:32.554Z',
    emotion: getRandomArrayElement(COMMENTS_EMOTIONS)
  },
  {
    id: 2,
    author: 'Maks',
    comment: 'a film that changed my life.',
    date: '2023-01-20T15:57:32.554Z',
    emotion: getRandomArrayElement(COMMENTS_EMOTIONS)
  },
  {
    id: 3,
    author: 'Igor O\'Reilly',
    comment: 'a film that changed my life, a true masterpiece',
    date: '2019-02-11T16:12:32.554Z',
    emotion: getRandomArrayElement(COMMENTS_EMOTIONS)
  },
  {
    id: 4,
    author: 'Alex O\'Reilly',
    comment: 'a film that changed my life, a true masterpiece, post-credit scene was just amazing omg.',
    date: '1997-05-11T16:12:32.554Z',
    emotion: getRandomArrayElement(COMMENTS_EMOTIONS)
  },
  {
    id: 5,
    author: 'Ilya O',
    comment: 'a true masterpiece.',
    date: '2000-12-11T16:12:32.554Z',
    emotion: getRandomArrayElement(COMMENTS_EMOTIONS)
  },
  {
    id: 6,
    author: 'six',
    comment: '6 comment.',
    date: '2000-06-11T16:12:32.554Z',
    emotion: getRandomArrayElement(COMMENTS_EMOTIONS)
  },
  {
    id: 7,
    author: 'seven',
    comment: '7 comment.',
    date: '2004-07-11T16:12:32.554Z',
    emotion: getRandomArrayElement(COMMENTS_EMOTIONS)
  },
  {
    id: 8,
    author: 'eight',
    comment: '8 comment.',
    date: '2016-10-11T16:12:32.554Z',
    emotion: getRandomArrayElement(COMMENTS_EMOTIONS)
  },
  {
    id: 9,
    author: 'nine',
    comment: '9 comment.',
    date: '2020-11-11T16:12:32.554Z',
    emotion: getRandomArrayElement(COMMENTS_EMOTIONS)
  },
  {
    id: 10,
    author: 'ten',
    comment: '10 comment.',
    date: '2021-05-11T16:12:32.554Z',
    emotion: getRandomArrayElement(COMMENTS_EMOTIONS)
  },
  {
    id: 11,
    author: 'no',
    comment: 'test 11.',
    date: '2007-12-11T16:12:32.554Z',
    emotion: getRandomArrayElement(COMMENTS_EMOTIONS)
  },
  {
    id: 12,
    author: 'no',
    comment: 'test 12.',
    date: '2005-12-11T16:12:32.554Z',
    emotion: getRandomArrayElement(COMMENTS_EMOTIONS)
  },
  {
    id: 13,
    author: 'no',
    comment: 'test 13.',
    date: '2003-12-11T16:12:32.554Z',
    emotion: getRandomArrayElement(COMMENTS_EMOTIONS)
  }
];

const mockFilms = [
  {
    id: 1,
    comments: [1, 2],
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
    comments: [3, 4],
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
    comments: [5, 6],
    filmInfo: {
      title: 'Carpet Second',
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
    comments: [7, 8],
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
    comments: [9, 10],
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
  {
    id: 6,
    src: `./images/posters/${getRandomArrayElement(POSTERS)}`,
    comments: [11, 12, 13],
    filmInfo: {
      title: 'Test',
      alternativeTitle: 'test film',
      totalRating: 6.1,
      poster: `images/posters/${getRandomArrayElement(POSTERS)}`,
      ageRating: 9,
      director: 'Nob',
      writers: [
        'Takeshi'
      ],
      actors: [
        'Morgan'
      ],
      release: {
        date: '1976-05-11T00:00:00.000Z',
      },
      duration: '2h 26m',
      genre: getRandomArrayElement(GENRES),
      description: 'Description'
    },
    userDetails: {
      watchlist: false,
      alreadyWatched: true,
      favorite: true
    }
  },
];

export { mockComments, mockFilms };
