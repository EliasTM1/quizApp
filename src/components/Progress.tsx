import { Box, Progress as ChakraProgress, HStack } from "@chakra-ui/react";
type ProgressProps = {
	numOfQuestions: number;
	index: number;
	points?: number;
    maxPossiblePoints: number
    answer: number
	currentProgress: number
};
export default function Progress({
	numOfQuestions,
	index,
	points,
    maxPossiblePoints,
	currentProgress,
    answer
}: ProgressProps) {
	return (
		<>
			<ChakraProgress
				hasStripe
				value={currentProgress}
                margin="2rem"
			/>
			<HStack color="white" justifyContent="space-around">
				<Box>
					Complete questions <strong>{index}</strong> / {numOfQuestions}
				</Box>
				<Box>
					<strong>Points</strong>: {points} / {maxPossiblePoints}
				</Box>
			</HStack>
		</>
	);
}
