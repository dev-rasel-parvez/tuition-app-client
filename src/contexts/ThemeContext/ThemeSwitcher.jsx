import React, { useContext } from 'react'
import { ThemeContext } from '../ThemeContext/ThemeContext'


export default function ThemeSwitcher(){
const { theme, toggleTheme } = useContext(ThemeContext)
return (
<button onClick={toggleTheme} className="btn btn-ghost btn-sm">
{theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
</button>
)
}