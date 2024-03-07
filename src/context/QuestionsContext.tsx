// * Steps to create reducer

import { createContext, useContext, useEffect, useReducer } from "react";
import {
	InitialState,
	Action,
	QuestionProviderProps,
} from "./QuestionContext.types";

// * Step 1
// * Create an instance of create context
type QContext = InitialState & {
	currentProgress: number;
	maxPointsPossible: number;
	numOfQuestions: number;
	startQuizz: () => void;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	newAnswer: (payload?: any) => void;
	finished: () => void;
	nextQuestion: () => void;
	tick: () => void;
	restart: () => void;
};

const QuestionsContext = createContext<QContext>({} as QContext);

// * Step 2
// * Create a provider

const SECS_PER_QUESTION = 30;
const initialState: InitialState = {
	questions: [],
	status: "loading",
	index: 0,
	answer: null,
	points: 0,
	highscore: 0,
	secondsRemaining: null,
};

// * When using a reducer
// * 1 Create reducer
const reducer = (state: InitialState, action: Action) => {
	switch (action.type) {
		case "received":
			return {
				...state,
				status: action.type,
				questions: action.payload,
			};
		case "start":
			return {
				...state,
				status: "active",
				secondsRemaining: state.questions.length * SECS_PER_QUESTION,
			};
		case "failed":
			return {
				...state,
				status: "Error",
			};
		case "nextQuestion":
			return {
				...state,
				index: state.index + 1,
				answer: null,
			};
		case "finished":
			return {
				...state,
				status: action.type,
				highscore:
					state.points > state.highscore ? state.points : state.highscore,
			};
		case "restart":
			return {
				...initialState,
				questions: state.questions,
				status: "active",
			};
		case "tick":
			return {
				...state,
				questions: state.questions,
				status: state.secondsRemaining === 0 ? "finished" : state.status,
				secondsRemaining: Number(state.secondsRemaining) - 1,
			};
		case "newAnswer":
			// eslint-disable-next-line no-case-declarations
			const question = state.questions[state.index];
			return {
				...state,
				answer: action.payload,
				points:
					action.payload === question.correctOption
						? Number(state.points) + Number(question.points)
						: state.points,
			};
		default:
			throw new Error("Action unknown");
	}
};
// * 2 create initial state

export function QuestionProvider({ children }: QuestionProviderProps) {
	const [
		{ questions, status, answer, index, points, highscore, secondsRemaining },
		dispatch,
	] = useReducer(reducer, initialState);

	const numOfQuestions: number = questions.length;
	const currentProgress = (index / numOfQuestions) * 100;
	const maxPointsPossible: number = questions.reduce(
		(counter: number, current: InitialState) => counter + current.points,
		0
	);

	useEffect(function () {
		async function getMeData() {
			try {
				const response = await fetch("http://localhost:5555/questions");
				const data = await response.json();
				dispatch({ type: "received", payload: data });
			} catch (error) {
				dispatch({ type: "error" });
			}
		}
		getMeData();
	}, []);

	function startQuizz() {
		dispatch({ type: "start" });
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	function newAnswer(correctOption: any) {
		// console.log(payload, "THIS IS PAY")
		dispatch({ type: "newAnswer", payload: correctOption });
	}

	function finished() {
		dispatch({ type: "finished" });
	}

	function nextQuestion() {
		dispatch({ type: "nextQuestion" });
	}
	function tick() {
		dispatch({ type: "tick" });
	}
	function restart() {
		dispatch({ type: "restart" });
	}

	return (
		<QuestionsContext.Provider
			value={{
				questions,
				status,
				answer,
				index,
				points,
				highscore,
				secondsRemaining,
				numOfQuestions,
				currentProgress,
				maxPointsPossible,
				startQuizz,
				newAnswer,
				finished,
				nextQuestion,
				tick,
				restart,
			}}
		>
			{children}
		</QuestionsContext.Provider>
	);
}

// * Step 3
export function useQuizz() {
	const context = useContext(QuestionsContext);
	if (context === undefined)
		throw new Error("Cities was used outside the cities provider");
	return context;
}
