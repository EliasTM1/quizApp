import { Button, Heading, Stack, Text } from "@chakra-ui/react";
import { Dispatch } from "react";

type FinishScreenProps = {
	points: number;
	maxPossiblePoints: number;
	percentage: number;
	highscore: number;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	dispatch: Dispatch<any>
};

export default function FinishScreen({
	maxPossiblePoints,
	points,
	percentage,
	highscore,
	dispatch
}: FinishScreenProps) {
	let emoji;
	if (points === maxPossiblePoints) emoji = "🥇";
	if (points >= 80 && percentage < maxPossiblePoints) emoji = "🥈";
	if (points >= 50 && percentage < maxPossiblePoints) emoji = "🥉";
	if (points >= 0 && percentage < maxPossiblePoints)
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
				You scored <strong>{points}</strong> out of {maxPossiblePoints} possible{" "}
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
				onClick={() => dispatch({type: "restart"})}
			>
				Restart quiz
			</Button>
		</Stack>
	);
}
