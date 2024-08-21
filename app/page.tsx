import CarsTableServer from '@/components/CarsTableServer'
import { Box, Container, LinearProgress } from '@mui/material'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <Box sx={{width: '100%', minHeight: '100vh', bgcolor: '#202739'}}>
      <Container 
        component="main" 
        sx={{
          width: '100%',
          overflowX: 'hidden',
          pt: 10,
        }}
      >
        <Suspense fallback={<LinearProgress/>}> 
          <CarsTableServer/>
        </Suspense>
      </Container>
    </Box>
  )
}

export default page