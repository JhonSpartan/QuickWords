"use client"

import { Box, Button, Container, InputAdornment, LinearProgress, Paper, TextField, Toolbar, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React, { Suspense, useEffect, useState } from 'react';
import Popup from '@/components/controls/Popup';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { TableCell, TableRow, TableBody } from "@mui/material";
import AddForm from '@/components/form/AddForm';
import { DialogConformation, NotifyData, WordShape } from '@/types';
import { headCells } from '@/constants';
import CarsTableFunctionality from '@/components/CarsTableFunctionality';
import { deleteCarAction } from '@/libs/services';
import ConfirmDialog from './ConfirmDialog';
import EditCar from './EditCar';
import Notification from './Notification';
import ClipboardJS from 'clipboard';
import EditIcon from '@mui/icons-material/Edit';
import { useCars } from '@/libs/hooks';
// import { useGetCar } from '@/libs/hooks';


const CarsTableClient = (props: {words: WordShape[]}) => {
  const [filterFn, setFilterFn] = useState<any>({fn: (items: WordShape[]) => {return items}});
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const [form, setForm] = useState<string>('');
  const [id, setId] = useState<string>('');
  const [confirmDialog, setConfirmDialog] = useState<DialogConformation>({isOpen: false, title: '', subTitle: '', onConfirm: () => {handleDeleteCar('')}});
  const [shrink, setShrink] = useState<boolean>(false);
  const [notify, setNotify] = useState({isOpen: false, message: '', type: ''});

  const { words } = props;

  const {
    TblContainer,
    TblHead,
    carsAfterPagingAndSorting,
  } = CarsTableFunctionality(headCells, filterFn);

  const handleSearch = (e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    let target = e.target;
    setFilterFn({
      fn: (items: WordShape[]) => {
        if(target.value == '') {
          return items;
        }
        else {
          return items.filter((item: WordShape) => item.text.toLowerCase().includes(target.value.toLowerCase()))
        }
      }
    })
  }

  const handleAddForm = () => {
    setForm('addForm')
    setOpenPopup(true)
  }

  const handleEditForm = (id:string) => {
    setForm('editForm')
    setId(id)
    setOpenPopup(true)
  }

  const handleDeleteCar = (id: string) => {
    deleteCarAction(id);
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false
    });
    setNotify({
      isOpen: true,
      message: 'Word successfully deleted',
      type: 'success'
    });
  } 


  useEffect(() => {
    const clipboard = new ClipboardJS('.copy-btn');
  
    return () => {
 
      clipboard.destroy();
    }
  }, []);

  const { status, isFetching, error, data} = useCars();

  if (isFetching) return (
    <div>
      <h1>Loading...</h1>
      <LinearProgress />
    </div>
  )
  if (status === 'error') return <h1>{JSON.stringify(error)}</h1>
  if (!data) return <h1>Car not found</h1>
  console.log(data)

  return (
      <>
        <Toolbar sx={{position: 'relative', display: 'flex', justifyContent: 'space-between'}}>
          <TextField
            label="Search words"
            variant="outlined"
            type="text"
            size="small"
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
              label: {
                color: "#5db0e6",
              },
            })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            onFocus={() => setShrink(true)}
            onBlur={(e) => setShrink(!!e.target.value)}
            InputLabelProps={{ sx: { ml: 4.5 }, shrink }}
            onChange={handleSearch}
          />
          <Button 
            variant="outlined"
            size="medium"
            onClick={handleAddForm}

            sx={{
              '&:hover': {
                color: '#a1ceea',
                borderColor: '#a1ceea'
              },
              mt: {mobile: 0, xs: 1},
              mb: {mobile: 0, xs: 1},
              color: '#5db0e6',
              borderColor: '#5db0e6'
            }}
          >
            <AddIcon 
              sx={{mr: {xs: 0, mobile: .5}}}
            />
            <Typography>Add new</Typography>
          </Button>
        </Toolbar>
        <TblContainer>
          <TblHead />
          <TableBody>
            {
              carsAfterPagingAndSorting(words).map((item: any, index: number) => 
                (<TableRow 
                  key={index}
                  sx={{
                    bgcolor: index % 2 ? '#2d3446' : '#313c50', 
                  }}
                >
                  <TableCell
                    sx={{
                      '&:hover': {
                        cursor: 'pointer',
                      },
                      position: 'relative',
                      color: `${item.color}`,
                      fontSize: `${item.fontSize}`,
                      fontWeight: '600',
                      border: '2px solid #202739'
                    }}
                    className="copy-btn"
                    id={item.uniqueKey}
                    data-clipboard-target={`#${item.uniqueKey}`}
                  >{item.text}</TableCell>
                  <TableCell
                    sx={{
                      color: '#8b8e99',
                      fontSize: '16px',
                      fontWeight: '600',
                      border: '2px solid #202739'
                    }}
                  >{item.fontSize}</TableCell>
                  <TableCell 
                    sx={{
                      border: '2px solid #202739',
                      display: 'flex',
                      justifyContent: 'space-evenly',
                    }}
                  >
                    <Button 
                      variant="outlined"
                      size="small"
                      onClick={() => {handleEditForm(item._id)}}
                      sx={{
                        '&:hover': {
                          color: '#A4F6C9',
                          borderColor: '#A4F6C9'
                        },
                        mt: 1,
                        mb: 1,
                        color: '#009e60',
                        borderColor: '#009e60'
                      }}
                    >
                      <EditIcon 
                        sx={{mr: 1}}
                      />
                      <Typography>Edit</Typography>
                    </Button>
                    <Button 
                      variant="outlined"
                      size="small"
                      onClick={() => {
                        setConfirmDialog({
                          isOpen: true, 
                          title: 'Are you sure you want to remove the car?', 
                          subTitle: 'You can not undo this operation',
                          onConfirm: () => {handleDeleteCar(item._id)}
                        })
                      }}
                      sx={{
                        '&:hover': {
                          color: '#FF9494',
                          borderColor: '#FF9494'
                        },
                        mt: 1,
                        mb: 1,
                        color: '#FF5757',
                        borderColor: '#FF5757'
                      }}
                    >
                      <DeleteIcon 
                        sx={{mr: 1}}
                      />
                      <Typography>Remove</Typography>
                    </Button>
                  </TableCell>
                </TableRow>)
              )
            }
          </TableBody>
        </TblContainer>
      <Popup
        title={form === 'addForm' ? "Words add form" : "Words edit form"} 
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >   
        {
          form==='addForm' ? 
           
          <AddForm setOpenPopup={setOpenPopup} setNotify={setNotify}/> :
     
          <Suspense fallback={<LinearProgress/>}> 
            <EditCar id={id} setOpenPopup={setOpenPopup} setNotify={setNotify} /> 
          </Suspense>
        }
      </Popup>
      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
      <Notification notify={notify} setNotify={setNotify} />
    </>
  )

}

export default CarsTableClient