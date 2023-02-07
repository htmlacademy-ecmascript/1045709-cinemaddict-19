import dayjs from 'dayjs';

const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

const getTimeFromMins = (minutes) => `${Math.trunc(minutes / 60)}h ${minutes % 60}m`;

const humanizeDate = (date, format) => date ? dayjs(date).format(format) : '';

const isEscPressed = (evt) => evt.code === 'Escape';

const isCtrlPlusEnterPressed = (evt) => evt.ctrlKey && evt.code === 'Enter';

export { getRandomArrayElement, getTimeFromMins, humanizeDate, isEscPressed, isCtrlPlusEnterPressed };
