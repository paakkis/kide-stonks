import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import fetch from '../services/fetch';

const CityMenu = ({ city, setCity, events, setEvents }) => {

  const cities = ['Joensuu', 'Kuopio']

  const handleChange = (event) => {
    setCity(event.target.value);
  };
  
  const getEvents = async (city) => {
      const response = await fetch.fetchEvents(city)
      setEvents(response.model)
  }

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 0, margin: "100px 0px 10px auto", width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="outlined-select-currency"
          select
          label="Kaupunki"
          value={city}
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
          {cities.map((city) => (
            <MenuItem key={city} value={city} onClick={() => getEvents(city)}>
              {Object.values(city)}
            </MenuItem>
          ))}
        </TextField>
      </div>
    </Box>
  );
}

export default CityMenu