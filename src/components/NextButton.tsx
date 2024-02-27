import { Button } from "@chakra-ui/react";
import { Dispatch } from "react";

type NextButtonProps = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	dispatch: Dispatch<any>;
	answer: number;
	index: number;
	numOfQuestions: number;
};

export const NextButton = ({
	dispatch,
	answer,
	index,
	numOfQuestions,
}: NextButtonProps) => {
	const lastQuestion = index === numOfQuestions - 1;
	if (answer === null) return null;
	function handleNext() {
		if (lastQuestion) return dispatch({ type: "finished" });
		dispatch({ type: "nextQuestion" });
	}
	return (
		<Button
			fontSize='1rem'
			padding='1.5rem'
			color='#f1f3f5'
			cursor='pointer'
			borderRadius='100px'
			backgroundColor='#495057'
			marginBlock='2rem'
			_hover={{
				backgroundColor: "#ced4da",
				color: "#343a40",
			}}
			width='100%'
			onClick={handleNext}
		>
			{lastQuestion ? "Finish" : "Next"}
		</Button>
	);
};
