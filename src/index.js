import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.sass'
import App from './components/App'
import reportWebVitals from './reportWebVitals'
import { ColorThemeContextProvider } from './context/colorThemeContext'
import { NinetiesModeContextProvider } from './context/ninetiesModeContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
		<ColorThemeContextProvider>
			<NinetiesModeContextProvider>
				<App />
			</NinetiesModeContextProvider>
		</ColorThemeContextProvider>
	</React.StrictMode>
);

reportWebVitals()
