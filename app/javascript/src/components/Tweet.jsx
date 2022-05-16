import { Grid, Typography, Paper, Button } from '@mui/material'
import React from 'react'
import { safeCredentials, handleErrors } from '../utils/fetchHelper'
import { Link } from 'react-router-dom'

export default function Tweet ({ tweets, fetchTweets }) {
  // const username = React.useContext(UsernameContext)

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

  console.log(tweets)

  return (
    <>
      {tweets &&
        tweets.map((tweet, i) => (
          <Paper key={i} sx={{ width: '500px', backgroundColor: '#222222' }}>
            <Grid my={1} container flexDirection='column' wrap='nowrap'>
              <Grid item>
                {/* <Link to='/11111111'>@{tweet.username}</Link> */}
                <Typography>dfsajk</Typography>
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
