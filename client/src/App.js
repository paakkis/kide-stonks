import './App.css';
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar';
import CityMenu from './components/CityMenu';
import EventMenu from './components/EventMenu';
import TokenInput from './components/TokenInput';
import fetch from './services/fetch';
import BuyButton from './components/BuyButton';
import Card from '@mui/material/Card';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import EventInfo from './components/EventInfo';

const App = () => {

  const [city, setCity] = useState('')
  const [event, setEvent] = useState('')
  const [token, setToken] = useState('')
  const [eventInfo, setEventInfo] = useState(null)
  const [events, setEvents] = useState([])
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)
  const [user, setUser] = useState(null)
  const [openErrorNotification, setOpenErrorNotification] = useState(false)
  const [openMessageNotification, setOpenMessageNotification] = useState(false)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedStonkuser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      fetch.setToken(user.token)
    }
  }, [])

  return (
    <div className="App">
      <Notification message={message} 
                    error={error} 
                    openErrorNotification={openErrorNotification} 
                    setOpenErrorNotification={setOpenErrorNotification} 
                    openMessageNotification={openMessageNotification} 
                    setOpenMessageNotification={setOpenMessageNotification} 
      />
      <Navbar setMessage={setMessage} 
              setError={setError} 
              setUser={setUser}
              setOpenMessageNotification={setOpenMessageNotification} 
              setOpenErrorNotification={setOpenErrorNotification}
              user={user}
      />
      <Card sx={{ width: 400, minHeight: 500, margin: 'auto', outline: 'solid 2px rgb(202,191,216,0.3)'}}>
            <CityMenu setCity={setCity} 
                      city={city} 
                      setEvents={setEvents}
            />
            <EventMenu setEvent={setEvent} 
                       events={events} 
                       event={event} 
                       setEventInfo={setEventInfo}
            />
            <TokenInput setToken={setToken}/>
            <BuyButton event={eventInfo} 
                       setMessage={setMessage} 
                       setError={setError} 
                       setOpenMessageNotification={setOpenMessageNotification} 
                       setOpenErrorNotification={setOpenErrorNotification}
                       token={token}
                       setEventInfo={setEventInfo}
            />
      </Card>
      {eventInfo  === null ? 
          <></>
          :
          <EventInfo event={eventInfo}/>
      }
    </div>
  );
}

export default App;
