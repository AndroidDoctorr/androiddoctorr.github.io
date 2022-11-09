import { useContext } from 'react'
import { NinetiesModeContext } from '../context/ninetiesModeContext'
import classNames from 'classnames'
import Header from './Header'
import Body from './Body'
import Footer from './Footer'

function App() {
	const {isNinetiesMode} = useContext(NinetiesModeContext)

	return (
		<div className={classNames('app', isNinetiesMode && 'nineties')}>
			<div className='app-page'>
				<Header />
				<Body />
			</div>
			<Footer />
		</div>
	)
}

export default App
