import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';

const getDisplayStyle = (crop, isStreamPortrait, isMonitorPortrait) => {
	return !isMonitorPortrait?
		crop?
			{width: '100%', top: '50%', transform: 'translateY(-50%)'}:
			{height: '100%', left: '50%', transform: 'translateX(-50%)'}:
		crop?
			{height: '100%', left: '50%', transform: 'translateX(-50%)'}:
			{width: '100%', top: '50%', transform: 'translateY(-50%)'};
}

const Display = ({stream, style, crop}) => {
	const [isCrop, setIsCrop] = useState(crop);
	const [isStreamPortrait, setIsStreamPortrait] = useState(null);
	const [videoStyle, setVideoStyle] = useState(null);
	const monitor = useRef(null);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => {
		if(!stream) return;		
		const videoTrack = stream ? stream.getVideoTracks()[0].getSettings() : null;
		let isStreamPortrait = videoTrack.height > videoTrack.width ? true : false;
		setIsStreamPortrait(isStreamPortrait);
	})
	useLayoutEffect(() => {
		if(!stream) return;
		let isMonitorPortrait = window.innerHeight > window.innerWidth ? true : false;
		setVideoStyle(getDisplayStyle(isCrop, isStreamPortrait, isMonitorPortrait))
		monitor.current.srcObject = stream;
	}, [isCrop, isStreamPortrait, stream]);
	return (
		<div style={Object.assign({position: 'absolute', width: '100%', height: '100%', overflow: 'hidden'}, style)}>
			<video ref={monitor} autoPlay style={Object.assign({}, videoStyle, { position: 'absolute' })}></video>
			<span style={{position: "absolute"}} onClick={()=>setIsCrop(!isCrop)}>{isCrop?'uncrop':'crop'}</span>
		</div>
	);
}

export default Display;
