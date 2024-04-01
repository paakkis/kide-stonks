import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { Button, CardActions, Divider } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import Box from '@mui/material/Box';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const EventInfo = ({ event }) => {

  function timeUntilSales(seconds) {
      seconds = Number(seconds);
      var d = Math.floor(seconds / (3600*24));
      var h = Math.floor(seconds % (3600*24) / 3600);
      var m = Math.floor(seconds % 3600 / 60);
      var s = Math.floor(seconds % 60);
      
      var dDisplay = d > 0 ? d + (d === 1 ? " päivä, " : " päivän, ") : "";
      var hDisplay = h > 0 ? h + (h === 1 ? " tunnin, " : " tunnin, ") : "";
      var mDisplay = m > 0 ? m + (m === 1 ? " minuutin, " : " minuutin, ") : "";
      var sDisplay = s > 0 ? s + (s === 1 ? " sekunnin" : " sekunnin") : "";
      return dDisplay + hDisplay + mDisplay + sDisplay;
  }
    
  var date = new Date(event.product.dateActualFrom)

  return (
      <Card sx={{ maxWidth: 400, margin: 'auto', marginTop: '20px', background: '#262828', boxShadow: 'rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px'}}>
          <CardMedia 
            component="img"
            height="140"
            image={`https://portalvhdsp62n0yt356llm.blob.core.windows.net/bailataan-mediaitems/${event.product.mediaFilename}`}
            alt="Tapahtuman kuva"
            sx={{objectFit: 'fill'}}
          />
          <CardContent sx={{textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '.5rem', padding: 3, paddingBottom: 0}}>
            <Typography gutterBottom variant="h2" component="div" sx={{color: '#efefef', textAlign: 'center'}}>
              {event.product.name}
            </Typography>
            <Divider sx={{border: '2px solid #2a0062', width: '100%', alignSelf: 'center'}}/>
            <Typography component="div" sx={{color: '#efefef', paddingTop: 2}}>
              Aika: {date.toLocaleString()}
            </Typography>
            <Typography component="div" sx={{color: '#efefef'}}>
              Osoite: {event.product.place}, {event.product.streetAddress}
            </Typography>
            <Typography component="div" sx={{color: '#efefef'}}>
              Järjestäjä: {event.company.name}
            </Typography>
          </CardContent>
          <CardContent sx={{textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '.5rem', padding: 3}}>
            <Typography gutterBottom variant="h2" sx={{color: '#efefef', textAlign: 'center'}}>
                LIPPUTYYPIT
            </Typography>
            <Divider sx={{border: '2px solid #2a0062', width: '100%', alignSelf: 'center'}}/>
            {event.product.timeUntilSalesStart === 0 ?
                event.variants.map(event => (
                    <Card key={event.id} sx={{ width: '100%', maxHeight: 100, margin: 'auto', marginTop: '10px', textAlign: 'left', background: '#262828', padding: 1}} >
                        <Typography gutterBottom variant="h7" component="div" sx={{textAlign: 'left', whiteSpace: "normal", margin: '7px 7px 7px 7px', fontWeight: 500, color: 'white'}}>
                            {event.name}
                        </Typography>
                        <Box sx={{textAlign: 'left', whiteSpace: "normal", margin: '7px 7px 7px 7px'}}>
                          {event.availability !== 0 ?
                            <Chip sx={{margin: '0px 7px 0px 0px'}} label={`${event.availability} %`} color="success" variant="outlined" size='small'/>
                            :
                            <Chip sx={{margin: '0px 7px 0px 0px'}} label={`${event.availability} %`} color="error" variant="outlined" size='small'/>
                          }
                            
                            <Chip label={`${(event.pricePerItem) / 100} €`} color='warning' variant="outlined" size='small' />
                        </Box>
                    </Card>
                ))
                :
                <Card sx={{ maxWidth: 380, maxHeight: 100, margin: 'auto', marginTop: '10px', textAlign: 'left', background: '#262828', padding: 2}}>
                    <Typography gutterBottom variant="h7" component="div" sx={{textAlign: 'left', whiteSpace: "normal", margin: '7px 7px 7px 7px', fontWeight: 500, color: '#efefef'}}>
                        Myynti alkaa {timeUntilSales(event.product.timeUntilSalesStart)} kuluttua.
                    </Typography>
                </Card>
            }
          </CardContent>
        <CardActions sx={{textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '.5rem', padding: 2}}>
          <Button size="small" sx={{color:'white', marginTop:'10px'}} endIcon={<ArrowForwardIcon />} href={`https://kide.app/events/${event.product.id}`}>
            TAPAHTUMAN SIVULLE
          </Button>
        </CardActions>
      </Card>
  );
}

export default EventInfo