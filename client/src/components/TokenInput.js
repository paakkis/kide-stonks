import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const TokenInput = ({ setToken }) => {
  const handleChange = (event) => {
    setToken(event.target.value);
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { width: '25ch', margin: "10px 0px 10px auto" },
                                 
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
          id="outlined-helperText"
          placeholder='Syötä'
          label="Bearer token"
          sx={              {                         
            '& .MuiOutlinedInput-root': {  
                '& label': {           
                    color: '#2a0062',   
                },
                '&:hover fieldset': {
                    borderColor: '#2a0062',
                },
                '&.Mui-focused fieldset': { 
                    borderColor: '#2a0062',
                },
            },
          } }
          onChange={handleChange}
        />
      </div>
    </Box>
  );
}

export default TokenInput
