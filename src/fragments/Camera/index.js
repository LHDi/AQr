import React, { useState, useEffect, useCallback, useReducer } from 'react';

const resList = [
	[640, 480, '480p - 4:3'],
	[1280, 720, '720p - 16:9'],
	[1920, 1080, '1080p - 16:9']
];

const getConstraints = ({height, width}) => {
	const filtredRes = resList.filter((res) => (
		res[0] >= width.min && res[0] <= width.max
		&& res[1] >= height.min && res[1] <= height.max
	));
	return filtredRes.map(res => ({
		label: res[2],
		width: { exact: res[0] },
    height: { exact: res[1] }
	}))
};

function hasGetUserMedia() {
  return !!(
    (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia
  );
};

const cameraReducer = ({cameraList, selected}, {type, id, list, resolution}) => {
	switch (type) {
		case 'SET_LIST':
			return {cameraList: list, selected: 0};
		case 'SELECT':
			return {cameraList: [...cameraList], selected: id};
		case 'SELECT_RES':
			cameraList[selected].selectedRes = cameraList[selected].resolutions[resolution];
			return {cameraList: [...cameraList], selected}
		default:
			return {cameraList: [...cameraList], selected};
	}
}

const streamReducer = ({stream, permitted}, {type, newstream}) => {
	switch (type) {
		case 'SET_STREAM':
			return {stream: newstream, permitted: true}
		case 'RESET_STREAM':
			return {stream: null, permitted}
		default:
			return {stream, permitted};
	}
}

const Camera = ({children}) => {
	const [{selected, cameraList}, dispatchCamera] = useReducer(cameraReducer, {cameraList: [], selected: null});
	const [{stream, permitted}, dispatchStream] = useReducer(streamReducer, {stream: null, permitted: false});
	const [error, setError] = useState(null);
	
	const reset = useCallback(() => {
		setError(null);
		if(stream)
			stream.getTracks().forEach(t => t.stop());
	}, [stream]);

	useEffect(() => {
		const getCameraList = async () => {
			if('mediaDevices' in navigator && 'enumerateDevices' in navigator.mediaDevices) {
				try {
					const list = await navigator.mediaDevices.enumerateDevices();
					let camList = [];
					list.forEach(dev => {
						if(dev.kind === 'videoinput'){
							let resolutions = getConstraints(dev.getCapabilities())
							camList.push({label: dev.label, deviceId: dev.deviceId, resolutions, selectedRes: resolutions[resolutions.length - 1]});
						}

					});
					
					dispatchCamera({type: 'SET_LIST', list: camList});
				} catch (error) {
					setError(new Error('Camera Error!'));
				}
			}
		};
		getCameraList();
		return reset;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [permitted]);

	useEffect(() => {
		
		const selectedCamera = (!!cameraList.length && selected > -1) ? cameraList[selected]:undefined;
		
		if(!selectedCamera) return;
		const getCameraPermission = async () => {
			if(hasGetUserMedia() && !!selectedCamera){
				try {
					const stream = await navigator.mediaDevices.getUserMedia({
						video: {
							deviceId: {
								exact: selectedCamera.deviceId
							},
							width: {
								...selectedCamera.selectedRes.width
							}
						}
					});
					dispatchStream({type: 'SET_STREAM', newstream: stream});
				} catch (e) {
					return setError(new Error('Please allow us to use the camera.'))
				}
			} else {
				return setError(new Error('No camera device was found!'));
			};
		};
		getCameraPermission();
		return reset;
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selected, cameraList]);

	if(!!error) 
		return (<span>{error.message}</span>)
	return (
		<>
			{
				!!cameraList.length && selected > -1 &&
				<>
					<select onChange={(e) => {dispatchCamera({type: 'SELECT', id: e.target.value}); console.log(stream)}}>
						{cameraList.map((cam, i) => {					
							return <option key={cam.deviceId} value={i}>{cam.label}</option>
						})}
					</select>
					<select defaultValue={cameraList[selected].resolutions.indexOf(cameraList[selected].selectedRes)} onChange={(e) => {dispatchCamera({type: 'SELECT_RES', id: selected, resolution:e.target.value}); console.log(stream)}}>
						{cameraList[selected].resolutions.map((res, i) => {					
							return <option key={res.label} value={i}>{res.label}</option>
							
						})}
					</select>
				</>
			}
			{children({stream})}
		</>
	);
}

export default Camera;
