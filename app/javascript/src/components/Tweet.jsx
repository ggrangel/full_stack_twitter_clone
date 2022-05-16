import { Grid, Typography, Paper, Button, Link } from '@mui/material'
import React from 'react'
import { safeCredentials, handleErrors } from '../utils/fetchHelper'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate
} from 'react-router-dom'
import UserFeed from '../user'
import App from '../home.jsx'

export default function Tweet ({ tweets, fetchTweets }) {
  // const username = React.useContext(UsernameContext)
  const navigate = useNavigate()

  function deleteTweet (id) {
    fetch(
      `api/tweets/${id}`,
      safeCredentials({
        method: 'delete'
      })
    )
      .then(handleErrors)
      .then(res => {
        console.log(res)
        fetchTweets()
      })
  }

  return (
    <>
      {tweets &&
        tweets.map((tweet, i) => (
          <Paper key={i} sx={{ width: '500px', backgroundColor: '#222222' }}>
            <Grid my={1} container flexDirection='column' wrap='nowrap'>
              <Grid item>
                <Link
                  onClick={() => navigate(`/${tweet.username}`)}
                  underline='hover'
                  component='button'
                  target='_blank'
                >
                  @{tweet.username}
                </Link>
              </Grid>
              <Grid item>
                <Typography>{tweet.message}</Typography>
              </Grid>
              <Grid item alignSelf='flex-end'>
                <Button onClick={() => deleteTweet(tweet.id)}>Delete</Button>
              </Grid>
            </Grid>
          </Paper>
        ))}
    </>
  )
}
