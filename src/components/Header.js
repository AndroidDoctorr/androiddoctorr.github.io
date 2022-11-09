import { useContext } from 'react'
import { ColorThemeContext } from '../context/colorThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import classNames from 'classnames'
import basicInfo from '../data/basic-info.json'

function Header() {
	const theme = useContext(ColorThemeContext)

	return (
		<div className={classNames('header', theme.color)} >
			<div className='header-info'>
				<h1>
					{basicInfo.name}
					<a
						href={basicInfo.linkedin}
						target='_blank'
                    	rel='noopener noreferrer'
					>
						<FontAwesomeIcon icon={faLinkedin} />
					</a>
					<a
						href={basicInfo.github}
						target='_blank'
                    	rel='noopener noreferrer'
					>
						<FontAwesomeIcon icon={faGithub} />
					</a>
				</h1>
				<div>{basicInfo.email}</div>
				<div>{basicInfo.phone}</div>
			</div>

			<img
				src={require('../assets/portraits/me-' + theme.color + '.jpg')}
				alt='me - a bearded man in a blue t-shirt, smiling'
			/>
		</div>
	)
}

export default Header
