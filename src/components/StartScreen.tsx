import { Button, Heading, VStack } from "@chakra-ui/react";
import { useQuizz } from "../context/QuestionsContext";

export const StartScreen = () => {

    const {numOfQuestions, startQuizz} = useQuizz()
	return (
		<VStack paddingBlock='1rem' color='#ced4da'>
			<Heading as='h2'>Welcome to the React Quiz!</Heading>
			<Heading as='h3'>
				{numOfQuestions} questions to check your react mastery
			</Heading>
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
                onClick={startQuizz}
			>
				Let's start
			</Button>
		</VStack>
	);
};
