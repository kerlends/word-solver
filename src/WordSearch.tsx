import * as React from 'react';
import { MinimalWordGraph } from './WordGraph/MinimalWordGraph';
import { QueryBuilder } from './WordGraph/QueryBuilder';
import { useForm } from './useForm';
import url from './TWL06.txt';

const useBuilder = () => {
  const [builder, setBuilder] = React.useState<MinimalWordGraph | null>(null);

  React.useEffect(() => {
    fetch(url)
      .then((res) => res.text())
      .then((text) => {
        const mwg = new MinimalWordGraph();
        const words = text.split(' ');
        words.sort();
        words.forEach((word) => {
          mwg.add(word);
        });
        setBuilder(mwg);
      });
  }, []);

  return builder;
};

const WordSearch = () => {
  const builder = useBuilder();
  const [value, form] = useForm();

  React.useEffect(
    () => {
      if (value && builder) {
        const chars = value.split('');
        const result = builder.containsOnly(chars);
        alert(result);
      }
    },
    [value],
  );

  return <div>{builder ? form : <p>loading</p>}</div>;
};

export default WordSearch;
