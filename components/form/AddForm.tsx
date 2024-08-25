"use client"

import { fontSizes, words } from '@/constants';
import { useCreateCar } from '@/libs/hooks';
import { createCarAction } from '@/libs/services';
import { NotifyData, WordShape} from '@/types';
import { Autocomplete, Box, Button, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@mui/material';
import { useState } from 'react'

const AddForm = (props: {setOpenPopup: React.Dispatch<React.SetStateAction<boolean>>, setNotify: React.Dispatch<React.SetStateAction<NotifyData>>}) => {

  const  { setOpenPopup, setNotify } = props;


  const [text, setText] = useState<string>('');
  const [fontSize, setFontSize] = useState<string>('');
  const [color, setColor] = useState<string>('');

 
  const uniqueKey = (`${text}${fontSize}${color}`).replace(/ /g, "");

  const car: WordShape = {
    text: text,
    fontSize: fontSize,
    color: color,
    uniqueKey: uniqueKey,
  }

  const createCarMutation = useCreateCar(setNotify);
  const handleCreateCar = (event: React.SyntheticEvent) => {
    event.preventDefault();
    createCarMutation.mutate(car);
    setOpenPopup(false)
  }

  return (
    <form onSubmit={handleCreateCar}>
      <Box sx={{display: 'grid', gridTemplateRows: 'minmax(0, 1fr)', gridTemplateColumns: {mobile: 'repeat(2, 1fr)', xs: '1fr'}}}>
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={words}
            sx={{
              width: '80%',
              m: 1,
              mx: 'auto',
              gridColumn: 1,
              gridRow: 1,
            }}
            renderInput={(params) => <TextField {...params} label="Text" />}
            freeSolo={true}
            blurOnSelect={true}
            inputValue={text}
            onInputChange={(e: any, newValue: string) => setText(newValue)}   
          />
          <Autocomplete
            disablePortal
            id="disabled"
            options={fontSizes}
            sx={{
              width: '80%',
              m: 1,
              mx: 'auto',
              gridColumn: 1,
              gridRow: 2
            }}
            renderInput={(params) => <TextField {...params} label="Font size" />}
            freeSolo={true}
            blurOnSelect={true}
            inputValue={fontSize}
            onInputChange={(e: any, newValue: string) => setFontSize(newValue)}
          />
        
          <FormControl 
            sx={{
              gridColumn: {mobile: 2, xs: 1},
              gridRow: {mobile: 1, xs: 10},
              ml: {md: 5, sm: 4, xs: 3}
            }}
          >
            <FormLabel>Color</FormLabel>
            <RadioGroup 
              row
              onChange={ (e) => setColor(e.target.value)}
            >
              <FormControlLabel value="Orange" control={<Radio />} label="Orange" />
              <FormControlLabel value="Blue" control={<Radio />} label="Blue" />
            </RadioGroup>
          </FormControl>
          <Button
            size="large"
            color="primary"  
            variant="contained"
            type="submit" 
            sx={{
              width: {mobile: '35%', xs: '80%'},
              m: 1,
              mx: 'auto',
              gridColumn: {mobile: '1/3', xs: 1},
              gridRow: {mobile: 6, xs: 11},
            }}
          >Add word</Button>
      </Box>
    </form>
  )
}

export default AddForm