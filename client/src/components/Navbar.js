import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
const Navbar = ({setUser, setMessage, setError, user, setOpenMessageNotification, setOpenErrorNotification }) => {     
    
    const handleLogout = () => {
        try {
          window.localStorage.clear()
          window.location.reload(true)
          fetch.setToken('')
          setUser('')
        } catch (exception) {
        setOpenErrorNotification(true)
          setError('Logged out.')
          setTimeout(() => {
            setError(null)
          }, 6000)
        }
      }
      return (
        <AppBar elevation={0} sx={{backgroundColor:'white'}}>
            <Toolbar >
                <Typography  
                    variant="h5"
                    noWrap
                    component="div"
                    sx={{ flexGrow: 1, color: '#2a0062' }}
                >
                    KideStonks
                </Typography>
                {user === null ? 
                    null :
                    <Button sx={{position: 'absolute', backgroundColor: 'white', color: '#2a0062', ":hover": {backgroundColor: '#2a0062', color: 'white'}}} size="small" onClick={() => handleLogout()}>log out</Button>
                }
            </Toolbar>
            
        </AppBar>
    )
  }
  export default Navbar