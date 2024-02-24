import { Img } from "@chakra-ui/react";

export const Header = () => {
	return (
		<header className='app-header'>
			<Img src='../assets/pin.jpeg' alt='React' />
			<h1>The React Quiz</h1>
		</header>
	);
};
