function Role(props) {
    return (
        <div className='role'>
            <div className='role-info'>
                <h4 className='role-title'>
                    {props.role.title}
                </h4>
                <ul className='role-duties'>
                    {props.role.duties.map(
                        duty => { return <li>{duty}</li> }
                    )}
                </ul>
            </div>
            <div className='role-date'>
                {props.role.dates}
            </div>
        </div>
    )
}

export default Role