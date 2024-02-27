import { useEffect, useReducer } from "react";
import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { Loader } from "./components/Loader";
import { Error as AppError } from "./components/Error";
import { Box, Stack } from "@chakra-ui/react";
import "./index.css";
import { StartScreen } from "./components/StartScreen";
import { Question } from "./components/Question";
import { NextButton } from "./components/NextButton";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import Timer from "./components/Timer";

type Status =
	| "received"
	| "start"
	| "failed"
	| "nextQuestion"
	| "finished"
	| "restart"
	| "error"
	| "tick"
	| "newAnswer";

type Action = {
	type: Status;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	payload?: any;
};
type InitialState = {
	questions: [];
	status: string;
	index: number;
	answer: number | null;
	points: number;
	highscore: number;
	secondsRemaining: number | null;
};
const SECS_PER_QUESTION = 30;
const initialState: InitialState = {
	questions: [],
	status: "loading",
	index: 0,
	answer: null,
	points: 0,
	highscore: 0,
	secondsRemaining: null
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reducer = (state: any, action: Action) => {
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
				secondsRemaining: state.questions.length * SECS_PER_QUESTION
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
				...initialState,
				questions: state.questions,
				status: state.secondsRemaining === 0 ?  "finished" : state.status,
				secondsRemaining : state.secondsRemaining - 1
				
			};
		case "newAnswer":
			// eslint-disable-next-line no-case-declarations
			const question = state.questions.at(state.index);
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

function App() {
	const [{ questions, status, answer, index, points, highscore, secondsRemaining }, dispatch] = useReducer(
		reducer,
		initialState
	);

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
	return (
		<Box backgroundColor='#343a40' height='100vh'>
			<Header />
			<Main>
				{status === "loading" && <Loader />}
				{status === "error" && <AppError />}
				{status === "received" && (
					<StartScreen numOfQuestions={numOfQuestions} dispatch={dispatch} />
				)}
				{status === "active" && (
					<Stack>
						<Progress
							index={index}
							numOfQuestions={questions.length}
							points={points}
							maxPossiblePoints={maxPointsPossible}
							answer={answer}
							currentProgress={currentProgress}
						/>
						<Question
							question={questions[index]}
							dispatch={dispatch}
							answer={answer}
						>
							<NextButton
								dispatch={dispatch}
								answer={answer}
								index={index}
								numOfQuestions={numOfQuestions}
							/>
							<Timer dispatch={dispatch} secondsRemaining={secondsRemaining}/>
						</Question>
					</Stack>
				)}
				{status === "finished" && (
					<FinishScreen
						dispatch={dispatch}
						maxPossiblePoints={maxPointsPossible}
						points={points}
						percentage={currentProgress}
						highscore={highscore}
					/>
				)}
			</Main>
		</Box>
	);
}

export default App;
