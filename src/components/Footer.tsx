import { BoxProps } from "@chakra-ui/react";

type FooterProps = BoxProps & {
	someProp: string;
};

export default function Footer({children}: FooterProps) {
	return <footer>{children}</footer>;
}
