import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import Container from '@mui/material/Container'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Button from '@mui/material/Button'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import TwitterIcon from '@mui/icons-material/Twitter'
import { UsernameContext } from '../feed'

import { safeCredentials, handleErrors } from '../utils/fetchHelper'

const ResponsiveAppBar = ({ fetchUserTweets, fetchTweets }) => {
  const username = React.useContext(UsernameContext)

  const [anchorElNav, setAnchorElNav] = React.useState(null)
  const [anchorElUser, setAnchorElUser] = React.useState(null)

  function logout () {
    fetch(
      'api/sessions',
      safeCredentials({
        method: 'delete'
      })
    )
      .then(handleErrors)
      .then(() => {
        window.open('/', '_self')
      })
  }

  const settings = {
    'My Feed': () => {
      fetchUserTweets(username)
    },
    'General Feed': () => {
      fetchTweets()
    },
    Logout: () => {
      logout()
    }
  }

  const handleOpenNavMenu = event => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <TwitterIcon />
          <Box sx={{ flexGrow: 1, display: { xs: 'flex' } }} />
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title='Open settings'>
              <Button
                onClick={handleOpenUserMenu}
                style={{ color: 'white' }}
                sx={{ p: 0 }}
                startIcon={<AccountCircleIcon />}
                endIcon={<ArrowDropDownIcon />}
              >
                {username}
              </Button>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {Object.keys(settings).map((setting, _) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography
                    textAlign='center'
                    onClick={() => settings[setting]()}
                  >
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default ResponsiveAppBar
