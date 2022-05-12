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
  return (
    <>
      <Typography variant='h4' color='white' fontWeight={600}>
        Join Twitter today.
      </Typography>
    </>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Feed />
  </React.StrictMode>,
  document.getElementById('root')
)
