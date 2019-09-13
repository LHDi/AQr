import React, { useState, useEffect, useRef } from 'react';

function hasGetUserMedia() {
  return !!(
    (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia
  );
}

const Camera = ({children}) => {
//	const [camera, setCamera] = useState(navigator?navigator.mediaDevices?navigator.mediaDevices.getUserMedia?navigator.mediaDevices : null : null : null);
	const [stream, setStream] = useState(null);
	const [error, setError] = useState(null);
	const container = useRef(null);

	useEffect(() => {
		const getCameraPermission = async () => {
			//navigator.mediaDevices.enumerateDevices().then(d => d.forEach(b=>alert(b.kind)))
			if(hasGetUserMedia()){
				navigator.getUserMedia =
				navigator.mediaDevices.getUserMedia ||
				navigator.webkitGetUserMedia ||
				navigator.mozGetUserMedia ||
				navigator.msGetUserMedia;
				try {
					const stream = await navigator.mediaDevices.getUserMedia({ video: true });
					setStream(stream);
					container.current.srcObject = stream;
				} catch (e) {
					return setError(new Error('Please allow us to use the camera.'))
				}
			} else {
				return setError(new Error('No camera device was found!'));
			};
		};
		getCameraPermission();
	}, []);

	return (
		<>
			<video ref={container} autoPlay></video>
			{error && <span>{error.message}</span>}
		</>
			//children(stream, error)
	);
}

export default Camera;
