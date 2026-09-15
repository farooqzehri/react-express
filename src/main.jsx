import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Todo from './pages/Todo.jsx'

createRoot(document.getElementById('root')).render(
 <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </BrowserRouter>
)
