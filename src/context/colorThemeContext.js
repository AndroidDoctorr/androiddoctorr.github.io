import React, { createContext, useState } from 'react'
export const colors = ['blue', 'green', 'red']

export const ColorThemeContext = createContext()

export const ColorThemeContextProvider = (props) => {
    const [color, setTheme] = useState(colors[0])

    const getNextTheme = () => {
        let colorIndex = colors.indexOf(color)
        colorIndex++
        if (colorIndex >= colors.length) {
            colorIndex = 0
        }
        setTheme(colors[colorIndex])
    }
    
    return (
        <ColorThemeContext.Provider value={{ color, getNextTheme }}>
            {props.children}
        </ColorThemeContext.Provider>
    )
}