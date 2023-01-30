import AbstractView from '../framework/view/abstract-view.js';

function createNoFilmsTemplate() {
  return (
    `<p class="films-list__no-films">
      Loading...
    </p>`
  );
}

export default class LoadingView extends AbstractView {
  get template() {
    return createNoFilmsTemplate();
  }
}
