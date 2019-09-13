import React, { useRef } from 'react';
import './App.css';
import Camera from './fragments/Camera';
function App() {

  return (
		<>
			<Camera>
				{(stream) => (<></>)}
			</Camera>
		</>
  );
}

export default App;
