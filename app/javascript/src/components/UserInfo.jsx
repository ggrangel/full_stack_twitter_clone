import React from 'react'
import { Grid, Box, Typography, Link } from '@mui/material'
import { UsernameContext } from '../feed.jsx'
import { useNavigate } from 'react-router-dom'

export default function UserInfo ({ fetchUserTweets }) {
  const navigate = useNavigate()
  const username = React.useContext(UsernameContext)

  return (
    <>
      <Box sx={{ width: '300px', backgroundColor: '#242626 ' }}>
        <Grid container rowSpacing={1} alignContent='left'>
          <Grid item mx={2} mb={2}>
            <Link
              component='button'
              style={{ fontWeight: 'bold' }}
              underline='hover'
              rel='noopener noreferrer'
              target='_blank'
              onClick={() => navigate(`/${username}`)}
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
