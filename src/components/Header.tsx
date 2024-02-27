import { HStack, Heading, Img } from "@chakra-ui/react";
import imga from "../assets/react.png";

export const Header = () => {
	return (
		<HStack className='app-header' justifyContent='center' color='#ced4da'>
			<Img width="100px" src={imga} alt='React' />
			<Heading marginLeft="1rem">CHECK YOUR REACT DAILY</Heading>
		</HStack>
	);
};
