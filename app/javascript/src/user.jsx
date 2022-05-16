import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { Typography, Paper, Grid, Box } from '@mui/material'
import {
  useLocation,
  BrowserRouter as Router,
  useParams
} from 'react-router-dom'

import { safeCredentials, handleErrors } from './utils/fetchHelper'
import './user.scss'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme({
  typography: {
    allVariants: {
      color: 'darkblue'
    }
  },
  input: {
    color: 'white'
  }
})

export default function UserFeed () {
  // const location = useLocation()
  // const { username } = location.params
  const { username } = useParams()

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

  useEffect(() => {
    fetchUserTweets(username)
  })

  return (
    <>
      <Grid
        container
        justifyContent='center'
        alignItems='center'
        flexDirection='column'
        mt={10}
        rowSpacing={1}
      >
        {tweets &&
          tweets.map((tweet, i) => (
            <Grid item>
              <Paper
                key={i}
                sx={{ width: '500px', backgroundColor: '#333333' }}
              >
                <Grid container flexDirection='column' wrap='nowrap'>
                  <ThemeProvider theme={theme}>
                    <Grid item>
                      <Typography>@{tweet.username}</Typography>
                    </Grid>
                  </ThemeProvider>
                  <Grid item>
                    <Typography>{tweet.message}</Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))}
      </Grid>
    </>
  )
}
