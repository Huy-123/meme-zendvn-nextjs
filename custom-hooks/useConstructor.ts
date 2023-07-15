import { useRef } from "react";

type ConstructorCallBack = () => void

function useConstructor(callback: ConstructorCallBack): void {
	const isRun = useRef(false);

	if(isRun.current === false){
		callback()
		isRun.current = true
	}
}

export default useConstructor;