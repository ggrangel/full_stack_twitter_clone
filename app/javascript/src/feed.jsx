import React from 'react'
import { useState } from 'react'
import ReactDOM from 'react-dom'
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

function Feed () {
  const [username, setUsername] = useState(getUsername())

  function getUsername () {
    const res = fetch(
      'api/authenticated',
      safeCredentials({
        method: 'GET'
      })
    )
      .then(handleErrors)
      .then(res => {
        setUsername(res.username)
      })
    // return res.user
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
      <Typography variant='h4' color='white' fontWeight={600}>
        Welcome, {username}
      </Typography>
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
