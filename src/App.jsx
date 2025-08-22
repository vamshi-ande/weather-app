import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Weather } from './weather-app'
import './index.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <Weather />
    </>
  )
}

export default App
