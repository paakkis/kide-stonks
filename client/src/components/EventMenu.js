import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react'
import fetch from '../services/fetch';
import Chip from "@mui/material/Chip";
import Divider from '@mui/material/Divider';

const EventMenu = ({ event, setEvent, setEventInfo, events }) => {

  const handleChange = (event) => {
    setEvent(event.target.value);
  };

  const getEventInfo = (id) => {
    fetch.fetchEvent(id).then(event => {
        setEventInfo(event.model)
    }) 
  }

  return (
    <div className='event-menu'>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { width: '25ch', margin: "10px 0px 10px auto" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            id="outlined-select-currency"
            select
            label="Tapahtuma"
            value={event}
            onChange={handleChange}
            sx={
              {                         
                '& .MuiOutlinedInput-root': {  
                    '& fieldset': {           
                        borderColor: '#2a0062',   
                    },
                    '&:hover fieldset': {
                        borderColor: '#2a0062',
                    },
                    '&.Mui-focused fieldset': { 
                        borderColor: '#2a0062',
                    },
                },
              } 
            }
          >
            {events
              .sort((a, b) => b.timeUntilSalesStart - a.timeUntilSalesStart)
              .filter(event => event.productType === 1)
              .map((event) => (
              <MenuItem key={event.name} 
              
                        value={event.name} 
                        onClick={() => getEventInfo(event.id)}
                        sx={{
                            width: 350,
                            whiteSpace: "normal",
                            }}
                        >
                {event.name}
                <Box sx={{margin: "0px 0px 0px auto"}}>
                  {event.availability !== 0 ?
                    <Chip label={`${event.availability} kpl`} color="success" variant="outlined" />
                    :
                    <Chip label={`${event.availability} kpl`} color="error" variant="outlined" />
                  }
                  
                </Box>
              </MenuItem>
            ))}
          </TextField>
        </div>
      </Box>
    </div>
  );

}

export default EventMenu