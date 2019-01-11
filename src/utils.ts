import url from './TWL06.txt';

let loaded = false;
let sortedWords: string[] = [];

export const loadWords = async () => {
  if (loaded) return sortedWords;

  const res = await fetch(url);
  const text = await res.text();
  const words = text.split('\n');
  words.sort();

  loaded = true;
  sortedWords = words;

  return sortedWords;
};
