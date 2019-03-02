import {
  useCallback,
  useEffect,
  useState,
  useRef,
  useReducer,
} from 'react';
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

const storageKey = '@solver.persist';

type Action =
  | { type: 'SET_RESULTS'; payload: Result }
  | { type: 'REMOVE_WORD'; payload: string }
  | { type: 'QUERY' }
  | { type: 'CLEAR' };

interface State {
  status: 'loading' | 'idle';
  groups: Result;
}

const solverReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_RESULTS': {
      return {
        status: 'idle',
        groups: action.payload,
      };
    }
    case 'REMOVE_WORD': {
      return {
        ...state,
        groups: state.groups.map((group) => {
          return {
            ...group,
            words: group.words.filter((w) => w !== action.payload),
          };
        }),
      };
    }
    case 'QUERY': {
      return {
        ...state,
        status: 'loading',
      };
    }
    default: {
      return state;
    }
  }
};

const initialState: State = {
  status: 'idle',
  groups: [],
};

export const useQuery = (value: string): Output => {
  const [state, dispatch] = useReducer(solverReducer, initialState);

  const setResult = useCallback(
    (payload: Result) => {
      dispatch({
        type: 'SET_RESULTS',
        payload,
      });
    },
    [dispatch],
  );

  const setLoading = useCallback(
    () =>
      dispatch({
        type: 'QUERY',
      }),
    [dispatch],
  );

  const [loaded, setLoaded] = useState(false);

  const debounce = useRef<any>(null);

  useEffect(() => {
    const cached = localStorage.getItem(storageKey);
    if (cached) {
      setResult(JSON.parse(cached));
    }
  }, []);

  useEffect(() => {
    worker.load().then(() => {
      setLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (!value) return;

    if (debounce.current) {
      clearTimeout(debounce.current);
    }

    setLoading();

    debounce.current = setTimeout(() => {
      worker.solve(value).then((data: any) => {
        setResult(data);
        localStorage.setItem(storageKey, JSON.stringify(data));
      });
    }, 140);
  }, [value]);

  return {
    loaded,
    loading: state.status === 'loading',
    data: state.groups,
  };
};
