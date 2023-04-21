import localForage from 'localforage';
import {
  countBy,
  curry,
  filter,
  groupBy,
  length,
  pipe,
  prop,
  reverse,
  sortBy,
  split,
} from 'ramda';

import {
  MinimalWordGraph,
  QueryBuilder,
} from '../services/word-graph';

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

export interface SolverOptions {
  input: string;
  allowMultiples: boolean;
  minLength?: number;
  maxLength?: number;
  contains?: string[];
  exclude?: string[];
  startsWith?: string;
  endsWith?: string;
}

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
  filter(isValid(rack) as any, words),
);

const clean = pipe(sortBy(prop('numChars')) as any, reverse) as any;

const wordGraph = new MinimalWordGraph();
let loaded = false;

const load = async () => {
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

const solve = async ({
  input: value,
  allowMultiples,
  maxLength,
  minLength,
  contains,
  exclude,
  startsWith,
  endsWith,
}: SolverOptions): Promise<{
  [key: number]: string[];
}> => {
  await load();

  const builder = new QueryBuilder(wordGraph);
  const rack = value.toLowerCase();
  const chars = rack.split('');

  let factory = builder
    .containsOnly(...chars)
    .minLength(minLength ? minLength : 3)
    .maxLength(maxLength ? maxLength : chars.length);

  if (contains && contains.length > 0) {
    factory = factory.containsAll(...contains);
  }

  if (exclude && exclude.length > 0) {
    factory = factory.exclude(...exclude);
  }

  if (startsWith) {
    factory = factory.startsWith(startsWith);
  }

  if (endsWith) {
    factory = factory.endsWith(endsWith);
  }

  const words: string[] = factory.build()();

  const data = groupByLength(
    allowMultiples ? words : filterValid(rack, words),
  );

  const dataArray = Object.keys(data).map((key) => {
    const numChars = parseInt(key, 10);
    return {
      numChars,
      words: data[numChars],
    };
  });

  return clean(dataArray);
};

self.onmessage = async ({ data: { load: doLoad, input } }) => {
  if (doLoad) {
    await load();
    self.postMessage({ loaded: true });
  } else if (input) {
    const result = await solve(input);
    self.postMessage({ result });
  }
};
