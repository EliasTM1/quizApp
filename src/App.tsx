import { useEffect, useReducer } from "react";
import { Header } from "./components/Header";

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
	console.log(state);

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
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(function () {
		async function getMeData() {
			try {
				const response = await fetch("http://localhost:5555/questions");
				const data = await response.json();
				dispatch({ type: "received", payload: data });
			} catch (error) {
				console.log(error, "Error");
			}
		}
		getMeData();
	}, []);

	return (
		<>
			<Header />
		</>
	);
}

export default App;
