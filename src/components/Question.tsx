import { Box, Button, Text, VStack } from "@chakra-ui/react";
import { useQuizz } from "../context/QuestionsContext";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Question = ({children}: any) => {
	const {questions, index, answer, newAnswer} = useQuizz()
	const question = questions[index]
	const {
		correctOption,
		options,
		question: currentQuestion,
	} = question;
	const hasAnswered = answer !== null;
	return (
		<Box margin='auto' width='50%' color='white'>
			<Text fontSize='2rem'>{currentQuestion}</Text>
			{/* <Select>
				{options.map((option, k) => (
					<option key={k}>{option}</option>
				))}
			</Select> */}
			<VStack gap='1rem'>
				{options.map((option, index) => {
					return (
						<Button
							backgroundColor={
								hasAnswered
									? index === correctOption
										? "skyblue"
										: "orange"
									: ""
							}
							width='100%'
							key={index}
							onClick={() =>
								newAnswer( correctOption )
							}
							style={
								index === correctOption && answer !== null
									? {
											transform: "translate(20px)",
									}
									: {}
							}
							disabled={hasAnswered}
							fontSize='1rem'
							padding='1.5rem'
							// cursor='pointer'
							borderRadius='100px'
							_hover={{
								backgroundColor: "#ced4da",
								color: "#343a40",
							}}
						>
							{option}
						</Button>
					);
				})}
				{children}
			</VStack>
		</Box>
	);
};
