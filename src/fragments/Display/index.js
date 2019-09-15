import React, { useEffect, useRef } from 'react';

const Display = ({stream}) => {
	const monitor = useRef(null);
	useEffect(() => {
		if(!stream) return;
		monitor.current.srcObject = stream;
	}, [stream]);
	return (
		<div>
			<video ref={monitor} autoPlay></video>
		</div>
	);
}

export default Display;
