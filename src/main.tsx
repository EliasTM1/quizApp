import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import { QuestionProvider } from "./context/QuestionsContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ChakraProvider>
			<QuestionProvider>
				<App />
			</QuestionProvider>
		</ChakraProvider>
	</React.StrictMode>
);
