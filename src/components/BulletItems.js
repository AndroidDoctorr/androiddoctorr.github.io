function Section(props) {
    return (
        <ul className='bulletItems-section'>
            {props.section.map(item => {
                return <li>{item}</li>
            })}
        </ul>
    )
}

function BulletItems(props) {
    return (
        <div className='bulletItems'>
            {props.item.skills.map(section => {
                return <Section section={section} />
            })}
        </div>
    )
}

export default BulletItems
