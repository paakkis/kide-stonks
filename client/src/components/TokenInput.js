import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const TokenInput = ({ setToken }) => {
  const handleChange = (event) => {
    setToken(event.target.value);
    window.localStorage.setItem('kideToken', event.target.value);
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { width: '25ch', color: 'white' },     
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
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          value={localStorage.getItem('kideToken')}
          id="outlined-helperText"
          placeholder='Syötä'
          label="Token"
          color='secondary'
          sx={{                         
            '& .MuiOutlinedInput-root': {  
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
              '&.MuiFormLabel-root-MuiInputLabel-root':{
                color: 'white'
              },
              "&.Mui-focused": {
                color: "white"
              },
              "&.Mui-root": {
                color: 'white'
              } 

          }
          } }
          onChange={handleChange}
        />
      </div>
    </Box>
  );
}

export default TokenInput
