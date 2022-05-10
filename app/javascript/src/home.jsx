import React from 'react'
import ReactDOM from 'react-dom'
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

import './home.scss'

const styles = {
  input: {
    '&::placeholder': {
      color: 'italic'
    }
  }
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
                      >
                        Sign up
                      </Button>
                    </Grid>
                  </Grid>
                </FormControl>
              </Paper>
            </Grid>
            <Grid item align='center'>
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
                      InputProps={{
                        style: {
                          color: 'white'
                        }
                      }}
                    ></TextField>
                  </Grid>
                  <Grid item align='center' mb={3}>
                    <Button variant='contained' color='primary'>
                      LOG IN
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
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
