import React, { useEffect } from 'react'
import { useState } from 'react'
import ReactDOM from 'react-dom'
import {
  Grid,
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Link,
  FormControl,
  InputBase,
  IconButton
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { safeCredentials, handleErrors } from './utils/fetchHelper'
import ResponsiveAppBar from './components/Navbar.jsx'
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

function UserInfo ({ fetchUserTweets }) {
  const username = React.useContext(UsernameContext)

  return (
    <>
      <Box sx={{ width: '300px', backgroundColor: '#242626 ' }}>
        <Grid container rowSpacing={1} alignContent='left'>
          <Grid item mx={2} mb={2}>
            <Link
              component='button'
              style={{ fontWeight: 'bold' }}
              onClick={() => {
                fetchUserTweets(username)
              }}
              underline='hover'
            >
              @{username}
            </Link>
          </Grid>
          <Grid container flexDirection='row' ml={1} columnSpacing={1}>
            <Grid item container xs={4} flexDirection='column'>
              <Grid item>
                <Typography variant='body2'>Tweets</Typography>
              </Grid>
              <Grid item>
                <Typography variant='body2'>0</Typography>
              </Grid>
            </Grid>
            <Grid item container xs={4} flexDirection='column'>
              <Grid item>
                <Typography variant='body2'>Following</Typography>
              </Grid>
              <Grid item>
                <Typography variant='body2'>0</Typography>
              </Grid>
            </Grid>
            <Grid item container xs={4} flexDirection='column'>
              <Grid item>
                <Typography variant='body2'>Followers</Typography>
              </Grid>
              <Grid item>
                <Typography variant='body2'>0</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

function Trends () {
  return (
    <>
      <Box sx={{ width: '300px', backgroundColor: '#242626 ' }}>
        <Grid container flexDirection='column' alignContent='left' mt={2}>
          <Grid item ml={2}>
            <Typography variant='h6' style={{ fontWeight: 'bold' }}>
              #Explore
            </Typography>
          </Grid>
          <Grid item ml={2}>
            <Typography variant='h6' style={{ fontWeight: 'bold' }}>
              #Trending
            </Typography>
          </Grid>
          <Grid item ml={2}>
            <Typography variant='h6' style={{ fontWeight: 'bold' }}>
              #Rails
            </Typography>
          </Grid>
          <Grid item ml={2}>
            <Typography variant='h6' style={{ fontWeight: 'bold' }}>
              #React
            </Typography>
          </Grid>
          <Grid item ml={2}>
            <Typography variant='h6' style={{ fontWeight: 'bold' }}>
              #etc
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

function TweetTextField ({ fetchTweets }) {
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
        // console.log(fetchTweets)
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

function Tweet ({ tweets, fetchTweets, fetchUserTweets }) {
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

  return (
    <>
      {tweets &&
        tweets.map((tweet, i) => (
          <Paper key={i} sx={{ width: '500px', backgroundColor: '#222222' }}>
            <Grid my={1} container flexDirection='column' wrap='nowrap'>
              <Grid item>
                <Link
                  onClick={() => {
                    fetchUserTweets(tweet.username)
                  }}
                  underline='hover'
                  component='button'
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

function SearchBar () {
  return (
    <>
      <InputBase
        placeholder='Search'
        inputProps={{ style: { color: 'white' } }}
      />
      <IconButton type='submit' sx={{ p: '10px' }} aria-label='search'>
        <SearchIcon style={{ color: 'grey' }} />
      </IconButton>
    </>
  )
}

export const UsernameContext = React.createContext()
export const AllTweetsContext = React.createContext()

function Feed () {
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
                fetchUserTweets={fetchUserTweets}
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

ReactDOM.render(
  <React.StrictMode>
    <Feed />
  </React.StrictMode>,
  document.getElementById('root')
)