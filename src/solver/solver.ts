import type { SolverOptions } from './worker';

const worker = new Worker(new URL('./worker.ts', import.meta.url), {
  type: 'module',
});

interface WordGroup {
  numChars: number;
  words: string[];
}

interface SolverResult {
  result: WordGroup[];
}

interface LoadResult {
  loaded: boolean;
}

export const solver = {
  solve: async (input: SolverOptions): Promise<SolverResult> => {
    const promise = new Promise<SolverResult>((resolve) => {
      const handleMessage = (event: MessageEvent<SolverResult>) => {
        worker.removeEventListener('message', handleMessage);
        resolve(event.data);
      };

      worker.addEventListener('message', handleMessage);
    });

    worker.postMessage({ input });
    return await promise;
  },
  load: async (): Promise<LoadResult> => {
    const promise = new Promise<LoadResult>((resolve) => {
      const handleMessage = (event: MessageEvent<LoadResult>) => {
        worker.removeEventListener('message', handleMessage);
        resolve(event.data);
      };
      worker.addEventListener('message', handleMessage);
    });
    worker.postMessage({ load: true });
    return await promise;
  },
};
