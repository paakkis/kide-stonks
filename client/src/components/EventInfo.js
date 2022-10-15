import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { Button, CardActions } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import Box from '@mui/material/Box';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const EventInfo = ({ event }) => {

  const timeUntilSales = (secs) => {
      if (secs > 3600){
          return new Date(secs * 1000).toISOString().slice(11, 19);
      }
      if (secs < 3600) {
          return new Date(secs * 1000).toISOString().slice(14, 19);
      }
  }
    
  var date = new Date(event.product.dateActualFrom)

  return (
      <Card sx={{ maxWidth: 400, margin: 'auto', marginTop: '20px', outline: 'solid 2px rgb(202,191,216,0.3)'}}>
          <CardMedia
            component="img"
            height="140"
            image={`https://portalvhdsp62n0yt356llm.blob.core.windows.net/bailataan-mediaitems/${event.product.mediaFilename}`}
            alt="Tapahtuman kuva"
          />

          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {event.product.name}
            </Typography>
            <Typography gutterBottom component="div">
              <Chip label={event.company.name} color="default" variant="outlined" />
            </Typography>
            <Typography gutterBottom component="div">
              <EventIcon fontSize="inherit" sx={{ marginRight: 1 }} /> {date.toLocaleString()}
            </Typography>
            <Typography gutterBottom component="div">
              <LocationOnIcon fontSize="inherit" sx={{ marginRight: 1 }} /> {event.product.place}, {event.product.streetAddress}
            </Typography>
          </CardContent>
          <Typography gutterBottom variant="h5">
              Lipputyypit
          </Typography>
          {event.variants.length > 0 ?
              event.variants.map(event => (
                  <Card sx={{ maxWidth: 380, maxHeight: 100, margin: 'auto', marginTop: '10px', textAlign: 'left'}}>
                      <Typography gutterBottom variant="h7" component="div" sx={{textAlign: 'left', whiteSpace: "normal", margin: '7px 7px 7px 7px', fontWeight: 500}}>
                          {event.name}
                      </Typography>
                      <Box sx={{textAlign: 'left', whiteSpace: "normal", margin: '7px 7px 7px 7px'}}>
                        {event.availability !== 0 ?
                          <Chip sx={{margin: '0px 7px 0px 0px'}} label={`${event.availability} kpl`} color="success" variant="outlined" size='small'/>
                          :
                          <Chip sx={{margin: '0px 7px 0px 0px'}} label={`${event.availability} kpl`} color="error" variant="outlined" size='small'/>
                        }
                          
                          <Chip label={`${(event.pricePerItem) / 100} €`} color="default" variant="outlined" size='small' />
                      </Box>
                  </Card>
              ))
              :
              <Card sx={{ maxWidth: 380, maxHeight: 100, margin: 'auto', marginTop: '10px', textAlign: 'left'}}>
                  <Typography gutterBottom variant="h7" component="div" sx={{textAlign: 'left', whiteSpace: "normal", margin: '7px 7px 7px 7px', fontWeight: 500}}>
                      Myynti alkaa {timeUntilSales(event.product.timeUntilSalesStart)} kuluttua.
                  </Typography>
              </Card>
          }
        <CardActions>
        <Button size="small" sx={{color:'#2a0062', marginTop:'10px'}} endIcon={<ArrowForwardIcon />} href={`https://kide.app/events/${event.product.id}`}>
          Tapahtuman sivulle
        </Button>
        </CardActions>
      </Card>
  );
}

export default EventInfo