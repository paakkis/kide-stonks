import * as React from 'react';
import Button from '@mui/lab/LoadingButton';
import { Box } from '@mui/material/';
import fetch from '../services/fetch';
import { useState, useRef, useEffect } from 'react';
import ToggleButton from '@mui/material/ToggleButton';

const BuyButton = ({ event, token, setMessage, setError, setOpenErrorNotification, setOpenMessageNotification, setEventInfo, extraId }) => {

  const [isLoopActive, setIsLoopActive] = useState(false);

  useEffect(() => {
    let intervalId;
    if (isLoopActive) {
      intervalId = setInterval(() => {
        buyAllTickets();
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isLoopActive]);

  const buyAllTickets = async () => {
    if (!token) {
      setOpenErrorNotification(true);
      setError('Token puuttuu.');
      setTimeout(() => setError(''), 6000);
      return;
    }
  
    try {
      if (event.variants.length === 0) {
        const fetchedEvent = await fetch.fetchEvent(event.product.id); // Ensure this operation is awaited
        setEventInfo(fetchedEvent.model);
        setOpenErrorNotification(true);
        setError('Myynti ei ole vielä alkanut.');
        setTimeout(() => setError(''), 6000);
        return;
      }
  
      const fetchPromises = event.variants.map(variant => 
        fetch.fetchTicket(variant.inventoryId, token, variant.productVariantMaximumReservableQuantity, extraId)
          .then(response => {
            setOpenMessageNotification(true);
            setMessage(`Napattiin '${variant.name}' -lippu.`);
            setTimeout(() => {
              setMessage('');
              setOpenMessageNotification(false);
            }, 6000);
          })
          .catch(error => {
            if (error.response && error.response.status === 401) {
              setError('Token väärin tai puutteellinen. Annathan tokenin ilman Bearer -liitettä.');
            } else if (error.response && error.response.status === 400) {
              setError(`Lippua '${variant.name}' ei saatavilla.`);
            } else {
              setError(`Odottamaton virhe. ${error.message}`);
            }
            setOpenErrorNotification(true);
            setTimeout(() => {
              setError('');
              setOpenErrorNotification(false);
            }, 6000);
          })
      );
  
      await Promise.all(fetchPromises);
  
    } catch (error) {
      setOpenErrorNotification(true);
      setError(`Odottamaton virhe. ${error.message || error}`);
      setTimeout(() => setError(''), 6000);
    }
  };


  const handleLoopClick = () => {
    setIsLoopActive(!isLoopActive);
  }

  const handleClick = () => {
      buyAllTickets()
  }

  return (
    <Box>
      <Box sx={{ '& > button': { mt: 3, mx: 3 } }}>
        <Button
          onClick={() => handleClick()}
          variant="contained"
          size='medium'
          sx={{color: "white", backgroundColor: '#2a0062', minWidth: '6rem', minHeight: '3rem', ':hover': {
            background: '#2a0050'
          }}}
        >
          VARAA
        </Button>
        <ToggleButton
          value="check"
          size='medium'
          
          color='standard'
          onClick={handleLoopClick} 

          sx={{minWidth: '6rem', minHeight: '2rem', color: 'white', border: '1x solid #2a0062', boxSizing: 'border-box',                      

          }}
        
        >
        {isLoopActive ? 'STOP' : 'LOOP'}
        </ToggleButton>
      </Box>
    </Box>
  );
}

export default BuyButton