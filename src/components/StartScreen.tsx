import { Box, Button, Heading } from "@chakra-ui/react";

export const StartScreen = () => {
	return (
		<Box>
			<Heading as='h2'>Welcome to the React Quiz!</Heading>
			<Heading as='h3'>X questions to check your react mastery</Heading>
            <Button>Let's start</Button>
		</Box>
	);
};
