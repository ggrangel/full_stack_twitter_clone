import React from 'react'
import { useState } from 'react'
import ReactDOM from 'react-dom'
import { useNavigate } from 'react-dom'
import axios from 'axios'
import login_img from '../../assets/images/login.png'
import {
  Grid,
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  FormControl
} from '@mui/material'
import TwitterIcon from '@mui/icons-material/Twitter'
import $ from 'jquery'
import { safeCredentials, handleErrors } from './utils/fetchHelper'

import './home.scss'

axios.defaults.headers.common['X-CSRF-TOKEN'] = $(
  'meta[name="csrf-token"]'
).attr('content')

function signUserIn (username, password) {
  fetch(
    '/api/sessions',
    safeCredentials({
      method: 'POST',
      body: JSON.stringify({
        user: {
          username,
          password
        }
      })
    })
  )
    .then(handleErrors)
    .then(res => {
      console.log(res)
      if (res.success) {
        window.open('/feed', '_self')
      } else {
        console.log('wrong credentials')
      }
    })
}

function SignUp () {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  function signUserUp () {
    fetch(
      `/api/users`,
      safeCredentials({
        method: 'POST',
        body: JSON.stringify({
          user: {
            email: email,
            username: username,
            password: password
          }
        })
      })
    )
      .then(handleErrors)
      .then(res => {
        signUserIn(username, password)
      })
  }

  return (
    <Paper sx={{ width: '300px', backgroundColor: '#242626 ' }}>
      <FormControl>
        <Grid
          container
          flexDirection='column'
          rowSpacing={2}
          alignContent='center'
        >
          <Grid item>
            <Typography variant='h6' color='white'>
              Create your account
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              id='su-email'
              variant='standard'
              placeholder='email'
              value={email}
              onChange={e => {
                setEmail(e.target.value)
              }}
              required={true}
              InputProps={{
                style: {
                  color: 'white'
                }
              }}
            ></TextField>
          </Grid>
          <Grid item>
            <TextField
              id='su-username'
              variant='standard'
              placeholder='username'
              value={username}
              onChange={e => {
                setUsername(e.target.value)
              }}
              InputProps={{
                style: {
                  color: 'white'
                }
              }}
            ></TextField>
          </Grid>
          <Grid item>
            <TextField
              id='su-password'
              type='password'
              variant='standard'
              placeholder='password'
              value={password}
              onChange={e => {
                setPassword(e.target.value)
              }}
              InputProps={{
                style: {
                  color: 'white'
                }
              }}
            ></TextField>
          </Grid>
          <Grid item align='center' mb={3}>
            <Button
              variant='contained'
              color='primary'
              id='sign-up-btn'
              onClick={signUserUp}
            >
              Sign up
            </Button>
          </Grid>
        </Grid>
      </FormControl>
    </Paper>
  )
}

function SignIn () {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <>
      <Paper sx={{ width: '300px', backgroundColor: '#242626 ' }}>
        <Grid
          container
          flexDirection='column'
          rowSpacing={2}
          alignContent='center'
        >
          <Grid item>
            <Typography variant='h6' color='white'>
              Already have an account?
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              id='si-username'
              variant='standard'
              placeholder='username'
              value={username}
              onChange={e => setUsername(e.target.value)}
              InputProps={{
                style: {
                  color: 'white'
                }
              }}
            ></TextField>
          </Grid>
          <Grid item>
            <TextField
              id='si-password'
              variant='standard'
              type='password'
              placeholder='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              InputProps={{
                style: {
                  color: 'white'
                }
              }}
            ></TextField>
          </Grid>
          <Grid item align='center' mb={3}>
            <Button
              variant='contained'
              color='primary'
              onClick={() => signUserIn(username, password)}
            >
              LOG IN
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </>
  )
}

function App () {
  return (
    <>
      <Grid container columnSpacing={5}>
        <Grid item>
          <div className='App'>
            <img src={login_img} alt='Twitter Image' />
          </div>
        </Grid>
        <Grid item>
          <Grid container flexDirection='column' rowSpacing={4}>
            <Grid item mt={4}>
              <TwitterIcon fontSize='large' htmlColor='white' />
            </Grid>
            <Grid item>
              <Typography variant='h2' color='white' fontWeight={600}>
                Happening now
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant='h4' color='white' fontWeight={600}>
                Join Twitter today.
              </Typography>
            </Grid>
            <Grid item align='center'>
              <SignUp />
            </Grid>
            <Grid item align='center'>
              <SignIn />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default App
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
