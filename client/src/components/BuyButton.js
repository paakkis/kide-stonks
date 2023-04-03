import * as React from 'react';
import Button from '@mui/lab/LoadingButton';
import { Box } from '@mui/material/';
import fetch from '../services/fetch';
import { useState, useRef, useEffect } from 'react';
import ToggleButton from '@mui/material/ToggleButton';

const BuyButton = ({ event, token, setMessage, setError, setOpenErrorNotification, setOpenMessageNotification, setEventInfo }) => {

  const [isLoopActive, setIsLoopActive] = useState(false);
  const firstStart = useRef(true);
  const tick = useRef();

  useEffect(() => {
    let intervalId;
    if (isLoopActive) {
      intervalId = setInterval(() => {
        buyAllTickets();
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isLoopActive]);

  const buyAllTickets = () => {
    if (!token){
      setOpenErrorNotification(true)
      setError(`Token puuttuu.`)
      setTimeout(() => {
        setError('')
      }, 6000)
    }
    try {
      if (event.variants.length === 0){
        fetch.fetchEvent(event.product.id).then(event => {
          setEventInfo(event.model)
        }) 
        setOpenErrorNotification(true)
        setError(`Myynti ei ole vielä alkanut.`)
        setTimeout(() => {
          setError('')
        }, 6000)
      }
      event.variants.map(event => (
      fetch.fetchTicket(event.inventoryId, token, event.productVariantMaximumReservableQuantity)
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
                  setError('')
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
        } catch(error){
          setOpenErrorNotification(true)
          setError(`Odottamaton virhe. ${error}`)
          setTimeout(() => {
            setError('')
          }, 6000)
        }
    }


  const handleLoopClick = () => {
    setIsLoopActive(!isLoopActive);
  }

  const handleClick = () => {
      buyAllTickets()
  }

  return (
    <Box>
      <Box sx={{ '& > button': { m: 3 } }}>
        <Button
          onClick={() => handleClick()}
          variant="contained"
          size='medium'
          sx={{color: "white", backgroundColor: '#2a0062', minWidth: '6rem', minHeight: '3rem', ':hover': {
            background: '#2a0050'
          }}}
        >
          OSTA
        </Button>
        <ToggleButton
          value="check"
          size='medium'
          
          color='standard'
          onClick={handleLoopClick} 

          sx={{minWidth: '6rem', minHeight: '2rem', color: 'white', border: '1x solid #2a0062', boxSizing: 'border-box'}}
        >
        {isLoopActive ? 'LOPETA' : 'LOOP'}
        </ToggleButton>
      </Box>
    </Box>
  );
}

export default BuyButton