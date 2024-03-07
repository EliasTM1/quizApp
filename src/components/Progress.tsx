import { Box, Progress as ChakraProgress, HStack } from "@chakra-ui/react";
import { useQuizz } from "../context/QuestionsContext";

export default function Progress() {
	const { numOfQuestions, points, currentProgress, index, maxPointsPossible } =
		useQuizz();
	return (
		<>
			<ChakraProgress hasStripe value={currentProgress} margin='2rem' />
			<HStack color='white' justifyContent='space-around'>
				<Box>
					Complete questions <strong>{index}</strong> / {numOfQuestions}
				</Box>
				<Box>
					<strong>Points</strong>: {points} / {maxPointsPossible}
				</Box>
			</HStack>
		</>
	);
}
