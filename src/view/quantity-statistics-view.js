import AbstractView from '../framework/view/abstract-view.js';

const createStatisticTemplate = () => '<p>130 291 movies inside</p>';

export default class QuantityStatisticsView extends AbstractView {

  get template() {
    return createStatisticTemplate();
  }

}
