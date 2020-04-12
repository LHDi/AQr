import React, { useState, useEffect, useRef } from 'react';
import useQR from '../useQRCode/index';

function drawLine(context, begin, end, color) {
	context.beginPath();
	context.moveTo(begin.x, begin.y);
	context.lineTo(end.x, end.y);
	context.lineWidth = 4;
	context.strokeStyle = color;
	context.stroke();
}
const getDisplayStyle = (crop, isMonitorPortrait) => {
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
	const [videoStyle, setVideoStyle] = useState(null);
	const video = useRef(null);
	const canvas = useRef(null);

	useQR(video, (Qr) => {
		canvas.current.height = video.current.videoHeight;
		canvas.current.width = video.current.videoWidth;
		const context = canvas.current.getContext('2d');
		const {width, height} = canvas.current;
		if (Qr) {
			drawLine(context, Qr.location.topLeftCorner, Qr.location.topRightCorner, "#FF3B58");
			drawLine(context, Qr.location.topRightCorner, Qr.location.bottomRightCorner, "#FF3B58");
			drawLine(context, Qr.location.bottomRightCorner, Qr.location.bottomLeftCorner, "#FF3B58");
			drawLine(context, Qr.location.bottomLeftCorner, Qr.location.topLeftCorner, "#FF3B58");
		} else {
			context.clearRect(0, 0, width, height);
		}		
	});
	useEffect(() => {
		if(!stream) return;
		let isMonitorPortrait = window.innerHeight > window.innerWidth ? true : false;
		setVideoStyle(getDisplayStyle(isCrop, isMonitorPortrait))
		video.current.srcObject = stream;
	}, [isCrop, stream]);
	return (
		<>
			<div style={Object.assign({position: 'absolute', width: '100%', height: '100%', overflow: 'hidden'}, style)}>
				<video hidden ref={video} playsInline autoPlay style={Object.assign({}, videoStyle, { position: 'absolute' })}></video>
				<canvas ref={canvas} style={Object.assign({}, videoStyle, { position: 'absolute' })} />
				<span style={{position: "absolute"}} onClick={()=>setIsCrop(!isCrop)}>{isCrop?'uncrop':'crop'}</span>
			</div>
		</>
	);
}

export default Display;
