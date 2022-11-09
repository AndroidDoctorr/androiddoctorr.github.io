import { useContext } from 'react'
import { ColorThemeContext } from '../context/colorThemeContext'
import { NinetiesModeContext } from '../context/ninetiesModeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRandom, faClock } from '@fortawesome/free-solid-svg-icons'

function Footer() {
    let {getNextTheme} = useContext(ColorThemeContext)
    let {toggleNinetiesMode} = useContext(NinetiesModeContext)

    return (
        <div className='footer'>
            <a href={require('../Andrew_Torr_Resume.pdf')} download>Download Resume</a>
            <div className='footer-buttons'>
                <button onClick={toggleNinetiesMode}>
                    <FontAwesomeIcon icon={faClock} />
                    <span>{'90\'s Mode'}</span>
                </button>
                <button onClick={getNextTheme}>
                    <FontAwesomeIcon icon={faRandom} />
                    <span>{'Theme'}</span>
                </button>
            </div>
        </div>
    );
}

export default Footer
