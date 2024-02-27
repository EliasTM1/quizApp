import { Dispatch, useEffect } from "react";

type TimerProps = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	dispatch: Dispatch<any>;
	secondsRemaining: number;
};
export default function Timer({ dispatch, secondsRemaining }: TimerProps) {
    const mins = Math.floor(secondsRemaining / 60)
    const secs = secondsRemaining % 60

	useEffect(() => {
		const id = setInterval(() => {
			dispatch({ type: "tick" });
		}, 1000);

		return () => clearInterval(id);
	}, [dispatch]);
	return <div>{mins}: {secs > 10 ? secs: `0${secs}`}</div>;
}
