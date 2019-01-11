import { useEffect, useState, useRef } from 'react';
import { createWorker } from './types';
import * as SolverWorker from 'workerize-loader!../solver/solver.worker';

const worker = createWorker(SolverWorker) as any;

interface WordGroup {
  numChars: number;
  words: string[];
}

type Result = WordGroup[];

interface Output {
  loading: boolean;
  loaded: boolean;
  data: Result;
}

export const useQuery = (value: string): Output => {
  const [result, setResult] = useState<Result>([]);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const debounce = useRef<any>(null);

  useEffect(() => {
    worker.load().then(() => {
      setLoaded(true);
    });
  }, []);

  useEffect(
    () => {
      if (!value) return;

      if (debounce.current) {
        clearTimeout(debounce.current);
      }

      setLoading(true);

      debounce.current = setTimeout(() => {
        worker.solve(value).then((data: any) => {
          setResult(data);
          setLoading(false);
        });
      }, 140);
    },
    [value],
  );

  return { loaded, loading, data: result };
};
