import { render, replace, remove } from './framework/render.js';
import dayjs from 'dayjs';

const renderUpdatingComponent = (container, component, prevComponent) => {
  if (prevComponent === null) {
    render(component, container);
    return;
  }

  if (container.contains(prevComponent.element)) {
    replace(component, prevComponent);
  }

  remove(prevComponent);
};

const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

const getTimeFromMins = (minutes) => `${Math.trunc(minutes / 60)}h ${minutes % 60}m`;

const humanizeDate = (date, format) => date ? dayjs(date).format(format) : '';

const isEscPressed = (evt) => evt.code === 'Escape';

const isCtrlPlusEnterPressed = (evt) => evt.ctrlKey && evt.code === 'Enter';

export { renderUpdatingComponent, getRandomArrayElement, getTimeFromMins, humanizeDate, isEscPressed, isCtrlPlusEnterPressed };
