import { useEffect } from "react";
import { useQuizz } from "../context/QuestionsContext";

export default function Timer() {
	const {secondsRemaining, tick , finished,} = useQuizz()
    const mins = Math.floor(secondsRemaining! / 60)
    const secs = secondsRemaining! % 60


	useEffect(() => {
		const id = setInterval(() => {
			if(!Number(secondsRemaining)) finished()
			tick();
		}, 1000);

		return () => clearInterval(id);
	}, [tick, finished, secondsRemaining]);
	return <div>{mins}: {secs > 10 ? secs: `0${secs}`}</div>;
}
