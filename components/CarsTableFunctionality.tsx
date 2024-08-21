"use client"

import { WordShape } from '@/types'
import { Table, TableCell, TableHead, TablePagination, TableRow, TableSortLabel } from '@mui/material'
import React, { useState } from 'react'

const CarsTableFunctionality = (headCells: { id: string, label: string }[], filterFn: any) => {

  const pages = [5, 10, 20]
  const [order, setOrder] = useState<'asc' | 'desc'>();
  const [orderBy, setOrderBy] = useState<string | number | undefined>();

  const TblContainer = (props: {children?: React.ReactNode}) => (
    <Table>
      { props.children }
    </Table>
    
  )

  const TblHead = (props: any) => {

    const handleSortRequest = (cellId: string)  => {
      const isAsc = orderBy === cellId && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc')
      setOrderBy(cellId)

    }

    return (
      <TableHead>
        <TableRow>
          {
            headCells.map(headCell => 
              (<TableCell 
                key={headCell.id}
                sx={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#235a75',
                  // backgroundColor: '#1e293b',
                  border: '0'
                }}
              >
                <TableSortLabel
                  active={ orderBy === headCell.id }
                  direction={ orderBy === headCell.id ? order : 'asc' }
                  onClick={ () => {handleSortRequest(headCell.id)} }
                >
                  {headCell.label}
                </TableSortLabel>
              </TableCell>)
            )
          }
        </TableRow >
      </TableHead>)
  }

  function stableSort(array: [], comparator: any) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  function getComparator(order: string | undefined, orderBy: any) {
      return order === 'desc'
          ? (a:number[], b:number[]) => descendingComparator(a, b, orderBy)
          : (a:number[], b:number[]) => -descendingComparator(a, b, orderBy);
  }

  function descendingComparator(a:number[], b:number[], orderBy: number) {
      if (b[orderBy] < a[orderBy]) {
          return -1;
      }
      if (b[orderBy] > a[orderBy]) {
          return 1;
      }
      return 0;
  }

  const carsAfterPagingAndSorting = (words: WordShape[]) => {
    return stableSort(filterFn.fn(words), getComparator(order, orderBy))
  }
  
  return {
    TblContainer,
    TblHead,
    carsAfterPagingAndSorting,
  }
}

export default CarsTableFunctionality