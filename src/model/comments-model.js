import Observable from '../framework/observable.js';
import { adaptToClient } from '../service/adapter.js';

export default class CommentsModel extends Observable {
  #commentsApiService = null;
  #filmsModel = null;

  constructor({commentsApiService, filmsModel}) {
    super();
    this.#commentsApiService = commentsApiService;
    this.#filmsModel = filmsModel;
  }

  async getFilmComments(filmId) {
    return await this.#commentsApiService.getFilmComments(filmId);
  }

  async addComment(updateType, update) {
    try {
      const response = await this.#commentsApiService.addComment(update.filmId, update.commentToAdd);
      const updatedFilm = adaptToClient(response.movie);
      this.#filmsModel.updateFilmOnClient(updateType, updatedFilm);
      const newCommentResponse = response.comments[response.comments.length - 1];
      return newCommentResponse;
    } catch(err) {
      throw new Error('Can\'t add comment');
    }
  }

  async deleteComment(updateType, update) {
    try {
      this.#commentsApiService.deleteComment(update.commentToDelete.id);
      delete update.commentToDelete;
      this.#filmsModel.updateFilmOnClient(updateType, update);
    } catch(err) {
      throw new Error('Can\'t delete comment');
    }
  }
}
