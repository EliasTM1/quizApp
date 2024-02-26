import { useEffect, useReducer } from "react";
import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { Loader } from "./components/Loader";
import { Error as AppError } from "./components/Error";
import { Box } from "@chakra-ui/react";
import "./index.css";
import { StartScreen } from "./components/StartScreen";
import { Question } from "./components/Question";

type Status =
	| "loading"
	| "error"
	| "ready"
	| "active"
	| "finished"
	| "received"
	| "failed";

type Action = {
	type: string;
	payload?: Status;
};
const initialState = {
	questions: [],
	status: "loading",
};

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
			};
		case "failed":
			return {
				...state,
				// status: action.type,
				status: "Error",
			};
		case "active":
			break;
		case "finished":
			break;
		case "ready":
			break;
		default:
			throw new Error("Action unknown");
	}
};

function App() {
	const [{ questions, status }, dispatch] = useReducer(reducer, initialState);
	const numOfQuestions: number = questions.length;

	useEffect(function () {
		async function getMeData() {
			try {
				const response = await fetch("http://localhost:5555/questions");
				const data = await response.json();
				dispatch({ type: "received", payload: data });
			} catch (error) {
				dispatch({ type: "error" });
				console.log(error, "Error");
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
				{status === "active" && <Question />}
			</Main>
		</Box>
	);
}

export default App;
