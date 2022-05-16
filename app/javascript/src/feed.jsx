import React, { useEffect } from 'react'
import { useState } from 'react'
import ReactDOM from 'react-dom'
import { Grid } from '@mui/material'
import { safeCredentials, handleErrors } from './utils/fetchHelper'
import ResponsiveAppBar from './components/Navbar.jsx'
import UserInfo from './components/UserInfo.jsx'
import Trends from './components/Trends.jsx'
import TweetTextField from './components/TweetTextField.jsx'
import SearchBar from './components/SearchBar.jsx'
import Tweet from './components/Tweet.jsx'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import './feed.scss'

const theme = createTheme({
  typography: {
    allVariants: {
      color: 'white'
    }
  },
  input: {
    color: 'white'
  }
})

export const UsernameContext = React.createContext()

export default function Feed () {
  const [username, setUsername] = useState()

  const [tweets, setTweets] = useState()

  function fetchTweets () {
    fetch(
      'api/tweets',
      safeCredentials({
        method: 'GET'
      })
    )
      .then(handleErrors)
      .then(res => {
        setTweets(res.tweets)
      })
  }

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

  function getUsername () {
    fetch(
      'api/authenticated',
      safeCredentials({
        method: 'GET'
      })
    )
      .then(handleErrors)
      .then(res => {
        setUsername(res.username)
      })
  }

  useEffect(() => {
    getUsername()
    fetchTweets()
  }, [])

  return (
    <>
      <UsernameContext.Provider value={username}>
        <ResponsiveAppBar
          mb={2}
          fetchUserTweets={fetchUserTweets}
          fetchTweets={fetchTweets}
        />
        <ThemeProvider theme={theme}>
          <Grid container mt={2} columnSpacing={5} justifyContent='center'>
            <Grid item>
              <UserInfo fetchUserTweets={fetchUserTweets} />
              <Grid item>
                <Trends />
              </Grid>
            </Grid>
            <Grid item>
              <TweetTextField fetchTweets={fetchTweets} />
              <Tweet
                tweets={tweets}
                fetchTweets={fetchTweets}
                // fetchUserTweets={fetchUserTweets}
              />
            </Grid>
            <Grid item>
              <SearchBar />
            </Grid>
          </Grid>
        </ThemeProvider>
      </UsernameContext.Provider>
    </>
  )
}

// ReactDOM.render(
//   <React.StrictMode>
//     <Feed />
//   </React.StrictMode>,
//   document.getElementById('root')
// )
