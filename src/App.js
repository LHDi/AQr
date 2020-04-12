import React from 'react';
import './App.css';
import Camera from './fragments/Camera';
import Display from './fragments/Display';
import Combiner from './fragments/Combiner';

function App() {
  return (
		<>
			<Camera controle>
				{({stream}) => (
					<>
						<Display stream={stream} crop/>
						<Combiner />
					</>
				)}
			</Camera>
		</>
  );
}

export default App;
