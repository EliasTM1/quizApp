import { ReactNode } from "react";

export type Status =
	| "received"
	| "start"
	| "failed"
	| "nextQuestion"
	| "finished"
	| "restart"
	| "error"
	| "tick"
	| "newAnswer";

export type Action = {
	type: Status;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	payload?: any;
};
export type QuestionT = {
	correctOption: number;
	id: string;
	options: [];
	points: number;
	question: string;
};
export type InitialState = {
	questions: QuestionT[];
	status: string;
	index: number;
	answer: number | null;
	points: number;
	highscore: number;
	secondsRemaining: number | null;
};


export type QuestionProviderProps = {
	children: ReactNode;
};