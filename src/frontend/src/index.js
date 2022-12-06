import React from 'react';
import { createRoot } from 'react-dom/client';
import LeftOver from './leftOver';
import './index.css';
import 'antd/dist/antd.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * Create root div and render the root compoent
 */
const root = createRoot(document.getElementById('root'));

/**
 * Render the root component
 */
root.render(
	<React.StrictMode>
		<LeftOver />
	</React.StrictMode>
);
