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
            color='secondary'
            value={event}
            onChange={handleChange}
            sx={
              {                         
                '& .MuiOutlinedInput-root': {  
                  color: "darkgray",
                  '& fieldset': {           
                      borderColor: '#2a0062',
                      border: '2px solid #2a0062'   
                  },
                  '&:hover fieldset': {
                      borderColor: '#2a0062',
                      border: '3px solid #2a0062' 
                  },
                  '&.Mui-focused fieldset': { 
                      borderColor: '#2a0062',
                      border: '3px solid #2a0062' 
                  },
                  '&.MuiInputLabel-root': {
                    color: 'white'
                  },
                  "&.MuiFormLabel-root": {
                    color: 'white'
                  } 
              },
              } 
            }
          >
            {events
              .sort((a, b) => b.timeUntilSalesStart - a.timeUntilSalesStart)
              .filter(event => event.productType === 1)
              .map((event) => (
              <MenuItem key={event.id} 
              
                        value={event.name} 
                        onClick={() => getEventInfo(event.id)}
                        sx={{
                            width: 500,
                            whiteSpace: "normal",
                            }}
                        >
                {event.name}
                <Box sx={{margin: "0px 0px 0px auto", pl: 2}}>
                  {event.availability !== 0 ?
                    <Chip label={`${event.availability} %`} color="success" variant="outlined" />
                    :
                    <Chip label={`${event.availability} %`} color="error" variant="outlined" />
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