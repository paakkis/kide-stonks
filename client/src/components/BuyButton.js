import * as React from 'react';
import Button from '@mui/lab/LoadingButton';
import { Box } from '@mui/material/';
import SendIcon from '@mui/icons-material/Send';
import fetch from '../services/fetch';
import { useState, useRef, useEffect } from 'react';
import ToggleButton from '@mui/material/ToggleButton';

const BuyButton = ({ event, token, setMessage, setError, setOpenErrorNotification, setOpenMessageNotification }) => {

  const [loop, setLoop] = useState(false)
  const firstStart = useRef(true);
  const tick = useRef();

  useEffect(() => {
    if (firstStart.current) {
      firstStart.current = !firstStart.current;
      return;
    }
    else if (loop) {
      tick.current = setInterval(buyAllTickets, 1000);
    } else {
      clearInterval(tick.current);
    }
    return () => clearInterval(tick.current);
  }, [loop]);

  const buyAllTickets = () => {
    if (!token){
      setOpenErrorNotification(true)
      setError(`Token puuttuu.`)
      setTimeout(() => {
        setError([])
      }, 6000)
    }
    else {
      try {
        event.variants.map(event => (
          fetch.fetchTicket(event.inventoryId, token)
                .then((response) => {
                    setOpenMessageNotification(true)
                    setMessage(`Napattiin '${event.name}' lippu.`)
                    setTimeout(() => {
                      setMessage('')
                      setOpenMessageNotification(false)
                    }, 6000)
                  })
                .catch(error => {
                    if (error.response.status === 401){
                      setOpenErrorNotification(true)
                      setError(`Token väärin tai puutteellinen. Anna token ilman Bearer-liitettä.`)
                      setTimeout(() => {
                        setError([])
                      }, 6000)
                    }
                    if (error.response.status === 400){
                      setOpenErrorNotification(true)
                      setError(`Lippua '${event.name}' ei saatavilla.`)
                      setTimeout(() => {
                        setError('')
                        setOpenErrorNotification(false)
                      }, 6000)
                      }
                    })
                  ))
              if (event.variants.length === 0){
                  setOpenErrorNotification(true)
                  setError(`Myynti ei vielä alkanut.`)
                  setTimeout(() => {
                    setError([])
                  }, 6000)
              }
      } catch(error){
        setOpenErrorNotification(true)
        setError(`Odottamaton virhe. Mitä vittua.`)
        setTimeout(() => {
          setError([])
        }, 6000)
      }
    }
  }

  const toggleStartBuy = () => {
    setLoop(!loop);
    if (loop){
      setOpenMessageNotification(true)
      setMessage(`Lopetetaan looppaus...`)
      setTimeout(() => {
        setMessage('')
        setOpenMessageNotification(false)
      }, 6000)
    }
    if (!loop){
        setOpenMessageNotification(true)
        setMessage(`Yritetään ostaa lippua joka 1s välein...`)
        setTimeout(() => {
          setMessage('')
          setOpenMessageNotification(false)
        }, 6000)
      }
  };

  const handleClick = () => {
      buyAllTickets()
  }

  return (
    <Box>
      <Box sx={{ '& > button': { m: 3 } }}>
        <Button
          onClick={() => handleClick()}
          variant="contained"
          sx={{color: "white", backgroundColor: '#2a0062'}}
        >
          OSTA 1x
        </Button>
        <ToggleButton
          value="check"
          size='small'
          selected={loop}
          color='standard'
          onClick={toggleStartBuy} 
          onChange={() => {
            setLoop(!loop);
          }}
        >
        {loop ? 'Lopeta' : 'Looppaa'}
        </ToggleButton>
      </Box>
    </Box>
  );
}

export default BuyButton