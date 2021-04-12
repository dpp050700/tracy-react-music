/* eslint-disable func-names */
export const debounce = (func, delay) => {
  let timer;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(this, args);
      clearTimeout(timer);
    }, delay);
  };
};

export const getSongUrl = id => {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
};

export const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const shuffle = list => {
  const newArr = [...list];
  list.forEach((item, index) => {
    const randomIndex = getRandomNumber(0, index);
    const i = item;
    newArr[index] = list[randomIndex];
    newArr[randomIndex] = i;
  });
  return newArr;
};

export const getPlayTimeByPercent = (percent, total = 0) => {
  const time = (percent * total) / 1000;
  const minute = Math.floor(time / 60);
  const second = (time % 60).toFixed().toString().padStart(2, '0');
  return `${minute}:${second}`;
};
