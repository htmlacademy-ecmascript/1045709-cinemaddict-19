import Observable from '../framework/observable.js';

export default class CommentsModel extends Observable {
  #comments = null;

  constructor({comments}) {
    super();
    this.#comments = comments;
  }

  get comments() {
    return this.#comments;
  }

  addComment(updateType, update) {
    this.#comments = [...this.comments, update.commentToAdd];

    delete update.commentToAdd;

    this._notify(updateType, update);
  }

  deleteComment(updateType, update) {
    this.#comments = this.#comments.filter((comment) => comment.id !== update.commentToDelete.id);

    delete update.commentToDelete;

    this._notify(updateType, update);
  }
}
