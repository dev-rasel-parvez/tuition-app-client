import React, { createContext, useEffect, useState } from 'react'


export const ThemeContext = createContext()


function getInitialTheme(){
const stored = localStorage.getItem('theme')
if (stored) return stored
return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}


export default function ThemeProvider({children}){
const [theme, setTheme] = useState(getInitialTheme)
const [accent, setAccent] = useState(localStorage.getItem('accent') || '#06b6d4')


useEffect(()=>{
document.documentElement.setAttribute('data-theme', theme === 'dark' ? 'dark' : 'light')
// set CSS variable for accent
document.documentElement.style.setProperty('--color-accent', accent)
// compute contrasting text color for accent and set --accent-text-color
const c = getContrastText(accent)
document.documentElement.style.setProperty('--accent-text-color', c)
localStorage.setItem('theme', theme)
localStorage.setItem('accent', accent)
},[theme, accent])


function toggleTheme(){ setTheme(t => t === 'dark' ? 'light' : 'dark') }


function setAccentColor(hex){ setAccent(hex) }


return (
<ThemeContext.Provider value={{theme, toggleTheme, accent, setAccentColor}}>
{children}
</ThemeContext.Provider>
)
}


// helper: return black or white based on contrast
function getContrastText(hex){
// hex -> r,g,b
const h = hex.replace('#','')
const r = parseInt(h.substring(0,2),16)
const g = parseInt(h.substring(2,4),16)
const b = parseInt(h.substring(4,6),16)
// luminance
const L = 0.2126*r + 0.7152*g + 0.0722*b
return L > 128 ? '#000000' : '#ffffff'
}