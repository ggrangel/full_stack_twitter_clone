import React from 'react'
import ReactDOM from 'react-dom'
import Home from './home.jsx'
import Feed from './feed.jsx'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import UserFeed from './user.jsx'

function App () {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/feed' element={<Feed />} />
          <Route path='/:username' element={<UserFeed />} />
        </Routes>
      </Router>
    </>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
