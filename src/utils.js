import dayjs from 'dayjs';

const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

const humanizeDate = (date, format) => date ? dayjs(date).format(format) : '';

const isEscPressed = (evt) => evt.code === 'Escape';

export { getRandomArrayElement, humanizeDate, isEscPressed };
