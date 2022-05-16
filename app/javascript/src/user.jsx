import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Typography } from '@mui/material'

import './user.scss'

function UserFeed () {
  const [tweets, setTweets] = useState()

  function fetchUserTweets (username) {
    fetch(
      `api/users/${username}/tweets`,
      safeCredentials({
        method: 'GET'
      })
    )
      .then(handleErrors)
      .then(res => {
        setTweets(res.tweets)
      })
  }

  return <></>
}

ReactDOM.render(
  <React.StrictMode>
    <UserFeed />
  </React.StrictMode>,
  document.getElementById('root')
)
