import { useState } from 'react'
import  Resume from './pages/Resume'
import Resume1 from './pages/Resume1'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)

  return (
        <Router>
         <Routes>
            <Route  path="/" element={<Resume/>} />
            <Route  path="/resume1" element={<Resume1/>} />
            </Routes>
        </Router>    
  )
}

export default App
