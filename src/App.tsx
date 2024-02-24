import { useEffect, useReducer } from "react";
import { Header } from "./components/Header";
// import "./index.css";
import { Main } from "./components/Main";
import { Loader } from "./components/Loader";
import { Error as AppError } from "./components/Error";
import { Box } from "@chakra-ui/react";

type Status =
	| "loading"
	| "error"
	| "ready"
	| "active"
	| "finished"
	| "received"
	| "failed";

type Action = {
	type: Status;
	payload?: any;
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
	const [{ question, status }, dispatch] = useReducer(reducer, initialState);
	console.log(question, "Question");

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
		<Box backgroundColor="#495057" height="100vh">
			<Header />
			<Main>{status === "loading" && <Loader />}</Main>
			<Main>{status === "error" && <AppError />}</Main>
			<Main>{status === "ready" && <AppError />}</Main>
		</Box>
	);
}

export default App;
