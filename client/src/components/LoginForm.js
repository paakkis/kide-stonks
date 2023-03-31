import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect, useRef } from 'react'
import login from '../services/login'
import fetch from '../services/fetch';

const Copyright = (props) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'KideStonks is behind login to prevent mass abuse :D. Copyright © '}
      <Link color="inherit" href="https://github.com/paakkis">
        paakkis
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: 'Roboto Mono',
      textTransform: 'none',
      fontSize: 16,
      
    },
    h5: {
      color: 'white'
    },
  },
  root: {
    "&. MuiFormLabel-root": {
      color: "white",
      background: '#212121'
    }
  }
});

const LoginForm = ({ setMessage, setError, setUser, setOpenMessageNotification, setOpenErrorNotification }) =>  {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await login.login({
        username, password,
      })
      window.localStorage.setItem('loggedStonkuser', JSON.stringify(user))
      fetch.setToken(user.token)
      setUser(user)
      console.log(user)
      setUsername('')
      setPassword('')
      setOpenMessageNotification(true)
      setMessage(`Logged in as ${user.name}`)
      setTimeout(() => {
        setOpenMessageNotification(false)
        setMessage(null)
      }, 6000)
    } catch (exception) {
      setOpenErrorNotification(true)
      setError('Wrong username or password.')
      setTimeout(() => {
        setOpenErrorNotification(false)
        setError(null)
      }, 6000)
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: 'auto !important', alignItems: 'center'}}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

export default LoginForm