import { useState } from 'react'
import React from 'react'
import { Grid, Typography, Paper, TextField, Button } from '@mui/material'
import { safeCredentials, handleErrors } from '../utils/fetchHelper'

export default function TweetTextField ({ fetchTweets }) {
  const maxChars = 140

  const [message, setMessage] = useState('')
  const [charsLeft, setCharsLeft] = useState(maxChars)

  function postTweet () {
    fetch(
      `/api/tweets`,
      safeCredentials({
        method: 'POST',
        body: JSON.stringify({
          tweet: {
            message
          }
        })
      })
    )
      .then(handleErrors)
      .then(res => {
        console.log(res)
        fetchTweets()
      })
    setMessage('')
  }

  return (
    <>
      <Paper sx={{ width: '500px', backgroundColor: '#242626 ' }}>
        <Grid container flexDirection='column' rowSpacing={1}>
          <Grid item mx={1}>
            <TextField
              // sx={{ width: '450px' }}
              id='filled-multiline-flexible'
              value={message}
              multiline
              fullWidth
              rows={3}
              variant='outlined'
              placeholder="What's happening?"
              inputProps={{ maxLength: maxChars }}
              InputProps={{
                style: {
                  color: 'white'
                }
              }}
              onChange={e => {
                setCharsLeft(maxChars - e.target.value.length)
                setMessage(e.target.value)
              }}
            />
          </Grid>
          <Grid item alignSelf='flex-end' mr={1}>
            <Typography>{charsLeft}</Typography>
          </Grid>
          <Grid item alignSelf='flex-end' mr={1} mb={3}>
            <Button variant='contained' onClick={postTweet}>
              Tweet
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </>
  )
}
