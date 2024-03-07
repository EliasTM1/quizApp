import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { Loader } from "./components/Loader";
import { Error as AppError } from "./components/Error";
import { Box, Heading, Stack } from "@chakra-ui/react";
import "./index.css";
import { StartScreen } from "./components/StartScreen";
import { Question } from "./components/Question";
import { NextButton } from "./components/NextButton";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import Timer from "./components/Timer";
import { useQuizz } from "./context/QuestionsContext";

function App() {
	const { status } = useQuizz();

	return (
		<Box backgroundColor='#343a40' height='100vh'>
			<Header />
			<Main>
				{status === "loading" && <Loader />}
				{status === "error" && <AppError />}
				{status === "received" && <StartScreen />}
				{status === "active" && (
					<Stack>
						<Heading>MAndinga</Heading> HOLA
						<Progress />
						<Question>
							<NextButton />
							<Timer />
						</Question>
					</Stack>
				)}
				{status === "finished" && <FinishScreen />}
			</Main>
		</Box>
	);
}

export default App;
