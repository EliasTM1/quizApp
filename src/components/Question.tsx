import { Box, BoxProps, Button, Text, VStack } from "@chakra-ui/react";

type QuestionProps = BoxProps & {
	question: {
		correctOption: number;
		id: string;
		options: [];
		points: number;
		question: string;
	};
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	dispatch: (ar: any) => void;
	answer?: string;
};

export const Question = ({
	question,
	dispatch,
	answer,
	children,
}: QuestionProps) => {
	const {
		correctOption,
		id,
		options,
		points,
		question: currentQuestion,
	} = question;
	const hasAnswered = answer !== null;
	console.log(id)
	console.log(points)
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
					console.clear();
					console.log(index, "index");
					console.log(answer, "answer");
					return (
						<Button
							backgroundColor={
								hasAnswered
									? index === correctOption
										? "skyblue"
										: "orange"
									: ""
							}
							// color={hasAnswered ? "white" : "black"}
							width='100%'
							key={index}
							onClick={() =>
								dispatch({ type: "newAnswer", payload: correctOption })
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
