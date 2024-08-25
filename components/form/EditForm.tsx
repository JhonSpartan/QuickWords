"use client"

import { fontSizes, words } from '@/constants';
import { useUpdateCar } from '@/libs/hooks';
import { updateCarsAction } from '@/libs/services';
import { Autocomplete, Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material';
import { useState, } from 'react'

const EditForm = ({setOpenPopup, word, id, setNotify}: any) => {

  const  { text, fontSize, color } = word;
  
  const [newText, setNewText] = useState<string>(text);
  const [newFontSize, setNewFontSize] = useState<string>(fontSize);
  const [newColor, setNewColor] = useState<string>(color);

  // const newCar = {text: newText, fontsSize: newFontSize, color: newColor};


  // const handleEditCar = (event: React.SyntheticEvent) => {
  //   event.preventDefault();
  //   updateCarsAction(newCar, id);
  //   setOpenPopup();
  //   setNotify({
  //     isOpen: true,
  //     message: 'Word successfully edited',
  //     type: 'success'
  //   });
  // } 

  const updateCarMutation = useUpdateCar(setNotify);
  const handleEditCar = (event: React.SyntheticEvent) => {
    event.preventDefault();
    updateCarMutation.mutate({
      ...word, text: newText, fontsSize: newFontSize, color: newColor })
    setOpenPopup();
  } 

  return (
    <form onSubmit={handleEditCar}>
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
            renderInput={(params) => <TextField {...params} label="Manufacturer" />}
            freeSolo={true}
            blurOnSelect={true}
            inputValue={newText}
            onInputChange={(e: any, newValue: string) => setNewText(newValue)}   
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
            renderInput={(params) => <TextField {...params} label="Model" />}
            freeSolo={true}
            blurOnSelect={true}
            inputValue={newFontSize}
            onInputChange={(e: any, newValue: string) => setNewFontSize(newValue)}
          />
          <FormControl
            sx={{
              gridColumn: {mobile: 2, xs: 1},
              gridRow: {mobile: 1, xs: 10},
              ml: {md: 5, sm: 4, xs: 3}
            }}
          >
            <FormLabel>Transmission</FormLabel>
            <RadioGroup 
              row
              name="transmission"
              value={newColor}
              onChange={ (e) => setNewColor(e.target.value)}
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
          >Edit car</Button>
      </Box>
    </form>
  )
}

export default EditForm