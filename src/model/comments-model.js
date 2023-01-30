import Observable from '../framework/observable.js';

export default class CommentsModel extends Observable {
  #commentsApiService = null;
  #comments = [];

  constructor({commentsApiService}) {
    super();
    this.#commentsApiService = commentsApiService;
  }

  async getFilmComments(filmId) {
    return await this.#commentsApiService.getFilmComments(filmId);
  }

  async addComment(updateType, update) {
    try {
      const newComment = await this.#commentsApiService.addComment(update.id, update.commentToAdd);
      this.#comments = [...this.#comments, newComment];
      delete update.commentToAdd;
      this._notify(updateType, update);
    } catch(err) {
      throw new Error('Can\'t add comment');
    }
  }

  async deleteComment(updateType, update) {
    try {
      await this.#commentsApiService.deleteComment(update.commentToDelete.id);
      this.#comments = this.#comments.filter((comment) => comment.id !== update.commentToDelete.id);
      delete update.commentToDelete;
      this._notify(updateType, update);
    } catch(err) {
      throw new Error('Can\'t delete comment');
    }
  }
}
