import React, { createContext, useState } from 'react'

export const NinetiesModeContext = createContext()

export const NinetiesModeContextProvider = (props) => {
    const [isNinetiesMode, setNinetiesMode] = useState(false)

    const toggleNinetiesMode = () => {
        setNinetiesMode(!isNinetiesMode)
        console.log(isNinetiesMode)
    }
    
    return (
        <NinetiesModeContext.Provider value={{ isNinetiesMode, toggleNinetiesMode }}>
            {props.children}
        </NinetiesModeContext.Provider>
    )
}