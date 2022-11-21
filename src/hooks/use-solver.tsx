import {
	useCallback,
	useEffect,
	useState,
	useRef,
	useReducer,
} from 'react';

import { useStore } from '../store';

import { solver } from '../solver/solver';
import type { SolverOptions } from '../solver/worker';

interface WordGroup {
	numChars: number;
	words: string[];
}

type Result = WordGroup[];

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
				...state,
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

export function useSolver(
	contains: string,
	excludes: string,
	startsWith: string,
	endsWith: string,
) {
	const [state, dispatch] = useReducer(solverReducer, initialState);
	const temp = useRef<any>(null);

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
		solver.load().then(() => {
			setLoaded(true);
		});
	}, []);

	const { allowMultiples, minLength, maxLength } = useStore(
		({ state }) => ({
			allowMultiples: state.allowMultiple,
			minLength: state.minLength || undefined,
			maxLength: state.maxLength || undefined,
		}),
	);

	useEffect(() => {
		if (!contains && !excludes) return;

		let query: SolverOptions = {
			input: 'qwertyuiopasdfghjklzxcvbnm',
			allowMultiples,
			contains: contains.split(''),
			exclude: excludes.split(''),
			minLength,
			maxLength,
			startsWith,
			endsWith,
		};

		if (!loaded) {
			return;
		}

		if (loaded && temp.current) {
			query.input = temp.current;
			temp.current = null;
		}

		if (debounce.current) {
			clearTimeout(debounce.current);
		}

		setLoading();

		debounce.current = setTimeout(() => {
			solver.solve(query).then((data) => {
				setResult(data.result);
				localStorage.setItem(storageKey, JSON.stringify(data.result));
			});
		}, 140);
	}, [
		loaded,
		allowMultiples,
		contains,
		excludes,
		minLength,
		maxLength,
		startsWith,
		endsWith,
	]);

	return {
		loaded,
		loading: state.status === 'loading',
		data: state.groups,
	} as const;
}
