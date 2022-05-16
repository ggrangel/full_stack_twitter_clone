import React from 'react'
import { InputBase, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

export default function SearchBar () {
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
