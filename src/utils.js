import dayjs from 'dayjs';

const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

const humanizeDate = (date, format) => date ? dayjs(date).format(format) : '';

const isEscPressed = (evt) => evt.code === 'Escape';

const isCtrlPlusEnterPressed = (evt) => evt.ctrlKey && evt.code === 'Enter';

export { getRandomArrayElement, humanizeDate, isEscPressed, isCtrlPlusEnterPressed };
