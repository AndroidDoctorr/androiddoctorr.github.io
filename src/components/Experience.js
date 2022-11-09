import Role from './Role'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLink } from '@fortawesome/free-solid-svg-icons'

function Experience(props) {
    return (
        <div className='experience'>
            <h3 className='experience-title'>
                {props.item.title}
                {props.item.url &&
                    <a href={props.item.url} target='_blank' rel='noopener noreferrer'>
                        <FontAwesomeIcon icon={faExternalLink} />
                    </a>
                }
            </h3>
            <div className='experience-body'>
                <div className='experience-colorBar'>
                    <div
                        className='experience-color'
                        style={{ backgroundColor: props.item.color }}
                    ></div>
                </div>
                <div className='experience-roles'>
                    {props.item.roles.map(
                        role => { return Role({ role }) }
                    )}
                </div>
            </div>
        </div>
    )
}

export default Experience;
