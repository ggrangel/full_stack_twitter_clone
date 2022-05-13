import React from 'react'
import { useState } from 'react'
import ReactDOM from 'react-dom'
import {
  Grid,
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  FormControl
} from '@mui/material'
import { safeCredentials, handleErrors } from './utils/fetchHelper'
import ResponsiveAppBar from './components/Navbar.jsx'

function UserInfo ({ username }) {
  return (
    <>
      <Paper sx={{ width: '300px', backgroundColor: '#242626 ' }}>
        <Grid container rowSpacing={1} alignContent='left'>
          <Grid item>
            <Typography mx={2} mb={2}>
              @{username}
            </Typography>
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
      </Paper>
    </>
  )
}

function Feed () {
  const [username, setUsername] = useState(getUsername())

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

  function logout () {
    fetch(
      'api/sessions',
      safeCredentials({
        method: 'delete'
      })
    )
      .then(handleErrors)
      .then(res => {
        window.open('/')
      })
  }

  return (
    <>
      <ResponsiveAppBar username={username} />
      <UserInfo username={username} />
      <Button onClick={logout}>Logout </Button>
    </>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Feed />
  </React.StrictMode>,
  document.getElementById('root')
)
