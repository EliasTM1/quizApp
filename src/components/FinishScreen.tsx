import { Button, Heading, Stack, Text } from "@chakra-ui/react";
import { useQuizz } from "../context/QuestionsContext";


export default function FinishScreen() {
	const { points, currentProgress, maxPointsPossible, highscore, restart} = useQuizz()

	let emoji;
	if (points === maxPointsPossible) emoji = "🥇";
	if (points >= 80 && currentProgress < maxPointsPossible) emoji = "🥈";
	if (points >= 50 && currentProgress < maxPointsPossible) emoji = "🥉";
	if (points >= 0 && currentProgress < maxPointsPossible)
		emoji = "No medal for you.";
	if (points === 0) emoji = "You are not ready. 🤦‍♂️";
	return (
		<Stack
			color='white'
			width='60%'
			margin='2rem auto'
			display='flex'
			justifyContent='center'
			textAlign='center'
		>
			<Heading>You Finished</Heading>
			<Text
				backgroundColor='skyblue'
				borderRadius='1rem'
				fontSize='1.5rem'
				color='black'
			>
				You scored <strong>{points}</strong> out of {maxPointsPossible} possible{" "}
				<br />
				<Text fontSize='5rem'>{emoji}</Text>
			</Text>
			{highscore && <Text>Current highscore: {highscore}</Text>}
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
				onClick={() => restart()}
			>
				Restart quiz
			</Button>
		</Stack>
	);
}
