import React from 'react'
import { Grid, Box, Typography } from '@mui/material'

export default function Trends () {
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
