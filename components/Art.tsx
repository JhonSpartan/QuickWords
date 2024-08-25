import { Box, Button, TextField } from '@mui/material';
import ClipboardJS from 'clipboard';
import React, { useEffect, useState } from 'react'

const Art = () => {
  const [email, setEmail] = useState('');
  const [shrink, setShrink] = useState(false);

  const generateArt = (event: React.SyntheticEvent) => {
    event.preventDefault();
    // updateEmailAction(email);
    setEmail('');
    setShrink(false);
  }

  useEffect(() => {
    const clipboard = new ClipboardJS('.copy-btn');
  
    return () => {
 
      clipboard.destroy();
    }
  }, []);

  return (
      <Box component='form' sx={{display: 'flex', width: '100%'}} onSubmit={generateArt}>
        <TextField
          id="art"

          // label="Email"
          variant="outlined"
          value={email} 
          size="small"
          // fullWidth
          required
          sx={(theme) => ({
            '& .MuiInputAdornment-root': {
              color: '#5db0e6',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              px: 5.5,
              borderColor: '#5db0e6',
            },
            '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
              px: 5.5,
              borderColor: '#a1ceea',
            },
            "& label.Mui-focused": {
              color: "#a1ceea"
            },
            '& .Mui-focused .MuiInputAdornment-root': {
              color: '#a1ceea',
            },
            width: '25%',
            minWidth: '250px',
            input: {
              color: "#8d939e",
            },
            // label: {
            //   color: "#5db0e6",
            // },
            flexBasis: '30%'
          })}
          InputProps={{
            type: "text",
          }}
          onFocus={() => setShrink(true)}
          onBlur={(e) => setShrink(!!e.target.value)}
          InputLabelProps={{ sx: { ml: 4.5, fontSize: {mobile: 15, sm: 16, tablet: 15, lg: 16}, mt: {mobile: '1px', sm: 0, tablet: '1px', lg: 0} }, shrink }}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button 
            // fullWidth
            className="copy-btn"
            data-clipboard-target="#art"
             variant="outlined"
             size="medium"
             sx={{
               '&:hover': {
                 color: '#a1ceea',
                 borderColor: '#a1ceea'
               },
               mt: {mobile: 0, xs: 1},
               mb: {mobile: 0, xs: 1},
               color: '#5db0e6',
               borderColor: '#5db0e6',
              flexBasis: '30%'
             }}
        >
          Generate art
        </Button>
      </Box>
  )
}

export default Art