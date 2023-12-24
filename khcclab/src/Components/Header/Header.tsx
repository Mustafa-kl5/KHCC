import React from 'react'
import BiotechSharpIcon from '@mui/icons-material/BiotechSharp';
import { Button } from '@mui/material';
export const Header = () => {
    return (
        <div className='bg-hussein-200 w-full p-3 flex justify-between rounded-xl items-center shadow-lg'>
            <div className='flex gap-2'>
                <BiotechSharpIcon />
                <span className='text-xl font-bold'>BioBank</span>
            </div>
            <Button variant="contained" className='rounded-2xl' color='error' >Logout</Button>
        </div>
    )
}