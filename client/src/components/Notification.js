import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const Notification = ({ message, error, openMessageNotification, openErrorNotification, setOpenMessageNotification, setOpenErrorNotification}) => {

  const handleErrorClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenErrorNotification(false);
  };
  const handleMessageClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenMessageNotification(false);
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={openErrorNotification} autoHideDuration={6000} onClose={handleErrorClose}>
        {(error &&
            <Alert onClose={handleErrorClose} severity="error" sx={{ width: '100%' }}>
                {error}
            </Alert>
        )}
      </Snackbar>
      <Snackbar open={openMessageNotification} autoHideDuration={6000} onClose={handleMessageClose}>
        {(message &&
            <Alert onClose={handleMessageClose} severity="success" sx={{ width: '100%' }}>
                {message}
            </Alert>
        )}
      </Snackbar>
    </Stack>
  );
}

export default Notification