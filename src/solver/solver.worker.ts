import localForage from 'localforage';
import {
  countBy,
  curry,
  filter,
  groupBy,
  length,
  pipe,
  prop,
  memoize,
  reverse,
  sortBy,
  split,
} from 'ramda';
import { MinimalWordGraph, QueryBuilder } from '../WordGraph';

import url from './TWL06.txt';

const store = localForage.createInstance({
  name: 'twl',
});

const countChars = (w: string) => countBy(split('') as any, w as any);
const groupByLength = (
  w: string[],
): {
  [key: number]: string[];
} => groupBy(length as any, w as any) as any;

const isValid = curry((rack: string, word: string) => {
  const rackCount = countChars(rack);
  const wordCount = countChars(word);

  for (let key of Object.keys(rackCount)) {
    if (wordCount[key] > rackCount[key]) {
      return false;
    }
  }

  return true;
});

const filterValid = curry((rack: string, words: string[]) =>
  filter(isValid(rack), words),
);

const clean = pipe(
  sortBy(prop('numChars')) as any,
  reverse,
) as any;

const wordGraph = new MinimalWordGraph();
let loaded = false;

export const load = async () => {
  if (loaded) return;

  let words = await store.getItem<string[]>('words');

  if (!words) {
    const res = await fetch(url);
    const text = await res.text();
    words = text.split('\n');
    words.sort();
    await store.setItem('words', words);
  }

  words.forEach((word) => {
    wordGraph.add(word.toLowerCase());
  });

  wordGraph.makeImmutable();
  loaded = true;
};

export const solve = async (
  value: string,
): Promise<{
  [key: number]: string[];
}> => {
  await load();

  const builder = new QueryBuilder(wordGraph);
  const rack = value.toLowerCase();
  const chars = rack.split('');
  const words: string[] = builder
    .containsOnly(...chars)
    .maxLength(chars.length)
    .minLength(3)
    .build()();

  const data = groupByLength(filterValid(rack, words));

  const dataArray = Object.keys(data).map((key) => {
    const numChars = parseInt(key, 10);
    return {
      numChars,
      words: data[numChars],
    };
  });

  return clean(dataArray);
};
