import dayjs from 'dayjs';

const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

const humanizeDate = (date, format) => date ? dayjs(date).format(format) : '';

export { getRandomArrayElement, humanizeDate };
